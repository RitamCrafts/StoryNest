export default function UserAvatarIcon({
  size = 42,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="#EAF7E6"
        stroke="#A7D7A5"
        strokeWidth="2"
      />

      {/* Head */}
      <circle
        cx="32"
        cy="23"
        r="10"
        fill="#2F3A32"
      />

      {/* Body */}
      <path
        d="M18 49c0-8 6-14 14-14s14 6 14 14"
        fill="#2F3A32"
      />
    </svg>
  );
}