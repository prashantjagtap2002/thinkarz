import { CheckCircle2, ShieldQuestion } from 'lucide-react';

const categories = [
  'Engine & Transmission',
  'Exterior & Body',
  'Interior & Comfort',
  'Electricals & Battery',
  'Suspension, Brakes & Tyres',
  'AC & Cooling System',
];

export default function InspectionReport({ certified }: { certified?: boolean }) {
  if (!certified) {
    return (
      <div className="flex items-start gap-4 rounded-2xl border border-dashed border-slate-300 p-6">
        <ShieldQuestion className="mt-0.5 shrink-0 text-brand-blue" size={24} />
        <div>
          <h2 className="mb-1 text-lg font-bold text-slate-900">Inspection Report</h2>
          <p className="text-sm text-slate-600">
            This car&apos;s 140-point certification is in progress. Book a free inspection visit
            or contact our team for the latest report.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
      <h2 className="mb-1 text-xl font-extrabold text-slate-900">140-Point Inspection Report</h2>
      <p className="mb-6 text-sm text-slate-500">
        This car has passed Thinkarz&apos;s full quality certification across every category.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <CheckCircle2 className="shrink-0 text-green-600" size={20} />
            <div>
              <p className="text-sm font-semibold text-slate-900">{c}</p>
              <p className="text-xs text-green-700">Passed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
