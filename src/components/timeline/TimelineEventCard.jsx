import { motion } from "framer-motion";

export default function TimelineEventCard({
  event,
  isActive,
  registerRef,
  onActivate,
}) {
  return (
    <motion.article
      ref={(node) => registerRef(event.id, node)}
      data-event-id={event.id}
      onClick={() => onActivate(event.id)}
      initial={false}
      animate={{
        scale: isActive ? 1.02 : 1,
        borderColor: isActive ? "#D32F2F" : "#000",
        borderWidth: isActive ? "6px" : "4px",
        boxShadow: isActive ? "12px 12px 0 0 #D32F2F" : "8px 8px 0 0 #000",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative z-10 cursor-pointer bg-white p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 md:w-24 shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-16 md:h-24 object-cover border-[4px] border-ink shadow-[4px_4px_0_0_#000]"
            loading="lazy"
          />
        </div>

        <div className="min-w-0">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-white bg-ink px-2 py-1 inline-block font-bold">
            {event.year}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-black leading-tight uppercase text-ink mt-3">
            {event.title}
          </h3>
          <p className="text-sm md:text-base font-medium text-ink/90 mt-2 leading-relaxed">
            {event.shortDesc}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

