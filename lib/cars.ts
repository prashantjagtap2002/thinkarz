export type Car = {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  fuel: string;
  kms: number;
  price: number; // in rupees
  image: string;
  certified?: boolean;
  transmission: 'Manual' | 'Automatic';
  bodyType: string;
  owners: number;
  city: string;
  sellerType: string;
  regNumber: string;
  color: string;
  seats: number;
  engine: string;
  power: string;
  mileage: string;
  insuranceValidTill: string;
  features?: string[];
  description?: string;
  featured?: boolean;
  /** ISO timestamp from Supabase; used for sitemap lastModified. */
  updatedAt?: string;
};

export function getBodyTypes(cars: Car[]) {
  return Array.from(new Set(cars.map((c) => c.bodyType))).sort();
}

export const budgetOptions = [
  { label: 'Under 5 Lakh', max: 500000 },
  { label: '5 - 10 Lakh', min: 500000, max: 1000000 },
  { label: '10 - 15 Lakh', min: 1000000, max: 1500000 },
  { label: '15 Lakh+', min: 1500000 },
] as const;

export const ageOptions = ['Under 1 Year', '1 - 3 Years', '3 - 5 Years', '5+ Years'] as const;

export function matchesBudgetLabel(car: Car, label: string) {
  const option = budgetOptions.find((item) => item.label === label);
  if (!option) return true;

  const aboveMin = !('min' in option) || car.price >= option.min;
  const belowMax = !('max' in option) || car.price <= option.max;
  return aboveMin && belowMax;
}

export function getCarAge(car: Car, referenceYear = new Date().getFullYear()) {
  return Math.max(0, referenceYear - car.year);
}

export function matchesAgeLabel(car: Car, label: string, referenceYear = new Date().getFullYear()) {
  const age = getCarAge(car, referenceYear);

  if (label === 'Under 1 Year') return age < 1;
  if (label === '1 - 3 Years') return age >= 1 && age <= 3;
  if (label === '3 - 5 Years') return age > 3 && age <= 5;
  if (label === '5+ Years') return age > 5;
  return true;
}

export const kmOptions = ['Under 20,000 km', '20,000 - 50,000 km', '50,000+ km'] as const;

export function matchesKmLabel(car: Car, label: string) {
  if (label === 'Under 20,000 km') return car.kms < 20000;
  if (label === '20,000 - 50,000 km') return car.kms >= 20000 && car.kms <= 50000;
  if (label === '50,000+ km') return car.kms > 50000;
  return true;
}

// Indian numbering system: 1 Lakh = 1,00,000 and 1 Crore = 1,00,00,000.
export const LAKH = 100000;
export const CRORE = 10000000;

// Guard rails for admin-entered prices, in rupees.
export const MIN_CAR_PRICE = 10000; // Rs. 10,000
export const MAX_CAR_PRICE = 1000000000; // Rs. 100 Crore

export function formatPrice(price: number) {
  if (!Number.isFinite(price) || price <= 0) return 'Rs. 0';

  // The `>= 100` check catches values like 99,99,999 that would otherwise
  // round to a nonsensical "100.00 Lakh" instead of "1.00 Crore".
  if (price >= CRORE || Number((price / LAKH).toFixed(2)) >= 100) {
    return `Rs. ${(price / CRORE).toFixed(2)} Crore`;
  }
  if (price >= LAKH) {
    return `Rs. ${(price / LAKH).toFixed(2)} Lakh`;
  }
  return `Rs. ${Math.round(price).toLocaleString('en-IN')}`;
}

// Full rupee value with Indian digit grouping, e.g. 1,50,00,000.
export function formatPriceExact(price: number) {
  if (!Number.isFinite(price)) return 'Rs. 0';
  return `Rs. ${Math.round(price).toLocaleString('en-IN')}`;
}

// Shared by the admin form and the API so both reject the same values.
export function validatePrice(price: number): string | null {
  if (!Number.isFinite(price) || Number.isNaN(price)) return 'Price must be a valid number.';
  if (!Number.isInteger(price)) return 'Price must be a whole rupee amount (no paise).';
  if (price < MIN_CAR_PRICE) {
    return `Price must be at least ${formatPriceExact(MIN_CAR_PRICE)}.`;
  }
  if (price > MAX_CAR_PRICE) {
    return `Price cannot exceed ${formatPrice(MAX_CAR_PRICE)}.`;
  }
  return null;
}

export function formatKms(kms: number) {
  return `${kms.toLocaleString('en-IN')} km`;
}

export function getHighlights(car: Car): string[] {
  const highlights: string[] = [];

  if (car.owners === 1) highlights.push('Single owner vehicle with complete service history');
  if (car.kms < 20000) highlights.push(`Low odometer reading of just ${formatKms(car.kms)}`);
  if (car.certified) highlights.push("Passed THINKARZ's 140-point quality inspection");
  if (car.transmission === 'Automatic')
    highlights.push('Comfortable automatic transmission, ideal for city driving');
  if (car.fuel === 'EV')
    highlights.push('Zero tailpipe emissions with low running costs');
  highlights.push('Comprehensive insurance active, all original documents available');

  return highlights.slice(0, 5);
}
