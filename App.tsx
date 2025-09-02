
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Wizard from './components/Wizard';
import Explorer from './components/Explorer';
import Compare from './components/Compare';
import Modal from './components/Modal';
import { distros } from './data/distros';
import { Distro } from './types';

const App: React.FC = () => {
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [selectedDistro, setSelectedDistro] = useState<Distro | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCompareToggle = useCallback((distroId: string) => {
    setComparisonList(prev => {
      if (prev.includes(distroId)) {
        return prev.filter(id => id !== distroId);
      }
      if (prev.length < 4) {
        return [...prev, distroId];
      }
      return prev;
    });
  }, []);
  
  const handleRemoveFromCompare = useCallback((distroId: string) => {
    setComparisonList(prev => prev.filter(id => id !== distroId));
  }, []);

  const handleViewDetails = useCallback((distro: Distro) => {
    setSelectedDistro(distro);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedDistro(null);
  }, []);

  const comparisonDistros = distros.filter(d => comparisonList.includes(d.id));

  return (
    <HashRouter>
      <div className="bg-[#121212] text-[#F0F0F0] min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Wizard distros={distros} onViewDetails={handleViewDetails} />} />
            <Route 
              path="/explorer" 
              element={
                <Explorer 
                  distros={distros} 
                  onCompareToggle={handleCompareToggle} 
                  comparisonList={comparisonList} 
                  onViewDetails={handleViewDetails} 
                />
              } 
            />
            <Route 
              path="/compare" 
              element={
                <Compare 
                  selectedDistros={comparisonDistros} 
                  onRemoveFromCompare={handleRemoveFromCompare}
                />
              } 
            />
          </Routes>
        </main>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} distro={selectedDistro} />
      </div>
    </HashRouter>
  );
};

export default App;
