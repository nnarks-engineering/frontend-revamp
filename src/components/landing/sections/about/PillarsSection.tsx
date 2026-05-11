import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../../Section";

// Import project images
import AboutUs from "@/assets/img/landing/about-us.webp";
import Agriculture from "@/assets/img/landing/agriculture.webp";
import Contractor from "@/assets/img/landing/contractor.webp";
import Contributors from "@/assets/img/landing/contributors.webp";
import Diaspora from "@/assets/img/landing/diaspora.webp";

const images = [AboutUs, Contractor, Diaspora, Contributors, Agriculture];

export default function PillarsSection() {
  const { t } = useTranslation(["landing"]);
  const items = t("landing:aboutPillars.items", { returnObjects: true }) as { title: string; description: string }[];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Section className="bg-white py-24 md:py-32" contentClassName="max-w-7xl mx-auto px-4">
      <div className="space-y-12">
        {/* Header Section */}
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-5xl md:text-7xl font-black font-millik uppercase tracking-tight text-neutral-900"
        >
          OUR PILLARS
        </motion.h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-b border-neutral-200 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="relative py-4 text-lg md:text-xl font-bold transition-all duration-300 whitespace-nowrap group"
            >
              <span className={`transition-colors duration-300 ${activeTab === index ? "text-neutral-900" : "text-neutral-300 group-hover:text-neutral-500"}`}>
                {/* Extract short title if possible, otherwise use full */}
                {item.title.split(' ').pop()}
              </span>
              {activeTab === index && (
                <motion.div
                  layoutId="pillarActiveTab"
                  className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-950"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Card Area */}
        <div className="relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden bg-[#f3f5f3] w-full"
            >
              {/* Left Side: Image with Badge Overlay */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                <motion.div 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full md:rounded-tr-3xl overflow-hidden relative"
                >
                  <img 
                    src={images[activeTab % images.length]} 
                    alt={items[activeTab].title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating Badge (Decorative like the Wise image) */}
                  <div className="absolute bottom-10 left-10 right-10">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/90 backdrop-blur-md rounded-3xl p-6 flex items-center gap-4 shadow-2xl border border-white/20 max-w-sm"
                    >
                      <div className="size-12 rounded-full bg-primary flex items-center justify-center">
                         <div className="size-6 border-2 border-white rounded-full opacity-50" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Protocol Active</span>
                        <span className="text-lg font-bold text-neutral-900 leading-none">Nnarks Verified</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Textual Description */}
              <div className="p-6 md:p-12 flex flex-col justify-center space-y-8">
                <motion.h3 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold font-millik text-neutral-900 leading-tight"
                >
                  {items[activeTab].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-xl font-poppins"
                >
                  {items[activeTab].description}
                </motion.p>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="w-24 h-2 bg-neutral-900 rounded-full origin-left"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
