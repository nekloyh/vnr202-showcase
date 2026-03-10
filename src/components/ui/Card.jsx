import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Card = ({
    children,
    className = "",
    variant = "default",
    hoverEffect = false,
    ...props
}) => {
    const baseStyles = "border-[4px] border-ink overflow-hidden p-6 relative transition-all duration-300";

    const variants = {
        default: "bg-paper shadow-[8px_8px_0_#000]",
        flat: "bg-[#FFFFFF]",
        highlight: "bg-blue text-white shadow-[8px_8px_0_#000]",
        paper: "bg-[#FAFAFA] shadow-[12px_12px_0_#000]",
    };

    const hoverStyles = hoverEffect
        ? "hover:-translate-y-2 hover:shadow-[12px_12px_0_#000]"
        : "";

    return (
        <motion.div
            className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(["default", "flat", "highlight", "paper"]),
    hoverEffect: PropTypes.bool,
};

export default Card;
