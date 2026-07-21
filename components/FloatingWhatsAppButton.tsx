'use client';

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 448"
      fill="currentColor"
      width={size}
      height={size}
    >
      <path d="M380.9 65.1C339 23.1 282.9 0 224 0 101.7 0 1.9 99.8 1.9 222.1c0 39.1 10.2 77.3 29.6 111L0 448l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 222.1-99.8 222.1-222.1-.1-59-23.2-114.6-65.1-155.9zM224 408.1h-.1c-33.1 0-65.6-8.9-93.9-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.2-28.2-98.4 0-102 83.3-185.3 185.4-185.3 49.5 0 96 19.3 131 54.2s54.2 81.5 54.2 131c0 101.9-83.3 185-185.1 185zM308.9 269.2c-4.7-2.3-27.6-13.6-31.8-15.2s-7.4-2.3-10.5 2.3c-3.1 4.7-12.1 15.2-14.8 18.4-2.7 3.1-5.5 3.5-10.1 1.2s-19.8-7.3-37.7-23.3c-14-12.4-23.4-27.8-26.1-32.5s-.3-7.3 2.1-9.6c2.1-2.1 4.7-5.5 7-8.2 2.3-2.7 3.1-4.7 4.7-7.8s.8-5.8-.4-8.2c-1.2-2.3-10.5-25.3-14.4-34.6-3.8-9.1-7.6-7.9-10.5-8-2.7-.2-5.8-.2-8.9-.2-3.1 0-8.2 1.2-12.4 5.8-4.3 4.7-16.3 16-16.3 38.9s16.7 45.1 19.1 48.2c2.3 3.1 33 50.4 79.9 70.7 11.2 4.8 19.9 7.7 26.7 9.9 11.2 3.6 21.4 3.1 29.5 1.9 9-1.4 27.6-11.3 31.5-22.2s3.9-20.3 2.7-22.2c-1.1-2-4.4-3.1-9.1-5.5z" />
    </svg>
  );
}

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={`https://wa.me/919892929363?text=${encodeURIComponent('Hello.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
