import React from "react";
import shortLogo from "../assets/StoryNest-shortLogo.png";
import fullLogo from "../assets/StoryNest-fullLogo.png";
import textLogo from "../assets/StoryNest-textLogo.png";

export default function Logo({
  width = "130px",
  className = "",
  alt = "StoryNest",
  short = true,
  text = false
}) {
  return (
    <img
      src={short ? shortLogo : (text ? textLogo : fullLogo)}
      alt={alt}
      style={{ width }}
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}