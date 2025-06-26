import React from "react";

interface CustomCircularProgressProps {
  value: number; // 0 - 100
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
  text?: string;
  textSize?: string;
  size?: number; // diameter in px
}

const CustomCircularProgress: React.FC<CustomCircularProgressProps> = ({
  value,
  strokeWidth = 8,
  color = "#4caf50",
  trailColor = "#e5e7eb",
  text = "",
  textSize = "10px",
  size = 48,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trailColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      {/* Center text */}
      {text && (
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={textSize}
          fill={color}
          fontWeight="bold"
        >
          {text}
        </text>
      )}
    </svg>
  );
};

export default CustomCircularProgress;
