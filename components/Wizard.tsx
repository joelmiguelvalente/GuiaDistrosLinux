
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Distro } from '../types';

interface WizardProps {
  distros: Distro[];
  onViewDetails: (distro: Distro) => void;
}

const Wizard: React.FC<WizardProps> = ({ distros, onViewDetails }) => {
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced' | ''>('');
  const [useCase, setUseCase] = useState<'general' | 'development' | 'gaming' | 'privacy' | 'server' | 'lightweight' | ''>('');
  const [recommendations, setRecommendations] = useState<Distro[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      (window as any).gsap.from(containerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }, []);

  const handleRecommend = () => {
    let filtered = distros;

    if (cpu || ram) {
      const ramNum = parseInt(ram, 10);
      filtered = filtered.filter(d => {
        return !ram || isNaN(ramNum) || d.req.ram <= ramNum;
      });
    } else if (experience || useCase) {
      if (experience) {
        filtered = filtered.filter(d => d.experience === experience);
      }
      if (useCase) {
        filtered = filtered.filter(d => d.useCase === useCase || d.tags.includes(useCase));
      }
    }

    setRecommendations(filtered);
  };

  const isButtonDisabled = useMemo(() => {
    const hardwareFilled = cpu.trim() !== '' || ram.trim() !== '';
    const profileFilled = experience !== '' && useCase !== '';
    return !hardwareFilled && !profileFilled;
  }, [cpu, ram, experience, useCase]);
  
  const showAdvancedFields = useMemo(() => {
      return cpu.trim() === '' && ram.trim() === '';
  }, [cpu, ram]);

  const renderRecommendation = (distro: Distro) => (
    <div key={distro.id} className="bg-zinc-800/50 p-4 rounded-lg flex items-center justify-between transition-transform duration-300 hover:scale-105">
        <div className="flex items-center space-x-4">
            <img src={distro.logo} alt={`${distro.name} logo`} className="w-10 h-10" />
            <div>
                <h4 className="font-bold text-lg text-white">{distro.name}</h4>
                <p className="text-sm text-[#A0A0A0]">{distro.description}</p>
            </div>
        </div>
        <button onClick={() => onViewDetails(distro)} className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-500 transition-colors">
            Ver detalles
        </button>
    </div>
  );

  return (
    <div ref={containerRef}>
      <div className="bg-zinc-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Asistente de Recomendación</h2>
        <p className="text-center text-[#A0A0A0] mb-8">¿No sabes por dónde empezar? Déjanos ayudarte a encontrar la distro perfecta para ti.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Por Hardware</h3>
                <div className="space-y-4">
                    <input type="text" placeholder="CPU (ej. Intel i5, AMD Ryzen 5)" value={cpu} onChange={e => setCpu(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                    <input type="number" placeholder="RAM (en GB)" value={ram} onChange={e => setRam(e.target.value)} className="w-full bg-zinc-800 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
            </div>
            
            <div className={`transition-opacity duration-500 ${showAdvancedFields ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Por Perfil de Usuario</h3>
                 <div className="space-y-4">
                     <select value={experience} onChange={e => setExperience(e.target.value as any)} className="w-full bg-zinc-800 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                         <option value="">Selecciona tu experiencia</option>
                         <option value="beginner">Principiante</option>
                         <option value="intermediate">Intermedia</option>
                         <option value="advanced">Avanzada</option>
                     </select>
                     <select value={useCase} onChange={e => setUseCase(e.target.value as any)} className="w-full bg-zinc-800 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                         <option value="">Selecciona caso de uso</option>
                         <option value="general">Uso General</option>
                         <option value="development">Desarrollo</option>
                         <option value="gaming">Gaming</option>
                         <option value="privacy">Privacidad</option>
                         <option value="server">Servidor</option>
                         <option value="lightweight">Sistema Ligero</option>
                     </select>
                 </div>
            </div>
        </div>
        
        <div className="text-center">
            <button onClick={handleRecommend} disabled={isButtonDisabled} className="bg-[#388EEF] text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:glow-effect-none hover:glow-effect">
                Obtener Recomendación
            </button>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Recomendaciones para ti</h3>
            <div className="space-y-4 max-w-3xl mx-auto">
                {recommendations.map(renderRecommendation)}
            </div>
        </div>
      )}
    </div>
  );
};

export default Wizard;
