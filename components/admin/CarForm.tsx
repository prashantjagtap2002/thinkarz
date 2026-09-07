'use client';

import { FormEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  UploadCloud,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Car as CarIcon,
  BadgeIndianRupee,
  Gauge,
  FileText,
  ShieldCheck,
  Plus,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
  CalendarDays,
} from 'lucide-react';
import type { Car } from '@/lib/cars';
import { formatPrice, formatPriceExact, validatePrice, MAX_CAR_PRICE, MIN_CAR_PRICE } from '@/lib/cars';

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
  power: string; // stored as a bare number; the "bhp" unit is appended on save
  mileageValue: string;
  mileageUnit: string;
  insuranceValidTill: string; // stored as "YYYY-MM" for the month picker
  features: string;
  description: string;
  featured: boolean;
};

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// "118.36 bhp" -> "118.36". Keeps the form numeric-only while the stored value
// keeps its human-readable unit.
function numericPart(value?: string): string {
  if (!value) return '';
  const match = value.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  return match ? match[0] : '';
}

const MILEAGE_UNITS = ['kmpl', 'km/kg', 'km'] as const;

function mileageUnitOf(value: string | undefined, fuel: string | undefined): string {
  const lower = (value ?? '').toLowerCase();
  if (lower.includes('kmpl')) return 'kmpl';
  if (lower.includes('km/kg')) return 'km/kg';
  if (lower.includes('km')) return 'km';
  // Sensible default for a brand new listing.
  if (fuel === 'EV') return 'km';
  if (fuel === 'CNG') return 'km/kg';
  return 'kmpl';
}

// "Dec 2028" <-> "2028-12" so <input type="month"> can drive the value while
// the database keeps the display format the rest of the site already renders.
function toMonthInput(value?: string): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const index = MONTHS.findIndex((m) => m.toLowerCase() === match[1].slice(0, 3).toLowerCase());
    if (index >= 0) return `${match[2]}-${String(index + 1).padStart(2, '0')}`;
  }
  return '';
}

function fromMonthInput(value: string): string {
  const match = value.match(/^(\d{4})-(\d{2})$/);
  if (!match) return '';
  const monthIndex = Number(match[2]) - 1;
  if (monthIndex < 0 || monthIndex > 11) return '';
  return `${MONTHS[monthIndex]} ${match[1]}`;
}

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
    transmission: car?.transmission ?? 'Automatic',
    bodyType: car?.bodyType ?? 'SUV',
    owners: car ? String(car.owners) : '1',
    city: car?.city ?? 'Mumbai',
    sellerType: car?.sellerType ?? 'Dealer',
    regNumber: car?.regNumber ?? '',
    color: car?.color ?? '',
    seats: car ? String(car.seats) : '5',
    engine: car?.engine ?? '',
    power: numericPart(car?.power),
    mileageValue: numericPart(car?.mileage),
    mileageUnit: mileageUnitOf(car?.mileage, car?.fuel),
    insuranceValidTill: toMonthInput(car?.insuranceValidTill),
    features: car?.features?.join('\n') ?? '',
    description: car?.description ?? '',
    featured: car?.featured ?? false,
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
    power: form.power ? `${form.power} bhp` : '',
    mileage: form.mileageValue ? `${form.mileageValue} ${form.mileageUnit}` : '',
    insuranceValidTill: fromMonthInput(form.insuranceValidTill),
    features: form.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean),
    description: form.description,
    featured: form.featured,
  };
}

