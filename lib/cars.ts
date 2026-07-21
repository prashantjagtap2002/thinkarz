export type Car = {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  fuel: string;
  kms: number;
  price: number; // in rupees
  emi: number; // per month in rupees
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
};

export const cars: Car[] = [
  {
    id: 'mg-comet-ev-exclusive-fc',
    make: 'MG',
    model: 'COMET EV',
    variant: 'EXCLUSIVE FC',
    year: 2024,
    fuel: 'EV',
    kms: 14568,
    price: 450000,
    emi: 8125,
    image:
      '/images/cars/mg-comet-ev.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH02 GE 6125',
    color: 'Candy White+Starry',
    seats: 4,
    engine: '17.3 kWh battery, Electric Motor',
    power: '41.42 bhp',
    mileage: '230 km / full charge',
    insuranceValidTill: 'Dec 2028',
  },
  {
    id: 'kia-sonet-gtx-plus',
    make: 'Kia',
    model: 'SONET',
    variant: 'G1.0T 7DCT GTX PLUS',
    year: 2024,
    fuel: 'Petrol',
    kms: 9000,
    price: 1375000,
    emi: 24665,
    image:
      '/images/cars/kia-sonet.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH05 FP 2204',
    color: 'Gravity Grey',
    seats: 5,
    engine: '998 cc, 3-cylinder Turbo Petrol',
    power: '118.36 bhp',
    mileage: '18.4 kmpl',
    insuranceValidTill: 'Dec 2028',
  },
  {
    id: 'maruti-ignis-zeta-ags',
    make: 'Maruti Suzuki',
    model: 'IGNIS',
    variant: 'ZETA AGS 1.2',
    year: 2021,
    fuel: 'Petrol',
    kms: 52280,
    price: 625000,
    emi: 11210,
    image:
      '/images/cars/maruti-ignis.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    owners: 2,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH48 CC 2956',
    color: 'Pearl Arctic White',
    seats: 5,
    engine: '1197 cc, 4-cylinder Petrol',
    power: '81.80 bhp',
    mileage: '20.89 kmpl',
    insuranceValidTill: 'Aug 2025',
  },
  {
    id: 'hyundai-venue-turbo-sxo',
    make: 'Hyundai',
    model: 'VENUE',
    variant: '1.0 TURBO DCT SX O',
    year: 2023,
    fuel: 'Petrol',
    kms: 44694,
    price: 975000,
    emi: 17070,
    image:
      '/images/cars/hyundai-venue-dct.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH48 CK 9330',
    color: 'Polar White 2',
    seats: 5,
    engine: '998 cc, 3-cylinder Turbo GDI Petrol',
    power: '118.36 bhp',
    mileage: '18.15 kmpl',
    insuranceValidTill: 'Jul 2027',
  },
  {
    id: 'tata-nexon-ev-xz-plus',
    make: 'TATA',
    model: 'NEXON EV',
    variant: 'XZ+',
    year: 2023,
    fuel: 'EV',
    kms: 20935,
    price: 1295000,
    emi: 22140,
    image:
      '/images/cars/tata-nexon-ev.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH01 EJ 1802',
    color: 'Dyngry Prewt',
    seats: 5,
    engine: '30.2 kWh battery, Electric Motor',
    power: '127.87 bhp',
    mileage: '312 km / full charge',
    insuranceValidTill: 'Jun 2027',
  },
  {
    id: 'mg-zs-astor-sharp',
    make: 'MG',
    model: 'ZS ASTOR',
    variant: 'VTI TECH CVT SHARP 1.5',
    year: 2022,
    fuel: 'Petrol',
    kms: 14136,
    price: 895000,
    emi: 15420,
    image:
      '/images/cars/mg-zs-astor.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH02 XY 7712',
    color: 'Candy White',
    seats: 5,
    engine: '1498 cc, 4-cylinder Petrol',
    power: '108.5 bhp',
    mileage: '15.20 kmpl',
    insuranceValidTill: 'Mar 2026',
  },
  {
    id: 'hyundai-venue-mt-sxo',
    make: 'Hyundai',
    model: 'VENUE',
    variant: '1.0 TURBO GDI MT SX(O)',
    year: 2019,
    fuel: 'Petrol',
    kms: 40453,
    price: 695000,
    emi: 12520,
    image:
      '/images/cars/hyundai-venue-mt.jpg',
    transmission: 'Manual',
    bodyType: 'SUV',
    owners: 2,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH04 AB 5567',
    color: 'Polar White 2',
    seats: 5,
    engine: '998 cc, 3-cylinder Turbo GDI Petrol',
    power: '118.36 bhp',
    mileage: '18.27 kmpl',
    insuranceValidTill: 'Feb 2025',
  },
  {
    id: 'mg-zs-ev-exclusive',
    make: 'MG',
    model: 'ZS EV',
    variant: 'EXCLUSIVE',
    year: 2023,
    fuel: 'EV',
    kms: 26971,
    price: 1550000,
    emi: 27930,
    image:
      '/images/cars/mg-zs-ev.jpg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH01 EJ 4461',
    color: 'Candy White',
    seats: 5,
    engine: '50.3 kWh battery, Electric Motor',
    power: '174.32 bhp',
    mileage: '419 km / full charge',
    insuranceValidTill: 'Jul 2027',
  },
  {
    id: 'kia-seltos-htx',
    make: 'Kia',
    model: 'SELTOS',
    variant: 'G1.5 IVT HTX',
    year: 2021,
    fuel: 'Petrol',
    kms: 16142,
    price: 1125000,
    emi: 20270,
    image:
      '/images/cars/kia-seltos.jpg',
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 2,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH03 CD 8834',
    color: 'Glacier White Pearl',
    seats: 5,
    engine: '1497 cc, 4-cylinder Petrol',
    power: '113.98 bhp',
    mileage: '16.5 kmpl',
    insuranceValidTill: 'Sep 2025',
  },
  {
    id: 'honda-amaze-v-cvt',
    make: 'Honda',
    model: 'AMAZE',
    variant: '1.2 V CVT',
    year: 2021,
    fuel: 'Petrol',
    kms: 7016,
    price: 745000,
    emi: 13420,
    image:
      '/images/cars/honda-amaze.jpg',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH06 EF 3321',
    color: 'Mordern Steel Metall',
    seats: 5,
    engine: '1199 cc, 4-cylinder Petrol',
    power: '89.83 bhp',
    mileage: '18.3 kmpl',
    insuranceValidTill: 'Oct 2025',
  },
];

export const bodyTypes = Array.from(new Set(cars.map((c) => c.bodyType))).sort();

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
  if (car.certified) highlights.push("Passed Thinkarz's 140-point quality inspection");
  if (car.transmission === 'Automatic')
    highlights.push('Comfortable automatic transmission, ideal for city driving');
  if (car.fuel === 'EV')
    highlights.push('Zero tailpipe emissions with low running costs');
  highlights.push('Comprehensive insurance active, all original documents available');

  return highlights.slice(0, 5);
}
