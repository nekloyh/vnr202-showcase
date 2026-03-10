import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import InteractiveVietnamMap from "../../components/timeline/InteractiveVietnamMap";
import { timelineEvents } from "../../data/timelineEvents";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* ─────────────── Left Panel: Compact Event Item ─────────────── */

function EventListItem({ event, isActive, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(event.id)}
      initial={false}
      animate={{
        backgroundColor: isActive
          ? "var(--color-vintage-crimson)"
          : "transparent",
      }}
      whileHover={{
        backgroundColor: isActive
          ? "var(--color-vintage-crimson)"
          : "rgba(184,134,11,0.08)",
      }}
      transition={{ duration: 0.2 }}
      className={`w-full text-left px-4 py-3 border-b border-vintage-stone/30 cursor-pointer transition-colors ${isActive ? "border-l-[3px] border-l-(--color-vintage-gold)" : "border-l-[3px] border-l-transparent"}`}
    >
      <div className="flex items-baseline gap-3">
        <span
          className={`font-mono text-xs font-bold tracking-wider shrink-0 ${isActive ? "text-(--color-vintage-gold)" : "text-(--color-vintage-gold)/60"}`}
        >
          {event.year}
        </span>
        <h3
          className={`font-display text-sm font-black uppercase leading-tight ${isActive ? "text-vintage-parchment" : "text-vintage-parchment/70"}`}
        >
          {event.title}
        </h3>
      </div>
      {isActive && event.badge && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mt-1.5 ml-[calc(3ch+0.75rem)] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider border border-(--color-vintage-gold)/40 text-(--color-vintage-gold)"
        >
          {event.badge}
        </motion.span>
      )}
    </motion.button>
  );
}

/* ─────────────── Right Panel: Event Detail ─────────────── */

