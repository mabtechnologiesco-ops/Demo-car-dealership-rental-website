import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import type { Vehicle } from '@/data/vehicles';
import { formatCurrency, genReference } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
}

interface Form {
  name: string;
  email: string;
  phone: string;
  location: string;
  pickup: string;
  return: string;
  notes: string;
}

const empty: Form = { name: '', email: '', phone: '', location: '', pickup: '', return: '', notes: '' };

export default function RentalBookingModal({ vehicle, open, onClose }: Props) {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

  const days = useMemo(() => {
    if (!form.pickup || !form.return) return 0;
    const a = new Date(form.pickup);
    const b = new Date(form.return);
    const diff = Math.round((b.getTime() - a.getTime()) / 86400000);
    return diff > 0 ? diff : 0;
  }, [form.pickup, form.return]);

  const total = vehicle?.dailyRate && days > 0 ? vehicle.dailyRate * days : 0;

  const today = new Date().toISOString().split('T')[0];

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.location.trim()) e.location = 'Pickup location is required';
    if (!form.pickup) e.pickup = 'Pickup date is required';
    else if (form.pickup < today) e.pickup = 'Pickup cannot be in the past';
    if (!form.return) e.return = 'Return date is required';
    else if (form.pickup && form.return <= form.pickup) e.return = 'Return must be after pickup';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || !vehicle) return;
    setSubmitted(genReference('VEL-RENT'));
  };

  const close = () => {
    setForm(empty);
    setErrors({});
    setSubmitted(null);
    onClose();
  };

  if (!vehicle) return null;

  return (
    <Modal open={open} onClose={close} labelledBy="rent-modal-title" maxWidth="max-w-2xl">
      {submitted ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
            <CheckCircle2 size={34} className="text-green-400" />
          </div>
          <h2 id="rent-modal-title" className="mt-4 text-2xl font-extrabold text-white">Demo Booking Received</h2>
          <p className="mt-2 text-white/70 max-w-md mx-auto">
            Thanks, {form.name.split(' ')[0] || 'there'}! This is a demonstration only — no booking was
            stored, confirmed, or charged. No real reservation has been made.
          </p>
          <div className="mt-5 inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-[#0B0B0D] border border-white/10">
            <span className="text-xs text-white/50">Temporary reference number</span>
            <span className="text-lg font-bold text-[#FF6B2C] tracking-wider">{submitted}</span>
          </div>
          <div className="mt-5 text-sm text-white/60">
            {vehicle.make} {vehicle.model} · {days} day(s) · est. {formatCurrency(total)}
          </div>
          <button onClick={close} className="mt-6 px-6 py-2.5 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors">
            Close
          </button>
        </div>
      ) : (
        <div>
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17191D] to-transparent" />
            <div className="absolute bottom-3 left-5">
              <h2 id="rent-modal-title" className="text-xl font-extrabold text-white">
                Rent the {vehicle.make} {vehicle.model}
              </h2>
              <p className="text-[#FF6B2C] font-bold">{formatCurrency(vehicle.dailyRate!)}/day</p>
            </div>
          </div>

          <form onSubmit={submit} className="p-5 sm:p-6 space-y-4" noValidate>
            <p className="text-xs text-white/50 flex items-center gap-1.5">
              <AlertCircle size={13} /> Demo only — no payment is processed and no booking is stored.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full Name" error={errors.name}>
                <input value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls(errors.name)} />
              </Field>
              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls(errors.email)} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls(errors.phone)} />
              </Field>
              <Field label="Pickup Location" error={errors.location}>
                <input value={form.location} onChange={(e) => set('location', e.target.value)} className={inputCls(errors.location)} />
              </Field>
              <Field label="Pickup Date" error={errors.pickup}>
                <input type="date" min={today} value={form.pickup} onChange={(e) => set('pickup', e.target.value)} className={inputCls(errors.pickup)} />
              </Field>
              <Field label="Return Date" error={errors.return}>
                <input type="date" min={form.pickup || today} value={form.return} onChange={(e) => set('return', e.target.value)} className={inputCls(errors.return)} />
              </Field>
            </div>

            <Field label="Notes (optional)">
              <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={2} className={inputCls()} />
            </Field>

            {days > 0 && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0B0D] border border-white/10">
                <div className="flex items-center gap-2 text-white/80">
                  <CalendarDays size={18} className="text-[#FF6B2C]" />
                  <span>{days} day(s) × {formatCurrency(vehicle.dailyRate!)}</span>
                </div>
                <span className="text-lg font-bold text-white">Est. {formatCurrency(total)}</span>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={close} className="px-5 py-3 rounded-lg font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-5 py-3 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors">
                Confirm Demo Booking
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-white/60 font-medium">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputCls(error?: string): string {
  return `w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border ${
    error ? 'border-red-500/60' : 'border-white/10'
  } text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B2C] transition-colors`;
}
