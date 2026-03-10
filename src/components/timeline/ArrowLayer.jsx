import { motion } from "framer-motion";
import { useId, useMemo } from "react";
import { useMapContext } from "react-simple-maps";

const MotionPath = motion.path;

function isCoord(value) {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function curvedSegment(start, end) {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy) || 1;
  const normalX = -dy / distance;
  const normalY = dx / distance;
  const bend = Math.min(30, distance * 0.14);
  const controlX = (x1 + x2) * 0.5 + normalX * bend;
  const controlY = (y1 + y2) * 0.5 + normalY * bend;
  return `Q ${controlX} ${controlY} ${x2} ${y2}`;
}

function toProjectedPath(projection, coordinates = []) {
  if (!projection || !Array.isArray(coordinates) || coordinates.length < 2) return null;

  const projected = coordinates.map((coord) => projection(coord)).filter(Boolean);
  if (projected.length < 2) return null;

  if (projected.length === 2) {
    return `M ${projected[0][0]} ${projected[0][1]} ${curvedSegment(projected[0], projected[1])}`;
  }

  let d = `M ${projected[0][0]} ${projected[0][1]}`;
  for (let index = 1; index < projected.length; index += 1) {
    d += ` ${curvedSegment(projected[index - 1], projected[index])}`;
  }
  return d;
}

export default function ArrowLayer({ paths = [], activeKey = 0 }) {
  const { projection } = useMapContext();
  const uid = useId().replace(/:/g, "");
  const markerId = `influenceArrowHead-${uid}`;
  const glowId = `influenceArrowGlow-${uid}`;

  const renderedPaths = useMemo(() => {
    if (!projection || !Array.isArray(paths)) return [];

    return paths
      .map((item, index) => {
        const source = Array.isArray(item) ? { coordinates: item } : item;
        const coordinates = source?.coordinates;
        if (!Array.isArray(coordinates) || coordinates.length < 2 || !coordinates.every(isCoord)) {
          return null;
        }

        const d = toProjectedPath(projection, coordinates);
        if (!d) return null;

        return {
          key: `${activeKey}-${source.id ?? index}`,
          d,
          dashed: source.dashed ?? true,
          color: source.color ?? "#E63946",
          strokeWidth: Math.min(source.strokeWidth ?? 1.5, 2),
        };
      })
      .filter(Boolean);
  }, [projection, paths, activeKey]);

  if (renderedPaths.length === 0) return null;

  return (
    <g className="pointer-events-none">
      <defs>
        <marker
          id={markerId}
          markerWidth="5"
          markerHeight="5"
          refX="4"
          refY="2.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0.5 L0,4.5 L4.5,2.5 z" fill="#E63946" fillOpacity="0.85" />
        </marker>
        <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#E63946" floodOpacity="0.35" />
        </filter>
      </defs>

      {renderedPaths.map((path, index) => (
        <g key={path.key}>
          <MotionPath
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={path.dashed ? "6 4" : undefined}
            markerEnd={`url(#${markerId})`}
            style={{ filter: `url(#${glowId})` }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{ duration: 1.1, delay: index * 0.1, ease: "easeOut" }}
          />
        </g>
      ))}
    </g>
  );
}

