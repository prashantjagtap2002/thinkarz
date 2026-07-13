'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    const frame = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className={`page-transition${isReady ? ' is-ready' : ''}`} key={pathname}>
      {children}
    </div>
  );
}
