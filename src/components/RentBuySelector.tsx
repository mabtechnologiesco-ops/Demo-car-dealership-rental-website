import { ArrowRight } from 'lucide-react';

interface Props {
  onRent: () => void;
  onSale: () => void;
}

export default function RentBuySelector({ onRent, onSale }: Props) {
  return (
    <section className="bg-[#0B0B0D] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid md:grid-cols-2 gap-6">
        <article className="group relative overflow-hidden rounded-2xl min-h-[320px] flex items-end">
          <img
            src="/cars/rent-selector.jpg"
            alt="Car available for rent on the road at dusk"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-7 sm:p-9">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Rent a Car</h2>
            <p className="mt-2 text-white/75 max-w-md">
              Find your perfect rental for everyday drives, business trips, and weekend escapes.
            </p>
            <button
              onClick={onRent}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors"
            >
              Explore Rentals <ArrowRight size={17} />
            </button>
          </div>
        </article>

        <article className="group relative overflow-hidden rounded-2xl min-h-[320px] flex items-end">
          <img
            src="/cars/buy-selector.jpg"
            alt="Luxury cars in a modern dealership showroom"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="relative z-10 p-7 sm:p-9">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Buy a Car</h2>
            <p className="mt-2 text-white/75 max-w-md">
              Explore our collection and discover your next vehicle.
            </p>
            <button
              onClick={onSale}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold bg-white text-[#0B0B0D] hover:bg-white/90 transition-colors"
            >
              Browse Cars for Sale <ArrowRight size={17} />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
