'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Car } from '@/lib/cars';

type FormState = {
  make: string;
  model: string;
  variant: string;
  year: string;
  fuel: string;
  kms: string;
  price: string;
  image: string;
  certified: boolean;
  transmission: Car['transmission'];
  bodyType: string;
  owners: string;
  city: string;
  sellerType: string;
  regNumber: string;
  color: string;
  seats: string;
  engine: string;
  power: string;
  mileage: string;
  insuranceValidTill: string;
  features: string;
  description: string;
};

function carToFormState(car?: Car): FormState {
  return {
    make: car?.make ?? '',
    model: car?.model ?? '',
    variant: car?.variant ?? '',
    year: car ? String(car.year) : String(new Date().getFullYear()),
    fuel: car?.fuel ?? 'Petrol',
    kms: car ? String(car.kms) : '',
    price: car ? String(car.price) : '',
    image: car?.image ?? '',
    certified: car?.certified ?? false,
    transmission: car?.transmission ?? 'Manual',
    bodyType: car?.bodyType ?? '',
    owners: car ? String(car.owners) : '1',
    city: car?.city ?? 'Mumbai',
    sellerType: car?.sellerType ?? 'Dealer',
    regNumber: car?.regNumber ?? '',
    color: car?.color ?? '',
    seats: car ? String(car.seats) : '5',
    engine: car?.engine ?? '',
    power: car?.power ?? '',
    mileage: car?.mileage ?? '',
    insuranceValidTill: car?.insuranceValidTill ?? '',
    features: car?.features?.join('\n') ?? '',
    description: car?.description ?? '',
  };
}

function formStateToPayload(form: FormState) {
  return {
    make: form.make,
    model: form.model,
    variant: form.variant,
    year: Number(form.year),
    fuel: form.fuel,
    kms: Number(form.kms),
    price: Number(form.price),
    image: form.image,
    certified: form.certified,
    transmission: form.transmission,
    bodyType: form.bodyType,
    owners: Number(form.owners),
    city: form.city,
    sellerType: form.sellerType,
    regNumber: form.regNumber,
    color: form.color,
    seats: Number(form.seats),
    engine: form.engine,
    power: form.power,
    mileage: form.mileage,
    insuranceValidTill: form.insuranceValidTill,
    features: form.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean),
    description: form.description,
  };
}

