'use client';

import { useEffect, useMemo, useState } from 'react';
import { FieldError } from './SubmittableForm';

const TIME_SLOTS = [
  { value: '10:00', label: '10:00 AM - 11:00 AM' },
  { value: '12:00', label: '12:00 PM - 1:00 PM' },
  { value: '14:00', label: '2:00 PM - 3:00 PM' },
  { value: '16:00', label: '4:00 PM - 5:00 PM' },
] as const;

function getTodayIsoDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

export default function AppointmentFields() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const today = useMemo(() => getTodayIsoDate(), []);

  const availableTimeSlots = useMemo(() => {
    if (selectedDate !== today) {
      return TIME_SLOTS;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return TIME_SLOTS.filter((slot) => timeToMinutes(slot.value) > currentMinutes);
  }, [selectedDate, today]);

  useEffect(() => {
    if (selectedTime && !availableTimeSlots.some((slot) => slot.value === selectedTime)) {
      setSelectedTime('');
    }
  }, [availableTimeSlots, selectedTime]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="date" className="field-label">Preferred Date</label>
        <div className="relative">
          <input
            id="date"
            name="date"
            required
            type="date"
            className="field-input"
            value={selectedDate}
            min={today}
            onKeyDown={(e) => e.preventDefault()}
            onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          {!selectedDate && (
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              Select Date
            </span>
          )}
        </div>
        <FieldError name="date" />
      </div>
      <div>
        <label htmlFor="time" className="field-label">Preferred Time</label>
        <select
          id="time"
          name="time"
          required
          className="field-input"
          value={selectedTime}
          disabled={!selectedDate || availableTimeSlots.length === 0}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="" disabled>
            {selectedDate && availableTimeSlots.length === 0 ? 'No slots available today' : 'Select Time'}
          </option>
          {availableTimeSlots.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
        <FieldError name="time" />
      </div>
    </div>
  );
}
