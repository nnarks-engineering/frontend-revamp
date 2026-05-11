import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Section } from "../../Section";
import NurseLondon from "@/assets/img/landing/nurse-london.png";
import EngineerNY from "@/assets/img/landing/engineer-ny.png";
import TeacherToronto from "@/assets/img/landing/teacher-toronto.png";

const images = [NurseLondon, EngineerNY, TeacherToronto];

export default function StorySection() {
  const { t } = useTranslation(["landing"]);
  const stories = t("landing:aboutStory.stories", { returnObjects: true }) as { role: string; description: string }[];

  return (
    <Section className="bg-white py-32" contentClassName="max-w-7xl mx-auto px-4 space-y-32">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-bold font-clash-display">
          {t("landing:aboutStory.title")}
        </h2>
        <p className="text-xl md:text-3xl font-medium text-foreground/80 leading-relaxed">
          {t("landing:aboutStory.context")}
        </p>
      </div>

      <div className="space-y-40">
        {stories.map((story, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 lg:gap-32 items-center`}
          >
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-bold font-clash-display text-primary">
                {story.role}
              </h3>
              <p className="text-2xl md:text-4xl font-medium leading-tight">
                {story.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src={images[index]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={story.role} 
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12 pt-20">
        <p className="text-2xl md:text-4xl font-medium leading-snug text-foreground/70 italic">
          "{t("landing:aboutStory.conclusion")}"
        </p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block px-12 py-6 bg-primary-950 text-white rounded-full text-3xl font-bold font-clash-display"
        >
          {t("landing:aboutStory.resolution")}
        </motion.div>
      </div>
    </Section>
  );
}
