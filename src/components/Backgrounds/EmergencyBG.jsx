import React from "react";
export default function EmergencyBG() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100" />

      {/* Top left glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-green-300/30 blur-3xl" />

      {/* Bottom right glow */}
      <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-emerald-400/20 blur-3xl" />

      {/* Center glow */}
      <div className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-lime-200/20 blur-3xl" />
    </div>
  )
}