export default function CarForm({ car }: { car?: Car }) {
  const router = useRouter();
  const isEdit = Boolean(car);
  const [form, setForm] = useState<FormState>(carToFormState(car));
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showDirectUrl, setShowDirectUrl] = useState(false);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageUpload(file: File) {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      setErrors(['Please upload a valid JPG, PNG, or WEBP image.']);
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErrors(['Image size must be under 8MB.']);
      return;
    }

    setIsUploading(true);
    setErrors([]);

    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json();
      setIsUploading(false);

      if (!res.ok) {
        setErrors([data.error || 'Failed to upload the photo. Please try again.']);
        return;
      }

      set('image', data.path);
    } catch {
      setIsUploading(false);
      setErrors(['Network error while uploading the photo.']);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
  }

  function addFeature() {
    if (!newFeatureInput.trim()) return;
    const current = form.features ? form.features.split('\n').filter(Boolean) : [];
    if (!current.includes(newFeatureInput.trim())) {
      const updated = [...current, newFeatureInput.trim()].join('\n');
      set('features', updated);
    }
    setNewFeatureInput('');
  }

  function removeFeature(index: number) {
    const current = form.features.split('\n').filter(Boolean);
    current.splice(index, 1);
    set('features', current.join('\n'));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors: string[] = [];

    if (!form.image) {
      validationErrors.push('Please upload or provide a vehicle photo.');
    }

    const priceValue = Number(form.price);
    const priceMessage = validatePrice(priceValue);
    if (priceMessage) validationErrors.push(priceMessage);

    if (!form.power || Number(form.power) <= 0) {
      validationErrors.push('Max power must be a number greater than zero.');
    }

    if (!form.mileageValue || Number(form.mileageValue) <= 0) {
      validationErrors.push('Mileage / range must be a number greater than zero.');
    }

    if (!fromMonthInput(form.insuranceValidTill)) {
      validationErrors.push('Please choose the month and year the insurance is valid till.');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors([]);
    setIsSaving(true);

    const url = isEdit ? `/api/admin/cars/${car!.id}` : '/api/admin/cars';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formStateToPayload(form)),
      });
      const data = await res.json();
      setIsSaving(false);

      if (!res.ok) {
        setErrors(data.errors || [data.error || 'Something went wrong']);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setIsSaving(false);
      setErrors(['An unexpected error occurred while saving the vehicle.']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const featureList = form.features.split('\n').map((f) => f.trim()).filter(Boolean);
  const priceError = form.price === '' ? null : validatePrice(Number(form.price));

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* Errors Banner */}
      {errors.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 shadow-xs">
          <h4 className="text-sm font-bold text-rose-800">Please review the following errors:</h4>
          <ul className="mt-2 list-inside list-disc text-xs font-medium text-rose-700 space-y-1">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SECTION 1: PHOTO & MEDIA UPLOAD */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <UploadCloud className="h-5 w-5 text-brand-red" />
            <h2>Vehicle Photo & Media</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">JPG, PNG or WEBP &bull; up to 8MB</span>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
          className="hidden"
        />

        {form.image ? (
          /* Uploaded Preview Card */
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="relative aspect-16/9 w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-xs">
              <Image
                src={form.image}
                alt="Car preview"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-900/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-100 backdrop-blur-md">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span>Photo uploaded</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
              >
                <RefreshCw className={`h-3.5 w-3.5 text-slate-500 ${isUploading ? 'animate-spin' : ''}`} />
                <span>{isUploading ? 'Uploading…' : 'Replace Photo'}</span>
              </button>

              <button
                type="button"
                onClick={() => set('image', '')}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>

              <a
                href={form.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-brand-red transition ml-auto"
              >
                <span>View Full Quality</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ) : (
          /* Drag & Drop Zone */
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
              isDragging
                ? 'border-brand-red bg-red-50/50 scale-[1.01]'
                : 'border-slate-200 bg-slate-50/60 hover:border-brand-red hover:bg-slate-50'
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs text-slate-400 group-hover:text-brand-red">
              <UploadCloud className={`h-7 w-7 ${isUploading ? 'animate-bounce text-brand-red' : ''}`} />
            </div>

            {isUploading ? (
              <div className="mt-4">
                <p className="text-sm font-bold text-brand-red animate-pulse">
                  Uploading vehicle photo…
                </p>
                <p className="mt-1 text-xs text-slate-400">Optimizing and storing on global CDN</p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm font-bold text-slate-800">
                  Drag and drop vehicle photo here, or <span className="text-brand-red underline">browse</span>
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Supports JPG, PNG and WEBP files up to 8MB.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Advanced URL accordion */}
        <div className="mt-3 border-t border-slate-100 pt-2">
          <button
            type="button"
            onClick={() => setShowDirectUrl(!showDirectUrl)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
          >
            <span>Advanced: Direct Image URL</span>
            {showDirectUrl ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showDirectUrl && (
            <div className="mt-2">
              <input
                className="field-input text-xs font-mono"
                value={form.image}
                onChange={(e) => set('image', e.target.value)}
                placeholder="https://example.com/cars/my-car.jpg"
              />
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: VEHICLE IDENTITY & BASICS */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-5">
          <CarIcon className="h-5 w-5 text-brand-red" />
          <h2>Vehicle Identity & Specifications</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Make (Brand) *">
            <input
              className="field-input"
              value={form.make}
              onChange={(e) => set('make', e.target.value)}
              placeholder="e.g. Kia, Hyundai, MG, Tata"
              required
            />
          </Field>

          <Field label="Model *">
            <input
              className="field-input"
              value={form.model}
              onChange={(e) => set('model', e.target.value)}
              placeholder="e.g. Sonet, Venue, Comet EV"
              required
            />
          </Field>

          <Field label="Variant / Trim *">
            <input
              className="field-input"
              value={form.variant}
              onChange={(e) => set('variant', e.target.value)}
              placeholder="e.g. GTX PLUS, SX(O)"
              required
            />
          </Field>

          <Field label="Year of Manufacture *">
            <input
              type="number"
              className="field-input"
              value={form.year}
              onChange={(e) => set('year', e.target.value)}
              min="2000"
              max={new Date().getFullYear() + 1}
              required
            />
          </Field>

          <Field label="Body Type *">
            <select
              className="field-input"
              value={form.bodyType}
              onChange={(e) => set('bodyType', e.target.value)}
              required
            >
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="MUV">MUV / MPV</option>
              <option value="Coupe">Coupe</option>
              <option value="Luxury">Luxury</option>
            </select>
          </Field>

          <Field label="Color *">
            <input
              className="field-input"
              value={form.color}
              onChange={(e) => set('color', e.target.value)}
              placeholder="e.g. Polar White, Gravity Grey"
              required
            />
          </Field>

          <Field label="Registration Number (Plate) *">
            <input
              className="field-input font-mono uppercase"
              value={form.regNumber}
              onChange={(e) => set('regNumber', e.target.value.toUpperCase())}
              placeholder="MH02 GE 6125"
              required
            />
          </Field>

          <Field label="City *">
            <input
              className="field-input"
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              placeholder="Mumbai"
              required
            />
          </Field>
        </div>
      </section>

      {/* SECTION 3: PRICING, USAGE & CERTIFICATION */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-5">
          <BadgeIndianRupee className="h-5 w-5 text-brand-red" />
          <h2>Pricing, Usage & Certification</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Price (₹ INR) *">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                ₹
              </span>
              <input
                type="number"
                inputMode="numeric"
                className="field-input pl-7"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="1375000"
                min={MIN_CAR_PRICE}
                max={MAX_CAR_PRICE}
                step="1"
                required
              />
            </div>
            {form.price !== '' &&
              (priceError ? (
                <span className="mt-1 block text-xs font-semibold text-rose-600">{priceError}</span>
              ) : (
                <span className="mt-1 block text-xs font-bold text-emerald-600">
                  {formatPrice(Number(form.price))}
                  <span className="ml-1.5 font-medium text-slate-400">
                    ({formatPriceExact(Number(form.price))})
                  </span>
                </span>
              ))}
          </Field>

          <Field label="Kilometers Driven *">
            <input
              type="number"
              inputMode="numeric"
              className="field-input"
              value={form.kms}
              onChange={(e) => set('kms', e.target.value)}
              placeholder="14500"
              min="0"
              max="1000000"
              step="1"
              required
            />
            {form.kms && !isNaN(Number(form.kms)) && (
              <span className="mt-1 block text-xs text-slate-400">
                {Number(form.kms).toLocaleString('en-IN')} km
              </span>
            )}
          </Field>

          <Field label="Previous Owners *">
            <select
              className="field-input"
              value={form.owners}
              onChange={(e) => set('owners', e.target.value)}
              required
            >
              <option value="1">1st Owner</option>
              <option value="2">2nd Owner</option>
              <option value="3">3rd Owner</option>
              <option value="4">4th+ Owner</option>
            </select>
          </Field>

          <Field label="Seller Type *">
            <select
              className="field-input"
              value={form.sellerType}
              onChange={(e) => set('sellerType', e.target.value)}
              required
            >
              <option value="Dealer">Dealer (Thinkarz Verified)</option>
              <option value="Individual">Individual Direct</option>
            </select>
          </Field>
        </div>

        {/* 140-Point Inspection Toggle Card */}
        <div
          onClick={() => set('certified', !form.certified)}
          className={`mt-5 cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition ${
            form.certified
              ? 'border-emerald-300 bg-emerald-50/70'
              : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                form.certified ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">THINKARZ 140-Point Quality Certified</p>
              <p className="text-xs text-slate-500">
                Marks vehicle as thoroughly inspected and eligible for Thinkarz buyer warranty.
              </p>
            </div>
          </div>
          <div
            className={`h-6 w-11 rounded-full transition-colors flex items-center p-1 ${
              form.certified ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                form.certified ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>

        {/* Featured on Homepage Toggle Card */}
        <div
          onClick={() => set('featured', !form.featured)}
          className={`mt-3 cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition ${
            form.featured
              ? 'border-amber-300 bg-amber-50/70'
              : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                form.featured ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Star className={`h-5 w-5 ${form.featured ? 'fill-current' : ''}`} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Show in Featured Cars on the homepage</p>
              <p className="text-xs text-slate-500">
                Featured vehicles appear in the &ldquo;Featured Cars&rdquo; strip on the homepage.
                Up to 4 are shown, newest first.
              </p>
            </div>
          </div>
          <div
            className={`h-6 w-11 rounded-full transition-colors flex items-center p-1 ${
              form.featured ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white transition-transform ${
                form.featured ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: ENGINE, PERFORMANCE & SPECS */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-5">
          <Gauge className="h-5 w-5 text-brand-red" />
          <h2>Engine & Performance Specifications</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Fuel Type *">
            <select
              className="field-input"
              value={form.fuel}
              onChange={(e) => set('fuel', e.target.value)}
              required
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="EV">Electric (EV)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="CNG">CNG</option>
            </select>
          </Field>

          <Field label="Transmission *">
            <select
              className="field-input"
              value={form.transmission}
              onChange={(e) => set('transmission', e.target.value as Car['transmission'])}
              required
            >
              <option value="Automatic">Automatic (DCT / CVT / Torque Converter)</option>
              <option value="Manual">Manual</option>
            </select>
          </Field>

          <Field label="Seating Capacity *">
            <input
              type="number"
              className="field-input"
              value={form.seats}
              onChange={(e) => set('seats', e.target.value)}
              min="2"
              max="9"
              required
            />
          </Field>

          <Field label="Engine / Battery Capacity *">
            <input
              className="field-input"
              value={form.engine}
              onChange={(e) => set('engine', e.target.value)}
              placeholder="e.g. 998 cc Turbo or 50.3 kWh battery"
              required
            />
          </Field>

          <Field label="Max Power *">
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                className="field-input pr-14"
                value={form.power}
                onChange={(e) => set('power', e.target.value)}
                placeholder="118.36"
                min="1"
                max="2000"
                step="0.01"
                required
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-500">
                bhp
              </span>
            </div>
            <span className="mt-1 block text-xs text-slate-400">
              Enter the number only — &ldquo;bhp&rdquo; is added automatically.
            </span>
          </Field>

          <Field label="Mileage / Range *">
            <div className="flex gap-2">
              <input
                type="number"
                inputMode="decimal"
                className="field-input"
                value={form.mileageValue}
                onChange={(e) => set('mileageValue', e.target.value)}
                placeholder="18.4"
                min="0"
                max="2000"
                step="0.1"
                required
              />
              <select
                className="field-input w-32 shrink-0"
                value={form.mileageUnit}
                onChange={(e) => set('mileageUnit', e.target.value)}
                aria-label="Mileage unit"
              >
                {MILEAGE_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <span className="mt-1 block text-xs text-slate-400">
              {form.fuel === 'EV' ? 'Certified range per full charge.' : 'Number only — pick the unit alongside.'}
            </span>
          </Field>

          <Field label="Insurance Valid Till *">
            <div className="relative">
              <input
                type="month"
                className="field-input pr-10"
                value={form.insuranceValidTill}
                onChange={(e) => set('insuranceValidTill', e.target.value)}
                min={`${new Date().getFullYear() - 1}-01`}
                max={`${new Date().getFullYear() + 15}-12`}
                required
              />
              <CalendarDays className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            <span className="mt-1 block text-xs text-slate-400">
              {form.insuranceValidTill
                ? `Shown on the site as “${fromMonthInput(form.insuranceValidTill)}”`
                : 'Pick the month and year from the calendar.'}
            </span>
          </Field>
        </div>
      </section>

      {/* SECTION 5: DESCRIPTION & FEATURES */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-5">
          <FileText className="h-5 w-5 text-brand-red" />
          <h2>Description & Key Features</h2>
        </div>

        <Field label="Vehicle Description & History">
          <textarea
            className="field-input min-h-[120px] leading-relaxed"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Highlight vehicle condition, service history, ownership experience, and warranty details…"
          />
        </Field>

        {/* Feature Tags Editor */}
        <div className="mt-5">
          <span className="field-label">Key Features & Highlights</span>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="field-input"
              value={newFeatureInput}
              onChange={(e) => setNewFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFeature();
                }
              }}
              placeholder="Type feature (e.g. Panoramic Sunroof, 360 Camera) and press Enter…"
            />
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </div>

          {featureList.length > 0 ? (
            <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50/50 p-3">
              {featureList.map((f, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs"
                >
                  <span>{f}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="text-slate-400 hover:text-rose-500 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No features added yet.</p>
          )}
        </div>
      </section>

      {/* STICKY ACTIONS BAR */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSaving || isUploading}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-redDark disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Saving Vehicle…</span>
            </>
          ) : (
            <span>{isEdit ? 'Save Changes' : 'Add Vehicle to Showroom'}</span>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}
