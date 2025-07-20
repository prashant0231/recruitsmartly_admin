"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-indigo-100 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-extrabold text-indigo-700 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for might have been removed or doesnt exist.
        </p>

        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-9 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 transition duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
