import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import logo from "../assets/StoryNest-shortLogo.png";

export default function LoadingPage() {
  return (
    <div className="mx-auto w-full max-w-[1000px] sm:p-8 p-4 py-8">
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
          {/* Spinner */}
          <div className="relative flex h-36 w-36 items-center justify-center">
            <CircularProgress
              size={100}
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
                h-22
                w-22
                items-center
                justify-center
                rounded-full
                border
                border-green-100
                bg-white/40
                shadow-lg
              "
            >
              <img
                src={logo}
                alt="StoryNest"
                draggable={false}
                className="h-9 w-9 select-none object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            <span className="text-green-700">Story</span>
            <span className="text-slate-700">Nest</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 text-center text-gray-500">
            Loading...
          </p>

          {/* Dots */}
          <div className="mt-5 flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-600"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-600"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-green-600"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
    </div>
  );
}