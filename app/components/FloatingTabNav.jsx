'use client';

// Numbered tab list fixed to the right edge, for jumping between tabs without
// scrolling back up. Only shown once there's guaranteed clearance from page content.
export default function FloatingTabNav({ tabs, active, onSelect }) {
  return (
    <div className="hidden min-[1480px]:flex flex-col items-end gap-5 fixed right-10 top-1/2 -translate-y-1/2 z-40">
      {tabs.map(({ label, value }, i) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`group flex items-baseline gap-3 border-r-2 pr-4 text-right font-PlusJakarta whitespace-nowrap transition-colors duration-200 cursor-pointer ${
              isActive
                ? 'border-[#4A423C] dark:border-white'
                : 'border-transparent'
            }`}
          >
            <span
              className={`text-xs tabular-nums transition-colors duration-200 ${
                isActive
                  ? 'text-[#4A423C]/50 dark:text-white/50'
                  : 'text-[#4A423C]/25 dark:text-white/25 group-hover:text-[#4A423C]/50 dark:group-hover:text-white/50'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`text-sm transition-colors duration-200 ${
                isActive
                  ? 'text-[#4A423C] dark:text-white font-semibold'
                  : 'text-[#4A423C]/40 dark:text-white/40 group-hover:text-[#4A423C]/70 dark:group-hover:text-white/70'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
