'use client';

import { useEffect } from 'react';

// Module-level so nested locks compose: an OTP popup opened on top of a drawer
// must not release the page when only one of them closes.
let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

/**
 * Freezes background scrolling while `locked` is true.
 *
 * Also compensates for the scrollbar width, otherwise hiding the scrollbar on a
 * laptop shifts the entire page sideways the moment a modal opens.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const body = document.body;

    if (lockCount === 0) {
      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      body.style.overflow = 'hidden';
    }

    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [locked]);
}

export default useBodyScrollLock;
