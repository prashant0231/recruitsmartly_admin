import { motion } from "framer-motion";
import { Search } from "lucide-react";

type EmptyStateProps = {
  message?: string; // Correctly type the message prop
};

export default function NoDatFound({
  message = "Oops! No data found—either nothing exists or filters didn’t match.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-0 px-4 rounded-xl shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-center bg-blue-100 rounded-full h-10 w-10 shadow-sm mb-4">
        <Search className="h-5 w-5 text-blue-500" />
      </div>
      {/* <h2 className="text-lg font-semibold text-gray-800 mb-2">
        No Data Found
      </h2> */}
      <p className="text-base text-gray-600 mb-2">{message}</p>
    </div>
  );
}
