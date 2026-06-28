import Link from 'next/link';

// Material UI Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ServicesPage() {
  const categories = [
    { title: 'Road Freight',     desc: 'Domestic shipping across cities with optimized tracking and custom routing.',              icon: <LocalShippingIcon className="service-icon" /> },
    { title: 'Shipping/Freight', desc: 'Ocean cargo forwarding for bulk materials and global international goods.',                icon: <DirectionsBoatIcon className="service-icon" /> },
    { title: 'Airfreight',       desc: 'Express air transport service for high-priority shipments requiring fast delivery.',       icon: <FlightIcon className="service-icon" /> },
    { title: 'Train Freight',    desc: 'Rail logistics supporting cost-effective intercity and heavy machinery exports.',           icon: <DirectionsRailwayIcon className="service-icon" /> },
  ];

  const showcaseCards = [
    { id: '01', title: 'Road Freight',  img: 'https://images.unsplash.com/photo-1592838064821-7ec14561c47a?auto=format&fit=crop&w=600&q=80' },
    { id: '02', title: 'Train Freight', img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80' },
    { id: '03', title: 'Air Freight',   img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80' },
    { id: '04', title: 'Ship Freight',  img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80' },
  ];

  const processSteps = [
    { step: '01', title: 'Client Request',           desc: 'Input shipment info, weights, origin and destination countries.' },
    { step: '02', title: 'Land Transporting',         desc: 'Consolidated goods are loaded and routed to ports or air terminals.' },
    { step: '03', title: 'Clear Customs',             desc: 'Documents and passports are validated to ensure compliance with export rules.' },
    { step: '04', title: 'Fast & Efficient Delivery', desc: 'Cargo is cleared and delivered successfully to final trade partners.' },
  ];

  return (
    <div className="bg-white text-neutral-dark">

      {/* ── Services Hero ── */}
      <section className="services-hero">
        <div className="services-hero-bg" />
        <div className="services-hero-overlay" />

        {/* Slanted Chevron */}
        <div className="hidden lg:block services-chevron">
          <div className="services-chevron-inner" />
        </div>

        <div className="container-max relative z-10 px-6">
          <div className="services-hero-content">
            <span className="font-bold tracking-widest text-xs uppercase mb-2 block hero-eyebrow">OUR SPECIALTIES</span>
            <h1 className="font-extrabold text-white mb-2 services-hero-title">Services</h1>
          </div>
        </div>
      </section>

      {/* ── Transportation Services Overview ── */}
      <section className="py-24 px-6 bg-white">
        <div className="container-max">
          <div className="services-section-header">
            <span className="font-bold tracking-wider text-xs uppercase mb-2 block text-ocean-sky">SERVICES</span>
            <h2 className="font-extrabold services-section-title text-neutral-darkBlue">Transportation Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((c, i) => (
              <div
                key={i}
                className="service-card"
              >
                <div className="rounded-xl flex items-center justify-center mb-6 service-icon-wrapper">
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-darkBlue">{c.title}</h3>
                <p className="text-sm leading-relaxed mb-4 text-neutral-gray">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image Showcase ── */}
      <section className="py-24 px-6 bg-neutral-lightGray border-t border-b border-neutral-light">
        <div className="container-max">
          <div className="services-section-header">
            <span className="font-bold tracking-wider text-xs uppercase mb-2 block text-ocean-sky">LOGISTICS EXPERTS</span>
            <h2 className="font-extrabold services-section-title text-neutral-darkBlue">We manage lead logistics for leadership</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseCards.map((card, index) => (
              <div
                key={index}
                className="showcase-card"
              >
                <img src={card.img} alt={card.title} className="showcase-card-img" />
                {/* Gradient overlay */}
                <div className="showcase-card-overlay" />
                {/* Title */}
                <div className="showcase-card-title-wrap">
                  <h4 className="text-xl font-bold text-white mb-1">{card.title}</h4>
                  <span className="text-xs font-semibold uppercase flex items-center gap-1 text-ocean-light tracking-wider">
                    Read More <ArrowForwardIcon className="showcase-card-link-icon" />
                  </span>
                </div>
                {/* Card number */}
                <div className="showcase-card-number">
                  {card.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section className="py-24 px-6 bg-white">
        <div className="container-max">
          <div className="services-section-header">
            <span className="font-bold tracking-wider text-xs uppercase mb-2 block text-ocean-sky">OUR PROCESS</span>
            <h2 className="font-extrabold services-section-title text-neutral-darkBlue">How we works</h2>
          </div>

          <div className="process-steps-container">
            {processSteps.map((step, index) => (
              <div key={index} className="relative process-step">
                <div className="process-step-number">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold mb-3 text-neutral-darkBlue">{step.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-gray">{step.desc}</p>
                {/* Dashed connector line */}
                {index < 3 && (
                  <div className="hidden lg:block process-step-connector" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-white bg-ocean-sky">
        <div className="container-max cta-section-services-wrap">
          <div>
            <h2 className="font-extrabold mb-2 text-white services-hero-title">Ready to Get Started?</h2>
            <p className="cta-desc-services">
              Join businesses worldwide using Eximly to streamline their import-export operations.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="btn cta-button-services text-white"
          >
            Sign Up Now <ArrowForwardIcon className="icon-sm" />
          </Link>
        </div>
      </section>
    </div>
  );
}
