import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import VehicleCard from './VehicleCard';
import type { Vehicle } from '@/data/vehicles';
import { rentalVehicles, categories, formatCurrency } from '@/data/vehicles';

interface Props {
  onView: (v: Vehicle) => void;
  onAction: (v: Vehicle) => void;
}

type Sort = 'price-asc' | 'price-desc';

export default function RentalInventory({ onView, onAction }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [sort, setSort] = useState<Sort>('price-asc');

  const filtered = useMemo(() => {
    let list = rentalVehicles.filter((v) => {
      const matchesQ = `${v.make} ${v.model}`.toLowerCase().includes(query.toLowerCase());
      const matchesC = category === 'All' || v.category === category;
      return matchesQ && matchesC;
    });
    list = [...list].sort((a, b) =>
      sort === 'price-asc'
        ? (a.dailyRate ?? 0) - (b.dailyRate ?? 0)
        : (b.dailyRate ?? 0) - (a.dailyRate ?? 0)
    );
    return list;
  }, [query, category, sort]);

  return (
    <section id="rentals" className="bg-[#0B0B0D] py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">RENTAL FLEET</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Cars Available for Rent</h2>
            <p className="mt-2 text-white/65 max-w-xl">
              Daily rates shown below. Prices are illustrative demo values for demonstration only.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by make or model..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#17191D] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B2C] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === c
                    ? 'bg-[#FF6B2C] text-white'
                    : 'bg-[#17191D] text-white/70 border border-white/10 hover:border-white/25'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative">
            <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="pl-9 pr-8 py-3 rounded-xl bg-[#17191D] border border-white/10 text-white focus:outline-none focus:border-[#FF6B2C] appearance-none cursor-pointer"
              aria-label="Sort by price"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-white/50 text-sm">
          <SlidersHorizontal size={15} />
          Showing {filtered.length} of {rentalVehicles.length} vehicles
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 text-center py-16 rounded-2xl bg-[#17191D] border border-white/10">
            <p className="text-white/60">No rental vehicles match your search.</p>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} mode="rent" onView={onView} onAction={onAction} />
            ))}
          </div>
        )}

        <p className="mt-6 text-xs text-white/40">
          Rates from {formatCurrency(Math.min(...rentalVehicles.map((v) => v.dailyRate!)))}/day. Demo pricing only.
        </p>
      </div>
    </section>
  );
}
