
import React, { useEffect, useRef } from 'react';
import { Distro } from '../types';

// Declare Chart type from global scope
declare var Chart: any;

interface CompareProps {
  selectedDistros: Distro[];
  onRemoveFromCompare: (distroId: string) => void;
}

const Compare: React.FC<CompareProps> = ({ selectedDistros, onRemoveFromCompare }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null); // Use any for Chart.js instance from CDN
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

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartContainer.current && selectedDistros.length > 0) {
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: selectedDistros.map(d => d.name),
            datasets: [
              {
                label: 'RAM Mínima (GB)',
                data: selectedDistros.map(d => d.req.ram),
                backgroundColor: 'rgba(56, 142, 239, 0.7)',
                borderColor: 'rgba(56, 142, 239, 1)',
                borderWidth: 1,
              },
              {
                label: 'Almacenamiento Mínimo (GB)',
                data: selectedDistros.map(d => d.req.storage),
                backgroundColor: 'rgba(60, 179, 113, 0.7)',
                borderColor: 'rgba(60, 179, 113, 1)',
                borderWidth: 1,
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#F0F0F0' } }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: '#A0A0A0' },
                grid: { color: 'rgba(160, 160, 160, 0.2)' }
              },
              x: {
                ticks: { color: '#A0A0A0' },
                grid: { color: 'rgba(160, 160, 160, 0.2)' }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistros]);

  return (
    <div ref={containerRef}>
      <div className="bg-zinc-900/70 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Comparar Distribuciones</h2>
        <p className="text-center text-[#A0A0A0] mb-6">Analiza hasta 4 distros lado a lado. Selecciónalas en la pestaña "Explorar".</p>

        {selectedDistros.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {selectedDistros.map(distro => (
                <div key={distro.id} className="bg-zinc-800 p-2 rounded-lg flex items-center space-x-2">
                  <img src={distro.logo} alt={distro.name} className="w-6 h-6" />
                  <span className="text-white font-medium">{distro.name}</span>
                  <button onClick={() => onRemoveFromCompare(distro.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <i className="fas fa-times-circle"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="relative h-96">
              <canvas ref={chartContainer}></canvas>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-chart-bar text-5xl text-gray-600 mb-4"></i>
            <p className="text-[#A0A0A0]">No hay distribuciones seleccionadas para comparar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
