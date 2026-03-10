import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_TRANSITION = {
  type: "spring",
  stiffness: 140,
  damping: 24,
  mass: 0.65,
};

export function useMapSpring(initialCenter = [106.5, 16.2], initialZoom = 4.8) {
  const centerX = useMotionValue(initialCenter[0]);
  const centerY = useMotionValue(initialCenter[1]);
  const zoomValue = useMotionValue(initialZoom);
  const animationControlsRef = useRef([]);
  const frameRef = useRef(null);
  const latestRef = useRef({
    x: initialCenter[0],
    y: initialCenter[1],
    zoom: initialZoom,
  });

  const [view, setView] = useState({
    center: [...initialCenter],
    zoom: initialZoom,
  });

  const scheduleCommit = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      setView({
        center: [latestRef.current.x, latestRef.current.y],
        zoom: latestRef.current.zoom,
      });
    });
  }, []);

  useMotionValueEvent(centerX, "change", (latest) => {
    latestRef.current.x = latest;
    scheduleCommit();
  });

  useMotionValueEvent(centerY, "change", (latest) => {
    latestRef.current.y = latest;
    scheduleCommit();
  });

  useMotionValueEvent(zoomValue, "change", (latest) => {
    latestRef.current.zoom = latest;
    scheduleCommit();
  });

  const stopRunningAnimations = useCallback(() => {
    animationControlsRef.current.forEach((control) => control.stop());
    animationControlsRef.current = [];
  }, []);

  const flyTo = useCallback(
    (coords, nextZoom = 5.8, transition = {}) => {
      if (!Array.isArray(coords) || coords.length < 2) return;

      stopRunningAnimations();
      const config = { ...DEFAULT_TRANSITION, ...transition };

      animationControlsRef.current = [
        animate(centerX, coords[0], config),
        animate(centerY, coords[1], config),
        animate(zoomValue, nextZoom, config),
      ];
    },
    [centerX, centerY, zoomValue, stopRunningAnimations],
  );

  const jumpTo = useCallback(
    (coords, nextZoom) => {
      if (!Array.isArray(coords) || coords.length < 2) return;
      stopRunningAnimations();
      centerX.set(coords[0]);
      centerY.set(coords[1]);
      if (nextZoom !== undefined) zoomValue.set(nextZoom);
    },
    [centerX, centerY, zoomValue, stopRunningAnimations],
  );

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      stopRunningAnimations();
    };
  }, [stopRunningAnimations]);

  return {
    center: view.center,
    zoom: view.zoom,
    flyTo,
    jumpTo,
  };
}

export default useMapSpring;

