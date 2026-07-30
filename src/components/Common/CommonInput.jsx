import React from "react";
import { useId } from "react";

function CommonInput({
  label,
  type = "text",
  className = "",
  ref,
  ...props
}) {
  const inputId = useId();
  return (
    <div className={`w-full ${className}`}>
      <label className="mb-1 block text-sm font-medium text-gray-800 select-none" htmlFor={inputId}>
        {label}
      </label>

      <input
        ref={ref}
        id={inputId}
        type={type}
        className="
          w-full
          rounded-md
          border
          border-gray-300
          bg-white
          px-4
          py-3
          text-sm
          text-gray-800
          shadow-sm
          transition-colors
          duration-200
          placeholder:text-gray-400

          focus:border-green-600
          focus:outline-none
        "
        {...props}
      />
    </div>
  );
}

export default CommonInput;