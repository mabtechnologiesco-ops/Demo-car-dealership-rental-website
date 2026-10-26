import { CheckCircle2 } from 'lucide-react';

interface Props {
  onSubmitted: (ref: string) => void;
}

export default function Contact({ onSubmitted }: Props) {
  return (
    <section id="contact" className="bg-[#0B0B0D] py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">GET IN TOUCH</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Contact Us</h2>
          <p className="mt-3 text-white/65 max-w-md">
            Questions about a vehicle, rental, or purchase? Reach out and our team will help.
          </p>

          <div className="mt-8 space-y-4 text-white/80">
            <Detail label="Phone" value="+1 (000) 000-0000" />
            <Detail label="Email" value="hello@veloxmotors.com" />
            <Detail label="Address" value="1200 Auto Boulevard, City, Country" />
            <Detail label="Business Hours" value="Mon–Sat: 9:00 AM – 7:00 PM · Sun: Closed" />
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#17191D] border border-white/10 text-xs text-white/50">
            Contact details shown above are placeholders — replace them with the client's real information.
          </div>
        </div>

        <ContactForm onSubmitted={onSubmitted} />
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-[#17191D] border border-white/10">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-0.5 font-semibold text-white">{value}</div>
    </div>
  );
}

import { useState } from 'react';
import { genReference } from '@/data/vehicles';

function ContactForm({ onSubmitted }: { onSubmitted: (ref: string) => void }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = 'Name is required';
    if (!form.email.trim()) er.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'Enter a valid email';
    if (!form.message.trim()) er.message = 'Please enter a message';
    setErrors(er);
    if (Object.keys(er).length) return;
    const ref = genReference('VEL-MSG');
    setDone(ref);
    onSubmitted(ref);
  };

  if (done) {
    return (
      <div className="p-7 rounded-2xl bg-[#17191D] border border-white/10 text-center flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
          <CheckCircle2 size={34} className="text-green-400" />
        </div>
        <h3 className="mt-4 text-xl font-extrabold text-white">Demo Message Received</h3>
        <p className="mt-2 text-white/70 text-sm max-w-sm">
          Thanks for reaching out! This is a demonstration only — no message was sent or stored.
        </p>
        <div className="mt-4 px-5 py-3 rounded-xl bg-[#0B0B0D] border border-white/10">
          <span className="text-xs text-white/50">Reference: </span>
          <span className="font-bold text-[#FF6B2C] tracking-wider">{done}</span>
        </div>
        <button
          onClick={() => { setDone(null); setForm({ name: '', email: '', message: '' }); }}
          className="mt-5 px-5 py-2.5 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-6 rounded-2xl bg-[#17191D] border border-white/10 space-y-4" noValidate>
      <h3 className="text-lg font-bold text-white">Send a Message</h3>
      <div>
        <label className="text-xs text-white/60 font-medium">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`mt-1.5 w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border ${errors.name ? 'border-red-500/60' : 'border-white/10'} text-white focus:outline-none focus:border-[#FF6B2C] transition-colors`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label className="text-xs text-white/60 font-medium">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={`mt-1.5 w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border ${errors.email ? 'border-red-500/60' : 'border-white/10'} text-white focus:outline-none focus:border-[#FF6B2C] transition-colors`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label className="text-xs text-white/60 font-medium">Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`mt-1.5 w-full px-3.5 py-2.5 rounded-lg bg-[#0B0B0D] border ${errors.message ? 'border-red-500/60' : 'border-white/10'} text-white focus:outline-none focus:border-[#FF6B2C] transition-colors resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>
      <button type="submit" className="w-full px-5 py-3 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors">
        Send Demo Message
      </button>
      <p className="text-xs text-white/40">Demo only — no message is sent or stored.</p>
    </form>
  );
}
