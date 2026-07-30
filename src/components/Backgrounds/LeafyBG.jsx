import React from "react";

export default function LeafyBG() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f8fcf8 0%, #edf8f1 35%, #e5f4ea 70%, #d8efe1 100%)",
      }}
    >
      {/* Soft Glows */}
      <div className="absolute -top-56 -left-56 h-[34rem] w-[34rem] rounded-full bg-green-300/20 blur-3xl" />

      <div className="absolute -bottom-52 -right-52 h-[32rem] w-[32rem] rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/3 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-lime-200/10 blur-3xl" />

      {/* LEFT TOP LEAF CLUSTER */}
      <svg
        className="absolute -left-24 -top-10 w-72 opacity-20"
        viewBox="0 0 220 320"
        fill="none"
      >
        <ellipse
          cx="65"
          cy="90"
          rx="30"
          ry="120"
          fill="#5FAF67"
          transform="rotate(-30 65 90)"
        />

        <ellipse
          cx="120"
          cy="120"
          rx="28"
          ry="100"
          fill="#87C88D"
          transform="rotate(-15 120 120)"
        />

        <ellipse
          cx="165"
          cy="70"
          rx="20"
          ry="70"
          fill="#A8DDA8"
          transform="rotate(-50 165 70)"
        />
      </svg>

      {/* RIGHT BOTTOM LEAF CLUSTER */}
      <svg
        className="absolute -right-24 -bottom-12 w-80 opacity-20"
        viewBox="0 0 220 340"
        fill="none"
      >
        <ellipse
          cx="170"
          cy="170"
          rx="32"
          ry="125"
          fill="#58A760"
          transform="rotate(24 170 170)"
        />

        <ellipse
          cx="120"
          cy="230"
          rx="28"
          ry="100"
          fill="#9DD79D"
          transform="rotate(8 120 230)"
        />

        <ellipse
          cx="190"
          cy="275"
          rx="20"
          ry="72"
          fill="#C2E9C2"
          transform="rotate(34 190 275)"
        />
      </svg>

      {/* Floating Leaf */}
      <svg
        className="absolute right-20 top-12 w-12 opacity-25"
        viewBox="0 0 60 90"
        fill="none"
      >
        <path
          d="M30 4C48 18 56 40 52 62C48 82 38 90 30 88C22 90 12 82 8 62C4 40 12 18 30 4Z"
          fill="#76C47A"
        />
        <line
          x1="30"
          y1="5"
          x2="30"
          y2="86"
          stroke="#4E9A53"
          strokeWidth="1.3"
          opacity=".5"
        />
      </svg>

      {/* Floating Leaf */}
      <svg
        className="absolute left-1/4 bottom-20 w-10 opacity-20 rotate-12"
        viewBox="0 0 60 90"
        fill="none"
      >
        <path
          d="M30 4C48 18 56 40 52 62C48 82 38 90 30 88C22 90 12 82 8 62C4 40 12 18 30 4Z"
          fill="#95D29B"
        />
      </svg>

      {/* Decorative Circles */}
      <div className="absolute left-14 top-80 h-44 w-44 rounded-full bg-green-300/15" />

      <div className="absolute bottom-28 right-16 h-52 w-52 rounded-full bg-green-400/12" />

      <div className="absolute left-[26%] bottom-16 h-32 w-32 rounded-full bg-green-300/15" />

      {/* Small Floating Dots */}
      <div className="absolute left-[35%] top-14 h-6 w-6 rounded-full bg-green-300/30" />
      <div className="absolute left-[70%] top-44 h-3 w-3 rounded-full bg-green-300/40" />
      <div className="absolute right-[30%] bottom-36 h-4 w-4 rounded-full bg-lime-200/40" />
      <div className="absolute left-[20%] bottom-[35%] h-2 w-2 rounded-full bg-green-400/40" />
      <div className="absolute right-[12%] top-[35%] h-3 w-3 rounded-full bg-green-300/35" />
    </div>
  );
}