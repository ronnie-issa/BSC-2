import { useRef } from "react";
import { motion, useInView } from "@/lib/framer";
import { useToast } from "@/components/ui/use-toast";

const NewsletterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  // Use Framer Motion's useInView hook for scroll-based animations
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: `You've been added to our newsletter with ${email}`,
      });

      // Reset form
      form.reset();
    }, 1000);
  };

  return (
    <motion.section
      className="py-20 md:py-32 bg-omnis-black"
      ref={sectionRef}
      initial={{ y: 50, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            JOIN THE MOVEMENT
          </h2>
          <p className="text-omnis-lightgray mb-10 md:text-lg">
            Subscribe to our newsletter for exclusive early access to new
            releases, behind-the-scenes content, and special offers.
          </p>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              autoComplete="email"
              className="flex-grow px-4 py-3 bg-transparent border border-omnis-gray/30 focus:border-omnis-white focus:outline-none transition-colors text-omnis-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-omnis-white text-omnis-black font-medium hover:bg-omnis-lightgray transition-colors"
            >
              SUBSCRIBE
            </button>
          </motion.form>

          <motion.p
            className="mt-4 text-xs text-omnis-lightgray/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates from our company.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NewsletterSection;
