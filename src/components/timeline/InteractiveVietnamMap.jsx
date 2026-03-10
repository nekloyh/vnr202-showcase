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

export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
export const VN_PROVINCES_URL = "/vietnam-provinces-topo.json";
export const VIETNAM_ID = 704;

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 760;
const DEFAULT_CENTER = [106.4, 16.4];
const DEFAULT_ZOOM = 4.9;
const MIN_ZOOM = 3;
const MAX_ZOOM = 18;

const ARCHIPELAGOS = [
  {
    id: "hoang-sa",
    name: "Quần đảo Hoàng Sa",
    center: [112.33, 16.5],
    radiusKm: 90,
    islands: [
      [112.33, 16.83], [111.6, 16.52], [112.34, 16.5],
      [112.72, 16.48], [111.92, 16.33], [112.19, 16.06],
    ],
  },
  {
    id: "truong-sa",
    name: "Quần đảo Trường Sa",
    center: [114.2, 9.5],
    radiusKm: 200,
    islands: [
      [114.36, 11.06], [115.82, 9.88], [113.82, 9.88],
      [114.08, 8.65], [112.88, 10.38], [114.48, 10.0],
      [115.02, 8.85], [113.6, 8.1],
    ],
  },
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

const REGION_TO_HASC = {
  "VN-HN": "VN.HI",
  "VN-HP": "VN.HP",
  "VN-CB": "VN.CB",
  "VN-LS": "VN.LS",
  "VN-DI": "VN.DB",
  "VN-TTH": "VN.TT",
  "VN-QT": "VN.QT",
  "VN-DN": "VN.DA",
  "VN-BT": "VN.BR",
  "VN-SG": "VN.HC",
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
  return geoId === VIETNAM_ID || geo.id === String(VIETNAM_ID) || iso === "VNM";
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
      color: "#E63946",
      strokeWidth: 1.5,
    }));
  }

  return rawPaths
    .map((path, index) => {
      if (Array.isArray(path) && path.every(isCoord)) {
        return {
          id: `${eventKey}-path-${index}`,
          coordinates: path,
          dashed: true,
          color: "#E63946",
          strokeWidth: 1.5,
        };
      }

      if (path && typeof path === "object" && Array.isArray(path.coordinates)) {
        const coordinates = path.coordinates.filter(isCoord);
        if (coordinates.length < 2) return null;
        return {
          id: path.id ?? `${eventKey}-custom-${index}`,
          coordinates,
          dashed: path.dashed ?? true,
          color: path.color ?? "#E63946",
          strokeWidth: path.strokeWidth ?? 1.5,
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

const InteractiveVietnamMap = forwardRef(function InteractiveVietnamMap(
  {
    events = vietnamMapEvents,
    selectedEventId,
    onSelectEvent,
    className = "",
  },
  ref,
) {
  const normalizedEvents = useMemo(() => {
    const source = Array.isArray(events) && events.length > 0 ? events : vietnamMapEvents;
    return source.map((event, index) => normalizeEvent(event, index));
  }, [events]);

  const controlled = selectedEventId !== undefined && selectedEventId !== null;
  const [internalSelectedId, setInternalSelectedId] = useState(normalizedEvents[0]?.id ?? null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [pinnedMarkerId, setPinnedMarkerId] = useState(null);

  const effectiveSelectedId = controlled ? selectedEventId : internalSelectedId;
  const selectedEvent = useMemo(
    () => findEventById(normalizedEvents, effectiveSelectedId),
    [normalizedEvents, effectiveSelectedId],
  );

  const { center, zoom, flyTo, jumpTo } = useMapSpring(DEFAULT_CENTER, DEFAULT_ZOOM);

  const highlightedRegionIds = useMemo(
    () => (Array.isArray(selectedEvent?.regionIds) ? selectedEvent.regionIds : []),
    [selectedEvent],
  );

  const highlightedHascCodes = useMemo(
    () => highlightedRegionIds.map((id) => REGION_TO_HASC[id]).filter(Boolean),
    [highlightedRegionIds],
  );

  const influencePaths = useMemo(
    () => (Array.isArray(selectedEvent?.influencePaths) ? selectedEvent.influencePaths : []),
    [selectedEvent],
  );

  const highlightedAnchors = useMemo(() => {
    if (!Array.isArray(highlightedRegionIds)) return [];
    return highlightedRegionIds.map((id) => REGION_ANCHORS[id]).filter(isCoord);
  }, [highlightedRegionIds]);

  const visibleTooltipEventId = pinnedMarkerId ?? hoveredMarkerId;
  const tooltipEvent = useMemo(
    () => findEventById(normalizedEvents, visibleTooltipEventId),
    [normalizedEvents, visibleTooltipEventId],
  );

  const selectEvent = useCallback(
    (eventId) => {
      if (!controlled) {
        setInternalSelectedId(eventId);
      }
      if (onSelectEvent) {
        const nextEvent = findEventById(normalizedEvents, eventId);
        onSelectEvent(eventId, nextEvent);
      }
    },
    [controlled, onSelectEvent, normalizedEvents],
  );

  useImperativeHandle(
    ref,
    () => ({
      flyTo,
      jumpTo,
      selectEvent,
    }),
    [flyTo, jumpTo, selectEvent],
  );

  useEffect(() => {
    if (!controlled && normalizedEvents.length > 0) {
      const exists = normalizedEvents.some((event) => event.id === internalSelectedId);
      if (!exists) {
        setInternalSelectedId(normalizedEvents[0].id);
      }
    }
  }, [controlled, internalSelectedId, normalizedEvents]);

  useEffect(() => {
    if (!selectedEvent?.coords) return;
    flyTo(selectedEvent.coords, selectedEvent.zoomLevel ?? 6.2);
  }, [selectedEvent, flyTo]);

  const handleMarkerClick = useCallback(
    (eventData) => {
      selectEvent(eventData.id);
      setPinnedMarkerId((current) => (current === eventData.id ? null : eventData.id));
    },
    [selectEvent],
  );

  const handleMoveEnd = useCallback(
    ({ coordinates, zoom: z }) => {
      jumpTo(coordinates, z);
    },
    [jumpTo],
  );

  const handleZoomIn = useCallback(() => {
    const next = Math.min(zoom + 1.5, MAX_ZOOM);
    flyTo(center, next);
  }, [zoom, center, flyTo]);

  const handleZoomOut = useCallback(() => {
    const next = Math.max(zoom - 1.5, MIN_ZOOM);
    flyTo(center, next);
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
      className={`relative h-full min-h-90 overflow-hidden border-2 border-[#5D564C] shadow-hard-md bg-[#C8D1C0] ${className}`}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1200, center: [107, 16] }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="w-full h-full"
      >
        <defs>
          <filter id="paperNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.36 0 0 0 0 0.32 0 0 0 0 0.25 0 0 0 0.06 0"
              result="sepiaNoise"
            />
          </filter>
          <pattern id="vintageGrid" patternUnits="userSpaceOnUse" width="16" height="16">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#8A8272" strokeWidth="0.35" opacity="0.15" />
          </pattern>
          <filter id="regionGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#E63946" floodOpacity="0.5" />
          </filter>
          <filter id="markerGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#E63946" floodOpacity="0.45" />
          </filter>
          <filter id="vnShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1" dy="1" stdDeviation="2.5" floodColor="#3D3425" floodOpacity="0.3" />
          </filter>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#B5C4AD" />
            <stop offset="100%" stopColor="#9AAE92" />
          </radialGradient>
        </defs>

        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#oceanGrad)" />
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#vintageGrid)" />
        <rect width={MAP_WIDTH} height={MAP_HEIGHT} filter="url(#paperNoise)" opacity="0.25" />

        <ZoomableGroup
          center={center}
          zoom={zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveEnd={handleMoveEnd}
          translateExtent={[[-500, -300], [MAP_WIDTH + 500, MAP_HEIGHT + 300]]}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const vietnam = isVietnam(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={-1}
                    style={{
                      default: {
                        fill: vietnam ? "transparent" : "#E8DFCC",
                        stroke: vietnam ? "none" : "#C4BAA4",
                        strokeWidth: vietnam ? 0 : 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: vietnam ? "transparent" : "#DDD4BF",
                        stroke: vietnam ? "none" : "#B8AE98",
                        strokeWidth: vietnam ? 0 : 0.6,
                        outline: "none",
                      },
                      pressed: {
                        fill: vietnam ? "transparent" : "#E8DFCC",
                        stroke: vietnam ? "none" : "#C4BAA4",
                        strokeWidth: vietnam ? 0 : 0.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          <Geographies geography={VN_PROVINCES_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const hasc = geo.properties?.HASC_1;
                const isHighlighted = highlightedHascCodes.includes(hasc);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    tabIndex={-1}
                    style={{
                      default: {
                        fill: isHighlighted ? "#E8985A" : "#DDA84B",
                        stroke: "#A08530",
                        strokeWidth: 0.4,
                        outline: "none",
                        filter: "url(#vnShadow)",
                      },
                      hover: {
                        fill: isHighlighted ? "#EDA46A" : "#E5B35A",
                        stroke: "#8B7936",
                        strokeWidth: 0.6,
                        outline: "none",
                        filter: "url(#vnShadow)",
                      },
                      pressed: {
                        fill: isHighlighted ? "#E8985A" : "#D49D3E",
                        stroke: "#A08530",
                        strokeWidth: 0.4,
                        outline: "none",
                        filter: "url(#vnShadow)",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {ARCHIPELAGOS.map((arch) => (
            <Marker key={arch.id} coordinates={arch.center}>
              <circle
                r={arch.radiusKm / 5}
                fill="rgba(221,168,75,0.08)"
                stroke="#C4A23A"
                strokeWidth="0.5"
                strokeDasharray="3 2"
              />
              <text
                y={arch.radiusKm / 5 + 8}
                textAnchor="middle"
                fill="#6B5B2E"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="5.5"
                fontWeight="600"
                letterSpacing="0.04em"
              >
                {arch.name}
              </text>
            </Marker>
          ))}

          {ARCHIPELAGOS.flatMap((arch) =>
            arch.islands.map((isle, i) => (
              <Marker key={`${arch.id}-isle-${i}`} coordinates={isle}>
                <circle r={1.2} fill="#DDA84B" stroke="#A08530" strokeWidth="0.3" />
              </Marker>
            ))
          )}

          {highlightedAnchors.map((coords, index) => (
            <Marker key={`region-${highlightedRegionIds[index]}-${index}`} coordinates={coords}>
              <motion.circle
                r={10}
                fill="rgba(230,57,70,0.18)"
                animate={{ scale: [0.95, 1.1, 0.95], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }}
                style={{ filter: "url(#regionGlow)" }}
              />
              <motion.circle
                r={5}
                fill="#E63946"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </Marker>
          ))}

          <ArrowLayer paths={influencePaths} activeKey={selectedEvent?.id ?? "event"} />

          {normalizedEvents.map((eventData) => {
            const isActive = eventData.id === selectedEvent?.id;
            const showTooltip = tooltipEvent?.id === eventData.id;
            const tooltipLines = splitLines(eventData.shortDesc, 30);
            const tooltipHeight = 38 + tooltipLines.length * 12;
            const tooltipWidth = 180;

            return (
              <Marker key={eventData.id} coordinates={eventData.coords}>
                <g
                  onMouseEnter={() => setHoveredMarkerId(eventData.id)}
                  onMouseLeave={() => setHoveredMarkerId((current) => (current === eventData.id ? null : current))}
                  onClick={() => handleMarkerClick(eventData)}
                  className="cursor-pointer"
                >
                  {isActive && (
                    <motion.circle
                      r={10}
                      fill="rgba(230,57,70,0.16)"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.1, 0.6] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <motion.circle
                    r={isActive ? 5 : 3.5}
                    fill="#F5F0E6"
                    stroke="#E63946"
                    strokeWidth={isActive ? 2 : 1.5}
                    animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.85 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ filter: isActive ? "url(#markerGlow)" : "none" }}
                  />
                  <circle r={isActive ? 1.8 : 1.2} fill="#E63946" />
                </g>

                <AnimatePresence>
                  {showTooltip && (
                    <motion.g
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      transform="translate(10, -46)"
                      style={{ pointerEvents: "none" }}
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="2"
                        width={tooltipWidth}
                        height={tooltipHeight}
                        fill="#E9DFC9"
                        stroke="#5D564C"
                        strokeWidth="0.8"
                      />
                      <rect x="0" y="0" width={tooltipWidth} height="18" rx="2" fill="#D5C7AB" />
                      <text
                        x="6"
                        y="13"
                        fill="#3B352D"
                        fontFamily="IBM Plex Mono, monospace"
                        fontSize="8"
                        fontWeight="700"
                      >
                        {eventData.year} | {eventData.title}
                      </text>
                      <text
                        x="6"
                        y="28"
                        fill="#2F2923"
                        fontFamily="Be Vietnam Pro, sans-serif"
                        fontSize="8.5"
                      >
                        {tooltipLines.map((line, lineIndex) => (
                          <tspan key={`${eventData.id}-line-${lineIndex}`} x="6" dy={lineIndex === 0 ? 0 : 12}>
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

      <div className="absolute left-3 bottom-3 bg-[#E9DFC9]/95 border border-[#5D564C] px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-[#2F2923] shadow-hard-sm">
        {selectedEvent?.year ?? "--"} · {selectedEvent?.title ?? ""}
      </div>

      <div className="absolute right-3 bottom-3 flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-[#E9DFC9]/95 border border-[#5D564C] text-[#2F2923] font-mono text-base font-bold flex items-center justify-center hover:bg-[#DDD2B8] active:scale-95 transition-all cursor-pointer shadow-hard-sm"
          aria-label="Phóng to"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-[#E9DFC9]/95 border border-[#5D564C] text-[#2F2923] font-mono text-base font-bold flex items-center justify-center hover:bg-[#DDD2B8] active:scale-95 transition-all cursor-pointer shadow-hard-sm"
          aria-label="Thu nhỏ"
        >
          −
        </button>
        <button
          onClick={handleResetView}
          className="w-8 h-8 bg-[#E9DFC9]/95 border border-[#5D564C] text-[#2F2923] font-mono text-[10px] font-bold flex items-center justify-center hover:bg-[#DDD2B8] active:scale-95 transition-all cursor-pointer shadow-hard-sm"
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
