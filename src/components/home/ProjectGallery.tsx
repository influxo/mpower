import React, { useState, forwardRef } from "react";

const ProjectGallery = forwardRef<HTMLDivElement>((_, ref) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [sliderPositions, setSliderPositions] = useState<number[]>(
    Array(4).fill(50)
  );
  const [isDraggingIndex, setIsDraggingIndex] = useState<number | null>(null);

  // Create pairs of before/after images
  const projects = [
    {
      id: 1,
      backgroundImage:
        "/images/gallery/0BD79194-22C8-48A4-857C-4D19E37D22BA_1_105_c.jpeg",
      heroImage:
        "/images/gallery/9127B10B-DDC3-4399-8494-01256A85745A_1_105_c.jpeg",
    },
    {
      id: 2,
      backgroundImage:
        "/images/gallery/0BD79194-22C8-48A4-857C-4D19E37D22BA_1_105_c.jpeg",
      heroImage:
        "/images/gallery/9127B10B-DDC3-4399-8494-01256A85745A_1_105_c.jpeg",
    },
    {
      id: 3,
      backgroundImage:
        "/images/gallery/0BD79194-22C8-48A4-857C-4D19E37D22BA_1_105_c.jpeg",
      heroImage:
        "/images/gallery/9127B10B-DDC3-4399-8494-01256A85745A_1_105_c.jpeg",
    },
    {
      id: 4,
      backgroundImage:
        "/images/gallery/0BD79194-22C8-48A4-857C-4D19E37D22BA_1_105_c.jpeg",
      heroImage:
        "/images/gallery/9127B10B-DDC3-4399-8494-01256A85745A_1_105_c.jpeg",
    },
  ];

  const handleMove = (clientX: number, rect: DOMRect, index: number) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPositions((prev) => {
      const newPositions = [...prev];
      newPositions[index] = percent;
      return newPositions;
    });
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (isDraggingIndex !== index) return;
    const rect = event.currentTarget.getBoundingClientRect();
    handleMove(event.clientX, rect, index);
  };
  const handleWhatsAppRedirect = () => {
    // The phone number should be in international format without any special characters
    const phoneNumber = "0650397387"; // French number format: +33 6 17 54 25 87
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

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    if (isDraggingIndex !== index) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      handleMove(touch.clientX, rect, index);
    }
  };

  return (
    <div ref={ref} className="bg-white px-[4%] py-16 lg:py-28">
      <div className="text-center mb-12">
        <h5 className="font-semibold mb-4 text-xl text-[#171766]">
          Nos Réalisations Avant/Après
        </h5>
        <h1 className="text-5xl font-bold text-black leading-tight">
          Slidez de gauche à droite
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-x-10 mt-12">
        <div className="flex lg:flex-col justify-between lg:flex-wrap gap-x-2 lg:gap-x-0 gap-y-6 mb-6 lg:mb-0">
          {/* Display Thumbnails */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-comparison relative w-[80px] md:w-[110px] md:h-[110px] xl:w-[120px] h-[80px] xl:h-[100px] border rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out ${
                selectedProjectIndex === index
                  ? "border-[#171766]"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedProjectIndex(index)}
            >
              <img
                alt={`Project ${project.id}`}
                className="object-cover rounded-lg shadow-md w-full h-full"
                src={project.heroImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Display Selected Project with Comparison */}
        {selectedProjectIndex !== null && (
          <div className="w-full relative">
            <div
              className="relative w-full h-full aspect-[16/9] overflow-hidden select-none rounded-xl shadow-lg"
              onMouseMove={(e) => handleMouseMove(e, selectedProjectIndex)}
              onTouchMove={(e) => handleTouchMove(e, selectedProjectIndex)}
              onMouseDown={() => setIsDraggingIndex(selectedProjectIndex)}
              onTouchStart={() => setIsDraggingIndex(selectedProjectIndex)}
              onMouseUp={() => setIsDraggingIndex(null)}
              onTouchEnd={() => setIsDraggingIndex(null)}
            >
              <img
                alt={`After Project ${selectedProjectIndex + 1}`}
                src={projects[selectedProjectIndex].heroImage}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                loading="lazy"
              />
              <div
                className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden select-none"
                style={{
                  clipPath: `inset(0 ${
                    100 - sliderPositions[selectedProjectIndex]
                  }% 0 0)`,
                }}
              >
                <img
                  alt={`Before Project ${selectedProjectIndex + 1}`}
                  loading="lazy"
                  src={projects[selectedProjectIndex].backgroundImage}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              </div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{
                  left: `calc(${sliderPositions[selectedProjectIndex]}% - 1px)`,
                }}
              >
                <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)] shadow-lg" />
              </div>
            </div>
          </div>
        )}
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
    </div>
  );
});

ProjectGallery.displayName = "ProjectGallery";

export default ProjectGallery;
