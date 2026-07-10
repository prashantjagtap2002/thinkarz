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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-5.59.55-PM-1024x768.jpeg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH02 GE 6125',
    color: 'Candy White',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.00.30-PM-1024x768.jpeg',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.01.51-PM-1024x768.jpeg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'Hatchback',
    owners: 2,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH48 CC 2956',
    color: 'Pearl White',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.02.15-PM-1024x768.jpeg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH48 CK 9330',
    color: 'Titan Grey',
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
    fuel: 'Electric',
    kms: 20935,
    price: 1295000,
    emi: 22140,
    image:
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.04.01-PM-1-768x1024.jpeg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH01 EJ 1802',
    color: 'Daytona Grey',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.10.41-PM-768x1024.jpeg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH02 XY 7712',
    color: 'Glaze Red',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.12.05-PM-1024x768.jpeg',
    transmission: 'Manual',
    bodyType: 'SUV',
    owners: 2,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH04 AB 5567',
    color: 'Fiery Red',
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
    fuel: 'Electric',
    kms: 26971,
    price: 1550000,
    emi: 27930,
    image:
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.13.41-PM-1024x768.jpeg',
    certified: true,
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH01 EJ 4461',
    color: 'Pearl White',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.15.28-PM-1024x768.jpeg',
    transmission: 'Automatic',
    bodyType: 'SUV',
    owners: 2,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH03 CD 8834',
    color: 'Gravity Grey',
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
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.16.42-PM-1024x768.jpeg',
    transmission: 'Automatic',
    bodyType: 'Sedan',
    owners: 1,
    city: 'Mumbai',
    sellerType: 'Dealer',
    regNumber: 'MH06 EF 3321',
    color: 'Modern Steel Silver',
    seats: 5,
    engine: '1199 cc, 4-cylinder Petrol',
    power: '89.83 bhp',
    mileage: '18.3 kmpl',
    insuranceValidTill: 'Oct 2025',
  },
];

export const bodyTypes = Array.from(new Set(cars.map((c) => c.bodyType))).sort();

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
  if (car.certified) highlights.push("Passed ThinkArz's 140-point quality inspection");
  if (car.transmission === 'Automatic')
    highlights.push('Comfortable automatic transmission, ideal for city driving');
  if (car.fuel === 'EV' || car.fuel === 'Electric')
    highlights.push('Zero tailpipe emissions with low running costs');
  highlights.push('Comprehensive insurance active, all original documents available');

  return highlights.slice(0, 5);
}
