import { NextRequest, NextResponse } from 'next/server';
import {
  getCarByIdAdmin,
  updateCarAdmin,
  deleteCarAdmin,
  validateCarInput,
  sanitizeCarInput,
} from '@/lib/carsStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarByIdAdmin(id);
  if (!car) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }
  return NextResponse.json({ car });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const errors = validateCarInput(body);
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const existing = await getCarByIdAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  const updatedCar = await updateCarAdmin(id, sanitizeCarInput(body));
  return NextResponse.json({ car: updatedCar });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const existing = await getCarByIdAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  await deleteCarAdmin(id);
  return NextResponse.json({ ok: true });
}
