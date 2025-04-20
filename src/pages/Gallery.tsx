import React from "react";
import Navbar from "../components/global/Header";
import Footer from "../components/global/Footer";
import bottom from "../assets/images/bottom.png";
import { galleryImages } from "../data/galleryData";

const Gallery: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="relative">
        <div className="container mx-auto px-4 pt-12 pb-36 max-w-7xl">
          <h1 className="text-center text-5xl mb-12 text-gray-800">
            Our Gallery
          </h1>

          {/* Featured Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full mb-8">
            <div className="md:col-span-7 rounded-tl-2xl overflow-hidden group">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-[500px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-4">
              {galleryImages.slice(1, 3).map((image, index) => (
                <div
                  key={image.id}
                  className={`${
                    index === 0 ? "rounded-tr-2xl" : ""
                  } overflow-hidden group relative h-[240px]`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Main Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.slice(3).map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg h-[300px]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
        <img
          src={bottom}
          alt="M-style Stripes"
          className="absolute bottom-0 right-0 w-72 lg:w-80"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
