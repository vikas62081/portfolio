import { styles } from "../../styles";
import { motion } from "framer-motion";
import { textVariant } from "../../utils/motion";

const SectionTitle = ({ title, subtitle, center = false }) => {
  return (
    <motion.div
      variants={textVariant()}
      className={`text-center ${!center && "md:text-left"}`}
    >
      <p className={styles.sectionSubText}>{subtitle}</p>
      <h2 className={styles.sectionHeadText}>{title}</h2>
    </motion.div>
  );
};

export default SectionTitle;
