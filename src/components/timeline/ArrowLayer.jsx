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

/**
 * Gentle curve between two projected points.
 * Bend is proportional to distance but capped for readability.
 */
function curvedSegment(start, end) {
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.hypot(dx, dy) || 1;
  const normalX = -dy / distance;
  const normalY = dx / distance;
  const bend = Math.min(20, distance * 0.1);
  const controlX = (x1 + x2) * 0.5 + normalX * bend;
  const controlY = (y1 + y2) * 0.5 + normalY * bend;
  return `Q ${controlX} ${controlY} ${x2} ${y2}`;
}

function toProjectedPath(projection, coordinates = []) {
  if (!projection || !Array.isArray(coordinates) || coordinates.length < 2)
    return null;

  const projected = coordinates.map((c) => projection(c)).filter(Boolean);
  if (projected.length < 2) return null;

  if (projected.length === 2) {
    return `M ${projected[0][0]} ${projected[0][1]} ${curvedSegment(projected[0], projected[1])}`;
  }

  let d = `M ${projected[0][0]} ${projected[0][1]}`;
  for (let i = 1; i < projected.length; i++) {
    d += ` ${curvedSegment(projected[i - 1], projected[i])}`;
  }
  return d;
}

export default function ArrowLayer({ paths = [], activeKey = 0 }) {
  const { projection } = useMapContext();
  const uid = useId().replace(/:/g, "");
  const markerId = `arrowHead-${uid}`;

  const renderedPaths = useMemo(() => {
    if (!projection || !Array.isArray(paths)) return [];

    return paths
      .map((item, index) => {
        const source = Array.isArray(item) ? { coordinates: item } : item;
        const coordinates = source?.coordinates;
        if (
          !Array.isArray(coordinates) ||
          coordinates.length < 2 ||
          !coordinates.every(isCoord)
        )
          return null;

        const d = toProjectedPath(projection, coordinates);
        if (!d) return null;

        return {
          key: `${activeKey}-${source.id ?? index}`,
          d,
          dashed: source.dashed ?? true,
          color: source.color ?? "#C9484A",
          strokeWidth: Math.min(source.strokeWidth ?? 0.8, 1.5),
        };
      })
      .filter(Boolean);
  }, [projection, paths, activeKey]);

  if (renderedPaths.length === 0) return null;

  return (
    <g className="pointer-events-none">
      <defs>
        {/* Compact triangular arrowhead */}
        <marker
          id={markerId}
          markerWidth="4"
          markerHeight="4"
          refX="3.5"
          refY="2"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0.5 L0,3.5 L3.5,2 z" fill="#C9484A" fillOpacity="0.7" />
        </marker>
      </defs>

      {renderedPaths.map((path, index) => (
        <MotionPath
          key={path.key}
          d={path.d}
          fill="none"
          stroke={path.color}
          strokeWidth={path.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={path.dashed ? "5 4" : undefined}
          strokeOpacity={0.55}
          markerEnd={`url(#${markerId})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: index * 0.12,
            ease: "easeOut",
          }}
        />
      ))}
    </g>
  );
}
