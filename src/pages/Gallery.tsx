import React from "react";
import yellowCar from "../assets/images/yellow-car.png";
import service1 from "../assets/images/services-1.png";
import service2 from "../assets/images/services-2.png";
import service4 from "../assets/images/services-4.png";
import historyCar from "../assets/images/history-car-section.png";
import aboutCar from "../assets/images/home-about.png";
import Navbar from "../components/global/Header";
import Footer from "../components/global/Footer";
import bottom from "../assets/images/bottom.png";

const Gallery: React.FC = () => {
  return (
    <div>
      <Navbar />

      <div className="relative">
        <div className="container mx-auto px-4 pt-12 pb-36 max-w-7xl">
          <h1 className="text-center text-5xl mb-12 text-gray-800">
            Our Gallery
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
            <div className="md:col-span-7 rounded-tl-2xl overflow-hidden group">
              <img
                src={yellowCar}
                alt="Yellow vintage car parked in front of colorful building"
                width={750}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-4">
              <div className="rounded-tr-2xl overflow-hidden group relative">
                <img
                  src={service4}
                  alt="Luxury car interior dashboard"
                  width={500}
                  height={250}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="group relative overflow-hidden">
                <img
                  src={service2}
                  alt="White sports cars in parking lot"
                  width={500}
                  height={250}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
            </div>

            <div className="md:col-span-4 rounded-bl-2xl overflow-hidden group relative">
              <img
                src={aboutCar}
                alt="Gray BMW M4 at dusk"
                width={400}
                height={500}
                className="absolute h-full w-full inset-0 object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="md:col-span-4 overflow-hidden relative group">
              <img
                src={historyCar}
                alt="Black Porsche at sunset"
                width={400}
                height={500}
                className="absolute h-full w-full inset-0 object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>

            <div className="md:col-span-4 rounded-br-2xl overflow-hidden group">
              <img
                src={service1}
                alt="Gold BMW M4 parked"
                width={400}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
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
