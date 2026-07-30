import React from "react";

export default function CommonIconButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`
        h-11
        w-11

        rounded-full

        border border-green-100

        bg-green-50

        text-green-700

        transition-all
        duration-200

        hover:bg-green-100
        hover:scale-105

        active:scale-95

        flex
        items-center
        justify-center

        shadow-sm

        ${className}
      `}
    >
      {children}
    </button>
  );
}