import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface ScrollButtonProps {
  direction: "left" | "right";
  canScroll: boolean;
  scrollBy: (amount: number) => void;
  organizationsLength: number;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  canScroll,
  scrollBy,
  organizationsLength,
}) => {
  const isRight = direction === "right";
  const Icon = isRight ? ChevronRight : ChevronLeft;
  const positionClass = isRight ? "right-2" : "left-2";
  const scrollAmount = isRight ? 300 : -300;

  return (
    <button
      type="button"
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full shadow p-1 transition-opacity ${
        canScroll
          ? "opacity-100 cursor-pointer"
          : "opacity-30 pointer-events-none cursor-not-allowed"
      }`}
      onClick={() => scrollBy(scrollAmount)}
      aria-label={`Scroll ${direction}`}
      style={{ display: organizationsLength > 0 ? "block" : "none" }}
      disabled={!canScroll}
    >
      <Icon className="w-5 h-5 text-black" />
    </button>
  );
};

export default ScrollButton;
