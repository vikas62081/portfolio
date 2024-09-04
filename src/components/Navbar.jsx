import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import "./Navbar.scss";
import { useResumeProvider } from "../context";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const resume = useResumeProvider();

  const { name, links } = resume || {};
  const { resume: resumeLink } = links || {};

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-3 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="sm:block text-white text-[18px] font-bold cursor-pointer flex ">
            {name}
          </p>
        </Link>

        <div className="sm:flex gap-5">
          <div
            className={`top2 hover:text-blue-500 text-[15px] font-medium cursor-pointer`}
          >
            <a href={resumeLink} target="_blank">
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
