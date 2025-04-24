// This file provides mock data for local development
import { products } from '../data/products';

// Mock API handler for local development
export function setupMockHandlers() {
  // Only run in development
  if (import.meta.env.DEV) {
    console.log('Setting up mock API handlers for development');
    
    // Override fetch for specific API endpoints
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
      // Handle product API requests
      if (url.includes('/api/get-products')) {
        console.log('Intercepting API request to:', url);
        
        // Check if we want featured products
        const isFeatured = url.includes('featured=true');
        
        // Return mock response
        return Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          json: () => Promise.resolve(
            isFeatured 
              ? products.filter(p => p.id <= 3) // Just use first 3 as "featured"
              : products
          )
        });
      }
      
      // Pass through all other requests
      return originalFetch(url, options);
    };
  }
}
