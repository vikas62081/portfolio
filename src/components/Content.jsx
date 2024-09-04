import { React, useState } from "react";
import "./Content.scss";
import { AiOutlineHome, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiBook } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";

const navItems = [
  { href: "#", icon: AiOutlineHome, title: "Home" },
  { href: "#education", icon: BiBook, title: "Education" },
  { href: "#project", icon: AiOutlineFundProjectionScreen, title: "Projects" },
  { href: "#experience", icon: BsPersonWorkspace, title: "Experiences" },
  { href: "#contact", icon: MdMessage, title: "Contact" },
];

const Content = () => {
  const [activeNav, setActiveNav] = useState("#");

  return (
    <div className="nav">
      {navItems.map(({ href, icon: Icon, title }, index) => (
        <a
          key={index}
          href={href}
          title={title}
          onClick={() => setActiveNav(href)}
        >
          <Icon className={activeNav === href ? "active" : ""} />
        </a>
      ))}
    </div>
  );
};

export default Content;
