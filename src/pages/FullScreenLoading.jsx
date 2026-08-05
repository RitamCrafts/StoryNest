import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import LeafyBG from "../components/Backgrounds/LeafyBG";
import logo from "../assets/StoryNest-shortLogo.png";

export default function FullScreenLoading() {
  return (
    <div className="fixed inset-0 z-[9999]">
      <LeafyBG />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Spinner + Frosted Circle */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          <CircularProgress
            size={140}
            thickness={2.8}
            sx={{
              color: "#16A34A",
              animationDuration: "1.15s",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          <div
            className="
              absolute
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              border
              border-white/50
              bg-white/20
              backdrop-blur-xl
              shadow-[0_10px_40px_rgba(22,163,74,0.18)]
            "
          >
            <img
              src={logo}
              alt="StoryNest"
              draggable={false}
              className="h-12 w-12 select-none object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-green-800">
          <span className="text-green-700">Story</span><span className="text-slate-700">Nest</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-center text-gray-600">
          Preparing your peaceful reading experience...
        </p>

        {/* Bouncing Dots */}
        <div className="mt-8 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: "0ms" }}
          />

          <span
            className="h-2.5 w-2.5 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: "150ms" }}
          />

          <span
            className="h-2.5 w-2.5 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}