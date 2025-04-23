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

/**
 * Fetch all products from Contentful
 * @param preview Whether to use the preview API (for draft content)
 */
export async function fetchAllProducts(preview = false): Promise<Product[]> {
  try {
    console.log('Fetching all products, preview mode:', preview);
    const client = getClient(preview);
    const entries: EntryCollection<ContentfulProduct> = await client.getEntries({
      content_type: 'product',
      include: 2,
    });

    console.log('Content types available:', entries.items.map(item => item.sys.contentType?.sys.id));

    console.log('Fetched products:', entries.items.length);
    console.log('Raw response:', JSON.stringify(entries, null, 2));

    return entries.items.map((item) => {
      const fields = item.fields;

      return {
        id: parseInt(item.sys.id),
        name: fields.name,
        price: fields.price,
        description: fields.description,
        image: fields.image?.fields?.file?.url || '',
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
  } catch (error) {
    console.error('Error fetching products from Contentful:', error);
    return [];
  }
}

/**
 * Fetch featured products from Contentful
 * @param preview Whether to use the preview API (for draft content)
 */
export async function fetchFeaturedProducts(preview = false): Promise<Product[]> {
  try {
    const client = getClient(preview);
    const entries: EntryCollection<ContentfulProduct> = await client.getEntries({
      content_type: 'product',
      'fields.featured': true,
      include: 2,
    });

    return entries.items.map((item) => {
      const fields = item.fields;

      return {
        id: parseInt(item.sys.id),
        name: fields.name,
        price: fields.price,
        description: fields.description,
        image: fields.image?.fields?.file?.url || '',
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
  } catch (error) {
    console.error('Error fetching featured products from Contentful:', error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 * @param id The product ID
 * @param preview Whether to use the preview API (for draft content)
 */
export async function fetchProductById(id: number, preview = false): Promise<Product | null> {
  try {
    const client = getClient(preview);
    const entry = await client.getEntry<ContentfulProduct>(id.toString(), {
      include: 2,
    });

    const fields = entry.fields;

    return {
      id: parseInt(entry.sys.id),
      name: fields.name,
      price: fields.price,
      description: fields.description,
      image: fields.image?.fields?.file?.url || '',
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
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}
