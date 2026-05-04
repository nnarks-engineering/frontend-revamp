import AgricultureImg from "@/assets/img/landing/agriculture.png";
import ContractorImg from "@/assets/img/landing/contractor.png";
import ContributorsImg from "@/assets/img/landing/contributors.png";
import DiasporaImg from "@/assets/img/landing/diaspora.png";
import BusinessArrow from "@/assets/svg/landing/arrow_business.svg";
import { motion } from "framer-motion";


const LandingUserGallery = () => {
  return (
    <div className="relative w-full max-w-4xl max-h-[80vh] aspect-[1245/834] mx-auto">
      {/* Decorative Arrow */}
      <div className="absolute left-[calc(50%_-1rem)] top-[-5%] h-[calc(15%)] opacity-20 hidden md:block">
        <img src={BusinessArrow} className="h-full invert dark:invert-0" alt="" />
      </div>

      {/* Diaspora Investor */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute left-0 top-[5%] w-[32%] z-10 hover:z-30"
      >
        <img
          className="hover:scale-105 transition-transform duration-500 rounded-full border-4 border-white/10 shadow-2xl"
          src={DiasporaImg}
          alt="Diaspora Investor"
        />
      </motion.div>

      {/* Local Contractor */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute left-[35%] top-[20%]  w-[30%] z-15 hover:z-30"
      >
        <img
          className="hover:scale-105 transition-transform duration-500 rounded-full border-4 border-white/10 shadow-2xl"
          src={ContractorImg}
          alt="Local Contractor"
        />
      </motion.div>

      {/* Agriculture Partner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute left-[65%] top-[0%] w-[28%] z-10 hover:z-30 "
      >
        <img
          className="hover:scale-105 transition-transform duration-500 rounded-full border-4 border-white/10 shadow-2xl"
          src={AgricultureImg}
          alt="Agriculture Partner"
        />
      </motion.div>

      {/* Group Contributors */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="absolute left-[15%] top-[55%] w-[25%] z-30"
      >
        <img
          className="hover:scale-105 transition-transform duration-500 rounded-full border-4 border-white/10 shadow-2xl"
          src={ContributorsImg}
          alt="Group Contributors"
        />
      </motion.div>

      {/* Repeat some for density or add more if quota allowed */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute left-[55%] top-[60%] w-[20%] z-20 transition-all hover:z-30"
      >
        <img
          className="hover:scale-105 transition-transform duration-500 rounded-full border-4 border-white/10 shadow-2xl grayscale hover:grayscale-0"
          src={DiasporaImg}
          alt="Diaspora Partner"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute left-[75%] top-[45%] w-[25%] z-10 hover:z-30"
      >
        <img
          className="hover:scale-105 transition-transform duration-500 rounded-full border-4 border-white/10 shadow-2xl"
          src={ContractorImg}
          alt="Technical Partner"
        />
      </motion.div>
    </div>
  );
};

export default LandingUserGallery;
