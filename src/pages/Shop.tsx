
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAP } from '@/lib/gsap';
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

// Define product categories
const categories = ["All", "Jackets", "Hoodies", "T-Shirts", "Pants", "Accessories"];

// Define product colors
const colors = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Gray", value: "gray" },
  { name: "Navy", value: "navy" },
  { name: "Olive", value: "olive" }
];

// Define product sizes
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

// Define sorting options
const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "Name: A-Z", value: "name-asc" },
  { name: "Name: Z-A", value: "name-desc" }
];

// Sample products data
const products = [
  {
    id: 1,
    name: "ZENITH JACKET",
    price: 450,
    category: "Jackets",
    color: "black",
    size: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "VOID HOODIE",
    price: 280,
    category: "Hoodies",
    color: "gray",
    size: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    name: "ECLIPSE PANTS",
    price: 320,
    category: "Pants",
    color: "navy",
    size: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    name: "SHADOW TEE",
    price: 180,
    category: "T-Shirts",
    color: "black",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "MONOLITH SWEATER",
    price: 320,
    category: "Hoodies",
    color: "gray",
    size: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    name: "ORIGIN TOTE",
    price: 160,
    category: "Accessories",
    color: "black",
    size: ["ONE SIZE"],
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 7,
    name: "GHOST JACKET",
    price: 380,
    category: "Jackets",
    color: "white",
    size: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: 8,
    name: "ETHER TEE",
    price: 140,
    category: "T-Shirts",
    color: "white",
    size: ["XS", "S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

const Shop = () => {
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Refs for animations
  const shopRef = useRef<HTMLDivElement>(null);
  const { gsap } = useGSAP();
  
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by color
    if (selectedColors.length > 0) {
      result = result.filter(product => selectedColors.includes(product.color));
    }
    
    // Filter by size
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.size.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch(sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
      default:
        // For simplicity, we'll consider the order in the array as "newest"
        break;
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedColors, selectedSizes, priceRange, sortBy, searchQuery]);
  
  // Animation for products
  useEffect(() => {
    if (!shopRef.current) return;
    
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.shop-header', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
      
      // Products animation
      gsap.from('.product-card', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.3
      });
    }, shopRef);
    
    return () => ctx.revert();
  }, [filteredProducts]);
  
  // Toggle color selection
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };
  
  // Toggle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([0, 600]);
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen" ref={shopRef}>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <header className="shop-header text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">SHOP</h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Browse our collection of premium streetwear essentials. Each piece is crafted with meticulous attention to detail, ensuring unparalleled quality and distinctive style.
            </p>
          </header>
          
          {/* Mobile Filters Button */}
          <div className="md:hidden mb-6 flex justify-between items-center">
            <Button 
              variant="outline" 
              className="border-omnis-gray/30 text-omnis-white"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-omnis-lightgray">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-omnis-gray/30 text-omnis-white text-sm p-2 focus:outline-none focus:border-omnis-white"
              >
                {sortOptions.map((option) => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className="bg-omnis-black"
                  >
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mobile Filters Drawer */}
          <div 
            className={cn(
              "fixed inset-0 bg-omnis-black z-50 md:hidden transition-transform duration-300",
              mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="h-full overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button 
                  variant="ghost" 
                  className="p-1 text-omnis-white hover:bg-transparent"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X size={24} />
                </Button>
              </div>
              
              {/* Mobile Filters Content */}
              <div className="space-y-8">
                {/* Search */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Search</h3>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3 bg-transparent border border-omnis-gray/30 focus:border-omnis-white focus:outline-none text-omnis-white pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-omnis-lightgray" size={18} />
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <button
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "text-sm py-1",
                            selectedCategory === category 
                              ? "text-omnis-white font-medium" 
                              : "text-omnis-lightgray"
                          )}
                        >
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Colors */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Colors</h3>
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <div key={color.value} className="flex items-center">
                        <Checkbox
                          id={`mobile-color-${color.value}`}
                          checked={selectedColors.includes(color.value)}
                          onCheckedChange={() => toggleColor(color.value)}
                          className="border-omnis-gray/30"
                        />
                        <label
                          htmlFor={`mobile-color-${color.value}`}
                          className="ml-2 text-sm text-omnis-lightgray"
                        >
                          {color.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sizes */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          "min-w-[40px] h-10 px-3 text-sm border",
                          selectedSizes.includes(size)
                            ? "border-omnis-white text-omnis-white bg-omnis-black"
                            : "border-omnis-gray/30 text-omnis-lightgray"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={600}
                    step={10}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-omnis-lightgray">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="pt-4 space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-omnis-white text-omnis-white"
                    onClick={() => {
                      resetFilters();
                      setMobileFiltersOpen(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button 
                    className="w-full bg-omnis-white text-omnis-black hover:bg-omnis-lightgray"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Desktop Sidebar Filters */}
            <div className="hidden md:block space-y-8">
              {/* Search */}
              <div>
                <h3 className="text-lg font-medium mb-4">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 bg-transparent border border-omnis-gray/30 focus:border-omnis-white focus:outline-none text-omnis-white pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-omnis-lightgray" size={18} />
                </div>
              </div>
              
              {/* Sort By (Desktop) */}
              <div>
                <h3 className="text-lg font-medium mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-omnis-gray/30 text-omnis-white focus:outline-none focus:border-omnis-white"
                >
                  {sortOptions.map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value}
                      className="bg-omnis-black"
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <Separator className="bg-omnis-gray/20" />
              
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <button
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "text-sm py-1",
                          selectedCategory === category 
                            ? "text-omnis-white font-medium" 
                            : "text-omnis-lightgray hover:text-omnis-white transition-colors"
                        )}
                      >
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-omnis-gray/20" />
              
              {/* Colors */}
              <div>
                <h3 className="text-lg font-medium mb-4">Colors</h3>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <div key={color.value} className="flex items-center">
                      <Checkbox
                        id={`color-${color.value}`}
                        checked={selectedColors.includes(color.value)}
                        onCheckedChange={() => toggleColor(color.value)}
                        className="border-omnis-gray/30"
                      />
                      <label
                        htmlFor={`color-${color.value}`}
                        className="ml-2 text-sm text-omnis-lightgray"
                      >
                        {color.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-omnis-gray/20" />
              
              {/* Sizes */}
              <div>
                <h3 className="text-lg font-medium mb-4">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "min-w-[40px] h-10 px-3 text-sm border",
                        selectedSizes.includes(size)
                          ? "border-omnis-white text-omnis-white"
                          : "border-omnis-gray/30 text-omnis-lightgray hover:border-omnis-white hover:text-omnis-white transition-colors"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-omnis-gray/20" />
              
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={600}
                  step={10}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-omnis-lightgray">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              
              <Separator className="bg-omnis-gray/20" />
              
              {/* Reset Filters */}
              <Button 
                variant="outline" 
                className="w-full border-omnis-white text-omnis-white hover:bg-omnis-white hover:text-omnis-black"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Product Grid */}
            <div className="md:col-span-3">
              {/* Products Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-omnis-lightgray">
                  {filteredProducts.length} products
                </p>
              </div>
              
              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card group cursor-pointer">
                      <div className="relative overflow-hidden aspect-[3/4] mb-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ filter: 'grayscale(100%)' }}
                        />
                        <div className="absolute inset-0 bg-omnis-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-omnis-white text-sm tracking-widest font-medium px-4 py-2 border border-white/50 backdrop-blur-sm bg-black/20">
                            VIEW
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                      <p className="text-omnis-lightgray">${product.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-omnis-lightgray mb-4">No products found</p>
                  <p className="text-omnis-lightgray mb-8">Try adjusting your filters or search query</p>
                  <Button 
                    variant="outline" 
                    className="border-omnis-white text-omnis-white hover:bg-omnis-white hover:text-omnis-black"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
