import { useEffect, useState, useRef } from 'react';
import { Filter, Search, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  color: string;
  size: string[];
  image: string;
  isNew: boolean;
};

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "VOID HOODIE",
    price: 160,
    category: "Hoodies",
    color: "Black",
    size: ["S", "M", "L", "XL"],
    image: "/placeholder.svg",
    isNew: true
  },
  {
    id: 2,
    name: "ECLIPSE T-SHIRT",
    price: 90,
    category: "T-Shirts",
    color: "Black",
    size: ["S", "M", "L", "XL"],
    image: "/placeholder.svg",
    isNew: false
  },
  {
    id: 3,
    name: "ONYX JOGGERS",
    price: 130,
    category: "Pants",
    color: "Black",
    size: ["S", "M", "L", "XL"],
    image: "/placeholder.svg",
    isNew: true
  },
  {
    id: 4,
    name: "GHOST JACKET",
    price: 220,
    category: "Jackets",
    color: "White",
    size: ["S", "M", "L", "XL"],
    image: "/placeholder.svg",
    isNew: false
  },
  {
    id: 5,
    name: "SHADOW CAP",
    price: 80,
    category: "Accessories",
    color: "Black",
    size: ["One Size"],
    image: "/placeholder.svg",
    isNew: false
  },
  {
    id: 6,
    name: "MONOLITH SWEATER",
    price: 150,
    category: "Sweaters",
    color: "Gray",
    size: ["S", "M", "L", "XL"],
    image: "/placeholder.svg",
    isNew: true
  },
  {
    id: 7,
    name: "ORIGIN TOTE",
    price: 95,
    category: "Accessories",
    color: "Black",
    size: ["One Size"],
    image: "/placeholder.svg",
    isNew: false
  },
  {
    id: 8,
    name: "ETHER LONG SLEEVE",
    price: 110,
    category: "T-Shirts",
    color: "White",
    size: ["S", "M", "L", "XL"],
    image: "/placeholder.svg",
    isNew: true
  }
];

