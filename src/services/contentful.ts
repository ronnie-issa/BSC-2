import { createClient } from 'contentful';
import type { EntryCollection } from 'contentful';
import type { Product } from '../contexts/ProductContext';

// Contentful client
const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: import.meta.env.CONTENTFUL_ENVIRONMENT || 'master',
});

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
 */
export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const entries: EntryCollection<ContentfulProduct> = await client.getEntries({
      content_type: 'product',
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
    console.error('Error fetching products from Contentful:', error);
    return [];
  }
}

/**
 * Fetch featured products from Contentful
 */
export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
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
 */
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
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
