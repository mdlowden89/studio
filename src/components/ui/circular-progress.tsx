
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps extends React.SVGProps<SVGSVGElement> {
  progress: number;
  strokeWidth?: number;
  labelClassName?: string;
}

export const CircularProgress = ({ 
  progress, 
  strokeWidth = 4, 
  className,
  labelClassName,
  ...props 
}: CircularProgressProps) => {
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" {...props}>
        <circle
          className="text-primary/20"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="text-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
      </svg>
      <span className={cn("absolute text-center font-bold text-white", labelClassName)}>
        {Math.round(progress)}%
      </span>
    </div>
  );
};