export default function CarForm({ car }: { car?: Car }) {
  const router = useRouter();
  const isEdit = Boolean(car);
  const [form, setForm] = useState<FormState>(carToFormState(car));
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(file: File) {
    setIsUploading(true);
    setErrors([]);
    const body = new FormData();
    body.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body });
    const data = await res.json();
    setIsUploading(false);

    if (!res.ok) {
      setErrors([data.error || 'Upload failed']);
      return;
    }
    set('image', data.path);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors([]);
    setIsSaving(true);

    const url = isEdit ? `/api/admin/cars/${car!.id}` : '/api/admin/cars';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formStateToPayload(form)),
    });
    const data = await res.json();
    setIsSaving(false);

    if (!res.ok) {
      setErrors(data.errors || [data.error || 'Something went wrong']);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {errors.length > 0 && (
        <ul className="rounded-lg border border-brand-red/30 bg-brand-red/5 p-4 text-sm text-brand-red">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-bold uppercase text-slate-900">Basics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Make">
            <input className="field-input" value={form.make} onChange={(e) => set('make', e.target.value)} required />
          </Field>
          <Field label="Model">
            <input className="field-input" value={form.model} onChange={(e) => set('model', e.target.value)} required />
          </Field>
          <Field label="Variant">
            <input className="field-input" value={form.variant} onChange={(e) => set('variant', e.target.value)} required />
          </Field>
          <Field label="Year">
            <input
              type="number"
              className="field-input"
              value={form.year}
              onChange={(e) => set('year', e.target.value)}
              required
            />
          </Field>
          <Field label="Body Type">
            <input
              className="field-input"
              value={form.bodyType}
              onChange={(e) => set('bodyType', e.target.value)}
              placeholder="SUV, Sedan, Hatchback…"
              required
            />
          </Field>
          <Field label="Color">
            <input className="field-input" value={form.color} onChange={(e) => set('color', e.target.value)} required />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-bold uppercase text-slate-900">Pricing & Condition</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Price (Rs.)">
            <input
              type="number"
              className="field-input"
              value={form.price}
              onChange={(e) => set('price', e.target.value)}
              required
            />
          </Field>
          <Field label="KM Driven">
            <input
              type="number"
              className="field-input"
              value={form.kms}
              onChange={(e) => set('kms', e.target.value)}
              required
            />
          </Field>
          <Field label="Owners">
            <input
              type="number"
              className="field-input"
              value={form.owners}
              onChange={(e) => set('owners', e.target.value)}
              required
            />
          </Field>
          <Field label="Fuel">
            <select className="field-input" value={form.fuel} onChange={(e) => set('fuel', e.target.value)}>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>EV</option>
              <option>CNG</option>
              <option>Hybrid</option>
            </select>
          </Field>
          <Field label="Transmission">
            <select
              className="field-input"
              value={form.transmission}
              onChange={(e) => set('transmission', e.target.value as Car['transmission'])}
            >
              <option>Manual</option>
              <option>Automatic</option>
            </select>
          </Field>
          <Field label="Seats">
            <input
              type="number"
              className="field-input"
              value={form.seats}
              onChange={(e) => set('seats', e.target.value)}
              required
            />
          </Field>
          <Field label="City">
            <input className="field-input" value={form.city} onChange={(e) => set('city', e.target.value)} required />
          </Field>
          <Field label="Seller Type">
            <input
              className="field-input"
              value={form.sellerType}
              onChange={(e) => set('sellerType', e.target.value)}
              required
            />
          </Field>
          <Field label="Registration Number">
            <input
              className="field-input"
              value={form.regNumber}
              onChange={(e) => set('regNumber', e.target.value)}
              required
            />
          </Field>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={form.certified}
            onChange={(e) => set('certified', e.target.checked)}
            className="h-4 w-4"
          />
          Certified (140-point inspection passed)
        </label>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-bold uppercase text-slate-900">Engine & Performance</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Engine">
            <input className="field-input" value={form.engine} onChange={(e) => set('engine', e.target.value)} required />
          </Field>
          <Field label="Power">
            <input className="field-input" value={form.power} onChange={(e) => set('power', e.target.value)} required />
          </Field>
          <Field label="Mileage">
            <input
              className="field-input"
              value={form.mileage}
              onChange={(e) => set('mileage', e.target.value)}
              required
            />
          </Field>
          <Field label="Insurance Valid Till">
            <input
              className="field-input"
              value={form.insuranceValidTill}
              onChange={(e) => set('insuranceValidTill', e.target.value)}
              placeholder="Dec 2028"
              required
            />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-bold uppercase text-slate-900">Photo</h2>
        <div className="flex items-start gap-4">
          {form.image && (
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <Image src={form.image} alt="Car preview" fill className="object-cover" />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="text-sm"
            />
            {isUploading && <p className="mt-1 text-xs text-slate-500">Uploading…</p>}
            <input
              className="field-input mt-2"
              value={form.image}
              onChange={(e) => set('image', e.target.value)}
              placeholder="/images/cars/your-car.jpg"
              required
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-sm font-bold uppercase text-slate-900">Description & Features</h2>
        <Field label="Description">
          <textarea
            className="field-input min-h-[100px]"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </Field>
        <Field label="Features (one per line)">
          <textarea
            className="field-input mt-4 min-h-[140px]"
            value={form.features}
            onChange={(e) => set('features', e.target.value)}
          />
        </Field>
      </section>

      <div className="flex gap-3">
        <button type="submit" disabled={isSaving || isUploading} className="btn btn-primary disabled:opacity-60">
          {isSaving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Car'}
        </button>
        <button type="button" onClick={() => router.push('/admin')} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
    </label>
  );
}
