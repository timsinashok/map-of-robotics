import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Dataset } from '../types';

interface MapVisualizationProps {
  data: Dataset;
  onNodeSelect: (nodeId: string | null) => void;
  selectedNodeId: string | null;
  searchQuery: string;
  isDarkMode: boolean;
  layout: 'horizontal' | 'vertical';
  zoomAction: 'in' | 'out' | 'fit' | null;
  onZoomActionHandled: () => void;
}

// Configuration for Tech Layout
const NODE_WIDTH = 260;
const NODE_HEIGHT = 85; 

// Orthogonal Spacing
const H_MODE_SIBLING_GAP = 100; 
const H_MODE_LEVEL_GAP = 350;   

const V_MODE_SIBLING_GAP = 280; 
const V_MODE_LEVEL_GAP = 150;   

const DURATION = 500;

const MapVisualization: React.FC<MapVisualizationProps> = ({ 
  data, 
  onNodeSelect, 
  selectedNodeId,
  searchQuery,
  isDarkMode,
  layout,
  zoomAction,
  onZoomActionHandled
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  
  const rootRef = useRef<d3.HierarchyNode<any> | null>(null);
  const [tick, setTick] = useState(0);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (wrapperRef.current) {
        setDimensions({
          width: wrapperRef.current.clientWidth,
          height: wrapperRef.current.clientHeight
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Recursive Hierarchy Builder (Support for 4+ Levels) ---
  useEffect(() => {
    // 1. Create a map of all items (Root + Clusters + Nodes)
    const itemMap = new Map<string, any>();

    // Root
    const rootData = {
      id: "ROOT",
      name: "Robotics Core",
      kind: "root",
      one_liner: "System Architecture",
      children: [] as any[]
    };
    itemMap.set("ROOT", rootData);

    // Clusters (Level 1)
    Object.values(data.clusters).forEach((c: any) => {
      const clusterNode = {
        ...c,
        kind: "cluster",
        parent: "ROOT", // Clusters always attached to root in this schema
        one_liner: "Sector 0" + (Object.keys(data.clusters).indexOf(c.id) + 1), // Fake tech data
        children: []
      };
      itemMap.set(c.id, clusterNode);
    });

    // Nodes (Level 2+)
    data.nodes.forEach(n => {
      itemMap.set(n.id, { ...n, children: [] });
    });

    // 2. Link items to their parents
    itemMap.forEach((node) => {
      if (node.id === "ROOT") return;

      const parentId = node.parent;
      const parent = itemMap.get(parentId);

      if (parent) {
        parent.children.push(node);
      } else {
        // Fallback: If parent not found (or data issue), attach to ROOT
        rootData.children.push(node);
      }
    });

    // 3. D3 Hierarchy
    const root = d3.hierarchy(rootData);
    
    // Initial Collapse Logic: Open Root -> Clusters, Collapse Clusters -> Children
    root.children?.forEach(cluster => {
        if (cluster.children) {
            (cluster as any)._children = cluster.children;
            cluster.children = null;
        }
    });

    root.x0 = 0;
    root.y0 = 0;

    rootRef.current = root;
    setTick(t => t + 1);
  }, [data]);


  // D3 Rendering Logic
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || !rootRef.current) return;

    const svg = d3.select(svgRef.current);
    let g = svg.select<SVGGElement>("g.main-group");
    if (g.empty()) {
        g = svg.append("g").attr("class", "main-group");
        
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.1, 3])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });
        zoomBehaviorRef.current = zoom;
        svg.call(zoom);
        
        // Initial center
        svg.call(zoom.transform, d3.zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(0.8));
    }

    const root = rootRef.current;
    const isHorizontal = layout === 'horizontal';

    const tree = d3.tree().nodeSize(
        isHorizontal 
        ? [H_MODE_SIBLING_GAP, H_MODE_LEVEL_GAP] 
        : [V_MODE_SIBLING_GAP, V_MODE_LEVEL_GAP]
    );
    
    tree(root);

    const nodes = root.descendants();
    const links = root.links();

    const getX = (d: any) => isHorizontal ? d.y : d.x;
    const getY = (d: any) => isHorizontal ? d.x : d.y;
    
    // --- Orthogonal Edge Generator (Circuit Style) ---
    const circuitPath = (d: any) => {
        // Source Output
        const sX = isHorizontal ? (d.source.y0 ?? d.source.y) + NODE_WIDTH : (d.source.x0 ?? d.source.x);
        const sY = isHorizontal ? (d.source.x0 ?? d.source.x) : (d.source.y0 ?? d.source.y) + NODE_HEIGHT;
        
        // Target Input
        const tX = isHorizontal ? (d.target.y0 ?? d.target.y) : (d.target.x0 ?? d.target.x);
        const tY = isHorizontal ? (d.target.x0 ?? d.target.x) : (d.target.y0 ?? d.target.y);

        if (isHorizontal) {
            // Horizontal Step: Right -> Middle Vertical -> Right
            const midX = (sX + tX) / 2;
            return `M ${sX},${sY} L ${midX},${sY} L ${midX},${tY} L ${tX},${tY}`;
        } else {
            // Vertical Step: Down -> Middle Horizontal -> Down
            const midY = (sY + tY) / 2;
            return `M ${sX},${sY} L ${sX},${midY} L ${tX},${midY} L ${tX},${tY}`;
        }
    };
    
    // Animation Path Interpolator
    const circuitPathAnimated = (d: any) => {
        const sX = isHorizontal ? d.source.y + NODE_WIDTH : d.source.x;
        const sY = isHorizontal ? d.source.x : d.source.y + NODE_HEIGHT;
        const tX = isHorizontal ? d.target.y : d.target.x;
        const tY = isHorizontal ? d.target.x : d.target.y;

        if (isHorizontal) {
            const midX = (sX + tX) / 2;
            return `M ${sX},${sY} L ${midX},${sY} L ${midX},${tY} L ${tX},${tY}`;
        } else {
            const midY = (sY + tY) / 2;
            return `M ${sX},${sY} L ${sX},${midY} L ${tX},${midY} L ${tX},${tY}`;
        }
    };


    // 1. Links
    const link = g.selectAll<SVGPathElement, d3.HierarchyPointLink<any>>(".link")
        .data(links, (d: any) => d.target.data.id);

    const linkEnter = link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", isDarkMode ? "#45a29e" : "#cbd5e1") // Tech Teal or Slate
        .attr("stroke-width", 1)
        .attr("stroke-opacity", 0)
        .attr("d", (d: any) => {
             const o = { 
                source: { x: d.source.x0 ?? root.x, y: d.source.y0 ?? root.y },
                target: { x: d.source.x0 ?? root.x, y: d.source.y0 ?? root.y }
            };
            // @ts-ignore
            return circuitPath(o);
        });

    const linkUpdate = linkEnter.merge(link);
    linkUpdate.transition().duration(DURATION)
        .attr("stroke-opacity", isDarkMode ? 0.4 : 1) // Subtle schematic lines
        .attr("d", (d) => circuitPathAnimated(d));

    link.exit().transition().duration(DURATION)
        .attr("stroke-opacity", 0)
        .remove();


    // 2. Nodes
    const node = g.selectAll<SVGGElement, d3.HierarchyPointNode<any>>(".node")
        .data(nodes, (d: any) => d.data.id);

    const nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", (d: any) => `translate(${getX(d.parent || d)},${getY(d.parent || d)})`)
        .attr("opacity", 0)
        .on("click", (event, d) => {
            event.stopPropagation();
            if (d.children) {
                (d as any)._children = d.children;
                d.children = null;
            } else {
                d.children = (d as any)._children;
                (d as any)._children = null;
            }
            setTick(t => t + 1);
        });

    const fo = nodeEnter.append("foreignObject")
        .attr("width", NODE_WIDTH)
        .attr("height", NODE_HEIGHT)
        .attr("x", isHorizontal ? 0 : -NODE_WIDTH / 2) 
        .attr("y", isHorizontal ? -NODE_HEIGHT / 2 : 0)
        .style("overflow", "visible");

    fo.append("xhtml:div")
        .style("width", "100%")
        .style("height", "100%");

    const nodeUpdate = nodeEnter.merge(node);
    
    nodeUpdate.select("foreignObject")
        .transition().duration(DURATION)
        .attr("x", isHorizontal ? 0 : -NODE_WIDTH / 2) 
        .attr("y", isHorizontal ? -NODE_HEIGHT / 2 : 0);

    nodeUpdate.select("foreignObject").select("div")
      .html((d: any) => {
          const isCollapsed = !!(d as any)._children;
          const isRoot = d.data.kind === 'root';
          const isCluster = d.data.kind === 'cluster';
          
          // Colors: Tech Palette
          // Clusters have their own colors, leaves inherit
          let accentColor = "#66fcf1"; // Default Cyan
          if (isCluster) accentColor = d.data.color;
          else if (d.data.kind === 'leaf') {
             // Find cluster parent for color
             let curr = d;
             while(curr.parent && curr.data.kind !== 'cluster') {
                 curr = curr.parent;
             }
             if (curr.data.kind === 'cluster') accentColor = curr.data.color;
          } else if (isRoot) accentColor = "#ffffff"; 

          const isSelected = selectedNodeId === d.data.id;
          const matchesSearch = searchQuery ? d.data.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
          const opacityClass = searchQuery && !matchesSearch ? "opacity-20 grayscale" : "opacity-100";
          
          // Industrial Style Classes
          // Background is dark technical metal or clean white engineering plastic
          const bgClass = isDarkMode 
            ? "bg-[#1f2833]/90 border border-[#45a29e]/30 text-[#c5c6c7]" 
            : "bg-white border border-slate-300 text-slate-700 shadow-sm";
          
          const titleColor = isDarkMode ? "text-white" : "text-slate-900";
          const subColor = isDarkMode ? "text-[#66fcf1]" : "text-slate-500"; // Cyan subtitle in dark mode
          
          // Glow effect on selection
          const selectionStyle = isSelected 
             ? `box-shadow: 0 0 15px ${accentColor}40; border-color: ${accentColor}; z-index: 10;` 
             : ``;

          // Expand Button
          let toggleBtnStyle = '';
          if (isHorizontal) {
              toggleBtnStyle = 'right: -10px; top: 50%; transform: translateY(-50%);';
          } else {
              toggleBtnStyle = 'bottom: -10px; left: 50%; transform: translateX(-50%);';
          }

          let toggleBtn = '';
          if (d.children || (d as any)._children) {
             toggleBtn = `
              <div style="${toggleBtnStyle}" class="absolute w-5 h-5 flex items-center justify-center z-10 cursor-pointer chamfer-sm hover:scale-110 transition-transform ${isDarkMode ? 'bg-[#0b0c10] border border-[#66fcf1] text-[#66fcf1]' : 'bg-slate-800 text-white'}" onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('node-expand', {detail: '${d.data.id}'}))">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4">
                    <path d="${isCollapsed ? 'M12 5v14M5 12h14' : 'M5 12h14'}" />
                 </svg>
              </div>
             `;
          }

          // ID Tag Logic
          const nodeIdDisplay = d.data.id.length > 4 ? d.data.id.substring(0,4) : d.data.id;

          // Technical "Chamfered" HTML Structure
          return `
            <div 
              class="relative w-full h-full chamfer flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:brightness-110 ${bgClass} ${opacityClass}"
              style="${selectionStyle}"
              onclick="window.dispatchEvent(new CustomEvent('node-click', {detail: '${d.data.id}'}))"
            >
              ${toggleBtn}
              
              <!-- Header Bar -->
              <div class="h-1 w-full" style="background-color: ${accentColor}"></div>
              
              <!-- Content -->
              <div class="px-4 py-2 flex-1 flex flex-col justify-center relative">
                 <!-- Tech Decoration -->
                 <div class="absolute top-2 right-2 text-[9px] font-mono opacity-50 tracking-widest uppercase border border-current px-1 rounded-sm">
                    ${nodeIdDisplay}
                 </div>

                 <h3 class="font-display font-bold text-[16px] leading-tight uppercase tracking-wide mb-1 ${titleColor}">${d.data.name}</h3>
                 <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-sm animate-pulse" style="background-color: ${accentColor}"></span>
                    <p class="font-mono text-[10px] leading-tight truncate uppercase tracking-wider opacity-80 ${subColor}">${d.data.kind === 'root' ? 'SYSTEM ROOT' : d.data.one_liner}</p>
                 </div>
              </div>
              
              <!-- Footer Deco -->
              <div class="h-1.5 w-full flex gap-0.5 opacity-20">
                 <div class="h-full w-1/3 bg-current"></div>
                 <div class="h-full w-1/6 bg-current"></div>
                 <div class="h-full flex-1 bg-current" style="background: repeating-linear-gradient(45deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)"></div>
              </div>
            </div>
          `;
      });

    nodeUpdate.transition().duration(DURATION)
        .attr("transform", (d: any) => `translate(${getX(d)},${getY(d)})`)
        .attr("opacity", 1);

    node.exit().transition().duration(DURATION)
        .attr("transform", (d: any) => `translate(${getX(d.source || d.parent || root)},${getY(d.source || d.parent || root)})`)
        .attr("opacity", 0)
        .remove();

    nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    const handleCustomClick = (e: any) => onNodeSelect(e.detail);
    window.addEventListener('node-click', handleCustomClick);

    return () => {
        window.removeEventListener('node-click', handleCustomClick);
    };

  }, [dimensions, isDarkMode, selectedNodeId, searchQuery, tick, onNodeSelect, layout]);

  // Handle Zoom Effects (Tech style: Instant/Fast)
  useEffect(() => {
    if (!zoomAction || !svgRef.current || !zoomBehaviorRef.current) return;
    const svg = d3.select(svgRef.current);
    if (zoomAction === 'in') svg.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.4);
    else if (zoomAction === 'out') svg.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.6);
    else if (zoomAction === 'fit') {
         const scale = layout === 'horizontal' ? 0.85 : 0.75;
         const yOffset = layout === 'horizontal' ? dimensions.height / 2 : 100;
         const xOffset = layout === 'horizontal' ? 100 : dimensions.width / 2;

         svg.transition().duration(750).call(
            zoomBehaviorRef.current.transform, 
            d3.zoomIdentity.translate(xOffset, yOffset).scale(scale)
        );
    }
    onZoomActionHandled();
  }, [zoomAction, onZoomActionHandled, dimensions, layout]);


  return (
    <div ref={wrapperRef} className={`w-full h-full relative overflow-hidden cursor-crosshair ${isDarkMode ? 'bg-[#0b0c10]' : 'bg-[#e2e8f0]'}`}>
      {/* Schematic Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
            backgroundImage: isDarkMode 
                ? `linear-gradient(#66fcf1 1px, transparent 1px), linear-gradient(90deg, #66fcf1 1px, transparent 1px)` 
                : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      ></div>
      {/* Scanlines */}
       <div className={`absolute inset-0 pointer-events-none opacity-[0.03] ${isDarkMode ? 'block' : 'hidden'}`}
           style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }}>
      </div>
      
      <svg 
        ref={svgRef} 
        width={dimensions.width} 
        height={dimensions.height}
        className="block w-full h-full touch-none relative z-10"
      />
    </div>
  );
};

export default MapVisualization;