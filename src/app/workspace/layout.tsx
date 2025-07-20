"use client";
import Sidebar from "@/components/Sidebar";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useHydrateAuth();
  return (
    <div className="flex h-screen overflow-hidden justify-center bg-gray-100">
      {/* Sidebar - always visible */}
      <Sidebar />
      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1 min-h-0"
        style={{
          maxWidth: 1800,
          minWidth: 800,
        }}
      >
        <main className="flex-1 overflow-y-auto bg-gray-50 p-8 lg:p-10 xl:p-10 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
