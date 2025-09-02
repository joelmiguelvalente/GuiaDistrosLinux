
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Distro } from '../types';
import DistroCard from './DistroCard';

interface ExplorerProps {
  distros: Distro[];
  onCompareToggle: (distroId: string) => void;
  comparisonList: string[];
  onViewDetails: (distro: Distro) => void;
}

const Explorer: React.FC<ExplorerProps> = ({ distros, onCompareToggle, comparisonList, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterBase, setFilterBase] = useState('');
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

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    distros.forEach(d => d.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [distros]);

  const allBases = useMemo(() => {
      const bases = new Set<string>();
      distros.forEach(d => bases.add(d.base));
      return Array.from(bases).sort();
  }, [distros]);

  const filteredDistros = useMemo(() => {
    return distros.filter(distro => {
      const matchesSearch = distro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            distro.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !filterTag || distro.tags.includes(filterTag);
      const matchesBase = !filterBase || distro.base === filterBase;
      return matchesSearch && matchesTag && matchesBase;
    });
  }, [distros, searchTerm, filterTag, filterBase]);

  return (
    <div ref={containerRef}>
      <div className="bg-zinc-900/70 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-2xl mb-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Explorar Distribuciones</h2>
        <p className="text-center text-[#A0A0A0] mb-6">Busca y filtra en nuestra base de datos.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Buscar por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 p-3 pl-12 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <select 
            value={filterBase}
            onChange={(e) => setFilterBase(e.target.value)}
            className="bg-zinc-800 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-auto"
          >
            <option value="">Filtrar por Base</option>
            {allBases.map(base => (
              <option key={base} value={base}>{base}</option>
            ))}
          </select>
          <select 
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="bg-zinc-800 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none md:w-auto"
          >
            <option value="">Todas las etiquetas</option>
            {allTags.map(tag => (
              <option key={tag} value={tag} className="capitalize">{tag}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDistros.map(distro => (
          <DistroCard 
            key={distro.id} 
            distro={distro} 
            onCompareToggle={onCompareToggle}
            isComparing={comparisonList.includes(distro.id)}
            onViewDetails={onViewDetails}
            isCompareFull={comparisonList.length >= 4 && !comparisonList.includes(distro.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;