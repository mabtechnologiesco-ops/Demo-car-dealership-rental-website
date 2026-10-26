import { Fuel, Users, Settings2, Gauge, Calendar, Tag } from 'lucide-react';
import Modal from './Modal';
import type { Vehicle } from '@/data/vehicles';
import { formatCurrency, formatMileage } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle | null;
  open: boolean;
  onClose: () => void;
  onAction: (v: Vehicle) => void;
}

export default function VehicleDetailsModal({ vehicle, open, onClose, onAction }: Props) {
  if (!vehicle) return null;
  const isRent = vehicle.dailyRate !== undefined;

  return (
    <Modal open={open} onClose={onClose} labelledBy="details-title" maxWidth="max-w-3xl">
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17191D] via-[#17191D]/40 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FF6B2C] text-white">
            {vehicle.category}
          </span>
          <h2 id="details-title" className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            {vehicle.make} {vehicle.model}
            {vehicle.year && <span className="text-white/60 font-bold"> · {vehicle.year}</span>}
          </h2>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <p className="text-white/75 max-w-xl">{vehicle.description}</p>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-[#FF6B2C]">
              {isRent ? `${formatCurrency(vehicle.dailyRate!)}` : formatCurrency(vehicle.price!)}
            </div>
            <div className="text-xs text-white/50">{isRent ? 'per day' : 'sale price'}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Spec icon={Settings2} label="Transmission" value={vehicle.transmission} />
          <Spec icon={Fuel} label="Fuel" value={vehicle.fuelType} />
          <Spec icon={Users} label="Seats" value={`${vehicle.seats}`} />
          {vehicle.mileage != null ? (
            <Spec icon={Gauge} label="Mileage" value={formatMileage(vehicle.mileage)} />
          ) : (
            <Spec icon={Tag} label="Category" value={vehicle.category} />
          )}
          {vehicle.year && <Spec icon={Calendar} label="Year" value={`${vehicle.year}`} />}
        </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          <button onClick={onClose} className="px-5 py-3 rounded-lg font-semibold border border-white/15 text-white hover:bg-white/5 transition-colors">
            Close
          </button>
          <button
            onClick={() => onAction(vehicle)}
            className="flex-1 px-5 py-3 rounded-lg font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors"
          >
            {isRent ? 'Rent This Car' : 'Enquire to Buy'}
          </button>
        </div>

        <p className="mt-4 text-xs text-white/40">
          All specifications and prices are illustrative demo data for demonstration purposes only.
        </p>
      </div>
    </Modal>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-[#0B0B0D] border border-white/10">
      <div className="flex items-center gap-1.5 text-[#FF6B2C]">
        <Icon size={15} />
        <span className="text-xs text-white/50 font-medium">{label}</span>
      </div>
      <div className="mt-1 text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
