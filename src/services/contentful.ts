import { createClient } from 'contentful';
import type { EntryCollection, EntrySkeletonType, Entry } from 'contentful';
import type { Product } from '../contexts/ProductContext';

// Contentful delivery client (for published content)
const deliveryClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
  // Optimize request handling
  retryOnError: true,
  timeout: 30000, // 30 seconds timeout
});

// Contentful preview client (for draft content)
const previewClient = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_PREVIEW_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
  host: 'preview.contentful.com', // Use the preview API host
  // Optimize request handling
  retryOnError: true,
  timeout: 30000, // 30 seconds timeout
});

// Helper function to get the appropriate client based on preview mode
const getClient = (preview = false, resolveLinks = true) => {
  // Get the base client
  const client = preview ? previewClient : deliveryClient;

  // Apply the appropriate link resolution modifier
  // - withoutUnresolvableLinks: Resolves links but removes unresolvable ones
  // - withoutLinkResolution: Doesn't resolve links at all
  return resolveLinks ? client.withoutUnresolvableLinks : client.withoutLinkResolution;
};

// Keep track of used slugs to ensure uniqueness
const usedSlugs: Record<string, number> = {};

// Helper function to generate a URL-friendly slug from a product name
const generateSlug = (name: string): string => {
  // Create the base slug
  const baseSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single one
    .trim(); // Remove leading/trailing spaces

  // Check if this slug has been used before
  if (usedSlugs[baseSlug] === undefined) {
    // First time seeing this slug
    usedSlugs[baseSlug] = 1;
    return baseSlug;
  } else {
    // This slug has been used before, add a numerical suffix
    usedSlugs[baseSlug]++;
    return `${baseSlug}-${usedSlugs[baseSlug]}`;
  }
};

// Helper function to create a consistent product object from Contentful data
const createProductFromContentful = (
  item: Entry<ContentfulProduct>
): Product => {
  const fields = item.fields as ContentfulProductFields;

  // Ensure image URL has https:// prefix if it starts with //
  let imageUrl = fields.image?.fields?.file?.url || '';
  if (imageUrl.startsWith('//')) {
    imageUrl = 'https:' + imageUrl;
  }

  // Handle description which could be rich text or string
  let description = fields.description;
  // If it's not a rich text object, convert it to a string for backward compatibility
  if (description && typeof description === 'string') {
    // Keep as is
  } else if (!description) {
    console.warn('Description is missing');
    description = 'Product description unavailable';
  } else if (typeof description === 'object' && !description.nodeType) {
    console.warn('Description is not in expected format:', description);
    description = 'Product description unavailable';
  }

  // Process variations
  const processedVariations = processVariations(fields);

  // Generate a slug from the product name
  const slug = generateSlug(fields.name);

  // Create the product object with the original string ID and slug
  return {
    id: item.sys.id, // Use the string ID directly
    contentfulId: item.sys.id, // Store the original Contentful ID
    slug: slug, // Add the URL-friendly slug
    name: fields.name,
    price: fields.price,
    description: description,
    image: imageUrl,
    featured: fields.featured || false,
    variations: processedVariations,
    colors: processedVariations, // Keep colors as an alias for variations for backward compatibility
    sizes: fields.sizes?.map((size) => ({
      name: size.fields.name,
      value: size.fields.value,
    })) || [],
  };
};

// Helper function to process variations from a product
const processVariations = (fields: ContentfulProductFields) => {
  // Use embeddedVariations if available, otherwise use referenced variations
  if (fields.embeddedVariations && fields.embeddedVariations.length > 0) {
    // Use embedded variations
    return fields.embeddedVariations.map(variation => {
      let variationImage = variation.image?.url || '';
      if (variationImage && variationImage.startsWith('//')) {
        variationImage = 'https:' + variationImage;
      }

      return {
        name: variation.name,
        value: variation.value,
        image: variationImage || undefined
      };
    });
  } else if (fields.variations && fields.variations.length > 0) {
    // Fall back to referenced variations
    return fields.variations.map(variation => {
      let variationImage = variation.fields.image?.fields?.file?.url || '';
      if (variationImage && variationImage.startsWith('//')) {
        variationImage = 'https:' + variationImage;
      }

      return {
        name: variation.fields.name,
        value: variation.fields.value,
        image: variationImage || undefined
      };
    });
  }

  return []; // Return empty array if no variations found
};

// Interface for Contentful product entry
interface ContentfulProductFields {
  name: string;
  price: number;
  description: any; // Using 'any' to handle both string and rich text
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
      image?: {
        fields: {
          file: {
            url: string;
          };
        };
      };
    };
  }[];
  embeddedVariations?: {
    name: string;
    value: string;
    image?: {
      url: string;
    };
  }[];
  sizes: {
    fields: {
      name: string;
      value: string;
    };
  }[];
}

// Type for Contentful product entry that satisfies EntrySkeletonType
interface ContentfulProduct extends EntrySkeletonType {
  fields: ContentfulProductFields;
  sys: {
    id: string;
    contentType: {
      sys: {
        id: 'product' | 'Product';
      };
    };
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

// Cache expiration time (5 minutes for production, 2 minutes for development)
const CACHE_EXPIRATION = (import.meta.env.PROD ? 5 : 2) * 60 * 1000;

// Maximum number of entries to fetch per request
const MAX_ENTRIES_PER_REQUEST = 100;

// Function to clear all caches - useful for development and testing
export function clearContentfulCache() {
  productsCache = {
    standard: null,
    preview: null,
    timestamp: 0
  };
  featuredProductsCache = {
    standard: null,
    preview: null,
    timestamp: 0
  };
  // Clear product cache
  Object.keys(productCache).forEach(key => {
    delete productCache[key];
  });

  // Reset the used slugs tracking to ensure fresh slug generation
  Object.keys(usedSlugs).forEach(key => {
    delete usedSlugs[key];
  });
}

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
      return productsCache[cacheKey] || [];
    }

