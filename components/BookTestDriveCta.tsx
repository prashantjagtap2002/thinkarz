'use client';

import { useEffect, useState } from 'react';
import { CalendarHeart, X } from 'lucide-react';
import OtpGatedContactForm from '@/components/forms/OtpGatedContactForm';

export default function BookTestDriveCta() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="flex items-center justify-center lg:justify-end">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
            <CalendarHeart size={28} />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">Ready to Experience It?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Schedule a test drive and our team will get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary mt-6 w-full"
          >
            Book Your Slot
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-md animate-fade-up">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            <div className="max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl">
              <OtpGatedContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
