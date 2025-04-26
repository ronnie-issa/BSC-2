import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";

// Simplified About page without heavy animations
const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <SEO
        title="About | OMNIS"
        description="Learn about OMNIS, our story, vision, and commitment to quality and sustainability in fashion."
      />
      <Navbar />

      <main
        className={`pt-32 pb-20 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <div className="container mx-auto relative">
          <Breadcrumbs items={[{ label: "ABOUT", path: "/about" }]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-20">
            <div>
              <h1 className="text-2xl font-bold mb-6 uppercase tracking-tight">
                OUR STORY
              </h1>
              <div className="space-y-4 text-omnis-lightgray">
                <p>
                  Founded in 2020,{" "}
                  <span
                    className="font-logo font-medium"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    OMNIS
                  </span>{" "}
                  emerged from a vision to create garments that transcend
                  seasonal trends and embrace timeless design. Our founder,
                  drawn to the intersection of minimalism and utility, sought to
                  establish a brand that speaks to those who value quality and
                  thoughtful design over fleeting fashion statements.
                </p>
                <p>
                  The name{" "}
                  <span
                    className="font-logo font-medium"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    OMNIS
                  </span>
                  , derived from the Latin word for "all" or "everything,"
                  embodies our philosophy that clothing should be versatile,
                  adaptable, and inclusive. We design for the modern individual
                  who moves fluidly between different contexts and demands
                  clothing that can keep pace.
                </p>
              </div>
            </div>

            <div className="h-[500px] relative overflow-hidden">
              <img
                src="/images/about/studio.jpg"
                alt="OMNIS Studio"
                className="w-full h-full object-cover object-center"
                style={{ filter: "grayscale(100%)" }}
                loading="eager"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 border border-omnis-gray/20">
              <h3 className="text-xl font-bold mb-4 uppercase">
                DESIGN PHILOSOPHY
              </h3>
              <p className="text-omnis-lightgray">
                Our approach to design is rooted in architectural principles:
                clean lines, considered proportions, and a focus on materiality.
                We embrace restraint, believing that true luxury lies in what is
                essential rather than what is excessive.
              </p>
            </div>

            <div className="p-8 border border-omnis-gray/20">
              <h3 className="text-xl font-bold mb-4 uppercase">
                CRAFTSMANSHIP
              </h3>
              <p className="text-omnis-lightgray">
                Each{" "}
                <span
                  className="font-logo font-medium"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  OMNIS
                </span>{" "}
                piece is meticulously crafted using premium materials and
                ethical production methods. We work with skilled artisans who
                share our commitment to quality and detail, ensuring that every
                garment meets our exacting standards.
              </p>
            </div>

            <div className="p-8 border border-omnis-gray/20">
              <h3 className="text-xl font-bold mb-4 uppercase">
                SUSTAINABILITY
              </h3>
              <p className="text-omnis-lightgray">
                We believe in responsible fashion. From sourcing eco-friendly
                materials to implementing waste-reducing production processes,
                sustainability informs every decision we make. Our goal is to
                create garments that not only look good but do good.
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">
              OUR VISION
            </h2>
            <p className="text-xl text-omnis-lightgray italic">
              "At{" "}
              <span
                className="font-logo font-medium"
                style={{ letterSpacing: "-0.5px" }}
              >
                OMNIS
              </span>
              , we envision a future where clothing transcends mere
              fashion—where each piece represents a commitment to quality,
              sustainability, and timeless design. We create for those who seek
              substance in style."
            </p>
            <p className="mt-4 text-omnis-lightgray">— Ronnie Issa, Founder</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="h-[500px] relative overflow-hidden">
              <img
                src="/images/about/team.jpg"
                alt="OMNIS Team"
                className="w-full h-full object-cover object-center"
                style={{ filter: "grayscale(100%)" }}
                loading="eager"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">
                THE TEAM
              </h2>
              <div className="space-y-4 text-omnis-lightgray">
                <p>
                  Behind{" "}
                  <span
                    className="font-logo font-medium"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    OMNIS
                  </span>{" "}
                  is a diverse team of designers, craftspeople, and creative
                  thinkers united by a shared passion for redefining
                  contemporary fashion. Our collective experience spans haute
                  couture, streetwear, textile innovation, and sustainable
                  design.
                </p>
                <p>
                  We believe that the best ideas emerge from collaboration,
                  which is why we cultivate an environment that celebrates
                  different perspectives and encourages creative risk-taking.
                  Together, we push the boundaries of what fashion can be and
                  mean in today's world.
                </p>
                <p>
                  Based in our studio in Berlin, with satellite offices in Tokyo
                  and New York, we draw inspiration from global design movements
                  while maintaining a distinctly unified aesthetic that defines
                  the{" "}
                  <span
                    className="font-logo font-medium"
                    style={{ letterSpacing: "-0.5px" }}
                  >
                    OMNIS
                  </span>{" "}
                  brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
