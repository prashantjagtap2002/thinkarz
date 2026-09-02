import { NextRequest, NextResponse } from 'next/server';
import {
  getAllCarsAdmin,
  insertCarAdmin,
  slugify,
  makeUniqueId,
  validateCarInput,
  sanitizeCarInput,
} from '@/lib/carsStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const cars = await getAllCarsAdmin();
  return NextResponse.json({ cars });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const errors = validateCarInput(body);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const cars = await getAllCarsAdmin();
  const base = slugify(`${body.make}-${body.model}-${body.variant}`);
  const id = makeUniqueId(base, cars.map((c) => c.id));

  const newCar = await insertCarAdmin(id, sanitizeCarInput(body));

  return NextResponse.json({ car: newCar }, { status: 201 });
}
