import React from "react";
import { cn } from "@/lib/utils";

export function BarChart({ data, className }) {
  const maxValue = Math.max(...data.map((d) => d.maxValue || d.value));

  return (
    <div className={cn("w-full min-w-[320px] max-w-[480px]", className)}>
      {/* Chart Container */}
      <div className="relative h-[252px] w-full">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 flex h-[218px] flex-col justify-between py-1 pr-1 text-right">
          {[100, 80, 60, 40, 20, 0].map((value) => (
            <span
              key={value}
              className="font-inter text-xs text-black/70 leading-none"
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart Area */}
        <div className="ml-6 h-[218px] border-b border-black/30 lg:ml-7">
          {/* Grid Lines */}
          <div className="relative h-full w-full">
            {/* Horizontal Grid Lines */}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={cn(
                  "absolute left-0 right-0 h-px",
                  index === 5 ? "bg-black/30" : "bg-black/15"
                )}
                style={{
                  top: `${(index * 100) / 5}%`,
                }}
              />
            ))}

            {/* Vertical Grid Lines */}
            {data.map((_, index) => (
              <div
                key={index}
                className="absolute top-0 bottom-0 w-px bg-black/15"
                style={{
                  left: `${((index + 1) * 100) / (data.length + 1)}%`,
                }}
              />
            ))}

            {/* Bars */}
            <div className="flex h-full items-end justify-around px-9">
              {data.map((item, index) => {
                const barHeight = (item.value / maxValue) * 100;
                return (
                  <div
                    key={index}
                    className="relative flex w-20 flex-col items-center"
                  >
                    {/* Background Bar */}
                    <div className="absolute bottom-0 w-full h-full bg-black/10 opacity-80 rounded-sm" />

                    {/* Value Bar */}
                    <div
                      className="w-full bg-chart-purple opacity-80 rounded-sm transition-all duration-300"
                      style={{ height: `${barHeight}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* X-Axis Labels */}
        <div className="ml-7 flex justify-around pt-2">
          {data.map((item, index) => (
            <span
              key={index}
              className="font-inter text-xs text-black/70 text-center"
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-chart-purple border border-white"></div>
          <span className="font-inter text-xs text-black/70">2020</span>
        </div>
      </div>
    </div>
  );
}
