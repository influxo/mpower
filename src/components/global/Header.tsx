import { useState } from "react";
import backgroundImage from "../../assets/images/background.png";
import MButton from "./MButton";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle hamburger menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div>
      <nav className="absolute top-0 left-0 right-0 z-10 py-8 text-white border-b border-gray-800">
        <div className="flex items-center w-full">
          <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="">
              Home
            </a>
            <a href="/services" className="">
              Services
            </a>
            <a href="/gallery" className="">
              Gallery
            </a>
          </div>

          {/* Hamburger Icon for Mobile (Right side on small screens) */}
          <button
            className="md:hidden text-3xl absolute right-4"
            onClick={toggleMenu}
          >
            &#9776;
          </button>
        </div>

        {/* Mobile Menu (Shown when isMenuOpen is true) */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } mt-4 space-y-4`}
        >
          <a href="/" className="block font-semibold">
            Home
          </a>
          <a href="/services" className="block font-semibold">
            Services
          </a>
          <a href="/gallery" className="block font-semibold">
            Gallery
          </a>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-4xl md:text-5xl mb-4 text-white">
            <span className="bg-[#171766]">Mpower </span> - Votre<br></br>{" "}
            carrossier d'excellence
          </h1>
          <p className="max-w-lg mb-6">
            Chez Mpower, nous mettons notre expertise au service de votre
            véhicule pour garantir un travail de
            <br />
            qualité haut de gamme. Que vous soyez un particulier, un
            professionnel ou une assurance, nous
            <br />
            prenons en charge toutes les marques et tous les types de
            <br /> véhicules avec un seul objectif : vous
            <br />
            offrir une prestation irréprochable.
          </p>
          <MButton text="Order Now" onClick={() => {}} />
        </div>
      </section>
    </div>
  );
}

export default Navbar;
