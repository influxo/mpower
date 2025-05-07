import React from "react";
import { MButton } from "../components/global";
// import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"
import Navbar from "../components/global/Header";
import about from "../assets/images/home-about.png";
import BrandCard from "../components/home/BrandCard";
import bottom from "../assets/images/bottom.png";
import service1 from "../assets/images/services-4.png";
import service2 from "../assets/images/services-3.png";
import service3 from "../assets/images/services-2.png";
import service4 from "../assets/images/services-1.png";
import historyCar from "../assets/images/history-car-section.png";
import up from "../assets/images/up.svg";
import TestimonialsCarouselImproved from "../components/home/TestimonialsCarousel";
import blueCar from "../assets/images/blue-car.png";
import Contact from "../components/home/Contact";
import Footer from "../components/global/Footer";
import ProjectGallery from "../components/home/ProjectGallery";
const handleWhatsAppRedirect = () => {
  // The phone number should be in international format without any special characters
  const phoneNumber = "33650397387"; // French number format: +33 6 17 54 25 87
  const message = encodeURIComponent(
    "Bonjour, je vous contacte depuis votre site web."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, "_blank");
};

// Function to check if the device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const Home: React.FC = () => {
  const handleButtonClick = () => {
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // If element not found, scroll to bottom of page as fallback
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const commitments = [
    {
      text: "Franchise offerte pour un max d'économie*",
    },
    "Pas d'avance de frais pour plus de tranquillité",
    "Véhicule de prêt selon la disponibilité",
    "Respect des délais pour une réparation rapide et efficace",
    "Collaboration avec toutes les assurances pour une gestion simplifiée",
    "Travail soigné pour votre satisfaction",
    "10 ans d'expérience",
    "Conseils personnalisés pour un accompagnement sur mesure",
  ];

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <Navbar />
      <BrandCard />

      {/* Commitments Section */}
      <section className="flex flex-col md:flex-row items-center relative">
        <div className="md:w-1/2 w-full relative">
          <img
            src={about}
            alt="Car interior"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-10 md:p-14 relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Nos engagements <br />- notre succès !
          </h2>
          <p className="my-12 text-gray-700 max-w-lg">
            Confiez votre véhicule à Mpower et bénéficiez d'une prise en charge
            sans stress ! Franchise offerte, pas d'avance de frais et un service
            rapide pour retrouver votre voiture en parfait état. Agréés par
            toutes les assurances, nous simplifions vos démarches avec un
            travail soigné et minutieux.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            {commitments.map((commitment, index) => (
              <div key={index} className="flex items-start space-x-2">
                <svg
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-[22px]"
                >
                  <path
                    d="M20.5936 0.0482542C16.5859 1.36373 11.477 4.88188 6.76573 10.9086L3.98181 7.81876C3.55352 7.32928 2.75811 7.32928 2.32981 7.81876L0.280113 10.1132C-0.117591 10.5721 -0.0869986 11.2451 0.341298 11.6428L6.64336 17.7002C7.16344 18.1896 8.02003 18.0673 8.38714 17.4248C11.7523 11.3369 15.3622 6.80921 21.4808 1.60847C22.215 0.966031 21.5419 -0.257671 20.5936 0.0482542Z"
                    fill="#171766"
                  />
                </svg>
                <div className="leading-tight">
                  {typeof commitment === "string" ? (
                    commitment
                  ) : (
                    <div className="group relative">
                      <span>{commitment.text}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isMobile() && (
              <div className="mb-8">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20M8.39 18.67C9.2 18.89 10.09 19 11 19C15.97 19 20 14.97 20 10C20 9.09 19.89 8.2 19.67 7.39L18.66 8.4C18.83 8.92 18.94 9.46 18.94 10C18.94 14.39 15.39 17.94 11 17.94C10.46 17.94 9.92 17.83 9.4 17.66L8.39 18.67M14.94 13.06L16.33 14.45C16.94 13.54 17.25 12.44 17.25 11.25C17.25 8.01 14.59 5.35 11.35 5.35C10.16 5.35 9.06 5.66 8.15 6.27L9.54 7.66C10.15 7.23 10.84 7 11.59 7C13.73 7 15.47 8.74 15.47 10.88C15.47 11.63 15.24 12.32 14.94 13.06Z" />
                  </svg>
                  Votre devis en 2 clics
                </button>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <MButton
              text="Contactez-nous"
              onClick={() => handleButtonClick()}
            />
          </div>
        </div>
        <img
          src={bottom}
          alt="M-style Stripes"
          className="absolute bottom-0 right-0"
        />
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex md:flex-row flex-col md:justify-between">
            <h2 className="text-3xl md:text-5xl mb-12 text-center">
              Nos services
            </h2>
            <p className="max-w-lg pb-12">
              Votre carrosserie mérite l'excellence — nous mettons notre
              expertise au service de chaque détail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-center">
            {[
              { img: service1, title: "Carrosserie & Peinture" },
              { img: service2, title: "Débosselage sans peinture" },
              { img: service3, title: "Réparation de jantes" },
              { img: service4, title: "Personnalisation sur mesure" },
            ].map((service, index) => (
              <div
                key={index}
                className="relative h-72 overflow-hidden group text-center"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-md p-4 text-white opacity-0 flex justify-center items-center group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-xl w-32">{service.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <MButton
              text="Contactez-nous"
              onClick={() => handleButtonClick()}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <ProjectGallery />

      {/* History Section */}
      <section className="relative">
        <div className="flex flex-col bg-[#1A1A1A] md:flex-row items-center">
          <img
            src={up}
            alt="Decorative stripes"
            className="absolute top-0 left-0 w-32 md:w-56"
          />
          <div className="md:w-1/2 text-white p-8 md:p-16 relative">
            <div className="max-w-md mb-6 mx-auto">
              <h2 className="text-3xl md:text-4xl mb-12">
                Mpower Auto - l'histoire
              </h2>
              <p className="mb-4">
                Créé il y a plusieurs années à Bourgoin-Jallieu, Mpower est né
                d'une passion pour l'automobile et d'une exigence de perfection.
                Spécialisés dans la carrosserie, la réparation de jantes et la
                personnalisation sur mesure, nous accompagnons aussi bien les
                particuliers que les professionnels dans la transformation et
                l'entretien de leur véhicule.
              </p>
              <p className="mb-4">
                Grâce à notre expertise et à des équipements modernes, nous
                assurons des interventions précises et soignées, toujours avec
                le souci du détail. Notre équipe met un point d'honneur à offrir
                un service rapide, efficace et adapté à chaque besoin. Notre
                engagement envers la satisfaction client se reflète dans les
                nombreux avis positifs laissés sur Google, témoignant de la
                qualité de notre travail et de la confiance de nos clients.
              </p>
              <p className="mb-12">
                Que ce soit pour redonner à votre voiture son éclat d'origine ou
                pour la personnaliser à votre image, Mpower vous garantit un
                travail de qualité, à la hauteur de vos exigences
              </p>
              <MButton
                text="Contactez-nous"
                onClick={() => handleButtonClick()}
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="h-full">
              <img
                src={historyCar}
                alt="Car at sunset"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarouselImproved />
      <section className="flex justify-center items-center md:py-24 py-10 px-4">
        <div className="relative w-full max-w-4xl">
          <div className="relative w-full">
            <img
              src={blueCar}
              alt="Car"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-10 text-white">
              <h1 className="text-xl md:text-3xl leading-tight mt-2">
                Osez la perfection, <br />
                au meilleur rapport qualité/prix
              </h1>
              <p className="mt-2 mb-4 text-sm md:text-lg text-gray-200">
                Prenez contact sans plus attendre !
              </p>
              <MButton
                text="Contactez-nous"
                onClick={() => handleButtonClick()}
              />
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
