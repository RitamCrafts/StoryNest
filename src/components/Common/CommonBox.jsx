import React from "react";

function CommonBox({
  children,
  className = "",
  padding = "p-8",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border border-green-100/70
        bg-white/70
        backdrop-blur-xl
        shadow-[0_10px_35px_rgba(22,101,52,0.08)]
        transition-all
        duration-300
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default CommonBox;