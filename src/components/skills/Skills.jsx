import React, { useState, useEffect } from "react";

import { fadeIn, textVariant } from "../../utils/motion";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { SectionWrapper } from "../hoc";
import { useResumeProvider } from "../../context";

const Skills = () => {
  const resume = useResumeProvider();
  const { skills } = resume || {};

  return (
    <>
      <motion.div id="tech" variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills.</h2>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-8 mt-10">
        {skills.map((tech, index) => (
          <TechnologyCard key={tech.title} technology={tech} index={index} />
        ))}
      </div>
    </>
  );
};

const TechnologyCard = ({ technology, index }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = technology.icon;
    img.onload = () => setLoading(false);
  }, [technology.icon]);

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.33, 0.75)}
      className="flex flex-col items-center p-4 bg-tertiary rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
      style={{ width: "10rem" }}
    >
      {loading ? (
        <div className="w-16 h-16 flex items-center justify-center mb-2">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
        </div>
      ) : (
        <img
          src={technology.icon}
          alt={`${technology.title} icon`}
          className="w-16 h-16 object-contain mb-2"
        />
      )}
      <h5 className="text-lg font-medium text-center">{technology.title}</h5>
    </motion.div>
  );
};

export default SectionWrapper(Skills, "");