// Filter categories
const categories = ["All", "Hoodies", "T-Shirts", "Pants", "Jackets", "Sweaters", "Accessories"];
const colors = ["All", "Black", "White", "Gray"];
const sizes = ["S", "M", "L", "XL", "One Size"];

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColors, setSelectedColors] = useState<string[]>(["All"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Reference for GSAP animations
  const productsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP and its plugins to avoid SSR issues
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('@/lib/gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        gsapModule.gsap.registerPlugin(ScrollTrigger);
        
        // Animation for products
        if (productsGridRef.current) {
          gsapModule.gsap.from(productsGridRef.current.children, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: productsGridRef.current,
              start: "top bottom-=100",
              toggleActions: "play none none none"
            }
          });
        }
        
        console.log('GSAP loaded successfully for Shop page');
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadGSAP();
  }, [filteredProducts]); // Re-run when filtered products change

  // Apply filters
  useEffect(() => {
    let results = [...products];
    
    // Search filter
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter
    if (selectedCategory !== "All") {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Color filter
    if (selectedColors.length && !selectedColors.includes("All")) {
      results = results.filter(product => selectedColors.includes(product.color));
    }
    
    // Size filter
    if (selectedSizes.length) {
      results = results.filter(product => 
        product.size.some(size => selectedSizes.includes(size))
      );
    }
    
    // Sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        results.sort((a, b) => (b.isNew === a.isNew) ? 0 : b.isNew ? 1 : -1);
        break;
      default: // featured or any other case
        // Keep original order
        break;
    }
    
    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, selectedColors, selectedSizes, sortBy]);

  // Toggle a color in the selection
  const toggleColor = (color: string) => {
    if (color === "All") {
      setSelectedColors(["All"]);
      return;
    }
    
    let newColors = [...selectedColors];
    
    // Remove "All" if it's there
    newColors = newColors.filter(c => c !== "All");
    
    if (newColors.includes(color)) {
      newColors = newColors.filter(c => c !== color);
    } else {
      newColors.push(color);
    }
    
    // If empty, add "All" back
    if (newColors.length === 0) {
      newColors = ["All"];
    }
    
    setSelectedColors(newColors);
  };

  // Toggle a size in the selection
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedColors(["All"]);
    setSelectedSizes([]);
    setSortBy("featured");
  };

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-wider mb-4">SHOP</h1>
          <p className="text-omnis-lightgray max-w-2xl">
            Explore our collection of premium streetwear essentials. Each piece is crafted with meticulous attention to detail and quality materials.
          </p>
        </header>
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            className="border-omnis-gray text-omnis-white flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            Filters
          </Button>
          
          <div className="flex items-center">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-omnis-gray bg-omnis-darkgray">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-omnis-darkgray border-omnis-gray">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Mobile Filters Drawer */}
        <Collapsible
          open={isFilterOpen}
          onOpenChange={setIsFilterOpen}
          className="lg:hidden mb-8 bg-omnis-darkgray border border-omnis-gray rounded-md overflow-hidden"
        >
          <CollapsibleContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-semibold text-lg">Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                <X size={18} />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h4 className="text-sm font-medium mb-2">Search</h4>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-omnis-lightgray" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 bg-omnis-black border-omnis-gray"
                  />
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      size="sm"
                      className={`w-full justify-start ${
                        selectedCategory === category 
                          ? "bg-omnis-gray text-omnis-white" 
                          : "text-omnis-lightgray hover:text-omnis-white"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Colors */}
              <div>
                <h4 className="text-sm font-medium mb-2">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant="outline"
                      size="sm"
                      className={`border ${
                        selectedColors.includes(color) 
                          ? "border-omnis-white" 
                          : "border-omnis-gray text-omnis-lightgray"
                      }`}
                      onClick={() => toggleColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Sizes */}
              <div>
                <h4 className="text-sm font-medium mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      className={`border ${
                        selectedSizes.includes(size) 
                          ? "border-omnis-white" 
                          : "border-omnis-gray text-omnis-lightgray"
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full border-omnis-gray hover:border-red-500 hover:text-red-500"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 space-y-8 h-fit sticky top-32">
            {/* Search */}
            <div>
              <h3 className="font-heading font-medium mb-3">SEARCH</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-omnis-lightgray" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-omnis-darkgray border-omnis-gray"
                />
              </div>
            </div>
            
            {/* Sort By */}
            <div>
              <h3 className="font-heading font-medium mb-3">SORT BY</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full border-omnis-gray bg-omnis-darkgray">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-omnis-darkgray border-omnis-gray">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="font-heading font-medium mb-3">CATEGORY</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      selectedCategory === category 
                        ? "bg-omnis-gray text-omnis-white" 
                        : "text-omnis-lightgray hover:text-omnis-white"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Colors */}
            <div>
              <h3 className="font-heading font-medium mb-3">COLOR</h3>
              <div className="space-y-2">
                {colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <Checkbox 
                      id={`color-${color}`} 
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                      className="border-omnis-gray data-[state=checked]:bg-omnis-white data-[state=checked]:text-omnis-black"
                    />
                    <label 
                      htmlFor={`color-${color}`}
                      className="ml-2 text-sm cursor-pointer"
                    >
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div>
              <h3 className="font-heading font-medium mb-3">SIZE</h3>
              <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap gap-2">
                {sizes.map((size) => (
                  <ToggleGroupItem 
                    key={size} 
                    value={size} 
                    className="border-omnis-gray data-[state=on]:bg-omnis-white data-[state=on]:text-omnis-black"
                    pressed={selectedSizes.includes(size)}
                    onPressedChange={() => toggleSize(size)}
                  >
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <Button 
              variant="outline"
              className="w-full border-omnis-gray hover:border-red-500 hover:text-red-500"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-omnis-lightgray">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            
            <div ref={productsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="aspect-[3/4] bg-omnis-darkgray relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isNew && (
                      <div className="absolute top-3 right-3 bg-omnis-white text-omnis-black text-xs font-medium px-2 py-1">
                        NEW
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="font-heading font-medium">{product.name}</h3>
                    <p className="text-omnis-lightgray text-sm">{product.category}</p>
                    <p className="font-medium">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
