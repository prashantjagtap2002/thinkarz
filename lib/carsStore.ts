import type { Car } from '@/lib/cars';
import { createAdminClient } from '@/lib/supabaseAdmin';
import { mapRowToCar, mapCarToRow } from '@/lib/carsMapper';

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
  const { data, error } = await supabase
    .from('cars')
    .insert({ id, ...mapCarToRow(car) })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return mapRowToCar(data);
}

export async function updateCarAdmin(id: string, car: Omit<Car, 'id'>): Promise<Car> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('cars')
    .update(mapCarToRow(car))
    .eq('id', id)
    .select('*')
    .single();
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
  };
}
