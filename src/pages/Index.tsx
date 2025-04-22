import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopPromoSection from "@/components/ShopPromoSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import CenteredLogo from "@/components/CenteredLogo";
import { motion } from "@/lib/framer";

const Index = () => {
  // Track scroll position
  const [scrollY, setScrollY] = useState(0);

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="relative bg-omnis-black text-omnis-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Centered logo that fades out on scroll */}
      <CenteredLogo scrollY={scrollY} />

      {/* Navbar with logo that fades in on scroll */}
      <Navbar scrollY={scrollY} />

      <HeroSection />
      <AboutSection />
      <ShopPromoSection />
      <NewsletterSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
