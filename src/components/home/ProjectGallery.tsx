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
      </div>
    </div>
  );
});

ProjectGallery.displayName = "ProjectGallery";

export default ProjectGallery;
