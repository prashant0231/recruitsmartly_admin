// src/components/Header.tsx
"use client";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800">Workspace</h1>
      {/* Add user dropdown / settings here */}
    </header>
  );
};

export default Header;
