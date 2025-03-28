
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CollectionSection from '@/components/CollectionSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Dynamically import GSAP and its plugins to avoid SSR issues
    const loadGSAP = async () => {
      try {
        const { gsap } = await import('@/lib/gsap');
        // Any global initialization can go here if needed
        console.log('GSAP loaded successfully');
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadGSAP();
  }, []);

  return (
    <div className="relative bg-omnis-black text-omnis-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CollectionSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
