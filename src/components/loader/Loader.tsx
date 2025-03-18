import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import all logo SVGs
import bmwLogo from '../../assets/logos/bmw.svg';
import mercedesLogo from '../../assets/logos/mercedes.svg';
import audiLogo from '../../assets/logos/audi.svg';
import toyotaLogo from '../../assets/logos/toyota.svg';
import fordLogo from '../../assets/logos/ford.svg';
import lamborghiniLogo from '../../assets/logos/lamborghini.svg';
import porscheLogo from '../../assets/logos/porsche.svg';
import vwLogo from '../../assets/logos/vw.svg';
import ferrariLogo from '../../assets/logos/ferrari.svg';
import jaguarLogo from '../../assets/logos/jaguar.svg';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader = ({ onLoadingComplete }: LoaderProps) => {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Array of car brand logos
  const carLogos = [
    { src: bmwLogo, alt: 'BMW Logo' },
    { src: mercedesLogo, alt: 'Mercedes Logo' },
    { src: audiLogo, alt: 'Audi Logo' },
    { src: toyotaLogo, alt: 'Toyota Logo' },
    { src: ferrariLogo, alt: 'Ferrari Logo' },
    { src: fordLogo, alt: 'Ford Logo' },
    { src: jaguarLogo, alt: 'Jaguar Logo' },  
    { src: lamborghiniLogo, alt: 'Lamborghini Logo' },
    { src: porscheLogo, alt: 'Porsche Logo' },
    { src: vwLogo, alt: 'VW Logo' },
  ];

  useEffect(() => {
    let timeoutId: number | undefined;
    
    const changeLogoWithDelay = (index: number) => {
      if (index >= carLogos.length) {
        // All logos have been displayed, complete loading
        setProgress(100); // Ensure progress bar is complete
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(onLoadingComplete, 100);
        }, 300); // Give a bit more time to see the completed progress bar
        return;
      }
      
      // Update current logo index and progress
      setCurrentLogoIndex(index);
      setProgress(Math.floor((index / carLogos.length) * 100));
      
      // Schedule next logo change
      timeoutId = window.setTimeout(() => {
        changeLogoWithDelay(index + 1);
      }, 120);
    };
    
    // Start the logo animation sequence with a short delay
    timeoutId = window.setTimeout(() => {
      changeLogoWithDelay(0);
    }, 400);
    
    // Clean up on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [carLogos.length, onLoadingComplete]);

  // Get current logo
  const currentLogo = carLogos[currentLogoIndex];
  
  // Calculate the circle circumference and stroke-dasharray values
  const radius = 70; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  
  // Define the segment boundaries
  const FIRST_SEGMENT_END = 33.33;
  const SECOND_SEGMENT_END = 66.66;
  
  // Calculate which segment is active and its progress
  let activeSegment = 1; // Start with segment 1
  let activeSegmentProgress = 0;
  
  if (progress <= FIRST_SEGMENT_END) {
    // First segment is active (0-33.33%)
    activeSegment = 1;
    activeSegmentProgress = progress / FIRST_SEGMENT_END; // Scale to 0-1 for this segment
  } else if (progress <= SECOND_SEGMENT_END) {
    // Second segment is active (33.33-66.66%)
    activeSegment = 2;
    activeSegmentProgress = (progress - FIRST_SEGMENT_END) / (SECOND_SEGMENT_END - FIRST_SEGMENT_END); // Scale to 0-1
  } else {
    // Third segment is active (66.66-100%)
    activeSegment = 3;
    activeSegmentProgress = (progress - SECOND_SEGMENT_END) / (100 - SECOND_SEGMENT_END); // Scale to 0-1
  }
  
  // Each segment is 1/3 of the circle
  const segmentSize = circumference / 3;
  
  // Calculate offsets for each segment
  const firstSegmentOffset = activeSegment >= 1 ? 
    segmentSize - (activeSegment === 1 ? activeSegmentProgress * segmentSize : segmentSize) : 
    segmentSize;
    
  const secondSegmentOffset = activeSegment >= 2 ? 
    segmentSize - (activeSegment === 2 ? activeSegmentProgress * segmentSize : segmentSize) : 
    segmentSize;
    
  const thirdSegmentOffset = activeSegment >= 3 ? 
    segmentSize - (activeSegment === 3 ? activeSegmentProgress * segmentSize : segmentSize) : 
    segmentSize;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Container for the entire rotating element */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Circular progress indicator */}
            <svg className="absolute w-48 h-48" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle 
                cx="80" 
                cy="80" 
                r={radius} 
                fill="transparent" 
                stroke="#333333" 
                strokeWidth="6"
              />
              
              {/* First segment (Blue - #27A6D1) - 0° to 120° */}
              <motion.path
                d={`M 80 10 A ${radius} ${radius} 0 0 1 ${80 + radius * Math.cos(Math.PI * 2/3 - Math.PI/2)} ${80 + radius * Math.sin(Math.PI * 2/3 - Math.PI/2)}`}
                fill="transparent"
                stroke="#27A6D1"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${segmentSize} ${circumference - segmentSize}`}
                strokeDashoffset={firstSegmentOffset}
                initial={{ strokeDashoffset: segmentSize }}
                animate={{ strokeDashoffset: firstSegmentOffset }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {/* Second segment (Dark Blue/Black - #1B1B26) - 120° to 240° */}
              <motion.path
                d={`M ${80 + radius * Math.cos(Math.PI * 2/3 - Math.PI/2)} ${80 + radius * Math.sin(Math.PI * 2/3 - Math.PI/2)} A ${radius} ${radius} 0 0 1 ${80 + radius * Math.cos(Math.PI * 4/3 - Math.PI/2)} ${80 + radius * Math.sin(Math.PI * 4/3 - Math.PI/2)}`}
                fill="transparent"
                stroke="#1B1B26"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${segmentSize} ${circumference - segmentSize}`}
                strokeDashoffset={secondSegmentOffset}
                initial={{ strokeDashoffset: segmentSize }}
                animate={{ strokeDashoffset: secondSegmentOffset }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {/* Third segment (Red - #E9331D) - 240° to 360° */}
              <motion.path
                d={`M ${80 + radius * Math.cos(Math.PI * 4/3 - Math.PI/2)} ${80 + radius * Math.sin(Math.PI * 4/3 - Math.PI/2)} A ${radius} ${radius} 0 0 1 80 10`}
                fill="transparent"
                stroke="#E9331D"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${segmentSize} ${circumference - segmentSize}`}
                strokeDashoffset={thirdSegmentOffset}
                initial={{ strokeDashoffset: segmentSize }}
                animate={{ strokeDashoffset: thirdSegmentOffset }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </svg>
            
            {/* Rotating inner circle with logo */}
            <motion.div
              className="w-40 h-40 rounded-full bg-black border-2 border-white flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
            >
              {/* Car logo - no transition effects, just instant change */}
              <div className="flex items-center justify-center">
                <img
                  src={currentLogo.src}
                  alt={currentLogo.alt}
                  className="w-32 h-32"
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8 text-white text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            MPower
          </motion.div>
          
          {/* Loading text */}
          <motion.div 
            className="mt-4 text-white text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {progress === 100 ? "Ready to launch..." : "Loading..."}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
