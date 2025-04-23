import React from "react";
import audihome from "../../assets/logos/audi-home.svg";
import bmwhome from "../../assets/logos/bmw-home.svg";

import mercedeshome from "../../assets/logos/mercedes-home.svg";
import peugeothome from "../../assets/logos/peugeot-home.svg";
import vwhome from "../../assets/logos/vw-home.svg";
import porsche from "../../assets/logos/porsche.jpg";
import maserati from "../../assets/logos/maserati.png";
import volvo from "../../assets/logos/volvo.png";
import renault from "../../assets/logos/renault.jpg";
import citroen from "../../assets/logos/citroen.png";

const BrandCard: React.FC<{
  imgSrc: string;
  altText: string;
  brandName: string;
}> = ({ imgSrc, altText, brandName }) => {
  return (
    <div className="bg-white rounded-md flex flex-col items-center justify-center h-32 p-4">
      <img src={imgSrc} alt={altText} className="h-20 object-contain" />
      <h1 className="text-black mb-4">{brandName}</h1>
    </div>
  );
};

const BrandsSection = () => {
  const brands = [
    { imgSrc: porsche, altText: "Porsche", brandName: "Porsche" },
    { imgSrc: bmwhome, altText: "BMW", brandName: "BMW" },
    { imgSrc: audihome, altText: "Audi", brandName: "Audi" },
    { imgSrc: mercedeshome, altText: "Mercedes", brandName: "Mercedes" },
    { imgSrc: vwhome, altText: "VW", brandName: "VW" },
    { imgSrc: maserati, altText: "Porsche", brandName: "Maserati" },
    { imgSrc: volvo, altText: "Porsche", brandName: "Volvo" },
    { imgSrc: renault, altText: "Porsche", brandName: "Renault" },
    { imgSrc: peugeothome, altText: "Peugeot", brandName: "Peugeot" },

    { imgSrc: citroen, altText: "Porsche", brandName: "Citroen" },
  ];

  return (
    <div>
      <section className="bg-[#1a2c3d] py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl md:text-4xl font-semibold text-white text-center mb-8">
            Les marques
          </h2>

          <div className="hidden md:block overflow-hidden">
            <div className="flex space-x-4 animate-slide">
              {[...brands, ...brands].map((brand, index) => (
                <div key={index} className="shrink-0">
                  <BrandCard {...brand} />
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden overflow-x-auto flex space-x-4 scrollbar-hide snap-x snap-mandatory scroll-smooth">
            {brands.map((brand, index) => (
              <div key={index} className="snap-center shrink-0 w-32">
                <BrandCard {...brand} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BrandsSection;
