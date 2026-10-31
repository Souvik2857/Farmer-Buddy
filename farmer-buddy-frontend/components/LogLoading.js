import React from "react";
function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
  );
}
 
function SkeletonBar({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-black/10 dark:bg-white/10 ${className}`}
    >
      <Shimmer />
    </div>
  );
}
 
function SkeletonRow({ lines = 1, bg = "bg-green-200" }) {
  return (
    <div className={`relative w-full h-18 flex flex-col justify-center rounded-lg ${bg} px-5 py-4`}>
      {/* expand icon, top-right corner */}
      <div className="absolute right-7 top-7">
        <SkeletonBar className="h-4 w-4 rounded-sm" />
      </div>
 
      <div className="flex items-start gap-6 pr-8">
        {/* left label column: "•User: email" */}
        <div className="flex-shrink-0 w-56">
          <SkeletonBar className="h-3 w-full max-w-[200px]" />
        </div>
 
        {/* right message column */}
        <div className="flex flex-1 flex-col gap-2 pt-0.5">
          <SkeletonBar className="h-3 w-[60%]" />
          {lines > 1 && <SkeletonBar className="h-3 w-[40%]" />}
        </div>
      </div>
    </div>
  );
}
 
export default function ChatSkeletonLoader({ rows = 6 }) {
  // Mirrors the reference screenshot: mostly green rows, one red
  // (error/flagged) row, with varying 1-2 line message lengths.
  const config = [
    { lines: 1, bg: "bg-green-200" },
    { lines: 2, bg: "bg-green-200" },
    { lines: 1, bg: "bg-red-300" },
    { lines: 2, bg: "bg-green-200" },
  ];
 
  const data =
    rows <= config.length
      ? config.slice(0, rows)
      : [...config, ...Array.from({ length: rows - config.length }, () => config[0])];
 
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {data.map((row, i) => (
        <SkeletonRow key={i} lines={row.lines} bg={row.bg} />
      ))}
    </div>
  );
}