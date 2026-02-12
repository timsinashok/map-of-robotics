import React, { useState } from 'react';
import { Search, Layers, Moon, Sun, Plus, Minus, Maximize, Command, GalleryVertical, GalleryHorizontal, Terminal } from 'lucide-react';
import { Dataset, Cluster } from '../types';

interface ControlsProps {
  dataset: Dataset;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  layout: 'horizontal' | 'vertical';
  onToggleLayout: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
}

const Controls: React.FC<ControlsProps> = ({ 
    dataset, 
    searchQuery, 
    onSearchChange, 
    isDarkMode,
    onToggleTheme,
    layout,
    onToggleLayout,
    onZoomIn,
    onZoomOut,
    onFitView
}) => {
  const [legendOpen, setLegendOpen] = useState(false);

  // Tech / HUD Styles
  const dockClass = isDarkMode 
    ? "bg-[#1f2833]/90 border-[#45a29e] text-[#66fcf1]" 
    : "bg-white/95 border-slate-400 text-slate-800 shadow-xl";

  const btnClass = "p-3 hover:bg-[#66fcf1]/10 transition-colors flex items-center justify-center active:scale-95 border-r border-current last:border-0";
  const iconSize = 18;

  return (
    <>
      {/* Top HUD Bar (Search) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4">
        <div className={`relative group chamfer border backdrop-blur-md transition-all flex items-center ${dockClass}`}>
          <div className="pl-4 pr-3 opacity-60">
            <Terminal size={iconSize} />
          </div>
          <input 
            type="text" 
            placeholder="SEARCH DATABASE..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent border-none py-3 text-sm focus:outline-none placeholder-opacity-50 font-mono tracking-wider uppercase text-inherit"
          />
          <div className="pr-4 hidden sm:flex items-center gap-1 opacity-40 font-mono text-xs">
             [CTRL+K]
          </div>
        </div>
      </div>

      {/* Bottom Command Deck */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
         <div className={`chamfer border backdrop-blur-md flex items-center shadow-2xl ${dockClass}`}>
            
            {/* Zoom Cluster */}
            <div className="flex items-center">
                <button onClick={onZoomOut} className={btnClass} title="Zoom Out">
                    <Minus size={iconSize} />
                </button>
                <button onClick={onZoomIn} className={btnClass} title="Zoom In">
                    <Plus size={iconSize} />
                </button>
                <button onClick={onFitView} className={btnClass} title="Reset System View">
                    <Maximize size={iconSize} />
                </button>
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-current opacity-30 mx-1"></div>

            {/* View Cluster */}
            <div className="flex items-center">
                <button 
                    onClick={onToggleLayout}
                    className={btnClass}
                    title="Toggle Layout Geometry"
                >
                    {layout === 'horizontal' 
                        ? <GalleryVertical size={iconSize} /> 
                        : <GalleryHorizontal size={iconSize} />
                    }
                </button>

                 <button 
                    onClick={() => setLegendOpen(!legendOpen)}
                    className={`${btnClass} ${legendOpen ? 'bg-[#66fcf1]/20' : ''}`}
                    title="Toggle Legend Overlay"
                >
                    <Layers size={iconSize} />
                </button>
                
                <button 
                    onClick={onToggleTheme}
                    className={btnClass}
                    title="Toggle Visual Mode"
                >
                    {isDarkMode ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
                </button>
            </div>
         </div>
         {/* Decorative underbar */}
         <div className="w-full h-1 mt-1 bg-current opacity-20 flex justify-between">
            <div className="w-2 h-full bg-current"></div>
            <div className="w-2 h-full bg-current"></div>
         </div>
      </div>

      {/* Legend Overlay (Holographic) */}
      {legendOpen && (
        <div className={`fixed bottom-28 left-1/2 -translate-x-1/2 z-10 backdrop-blur-xl border p-6 chamfer shadow-2xl w-80 animate-in slide-in-from-bottom-6 fade-in duration-200 ${dockClass}`}>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-70 font-display border-b border-current pb-2">Sector Index</h3>
          <div className="grid grid-cols-1 gap-1 font-mono text-xs">
            {(Object.values(dataset.clusters) as Cluster[]).map((cluster, i) => (
              <div key={cluster.id} className="flex items-center gap-3 p-1 hover:bg-white/5 cursor-default">
                <span className="opacity-50">0{i + 1}</span>
                <div className="w-3 h-3" style={{ backgroundColor: cluster.color, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                <span className="uppercase tracking-wide opacity-90">{cluster.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Controls;