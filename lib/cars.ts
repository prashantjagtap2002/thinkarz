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
  features?: string[];
  description?: string;
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
    description: 'This immaculate 2024 MG Comet EV Exclusive FC is the ultimate smart city mobility solution. Driven just 14,568 km by a single careful owner in Mumbai, it offers zero tailpipe emissions, effortless maneuverability in tight traffic, and a futuristic tech-first cabin. With its dual 10.25-inch floating displays and smart keyless entry, it delivers a premium, silent, and highly economical driving experience.',
    features: [
      'Dual 10.25-inch Floating HD Screens',
      'Wireless Android Auto & Apple CarPlay',
      'Smart Start System & Keyless Entry',
      'Reverse Parking Camera with Guidelines',
      'LED Headlamps & Illuminated MG Logo Taillamps',
      'Electric Parking Brake with Auto Hold',
      'Dual Front Airbags & ABS with EBD',
      'Voice Commands for Car Functions'
    ],
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
    description: 'Experience thrilling dynamic performance with this 2024 Kia Sonet G1.0T 7DCT GTX Plus. Powered by a punchy 1.0L Turbo petrol engine mated to a lightning-fast 7-speed dual-clutch automatic transmission, this single-owner SUV has only clocked 9,000 km. It comes loaded with top-of-the-line features including an electric sunroof, Bose 7-speaker premium sound system, ventilated front seats, and comprehensive safety assistance.',
    features: [
      'Electric Sunroof with Anti-Pinch',
      'Bose 7-Speaker Premium Audio System',
      'Ventilated Driver & Passenger Front Seats',
      '10.25-inch HD Touchscreen Navigation',
      '360-Degree Surround View Camera',
      'Wireless Smartphone Charger & Air Purifier',
      '6 Airbags & Electronic Stability Control (ESC)',
      'Front & Rear Parking Sensors'
    ],
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
    description: "A compact yet spacious Urban SUV, this 2021 Maruti Suzuki Ignis Zeta AGS combines Maruti's legendary 1.2L VVT engine with the convenience of Auto Gear Shift (AGS). Finished in Pearl Arctic White and driven 52,280 km, it has been rigorously inspected and maintained in excellent mechanical condition. Ideal for daily commuting with a stellar fuel efficiency of nearly 21 kmpl and high ground clearance.",
    features: [
      'SmartPlay Studio Touchscreen Infotainment',
      'Apple CarPlay & Android Auto Compatibility',
      'Push Button Start / Stop with Smart Key',
      'Alloy Wheels with Sporty Wheel Arch Cladding',
      'Steering Mounted Audio & Calling Controls',
      'Reverse Parking Sensors with Display',
      'Dual Front Airbags & ABS with EBD',
      'Front & Rear Fog Lamps with Chrome Accents'
    ],
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
    description: "This 2023 Hyundai Venue 1.0 Turbo DCT SX(O) represents the pinnacle of compact SUV luxury and dynamics. Equipped with the turbocharged GDI petrol engine and smooth 7-speed DCT automatic gearbox, it offers effortless power delivery. Having covered 44,694 km with a single owner, it features Hyundai's Bluelink connected car technology, an electric sunroof, and premium two-tone interiors.",
    features: [
      'Voice-Enabled Smart Electric Sunroof',
      '8-inch HD Touchscreen with Bluelink Connect',
      'Wireless Phone Charger & Fast Type-C Ports',
      'Air Purifier with AQI Display',
      'Paddle Shifters for Engaging Driving',
      'Automatic Climate Control with Digital Display',
      '6 Airbags, ESC & Vehicle Stability Management',
      'Projector Headlamps with Cornering Lamps'
    ],
  },
  {
    id: 'tata-nexon-ev-xz-plus',
    make: 'Tata',
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
    color: 'Daytona Grey',
    seats: 5,
    engine: '30.2 kWh battery, Electric Motor',
    power: '127.87 bhp',
    mileage: '312 km / full charge',
    insuranceValidTill: 'Jun 2027',
    description: "Step into the future of electric driving with India's best-selling EV, the 2023 Tata Nexon EV XZ+. Featuring a 30.2 kWh high-energy density battery pack and a 129 BHP electric motor, this SUV delivers instantaneous torque and an official range of up to 312 km per charge. With just 20,935 km on the odometer and single ownership, it boasts 5-star GNCAP structural safety, fast charging support, and a whisper-quiet cabin.",
    features: [
      'Electric Sunroof with Tilt Function',
      '7-inch Harman Touchscreen Infotainment',
      '8-Speaker Premium Sound System by Harman',
      'Regenerative Braking Multi-Mode Selection',
      'Automatic Climate Control with Rear AC Vents',
      'Connected Car App (ZConnect) Support',
      'Dual Airbags & IP67 Dust/Water Resistant Battery',
      'Projector Headlamps with Signature LED DRLs'
    ],
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
    description: 'The 2022 MG ZS Astor VTI-TECH CVT Sharp is an AI-inside midsize SUV that brings European styling and segment-first luxury to your driveway. Powered by a refined 1.5L petrol engine paired with an 8-speed CVT automatic, this vehicle has only driven 14,136 km. Highlights include a panoramic sunroof, a personal AI assistant dashboard robot, leatherette upholstery, and comprehensive ADAS safety assistance.',
    features: [
      'Dual-Pane Panoramic Skyroof',
      'Personal AI Assistant Dashboard Robot',
      '10.1-inch Floating HD Touchscreen System',
      '6-Way Power Adjustable Driver Seat',
      'Electronic Parking Brake with Auto Hold',
      '360-Degree Around View Monitor',
      'Autonomous Emergency Braking & Blind Spot Detection',
      'Heated Exterior Rear View Mirrors'
    ],
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
    description: 'For drivers who love complete control, this 2019 Hyundai Venue 1.0 Turbo GDI MT SX(O) pairs a spirited 118 BHP turbocharged engine with a slick 6-speed manual gearbox. Maintained in pristine condition over 40,453 km, this top-end SX(O) trim leaves nothing to be desired, offering an electric sunroof, diamond-cut alloy wheels, wireless charging, and comprehensive safety features.',
    features: [
      'Electric Sunroof',
      '8-inch Touchscreen Infotainment System',
      'Wireless Smartphone Charging Pad',
      'Cruise Control & Steering Mounted Controls',
      'Automatic Climate Control with Eco Mode',
      '16-inch Diamond-Cut Alloy Wheels',
      '6 Airbags & Electronic Stability Control',
      'Rear View Camera with Dynamic Guidelines'
    ],
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
    description: 'Command the road with zero emissions in this flagship 2023 MG ZS EV Exclusive. Housing a massive 50.3 kWh battery pack that delivers up to 419 km of certified range on a full charge, this premium electric SUV produces a robust 174 BHP. Driven just 26,971 km by its first owner, it features an expansive panoramic sunroof, 360-degree cameras, PM 2.5 air purifier, and luxurious leather seats.',
    features: [
      'Dual-Pane Panoramic Sunroof',
      '10.1-inch HD Touchscreen with i-SMART EV Connect',
      '7-inch Fully Digital Instrument Cluster',
      '360-Degree High-Definition Surround Camera',
      '6-Way Power Adjustable Driver Seat',
      'PM 2.5 Filter & Cabin Air Purifier',
      '6 Airbags, Hill Descent Control & ESP',
      'Kinetic Energy Recovery System (KERS 3 Modes)'
    ],
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
    description: "The 2021 Kia Seltos G1.5 IVT HTX is the benchmark for midsize SUV refinement and style. Featuring a smooth 1.5L Smartstream petrol engine paired with Kia's Intelligent Continuously Variable Transmission (IVT), it ensures a stress-free drive in city traffic and on highways alike. With only 16,142 km driven, it showcases Kia's signature Tiger Nose grille, crown jewel LED headlamps, and ambient mood lighting.",
    features: [
      'Crown Jewel LED Headlamps with Heartbeat DRLs',
      '10.25-inch HD Touchscreen Navigation System',
      'Smart Key with Remote Engine Start',
      'Ambient Mood Lighting with Sound Sync',
      'Air Purifier with Virus & Bacteria Protection',
      'Automatic Climate Control with Rear Vents',
      'R17 Hyper Metallic Alloy Wheels',
      'Tire Pressure Monitoring System (TPMS)'
    ],
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
    color: 'Modern Steel Metallic',
    seats: 5,
    engine: '1199 cc, 4-cylinder Petrol',
    power: '89.83 bhp',
    mileage: '18.3 kmpl',
    insuranceValidTill: 'Oct 2025',
    description: 'Renowned for bulletproof Japanese reliability and unmatched cabin space, this 2021 Honda Amaze 1.2 V CVT is an exceptional premium compact sedan. Its 1.2L i-VTEC engine paired with a seamless 7-step CVT automatic transmission delivers buttery smooth acceleration and excellent fuel economy of 18.3 kmpl. Having covered a mere 7,016 km, this vehicle is practically brand new inside and out.',
    features: [
      '7-inch DIGIPAD 2 Touchscreen Infotainment',
      'Apple CarPlay, Android Auto & Weblink',
      'Paddle Shifters for 7-Speed Virtual Gears',
      'Push Button Engine Start/Stop with Smart Entry',
      'Automatic Climate Control System',
      'LED Fog Lamps & Signature Rear LED Combination Lamps',
      'Dual Front Airbags & ISOFIX Child Seat Mounts',
      'Rear Parking Camera with Guidelines'
    ],
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
  if (car.certified) highlights.push("Passed THINKARZ's 140-point quality inspection");
  if (car.transmission === 'Automatic')
    highlights.push('Comfortable automatic transmission, ideal for city driving');
  if (car.fuel === 'EV')
    highlights.push('Zero tailpipe emissions with low running costs');
  highlights.push('Comprehensive insurance active, all original documents available');

  return highlights.slice(0, 5);
}
