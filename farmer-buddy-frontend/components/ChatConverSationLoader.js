import React from "react";

function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
  );
}

function SkeletonBar({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded bg-black/15 dark:bg-white/15 ${className}`}
    >
      <Shimmer />
    </div>
  );
}

function SkeletonPill({ className = "", bg = "bg-blue-300/70" }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${bg} ${className}`}>
      <Shimmer />
    </div>
  );
}

export default function ChatThreadSkeleton() {
  return (
    <div className="w-full rounded-lg p-6">
      {/* uploaded image thumbnail, top-right */}
      <div className="flex justify-end">
        <SkeletonBar className="h-28 w-40 rounded-md" />
      </div>

      {/* two short right-aligned user bubbles */}
      <div className="mt-4 flex flex-col items-end gap-3">
        <SkeletonPill className="h-9 w-40" />
        <SkeletonPill className="h-9 w-32" />
      </div>

      {/* large left-aligned bot answer bubble */}
      <div className="relative mt-5 w-full overflow-hidden rounded-lg bg-gray-800 px-5 py-4">
        <div className="flex flex-col gap-2.5">
          <SkeletonBar className="h-3 w-[96%] bg-white/20" />
          <SkeletonBar className="h-3 w-[90%] bg-white/20" />
          <SkeletonBar className="h-3 w-[93%] bg-white/20" />
          <SkeletonBar className="h-3 w-[85%] bg-white/20" />
          <SkeletonBar className="h-3 w-[70%] bg-white/20" />
        </div>
      </div>

      {/* trailing left-aligned decision bubble */}
      <div className="mt-4 flex">
        <SkeletonPill className="h-10 w-44" />
      </div>
    </div>
  );
}
