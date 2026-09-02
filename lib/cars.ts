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

export function formatPrice(price: number) {
  const lakh = price / 100000;
  return `Rs. ${lakh.toFixed(2)} Lakh`;
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
