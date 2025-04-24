/**
 * This script creates a products.json file in the data directory
 * It uses the local products data as a starting point
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// Sample products data
const products = [
  {
    id: 1,
    name: "ZENITH JACKET",
    price: 450,
    image: "/images/products/zenith-jacket-black.jpg",
    description: "The Zenith Jacket embodies the essence of modern minimalism. Crafted from premium technical fabric with a water-resistant finish, this jacket features architectural seams and a streamlined silhouette for ultimate versatility. Layer over any outfit for an instant elevation of style.",
    featured: true,
    variations: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" }
    ],
    sizes: [
      { name: "XS", value: "xs" },
      { name: "S", value: "s" },
      { name: "M", value: "m" },
      { name: "L", value: "l" },
      { name: "XL", value: "xl" }
    ]
  },
  {
    id: 2,
    name: "ECLIPSE PANTS",
    price: 320,
    image: "/images/products/eclipse-pants-navy.jpg",
    description: "Eclipse Pants blend formal sensibilities with modern construction. Featuring a relaxed fit with tapered legs, these pants are crafted from a custom-developed wool blend with 4-way stretch for unparalleled comfort and freedom of movement.",
    featured: true,
    variations: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" }
    ],
    sizes: [
      { name: "XS", value: "xs" },
      { name: "S", value: "s" },
      { name: "M", value: "m" },
      { name: "L", value: "l" },
      { name: "XL", value: "xl" }
    ]
  },
  {
    id: 3,
    name: "SHADOW TEE",
    price: 180,
    image: "/images/products/ether-tee-white.jpg",
    description: "The Shadow Tee exemplifies our commitment to quality basics. Cut from heavyweight cotton jersey with a boxy silhouette, this tee features reinforced seams and a precision-cut neckline for the perfect everyday essential.",
    featured: true,
    variations: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#FFFFFF" }
    ],
    sizes: [
      { name: "XS", value: "xs" },
      { name: "S", value: "s" },
      { name: "M", value: "m" },
      { name: "L", value: "l" },
      { name: "XL", value: "xl" }
    ]
  },
  {
    id: 4,
    name: "NEXUS HOODIE",
    price: 280,
    image: "/images/products/zenith-jacket-black.jpg",
    description: "The Nexus Hoodie redefines comfort with its premium cotton-blend fabric and relaxed fit. Featuring a minimalist design with subtle branding, this versatile piece transitions seamlessly from workouts to weekend outings.",
    featured: false,
    variations: [
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" }
    ],
    sizes: [
      { name: "XS", value: "xs" },
      { name: "S", value: "s" },
      { name: "M", value: "m" },
      { name: "L", value: "l" },
      { name: "XL", value: "xl" }
    ]
  },
  {
    id: 5,
    name: "QUANTUM SHORTS",
    price: 220,
    image: "/images/products/eclipse-pants-navy.jpg",
    description: "Quantum Shorts combine athletic performance with urban aesthetics. Made from a lightweight, quick-drying fabric with a four-way stretch, these shorts offer unrestricted movement and all-day comfort.",
    featured: false,
    variations: [
      { name: "Navy", value: "#000080" },
      { name: "Black", value: "#000000" }
    ],
    sizes: [
      { name: "XS", value: "xs" },
      { name: "S", value: "s" },
      { name: "M", value: "m" },
      { name: "L", value: "l" },
      { name: "XL", value: "xl" }
    ]
  },
  {
    id: 6,
    name: "VERTEX POLO",
    price: 160,
    image: "/images/products/ether-tee-white.jpg",
    description: "The Vertex Polo elevates a classic silhouette with modern details. Crafted from a premium pique cotton with a touch of stretch, this polo features a clean design with minimal branding for versatile styling options.",
    featured: false,
    variations: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" }
    ],
    sizes: [
      { name: "XS", value: "xs" },
      { name: "S", value: "s" },
      { name: "M", value: "m" },
      { name: "L", value: "l" },
      { name: "XL", value: "xl" }
    ]
  }
];

// Create the products.json file
const productsData = { products };
const filePath = path.join(dataDir, 'products.json');

fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2));
console.log(`Created products.json file at ${filePath}`);
