import Link from 'next/link';

// Material UI Icons
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ServicesPage() {
  const categories = [
    {
      title: 'Road Freight',
      desc: 'Domestic shipping across cities with optimized tracking and custom routing.',
      icon: <LocalShippingIcon className="text-3xl text-ocean-sky" />,
    },
    {
      title: 'Shipping/Freight',
      desc: 'Ocean cargo forwarding for bulk materials and global international goods.',
      icon: <DirectionsBoatIcon className="text-3xl text-ocean-sky" />,
    },
    {
      title: 'Airfreight',
      desc: 'Express air transport service for high-priority shipments requiring fast delivery.',
      icon: <FlightIcon className="text-3xl text-ocean-sky" />,
    },
    {
      title: 'Train Freight',
      desc: 'Rail logistics supporting cost-effective intercity and heavy machinery exports.',
      icon: <DirectionsRailwayIcon className="text-3xl text-ocean-sky" />,
    },
  ];

  const showcaseCards = [
    {
      id: '01',
      title: 'Road Freight',
      img: 'https://images.unsplash.com/photo-1592838064821-7ec14561c47a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '02',
      title: 'Train Freight',
      img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '03',
      title: 'Air Freight',
      img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '04',
      title: 'Ship Freight',
      img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Client Request',
      desc: 'Input shipment info, weights, origin and destination countries.',
    },
    {
      step: '02',
      title: 'Land Transporting',
      desc: 'Consolidated goods are loaded and routed to ports or air terminals.',
    },
    {
      step: '03',
      title: 'Clear Customs',
      desc: 'Documents and passports are validated to ensure compliance with export rules.',
    },
    {
      step: '04',
      title: 'Fast & Efficient Delivery',
      desc: 'Cargo is cleared and delivered successfully to final trade partners.',
    },
  ];

  return (
    <div className="bg-white text-neutral-dark">
      {/* Services Hero Section */}
      <section className="relative h-[300px] flex items-center overflow-hidden bg-neutral-footer">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-neutral-footer/70" />

        {/* Slanted Chevron Shape Overlay (pointing left) on the right edge */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[28%] bg-white hidden lg:block"
          style={{ clipPath: 'polygon(45px 0, 100% 0, 100% 100%, 45px 100%, 0 50%)' }}
        >
          <div 
            className="absolute left-1.5 top-0 bottom-0 w-full bg-neutral-lightGray"
            style={{ clipPath: 'polygon(45px 0, 100% 0, 100% 100%, 45px 100%, 0 50%)' }}
          />
        </div>

        {/* Content Container */}
        <div className="container-max relative z-10 px-6">
          <div className="max-w-xl text-white">
            <span className="text-ocean-light font-bold tracking-widest text-xs uppercase mb-2 block">
              OUR SPECIALTIES
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              Services
            </h1>
          </div>
        </div>
      </section>

      {/* Transportation Services Overview */}
      <section className="py-24 px-6 bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
              SERVICES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-darkBlue">
              Transportation Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((c, i) => (
              <div key={i} className="bg-white border border-neutral-light p-8 rounded-xl hover:shadow-lg transition duration-300">
                <div className="w-14 h-14 rounded-xl bg-ocean-sky/10 flex items-center justify-center mb-6">
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-neutral-darkBlue">{c.title}</h3>
                <p className="text-sm text-neutral-gray leading-relaxed mb-4">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase Section (We manage lead logistics for leadership) */}
      <section className="py-24 bg-neutral-lightGray border-y border-neutral-light px-6">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
              LOGISTICS EXPERTS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-darkBlue">
              We manage lead logistics for leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseCards.map((card, index) => (
              <div 
                key={index}
                className="group relative rounded-xl overflow-hidden shadow-lg h-[350px] cursor-pointer"
              >
                {/* Background Image */}
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-footer/90 via-neutral-footer/30 to-transparent" />

                {/* Card Title (Bottom Left) */}
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <h4 className="text-xl font-bold text-white mb-1">{card.title}</h4>
                  <span className="text-xs text-ocean-light tracking-wider font-semibold uppercase flex items-center gap-1.5">
                    Read More <ArrowForwardIcon className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Card Number (Bottom Right / overlay) */}
                <div className="absolute bottom-4 right-6 text-6xl font-black text-white/10 group-hover:text-ocean-sky/40 transition duration-300 select-none">
                  {card.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container-max">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
              OUR PROCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-darkBlue">
              How we works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Large Background Number */}
                <div className="text-7xl font-extrabold text-ocean-sky/15 group-hover:text-ocean-sky/35 transition duration-300 mb-4 select-none">
                  {step.step}
                </div>
                {/* Title and Desc */}
                <h3 className="text-lg font-bold text-neutral-darkBlue mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-gray leading-relaxed">
                  {step.desc}
                </p>
                {/* Line separator for desktop */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-8 border-t-2 border-dashed border-neutral-light z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Container */}
      <section className="bg-ocean-sky text-white py-16 px-6">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-white">
              Ready to Get Started?
            </h2>
            <p className="text-neutral-lightGray/95 max-w-lg">
              Join businesses worldwide using Eximly to streamline their import-export operations.
            </p>
          </div>
          <Link 
            href="/auth/login" 
            className="bg-neutral-footer hover:bg-neutral-dark text-white px-8 py-3.5 rounded font-bold text-sm transition duration-300 shadow-md inline-flex items-center gap-2"
          >
            Sign Up Now <ArrowForwardIcon className="text-sm" />
          </Link>
        </div>
      </section>
    </div>
  );
}
