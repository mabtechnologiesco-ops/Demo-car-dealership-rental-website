import { Car, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { BRAND } from '@/data/vehicles';

interface Props {
  onNav: (href: string) => void;
}

export default function Footer({ onNav }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0D] border-t border-white/10 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <span className="w-8 h-8 rounded-lg bg-[#FF6B2C] flex items-center justify-center">
                <Car size={18} className="text-white" />
              </span>
              {BRAND.name}
            </div>
            <p className="mt-4 text-sm text-white/55 max-w-xs">
              Premium mobility, your way. Rent a quality vehicle or find your next car in our curated collection.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Social link placeholder"
                  className="w-9 h-9 rounded-lg bg-[#17191D] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#FF6B2C]/40 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore" links={[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Contact', href: '#contact' },
          ]} onNav={onNav} />

          <FooterCol title="Rentals" links={[
            { label: 'Rent a Car', href: '#rentals' },
            { label: 'Rental Fleet', href: '#rentals' },
            { label: 'How Rental Works', href: '#how' },
          ]} onNav={onNav} />

          <FooterCol title="Sales" links={[
            { label: 'Cars for Sale', href: '#sales' },
            { label: 'Featured Vehicle', href: '#featured' },
            { label: 'How Buying Works', href: '#how' },
          ]} onNav={onNav} />
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} {BRAND.name}. All rights reserved. Demo website — data is illustrative.</p>
          <p>Phone: {BRAND.phone} · {BRAND.email}</p>
        </div>
        <div className="mt-4 text-center text-xs text-white/40">
          Crafted by <span className="font-semibold text-white/70">MAB TECHNOLOGIES SL</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, onNav }: { title: string; links: { label: string; href: string }[]; onNav: (h: string) => void }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <button onClick={() => onNav(l.href)} className="text-sm text-white/55 hover:text-[#FF6B2C] transition-colors">
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
