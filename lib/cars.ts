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
  },
  {
    id: 'kia-sonet-gtx-plus',
    make: 'KIA',
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
  },
  {
    id: 'honda-amaze-v-cvt',
    make: 'HONDA',
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
  },
];

export function formatPrice(price: number) {
  const lakh = price / 100000;
  return `Rs. ${lakh.toFixed(2)} Lakh`;
}

export function formatKms(kms: number) {
  return `${kms.toLocaleString('en-IN')} km`;
}
