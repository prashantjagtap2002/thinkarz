'use client';

import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
};

// useLayoutEffect warns when it is imported into a server render; it never runs
// there, so fall back to useEffect on the server and use the real thing in the
// browser, where running before paint is the whole point.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Reveal({
  children,
  className = '',
  delay = 0,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Starts visible, so the server HTML is readable with no JS and there is no
  // blank page while the bundle loads. The hidden state is applied in the
  // browser before paint, and only to elements that are still below the fold.
  const [isHidden, setIsHidden] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    // Anything on screen at first paint stays on screen — hiding it now would
    // be a visible flicker, and it is the content that matters most for LCP.
    if (alreadyInView) return;

    setIsHidden(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHidden(false);
          observer.unobserve(entry.target);
        }
      },
      // threshold 0 (rather than a fraction) so blocks taller than the viewport
      // can never get stuck hidden.
      { rootMargin: '0px 0px -48px 0px', threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-motion${isHidden ? ' is-hidden' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
