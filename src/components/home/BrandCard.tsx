import React, { useState } from 'react';
import audihome from "../../assets/logos/audi-home.svg";
import bmwhome from "../../assets/logos/bmw-home.svg";
import fordhome from "../../assets/logos/ford-home.svg";
import mercedeshome from "../../assets/logos/mercedes-home.svg";
import peugeothome from "../../assets/logos/peugeot-home.svg";
import vwhome from "../../assets/logos/vw-home.svg";

// BrandCard Component
const BrandCard = ({ imgSrc, altText, brandName }) => {
  return (
    <div className="bg-white rounded-md flex flex-col items-center justify-center h-32 p-4">
      <img src={imgSrc} alt={altText} className="h-20 object-contain" />
      <h1 className="text-black mb-4">{brandName}</h1>
    </div>
  );
};

// BrandsSection Component
const BrandsSection = () => {
  const [ setCurrentIndex] = useState(0);
  const brands = [
    { imgSrc: audihome, altText: "Audi", brandName: "Audi" },
    { imgSrc: bmwhome, altText: "BMW", brandName: "BMW" },
    { imgSrc: fordhome, altText: "Ford", brandName: "Ford" },
    { imgSrc: mercedeshome, altText: "Mercedes", brandName: "Mercedes" },
    { imgSrc: peugeothome, altText: "Peugeot", brandName: "Peugeot" },
    { imgSrc: vwhome, altText: "VW", brandName: "VW" }
  ];

  // Logic for sliding left and right
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? brands.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="bg-[#1a2c3d] py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-4xl font-semibold text-white text-center mb-8">Les marques</h2>

        {/* For Large Screens (Grid Layout) */}
        <div className="hidden md:grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {brands.map((brand, index) => (
            <BrandCard key={index} {...brand} />
          ))}
        </div>

        {/* For Small Screens (Carousel) */}
        <div className="md:hidden relative">
          {/* Carousel Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full snap-start flex justify-center items-center"
              >
                <BrandCard {...brand} />
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
          >
            &#60;
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-2"
          >
            &#62;
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;