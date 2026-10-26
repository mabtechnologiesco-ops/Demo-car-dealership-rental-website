import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import RentBuySelector from '@/components/RentBuySelector';
import RentalInventory from '@/components/RentalInventory';
import SaleInventory from '@/components/SaleInventory';
import FeaturedVehicle from '@/components/FeaturedVehicle';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AssistantButton from '@/components/AssistantButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import VehicleDetailsModal from '@/components/VehicleDetailsModal';
import RentalBookingModal from '@/components/RentalBookingModal';
import EnquiryModal from '@/components/EnquiryModal';
import type { Vehicle } from '@/data/vehicles';

export default function App() {
  const [detailsVehicle, setDetailsVehicle] = useState<Vehicle | null>(null);
  const [rentVehicle, setRentVehicle] = useState<Vehicle | null>(null);
  const [enquiryVehicle, setEnquiryVehicle] = useState<Vehicle | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAction = (v: Vehicle) => {
    setDetailsVehicle(null);
    if (v.dailyRate !== undefined) setRentVehicle(v);
    else setEnquiryVehicle(v);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white overflow-x-hidden">
      <Navbar onExplore={() => scrollTo('#rentals')} />

      <Hero onRent={() => scrollTo('#rentals')} onExploreSale={() => scrollTo('#sales')} />

      <RentBuySelector onRent={() => scrollTo('#rentals')} onSale={() => scrollTo('#sales')} />

      <RentalInventory onView={setDetailsVehicle} onAction={handleAction} />

      <SaleInventory onView={setDetailsVehicle} onAction={handleAction} />

      <div id="featured">
        <FeaturedVehicle onView={setDetailsVehicle} />
      </div>

      <WhyChooseUs />

      <div id="how">
        <HowItWorks />
      </div>

      <About />

      <Contact onSubmitted={() => {}} />

      <Footer onNav={scrollTo} />

      <AssistantButton onVehicleClick={(v) => setDetailsVehicle(v)} />
      <WhatsAppButton />

      <VehicleDetailsModal
        vehicle={detailsVehicle}
        open={!!detailsVehicle}
        onClose={() => setDetailsVehicle(null)}
        onAction={handleAction}
      />
      <RentalBookingModal
        vehicle={rentVehicle}
        open={!!rentVehicle}
        onClose={() => setRentVehicle(null)}
      />
      <EnquiryModal
        vehicle={enquiryVehicle}
        open={!!enquiryVehicle}
        onClose={() => setEnquiryVehicle(null)}
      />
    </div>
  );
}
