import type { SVGProps } from "react";
type P = SVGProps<SVGSVGElement>;
const base = { width: "1em", height: "1em", "aria-hidden": true, focusable: false } as const;

export const IconBag = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IconWhats = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...base} {...p}>
    <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm5.4 13.4c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.4.1.1.1.6-.1 1.4Z" />
  </svg>
);
export const IconArrow = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconSearch = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
export const IconPlus = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 310" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 300 C 40 220 70 150 130 40" />
        <g transform="translate(34 240) rotate(-35)"><path d="M0 0 C 20 -24 56 -28 86 0 C 56 28 20 24 0 0 Z" /><path d="M0 0 L86 0" /></g>
        <g transform="translate(58 190) rotate(-70)"><path d="M0 0 C 18 -22 52 -26 80 0 C 52 26 18 22 0 0 Z" /><path d="M0 0 L80 0" /></g>
        <g transform="translate(88 140) rotate(-20)"><path d="M0 0 C 18 -22 52 -26 78 0 C 52 26 18 22 0 0 Z" /><path d="M0 0 L78 0" /></g>
        <g transform="translate(106 96) rotate(-60)"><path d="M0 0 C 16 -20 46 -24 70 0 C 46 24 16 20 0 0 Z" /><path d="M0 0 L70 0" /></g>
        <g transform="translate(124 56) rotate(-30)"><path d="M0 0 C 14 -18 40 -20 60 0 C 40 20 14 18 0 0 Z" /><path d="M0 0 L60 0" /></g>
      </g>
    </svg>
  );
}
