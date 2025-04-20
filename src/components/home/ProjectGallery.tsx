import React, { useState, forwardRef } from "react";
import { galleryImages } from "../../data/galleryData";

const ProjectGallery = forwardRef<HTMLDivElement>((_, ref) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const [sliderPositions, setSliderPositions] = useState<number[]>(
    Array(4).fill(50)
  );
  const [isDraggingIndex, setIsDraggingIndex] = useState<number | null>(null);

  // We'll show only 4 pairs of images (8 images total)
  const imagePairs = [];
  for (let i = 0; i < Math.min(8, galleryImages.length - 1); i += 2) {
    imagePairs.push({
      id: galleryImages[i].id,
      backgroundImage: galleryImages[i].src,
      heroImage: galleryImages[i + 1].src,
      altBefore: galleryImages[i].alt,
      altAfter: galleryImages[i + 1].alt,
    });
  }

  // Limit to 4 pairs
  const limitedImagePairs = imagePairs.slice(0, 4);

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
          Notre Galerie
        </h5>
        <h1 className="text-5xl font-bold text-black leading-tight">
          Découvrez nos réalisations
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-x-10 mt-12">
        <div className="flex lg:flex-col justify-between lg:flex-wrap gap-x-2 lg:gap-x-0 gap-y-6 mb-6 lg:mb-0">
          {/* Display Thumbnails - Limited to 4 */}
          {limitedImagePairs.map((pair, index) => (
            <div
              key={pair.id}
              className={`project-comparison relative w-[80px] md:w-[110px] md:h-[110px] xl:w-[120px] h-[80px] xl:h-[100px] border rounded-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out ${
                selectedProjectIndex === index
                  ? "border-[#171766]"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedProjectIndex(index)}
            >
              <img
                alt={pair.altAfter}
                className="object-cover rounded-lg shadow-md w-full h-full"
                src={pair.heroImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Display Selected Project with Comparison */}
        {selectedProjectIndex !== null &&
          limitedImagePairs[selectedProjectIndex] && (
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
                  alt={limitedImagePairs[selectedProjectIndex].altAfter}
                  src={limitedImagePairs[selectedProjectIndex].heroImage}
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
                    alt={limitedImagePairs[selectedProjectIndex].altBefore}
                    loading="lazy"
                    src={
                      limitedImagePairs[selectedProjectIndex].backgroundImage
                    }
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
