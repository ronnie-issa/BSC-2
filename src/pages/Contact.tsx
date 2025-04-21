import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import { motion, useInView } from "@/lib/framer";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // We'll use Framer Motion's built-in animation capabilities instead of this effect

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6" ref={contentRef}>
          <motion.header
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">
              CONTACT US
            </h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Have a question or need assistance? Reach out to our team and
              we'll get back to you as soon as possible.
            </p>
          </motion.header>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <motion.div
                className="lg:col-span-2 space-y-10"
                initial={{ y: 30, opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <ul className="space-y-6">
                    <li className="flex items-start space-x-4">
                      <Mail className="mt-1 text-omnis-lightgray" size={20} />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-omnis-lightgray">
                          <a
                            href="mailto:info@omnisclothing.net"
                            className="hover:text-white transition-colors duration-300 underline underline-offset-2"
                          >
                            info@omnisclothing.net
                          </a>
                        </p>
                        <p className="text-omnis-lightgray">
                          <a
                            href="mailto:support@omnisclothing.net"
                            className="hover:text-white transition-colors duration-300 underline underline-offset-2"
                          >
                            support@omnisclothing.net
                          </a>
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-4">
                      <Phone className="mt-1 text-omnis-lightgray" size={20} />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-omnis-lightgray">
                          <a
                            href="tel:+96181386697"
                            className="hover:text-white transition-colors duration-300 underline underline-offset-2"
                          >
                            +961 81 386 697
                          </a>
                        </p>
                        <p className="text-sm text-omnis-lightgray/70">
                          Mon-Fri, 9am-6pm EST
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-4">
                      <MapPin className="mt-1 text-omnis-lightgray" size={20} />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-omnis-lightgray">Beirut</p>
                        <p className="text-omnis-lightgray">Lebanon</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Hours</h2>
                  <ul className="space-y-2 text-omnis-lightgray">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                className="lg:col-span-3"
                initial={{ y: 30, opacity: 0 }}
                animate={
                  isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className="w-full px-4 py-3 bg-omnis-darkgray border border-omnis-gray/20 rounded-none focus:outline-none focus:ring-2 focus:ring-omnis-white/50 text-omnis-white"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-omnis-darkgray border border-omnis-gray/20 rounded-none focus:outline-none focus:ring-2 focus:ring-omnis-white/50 text-omnis-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-omnis-darkgray border border-omnis-gray/20 rounded-none focus:outline-none focus:ring-2 focus:ring-omnis-white/50 text-omnis-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Shipping & Delivery">
                        Shipping & Delivery
                      </option>
                      <option value="Returns & Exchanges">
                        Returns & Exchanges
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      autoComplete="off"
                      rows={6}
                      className="w-full px-4 py-3 bg-omnis-darkgray border border-omnis-gray/20 rounded-none focus:outline-none focus:ring-2 focus:ring-omnis-white/50 text-omnis-white resize-none"
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-6 text-white border border-omnis-white bg-transparent hover:bg-omnis-white hover:text-omnis-black text-sm uppercase tracking-widest transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
