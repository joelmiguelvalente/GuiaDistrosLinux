
import React, { useEffect, useRef } from 'react';
import { Distro } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  distro: Distro | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, distro }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (isOpen) {
      gsap.to('body', { overflow: 'hidden' });
      if (modalRef.current) {
        gsap.fromTo(modalRef.current, 
          { opacity: 0, scale: 0.95, y: -20 }, 
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' }
        );
      }
    } else {
      gsap.to('body', { overflow: 'auto' });
    }
  }, [isOpen]);

  if (!isOpen || !distro) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div ref={modalRef} className="bg-zinc-900 rounded-2xl border border-gray-700/50 shadow-2xl max-w-3xl w-full p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl">
          <i className="fas fa-times"></i>
        </button>
        
        <div className="flex items-center mb-6">
            <img src={distro.logo} alt={`${distro.name} Logo`} className="w-20 h-20 mr-6" />
            <div>
                <h2 className="text-4xl font-bold text-white">{distro.name}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {distro.tags.map(tag => (
                    <span key={tag} className="text-sm bg-gray-700 text-gray-300 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
        </div>

        <p className="text-[#A0A0A0] mb-6">{distro.longDescription}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2"><i className="fas fa-cogs mr-2"></i>Requisitos Mínimos</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                    <li><strong>CPU:</strong> {distro.req.cpu}</li>
                    <li><strong>RAM:</strong> {distro.req.ram} GB</li>
                    <li><strong>Almacenamiento:</strong> {distro.req.storage} GB</li>
                </ul>
            </div>
            {distro.req_rec && (
                <div className="bg-zinc-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-400 mb-2"><i className="fas fa-rocket mr-2"></i>Requisitos Recomendados</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                        <li><strong>CPU:</strong> {distro.req_rec.cpu}</li>
                        <li><strong>RAM:</strong> {distro.req_rec.ram} GB</li>
                        <li><strong>Almacenamiento:</strong> {distro.req_rec.storage} GB</li>
                    </ul>
                </div>
            )}
        </div>
        
        <div className={`bg-zinc-800 p-4 rounded-lg mb-6 ${!distro.req_rec ? 'md:col-span-2' : ''}`}>
             <h4 className="font-semibold text-purple-400 mb-2"><i className="fas fa-user-check mr-2"></i>Perfil Ideal</h4>
             <ul className="text-sm text-gray-300 space-y-1 capitalize">
                <li><strong>Experiencia:</strong> {distro.experience}</li>
                <li><strong>Caso de Uso:</strong> {distro.useCase}</li>
                <li><strong>Base:</strong> {distro.base}</li>
             </ul>
        </div>

        <div className="text-center">
            <a href={distro.links.homepage} target="_blank" rel="noopener noreferrer" className="bg-[#388EEF] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-blue-500 hover:glow-effect">
                <i className="fas fa-home mr-2"></i>Visitar Sitio Web
            </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;