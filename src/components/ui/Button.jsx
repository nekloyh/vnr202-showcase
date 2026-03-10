import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({
    children,
    variant = "primary",
    className = "",
    onClick,
    disabled = false,
    type = "button",
    ...props
}) => {
    const baseStyles =
        "inline-flex items-center justify-center font-bold uppercase tracking-wider border-[4px] border-ink transition-transform transition-shadow duration-200 ease-out select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-none";

    const variants = {
        primary:
            "bg-blue text-white shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000]",
        outline:
            "bg-paper text-ink hover:bg-blue hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
        ghost:
            "bg-transparent text-ink border-transparent hover:border-ink hover:bg-blue hover:text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none",
        danger:
            "bg-crimson text-white shadow-[6px_6px_0_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_#000]",
    };

    const sizes = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4",
    };

    const sizeClass = sizes[props.size] || sizes.md;

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizeClass} ${className}`}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "outline", "ghost", "danger"]),
    size: PropTypes.oneOf(["sm", "md", "lg"]),
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
