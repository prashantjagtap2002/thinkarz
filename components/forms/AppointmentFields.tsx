'use client';

import { useMemo, useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { FieldError } from './SubmittableForm';

const TIME_SLOTS = [
  { value: '10:00 AM - 11:00 AM', label: '10:00 AM - 11:00 AM' },
  { value: '12:00 PM - 1:00 PM', label: '12:00 PM - 1:00 PM' },
  { value: '2:00 PM - 3:00 PM', label: '2:00 PM - 3:00 PM' },
  { value: '4:00 PM - 5:00 PM', label: '4:00 PM - 5:00 PM' },
] as const;

function getTomorrowIsoDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function AppointmentFields() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const tomorrow = useMemo(() => getTomorrowIsoDate(), []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="date" className="field-label">Preferred Date</label>
        <div className="relative flex items-center">
          <input
            id="date"
            name="date"
            required
            type="date"
            min={tomorrow}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="field-input w-full cursor-pointer pr-10 bg-white text-slate-700 font-medium [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
          <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-red pointer-events-none" size={18} />
        </div>
        <FieldError name="date" />
      </div>
      <div>
        <label htmlFor="time" className="field-label">Preferred Time</label>
        <div className="relative">
          <select
            id="time"
            name="time"
            required
            className="field-input appearance-none pr-10 cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed"
            value={selectedTime}
            disabled={!selectedDate}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="" disabled>
              Select Time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
        </div>
        <FieldError name="time" />
      </div>
    </div>
  );
}
