'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useUtmParams } from '@/hooks/useUtmParams';
import { submitToGoogleSheets } from '@/lib/googleSheets';

export default function NewsletterSignup() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const utm = useUtmParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    submitToGoogleSheets({
      form_type: 'Newsletter Signup',
      email,
      ...utm,
    });

    setSubscribed(true);
    setEmail('');
  }

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2.5 text-xs font-semibold text-white">
        <CheckCircle2 size={16} className="shrink-0 text-green-400" />
        You&apos;re subscribed! Watch your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="mb-3 w-full rounded-md border border-slate-600 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-brand-red focus:outline-none"
      />
      <button type="submit" className="btn btn-primary w-full">
        Subscribe
      </button>
    </form>
  );
}
