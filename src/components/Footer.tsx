
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-omnis-black py-12 border-t border-omnis-gray/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-heading font-black tracking-widest mb-6">OMNIS</h3>
            <p className="text-omnis-lightgray text-sm leading-relaxed">
              Redefining the boundaries between high fashion and streetwear since 2020.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-omnis-lightgray">
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm hover:text-omnis-white transition-colors">About</a></li>
              <li><a href="#collection" className="text-sm hover:text-omnis-white transition-colors">Collection</a></li>
              <li><a href="#shop" className="text-sm hover:text-omnis-white transition-colors">Shop</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Help</h4>
            <ul className="space-y-2 text-omnis-lightgray">
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Shipping</a></li>
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Sizing</a></li>
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-omnis-lightgray">
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-omnis-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-omnis-gray/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-omnis-lightgray text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OMNIS. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-omnis-lightgray hover:text-omnis-white transition-colors group"
          >
            <span className="text-xs uppercase tracking-wider">Back to top</span>
            <ArrowUp size={16} className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
