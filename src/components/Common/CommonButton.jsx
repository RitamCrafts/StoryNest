import React from "react";

export default function CommonButton({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]",

    secondary:
      "bg-green-50 text-green-700 hover:bg-green-100",

    outline:
      "border border-green-200 bg-white text-green-700 hover:bg-green-50",

    danger:
      "bg-red-500 text-white hover:bg-red-600",

    ghost:
      "text-green-700 hover:bg-green-50",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-xl
        px-5
        py-2.5

        text-sm
        font-medium

        transition-all
        duration-200

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${styles[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}