import { motion } from "framer-motion";

export const KineticHeading = ({ title, size = "lg", align = "left", className = "" }) => {
    const textAlign = align === "center" ? "text-center" : "text-left";
    const alignClass = align === "center" ? "items-center" : "items-start";
    const fontSize = size === "xl" ? "text-5xl md:text-7xl lg:text-8xl" : size === "lg" ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl";

    return (
        <div className={`flex flex-col ${alignClass} ${textAlign} ${className}`}>
            <h1 className={`font-display font-black text-ink leading-none tracking-tighter uppercase ${fontSize}`}>
                {title}
            </h1>
        </div>
    );
};

export const KineticSubline = ({ children, className = "" }) => {
    return (
        <p className={`font-body text-lg md:text-xl text-graphite leading-relaxed ${className}`}>
            {children}
        </p>
    );
};


