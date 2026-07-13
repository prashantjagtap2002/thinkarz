'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays } from 'lucide-react';

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
  const [showDatePicker, setShowDatePicker] = useState(false);
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
        <label className="field-label">Preferred Date</label>
        <div className="relative">
          <input
            required
            type={showDatePicker || selectedDate ? 'date' : 'text'}
            className="field-input pr-11"
            value={selectedDate}
            min={today}
            placeholder=""
            onFocus={() => setShowDatePicker(true)}
            onBlur={() => setShowDatePicker(Boolean(selectedDate))}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <CalendarDays
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>
      <div>
        <label className="field-label">Preferred Time</label>
        <select
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
      </div>
    </div>
  );
}
