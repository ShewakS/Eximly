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
      <section className="relative h-[650px] flex items-center overflow-hidden bg-neutral-footer">
        {/* Background Image with Dark Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-footer/90 via-neutral-footer/70 to-transparent" />

        {/* Slanted Chevron Shape Overlay (pointing left) on the right edge */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[28%] bg-white hidden lg:block"
          style={{ clipPath: 'polygon(45px 0, 100% 0, 100% 100%, 45px 100%, 0 50%)' }}
        >
          {/* Subtle accent border inside chevron */}
          <div 
            className="absolute left-1.5 top-0 bottom-0 w-full bg-neutral-lightGray"
            style={{ clipPath: 'polygon(45px 0, 100% 0, 100% 100%, 45px 100%, 0 50%)' }}
          />
        </div>

        {/* Content Container */}
        <div className="container-max relative z-10 px-6">
          <div className="max-w-2xl text-white">
            <span className="text-ocean-light font-bold tracking-widest text-xs uppercase mb-3 block animate-pulse">
              Logistics & Transportation
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              Simplify Your Import-Export Management
            </h1>
            <p className="text-lg text-neutral-lightGray/80 mb-8 leading-relaxed max-w-xl">
              Eximly is a modern platform designed to streamline shipment tracking,
              export handling, and logistics workflows for businesses of all sizes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/login"
                className="bg-ocean-sky hover:bg-ocean-deep text-white font-bold text-sm px-8 py-3.5 rounded transition duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                GET STARTED <ArrowForwardIcon className="text-sm" />
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-neutral-dark text-white font-bold text-sm px-8 py-3.5 rounded transition duration-300 inline-flex items-center gap-2"
              >
                LEARN MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Powerful Features (About Us) Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image with overlay box */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-xl overflow-hidden shadow-2xl relative h-[450px]">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" 
                  alt="Logistics warehouse worker"
                  className="w-full h-full object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-darkBlue/10 hover:bg-transparent transition duration-300" />
              </div>
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-ocean-sky text-white p-6 rounded-lg shadow-2xl max-w-xs transition transform hover:scale-105">
                <p className="text-[10px] font-bold tracking-widest uppercase mb-1 text-ocean-light">
                  TRANSX EXCELLENCE
                </p>
                <h4 className="text-lg font-bold leading-snug">
                  Faster than you can imagine
                </h4>
              </div>
            </div>

            {/* Right content info */}
            <div className="lg:col-span-7">
              <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
                ABOUT US
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-darkBlue mb-6 leading-tight">
                Powerful Features of <span className="text-ocean-sky">Transportation</span> company
              </h2>
              <p className="text-neutral-gray text-base mb-8 leading-relaxed">
                Eximly provides a unified platform to coordinate, execute, and monitor your global shipments. 
                Our tool is custom built for modern trading networks, handling both domestic compliance and complex international documentation rules in under one minute.
              </p>

              {/* Bullet list with Check circles */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="text-ocean-sky text-xl mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-darkBlue text-base">Full Customs Compliance</h4>
                    <p className="text-sm text-neutral-gray">Automated validation of passports, tax documents, and declarations.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="text-ocean-sky text-xl mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-darkBlue text-base">Real-time Sea & Air Cargo Info</h4>
                    <p className="text-sm text-neutral-gray">Direct integrations for shipping schedules and tracking status updates.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="text-ocean-sky text-xl mt-0.5" />
                  <div>
                    <h4 className="font-bold text-neutral-darkBlue text-base">Conditional Document Workflows</h4>
                    <p className="text-sm text-neutral-gray">Dynamic form fields adapt instantly to selected destination countries.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Signature Section */}
      <section className="py-20 px-6 bg-neutral-lightGray border-y border-neutral-light">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-ocean-sky font-bold tracking-wider text-xs uppercase mb-2 block">
              OUR MISSION
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-darkBlue mb-6">
              Our mission is to give you good service
            </h2>
            <p className="text-neutral-gray text-base leading-relaxed mb-6 italic">
              "We believe logistics shouldn't be complex. By digitizing paperwork and automating compliance checks, we allow import-export companies to scale fast, transparently, and safely across borders."
            </p>
            <div className="flex flex-col items-center justify-center">
              <span className="font-serif italic text-2xl font-bold text-neutral-darkBlue">Andy Collins</span>
              <span className="text-xs text-neutral-gray font-bold tracking-wider uppercase mt-1">
                Andy Collins, CEO Eximly Inc.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Grid Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 text-neutral-darkBlue">
            Why Choose Eximly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white border border-neutral-light p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-6">
                <SpeedIcon className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-darkBlue">Fast & Efficient</h3>
              <p className="text-sm text-neutral-gray leading-relaxed">
                Create and submit export documentation in less than 1 minute.
              </p>
            </div>

            <div className="bg-white border border-neutral-light p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-6">
                <PublicIcon className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-darkBlue">Global Support</h3>
              <p className="text-sm text-neutral-gray leading-relaxed">
                Handle international exports with country-specific compliance checks.
              </p>
            </div>

            <div className="bg-white border border-neutral-light p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-6">
                <SecurityIcon className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-darkBlue">Secure & Safe</h3>
              <p className="text-sm text-neutral-gray leading-relaxed">
                Protected routes, token authentication, and data encryption.
              </p>
            </div>

            <div className="bg-white border border-neutral-light p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-center">
              <div className="w-12 h-12 rounded-full bg-ocean-sky/10 flex items-center justify-center text-ocean-sky mx-auto mb-6">
                <AssessmentIcon className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-darkBlue">Analytics Dashboard</h3>
              <p className="text-sm text-neutral-gray leading-relaxed">
                Monitor status updates, active orders, and completed trades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High Work Achievements Statistics Section */}
      <section className="py-20 bg-neutral-footer text-white px-6 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')",
          }}
        />
        <div className="container-max relative z-10 text-center">
          <span className="text-ocean-light font-bold tracking-wider text-xs uppercase mb-2 block">
            ACHIEVEMENTS
          </span>
          <h2 className="text-3xl font-extrabold mb-16 text-white">High Work Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-extrabold text-ocean-light mb-3">50</div>
              <div className="text-sm text-neutral-lightGray/70 font-semibold uppercase tracking-wider">
                Cities Around the World
              </div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-ocean-light mb-3">2M</div>
              <div className="text-sm text-neutral-lightGray/70 font-semibold uppercase tracking-wider">
                Happy Clients
              </div>
            </div>
            <div>
              <div className="text-6xl font-extrabold text-ocean-light mb-3">1.2M</div>
              <div className="text-sm text-neutral-lightGray/70 font-semibold uppercase tracking-wider">
                Delivered Goods
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ocean-deep py-20 px-6 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Streamline Your Logistics?</h2>
          <p className="text-lg text-neutral-lightGray/90 mb-8 max-w-xl mx-auto leading-relaxed">
            Join thousands of businesses using Eximly to manage their imports and exports, track shipments, and clear customs faster.
          </p>
          <Link 
            href="/auth/login" 
            className="bg-accent-orange hover:bg-accent-orangeHover inline-block text-white px-8 py-3.5 rounded font-bold text-sm transition duration-300 shadow-md hover:shadow-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
