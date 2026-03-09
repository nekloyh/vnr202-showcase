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
        "inline-flex items-center justify-center font-bold uppercase tracking-wider border-2 transition-all duration-200 ease-[cubic-bezier(0.87,0,0.13,1)] select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
        primary:
            "bg-bone text-ink border-ink shadow-hard hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none",
        outline:
            "bg-transparent text-ink border-ink hover:bg-ink hover:text-bone hover:shadow-hard hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none",
        ghost:
            "bg-transparent border-transparent text-ink hover:bg-ink/5 hover:border-ink/20",
        danger:
            "bg-crimson text-bone border-ink shadow-hard hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none",
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
