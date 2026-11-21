export function LogoIcon({
  width = 32,
  height = 32,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id="taskflow-gradient"
          x1="4"
          y1="2"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FF8A3D" />
          <stop offset="100%" stopColor="#F2541B" />
        </linearGradient>
        <clipPath id="taskflow-circle-clip">
          <circle cx="16" cy="16" r="15" />
        </clipPath>
      </defs>

      <g clipPath="url(#taskflow-circle-clip)">
        <circle cx="16" cy="16" r="15" fill="url(#taskflow-gradient)" />
        <path
          d="M -2 13 C 7 8, 17 15, 34 10"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M -2 20 C 7 15, 17 22, 34 17"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
