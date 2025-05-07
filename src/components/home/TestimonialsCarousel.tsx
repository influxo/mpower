import type React from "react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;

  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Philippe Dubost",

    rating: 5,
    text: "A team of conscientious and efficient professionals! After a front bumper collision, I was able to get a quick appointment. The boss is friendly and very attentive to his customers. The work is careful, the price announced and the deadlines are respected. Upon receipt, my vehicle had been washed. Really, I recommend 100%!",
  },
  {
    id: 2,
    name: "Arnaud Lacroix",

    rating: 5,
    text: "Very good bodywork, I highly recommend it for the quality of the work and the price, professional and clean work, also very warm welcome with a pleasant boss who knows his job very well. that's my personal experience in this garage, if you are in the area I recommend it without any worries.",
  },
  {
    id: 3,
    name: "Mathieu KOVACS -SQF WH-",

    rating: 5,
    text: "Very professional from A to Z. Quality work, attentive bodybuilder. Plus car cleaned! No questions to ask, you can go!",
  },
  {
    id: 4,
    name: "Faouzi Ajr",

    rating: 5,
    text: "Very professional bodybuilder, attentive & very friendly. The advice provided as well as the know-how of the employees exceeded my expectations. The end result is impeccable! I can only recommend. I will bring my second vehicle back to redo my front bumper.",
  },
  {
    id: 4,
    name: "Cindy Del-Valle",

    rating: 5,
    text: "A wonderful garage with a lot of humanity, quick support, and more than reliable repairs. I recommend 200%. Another big thank you to the garage for my car",
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

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

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
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10"></div>

                      <div className="text-7xl font-serif text-black absolute top-6 left-6">
                        "
                      </div>

                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-lg">
                          {currentTestimonial.name}
                        </h3>
                        <div className="flex justify-center mt-1">
                          <StarRating rating={currentTestimonial.rating} />
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
