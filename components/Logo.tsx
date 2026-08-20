import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center">
      <Image
        src="/images/thinkarz-logo.png"
        alt="THINKARZ - Your Ultimate Car Destination"
        width={1998}
        height={666}
        priority
        className="h-12 w-auto sm:h-16"
      />
    </Link>
  );
}
