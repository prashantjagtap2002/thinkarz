'use client';

import { useEffect, useState } from 'react';
import { MessageSquareMore, X } from 'lucide-react';
import OtpGatedContactForm from '@/components/forms/OtpGatedContactForm';

export default function ContactUsCta() {
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
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
          <MessageSquareMore size={28} />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">Get In Touch</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Have a question? We&apos;d love to help. Share your details and our team will reach
          out to you.
        </p>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary mt-6 w-full"
        >
          Send Us a Message
        </button>
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
