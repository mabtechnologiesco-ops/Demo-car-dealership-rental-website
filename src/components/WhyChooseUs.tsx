import { ShieldCheck, CalendarClock, BadgeDollarSign, HeartHandshake } from 'lucide-react';

const items = [
  { icon: ShieldCheck, title: 'Carefully Selected Vehicles', desc: 'Every vehicle in our collection is chosen for quality, reliability, and condition.' },
  { icon: CalendarClock, title: 'Flexible Rentals', desc: 'Daily, weekly, and weekend options to fit your schedule and journey.' },
  { icon: BadgeDollarSign, title: 'Transparent Pricing', desc: 'Clear rates and sale prices with no hidden surprises — what you see is what you pay.' },
  { icon: HeartHandshake, title: 'Customer-Focused Service', desc: 'A friendly team ready to help you find the right vehicle, rent or buy.' },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#0B0B0D] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">WHY VELOX</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Why Choose Us</h2>
          <p className="mt-3 text-white/65">A premium, hassle-free experience whether you rent or buy.</p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div
              key={it.title}
              className="p-6 rounded-2xl bg-[#17191D] border border-white/10 hover:border-[#FF6B2C]/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF6B2C]/15 flex items-center justify-center group-hover:bg-[#FF6B2C]/25 transition-colors">
                <it.icon size={24} className="text-[#FF6B2C]" />
              </div>
              <h3 className="mt-4 font-bold text-white">{it.title}</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
