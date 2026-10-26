import { useState } from 'react';
import { Fuel, Users, Settings2, Gauge, ArrowRight } from 'lucide-react';
import type { Vehicle } from '@/data/vehicles';
import { formatCurrency, formatMileage } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle;
  mode: 'rent' | 'sale';
  onView: (v: Vehicle) => void;
  onAction: (v: Vehicle) => void;
}

export default function VehicleCard({ vehicle, mode, onView, onAction }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-[#17191D] border border-white/10 hover:border-[#FF6B2C]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0D]">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#17191D] via-[#1f2228] to-[#17191D] bg-[length:1000px_100%]" 
               style={{ animation: 'shimmer 1.6s infinite linear' }} />
        )}
        <img
          src={vehicle.image}
          alt={`${vehicle.make} ${vehicle.model}${vehicle.year ? ` ${vehicle.year}` : ''}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur text-white/90 border border-white/10">
          {vehicle.category}
        </div>
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-sm font-bold bg-[#FF6B2C] text-white shadow-lg">
          {mode === 'rent'
            ? `${formatCurrency(vehicle.dailyRate!)}/day`
            : formatCurrency(vehicle.price!)}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-white">
          {vehicle.make} {vehicle.model}
          {vehicle.year && <span className="text-white/50 font-medium"> · {vehicle.year}</span>}
        </h3>

        <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <Settings2 size={14} className="text-[#FF6B2C]" /> {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={14} className="text-[#FF6B2C]" /> {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1.5">
            <Users size={14} className="text-[#FF6B2C]" /> {vehicle.seats} seats
          </span>
          {vehicle.mileage != null ? (
            <span className="flex items-center gap-1.5">
              <Gauge size={14} className="text-[#FF6B2C]" /> {formatMileage(vehicle.mileage)}
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Gauge size={14} className="text-[#FF6B2C]" /> {vehicle.category}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2 pt-5">
          <button
            onClick={() => onView(vehicle)}
            className="flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => onAction(vehicle)}
            className="flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors flex items-center justify-center gap-1.5 group/btn"
          >
            {mode === 'rent' ? 'Rent This Car' : 'Enquire to Buy'}
            <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
