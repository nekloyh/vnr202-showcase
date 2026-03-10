import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Section from "../../components/layout/Section";
import InteractiveVietnamMap from "../../components/timeline/InteractiveVietnamMap";
import TimelineEventCard from "../../components/timeline/TimelineEventCard";
import { timelineEvents } from "../../data/timelineEvents";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function MocThoiGianPage() {
  const events = timelineEvents;
  const mapRef = useRef(null);
  const timelineScrollRef = useRef(null);
  const cardRefs = useRef(new Map());
  const visibilityRatioRef = useRef(new Map());
  const [activeEventId, setActiveEventId] = useState(events[0]?.id ?? null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false,
  );

  const activeEvent = useMemo(
    () => events.find((e) => e.id === activeEventId) ?? events[0],
    [events, activeEventId],
  );

  const registerCardRef = useCallback((eventId, node) => {
    if (node) {
      cardRefs.current.set(eventId, node);
    } else {
      cardRefs.current.delete(eventId);
      visibilityRatioRef.current.delete(eventId);
    }
  }, []);

  const handleActivate = useCallback((eventId) => {
    setActiveEventId(eventId);
    const node = cardRefs.current.get(eventId);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleMediaChange = (event) => setIsDesktop(event.matches);
    setIsDesktop(media.matches);
    media.addEventListener("change", handleMediaChange);

    return () => media.removeEventListener("change", handleMediaChange);
  }, []);

  const activeEventIdRef = useRef(activeEventId);
  activeEventIdRef.current = activeEventId;

  useEffect(() => {
    const timelineNode = timelineScrollRef.current;
    const root = isDesktop ? timelineNode : null;
    const thresholds = [0.2, 0.35, 0.5, 0.65, 0.8, 0.95];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const eventId = Number(entry.target.getAttribute("data-event-id"));
          visibilityRatioRef.current.set(eventId, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextId = activeEventIdRef.current;
        let bestRatio = 0;
        visibilityRatioRef.current.forEach((ratio, eventId) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextId = eventId;
          }
        });

        if (bestRatio > 0 && nextId !== activeEventIdRef.current) {
          setActiveEventId(nextId);
        }
      },
      {
        root,
        threshold: thresholds,
        rootMargin: isDesktop ? "-10% 0px -40% 0px" : "-20% 0px -45% 0px",
      },
    );

    cardRefs.current.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [isDesktop]);



  useEffect(() => {
    const timelineNode = timelineScrollRef.current;
    const updateProgress = () => {
      if (isDesktop && timelineNode) {
        const maxScroll = timelineNode.scrollHeight - timelineNode.clientHeight;
        setScrollProgress(maxScroll > 0 ? timelineNode.scrollTop / maxScroll : 0);
        return;
      }

      const firstNode = cardRefs.current.get(events[0]?.id);
      const lastNode = cardRefs.current.get(events[events.length - 1]?.id);
      if (!firstNode || !lastNode) return;

      const firstRect = firstNode.getBoundingClientRect();
      const lastRect = lastNode.getBoundingClientRect();
      const totalDistance = Math.abs(lastRect.top - firstRect.top) + window.innerHeight * 0.2;
      const currentDistance = window.innerHeight * 0.45 - firstRect.top;
      setScrollProgress(clamp(currentDistance / totalDistance, 0, 1));
    };

    updateProgress();

    const scrollTarget = isDesktop && timelineNode ? timelineNode : window;
    scrollTarget.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      scrollTarget.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [isDesktop, events]);

  return (
    <div className="w-full min-h-screen bg-bone page-shell selection:bg-gold selection:text-ink">
      <Section autoHeight className="pt-24 pb-12 px-4 md:px-8">
        <div className="w-full max-w-screen-2xl mx-auto">
          <div className="mb-0 relative z-10 text-center pb-20 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-block bg-ink text-white border-[4px] border-ink px-6 py-2 shadow-[8px_8px_0_#D32F2F] font-mono text-sm uppercase tracking-widest transform -rotate-1 mb-6"
            >
              HỒ SƠ 03 — CƠ SỞ DỮ LIỆU ĐỊA CHÍNH TRỊ
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="font-display font-black text-[clamp(4.5rem,8vw,8rem)] uppercase text-ink leading-[0.85] tracking-tighter drop-shadow-[8px_8px_0_#F9F9F9]"
            >
              MỐC THỜI GIAN
            </motion.h1>
            <p className="mt-8 text-xl md:text-2xl font-bold bg-white p-4 border-[4px] border-ink shadow-[8px_8px_0_#D32F2F] text-ink max-w-3xl mx-auto transform rotate-1 inline-block">
              Cuộn danh sách sự kiện ở bên phải để bản đồ Việt Nam tự động dịch chuyển và mô phỏng hướng lan tỏa ảnh hưởng theo từng giai đoạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start relative z-10">
            <div className="lg:col-span-3">
              <div className="sticky top-20 lg:top-24 h-[42vh] sm:h-[48vh] lg:h-[calc(100vh-7.5rem)] brutal-card p-0 border-[8px] border-ink shadow-[16px_16px_0_0_#000] bg-[#E5E5E5] overflow-hidden">
                <InteractiveVietnamMap
                  ref={mapRef}
                  events={events}
                  selectedEventId={activeEventId}
                />
              </div>
            </div>

            <aside
              ref={timelineScrollRef}
              className="lg:col-span-2 relative lg:h-[calc(100vh-7.5rem)] lg:overflow-y-auto pr-1 pb-8"
            >
              <div className="relative pt-2 md:pt-3">
                <div className="absolute top-0 bottom-0 left-[26px] md:left-1/2 -translate-x-1/2 border-l-[6px] border-dashed border-ink/40" />
                <motion.div
                  className="absolute left-[26px] md:left-1/2 -translate-x-1/2 top-0 w-[6px] bg-crimson rounded-full origin-top z-10"
                  animate={{ height: `${clamp(scrollProgress, 0, 1) * 100}%` }}
                  transition={{ type: "tween", duration: 0.16 }}
                />

                <div className="space-y-6">
                  {events.map((event, index) => {
                    const isActive = activeEvent?.id === event.id;
                    const alignClass = index % 2 === 0 ? "md:pr-[53%]" : "md:pl-[53%]";

                    return (
                      <div key={event.id} className={`relative pl-8 md:pl-0 ${alignClass}`}>
                        <motion.div
                          initial={false}
                          animate={{
                            scale: isActive ? 1.4 : 1,
                            backgroundColor: isActive ? "#D32F2F" : "#1C1C1A",
                            borderColor: isActive ? "#FFF" : "#000",
                          }}
                          transition={{ duration: 0.25 }}
                          className="absolute left-[26px] md:left-1/2 top-8 -translate-x-1/2 w-5 h-5 border-[4px] z-20"
                        />

                        <TimelineEventCard
                          event={event}
                          isActive={isActive}
                          registerRef={registerCardRef}
                          onActivate={handleActivate}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </div>
  );
}
