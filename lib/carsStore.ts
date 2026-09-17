import type { Car } from '@/lib/cars';
import { validatePrice } from '@/lib/cars';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { mapRowToCar, mapCarToRow } from '@/lib/carsMapper';

/**
 * True when Supabase rejected a write because a column is not in its schema
 * cache — i.e. supabase/add_car_gallery_images.sql has not been run yet.
 * Lets a deploy that lands ahead of the migration keep saving cars instead of
 * failing outright; the gallery simply stays empty until the SQL is applied.
 */
function isUnknownColumnError(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  const message = error.message ?? '';
  return error.code === 'PGRST204' || /column .* does not exist|schema cache/i.test(message);
}

function withoutGalleryImages(row: Record<string, unknown>) {
  const { images, ...rest } = row;
  return rest;
}

export async function getAllCarsAdmin(): Promise<Car[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRowToCar);
}

export async function getCarByIdAdmin(id: string): Promise<Car | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('cars').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapRowToCar(data) : null;
}

export async function insertCarAdmin(id: string, car: Omit<Car, 'id'>): Promise<Car> {
  const supabase = createAdminClient();
  const row = { id, ...mapCarToRow(car) };

  const { data, error } = await supabase.from('cars').insert(row).select('*').single();

  if (error && isUnknownColumnError(error)) {
    console.warn('[insertCarAdmin] gallery column missing; run add_car_gallery_images.sql');
    const retry = await supabase.from('cars').insert(withoutGalleryImages(row)).select('*').single();
    if (retry.error) throw new Error(retry.error.message);
    return mapRowToCar(retry.data);
  }

  if (error) throw new Error(error.message);
  return mapRowToCar(data);
}

export async function updateCarAdmin(id: string, car: Omit<Car, 'id'>): Promise<Car> {
  const supabase = createAdminClient();
  const row = mapCarToRow(car);

  const { data, error } = await supabase.from('cars').update(row).eq('id', id).select('*').single();

  if (error && isUnknownColumnError(error)) {
    console.warn('[updateCarAdmin] gallery column missing; run add_car_gallery_images.sql');
    const retry = await supabase
      .from('cars')
      .update(withoutGalleryImages(row))
      .eq('id', id)
      .select('*')
      .single();
    if (retry.error) throw new Error(retry.error.message);
    return mapRowToCar(retry.data);
  }

  if (error) throw new Error(error.message);
  return mapRowToCar(data);
}

export async function deleteCarAdmin(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('cars').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function makeUniqueId(base: string, existingIds: string[]): string {
  let id = base || 'car';
  let suffix = 2;
  while (existingIds.includes(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

const REQUIRED_STRING_FIELDS: (keyof Car)[] = [
  'make',
  'model',
  'variant',
  'fuel',
  'image',
  'bodyType',
  'city',
  'sellerType',
  'regNumber',
  'color',
  'engine',
  'power',
  'mileage',
  'insuranceValidTill',
];

const REQUIRED_NUMBER_FIELDS: (keyof Car)[] = ['year', 'kms', 'price', 'owners', 'seats'];

export function validateCarInput(input: Record<string, unknown>): string[] {
  const errors: string[] = [];

  for (const field of REQUIRED_STRING_FIELDS) {
    const value = input[field];
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`"${field}" is required.`);
    }
  }

  for (const field of REQUIRED_NUMBER_FIELDS) {
    const value = input[field];
    if (typeof value !== 'number' || Number.isNaN(value)) {
      errors.push(`"${field}" must be a number.`);
    }
  }

  if (input.transmission !== 'Manual' && input.transmission !== 'Automatic') {
    errors.push('"transmission" must be "Manual" or "Automatic".');
  }

  if (input.features !== undefined && !Array.isArray(input.features)) {
    errors.push('"features" must be a list.');
  }

  // Indian-market price sanity check (mirrors the client-side guard in CarForm).
  if (typeof input.price === 'number' && !Number.isNaN(input.price)) {
    const priceError = validatePrice(input.price);
    if (priceError) errors.push(priceError);
  }

  if (typeof input.year === 'number' && !Number.isNaN(input.year)) {
    const maxYear = new Date().getFullYear() + 1;
    if (input.year < 1980 || input.year > maxYear) {
      errors.push(`"year" must be between 1980 and ${maxYear}.`);
    }
  }

  if (typeof input.kms === 'number' && !Number.isNaN(input.kms)) {
    if (input.kms < 0 || input.kms > 1000000) {
      errors.push('"kms" must be between 0 and 10,00,000.');
    }
  }

  return errors;
}

export function sanitizeCarInput(input: Record<string, unknown>): Omit<Car, 'id'> {
  return {
    make: String(input.make).trim(),
    model: String(input.model).trim(),
    variant: String(input.variant).trim(),
    year: Number(input.year),
    fuel: String(input.fuel).trim(),
    kms: Number(input.kms),
    price: Number(input.price),
    image: String(input.image).trim(),
    certified: Boolean(input.certified) || undefined,
    transmission: input.transmission as Car['transmission'],
    bodyType: String(input.bodyType).trim(),
    owners: Number(input.owners),
    city: String(input.city).trim(),
    sellerType: String(input.sellerType).trim(),
    regNumber: String(input.regNumber).trim(),
    color: String(input.color).trim(),
    seats: Number(input.seats),
    engine: String(input.engine).trim(),
    power: String(input.power).trim(),
    mileage: String(input.mileage).trim(),
    insuranceValidTill: String(input.insuranceValidTill).trim(),
    features: Array.isArray(input.features)
      ? input.features.map((f) => String(f).trim()).filter(Boolean)
      : undefined,
    description: typeof input.description === 'string' ? input.description.trim() : undefined,
    featured: Boolean(input.featured),
  };
}
