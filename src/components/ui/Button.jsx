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
        "inline-flex items-center justify-center font-bold uppercase tracking-wider border-2 border-charcoal transition-transform transition-shadow duration-200 ease-out select-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-none";

    const variants = {
        primary:
            "bg-olive text-bone shadow-[4px_4px_0_var(--color-charcoal)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-charcoal)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-charcoal)]",
        outline:
            "bg-paper text-ink hover:bg-olive hover:text-bone hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-charcoal)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        ghost:
            "bg-transparent text-ink border-transparent hover:border-charcoal hover:bg-olive hover:text-bone hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-charcoal)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        danger:
            "bg-crimson text-bone shadow-[4px_4px_0_var(--color-charcoal)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-charcoal)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-charcoal)]",
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