function EventDetail({ event }) {
  if (!event) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-full flex flex-col"
      >
        {/* Hero image */}
        <div className="relative w-full h-48 lg:h-56 shrink-0 border-b-2 border-vintage-stone/40 overflow-hidden">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover grayscale-40 sepia-30"
            />
          ) : (
            <div className="w-full h-full bg-vintage-stone flex items-center justify-center">
              <span className="font-display text-vintage-parchment/30 italic text-sm">
                Chưa có ảnh
              </span>
            </div>
          )}
          {/* Film grain overlay */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-black" />
          {/* Year badge */}
          <div className="absolute bottom-3 left-3">
            <span className="font-mono font-bold text-xs bg-(--color-vintage-gold) text-vintage-bg px-2 py-1 border border-vintage-stone">
              {event.year}
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 p-5 lg:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-5">
          {/* Title block */}
          <div>
            <h2 className="font-display font-black text-xl lg:text-2xl text-vintage-parchment uppercase leading-tight">
              {event.title}
            </h2>
            {event.badge && (
              <span className="inline-block mt-2 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border border-(--color-vintage-gold)/40 text-(--color-vintage-gold)">
                {event.badge}
              </span>
            )}
          </div>

          {/* Divider */}
          <hr className="border-vintage-stone/30" />

          {/* Stats row */}
          {event.stats && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-charcoal border border-graphite/50 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <MapPin size={12} className="text-(--color-vintage-gold)" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-sand/60">
                    Địa điểm
                  </span>
                </div>
                <span className="font-display font-black text-base text-(--color-vintage-gold)">
                  {event.stats.location || "—"}
                </span>
              </div>
              <div className="bg-charcoal border border-graphite/50 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Calendar size={12} className="text-(--color-vintage-gold)" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-sand/60">
                    Mức độ
                  </span>
                </div>
                <span className="font-display font-black text-base text-(--color-vintage-gold)">
                  {event.stats.significance || "—"}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="font-body text-sm text-sand/85 leading-relaxed space-y-3">
            <p>{event.longDesc || event.shortDesc}</p>
            {event.stats?.impact && (
              <p className="border-l-2 border-(--color-vintage-gold)/30 pl-3 text-(--color-vintage-gold)/80 italic text-xs font-mono">
                {event.stats.impact}
              </p>
            )}
          </div>

          {/* Source footer */}
          <div className="mt-auto pt-3 border-t border-vintage-stone/20">
            <p className="font-mono text-[9px] uppercase tracking-widest text-sand/30 text-right">
              Nguồn: Tổng hợp lịch sử
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── Mobile Detail Drawer ─────────────── */

function MobileDetailDrawer({ event, onClose }) {
  if (!event) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={event.id}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] bg-vintage-bg border-t-2 border-(--color-vintage-gold) overflow-y-auto lg:hidden"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-vintage-bg border-b border-vintage-stone/30">
          <span className="font-mono font-bold text-xs text-(--color-vintage-gold) uppercase tracking-wider">
            {event.year} — {event.title}
          </span>
          <button onClick={onClose} className="p-1 text-vintage-parchment/50 hover:text-vintage-parchment cursor-pointer">
            <ChevronDown size={18} />
          </button>
        </div>
        <EventDetail event={event} />
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── Page Component ─────────────── */

export default function MocThoiGianPage() {
  const events = timelineEvents;
  const mapRef = useRef(null);
  const timelineScrollRef = useRef(null);
  const [activeEventId, setActiveEventId] = useState(events[0]?.id ?? null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );

  const activeEvent = useMemo(
    () => events.find((e) => e.id === activeEventId) ?? events[0],
    [events, activeEventId],
  );

  const handleActivate = useCallback((eventId) => {
    setActiveEventId(eventId);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const fn = (e) => setIsDesktop(e.matches);
    setIsDesktop(media.matches);
    media.addEventListener("change", fn);
    return () => media.removeEventListener("change", fn);
  }, []);

  /* Scroll progress on the event list */
  useEffect(() => {
    const node = timelineScrollRef.current;
    if (!node) return;

    const update = () => {
      const max = node.scrollHeight - node.clientHeight;
      setScrollProgress(max > 0 ? node.scrollTop / max : 0);
    };

    update();
    node.addEventListener("scroll", update, { passive: true });
    return () => node.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col relative selection:bg-gold selection:text-ink overflow-hidden"
      style={{ backgroundColor: "var(--color-vintage-bg)" }}
    >
      {/* Texture */}
      <div className="texture-overlay" />

      {/* ──── Header bar ──── */}
      <header className="shrink-0 relative z-20 flex items-center justify-between px-4 md:px-8 pt-20 pb-4 border-b border-vintage-stone/30">
        <div className="flex items-baseline gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono font-bold text-[10px] md:text-xs uppercase tracking-widest text-(--color-vintage-gold)/60"
          >
            Hồ sơ 03
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display font-black text-2xl md:text-3xl lg:text-4xl uppercase tracking-tight text-(--color-vintage-gold) leading-none"
          >
            Mốc Thời Gian
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="hidden md:block font-mono text-[10px] uppercase tracking-wider text-vintage-parchment/40 max-w-sm text-right"
        >
          Cuộn danh sách sự kiện — bản đồ tự động cập nhật
        </motion.p>
      </header>

      {/* ──── Main 3-column layout ──── */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* ─── LEFT: Event List ─── */}
        <aside
          className="shrink-0 w-64 lg:w-72 xl:w-80 border-r border-vintage-stone/30 flex-col bg-vintage-bg hidden md:flex"
        >
          {/* Progress bar */}
          <div className="shrink-0 h-0.5 bg-vintage-stone/20 relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-crimson"
              animate={{ width: `${clamp(scrollProgress, 0, 1) * 100}%` }}
              transition={{ type: "tween", duration: 0.15 }}
            />
          </div>

          {/* Scrollable event list */}
          <div
            ref={timelineScrollRef}
            className="flex-1 overflow-y-auto custom-scrollbar"
          >
            {events.map((event) => (
              <EventListItem
                key={event.id}
                event={event}
                isActive={activeEventId === event.id}
                onClick={handleActivate}
              />
            ))}
          </div>

          {/* Footer count */}
          <div className="shrink-0 px-4 py-2 border-t border-vintage-stone/20 font-mono text-[9px] uppercase tracking-widest text-vintage-parchment/30">
            {events.length} sự kiện · 1945–1975
          </div>
        </aside>

        {/* ─── Mobile event selector ─── */}
        <div className="md:hidden shrink-0 border-b border-vintage-stone/30 overflow-x-auto flex bg-vintage-bg">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => handleActivate(event.id)}
              className={`shrink-0 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                activeEventId === event.id
                  ? "border-b-(--color-vintage-gold) text-(--color-vintage-gold) bg-vintage-crimson/15"
                  : "border-b-transparent text-vintage-parchment/50"
              }`}
            >
              {event.year}
            </button>
          ))}
        </div>

        {/* ─── CENTER: Map ─── */}
        <div className="flex-1 relative overflow-hidden">
          {/* Ember particles */}
          <div className="ember-particles pointer-events-none absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="ember-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 15}s`,
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                }}
              />
            ))}
          </div>

          <InteractiveVietnamMap
            ref={mapRef}
            events={events}
            selectedEventId={activeEventId}
          />

          {/* Active event label overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
            <AnimatePresence mode="wait">
              {activeEvent && (
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  <span className="font-display font-black text-lg md:text-xl text-(--color-vintage-gold) uppercase leading-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {activeEvent.title}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile: tap to show detail */}
          {!isDesktop && activeEvent && (
            <button
              onClick={() => setActiveEventId(activeEventId)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-vintage-crimson text-vintage-parchment font-mono font-bold text-xs uppercase tracking-wider px-4 py-2 border border-(--color-vintage-gold) shadow-hard-sm cursor-pointer z-20 md:hidden"
            >
              Xem chi tiết
            </button>
          )}
        </div>

        {/* ─── RIGHT: Event Detail Panel (desktop only) ─── */}
        <aside className="shrink-0 w-80 lg:w-85 xl:w-95 border-l border-vintage-stone/30 bg-vintage-bg hidden lg:flex flex-col overflow-hidden">
          <EventDetail event={activeEvent} />
        </aside>
      </div>

      {/* ─── Mobile detail drawer ─── */}
      {!isDesktop && activeEventId && (
        <MobileDetailDrawer
          event={activeEvent}
          onClose={() => setActiveEventId(null)}
        />
      )}
    </div>
  );
}
