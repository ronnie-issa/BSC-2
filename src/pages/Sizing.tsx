import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { motion, useInView } from "@/lib/framer";

const Sizing = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  return (
    <div className="relative bg-omnis-black text-omnis-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto" ref={contentRef}>
          <motion.header
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight">
              SIZING GUIDE
            </h1>
            <div className="w-20 h-0.5 bg-omnis-white mx-auto mb-8"></div>
            <p className="text-omnis-lightgray max-w-2xl mx-auto">
              Find your perfect fit with our comprehensive sizing information.
            </p>
          </motion.header>

          <div className="max-w-4xl mx-auto space-y-16">
            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                How to Measure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Upper Body</h3>
                  <ul className="space-y-3 text-omnis-lightgray">
                    <li>
                      <span className="font-medium text-omnis-white">
                        Chest:
                      </span>{" "}
                      Measure around the fullest part of your chest, keeping the
                      tape horizontal.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Waist:
                      </span>{" "}
                      Measure around your natural waistline, keeping the tape
                      comfortably loose.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Hips:
                      </span>{" "}
                      Measure around the fullest part of your hips.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Shoulder Width:
                      </span>{" "}
                      Measure from the edge of one shoulder to the edge of the
                      other.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Sleeve Length:
                      </span>{" "}
                      Measure from the shoulder seam to the wrist.
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Lower Body</h3>
                  <ul className="space-y-3 text-omnis-lightgray">
                    <li>
                      <span className="font-medium text-omnis-white">
                        Inseam:
                      </span>{" "}
                      Measure from the crotch to the bottom of the leg.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Leg Opening:
                      </span>{" "}
                      Measure the circumference of the leg opening.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Rise:
                      </span>{" "}
                      Measure from the crotch seam to the top of the waistband.
                    </li>
                    <li>
                      <span className="font-medium text-omnis-white">
                        Thigh:
                      </span>{" "}
                      Measure around the fullest part of your thigh.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center">
                Size Charts
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">
                    Tops (Measurements in inches)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-omnis-gray/20">
                          <th className="text-left py-4 px-4">Size</th>
                          <th className="text-left py-4 px-4">Chest</th>
                          <th className="text-left py-4 px-4">Waist</th>
                          <th className="text-left py-4 px-4">Shoulder</th>
                          <th className="text-left py-4 px-4">Sleeve Length</th>
                        </tr>
                      </thead>
                      <tbody className="text-omnis-lightgray">
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">XS</td>
                          <td className="py-3 px-4">34-36</td>
                          <td className="py-3 px-4">28-30</td>
                          <td className="py-3 px-4">16.5</td>
                          <td className="py-3 px-4">23.5</td>
                        </tr>
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">S</td>
                          <td className="py-3 px-4">36-38</td>
                          <td className="py-3 px-4">30-32</td>
                          <td className="py-3 px-4">17</td>
                          <td className="py-3 px-4">24</td>
                        </tr>
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">M</td>
                          <td className="py-3 px-4">38-40</td>
                          <td className="py-3 px-4">32-34</td>
                          <td className="py-3 px-4">17.5</td>
                          <td className="py-3 px-4">24.5</td>
                        </tr>
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">L</td>
                          <td className="py-3 px-4">40-42</td>
                          <td className="py-3 px-4">34-36</td>
                          <td className="py-3 px-4">18</td>
                          <td className="py-3 px-4">25</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">XL</td>
                          <td className="py-3 px-4">42-44</td>
                          <td className="py-3 px-4">36-38</td>
                          <td className="py-3 px-4">18.5</td>
                          <td className="py-3 px-4">25.5</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-medium mb-4">
                    Bottoms (Measurements in inches)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-omnis-gray/20">
                          <th className="text-left py-4 px-4">Size</th>
                          <th className="text-left py-4 px-4">Waist</th>
                          <th className="text-left py-4 px-4">Hip</th>
                          <th className="text-left py-4 px-4">Inseam</th>
                          <th className="text-left py-4 px-4">Rise</th>
                        </tr>
                      </thead>
                      <tbody className="text-omnis-lightgray">
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">28</td>
                          <td className="py-3 px-4">28-29</td>
                          <td className="py-3 px-4">35-36</td>
                          <td className="py-3 px-4">30</td>
                          <td className="py-3 px-4">10</td>
                        </tr>
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">30</td>
                          <td className="py-3 px-4">30-31</td>
                          <td className="py-3 px-4">37-38</td>
                          <td className="py-3 px-4">30</td>
                          <td className="py-3 px-4">10.25</td>
                        </tr>
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">32</td>
                          <td className="py-3 px-4">32-33</td>
                          <td className="py-3 px-4">39-40</td>
                          <td className="py-3 px-4">30</td>
                          <td className="py-3 px-4">10.5</td>
                        </tr>
                        <tr className="border-b border-omnis-gray/10">
                          <td className="py-3 px-4">34</td>
                          <td className="py-3 px-4">34-35</td>
                          <td className="py-3 px-4">41-42</td>
                          <td className="py-3 px-4">30</td>
                          <td className="py-3 px-4">10.75</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">36</td>
                          <td className="py-3 px-4">36-37</td>
                          <td className="py-3 px-4">43-44</td>
                          <td className="py-3 px-4">30</td>
                          <td className="py-3 px-4">11</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-4">Fit Notes</h2>
              <div className="text-omnis-lightgray space-y-4">
                <p>
                  OMNIS designs typically follow a modern, slightly oversized
                  fit. If you prefer a more fitted look, we recommend sizing
                  down.
                </p>
                <p>
                  Our outerwear is designed with layering in mind, so there is
                  enough room to wear a light sweater or hoodie underneath.
                </p>
                <p>
                  If you're between sizes or unsure about the fit, please
                  contact our customer service for personalized assistance.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sizing;
