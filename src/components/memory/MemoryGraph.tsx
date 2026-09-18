import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useMemory } from '../../context/MemoryContext';
import { GraphNode, GraphEdge, Memory } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Target, Filter, Search, Sparkles } from 'lucide-react';

export const MemoryGraph: React.FC<{ heightClassName?: string }> = ({ heightClassName = 'h-[75vh]' }) => {
  const { graphNodes, graphEdges, memories, setActiveMemory } = useMemory();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Physics positions state ref to persist coordinates during renders
  const nodePositions = useRef<{ [id: string]: { x: number; y: number; vx: number; vy: number; r: number } }>({});

  // Initialize node positions
  useEffect(() => {
    graphNodes.forEach((node, index) => {
      if (!nodePositions.current[node.id]) {
        const angle = (index / graphNodes.length) * Math.PI * 2;
        const radius = 120 + Math.random() * 100;
        nodePositions.current[node.id] = {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          vx: 0,
          vy: 0,
          r: node.val || 15
        };
      }
    });
  }, [graphNodes]);

  // Highlighted connected node IDs
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const set = new Set<string>([hoveredNodeId]);
    graphEdges.forEach((e) => {
      if (e.source === hoveredNodeId) set.add(e.target);
      if (e.target === hoveredNodeId) set.add(e.source);
    });
    return set;
  }, [hoveredNodeId, graphEdges]);

  // Main Canvas Render & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;

      // Handle Resize
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2 + pan.x;
      const centerY = height / 2 + pan.y;

      ctx.clearRect(0, 0, width, height);

      // Apply Filter & Search logic
      const activeNodes = graphNodes.filter((node) => {
        const matchesCategory = filterCategory === 'All' || node.category === filterCategory || node.category === 'Root';
        const matchesSearch = !searchQuery || node.label.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      const activeNodeIds = new Set(activeNodes.map((n) => n.id));

      // Draw Connections (Edges)
      graphEdges.forEach((edge) => {
        if (!activeNodeIds.has(edge.source) || !activeNodeIds.has(edge.target)) return;

        const posA = nodePositions.current[edge.source];
        const posB = nodePositions.current[edge.target];
        if (!posA || !posB) return;

        const ax = centerX + posA.x * zoom;
        const ay = centerY + posA.y * zoom;
        const bx = centerX + posB.x * zoom;
        const by = centerY + posB.y * zoom;

        const isHighlighted =
          hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);
        const isDimmed = hoveredNodeId && !isHighlighted;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineWidth = isHighlighted ? 2.5 * zoom : 1 * zoom;
        ctx.strokeStyle = isHighlighted
          ? 'rgba(56, 189, 248, 0.9)'
          : isDimmed
          ? 'rgba(255, 255, 255, 0.04)'
          : 'rgba(56, 189, 248, 0.2)';
        ctx.stroke();

        // Subtle glowing particle moving along line
        if (!isDimmed) {
          const progress = (Math.sin(time + posA.x * 0.01) + 1) / 2;
          const px = ax + (bx - ax) * progress;
          const py = ay + (by - ay) * progress;

          ctx.beginPath();
          ctx.arc(px, py, 2 * zoom, 0, Math.PI * 2);
          ctx.fillStyle = isHighlighted ? '#38BDF8' : 'rgba(139, 92, 246, 0.6)';
          ctx.fill();
        }
      });

      // Draw Nodes
      activeNodes.forEach((node) => {
        const pos = nodePositions.current[node.id];
        if (!pos) return;

        // Apply gentle floating physics
        pos.x += Math.sin(time * 0.5 + pos.y) * 0.15;
        pos.y += Math.cos(time * 0.5 + pos.x) * 0.15;

        const nx = centerX + pos.x * zoom;
        const ny = centerY + pos.y * zoom;
        const radius = (node.val || 14) * zoom;

        const isHovered = hoveredNodeId === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const isDimmed = hoveredNodeId && !isConnected;

        // Outer Glow Ring
        if (isHovered || node.category === 'Root') {
          ctx.beginPath();
          ctx.arc(nx, ny, radius + (isHovered ? 10 * zoom : 6 * zoom), 0, Math.PI * 2);
          ctx.fillStyle = node.category === 'Root' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(139, 92, 246, 0.35)';
          ctx.fill();
        }

        // Main Node Fill
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);

        let color = '#38BDF8';
        if (node.category === 'Root') color = '#06B6D4';
        else if (node.category === 'Idea') color = '#F59E0B';
        else if (node.category === 'Study') color = '#A855F7';
        else if (node.category === 'Research') color = '#3B82F6';
        else if (node.category === 'Projects') color = '#10B981';

        ctx.fillStyle = isDimmed ? 'rgba(30, 41, 59, 0.5)' : color;
        ctx.fill();

        ctx.lineWidth = 1.5 * zoom;
        ctx.strokeStyle = isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)';
        ctx.stroke();

        // Node Label Text
        if (!isDimmed || isHovered || isConnected) {
          ctx.font = `${isHovered ? 'bold 12px' : '10px'} Plus Jakarta Sans, sans-serif`;
          ctx.fillStyle = isDimmed ? 'rgba(148, 163, 184, 0.4)' : '#F8FAFC';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, nx, ny + radius + 14 * zoom);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [graphNodes, graphEdges, pan, zoom, hoveredNodeId, connectedNodeIds, filterCategory, searchQuery]);

  // Mouse Interaction handlers for Pan, Zoom, Hover, Click
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging.current) {
      setPan({
        x: mouseX - dragStart.current.x,
        y: mouseY - dragStart.current.y
      });
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    // Check hit test over nodes
    let foundId: string | null = null;
    graphNodes.forEach((node) => {
      const pos = nodePositions.current[node.id];
      if (!pos) return;
      const nx = centerX + pos.x * zoom;
      const ny = centerY + pos.y * zoom;
      const dist = Math.hypot(mouseX - nx, mouseY - ny);
      if (dist <= (node.val || 14) * zoom + 5) {
        foundId = node.id;
      }
    });

    setHoveredNodeId(foundId);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleNodeClick = () => {
    if (hoveredNodeId) {
      const node = graphNodes.find((n) => n.id === hoveredNodeId);
      if (node && node.memoryId) {
        const mem = memories.find((m) => m.id === node.memoryId);
        if (mem) setActiveMemory(mem);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${heightClassName} bg-[#06070B] rounded-3xl border border-white/10 overflow-hidden select-none`}>
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Search & Filter */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-input text-xs">
            <Search className="w-3.5 h-3.5 text-sky-400" />
            <input
              type="text"
              placeholder="Search graph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none w-28 sm:w-36 text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel text-xs">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Idea">Idea</option>
              <option value="Study">Study</option>
              <option value="Projects">Projects</option>
              <option value="Research">Research</option>
            </select>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 p-1 rounded-xl glass-panel pointer-events-auto">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 2.5))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Graph Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleNodeClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Hovered Node Tooltip Footer */}
      {hoveredNodeId && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-2xl glass-panel border border-sky-500/40 text-xs text-sky-200 flex items-center gap-2 shadow-2xl pointer-events-none animate-fade-in">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Click to view detailed memory info for <strong>{graphNodes.find((n) => n.id === hoveredNodeId)?.label}</strong></span>
        </div>
      )}
    </div>
  );
};
