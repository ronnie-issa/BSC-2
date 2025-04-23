import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from './ProductContext';
import { fetchAllProducts, fetchFeaturedProducts } from '../services/contentful';

interface ProductsContextType {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ContentfulProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch products from Contentful
  const refreshProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all products
      const allProducts = await fetchAllProducts();
      setProducts(allProducts);
      
      // Fetch featured products
      const featured = await fetchFeaturedProducts();
      setFeaturedProducts(featured);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        featuredProducts,
        loading,
        error,
        refreshProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useContentfulProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useContentfulProducts must be used within a ContentfulProductsProvider');
  }
  return context;
};
