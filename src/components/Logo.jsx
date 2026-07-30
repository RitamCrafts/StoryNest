import React from "react";
import shortLogo from "../assets/BlogNest-shortLogo.png";
import fullLogo from "../assets/BlogNest-fullLogo.png";

export default function Logo({
  width = "120px",
  className = "",
  alt = "BlogNest",
  short = true,
}) {
  return (
    <img
      src={short ? shortLogo : fullLogo}
      alt={alt}
      style={{ width }}
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}