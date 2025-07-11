import React from "react";
import { cn } from "@/lib/utils";

export function PieChart({ data, className }) {
  // Calculate cumulative percentages for SVG path generation
  let cumulativePercentage = 0;
  const radius = 160;
  const centerX = 230.5;
  const centerY = 160;

  const createPath = (percentage, startAngle) => {
    const endAngle = startAngle + (percentage / 100) * 360;
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = percentage > 50 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className={cn("relative w-full min-w-[320px] max-w-[501px] h-[368px]", className)}>
      {/* Main Pie Chart SVG */}
      <svg
        className="absolute left-3 top-6 w-full max-w-[461px] h-[320px] lg:left-5"
        viewBox="0 0 461 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {data.map((segment, index) => {
          const startAngle = cumulativePercentage * 3.6 - 90; // Start from top
          const path = createPath(segment.percentage, startAngle);
          cumulativePercentage += segment.percentage;

          return (
            <path
              key={index}
              d={path}
              fill={segment.color}
              className="transition-opacity duration-200 hover:opacity-80"
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div className="absolute left-3 top-20 w-[477px] h-[241px]">
        {/* Praroro Label - Top Right */}
        <div className="absolute right-0 top-24">
          <div className="relative">
            <svg
              className="absolute left-0 top-4 w-[101px] h-1"
              viewBox="0 0 101 3"
              fill="none"
            >
              <path
                d="M0.998047 0.90387L15.2833 1.61596H101"
                stroke="#8979FF"
                strokeWidth="1"
              />
            </svg>
            <div className="ml-5">
              <div className="text-right">
                <span className="font-inter text-xs text-black/70">Praroro</span>
              </div>
              <div className="flex justify-end gap-2 mt-1">
                <span className="font-inter text-xs font-bold text-chart-purple">
                  86.55
                </span>
                <span className="font-inter text-xs text-chart-purple">
                  51.59%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Popowi Label - Bottom Left */}
        <div className="absolute left-0 bottom-8">
          <div className="relative">
            <svg
              className="absolute left-0 top-1 w-[154px] h-3"
              viewBox="0 0 154 13"
              fill="none"
            >
              <path
                d="M153.29 0.401581L144.502 11.6857H0"
                stroke="#FF928A"
                strokeWidth="1"
              />
            </svg>
            <div>
              <span className="font-inter text-xs text-black/70">Popowi</span>
              <div className="flex gap-2 mt-1">
                <span className="font-inter text-xs font-bold text-chart-coral">
                  30.02
                </span>
                <span className="font-inter text-xs text-chart-coral">
                  17.89%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Janggar Label - Top Left */}
        <div className="absolute left-0 top-0">
          <div className="relative">
            <svg
              className="absolute left-0 top-4 w-[126px] h-2"
              viewBox="0 0 126 10"
              fill="none"
            >
              <path
                d="M124.992 9.34285L113.284 1.12669H0"
                stroke="#3CC3DF"
                strokeWidth="1"
              />
            </svg>
            <div>
              <span className="font-inter text-xs text-black/70">Janggar</span>
              <div className="flex gap-2 mt-1">
                <span className="font-inter text-xs font-bold text-chart-cyan">
                  51.21
                </span>
                <span className="font-inter text-xs text-chart-cyan">
                  30.52%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
