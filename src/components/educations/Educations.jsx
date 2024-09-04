import React from "react";
import { motion } from "framer-motion";

import { styles } from "../../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../../utils/motion";
import "./Education.scss";
import { IoSchool } from "react-icons/io5";
import { useResumeProvider } from "../../context";

const FeedbackCard = ({
  index,
  branch,
  marks,
  university,
  degree,
  year,
  icon,
  iconBgColor = "#fff",
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="Box2 p-5 rounded-lg xs:w-[320px] w-full"
  >
    <div className="mt-4 flex flex-col justify-between items-center gap-1">
      {icon ? (
        <img
          src={icon}
          alt={`feedback_by-${university}`}
          width="80"
          height="80"
          style={{ background: iconBgColor }}
          className="rounded-full object-cover"
        />
      ) : (
        <IoSchool
          className="w-20 h-20 text-black rounded-full object-cover"
          style={{ background: iconBgColor }}
        />
      )}
      <div className="mt-4 flex-1 flex flex-col">
        <p className="text-center text-white font-medium text-[16px]">
          <span className="text-center">{university}</span>
        </p>
        <p className="text-center mt-1 text-secondary text-[12px]">{year}</p>
      </div>
    </div>

    {/* <p className='text-white font-black text-[48px]'>"</p> */}

    <div className="mt-4">
      <p className="text-center text-white tracking-wider text-[18px]">
        {degree}
      </p>
      <p className=" text-center pink-text-gradient">{branch}</p>
    </div>
  </motion.div>
);

const Educations = () => {
  const resume = useResumeProvider();
  const { educations } = resume || {};

  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Education Details...</p>
          <h2 className={styles.sectionHeadText}>Education.</h2>
        </motion.div>
      </div>
      <div
        className={`-mt-20 justify-center pb-14 ${styles.paddingX} flex flex-wrap gap-7`}
      >
        {educations.map((education, index) => (
          <FeedbackCard key={education.name} index={index} {...education} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Educations, "education");
