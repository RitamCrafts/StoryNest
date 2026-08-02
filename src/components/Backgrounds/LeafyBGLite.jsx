import React from "react";

export default function LeafyBGLite() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#fcfefc 0%,#f8fcf9 35%,#f3faf5 70%,#eef8f1 100%)",
      }}
    >
      {/* Soft Glows */}
      <div className="absolute -top-56 -left-56 h-[34rem] w-[34rem] rounded-full bg-green-300/10 blur-3xl" />

      <div className="absolute -bottom-56 -right-56 h-[32rem] w-[32rem] rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-lime-200/5 blur-3xl" />

      {/* Top Left Leaves */}
      <svg
        className="absolute -left-28 -top-16 w-72 opacity-10"
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

      {/* Bottom Right Leaves */}
      <svg
        className="absolute -right-28 -bottom-16 w-80 opacity-10"
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
        className="absolute right-24 top-16 w-10 opacity-10"
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
          strokeWidth="1.2"
          opacity=".4"
        />
      </svg>

      {/* Floating Leaf */}
      <svg
        className="absolute left-1/4 bottom-24 w-8 rotate-12 opacity-10"
        viewBox="0 0 60 90"
        fill="none"
      >
        <path
          d="M30 4C48 18 56 40 52 62C48 82 38 90 30 88C22 90 12 82 8 62C4 40 12 18 30 4Z"
          fill="#95D29B"
        />
      </svg>

      {/* Decorative Circles */}
      <div className="absolute left-16 top-80 h-36 w-36 rounded-full bg-green-300/8" />

      <div className="absolute bottom-24 right-20 h-40 w-40 rounded-full bg-green-300/8" />

      {/* Tiny Dots */}
      <div className="absolute left-[35%] top-16 h-4 w-4 rounded-full bg-green-300/20" />

      <div className="absolute right-[28%] bottom-36 h-3 w-3 rounded-full bg-green-300/20" />

      <div className="absolute left-[22%] bottom-[34%] h-2 w-2 rounded-full bg-green-300/20" />
    </div>
  );
}