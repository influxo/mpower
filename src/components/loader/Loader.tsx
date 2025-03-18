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
  
  // Track when each segment should start filling
  const [secondSegmentActive, setSecondSegmentActive] = useState(false);
  const [thirdSegmentActive, setThirdSegmentActive] = useState(false);
  
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
      }, 180);
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

  // Monitor progress and activate segments with delays
  useEffect(() => {
    // Define the segment boundaries
    const FIRST_SEGMENT_END = 33;
    const SECOND_SEGMENT_END = 66;
    
    // When first segment completes, activate second segment after delay
    if (progress > FIRST_SEGMENT_END && !secondSegmentActive) {
      const timer = setTimeout(() => {
        setSecondSegmentActive(true);
      }, 100);
      return () => clearTimeout(timer);
    }
    
    // When second segment completes, activate third segment after delay
    if (progress > SECOND_SEGMENT_END && !thirdSegmentActive) {
      const timer = setTimeout(() => {
        setThirdSegmentActive(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress, secondSegmentActive, thirdSegmentActive]);

  // Get current logo
  const currentLogo = carLogos[currentLogoIndex];
  
  // Define the segment boundaries
  const FIRST_SEGMENT_END = 33;
  const SECOND_SEGMENT_END = 66;
  
  // Calculate which segment is active and its progress
  let firstSegmentProgress = 0;
  let secondSegmentProgress = 0;
  let thirdSegmentProgress = 0;
  
  if (progress <= FIRST_SEGMENT_END) {
    // Only first segment is active
    firstSegmentProgress = progress / FIRST_SEGMENT_END;
  } else {
    // First segment is complete
    firstSegmentProgress = 1; // 100%
    
    // Second segment only starts after first is complete AND delay has passed
    if (secondSegmentActive) {
      secondSegmentProgress = Math.min((progress - FIRST_SEGMENT_END) / (SECOND_SEGMENT_END - FIRST_SEGMENT_END), 1);
      
      // Third segment only starts after second is complete AND delay has passed
      if (progress > SECOND_SEGMENT_END && thirdSegmentActive) {
        thirdSegmentProgress = (progress - SECOND_SEGMENT_END) / (100 - SECOND_SEGMENT_END);
      }
    }
  }

  // SVG arc path calculation
  const radius = 70;
  const center = { x: 80, y: 80 };
  
  // Create arc paths with larger gaps between them
  // Each arc covers approximately 105 degrees (instead of 120) to create the gaps
  
  // First segment: from -30° to 75° (105° arc)
  const firstSegmentPath = describeArc(center.x, center.y, radius, -30, 75);
  
  // Second segment: from 90° to 195° (105° arc)
  const secondSegmentPath = describeArc(center.x, center.y, radius, 90, 195);
  
  // Third segment: from 210° to 315° (105° arc)
  const thirdSegmentPath = describeArc(center.x, center.y, radius, 210, 315);
  
  // Calculate the length of each arc for the stroke-dasharray
  const arcLength = (105 / 360) * (2 * Math.PI * radius);

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
              {/* Solid black background circle */}
              <circle 
                cx={center.x} 
                cy={center.y} 
                r={radius + 3} // Slightly larger to ensure coverage
                fill="#000000" 
                stroke="none" 
              />
              
              {/* Gray background segments with gaps between them */}
              <path
                d={firstSegmentPath}
                fill="transparent"
                stroke="#333333"
                strokeWidth="6"
                strokeLinecap="butt"
              />
              <path
                d={secondSegmentPath}
                fill="transparent"
                stroke="#333333"
                strokeWidth="6"
                strokeLinecap="butt"
              />
              <path
                d={thirdSegmentPath}
                fill="transparent"
                stroke="#333333"
                strokeWidth="6"
                strokeLinecap="butt"
              />
              
              {/* First segment (Blue - #27A6D1) */}
              <motion.path
                d={firstSegmentPath}
                fill="transparent"
                stroke="#27A6D1"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeDasharray={`${arcLength} ${arcLength}`}
                strokeDashoffset={arcLength - (firstSegmentProgress * arcLength)}
                initial={{ strokeDashoffset: arcLength }}
                animate={{ strokeDashoffset: arcLength - (firstSegmentProgress * arcLength) }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {/* Second segment (Dark Blue/Black - #1B1B26) */}
              <motion.path
                d={secondSegmentPath}
                fill="transparent"
                stroke="#1B1B26"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeDasharray={`${arcLength} ${arcLength}`}
                strokeDashoffset={arcLength - (secondSegmentProgress * arcLength)}
                initial={{ strokeDashoffset: arcLength }}
                animate={{ strokeDashoffset: arcLength - (secondSegmentProgress * arcLength) }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {/* Third segment (Red - #E9331D) */}
              <motion.path
                d={thirdSegmentPath}
                fill="transparent"
                stroke="#E9331D"
                strokeWidth="6"
                strokeLinecap="butt"
                strokeDasharray={`${arcLength} ${arcLength}`}
                strokeDashoffset={arcLength - (thirdSegmentProgress * arcLength)}
                initial={{ strokeDashoffset: arcLength }}
                animate={{ strokeDashoffset: arcLength - (thirdSegmentProgress * arcLength) }}
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

// Helper function to create SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  // Convert angles from degrees to radians
  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;
  
  // Calculate start and end points
  const startX = x + radius * Math.cos(startAngleRad);
  const startY = y + radius * Math.sin(startAngleRad);
  const endX = x + radius * Math.cos(endAngleRad);
  const endY = y + radius * Math.sin(endAngleRad);
  
  // Determine if the arc should be drawn in a clockwise or counterclockwise direction
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  // Create the SVG path string
  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
}

export default Loader;
