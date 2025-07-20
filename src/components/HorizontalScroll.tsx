// components/HorizontalScroll.tsx
"use client";

import React from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 px-0 py-2">{children}</div>
    </div>
  );
};

export default HorizontalScroll;
