// D3-based Timeline Canvas

import { useRef, useEffect, useState, useMemo } from 'react';
import * as d3 from 'd3';
import type { Entry } from '../../types';
import { parseTimePeriod, getCompletenessColor } from '../../utils/timelineUtils';
import { cn } from '../../utils';

interface TimelineCanvasProps {
  entries: Entry[];
  onSelectEntry: (entry: Entry) => void;
  selectedEntryId?: string;
}

interface TimelineEntry {
  entry: Entry;
  startYear: number;
  endYear: number;
  midYear: number;
}

export function TimelineCanvas({ entries, onSelectEntry, selectedEntryId }: TimelineCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [hoveredEntry, setHoveredEntry] = useState<TimelineEntry | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Parse entries into timeline data
  const timelineData = useMemo(() => {
    return entries.map(entry => {
      const { startYear, endYear } = parseTimePeriod(entry.time_period);
      return {
        entry,
        startYear,
        endYear,
        midYear: (startYear + endYear) / 2,
      };
    }).sort((a, b) => a.midYear - b.midYear);
  }, [entries]);

  // Calculate year range
  const yearRange = useMemo(() => {
    if (timelineData.length === 0) {
      const now = new Date().getFullYear();
      return { min: now - 10, max: now };
    }

    const years = timelineData.flatMap(d => [d.startYear, d.endYear]);
    const min = Math.min(...years);
    const max = Math.max(...years);
    const padding = Math.max(2, Math.round((max - min) * 0.1));
    return { min: min - padding, max: max + padding };
  }, [timelineData]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: Math.max(300, height) });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // D3 rendering
  useEffect(() => {
    if (!svgRef.current || timelineData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 60, right: 40, bottom: 60, left: 40 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([yearRange.min, yearRange.max])
      .range([0, width]);

    // Timeline line
    g.append('line')
      .attr('x1', 0)
      .attr('y1', height / 2)
      .attr('x2', width)
      .attr('y2', height / 2)
      .attr('stroke', 'var(--color-border-default)')
      .attr('stroke-width', 2);

    // Decade markers
    const decadeStart = Math.floor(yearRange.min / 10) * 10;
    const decadeEnd = Math.ceil(yearRange.max / 10) * 10;
    const decades = [];
    for (let y = decadeStart; y <= decadeEnd; y += 10) {
      decades.push(y);
    }

    g.selectAll('.decade-marker')
      .data(decades)
      .enter()
      .append('line')
      .attr('class', 'decade-marker')
      .attr('x1', d => xScale(d))
      .attr('y1', height / 2 - 15)
      .attr('x2', d => xScale(d))
      .attr('y2', height / 2 + 15)
      .attr('stroke', 'var(--color-border-subtle)')
      .attr('stroke-width', 1);

    g.selectAll('.decade-label')
      .data(decades)
      .enter()
      .append('text')
      .attr('class', 'decade-label')
      .attr('x', d => xScale(d))
      .attr('y', height / 2 + 35)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--color-text-muted)')
      .style('font-size', '12px')
      .text(d => `${d}s`);

    // Entry markers - stagger vertical positions to avoid overlap
    const yPositions = new Map<number, number>();
    const getYOffset = (midYear: number, idx: number) => {
      const yearKey = Math.round(midYear);
      const count = yPositions.get(yearKey) || 0;
      yPositions.set(yearKey, count + 1);
      return (count % 3 - 1) * 30 + (idx % 2 === 0 ? -10 : 10);
    };

    // Entry range lines
    timelineData.forEach((d, i) => {
      const yOffset = getYOffset(d.midYear, i);
      const y = height / 2 + yOffset;

      if (d.startYear !== d.endYear) {
        g.append('line')
          .attr('x1', xScale(d.startYear))
          .attr('y1', y)
          .attr('x2', xScale(d.endYear))
          .attr('y2', y)
          .attr('stroke', getCompletenessColor(d.entry.completeness))
          .attr('stroke-width', 3)
          .attr('stroke-linecap', 'round')
          .attr('opacity', 0.5);
      }
    });

    // Reset for marker positioning
    yPositions.clear();

    // Entry markers (circles)
    const markers = g.selectAll('.entry-marker')
      .data(timelineData)
      .enter()
      .append('g')
      .attr('class', 'entry-marker')
      .attr('transform', (d, i) => {
        const yOffset = getYOffset(d.midYear, i);
        return `translate(${xScale(d.midYear)}, ${height / 2 + yOffset})`;
      })
      .style('cursor', 'pointer');

    markers.append('circle')
      .attr('r', d => d.entry.entry_id === selectedEntryId ? 12 : 8)
      .attr('fill', d => getCompletenessColor(d.entry.completeness))
      .attr('stroke', d => d.entry.entry_id === selectedEntryId ? 'var(--color-accent-terracotta)' : 'white')
      .attr('stroke-width', d => d.entry.entry_id === selectedEntryId ? 3 : 2)
      .style('transition', 'all 0.2s ease');

    markers
      .on('mouseenter', function(event, d) {
        d3.select(this).select('circle')
          .transition()
          .duration(150)
          .attr('r', 14);

        setHoveredEntry(d);
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on('mousemove', function(event) {
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle')
          .transition()
          .duration(150)
          .attr('r', 8);

        setHoveredEntry(null);
      })
      .on('click', function(_, d) {
        onSelectEntry(d.entry);
      });

    // Title header
    svg.append('text')
      .attr('x', dimensions.width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', 'var(--color-text-primary)')
      .style('font-family', 'var(--font-heading)')
      .style('font-size', '14px')
      .style('font-weight', '500')
      .text('Your Life Timeline');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${dimensions.height - 25})`);

    const legendItems = [
      { label: 'Brief', color: 'var(--color-brief)' },
      { label: 'Partial', color: 'var(--color-partial)' },
      { label: 'Detailed', color: 'var(--color-detailed)' },
    ];

    legendItems.forEach((item, i) => {
      const g = legend.append('g')
        .attr('transform', `translate(${i * 100}, 0)`);

      g.append('circle')
        .attr('r', 5)
        .attr('fill', item.color);

      g.append('text')
        .attr('x', 10)
        .attr('y', 4)
        .attr('fill', 'var(--color-text-muted)')
        .style('font-size', '11px')
        .text(item.label);
    });

  }, [timelineData, dimensions, yearRange, selectedEntryId, onSelectEntry]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="bg-[var(--color-surface-secondary)] rounded-xl"
      />

      {/* Tooltip */}
      {hoveredEntry && (
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
          <h4 className="font-heading font-semibold text-[var(--color-text-primary)] mb-1">
            {hoveredEntry.entry.title || 'Untitled'}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            {hoveredEntry.entry.time_period}
          </p>
          <div className="flex flex-wrap gap-1">
            {hoveredEntry.entry.themes.slice(0, 3).map(theme => (
              <span
                key={theme}
                className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-terracotta)]/10 text-[var(--color-accent-terracotta)]"
              >
                {theme}
              </span>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Click to read
          </p>
        </div>
      )}
    </div>
  );
}
