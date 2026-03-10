import PropTypes from "prop-types";

const Section = ({
    children,
    className = "",
    scrollable = false,
    autoHeight = false,
    containerClass = "",
    id = "",
    ...props
}) => {
    // Remove rigid CSS snap values and replace with fluid document-flow classes
    let baseClass = autoHeight 
        ? "relative w-full overflow-x-hidden min-h-screen py-section" 
        : "section-fluid py-section";

    return (
        <section
            id={id}
            className={`${baseClass} ${className}`}
            {...props}
        >
            <div className={`max-w-[1536px] mx-auto w-full px-section flex flex-col justify-center min-h-full ${containerClass}`}>
                {children}
            </div>
        </section>
    );
};

Section.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    scrollable: PropTypes.bool,
    autoHeight: PropTypes.bool,
    containerClass: PropTypes.string,
    id: PropTypes.string,
};

export default Section;
