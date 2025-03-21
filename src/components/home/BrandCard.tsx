import React, { useState } from 'react';
import audihome from "../../assets/logos/audi-home.svg";
import bmwhome from "../../assets/logos/bmw-home.svg";
import fordhome from "../../assets/logos/ford-home.svg";
import mercedeshome from "../../assets/logos/mercedes-home.svg";
import peugeothome from "../../assets/logos/peugeot-home.svg";
import vwhome from "../../assets/logos/vw-home.svg";

// BrandCard Component
const BrandCard: React.FC<{ imgSrc: string; altText: string; brandName: string }> = ({ imgSrc, altText, brandName }) => {
  return (
    <div className="bg-white rounded-md flex flex-col items-center justify-center h-32 p-4">
      <img src={imgSrc} alt={altText} className="h-20 object-contain" />
      <h1 className="text-black mb-4">{brandName}</h1>
    </div>
  );
};

// BrandsSection Component
const BrandsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % brands.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex: number) =>
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

        {/* For Mobile (Carousel) */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <button onClick={prevSlide} className="bg-white p-2 rounded-full">
              <span>←</span>
            </button>
            <div className="flex-1 mx-4">
              <BrandCard {...brands[currentIndex]} />
            </div>
            <button onClick={nextSlide} className="bg-white p-2 rounded-full">
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;