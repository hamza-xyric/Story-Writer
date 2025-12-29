// D3-based Mind Constellation visualization
// Displays themes as glowing nodes with floating quotes

import { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import type { MindData } from '../../data/mindData';
import { cn } from '../../utils';

interface MindCanvasProps {
  data: MindData;
  onSelectTheme?: (theme: string) => void;
  selectedTheme?: string | null;
}

interface SimNode extends d3.SimulationNodeDatum {
  id: string;
  type: 'theme' | 'quote';
  name: string;
  count: number;
  text?: string;
}

// Node sizing formula
const getNodeRadius = (count: number) => {
  return Math.sqrt(count) * 10 + 20;
};

// Theme node colors (terracotta-based palette)
const themeColors = [
  '#c4704b', // terracotta
  '#7d9b7a', // sage
  '#708090', // slate
  '#8b7355', // brown
  '#9ca3af', // gray
  '#c97a8b', // rose
];

export function MindCanvas({ data, onSelectTheme, selectedTheme }: MindCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Build simulation nodes from theme nodes
  const simNodes = useMemo<SimNode[]>(() => {
    return data.nodes.map((node) => ({
      id: node.id,
      type: 'theme' as const,
      name: node.name,
      count: node.count,
    }));
  }, [data.nodes]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: Math.max(400, height) });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // D3 rendering
  useEffect(() => {
    if (!svgRef.current || simNodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Create defs for glow filter
    const defs = svg.append('defs');

    // Glow filter for nodes
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const g = svg.append('g');

    // Create force simulation
    const simulation = d3.forceSimulation<SimNode>(simNodes)
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<SimNode>()
        .radius(d => getNodeRadius(d.count) + 15))
      .alphaDecay(0.02);

    // Draw floating quotes (background layer)
    const quoteGroup = g.append('g').attr('class', 'quotes');

    data.quotes.forEach((quote, i) => {
      // Random initial position
      const angle = (i / data.quotes.length) * Math.PI * 2;
      const radius = Math.random() * 150 + 100;
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;

      const quoteText = quoteGroup.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('fill', 'rgba(255, 255, 255, 0.5)')
        .style('font-size', '13px')
        .style('font-style', 'italic')
        .style('font-family', 'var(--font-body)')
        .style('pointer-events', 'none')
        .text(quote.text.length > 60 ? quote.text.slice(0, 60) + '...' : quote.text);

      // Gentle floating animation
      function animateQuote() {
        quoteText
          .transition()
          .duration(4000 + Math.random() * 2000)
          .ease(d3.easeLinear)
          .attr('y', y + (Math.random() - 0.5) * 30)
          .attr('fill', `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`)
          .on('end', animateQuote);
      }
      animateQuote();
    });

    // Draw theme nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(simNodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer');

    // Node circles with glow
    node.append('circle')
      .attr('r', d => getNodeRadius(d.count))
      .attr('fill', (_, i) => themeColors[i % themeColors.length])
      .attr('stroke', d => d.name === selectedTheme ? '#ffffff' : 'rgba(255,255,255,0.3)')
      .attr('stroke-width', d => d.name === selectedTheme ? 3 : 1)
      .attr('filter', 'url(#glow)')
      .style('transition', 'stroke 0.2s ease, stroke-width 0.2s ease');

    // Node labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => getNodeRadius(d.count) + 18)
      .attr('fill', 'rgba(255, 255, 255, 0.9)')
      .style('font-size', '12px')
      .style('font-family', 'var(--font-heading)')
      .style('font-weight', '500')
      .style('pointer-events', 'none');

    // Count badge
    node.append('text')
      .text(d => d.count)
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', 'rgba(255, 255, 255, 0.9)')
      .style('font-size', '14px')
      .style('font-family', 'var(--font-heading)')
      .style('font-weight', '600')
      .style('pointer-events', 'none');

    // Drag behavior
    const drag = d3.drag<SVGGElement, SimNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Interactions
    node
      .on('mouseenter', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(150)
          .attr('r', getNodeRadius(d.count) + 5)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 2);

        setHoveredNode(d);
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on('mousemove', function(event) {
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on('mouseleave', function(_, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(150)
          .attr('r', getNodeRadius(d.count))
          .attr('stroke', d.name === selectedTheme ? '#ffffff' : 'rgba(255,255,255,0.3)')
          .attr('stroke-width', d.name === selectedTheme ? 3 : 1);

        setHoveredNode(null);
      })
      .on('click', function(_, d) {
        onSelectTheme?.(d.name);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [simNodes, data.quotes, dimensions, selectedTheme, onSelectTheme]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-[#0a0a0f] rounded-xl"
      />

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 text-xs text-white/50 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
        Scroll to zoom · Drag to pan · Click nodes for details
      </div>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className={cn(
            'fixed z-50 pointer-events-none',
            'px-4 py-3 rounded-lg shadow-lg',
            'bg-[#1a1a1f] border border-white/10',
            'max-w-xs'
          )}
          style={{
            left: tooltipPos.x + 15,
            top: tooltipPos.y - 10,
          }}
        >
          <h4 className="font-heading font-semibold text-white">
            {hoveredNode.name}
          </h4>
          <p className="text-sm text-white/60 mt-1">
            {hoveredNode.count} {hoveredNode.count === 1 ? 'entry' : 'entries'}
          </p>
          <p className="text-xs text-white/40 mt-2">
            Click to explore
          </p>
        </div>
      )}
    </div>
  );
}
