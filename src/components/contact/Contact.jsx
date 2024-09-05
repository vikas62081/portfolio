import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../hoc";
import { fadeIn, slideIn } from "../../utils/motion";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import "./Contact.scss";
import { useResumeProvider } from "../../context";

const Contact = () => {
  const formRef = useRef();
  const resume = useResumeProvider();

  const { email, phoneNumber, whatsAppNumber, links } = resume || {};
  const { googlesheetForm } = links || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!form.name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!form.message.trim()) {
      formErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      fetch(googlesheetForm, {
        method: "POST",
        body: JSON.stringify(form),
      }).then(
        (resp) => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
          setErrors({});
        },
        (error) => {
          setLoading(false);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>

      <motion.div
        whileInView={{ opacity: 1, transform: "none" }}
        variants={fadeIn("", "spring", 1 * 0.5, 0.75)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-3 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-input py-3 px-3 placeholder:text-secondary text-white rounded-lg border-none font-medium"
            />
            {errors.name && (
              <span className="pink-text-gradient text-sm">{errors.name}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-input py-3 px-3 placeholder:text-secondary text-white rounded-lg border-none font-medium"
            />
            {errors.email && (
              <span className="pink-text-gradient text-sm">{errors.email}</span>
            )}
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-3">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-input py-3 px-3 placeholder:text-secondary text-white rounded-lg border-none font-medium"
            />
            {errors.message && (
              <span className="pink-text-gradient text-sm">
                {errors.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-5 rounded-xl outline-none w-full text-white font-bold shadow-md shadow-primary hover:bg-[#49a891]"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="mt-5 contact__options">
          <article className="contact__option">
            <MdEmail className=" text-secondary" fontSize={24} />
            <a
              href={`mailto:${email}`}
              target="_blank"
              className="blue-text-gradient"
            >
              {email}
            </a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className=" text-secondary" fontSize={24} />
            <a
              href={`https://api.whatsapp.com/send/?phone=${whatsAppNumber}&text&app_absent=0&lang=en`}
              target="_blank"
              className="blue-text-gradient"
            >
              {phoneNumber}
            </a>
          </article>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
