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

// Partial update, used by the inventory table's inline "Featured" toggle so a
// single flag can be flipped without resubmitting the whole vehicle.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const existing = await getCarByIdAdmin(id);
  if (!existing) {
    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  }

  const allowed: Partial<Record<'featured' | 'certified', boolean>> = {};
  if (typeof body?.featured === 'boolean') allowed.featured = body.featured;
  if (typeof body?.certified === 'boolean') allowed.certified = body.certified;

  if (Object.keys(allowed).length === 0) {
    return NextResponse.json(
      { error: 'Only "featured" and "certified" can be updated this way.' },
      { status: 400 },
    );
  }

  const { id: _id, ...rest } = existing;
  const updatedCar = await updateCarAdmin(id, { ...rest, ...allowed });
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
