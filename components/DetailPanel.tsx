import React from 'react';
import { NodeData, Dataset, Reference } from '../types';
import { X, ExternalLink, ArrowRight, Activity, Database, Cpu } from 'lucide-react';

interface DetailPanelProps {
  node: NodeData | null;
  dataset: Dataset;
  onClose: () => void;
  onSelectNode: (id: string) => void;
  isDarkMode: boolean;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ node, dataset, onClose, onSelectNode, isDarkMode }) => {
  if (!node) return null;

  const cluster = dataset.clusters[node.parent];
  const outgoing = dataset.edges.filter(e => e.source === node.id);
  const incoming = dataset.edges.filter(e => e.target === node.id);

  const panelClass = isDarkMode
    ? "bg-[#0b0c10]/95 border-l border-[#45a29e] text-[#c5c6c7]"
    : "bg-[#f1f5f9]/95 border-l border-slate-300 text-slate-800 shadow-2xl";

  const accentClass = isDarkMode ? "text-[#66fcf1]" : "text-blue-600";
  const borderClass = isDarkMode ? "border-[#45a29e]" : "border-slate-300";

  return (
    <div className={`fixed right-0 top-0 bottom-0 w-full sm:w-[500px] backdrop-blur-md z-30 transform transition-transform duration-300 ease-out shadow-2xl flex flex-col border ${panelClass}`}>
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(0deg, transparent 24%, ${isDarkMode ? '#66fcf1' : '#000'} 25%, ${isDarkMode ? '#66fcf1' : '#000'} 26%, transparent 27%, transparent 74%, ${isDarkMode ? '#66fcf1' : '#000'} 75%, ${isDarkMode ? '#66fcf1' : '#000'} 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, ${isDarkMode ? '#66fcf1' : '#000'} 25%, ${isDarkMode ? '#66fcf1' : '#000'} 26%, transparent 27%, transparent 74%, ${isDarkMode ? '#66fcf1' : '#000'} 75%, ${isDarkMode ? '#66fcf1' : '#000'} 76%, transparent 77%, transparent)`, backgroundSize: '50px 50px' }}>
      </div>

      {/* Header */}
      <div className={`relative p-8 pb-6 border-b ${borderClass} z-10`}>
        <div className="flex items-center justify-between mb-6">
           <div className={`flex items-center gap-2 px-2 py-1 text-[10px] font-mono tracking-widest uppercase border ${borderClass} ${accentClass}`}>
              <span className="w-2 h-2" style={{ backgroundColor: cluster?.color }}></span>
              {cluster?.name || 'SYSTEM CORE'}
           </div>
           <button 
            onClick={onClose}
            className={`p-2 hover:bg-white/10 transition-colors ${accentClass}`}
          >
            <X size={24} />
          </button>
        </div>
        
        <h1 className={`text-4xl font-display font-bold uppercase tracking-wide mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{node.name}</h1>
        <div className="flex items-center gap-2 mb-4 opacity-60 font-mono text-xs">
            <span>ID: {node.id}</span>
            <span>//</span>
            <span>TYPE: {node.kind.toUpperCase()}</span>
        </div>
        
        <p className="text-lg leading-relaxed font-light border-l-2 pl-4 border-current opacity-80">
          {node.one_liner}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="relative flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar z-10">
        
        {/* Dependencies / Connections */}
        {(outgoing.length > 0 || incoming.length > 0) && (
          <div className="space-y-4">
            <h3 className={`text-sm font-bold font-display uppercase tracking-widest flex items-center gap-2 border-b pb-2 ${borderClass} opacity-70`}>
               <Activity size={16} /> System Links
            </h3>
            
            <div className="grid gap-2 font-mono text-xs">
              {incoming.map(e => {
                const src = dataset.nodes.find(n => n.id === e.source);
                if (!src) return null;
                return (
                  <button key={e.id} onClick={() => onSelectNode(src.id)} className={`group flex items-center justify-between p-3 border hover:bg-white/5 transition-all ${borderClass}`}>
                    <div className="flex items-center gap-3">
                        <ArrowRight size={14} className="rotate-180 opacity-50" />
                        <span className="uppercase tracking-wider">{src.name}</span>
                    </div>
                    <span className="opacity-40 text-[10px]">INPUT</span>
                  </button>
                )
              })}
              {outgoing.map(e => {
                const tgt = dataset.nodes.find(n => n.id === e.target);
                if (!tgt) return null;
                return (
                   <button key={e.id} onClick={() => onSelectNode(tgt.id)} className={`group flex items-center justify-between p-3 border hover:bg-white/5 transition-all ${borderClass}`}>
                    <div className="flex items-center gap-3">
                         <div className={`w-1.5 h-1.5 ${isDarkMode ? 'bg-[#66fcf1]' : 'bg-blue-600'}`}></div>
                        <span className="uppercase tracking-wider font-bold">{tgt.name}</span>
                    </div>
                     <span className="opacity-40 text-[10px]">OUTPUT</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* References */}
        <div className="space-y-4">
           <h3 className={`text-sm font-bold font-display uppercase tracking-widest flex items-center gap-2 border-b pb-2 ${borderClass} opacity-70`}>
              <Database size={16} /> Data Archives
            </h3>
            
            <div className="space-y-2">
              {(Object.values(dataset.refs) as Reference[]).slice(0, 3).map((ref) => (
                <div key={ref.id} className={`p-4 border relative overflow-hidden group hover:bg-white/5 transition-all ${borderClass}`}>
                   {/* Decoration corner */}
                   <div className={`absolute top-0 right-0 w-4 h-4 border-l border-b ${borderClass}`}></div>
                   
                  <div className="flex justify-between items-start mb-2">
                     <span className={`text-[10px] font-mono font-bold uppercase px-1 border ${borderClass} opacity-60`}>{ref.type}</span>
                     {ref.url && <a href={ref.url} target="_blank" rel="noreferrer" className={`opacity-50 hover:opacity-100 ${accentClass}`}><ExternalLink size={14} /></a>}
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-wide font-display mb-1 truncate">{ref.title}</h4>
                  <p className="text-xs font-mono opacity-50">{ref.authors[0]} et al. [{ref.year}]</p>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className={`p-4 border-t ${borderClass} z-10 bg-black/10`}>
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest opacity-60">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>SYSTEM ONLINE</span>
            </div>
            <span>ROBOMAP v2.4.0</span>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;