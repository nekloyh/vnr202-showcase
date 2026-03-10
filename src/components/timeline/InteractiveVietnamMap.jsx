import { AnimatePresence, motion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import useMapSpring from "../../hooks/useMapSpring";
import vietnamMapEvents from "../../data/vietnamMapEvents";
import ArrowLayer from "./ArrowLayer";

export const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
export const VN_PROVINCES_URL = "/vietnam-provinces-topo.json";
export const VIETNAM_ID = 704;

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 760;
const DEFAULT_CENTER = [106.4, 16.4];
const DEFAULT_ZOOM = 4.9;
const MIN_ZOOM = 3;
const MAX_ZOOM = 18;

/* ── Simplified archipelago data: just center dots ── */
const ARCHIPELAGOS = [
  { id: "hoang-sa", label: "Hoàng Sa", center: [112.33, 16.5] },
  { id: "truong-sa", label: "Trường Sa", center: [114.2, 9.5] },
];

const REGION_ANCHORS = {
  "VN-HN": [105.8342, 21.0278],
  "VN-HP": [106.6881, 20.8449],
  "VN-CB": [106.257, 22.666],
  "VN-LS": [106.761, 21.853],
  "VN-DI": [103.016, 21.386],
  "VN-TTH": [107.5909, 16.4637],
  "VN-QT": [107.183, 16.75],
  "VN-DN": [108.2022, 16.0544],
  "VN-BT": [106.375, 10.243],
  "VN-SG": [106.6297, 10.8231],
};

function isCoord(value) {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function isVietnam(geo) {
  const geoId = Number(geo.id);
  const iso = geo.properties?.ISO_A3 || geo.properties?.iso_a3;
  return (
    geoId === VIETNAM_ID || geo.id === String(VIETNAM_ID) || iso === "VNM"
  );
}

function splitLines(text = "", maxChars = 34) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  });
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function normalizeInfluencePaths(rawPaths, originCoords, eventKey) {
  if (!Array.isArray(rawPaths) || rawPaths.length === 0) return [];

  if (rawPaths.every(isCoord)) {
    if (!isCoord(originCoords)) return [];
    return rawPaths.map((target, index) => ({
      id: `${eventKey}-legacy-${index}`,
      coordinates: [originCoords, target],
      dashed: true,
      color: "#C9484A",
      strokeWidth: 1,
    }));
  }

  return rawPaths
    .map((path, index) => {
      if (Array.isArray(path) && path.every(isCoord)) {
        return {
          id: `${eventKey}-path-${index}`,
          coordinates: path,
          dashed: true,
          color: "#C9484A",
          strokeWidth: 1,
        };
      }
      if (path && typeof path === "object" && Array.isArray(path.coordinates)) {
        const coordinates = path.coordinates.filter(isCoord);
        if (coordinates.length < 2) return null;
        return {
          id: path.id ?? `${eventKey}-custom-${index}`,
          coordinates,
          dashed: path.dashed ?? true,
          color: path.color ?? "#C9484A",
          strokeWidth: path.strokeWidth ?? 1,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function normalizeEvent(rawEvent, index) {
  const coords = isCoord(rawEvent?.coords) ? rawEvent.coords : DEFAULT_CENTER;
  const rawRegionIds = Array.isArray(rawEvent?.regionIds)
    ? rawEvent.regionIds
    : rawEvent?.regionId
      ? [rawEvent.regionId]
      : [];

  return {
    ...rawEvent,
    id: rawEvent?.id ?? `event-${index + 1}`,
    coords,
    regionIds: rawRegionIds,
    zoomLevel: rawEvent?.zoomLevel ?? 6.2,
    influencePaths: normalizeInfluencePaths(
      rawEvent?.influencePaths ?? rawEvent?.influenceAreas ?? [],
      coords,
      rawEvent?.id ?? index + 1,
    ),
  };
}

function findEventById(events, id) {
  if (!Array.isArray(events) || events.length === 0) return null;
  if (id === undefined || id === null) return events[0];
  return events.find((event) => event.id === id) ?? events[0];
}

/* ═══════════════════════════════════════════════════════════════ */

const InteractiveVietnamMap = forwardRef(function InteractiveVietnamMap(
  { events = vietnamMapEvents, selectedEventId, onSelectEvent, className = "" },
  ref,
) {
  const normalizedEvents = useMemo(() => {
    const source =
      Array.isArray(events) && events.length > 0 ? events : vietnamMapEvents;
    return source.map((event, index) => normalizeEvent(event, index));
  }, [events]);

  const controlled = selectedEventId !== undefined && selectedEventId !== null;
  const [internalSelectedId, setInternalSelectedId] = useState(
    normalizedEvents[0]?.id ?? null,
  );
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [pinnedMarkerId, setPinnedMarkerId] = useState(null);

  const effectiveSelectedId = controlled ? selectedEventId : internalSelectedId;
  const selectedEvent = useMemo(
    () => findEventById(normalizedEvents, effectiveSelectedId),
    [normalizedEvents, effectiveSelectedId],
  );

  const { center, zoom, flyTo, jumpTo } = useMapSpring(
    DEFAULT_CENTER,
    DEFAULT_ZOOM,
  );

  const highlightedRegionIds = useMemo(
    () =>
      Array.isArray(selectedEvent?.regionIds) ? selectedEvent.regionIds : [],
    [selectedEvent],
  );

  const influencePaths = useMemo(
    () =>
      Array.isArray(selectedEvent?.influencePaths)
        ? selectedEvent.influencePaths
        : [],
    [selectedEvent],
  );

  const highlightedAnchors = useMemo(() => {
    if (!Array.isArray(highlightedRegionIds)) return [];
    return highlightedRegionIds
      .map((id) => REGION_ANCHORS[id])
      .filter(isCoord);
  }, [highlightedRegionIds]);

  const visibleTooltipEventId = pinnedMarkerId ?? hoveredMarkerId;
  const tooltipEvent = useMemo(
    () => findEventById(normalizedEvents, visibleTooltipEventId),
    [normalizedEvents, visibleTooltipEventId],
  );

  const selectEvent = useCallback(
    (eventId) => {
      if (!controlled) setInternalSelectedId(eventId);
      if (onSelectEvent) {
        const nextEvent = findEventById(normalizedEvents, eventId);
        onSelectEvent(eventId, nextEvent);
      }
    },
    [controlled, onSelectEvent, normalizedEvents],
  );

  useImperativeHandle(
    ref,
    () => ({ flyTo, jumpTo, selectEvent }),
    [flyTo, jumpTo, selectEvent],
  );

  useEffect(() => {
    if (!controlled && normalizedEvents.length > 0) {
      const exists = normalizedEvents.some(
        (event) => event.id === internalSelectedId,
      );
      if (!exists) setInternalSelectedId(normalizedEvents[0].id);
    }
  }, [controlled, internalSelectedId, normalizedEvents]);

  useEffect(() => {
    if (!selectedEvent?.coords) return;
    flyTo(selectedEvent.coords, selectedEvent.zoomLevel ?? 6.2);
  }, [selectedEvent, flyTo]);

  const handleMarkerClick = useCallback(
    (eventData) => {
      selectEvent(eventData.id);
      setPinnedMarkerId((current) =>
        current === eventData.id ? null : eventData.id,
      );
    },
    [selectEvent],
  );

  const handleMoveEnd = useCallback(
    ({ coordinates, zoom: z }) => jumpTo(coordinates, z),
    [jumpTo],
  );

  const handleZoomIn = useCallback(() => {
    flyTo(center, Math.min(zoom + 1.5, MAX_ZOOM));
  }, [zoom, center, flyTo]);

  const handleZoomOut = useCallback(() => {
    flyTo(center, Math.max(zoom - 1.5, MIN_ZOOM));
  }, [zoom, center, flyTo]);

  const handleResetView = useCallback(() => {
    if (selectedEvent?.coords) {
      flyTo(selectedEvent.coords, selectedEvent.zoomLevel ?? 6.2);
    } else {
      flyTo(DEFAULT_CENTER, DEFAULT_ZOOM);
    }
  }, [selectedEvent, flyTo]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`relative h-full min-h-90 overflow-hidden bg-transparent ${className}`}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1200, center: [107, 16] }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="w-full h-full"
      >
        <defs>
          {/* Subtle paper noise */}
          <filter id="paperNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.8  0 0 0 0 0.7  0 0 0 0 0.6  0 0 0 0.04 0"
              result="sepiaNoise"
            />
          </filter>
          <pattern
            id="vintageGrid"
            patternUnits="userSpaceOnUse"
            width="24"
            height="24"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="var(--color-vintage-stone)"
              strokeWidth="0.4"
              opacity="0.2"
            />
          </pattern>
          {/* Compact glow for active marker */}
          <filter id="markerGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="var(--color-vintage-gold)"
              floodOpacity="0.5"
            />
          </filter>
          {/* Vietnam silhouette shadow */}
          <filter id="vnShadow" x="-3%" y="-3%" width="106%" height="106%">
            <feDropShadow
              dx="1"
              dy="1"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.6"
            />
          </filter>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#140E0A" />
            <stop offset="100%" stopColor="var(--color-vintage-bg)" />
          </radialGradient>
        </defs>

        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#oceanGrad)" />
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#vintageGrid)" />
        <rect
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          filter="url(#paperNoise)"
          opacity="0.2"
        />

        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveEnd={handleMoveEnd}
          translateExtent={[
            [-500, -300],
            [MAP_WIDTH + 500, MAP_HEIGHT + 300],
          ]}
        >
          {/* ── World: faint neighboring countries ── */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const vietnam = isVietnam(geo);
                if (vietnam) return null; // skip — silhouette from provinces
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={-1}
                    style={{
                      default: {
                        fill: "#1A1410",
                        stroke: "#2A2018",
                        strokeWidth: 0.3,
                        outline: "none",
                      },
                      hover: {
                        fill: "#1E1812",
                        stroke: "#2A2018",
                        strokeWidth: 0.3,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#1A1410",
                        stroke: "#2A2018",
                        strokeWidth: 0.3,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* ── Vietnam: unified silhouette, no province borders ── */}
          <Geographies geography={VN_PROVINCES_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  tabIndex={-1}
                  style={{
                    default: {
                      fill: "#221C16",
                      stroke: "#221C16",
                      strokeWidth: 0.15,
                      outline: "none",
                      filter: "url(#vnShadow)",
                    },
                    hover: {
                      fill: "#28221A",
                      stroke: "#28221A",
                      strokeWidth: 0.15,
                      outline: "none",
                      filter: "url(#vnShadow)",
                    },
                    pressed: {
                      fill: "#221C16",
                      stroke: "#221C16",
                      strokeWidth: 0.15,
                      outline: "none",
                      filter: "url(#vnShadow)",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {/* ── Archipelago dots (minimal) ── */}
          {ARCHIPELAGOS.map((arch) => (
            <Marker key={arch.id} coordinates={arch.center}>
              <circle
                r={2}
                fill="#DDA84B"
                fillOpacity={0.5}
                stroke="#A08530"
                strokeWidth="0.4"
              />
              <text
                y={7}
                textAnchor="middle"
                fill="#6B5B2E"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="4"
                fontWeight="500"
                letterSpacing="0.06em"
                opacity="0.6"
              >
                {arch.label}
              </text>
            </Marker>
          ))}

          {/* ── Region anchor highlights (compact) ── */}
          {highlightedAnchors.map((coords, index) => (
            <Marker
              key={`region-${highlightedRegionIds[index]}-${index}`}
              coordinates={coords}
            >
              <motion.circle
                r={6}
                fill="rgba(184, 134, 11, 0.12)"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.4, 0.15, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              />
              <motion.circle
                r={2.5}
                fill="var(--color-vintage-crimson)"
                fillOpacity={0.75}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.75 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </Marker>
          ))}

          {/* ── Influence arrows ── */}
          <ArrowLayer
            paths={influencePaths}
            activeKey={selectedEvent?.id ?? "event"}
          />

          {/* ── Event markers ── */}
          {normalizedEvents.map((eventData) => {
            const isActive = eventData.id === selectedEvent?.id;
            if (!isActive && selectedEvent !== null) return null;

            const showTooltip = tooltipEvent?.id === eventData.id;
            const tooltipLines = splitLines(eventData.shortDesc, 30);
            const tooltipHeight = 34 + tooltipLines.length * 11;
            const tooltipWidth = 170;

            return (
              <Marker key={eventData.id} coordinates={eventData.coords}>
                <g
                  onMouseEnter={() => setHoveredMarkerId(eventData.id)}
                  onMouseLeave={() =>
                    setHoveredMarkerId((c) =>
                      c === eventData.id ? null : c,
                    )
                  }
                  onClick={() => handleMarkerClick(eventData)}
                  className="cursor-pointer"
                >
                  {/* Pulse ring (active only) */}
                  {isActive && (
                    <motion.circle
                      r={8}
                      fill="none"
                      stroke="var(--color-vintage-gold)"
                      strokeWidth={0.6}
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  {/* Main dot */}
                  <motion.circle
                    r={isActive ? 3.5 : 2.5}
                    fill={
                      isActive
                        ? "var(--color-vintage-gold)"
                        : "var(--color-vintage-stone)"
                    }
                    stroke={
                      isActive
                        ? "var(--color-vintage-gold)"
                        : "var(--color-vintage-stone)"
                    }
                    strokeWidth={isActive ? 1 : 0.5}
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      filter: isActive ? "url(#markerGlow)" : "none",
                    }}
                  />
                  {/* Inner dot */}
                  <circle
                    r={isActive ? 1.2 : 0.8}
                    fill={
                      isActive
                        ? "var(--color-vintage-bg)"
                        : "var(--color-vintage-crimson)"
                    }
                  />
                </g>

                {/* Tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.g
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 3 }}
                      transition={{ duration: 0.18 }}
                      transform="translate(8, -38)"
                      style={{ pointerEvents: "none" }}
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="1.5"
                        width={tooltipWidth}
                        height={tooltipHeight}
                        fill="#E9DFC9"
                        stroke="#5D564C"
                        strokeWidth="0.6"
                      />
                      <rect
                        x="0"
                        y="0"
                        width={tooltipWidth}
                        height="16"
                        rx="1.5"
                        fill="#D5C7AB"
                      />
                      <text
                        x="5"
                        y="11.5"
                        fill="#3B352D"
                        fontFamily="IBM Plex Mono, monospace"
                        fontSize="7"
                        fontWeight="700"
                      >
                        {eventData.year} · {eventData.title}
                      </text>
                      <text
                        x="5"
                        y="25"
                        fill="#2F2923"
                        fontFamily="Be Vietnam Pro, sans-serif"
                        fontSize="7.5"
                      >
                        {tooltipLines.map((line, li) => (
                          <tspan
                            key={`${eventData.id}-l-${li}`}
                            x="5"
                            dy={li === 0 ? 0 : 11}
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Bottom-left event label */}
      <div className="absolute left-3 bottom-3 bg-[#E9DFC9]/90 border border-[#5D564C] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-[#2F2923] shadow-hard-sm">
        {selectedEvent?.year ?? "--"} · {selectedEvent?.title ?? ""}
      </div>

      {/* Zoom controls */}
      <div className="absolute right-3 bottom-3 flex flex-col gap-1">
        <button
          onClick={handleZoomIn}
          className="w-7 h-7 bg-[#E9DFC9]/90 border border-[#5D564C] text-[#2F2923] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#DDD2B8] active:scale-95 transition-all cursor-pointer shadow-hard-sm"
          aria-label="Phóng to"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-7 h-7 bg-[#E9DFC9]/90 border border-[#5D564C] text-[#2F2923] font-mono text-sm font-bold flex items-center justify-center hover:bg-[#DDD2B8] active:scale-95 transition-all cursor-pointer shadow-hard-sm"
          aria-label="Thu nhỏ"
        >
          −
        </button>
        <button
          onClick={handleResetView}
          className="w-7 h-7 bg-[#E9DFC9]/90 border border-[#5D564C] text-[#2F2923] font-mono text-[9px] font-bold flex items-center justify-center hover:bg-[#DDD2B8] active:scale-95 transition-all cursor-pointer shadow-hard-sm"
          aria-label="Trở về vị trí sự kiện"
          title="Trở về vị trí sự kiện"
        >
          ⌂
        </button>
      </div>
    </motion.div>
  );
});

export default InteractiveVietnamMap;
