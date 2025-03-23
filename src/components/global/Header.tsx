import { useState } from "react";
import backgroundImage from "../../assets/images/background.png";
import MButton from "./MButton";
import hamburger from "../../assets/images/hamburger-icon.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleButtonClick = () => {
    navigate("/");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // If element not found, scroll to bottom of page as fallback
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      }
    }, 100);
  }

  return (
    <div>
      <nav className="absolute top-0 left-0 right-0 z-20 py-8 text-white border-b border-gray-800">
        <div className="flex items-center w-full">
          <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
            <a href="/services" className="hover:text-gray-300">
              Services
            </a>
            <a href="/gallery" className="hover:text-gray-300">
              Gallery
            </a>
          </div>

          <button
            className="md:hidden text-3xl absolute right-4 z-30"
            onClick={toggleMenu}
          >
            <img src={hamburger} alt="Hamburger Menu" />
          </button>
        </div>

        <div
          className={`fixed top-0 right-0 h-screen w-2/3 bg-primary shadow-lg z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-xl text-white"
            onClick={toggleMenu}
          >
            ✕
          </button>
          <div className="flex flex-col items-center mt-20 space-y-6">
            <a href="/" className="text-lg" onClick={toggleMenu}>
              Home
            </a>
            <a href="/services" className="text-lg" onClick={toggleMenu}>
              Services
            </a>
            <a href="/gallery" className="text-lg" onClick={toggleMenu}>
              Gallery
            </a>
          </div>
        </div>
      </nav>

      <section className="relative h-[500px] md:h-[700px] flex items-center z-10">
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Luxury car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-white">
          <h1 className="text-4xl md:text-5xl mb-4">
            <span className="bg-[#171766] px-2 py-1 rounded-md">Mpower</span> -
            Votre
            <br />
            carrossier d'excellence
          </h1>
          <p className="max-w-lg mb-6">
            Chez Mpower, nous mettons notre expertise au service de votre
            véhicule pour garantir un travail de qualité haut de gamme. Que vous
            soyez un particulier, un professionnel ou une assurance, nous
            prenons en charge toutes les marques et tous les types de véhicules
            avec un seul objectif : vous offrir une prestation irréprochable.
          </p>
          <MButton text="Order Now" onClick={() => handleButtonClick()} />
        </div>
      </section>
    </div>
  );
}

export default Navbar;