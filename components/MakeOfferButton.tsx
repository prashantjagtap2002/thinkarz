'use client';

import { useState } from 'react';
import { Car } from '@/lib/cars';
import MakeOfferModal from './MakeOfferModal';

interface MakeOfferButtonProps {
  car: Car;
  className?: string;
}

export default function MakeOfferButton({ car, className = 'btn btn-outline w-full' }: MakeOfferButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={className}
      >
        Make Offer
      </button>

      {isOpen && (
        <MakeOfferModal car={car} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
