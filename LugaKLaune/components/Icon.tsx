import { SVGProps } from 'react';
export type IconName = 'search' | 'bag' | 'heart' | 'user' | 'arrow' | 'close' | 'menu' | 'chevron' | 'plus' | 'minus' | 'check' | 'truck' | 'return' | 'sparkle' | 'lock';
const paths: Record<IconName, React.ReactNode> = {
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
  bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2"/></>,
  heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/>,
  user: <><circle cx="12" cy="7.5" r="3.5"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/></>,
  arrow: <path d="M4 12h16M14 6l6 6-6 6"/>, close: <path d="m6 6 12 12M6 18 18 6"/>,
  menu: <path d="M3 6h18M3 12h18M3 18h18"/>, chevron: <path d="m5 9 7 7 7-7"/>,
  plus: <path d="M12 5v14M5 12h14"/>, minus: <path d="M5 12h14"/>, check: <path d="m5 12 4 4L19 6"/>,
  truck: <><path d="M2 5h12v12H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  return: <path d="M4 9h11a6 6 0 0 1 0 12h-2M8 5 4 9l4 4"/>,
  sparkle: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4M18 4h4"/>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="1"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/></>,
};
export default function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>; }
