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
      {/* TransX Hero Banner Section */}
      <section className="relative h-[520px] flex items-center overflow-hidden bg-neutral-footer">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80')",
            backgroundPosition: 'center 30%',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-footer/95 via-neutral-footer/75 to-neutral-footer/20" />

        {/* Slanted Chevron Shape Overlay — reduced width, cleaner right space */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[20%] bg-white hidden lg:block"
          style={{ clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 40px 100%, 0 50%)' }}
        >
          <div 
            className="absolute left-1.5 top-0 bottom-0 w-full bg-neutral-lightGray"
            style={{ clipPath: 'polygon(40px 0, 100% 0, 100% 100%, 40px 100%, 0 50%)' }}
          />
        </div>

        {/* Content Container */}
        <div className="container-max relative z-10 px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <span className="text-ocean-light font-bold tracking-widest text-xs uppercase mb-3 block">
              Logistics &amp; Transportation
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5">
              Simplify Your Import-Export Management
            </h1>
            <p className="text-base text-neutral-lightGray/80 mb-7 leading-relaxed max-w-lg">
              Eximly is a modern platform designed to streamline shipment tracking,
              export handling, and logistics workflows for businesses of all sizes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/login"
                className="bg-ocean-sky hover:bg-ocean-deep text-white font-bold text-sm px-7 py-3 rounded transition duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                GET STARTED <ArrowForwardIcon className="text-sm" />
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-neutral-dark text-white font-bold text-sm px-7 py-3 rounded transition duration-300 inline-flex items-center gap-2"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features (About Us) Section */}
      <section className="py-16 px-6 bg-white overflow-hidden">
        <div className="container-max px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Image with overlay box */}
            <div className="relative pb-2">
              <div className="rounded-xl overflow-hidden shadow-xl" style={{ height: '320px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
                  alt="Logistics warehouse worker"
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-darkBlue/10 hover:bg-transparent transition duration-300" />
              </div>
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-5 bg-ocean-sky text-white p-4 rounded-lg shadow-xl max-w-[220px] transition transform hover:scale-105">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-ocean-light">
                  TRANSX EXCELLENCE
                </p>
                <h4 className="text-sm font-bold leading-snug">
                  Faster than you can imagine
                </h4>
              </div>
            </div>

            {/* Right content info */}
            <div className="pt-2">
              <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
                ABOUT US
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-darkBlue mb-4 leading-tight">
                Powerful Features of <span className="text-ocean-sky">Transportation</span> company
              </h2>
              <p className="text-neutral-gray text-sm mb-6 leading-relaxed">
                Eximly provides a unified platform to coordinate, execute, and monitor your global shipments. 
                Our tool is custom built for modern trading networks, handling both domestic compliance and complex international documentation rules in under one minute.
              </p>

              {/* Bullet list with Check circles */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="text-ocean-sky text-xl mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-darkBlue text-sm">Full Customs Compliance</h4>
                    <p className="text-xs text-neutral-gray mt-0.5">Automated validation of passports, tax documents, and declarations.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="text-ocean-sky text-xl mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-darkBlue text-sm">Real-time Sea &amp; Air Cargo Info</h4>
                    <p className="text-xs text-neutral-gray mt-0.5">Direct integrations for shipping schedules and tracking status updates.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="text-ocean-sky text-xl mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-darkBlue text-sm">Conditional Document Workflows</h4>
                    <p className="text-xs text-neutral-gray mt-0.5">Dynamic form fields adapt instantly to selected destination countries.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Signature Section */}
      <section className="py-14 px-6 bg-neutral-lightGray border-y border-neutral-light">
        <div className="container-max px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
              OUR MISSION
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-neutral-darkBlue mb-4">
              Our mission is to give you good service
            </h2>
            <p className="text-neutral-gray text-sm leading-relaxed mb-5 italic">
              &quot;We believe logistics shouldn&apos;t be complex. By digitizing paperwork and automating compliance checks, we allow import-export companies to scale fast, transparently, and safely across borders.&quot;
            </p>
            <div className="flex flex-col items-center justify-center">
              <span className="font-serif italic text-xl font-bold text-neutral-darkBlue">Andy Collins</span>
              <span className="text-xs text-neutral-gray font-bold tracking-wider uppercase mt-1">
                Andy Collins, CEO Eximly Inc.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Grid Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container-max px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10 text-neutral-darkBlue">
            Why Choose Eximly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-neutral-light p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-11 h-11 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-4">
                <SpeedIcon className="text-xl" />
              </div>
              <h3 className="text-base font-bold mb-2 text-neutral-darkBlue">Fast &amp; Efficient</h3>
              <p className="text-xs text-neutral-gray leading-relaxed">
                Create and submit export documentation in less than 1 minute.
              </p>
            </div>

            <div className="bg-white border border-neutral-light p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-11 h-11 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-4">
                <PublicIcon className="text-xl" />
              </div>
              <h3 className="text-base font-bold mb-2 text-neutral-darkBlue">Global Support</h3>
              <p className="text-xs text-neutral-gray leading-relaxed">
                Handle international exports with country-specific compliance checks.
              </p>
            </div>

            <div className="bg-white border border-neutral-light p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-11 h-11 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-4">
                <SecurityIcon className="text-xl" />
              </div>
              <h3 className="text-base font-bold mb-2 text-neutral-darkBlue">Secure &amp; Safe</h3>
              <p className="text-xs text-neutral-gray leading-relaxed">
                Protected routes, token authentication, and data encryption.
              </p>
            </div>

            <div className="bg-white border border-neutral-light p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-11 h-11 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-4">
                <AssessmentIcon className="text-xl" />
              </div>
              <h3 className="text-base font-bold mb-2 text-neutral-darkBlue">Analytics Dashboard</h3>
              <p className="text-xs text-neutral-gray leading-relaxed">
                Monitor status updates, active orders, and completed trades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High Work Achievements Statistics Section */}
      <section className="py-14 bg-neutral-footer text-white px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')",
          }}
        />
        <div className="container-max relative z-10 text-center px-6 lg:px-8">
          <span className="text-ocean-light font-bold tracking-wider text-xs uppercase mb-2 block">
            ACHIEVEMENTS
          </span>
          <h2 className="text-2xl font-extrabold mb-10 text-white">High Work Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-extrabold text-ocean-light mb-2">50</div>
              <div className="text-xs text-neutral-lightGray/70 font-semibold uppercase tracking-wider">
                Cities Around the World
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-ocean-light mb-2">2M</div>
              <div className="text-xs text-neutral-lightGray/70 font-semibold uppercase tracking-wider">
                Happy Clients
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-ocean-light mb-2">1.2M</div>
              <div className="text-xs text-neutral-lightGray/70 font-semibold uppercase tracking-wider">
                Delivered Goods
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ocean-deep py-14 px-6 text-white">
        <div className="container-max text-center px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Ready to Streamline Your Logistics?</h2>
          <p className="text-sm text-neutral-lightGray/90 mb-6 max-w-lg mx-auto leading-relaxed">
            Join thousands of businesses using Eximly to manage their imports and exports, track shipments, and clear customs faster.
          </p>
          <Link 
            href="/auth/login" 
            className="bg-accent-orange hover:bg-accent-orangeHover inline-block text-white px-7 py-3 rounded font-bold text-sm transition duration-300 shadow-md hover:shadow-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
