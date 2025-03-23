import type React from "react";
import { useState, useEffect } from "react";
import boy from "../../assets/images/testimonial-boy.png";
import girl from "../../assets/images/testimonial-girl.png";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Philippe Dubost",
    image: boy,
    rating: 5,
    text: "Une équipe de Pro consciencieuse et efficace ! Après un accrochage pare-chocs avant, j'ai pu obtenir un RDV rapide...",
  },
  {
    id: 2,
    name: "Sarah L. - Mic",
    image: girl,
    rating: 5,
    text: "The moment I test drove a HyperDash, I was sold. The acceleration is mind-blowing, and the handling is incredibly smooth...",
  },
  {
    id: 3,
    name: "Jean Martin",
    image: boy,
    rating: 5,
    text: "Service impeccable et professionnel. L'équipe a pris en charge ma voiture après un petit accident et le résultat est parfait...",
  },
];

const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setActiveIndex((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <div>
      <div className="relative py-16 overflow-hidden bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-16 text-center">
            Témoignages
          </h2>

          <div className="flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="relative overflow-hidden">
                <div className="flex justify-center">
                  <div className="w-full md:w-2/3 px-4 transition-opacity duration-500 ease-in-out opacity-100">
                    <div className="relative border border-black rounded-lg p-8 pt-16 mt-12 shadow-lg">
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-black shadow-md">
                          <img
                            src={currentTestimonial.image || "/placeholder.svg"}
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="text-7xl font-serif text-black absolute top-6 left-6">
                        "
                      </div>

                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-lg">
                          {currentTestimonial.name}
                        </h3>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-700 text-center">
                        {currentTestimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={goToPrevious}
                  className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
                  aria-label="Previous testimonial"
                  disabled={isAnimating}
                >
                  ←
                </button>
                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors"
                  aria-label="Next testimonial"
                  disabled={isAnimating}
                >
                  {" "}
                  →{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
