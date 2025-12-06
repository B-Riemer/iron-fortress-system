export function Scanline() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.05]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 1) 1px, rgba(0, 0, 0, 1) 2px)",
      }}
      aria-hidden="true"
    />
  );
}

