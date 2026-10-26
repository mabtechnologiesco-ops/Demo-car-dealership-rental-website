import { useEffect, useState } from 'react';
import { Menu, X, Car } from 'lucide-react';
import { BRAND } from '@/data/vehicles';

interface Props {
  onExplore: () => void;
}

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Rent a Car', href: '#rentals' },
  { label: 'Buy a Car', href: '#sales' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onExplore }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0D]/95 glass border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
          className="flex items-center gap-2 text-white font-extrabold tracking-tight text-lg"
          aria-label={`${BRAND.name} home`}
        >
          <span className="w-8 h-8 rounded-lg bg-[#FF6B2C] flex items-center justify-center">
            <Car size={18} className="text-white" />
          </span>
          <span className="hidden sm:inline">{BRAND.name}</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled ? 'text-white/80 hover:text-white hover:bg-white/5' : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={onExplore}
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[#FF6B2C] text-white hover:bg-[#e85a1f] transition-colors"
          >
            Explore Cars
          </button>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B0B0D]/98 glass border-b border-white/10 animate-slide-up-panel">
          <div className="px-5 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-left px-4 py-3 rounded-lg text-white/85 hover:bg-white/5 font-medium"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onExplore(); }}
              className="mt-2 px-4 py-3 rounded-lg text-center font-semibold bg-[#FF6B2C] text-white"
            >
              Explore Cars
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
