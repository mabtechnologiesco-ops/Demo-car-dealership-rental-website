import { ArrowRight, ShieldCheck, CalendarClock, BadgeDollarSign } from 'lucide-react';
import { heroImage } from '@/data/vehicles';

interface Props {
  onRent: () => void;
  onExploreSale: () => void;
}

const trust = [
  { icon: ShieldCheck, label: 'Quality Vehicles' },
  { icon: CalendarClock, label: 'Flexible Rentals' },
  { icon: BadgeDollarSign, label: 'Transparent Pricing' },
];

export default function Hero({ onRent, onExploreSale }: Props) {
  return (
    <section id="home" className="relative min-h-[100vh] sm:min-h-[92vh] flex flex-col">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury car in a dramatic dark setting"
          className="w-full h-full object-cover"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="relative z-10 flex-1 flex items-center pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold tracking-wider bg-[#FF6B2C]/15 text-[#FF6B2C] border border-[#FF6B2C]/30">
              PREMIUM MOBILITY. YOUR WAY.
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white text-balance">
              Drive Your Dream.
              <br />
              <span className="text-[#FF6B2C]">Own Your Journey.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
              Discover premium vehicles for every journey. Rent your perfect ride or find your next
              car in our carefully selected collection.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onRent}
                className="px-6 py-3.5 rounded-xl font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B2C]/20"
              >
                Rent a Car <ArrowRight size={18} />
              </button>
              <button
                onClick={onExploreSale}
                className="px-6 py-3.5 rounded-xl font-semibold bg-white/10 backdrop-blur text-white border border-white/20 hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
              >
                Explore Cars for Sale <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {trust.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-white/85 text-sm font-medium">
                  <t.icon size={18} className="text-[#FF6B2C]" />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="h-10 w-6 rounded-full border-2 border-white/30 mx-auto flex justify-center pt-1.5 animate-pulse-dot hidden sm:flex">
            <span className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
