import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/thinkarz-logo.png"
        alt="THINKARZ - Your Ultimate Car Destination"
        width={768}
        height={256}
        priority
        // Rendered at 144px wide on phones and 192px on larger screens. Without
        // `sizes`, next/image falls back to the declared width and ships a
        // ~1920px srcset for a header logo.
        sizes="(min-width: 640px) 192px, 144px"
        className="h-12 w-auto sm:h-16"
      />
    </Link>
  );
}
