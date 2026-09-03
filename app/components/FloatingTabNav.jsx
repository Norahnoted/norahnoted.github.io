'use client';

// Text-only tab list fixed to the right edge, for jumping between tabs without
// scrolling back up. Only shown once there's guaranteed clearance from page content.
export default function FloatingTabNav({ tabs, active, onSelect }) {
  return (
    <div className="hidden min-[1480px]:flex flex-col items-end gap-4 fixed right-4 top-1/2 -translate-y-1/2 z-40">
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={`text-right font-PlusJakarta whitespace-nowrap transition-all duration-200 cursor-pointer ${
            active === value
              ? 'text-base text-[#4A423C] dark:text-white font-medium'
              : 'text-sm text-[#4A423C]/40 dark:text-white/40 hover:text-base hover:text-[#4A423C]/80 dark:hover:text-white/70'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
