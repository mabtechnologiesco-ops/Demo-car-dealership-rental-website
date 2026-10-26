import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from './Modal';
import type { Vehicle } from '@/data/vehicles';
import { formatCurrency, formatMileage, genReference } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
}

interface Form {
  name: string;
  email: string;
  phone: string;
  contact: string;
  message: string;
}

const empty: Form = { name: '', email: '', phone: '', contact: 'Email', message: '' };

export default function EnquiryModal({ vehicle, open, onClose }: Props) {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

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
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || !vehicle) return;
    setSubmitted(genReference('VEL-BUY'));
  };

  const close = () => {
    setForm(empty);
    setErrors({});
    setSubmitted(null);
    onClose();
  };

  if (!vehicle) return null;

  return (
    <Modal open={open} onClose={close} labelledBy="enquiry-title" maxWidth="max-w-lg">
      {submitted ? (
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
            <CheckCircle2 size={34} className="text-green-400" />
          </div>
          <h2 id="enquiry-title" className="mt-4 text-2xl font-extrabold text-white">Demo Enquiry Received</h2>
          <p className="mt-2 text-white/70 max-w-md mx-auto">
            Thanks, {form.name.split(' ')[0] || 'there'}! This is a demonstration only — no enquiry was
            sent or stored, and no transaction has taken place.
          </p>
          <div className="mt-5 inline-flex flex-col items-center gap-1 px-6 py-4 rounded-xl bg-[#0B0B0D] border border-white/10">
            <span className="text-xs text-white/50">Temporary reference number</span>
            <span className="text-lg font-bold text-[#FF6B2C] tracking-wider">{submitted}</span>
          </div>
          <div className="mt-5 text-sm text-white/60">
            {vehicle.make} {vehicle.model} · {formatCurrency(vehicle.price!)}
          </div>
          <button onClick={close} className="mt-6 px-6 py-2.5 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors">
            Close
          </button>
        </div>
      ) : (
        <div>
          <div className="relative h-36 overflow-hidden">
            <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17191D] to-transparent" />
            <div className="absolute bottom-3 left-5">
              <h2 id="enquiry-title" className="text-lg font-extrabold text-white">
                Enquire: {vehicle.make} {vehicle.model} {vehicle.year}
              </h2>
              <p className="text-[#FF6B2C] font-bold">{formatCurrency(vehicle.price!)}</p>
            </div>
          </div>

          <form onSubmit={submit} className="p-5 sm:p-6 space-y-4" noValidate>
            <p className="text-xs text-white/50 flex items-center gap-1.5">
              <AlertCircle size={13} /> Demo only — no enquiry is sent or stored.
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
              <Field label="Preferred Contact">
                <select value={form.contact} onChange={(e) => set('contact', e.target.value)} className={inputCls()}>
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
              </Field>
            </div>

            <Field label="Message (optional)">
              <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={3} className={inputCls()} placeholder="Any questions about this vehicle..." />
            </Field>

            <div className="text-xs text-white/50 -mt-1">
              {vehicle.mileage != null && <>{formatMileage(vehicle.mileage)} · </>}
              {vehicle.transmission} · {vehicle.fuelType} · {vehicle.seats} seats
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={close} className="px-5 py-3 rounded-lg font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-5 py-3 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors">
                Submit Demo Enquiry
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
