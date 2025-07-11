import React from "react";
import { cn } from "@/lib/utils";

export function StatsCard({ title, value, subtitle, icon, className }) {
  return (
    <div
      className={cn(
        "relative h-[183px] w-full rounded-[10px] bg-cream p-6 shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      {/* Icon positioned at top-right */}
      <div className="absolute right-6 top-6">{icon}</div>

      {/* Content */}
      <div className="flex h-full flex-col justify-between">
        {/* Title */}
        <h3 className="font-poppins text-xl font-bold text-dark-gray leading-tight max-w-[calc(100%-56px)]">
          {title}
        </h3>

        {/* Main Value */}
        <div className="font-poppins text-[40px] font-bold text-dark-gray leading-none">
          {value}
        </div>

        {/* Subtitle */}
        <p className="font-poppins text-xs text-teal-primary">{subtitle}</p>
      </div>
    </div>
  );
}
