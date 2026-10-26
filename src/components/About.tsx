export default function About() {
  return (
    <section id="about" className="bg-[#17191D] py-16 sm:py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96">
          <img
            src="/cars/about.jpg"
            alt="Scenic drive through mountains"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17191D]/60 to-transparent" />
        </div>

        <div>
          <span className="text-[#FF6B2C] text-sm font-bold tracking-wider">ABOUT VELOX MOTORS</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white text-balance">
            Your Journey Starts With the Right Car.
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            VELOX MOTORS brings together premium car rental and a curated dealership under one roof.
            Whether you need a dependable vehicle for the week or you're searching for your next car,
            we offer a carefully selected collection and a straightforward, transparent experience.
          </p>
          <p className="mt-4 text-white/70 leading-relaxed">
            Our focus is simple: quality vehicles, fair pricing, and a team that puts the customer first —
            so you can drive with confidence, whatever the journey.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-4">
            <Stat value="14+" label="Vehicles in fleet" />
            <Stat value="2" label="Services: rent & buy" />
            <Stat value="100%" label="Demo experience" />
          </div>
          <p className="mt-5 text-xs text-white/40">
            Company copy above is editable placeholder text — replace with the client's real brand story.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-4 rounded-xl bg-[#0B0B0D] border border-white/10 text-center">
      <div className="text-2xl font-extrabold text-[#FF6B2C]">{value}</div>
      <div className="mt-1 text-xs text-white/55">{label}</div>
    </div>
  );
}
