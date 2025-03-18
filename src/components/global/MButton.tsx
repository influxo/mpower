import React from 'react';

interface MButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const MButton: React.FC<MButtonProps> = ({ text, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`relative group flex items-center justify-center px-10 py-4 bg-white text-black font-bold text-2xl transition-all duration-300 shadow-md hover:shadow-lg ${className}`}
    >
      {/* Colored stripes on the left */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-row group-hover:scale-x-[1.5] transition-transform duration-300 origin-left">
        <div className="w-1.5 h-full bg-[#27A6D1]"></div>
        <div className="w-1.5 h-full bg-[#1B1B26]"></div>
        <div className="w-1.5 h-full bg-[#E9331D]"></div>
      </div>
      
      {/* Button text */}
      <span className="ml-8">{text}</span>
    </button>
  );
};

export default MButton;
