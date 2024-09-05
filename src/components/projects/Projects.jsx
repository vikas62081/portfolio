import { motion } from "framer-motion";
import React, { useState } from "react";
import { SectionWrapper } from "../hoc";

import "./Project.scss";
import { RiLink } from "react-icons/ri";
import { AiOutlineGithub } from "react-icons/ai";
import image1 from "../../assets/project/computer.webp";
import { useResumeProvider } from "../../context";
import SectionTitle from "../common/SectionTitle";
import { fadeIn } from "../../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  icon = image1,
  source_code_link,
  source_link,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      variants={fadeIn("down", "spring", index * 0.5, 0.75)}
      className="project-box bg-tertiary p-5 rounded-lg sm:w-[330px] w-full"
    >
      <div className="relative w-full h-[180px]">
        <img
          src={icon}
          alt="project_image"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute top-0 right-0 flex p-2 space-x-2">
          <div
            onClick={() => window.open(source_link, "_blank")}
            className=" w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500"
          >
            <RiLink className="w-1/2 h-1/2 object-contain text-white" />
          </div>
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500"
          >
            <AiOutlineGithub className="w-1/2 h-1/2 object-contain text-white" />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-bold text-[16px]">{name}</h3>
        <p
          className={`text-secondary text-[16px] ${
            isExpanded ? "" : "line-clamp-6"
          }`}
        >
          {description}
        </p>
        <button onClick={handleToggle} className="text-blue-500 mt-2">
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p
            key={`${name}-${tag.name}`}
            style={{ color: tag.color }}
            className="text-[14px] uppercase rounded-sm font-medium"
          >
            #{tag.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const resume = useResumeProvider();
  const { projects } = resume || {};

  return (
    <>
      <SectionTitle title="Projects." subtitle="My work" />
      <div className="w-full flex mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "project");
