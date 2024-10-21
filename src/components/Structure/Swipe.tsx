import { useEffect, useRef } from "react";

type SwipeProps = {
  setViewMode: (viewMode: "image" | "text") => void;
};

export const Swipe = ({ setViewMode }: SwipeProps) => {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    touchEndY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current !== null &&
      touchEndX.current !== null &&
      touchStartY.current !== null &&
      touchEndY.current !== null
    ) {
      const deltaX = touchStartX.current - touchEndX.current;
      const deltaY = touchStartY.current - touchEndY.current;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        // Horizontal swipe
        if (deltaX > 0) {
          // Swipe left
          setViewMode("image");
        } else {
          // Swipe right
          setViewMode("text");
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  useEffect(() => {
    const container = document.getElementById("swipe-container");
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return null;
};
