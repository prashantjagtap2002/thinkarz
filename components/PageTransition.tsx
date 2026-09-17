'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // The enter animation lives entirely in CSS (`.page-transition`), so the
  // server-rendered HTML paints straight away instead of waiting on hydration.
  // `key` remounts the wrapper on navigation, which replays that animation.
  // Scroll position is deliberately left to Next.js: resetting it here broke
  // Back/Forward restoration and #hash anchors.
  return (
    <div className="page-transition" key={pathname}>
      {children}
    </div>
  );
}
