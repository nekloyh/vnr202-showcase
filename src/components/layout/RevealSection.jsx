import { motion } from "framer-motion";
import PropTypes from "prop-types";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const RevealSection = ({
  children,
  className = "",
  id,
  dark = false,
  fullHeight = true,
}) => {
  const bg = dark ? "bg-charcoal text-bone" : "bg-bone text-ink";
  const height = fullHeight ? "min-h-screen" : "";

  return (
    <motion.section
      id={id}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative w-full overflow-hidden ${height} flex flex-col justify-center ${bg} ${className}`}
    >
      <div className="max-w-350 mx-auto w-full px-6 md:px-12 lg:px-16 py-20 md:py-28 flex flex-col justify-center min-h-full">
        {children}
      </div>
    </motion.section>
  );
};

RevealSection.Item = function RevealItem({ children, className = "" }) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
};

RevealSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  dark: PropTypes.bool,
  fullHeight: PropTypes.bool,
};

RevealSection.Item.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default RevealSection;
