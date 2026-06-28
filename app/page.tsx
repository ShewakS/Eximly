import Link from 'next/link';

// Material UI Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SpeedIcon from '@mui/icons-material/Speed';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Home() {
  return (
    <div className="bg-white text-neutral-dark">

      {/* ── Hero Banner Section ── */}
      <section className="hero-banner">
        {/* Background Image */}
        <div className="hero-bg-home" />
        
        {/* Gradient overlay */}
        <div className="hero-overlay" />
        
        {/* Slanted Chevron Shape */}
        <div className="hidden lg:block hero-chevron">
          <div className="hero-chevron-inner" />
        </div>

        {/* Content */}
        <div className="container-max relative z-10 px-6">
          <div className="hero-content">
            <span className="font-bold tracking-widest text-xs uppercase mb-3 block hero-eyebrow">
              Logistics &amp; Transportation
            </span>
            <h1 className="font-extrabold leading-tight mb-5 hero-title">
              Simplify Your Import-Export Management
            </h1>
            <p className="text-base mb-7 leading-relaxed hero-desc">
              Eximly is a modern platform designed to streamline shipment tracking,
              export handling, and logistics workflows for businesses of all sizes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/login" className="btn hero-cta-started">
                GET STARTED <ArrowForwardIcon className="icon-sm" />
              </Link>
              <Link href="/about" className="btn hero-cta-learn">
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Us / Features Section ── */}
      <section className="py-16 px-6 bg-white overflow-hidden">
        <div className="container-max px-6">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* Left Image */}
            <div className="about-img-container">
              <div className="about-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="Logistics warehouse worker"
                  className="about-img"
                />
                <div className="about-img-overlay" />
              </div>
              {/* Badge */}
              <div className="about-badge">
                <p className="font-bold tracking-widest uppercase mb-1 about-badge-title">
                  TRANSX EXCELLENCE
                </p>
                <h4 className="text-sm font-bold leading-snug about-badge-subtitle">Faster than you can imagine</h4>
              </div>
            </div>

            {/* Right Content */}
            <div className="pt-2">
              <span className="font-bold tracking-wider text-xs uppercase mb-2 block text-ocean-sky">
                ABOUT US
              </span>
              <h2 className="font-extrabold leading-tight mb-4 why-title text-neutral-darkBlue">
                Powerful Features of <span className="text-ocean-sky">Transportation</span> company
              </h2>
              <p className="text-sm mb-6 leading-relaxed text-neutral-gray">
                Eximly provides a unified platform to coordinate, execute, and monitor your global shipments.
                Our tool is custom built for modern trading networks, handling both domestic compliance and
                complex international documentation rules in under one minute.
              </p>

              <ul className="space-y-4">
                {[
                  {
                    title: 'Full Customs Compliance',
                    desc: 'Automated validation of passports, tax documents, and declarations.',
                  },
                  {
                    title: 'Real-time Sea & Air Cargo Info',
                    desc: 'Direct integrations for shipping schedules and tracking status updates.',
                  },
                  {
                    title: 'Conditional Document Workflows',
                    desc: 'Dynamic form fields adapt instantly to selected destination countries.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircleIcon className="check-icon" />
                    <div>
                      <h4 className="font-bold text-sm text-neutral-darkBlue">{item.title}</h4>
                      <p className="text-xs mt-1 text-neutral-gray">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Mission Section ── */}
      <section className="py-14 px-6 bg-neutral-lightGray border-t border-b border-neutral-light">
        <div className="container-max px-6">
          <div className="mission-container">
            <span className="font-bold tracking-wider text-xs uppercase mb-2 block text-ocean-sky">
              OUR MISSION
            </span>
            <h2 className="font-extrabold mb-4 text-neutral-darkBlue text-xl md:text-2xl">
              Our mission is to give you good service
            </h2>
            <p className="text-sm leading-relaxed mb-5 italic text-neutral-gray">
              &quot;We believe logistics shouldn&apos;t be complex. By digitizing paperwork and automating compliance
              checks, we allow import-export companies to scale fast, transparently, and safely across borders.&quot;
            </p>
            <div className="flex flex-col items-center justify-center">
              <span className="font-serif italic text-xl font-bold text-neutral-darkBlue">Andy Collins</span>
              <span className="text-xs font-bold tracking-wider uppercase mt-1 text-neutral-gray">
                Andy Collins, CEO Eximly Inc.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Section ── */}
      <section className="py-16 px-6 bg-white">
        <div className="container-max px-6">
          <h2 className="font-extrabold text-center mb-10 text-neutral-darkBlue why-title">
            Why Choose Eximly?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <SpeedIcon className="icon-sm" />, title: 'Fast & Efficient', desc: 'Create and submit export documentation in less than 1 minute.' },
              { icon: <PublicIcon className="icon-sm" />, title: 'Global Support', desc: 'Handle international exports with country-specific compliance checks.' },
              { icon: <SecurityIcon className="icon-sm" />, title: 'Secure & Safe', desc: 'Protected routes, token authentication, and data encryption.' },
              { icon: <AssessmentIcon className="icon-sm" />, title: 'Analytics Dashboard', desc: 'Monitor status updates, active orders, and completed trades.' },
            ].map((item) => (
              <div key={item.title} className="why-card rounded-xl text-center transition">
                <div className="why-icon-wrapper rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold mb-2 text-neutral-darkBlue">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Statistics Section ── */}
      <section className="py-14 px-6 relative overflow-hidden achievements-section">
        <div className="achievements-bg-img" />
        <div className="container-max relative z-10 text-center px-6">
          <span className="font-bold tracking-wider text-xs uppercase mb-2 block hero-eyebrow">
            ACHIEVEMENTS
          </span>
          <h2 className="text-2xl font-extrabold mb-10 text-white">High Work Achievements</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '50', label: 'Cities Around the World' },
              { value: '2M', label: 'Happy Clients' },
              { value: '1.2M', label: 'Delivered Goods' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-extrabold mb-2 achievements-number">{stat.value}</div>
                <div className="text-xs font-semibold uppercase tracking-wider achievements-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-14 px-6 text-white cta-section">
        <div className="container-max text-center px-6">
          <h2 className="font-extrabold mb-4 cta-title">
            Ready to Streamline Your Logistics?
          </h2>
          <p className="text-sm mb-6 leading-relaxed mx-auto cta-desc">
            Join thousands of businesses using Eximly to manage their imports and exports,
            track shipments, and clear customs faster.
          </p>
          <Link href="/auth/login" className="btn cta-button">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
