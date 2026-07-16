import type { ReactElement, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size?: number): SVGProps<SVGSVGElement> => ({
  width: size ?? 16,
  height: size ?? 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

/**
 * Hatchback — short nose, tall steep tailgate, two-box side profile.
 */
function HatchbackIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M3 15.6 4.2 13.8 7.6 12.9 9.4 10.3H14.8l.7 2.6 1.4.9.6 1.8" />
      <path d="M2.8 15.6H17.4" />
      <circle cx="6.2" cy="17" r="1.7" />
      <circle cx="14.2" cy="17" r="1.7" />
    </svg>
  );
}

/**
 * Sedan — long, low, three-box profile with a trunk.
 */
function SedanIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M2.6 15.6 4 13.5 7.6 13l2-2.5h6L17.6 13 20 13.3l1 2.3" />
      <path d="M2.4 15.6h18.8" />
      <path d="M9.2 12.4 9.9 11h4.2l.5 1.4" />
      <circle cx="6.4" cy="17" r="1.7" />
      <circle cx="16.6" cy="17" r="1.7" />
    </svg>
  );
}

/**
 * SUV — tall, boxy greenhouse, long flat roof, higher stance.
 */
function SuvIcon({ size, ...props }: IconProps) {
  return (
    <svg {...base(size)} {...props}>
      <path d="M2.6 15.6 3.1 12.8 5.6 12.2 7.4 9.8 8.9 9.3H16l1.8.7 1.8 2.2 2.2.6.4 2.8" />
      <path d="M2.4 15.6h19.8" />
      <path d="M8.4 12 9.4 10.6h6L16.4 12" />
      <circle cx="6.2" cy="17" r="1.8" />
      <circle cx="16.2" cy="17" r="1.8" />
    </svg>
  );
}

const registry: Record<string, (props: IconProps) => ReactElement> = {
  Hatchback: HatchbackIcon,
  Sedan: SedanIcon,
  SUV: SuvIcon,
};

/**
 * Renders a car silhouette that visually matches the body type label.
 * Falls back to the Sedan outline for any unrecognised value.
 */
export default function BodyTypeIcon({ bodyType, ...props }: IconProps & { bodyType: string }) {
  const Icon = registry[bodyType] ?? SedanIcon;
  return <Icon {...props} />;
}

export { HatchbackIcon, SedanIcon, SuvIcon };
