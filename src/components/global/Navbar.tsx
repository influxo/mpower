import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle hamburger menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="absolute top-0 left-0 right-0 z-10 py-8 text-white border-b border-gray-800">
      <div className="flex items-center w-full">

        {/* Navbar Links (Desktop and larger devices) */}
        <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <a href="/" className="">Home</a>
          <a href="/services" className="">Services</a>
          <a href="/gallery" className="">Gallery</a>
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
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} mt-4 space-y-4`}
      >
        <a href="/" className="block font-semibold">Home</a>
        <a href="/services" className="block font-semibold">Services</a>
        <a href="/gallery" className="block font-semibold">Gallery</a>
      </div>
    </nav>
  );
}

export default Navbar;