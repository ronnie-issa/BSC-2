import { createClient } from 'contentful';
import type { EntryCollection } from 'contentful';
import type { Product } from '../contexts/ProductContext';

// Contentful delivery client (for published content)
console.log('Contentful Config:', {
  spaceId: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN ? 'Set (hidden for security)' : 'Not set',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Debug function to list all content types
async function listContentTypes() {
  try {
    const client = createClient({
      space: import.meta.env.CONTENTFUL_SPACE_ID || '',
      accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
      environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
    });

    const contentTypes = await client.getContentTypes();
    console.log('Available content types:', contentTypes.items.map(type => ({
      id: type.sys.id,
      name: type.name
    })));
  } catch (error) {
    console.error('Error fetching content types:', error);
  }
}

// Call the debug function
listContentTypes();

const deliveryClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// Contentful preview client (for draft content)
const previewClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com', // Use the preview API host
});

// Helper function to get the appropriate client based on preview mode
const getClient = (preview = false) => {
  return preview ? previewClient : deliveryClient;
};

// Interface for Contentful product entry
interface ContentfulProduct {
  sys: {
    id: string;
  };
  fields: {
    name: string;
    price: number;
    description: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    featured: boolean;
    variations: {
      fields: {
        name: string;
        value: string;
      };
    }[];
    sizes: {
      fields: {
        name: string;
        value: string;
      };
    }[];
  };
}

// Cache for products to reduce API calls
let productsCache: {
  standard: Product[] | null;
  preview: Product[] | null;
  timestamp: number;
} = {
  standard: null,
  preview: null,
  timestamp: 0
};

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Fetch all products from Contentful
 * @param preview Whether to use the preview API (for draft content)
 */
export async function fetchAllProducts(preview = false): Promise<Product[]> {
  try {
    // Check if we have cached data that's not expired
    const now = Date.now();
    const cacheKey = preview ? 'preview' : 'standard';

    if (productsCache[cacheKey] && (now - productsCache.timestamp < CACHE_EXPIRATION)) {
      console.log('Using cached products data');
      return productsCache[cacheKey] || [];
    }

    console.log('Fetching all products, preview mode:', preview);
    const client = getClient(preview);
    // Try with both lowercase and uppercase content type names
    let entries: EntryCollection<ContentfulProduct>;
    try {
      entries = await client.getEntries({
        content_type: 'product',
        include: 2,
      });
    } catch (error) {
      console.log('Trying with uppercase Product content type...');
      entries = await client.getEntries({
        content_type: 'Product',
        include: 2,
      });
    }

    console.log('Content types available:', entries.items.map(item => item.sys.contentType?.sys.id));

    console.log('Fetched products:', entries.items.length);
    console.log('Raw response:', JSON.stringify(entries, null, 2));

    const products = entries.items.map((item) => {
      const fields = item.fields;

      // Ensure image URL has https:// prefix if it starts with //
      let imageUrl = fields.image?.fields?.file?.url || '';
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl;
      }

      // Extract text content from rich text description if it's an object
      let description = fields.description;
      if (description && typeof description === 'object' && description.content) {
        try {
          // Try to extract text from the rich text object
          description = description.content
            .map(block => {
              if (block.content) {
                return block.content
                  .map(item => item.value || '')
                  .join('');
              }
              return '';
            })
            .join('\n\n');
        } catch (e) {
          console.warn('Error extracting text from rich text:', e);
          description = 'Product description unavailable';
        }
      }

      return {
        id: parseInt(item.sys.id),
        name: fields.name,
        price: fields.price,
        description: description,
        image: imageUrl,
        featured: fields.featured || false,
        variations: fields.variations?.map((variation) => ({
          name: variation.fields.name,
          value: variation.fields.value,
        })) || [],
        colors: fields.variations?.map((variation) => ({
          name: variation.fields.name,
          value: variation.fields.value,
        })) || [],
        sizes: fields.sizes?.map((size) => ({
          name: size.fields.name,
          value: size.fields.value,
        })) || [],
      };
    });

    // Update cache
    productsCache[cacheKey] = products;
    productsCache.timestamp = now;

    return products;
  } catch (error) {
    console.error('Error fetching products from Contentful:', error);
    return [];
  }
}

// Cache for featured products
let featuredProductsCache: {
  standard: Product[] | null;
  preview: Product[] | null;
  timestamp: number;
} = {
  standard: null,
  preview: null,
  timestamp: 0
};

/**
 * Fetch featured products from Contentful
 * @param preview Whether to use the preview API (for draft content)
 */
