
import React, { useRef, useEffect } from 'react';
import { Distro } from '../types';

interface DistroCardProps {
  distro: Distro;
  onCompareToggle: (distroId: string) => void;
  isComparing: boolean;
  onViewDetails: (distro: Distro) => void;
  isCompareFull: boolean;
}

const DistroCard: React.FC<DistroCardProps> = ({ distro, onCompareToggle, isComparing, onViewDetails, isCompareFull }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      const gsap = (window as any).gsap;
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, { y: -5, scale: 1.03, duration: 0.3, ease: 'power2.out' });
      });
      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    }
  }, []);

  const compareButtonClasses = `w-full font-semibold py-2 rounded-lg transition-all duration-300 ${
    isComparing 
      ? 'bg-blue-600 text-white glow-effect' 
      : `bg-zinc-700 text-gray-300 hover:bg-blue-500 hover:text-white ${isCompareFull ? 'opacity-50 cursor-not-allowed' : ''}`
  }`;
  
  const compareButtonText = isComparing ? 'En Comparación' : 'Añadir a Comparar';

  return (
    <div ref={cardRef} className="bg-zinc-900/70 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-lg p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img src={distro.logo} alt={`${distro.name} Logo`} className="w-16 h-16 mr-4" />
        <div>
          <h3 className="text-2xl font-bold text-white">{distro.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {distro.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-[#A0A0A0] text-sm mb-4 flex-grow">{distro.description}</p>
      <div className="mt-auto grid grid-cols-2 gap-3">
        <button 
          onClick={() => onViewDetails(distro)}
          className="w-full bg-zinc-600 text-gray-200 font-semibold py-2 rounded-lg hover:bg-zinc-500 transition-colors duration-300"
        >
          <i className="fas fa-info-circle mr-2"></i>Ver Detalles
        </button>
        <button 
          onClick={() => onCompareToggle(distro.id)}
          className={compareButtonClasses}
          disabled={isCompareFull}
        >
          <i className={`fas ${isComparing ? 'fa-check-circle' : 'fa-plus-circle'} mr-2`}></i>
          {compareButtonText}
        </button>
      </div>
    </div>
  );
};

export default DistroCard;
