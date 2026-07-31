import React from "react";
import { NavLink } from "react-router-dom";

export default function LoginBtn() {
  return (
    <NavLink
      to="/login"
      className={({ isActive }) =>
        `relative px-2 py-1 cursor-pointer text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "text-green-700"
            : "text-gray-600 hover:text-green-700"
        }`
      }
    >
      {({ isActive }) => (
        <>
          Login
          {isActive && (
            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-green-600" />
          )}
        </>
      )}
    </NavLink>
  );
}