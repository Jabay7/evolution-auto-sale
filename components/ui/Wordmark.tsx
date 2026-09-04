type WordmarkProps = {
  /** Hides the secondary line on very narrow layouts. */
  compact?: boolean;
  className?: string;
};

/**
 * Text lockup standing in for the official logo.
 * Drop a real logo into /public/images/brand/ and swap this component's
 * contents when it arrives — nothing else references the mark.
 */
export function Wordmark({ compact = false, className = "" }: WordmarkProps) {
  return (
    <span className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] uppercase leading-none">
        Evolution
      </span>
      <span
        aria-hidden="true"
        className={`h-3 w-px translate-y-px bg-line-strong ${compact ? "hidden sm:block" : ""}`}
      />
      <span
        className={`label-micro text-muted leading-none ${compact ? "hidden sm:block" : ""}`}
      >
        Auto Sale
      </span>
    </span>
  );
}
