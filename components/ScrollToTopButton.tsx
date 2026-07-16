'use client';

export default function ScrollToTopButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={className}
    >
      {children}
    </button>
  );
}
