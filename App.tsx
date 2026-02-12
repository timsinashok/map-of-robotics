import React, { useState } from 'react';
import MapVisualization from './components/MapVisualization';
import DetailPanel from './components/DetailPanel';
import Controls from './components/Controls';
import { FULL_DATASET } from './data';

function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark (Tech) Mode
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('horizontal');
  const [zoomTrigger, setZoomTrigger] = useState<'in' | 'out' | 'fit' | null>(null);

  const handleNodeSelect = (nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  };

  const handleLayoutToggle = () => {
    setLayout(prev => prev === 'horizontal' ? 'vertical' : 'horizontal');
    setTimeout(() => setZoomTrigger('fit'), 50);
  };

  const selectedNode = selectedNodeId 
    ? FULL_DATASET.nodes.find(n => n.id === selectedNodeId) || null
    : null;

  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-full`}>
      <div className="w-full h-screen bg-[#e2e8f0] dark:bg-[#0b0c10] text-slate-800 dark:text-[#c5c6c7] overflow-hidden relative font-sans transition-colors duration-500 ease-in-out">
        
        {/* Visualization Canvas */}
        <MapVisualization 
          data={FULL_DATASET}
          onNodeSelect={handleNodeSelect}
          selectedNodeId={selectedNodeId}
          searchQuery={searchQuery}
          isDarkMode={isDarkMode}
          layout={layout}
          zoomAction={zoomTrigger}
          onZoomActionHandled={() => setZoomTrigger(null)}
        />

        {/* Global UI Controls */}
        <Controls 
          dataset={FULL_DATASET} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          layout={layout}
          onToggleLayout={handleLayoutToggle}
          onZoomIn={() => setZoomTrigger('in')}
          onZoomOut={() => setZoomTrigger('out')}
          onFitView={() => setZoomTrigger('fit')}
        />

        {/* Detail Overlay */}
        <div className={`absolute inset-y-0 right-0 z-30 transition-transform duration-300 ease-out ${selectedNode ? 'translate-x-0' : 'translate-x-full'}`}>
          <DetailPanel 
            node={selectedNode} 
            dataset={FULL_DATASET}
            onClose={() => setSelectedNodeId(null)}
            onSelectNode={setSelectedNodeId}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;