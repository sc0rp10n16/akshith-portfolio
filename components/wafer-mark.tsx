export function WaferMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`wafer ${className}`}
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="160" cy="160" r="148" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="160" cy="160" r="118" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="160" cy="160" r="86" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="160" cy="160" r="48" stroke="currentColor" strokeWidth="0.75" />
      <path d="M160 12v296M12 160h296" stroke="currentColor" strokeWidth="0.5" />
      <path
        d="M160 12c18 22 28 44 28 70"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <circle cx="160" cy="160" r="4" fill="currentColor" />
    </svg>
  );
}
