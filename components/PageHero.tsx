import Image from 'next/image';
import { ReactNode } from 'react';

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority className="hero-image-drift object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
      </div>
      <div className="container-page relative py-20 sm:py-28">
        <div className="max-w-2xl animate-fade-up">
          <span className="section-eyebrow rounded bg-brand-red/10 px-2 py-1">{eyebrow}</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
