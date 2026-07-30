import React from "react";
import { NavLink } from "react-router-dom";

export default function AboutBtn() {
  return (
    <NavLink
      to="/about"
      className={({ isActive }) =>
        `relative sm:px-3 px-2 py-1 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "text-green-700"
            : "text-gray-600 hover:text-green-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          About
          {isActive && (
            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-green-600" />
          )}
        </>
      )}
    </NavLink>
  );
}