import { Search, FileText, KeyRound, Car, CalendarCheck, Phone, ClipboardCheck } from 'lucide-react';

const rentSteps = [
  { icon: Search, title: 'Browse Rentals', desc: 'Filter our rental fleet by category, transmission, and price.' },
  { icon: CalendarCheck, title: 'Pick Your Dates', desc: 'Choose pickup and return dates to see your estimated total.' },
  { icon: FileText, title: 'Submit Booking', desc: 'Fill in the demo booking form with your details and location.' },
  { icon: KeyRound, title: 'Get Your Reference', desc: 'Receive a temporary demo reference number for your records.' },
];

const buySteps = [
  { icon: Search, title: 'Explore Inventory', desc: 'Search our sales collection by make, price, and specs.' },
  { icon: Car, title: 'View Details', desc: 'Open a vehicle to see full specifications and pricing.' },
  { icon: Phone, title: 'Enquire to Buy', desc: 'Send a demo enquiry with your contact preferences.' },
  { icon: ClipboardCheck, title: 'We Follow Up', desc: 'Our team reaches out to discuss next steps (demo only).' },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#17191D] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">SIMPLE PROCESS</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">How It Works</h2>
          <p className="mt-3 text-white/65">Two straightforward journeys — rent or buy — in four simple steps.</p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <ProcessCard title="Rent a Car" steps={rentSteps} accent />
          <ProcessCard title="Buy a Car" steps={buySteps} />
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ title, steps, accent }: { title: string; steps: { icon: React.ElementType; title: string; desc: string }[]; accent?: boolean }) {
  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0B0B0D] border border-white/10">
      <h3 className={`text-xl font-extrabold ${accent ? 'text-[#FF6B2C]' : 'text-white'}`}>{title}</h3>
      <div className="mt-5 space-y-4">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#17191D] border border-white/10 flex items-center justify-center">
                <s.icon size={18} className="text-[#FF6B2C]" />
              </div>
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 -translate-x-1/2 w-px h-full bg-white/10" />
              )}
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/40">Step {i + 1}</span>
                <h4 className="font-semibold text-white">{s.title}</h4>
              </div>
              <p className="mt-1 text-sm text-white/60 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