export async function fetchFeaturedProducts(preview = false): Promise<Product[]> {
  try {
    // Check if we have cached data that's not expired
    const now = Date.now();
    const cacheKey = preview ? 'preview' : 'standard';

    if (featuredProductsCache[cacheKey] && (now - featuredProductsCache.timestamp < CACHE_EXPIRATION)) {
      console.log('Using cached featured products data');
      return featuredProductsCache[cacheKey] || [];
    }

    // If we already have all products cached, filter them instead of making a new API call
    if (productsCache[cacheKey] && (now - productsCache.timestamp < CACHE_EXPIRATION)) {
      console.log('Filtering featured products from cached data');
      const featured = productsCache[cacheKey]?.filter(product => product.featured) || [];
      featuredProductsCache[cacheKey] = featured;
      featuredProductsCache.timestamp = now;
      return featured;
    }

    const client = getClient(preview);
    // Try with both lowercase and uppercase content type names
    let entries: EntryCollection<ContentfulProduct>;
    try {
      entries = await client.getEntries({
        content_type: 'product',
        'fields.featured': true,
        include: 2,
      });
    } catch (error) {
      console.log('Trying with uppercase Product content type for featured products...');
      entries = await client.getEntries({
        content_type: 'Product',
        'fields.featured': true,
        include: 2,
      });
    }

    const featuredProducts = entries.items.map((item) => {
      const fields = item.fields;

      // Ensure image URL has https:// prefix if it starts with //
      let imageUrl = fields.image?.fields?.file?.url || '';
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl;
      }

      // Extract text content from rich text description if it's an object
      let description = fields.description;
      if (description && typeof description === 'object' && description.content) {
        try {
          // Try to extract text from the rich text object
          description = description.content
            .map(block => {
              if (block.content) {
                return block.content
                  .map(item => item.value || '')
                  .join('');
              }
              return '';
            })
            .join('\n\n');
        } catch (e) {
          console.warn('Error extracting text from rich text:', e);
          description = 'Product description unavailable';
        }
      }

      return {
        id: parseInt(item.sys.id),
        name: fields.name,
        price: fields.price,
        description: description,
        image: imageUrl,
        featured: fields.featured || false,
        variations: fields.variations?.map((variation) => ({
          name: variation.fields.name,
          value: variation.fields.value,
        })) || [],
        colors: fields.variations?.map((variation) => ({
          name: variation.fields.name,
          value: variation.fields.value,
        })) || [],
        sizes: fields.sizes?.map((size) => ({
          name: size.fields.name,
          value: size.fields.value,
        })) || [],
      };
    });

    // Update cache
    featuredProductsCache[cacheKey] = featuredProducts;
    featuredProductsCache.timestamp = now;

    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products from Contentful:', error);
    return [];
  }
}

// Cache for individual products
const productCache: Record<string, { product: Product | null; timestamp: number }> = {};

/**
 * Fetch a single product by ID
 * @param id The product ID
 * @param preview Whether to use the preview API (for draft content)
 */
export async function fetchProductById(id: string | number, preview = false): Promise<Product | null> {
  try {
    const cacheKey = `${id}-${preview ? 'preview' : 'standard'}`;
    const now = Date.now();

    // Check if we have this product cached and not expired
    if (productCache[cacheKey] && (now - productCache[cacheKey].timestamp < CACHE_EXPIRATION)) {
      console.log(`Using cached product data for ID ${id}`);
      return productCache[cacheKey].product;
    }

    // Check if we can find this product in the all products cache
    const allProductsCacheKey = preview ? 'preview' : 'standard';
    if (productsCache[allProductsCacheKey] && (now - productsCache.timestamp < CACHE_EXPIRATION)) {
      const cachedProduct = productsCache[allProductsCacheKey]?.find(p => p.id === id);
      if (cachedProduct) {
        console.log(`Found product ID ${id} in all products cache`);
        productCache[cacheKey] = { product: cachedProduct, timestamp: now };
        return cachedProduct;
      }
    }

    console.log(`Fetching product with ID ${id}, preview mode: ${preview}`);
    const client = getClient(preview);

    try {
      const entry = await client.getEntry<ContentfulProduct>(id.toString(), {
        include: 2,
      });

      const fields = entry.fields;

      console.log('Product entry found:', entry);

      // Ensure image URL has https:// prefix if it starts with //
      let imageUrl = fields.image?.fields?.file?.url || '';
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl;
      }

      // Extract text content from rich text description if it's an object
      let description = fields.description;
      if (description && typeof description === 'object' && description.content) {
        try {
          // Try to extract text from the rich text object
          description = description.content
            .map(block => {
              if (block.content) {
                return block.content
                  .map(item => item.value || '')
                  .join('');
              }
              return '';
            })
            .join('\n\n');
        } catch (e) {
          console.warn('Error extracting text from rich text:', e);
          description = 'Product description unavailable';
        }
      }

      // Try to parse the ID as a number for compatibility with the rest of the app
      // But also store the original Contentful ID for future reference
      let numericId;
      try {
        numericId = parseInt(entry.sys.id);
      } catch (e) {
        // If we can't parse it as a number, use a fallback ID
        numericId = Math.floor(Math.random() * 10000);
      }

      const product = {
        id: numericId,
        contentfulId: entry.sys.id, // Store the original Contentful ID
        name: fields.name,
        price: fields.price,
        description: description,
        image: imageUrl,
        featured: fields.featured || false,
        variations: fields.variations?.map((variation) => ({
          name: variation.fields.name,
          value: variation.fields.value,
        })) || [],
        colors: fields.variations?.map((variation) => ({
          name: variation.fields.name,
          value: variation.fields.value,
        })) || [],
        sizes: fields.sizes?.map((size) => ({
          name: size.fields.name,
          value: size.fields.value,
        })) || [],
      };

      // Update cache
      productCache[cacheKey] = { product, timestamp: now };

      return product;
    } catch (entryError) {
      console.error(`Error fetching entry with ID ${id}:`, entryError);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}
