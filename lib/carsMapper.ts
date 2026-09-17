import type { Car } from '@/lib/cars';

export function mapRowToCar(row: Record<string, any>): Car {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    variant: row.variant,
    year: row.year,
    fuel: row.fuel,
    kms: row.kms,
    price: row.price,
    image: row.image,
    // Absent until add_car_gallery_images.sql has been run; treat as empty.
    images: Array.isArray(row.images) ? row.images.filter(Boolean) : [],
    certified: row.certified || undefined,
    transmission: row.transmission,
    bodyType: row.body_type,
    owners: row.owners,
    city: row.city,
    sellerType: row.seller_type,
    regNumber: row.reg_number,
    color: row.color,
    seats: row.seats,
    engine: row.engine,
    power: row.power,
    mileage: row.mileage,
    insuranceValidTill: row.insurance_valid_till,
    features: row.features && row.features.length > 0 ? row.features : undefined,
    description: row.description || undefined,
    featured: row.featured ?? false,
    updatedAt: row.updated_at || row.created_at || undefined,
  };
}

export function mapCarToRow(car: Omit<Car, 'id'>): Record<string, any> {
  return {
    make: car.make,
    model: car.model,
    variant: car.variant,
    year: car.year,
    fuel: car.fuel,
    kms: car.kms,
    price: car.price,
    image: car.image,
    images: car.images ?? [],
    certified: car.certified ?? false,
    transmission: car.transmission,
    body_type: car.bodyType,
    owners: car.owners,
    city: car.city,
    seller_type: car.sellerType,
    reg_number: car.regNumber,
    color: car.color,
    seats: car.seats,
    engine: car.engine,
    power: car.power,
    mileage: car.mileage,
    insurance_valid_till: car.insuranceValidTill,
    features: car.features ?? [],
    description: car.description ?? null,
    featured: car.featured ?? false,
  };
}
