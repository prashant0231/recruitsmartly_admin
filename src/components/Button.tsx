"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

const Button = ({
  label,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
      {label}
    </button>
  );
};

export default Button;
