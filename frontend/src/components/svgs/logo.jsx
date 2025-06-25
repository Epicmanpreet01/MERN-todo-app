import React from 'react';

const TaskMateLogo = ({
  text = 'TaskMate',
  size = 160,
  textColor = '#1f2937',
  className = '',
  textClassName = '',
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={(size * 50) / 160}
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Circle background */}
      <circle cx="25" cy="25" r="22" fill="url(#grad1)" />

      {/* Checkmark */}
      <path
        d="M16 26.5L22 32L34 18"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* App Text */}
      <text
        x="55"
        y="32"
        fontFamily="Segoe UI, sans-serif"
        fontSize="24"
        fill={textColor}
        fontWeight="600"
        className={textClassName}
      >
        {text}
      </text>
    </svg>
  );
};

export default TaskMateLogo;
