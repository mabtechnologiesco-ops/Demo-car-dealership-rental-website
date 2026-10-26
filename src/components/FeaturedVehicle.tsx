import { ArrowRight, Gauge, Settings2, Fuel } from 'lucide-react';
import { vehicles, featuredImage, formatCurrency } from '@/data/vehicles';
import type { Vehicle } from '@/data/vehicles';

interface Props {
  onView: (v: Vehicle) => void;
}

export default function FeaturedVehicle({ onView }: Props) {
  const featured = vehicles.find((v) => v.id === 'sale-911-2020')!;

  return (
    <section className="bg-[#0B0B0D] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden bg-[#17191D] border border-white/10">
          <div className="relative h-72 sm:h-96 lg:h-full min-h-[360px] order-1 lg:order-none">
            <img src={featuredImage} alt="Featured Porsche 911" loading="lazy" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17191D]/80 via-transparent to-transparent lg:bg-gradient-to-r" />
            <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FF6B2C] text-white">
              FEATURED VEHICLE
            </span>
          </div>

          <div className="p-7 sm:p-10">
            <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">SPOTLIGHT</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
              {featured.make} {featured.model} {featured.year}
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">{featured.description}</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Spec icon={Gauge} label="Mileage" value={`${(featured.mileage!/1000).toFixed(1)}k mi`} />
              <Spec icon={Settings2} label="Gearbox" value={featured.transmission} />
              <Spec icon={Fuel} label="Fuel" value={featured.fuelType} />
            </div>

            <div className="mt-7 flex items-end justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs text-white/50">Sale price</div>
                <div className="text-3xl font-extrabold text-[#FF6B2C]">{formatCurrency(featured.price!)}</div>
              </div>
              <button
                onClick={() => onView(featured)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors"
              >
                View Vehicle <ArrowRight size={17} />
              </button>
            </div>
            <p className="mt-4 text-xs text-white/40">Illustrative demo data only.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-[#0B0B0D] border border-white/10">
      <Icon size={16} className="text-[#FF6B2C]" />
      <div className="mt-1.5 text-xs text-white/50">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
