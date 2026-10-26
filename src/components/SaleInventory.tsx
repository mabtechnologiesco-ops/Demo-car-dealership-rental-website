import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import VehicleCard from './VehicleCard';
import type { Vehicle } from '@/data/vehicles';
import { saleVehicles, categories, formatCurrency } from '@/data/vehicles';

interface Props {
  onView: (v: Vehicle) => void;
  onAction: (v: Vehicle) => void;
}

type Sort = 'price-asc' | 'price-desc';

const maxPrice = Math.max(...saleVehicles.map((v) => v.price!));

export default function SaleInventory({ onView, onAction }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [transmission, setTransmission] = useState<string>('All');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPriceVal, setMaxPriceVal] = useState<number>(maxPrice);
  const [sort, setSort] = useState<Sort>('price-asc');

  const filtered = useMemo(() => {
    let list = saleVehicles.filter((v) => {
      const matchesQ = `${v.make} ${v.model}`.toLowerCase().includes(query.toLowerCase());
      const matchesC = category === 'All' || v.category === category;
      const matchesT = transmission === 'All' || v.transmission === transmission;
      const matchesMin = (v.price ?? 0) >= minPrice;
      const matchesMax = (v.price ?? 0) <= maxPriceVal;
      return matchesQ && matchesC && matchesT && matchesMin && matchesMax;
    });
    list = [...list].sort((a, b) =>
      sort === 'price-asc' ? (a.price ?? 0) - (b.price ?? 0) : (b.price ?? 0) - (a.price ?? 0)
    );
    return list;
  }, [query, category, transmission, minPrice, maxPriceVal, sort]);

  const reset = () => {
    setQuery('');
    setCategory('All');
    setTransmission('All');
    setMinPrice(0);
    setMaxPriceVal(maxPrice);
    setSort('price-asc');
  };

  return (
    <section id="sales" className="bg-[#17191D] py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">FOR SALE</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Cars for Sale</h2>
            <p className="mt-2 text-white/65 max-w-xl">
              Browse our dealership collection. All inventory data is illustrative for demo purposes.
            </p>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by make or model..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF6B2C] transition-colors"
            />
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0B0B0D] border border-white/10 text-white/80 hover:text-white hover:border-white/25 transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} /> Reset Filters
          </button>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-white/50 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full px-3 py-2.5 rounded-xl bg-[#0B0B0D] border border-white/10 text-white focus:outline-none focus:border-[#FF6B2C] cursor-pointer"
            >
              <option>All</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 font-medium">Transmission</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="mt-1.5 w-full px-3 py-2.5 rounded-xl bg-[#0B0B0D] border border-white/10 text-white focus:outline-none focus:border-[#FF6B2C] cursor-pointer"
            >
              <option>All</option>
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 font-medium">
              Min Price: {formatCurrency(minPrice)}
            </label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              step={1000}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="mt-3 w-full accent-[#FF6B2C]"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 font-medium">
              Max Price: {formatCurrency(maxPriceVal)}
            </label>
            <input
              type="range"
              min={0}
              max={maxPrice}
              step={1000}
              value={maxPriceVal}
              onChange={(e) => setMaxPriceVal(Number(e.target.value))}
              className="mt-3 w-full accent-[#FF6B2C]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <SlidersHorizontal size={15} />
            Showing {filtered.length} of {saleVehicles.length} vehicles
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="px-3 py-2 rounded-lg bg-[#0B0B0D] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF6B2C] cursor-pointer"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 text-center py-16 rounded-2xl bg-[#0B0B0D] border border-white/10">
            <p className="text-white/60">No vehicles match your filters. Try resetting.</p>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((v) => (
              <VehicleCard key={v.id} vehicle={v} mode="sale" onView={onView} onAction={onAction} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
