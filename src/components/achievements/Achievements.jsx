import React from "react";
import { motion } from "framer-motion";

import { styles } from "../../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import { useResumeProvider } from "../../context";

const Achievements = () => {
  const resume = useResumeProvider();
  const { achievements = [] } = resume || {};

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding}`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Some Glimpses on...</p>
          <h2 className={styles.sectionHeadText}>Achievements.</h2>
        </motion.div>
      </div>
      <motion.div variants={fadeIn}>
        <div className={`-mt-20 justify-center p-6 ${styles.paddingX} gap-7`}>
          <ul className="mt-5 list-disc ml-5 space-y-2">
            {achievements.map((achievement) => (
              <li
                key={achievement.title}
                className="text-white-100 text-[15px] pl-1"
              >
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Achievements, "");
