import React from "react";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import service4 from "../assets/images/services-4.png";
import service3 from "../assets/images/services-3.png";
import service2 from "../assets/images/services-2.png";
import service1 from "../assets/images/services-1.png";
import bottom from "../assets/images/bottom.png";
import bottomLeft from "../assets/images/bottom-left.png";

const OurServices: React.FC = () => {
  const services = [
    {
      title: "Carrosserie & Peinture",
      description:
        "Votre véhicule a subi un impact ou un accident ? Chez Mpower, nous remettons votre carrosserie à neuf avec des réparations de haute précision et une peinture haut de gamme. Grâce à nos équipements modernes et notre expertise, nous garantissons un rendu parfait et une finition éclatante, quelle que soit la marque de votre voiture.",
      image: service4,
      dark: true,
    },
    {
      title: "Débosselage sans peinture",
      description:
        "Fini les petites bosses et impacts disgracieux ! Notre technique de débosselage sans peinture permet de redresser la tôle sans endommager la peinture d’origine. Une solution rapide, efficace et économique pour redonner à votre véhicule son apparence initiale, sans nécessité de repeindre.",
      image: service3,
      dark: false,
    },
    {
      title: "Réparation de jantes",
      description:
        "Vos jantes sont rayées, voilées ou endommagées ? Nous leur redonnons une seconde vie grâce à des techniques de rénovation avancées. Polissage, redressage ou peinture personnalisée, nous assurons un travail de qualité pour un rendu impeccable et durable.",
      image: service2,
      dark: true,
    },
    {
      title: "Personnalisation sur mesure",
      description:
        "Envie de donner un style unique à votre voiture ? Nous réalisons des modifications sur mesure : covering, peinture personnalisée, jantes, kit carrosserie, sellerie ou encore éclairage LED. Transformez votre véhicule selon vos envies et démarquez-vous avec une finition haut de gamme et personnalisée.",
      image: service1,
      dark: false,
    },
  ];
  return (
    <div>
      <Header />
      <section className="py-12 relative">
        <div className="relative w-full mx-auto pb-12 h-56 flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-5xl text-gray-800 text-center">
            Our Services
          </h1>
          <img
            src={bottom}
            alt="M-style Stripes"
            className="absolute bottom-0 right-0 w-64 md:w-72"
          />
        </div>

        {services.map((service, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 items-center ${
              service.dark
                ? "bg-dark-gray text-white"
                : "bg-white text-gray-900"
            }`}
          >
            {index % 2 === 0 ? (
              <>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover md:h-96"
                />
                <div className="p-6 md:p-12">
                  <h2 className="text-2xl md:text-4xl mb-4">{service.title}</h2>
                  <p className="text-md max-w-md">{service.description}</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 md:p-12 lg:ml-32 ml-0">
                  <h2 className="text-2xl md:text-4xl mb-4">{service.title}</h2>
                  <p className="text-md max-w-md">{service.description}</p>
                </div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover md:h-96"
                />
              </>
            )}
          </div>
        ))}
      </section>

      <div className="w-full flex justify-start">
        <img src={bottomLeft} alt="M-style Stripes" className="w-40 md:w-52" />
      </div>
      <Footer />
    </div>
  );
};

export default OurServices;
