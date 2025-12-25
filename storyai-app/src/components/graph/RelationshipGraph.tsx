// D3-based Relationship Graph

import { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import type { Character, RelationshipCategory } from '../../types';
import { cn } from '../../utils';

interface RelationshipGraphProps {
  characters: Character[];
  onSelectCharacter?: (character: Character) => void;
  selectedCharacterId?: string;
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  category: RelationshipCategory;
  mentionCount: number;
  character: Character;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  type: string;
}

const categoryColors: Record<RelationshipCategory, string> = {
  family: '#c4704b',
  friend: '#7d9b7a',
  mentor: '#708090',
  colleague: '#8b7355',
  romantic: '#c97a8b',
  other: '#9ca3af',
};

export function RelationshipGraph({
  characters,
  onSelectCharacter,
  selectedCharacterId,
}: RelationshipGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Build graph data
  const { nodes, links } = useMemo(() => {
    const nodes: GraphNode[] = characters.map(char => ({
      id: char.character_id,
      name: char.name,
      category: char.relationship_category || 'other',
      mentionCount: char.mention_count || 1,
      character: char,
    }));

    const links: GraphLink[] = [];

    // Create links from relations
    characters.forEach(char => {
      if (char.relations) {
        char.relations.forEach(rel => {
          const targetId = rel.target_id;
          if (characters.some(c => c.character_id === targetId)) {
            links.push({
              source: char.character_id,
              target: targetId,
              type: rel.relationship,
            });
          }
        });
      }

      // Also check legacy connections
      if (char.connections) {
        char.connections.forEach(conn => {
          const targetId = conn.character_id;
          if (characters.some(c => c.character_id === targetId)) {
            links.push({
              source: char.character_id,
              target: targetId,
              type: conn.relationship,
            });
          }
        });
      }
    });

    return { nodes, links };
  }, [characters]);

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
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const g = svg.append('g');

    // Create simulation
    const simulation = d3.forceSimulation<GraphNode>(nodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(links)
        .id(d => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => Math.sqrt((d as GraphNode).mentionCount) * 5 + 30));

    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', 'var(--color-border-default)')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5);

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer');

    // Node circles
    node.append('circle')
      .attr('r', d => Math.sqrt(d.mentionCount) * 5 + 15)
      .attr('fill', d => categoryColors[d.category])
      .attr('stroke', d => d.id === selectedCharacterId ? 'var(--color-accent-terracotta)' : 'white')
      .attr('stroke-width', d => d.id === selectedCharacterId ? 3 : 2)
      .style('transition', 'all 0.2s ease');

    // Node labels
    node.append('text')
      .text(d => d.name)
      .attr('text-anchor', 'middle')
      .attr('dy', d => Math.sqrt(d.mentionCount) * 5 + 28)
      .attr('fill', 'var(--color-text-primary)')
      .style('font-size', '12px')
      .style('font-family', 'var(--font-heading)')
      .style('font-weight', '500')
      .style('pointer-events', 'none');

    // Drag behavior
    const drag = d3.drag<SVGGElement, GraphNode>()
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
          .attr('r', Math.sqrt(d.mentionCount) * 5 + 20);

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
          .attr('r', Math.sqrt(d.mentionCount) * 5 + 15);

        setHoveredNode(null);
      })
      .on('click', function(_, d) {
        onSelectCharacter?.(d.character);
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => (d.target as GraphNode).x!)
        .attr('y2', d => (d.target as GraphNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [nodes, links, dimensions, selectedCharacterId, onSelectCharacter]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-[var(--color-surface-secondary)] rounded-xl"
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-3 p-3 rounded-lg bg-[var(--color-surface-elevated)]/90 backdrop-blur-sm border border-[var(--color-border-subtle)]">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-[var(--color-text-muted)] capitalize">
              {category}
            </span>
          </div>
        ))}
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-elevated)]/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-[var(--color-border-subtle)]">
        Scroll to zoom · Drag to pan · Click nodes for details
      </div>

      {/* Tooltip */}
      {hoveredNode && (
        <div
          className={cn(
            'fixed z-50 pointer-events-none',
            'px-4 py-3 rounded-lg shadow-lg',
            'bg-[var(--color-surface-elevated)]',
            'border border-[var(--color-border-default)]',
            'max-w-xs'
          )}
          style={{
            left: tooltipPos.x + 15,
            top: tooltipPos.y - 10,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: categoryColors[hoveredNode.category] }}
            />
            <h4 className="font-heading font-semibold text-[var(--color-text-primary)]">
              {hoveredNode.name}
            </h4>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {hoveredNode.character.relationship}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            {hoveredNode.mentionCount} mention{hoveredNode.mentionCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
