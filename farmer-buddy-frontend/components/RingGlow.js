"use client";

const ring =
  "pointer-events-none absolute -inset-1 rounded-full animate-spin motion-reduce:[animation-duration:3s] transition-opacity duration-300 " +
  "bg-[conic-gradient(from_0deg,transparent_0deg_200deg,rgba(245,158,11,0.2)_250deg,#f59e0b_320deg,#ffffff_360deg)]";

export default function GlowButton({ loading = false, className = "", ...props }) {
  return (
    <span className="relative inline-grid h-14 w-14 place-items-center rounded-full">
      {/* sharp rotating light */}
      <span className={`${ring} ${loading ? "opacity-100" : "opacity-0"}`} />
      {/* soft glow */}
      <span className={`${ring} blur-[8px] ${loading ? "opacity-100" : "opacity-0"}`} />

      <button
        type="button"
        aria-label="Scroll up"
        aria-busy={loading}
        className={`relative z-10 grid h-14 w-14 place-items-center rounded-full bg-white text-zinc-700 shadow-sm transition hover:shadow-md active:scale-95 focus-visible:outline-offset-2 focus-visible:outline-zinc-700 ${className}`}
        {...props}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </span>
  );
}