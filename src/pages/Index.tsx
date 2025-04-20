import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopPromoSection from "@/components/ShopPromoSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import { motion } from "@/lib/framer";

const Index = () => {
  return (
    <motion.div
      className="relative bg-omnis-black text-omnis-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ShopPromoSection />
      <NewsletterSection />
      <Footer />
    </motion.div>
  );
};

export default Index;