    // Get the client with link resolution for better performance
    // We'll resolve links manually when creating product objects
    const client = getClient(preview, true);

    // Try with both lowercase and uppercase content type names
    let entries: EntryCollection<ContentfulProduct>;
    try {
      // Use query parameters in a type-safe way
      const query: any = {
        content_type: 'product',
        include: 2,
        limit: MAX_ENTRIES_PER_REQUEST,
        order: 'sys.createdAt', // Order by creation date to ensure consistent ordering
      };

      entries = await client.getEntries(query);
    } catch (error) {
      // Try with uppercase content type
      const query: any = {
        content_type: 'Product',
        include: 2,
        limit: MAX_ENTRIES_PER_REQUEST,
        order: 'sys.createdAt', // Order by creation date to ensure consistent ordering
      };

      entries = await client.getEntries(query);
    }

    // Use our helper function to create consistent product objects
    // Use Promise.all with map to process items in parallel for better performance
    const products = await Promise.all(
      entries.items.map(async (item) => createProductFromContentful(item))
    );

    // Check for duplicate slugs and log warnings only in development
    if (import.meta.env.DEV) {
      const slugCounts: Record<string, string[]> = {};
      products.forEach(product => {
        if (!slugCounts[product.slug]) {
          slugCounts[product.slug] = [];
        }
        slugCounts[product.slug].push(product.name);
      });

      // Log any duplicates found
      Object.entries(slugCounts).forEach(([slug, names]) => {
        if (names.length > 1) {
          console.warn(`WARNING: Duplicate slug "${slug}" found for products:`, names.join(', '));
        }
      });
    }

    // Update cache
    productsCache[cacheKey] = products;
    productsCache.timestamp = now;

    return products;
  } catch (error) {
    console.error('Error fetching products from Contentful:', error);
    // Throw the error instead of returning an empty array
    // This will allow the ContentfulProductsProvider to properly set the error state
    throw error;
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
      return featuredProductsCache[cacheKey] || [];
    }

    // If we already have all products cached, filter them instead of making a new API call
    // This significantly reduces API calls and improves performance
    if (productsCache[cacheKey] && (now - productsCache.timestamp < CACHE_EXPIRATION)) {
      const featured = productsCache[cacheKey]?.filter(product => product.featured) || [];
      featuredProductsCache[cacheKey] = featured;
      featuredProductsCache.timestamp = now;
      return featured;
    }

    // Get the client with link resolution for better performance
    const client = getClient(preview, true);

    // Try with both lowercase and uppercase content type names
    let entries: EntryCollection<ContentfulProduct>;
    try {
      // Use query parameters in a type-safe way
      const query: any = {
        content_type: 'product',
        include: 2,
        limit: MAX_ENTRIES_PER_REQUEST,
        order: 'sys.createdAt', // Order by creation date to ensure consistent ordering
      };
      // Add the featured filter
      query['fields.featured'] = true;

      entries = await client.getEntries(query);
    } catch (error) {
      // Try with uppercase content type
      const query: any = {
        content_type: 'Product',
        include: 2,
        limit: MAX_ENTRIES_PER_REQUEST,
        order: 'sys.createdAt', // Order by creation date to ensure consistent ordering
      };
      // Add the featured filter
      query['fields.featured'] = true;

      entries = await client.getEntries(query);
    }

    // Use our helper function to create consistent product objects
    // Use Promise.all with map to process items in parallel for better performance
    const featuredProducts = await Promise.all(
      entries.items.map(async (item) => createProductFromContentful(item))
    );

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
      return productCache[cacheKey].product;
    }

    // Check if we can find this product in the all products cache
    // This significantly reduces API calls and improves performance
    const allProductsCacheKey = preview ? 'preview' : 'standard';
    if (productsCache[allProductsCacheKey] && (now - productsCache.timestamp < CACHE_EXPIRATION)) {
      const cachedProduct = productsCache[allProductsCacheKey]?.find(p =>
        p.id === id || p.contentfulId === id || p.slug === id
      );

      if (cachedProduct) {
        productCache[cacheKey] = { product: cachedProduct, timestamp: now };
        return cachedProduct;
      }
    }

    // Get the client with link resolution for better performance
    const client = getClient(preview, true);

    try {
      // First try to get by ID directly
      const entry = await client.getEntry<ContentfulProduct>(id.toString(), {
        include: 2,
      });

      // Use our helper function to create a consistent product object
      const product = createProductFromContentful(entry);

      // Update cache
      productCache[cacheKey] = { product, timestamp: now };

      return product;
    } catch (entryError) {
      // If direct ID lookup fails, try to find by slug if id is a string that looks like a slug
      if (typeof id === 'string' && id.includes('-')) {
        try {
          // Try to find by slug
          const query: any = {
            content_type: 'product',
            'fields.slug': id,
            include: 2,
            limit: 1,
          };

          const entries = await client.getEntries<ContentfulProduct>(query);

          if (entries.items.length > 0) {
            const product = createProductFromContentful(entries.items[0]);

            // Update cache
            productCache[cacheKey] = { product, timestamp: now };

            return product;
          }
        } catch (slugError) {
          console.error(`Error fetching product with slug ${id}:`, slugError);
        }
      }

      console.error(`Error fetching entry with ID ${id}:`, entryError);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}
