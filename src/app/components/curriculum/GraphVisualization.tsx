"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3-force';
import { GraphData, categoryColors } from './courseUtils';
import type { GraphNode as ImportedGraphNode } from './courseUtils';

interface GraphVisualizationProps {
  graphData: GraphData;
  selectedNode: GraphNode | null;
  hoveredNode: GraphNode | null;
  setHoveredNode: (node: GraphNode | null) => void;
  setSelectedNode: (node: GraphNode | null) => void;
  completedCourses: string[];
  unlockedCourses: string[];
  scrollPosition: number;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  graphContainerRef: React.RefObject<HTMLDivElement | null>;
}

export interface GraphNode extends SimulationNodeDatum {
  id: string;
  title: string;
  type: string;
  locked?: boolean;
  completed?: boolean;
  prerequisiteFor?: string[];
  prerequisites?: string[];
  fixedX?: number;
  fixedY?: number;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  graphData,
  selectedNode,
  setHoveredNode,
  setSelectedNode,
  completedCourses,
  unlockedCourses,
  scrollPosition,
  tooltipRef,
  graphContainerRef
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Check if a course is unlocked
  const isCourseUnlocked = (courseId: string) => {
    return unlockedCourses.includes(courseId);
  };

  // Check if a course is completed
  const isCourseCompleted = (courseId: string) => {
    return completedCourses.includes(courseId);
  };

  // Get category color safely
  const getCategoryColor = (category: string): string => {
    return (categoryColors as Record<string, string>)[category] || "#888";
  };

  // Generate the skill tree visualization
  useEffect(() => {
    // Safely check if graphData and its nodes exist
    if (!graphData || !Array.isArray(graphData.nodes) || graphData.nodes.length === 0 || !svgRef.current) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Get container dimensions
    const containerWidth = graphContainerRef.current?.clientWidth || 960;
    const containerHeight = graphContainerRef.current?.clientHeight || 600;
    
    // Calculate total graph width based on levels
    const totalGraphWidth = (graphData.maxLevel + 1) * 300; // 300px per level
    
    // Create SVG with dark background
    const svg = d3.select(svgRef.current)
      .attr("width", totalGraphWidth)
      .attr("height", containerHeight);
    
    // Add background
    svg.append("rect")
      .attr("width", totalGraphWidth)
      .attr("height", containerHeight)
      .attr("fill", "var(--background-dark)");
      
    const g = svg.append("g");
    
    // Create filters for glow effects
    const defs = svg.append("defs");
    
    // Create glow filter
    const filter = defs.append("filter")
      .attr("id", "glow")
      .attr("x", "-40%")
      .attr("y", "-40%")
      .attr("width", "180%")
      .attr("height", "180%");
      
    filter.append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");
      
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    
    // Create strong glow filter for selected nodes
    const strongFilter = defs.append("filter")
      .attr("id", "strongGlow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
      
    strongFilter.append("feGaussianBlur")
      .attr("stdDeviation", "8")
      .attr("result", "coloredBlur");
      
    const strongFeMerge = strongFilter.append("feMerge");
    strongFeMerge.append("feMergeNode").attr("in", "coloredBlur");
    strongFeMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Create completed node glow filter (green)
    const completedFilter = defs.append("filter")
      .attr("id", "completedGlow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");
      
    completedFilter.append("feGaussianBlur")
      .attr("stdDeviation", "6")
      .attr("result", "coloredBlur");
      
    const completedFeMerge = completedFilter.append("feMerge");
    completedFeMerge.append("feMergeNode").attr("in", "coloredBlur");
    completedFeMerge.append("feMergeNode").attr("in", "SourceGraphic");
    
    // Create locked node filter (gray and desaturated)
    const lockedFilter = defs.append("filter")
      .attr("id", "lockedGlow")
      .attr("x", "-40%")
      .attr("y", "-40%")
      .attr("width", "180%")
      .attr("height", "180%");
    
    lockedFilter.append("feColorMatrix")
      .attr("type", "matrix")
      .attr("values", "0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0.3 0.3 0.3 0 0 0 0 0 1 0")
      .attr("result", "desaturated");
      
    lockedFilter.append("feGaussianBlur")
      .attr("in", "desaturated")
      .attr("stdDeviation", "1")
      .attr("result", "coloredBlur");
      
    const lockedFeMerge = lockedFilter.append("feMerge");
    lockedFeMerge.append("feMergeNode").attr("in", "coloredBlur");
    lockedFeMerge.append("feMergeNode").attr("in", "SourceGraphic");
    
    // Create category-specific glow filters
    Object.entries(categoryColors).forEach(([category]) => {
      const catFilter = defs.append("filter")
        .attr("id", `glow-${category.replace(/\s+/g, '-').toLowerCase()}`)
        .attr("x", "-40%")
        .attr("y", "-40%")
        .attr("width", "180%")
        .attr("height", "180%");
        
      catFilter.append("feGaussianBlur")
        .attr("stdDeviation", "3")
        .attr("result", "coloredBlur");
        
      const catFeMerge = catFilter.append("feMerge");
      catFeMerge.append("feMergeNode").attr("in", "coloredBlur");
      catFeMerge.append("feMergeNode").attr("in", "SourceGraphic");
    });
    
    // Create gradients for links
    graphData.links.forEach((link, i) => {
      const sourceNode = typeof link.source === 'object' ? link.source : 
        graphData.nodes.find(n => n.id === link.source);
      const targetNode = typeof link.target === 'object' ? link.target : 
        graphData.nodes.find(n => n.id === link.target);
        
      const sourceCategory = sourceNode?.group || '';
      const targetCategory = targetNode?.group || '';
        
      const sourceColor = getCategoryColor(sourceCategory);
      const targetColor = getCategoryColor(targetCategory);
      
      const gradient = defs.append("linearGradient")
        .attr("id", `link-gradient-${i}`)
        .attr("gradientUnits", "userSpaceOnUse");
        
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", sourceColor);
        
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", targetColor);
    });
    
    // Calculate horizontal positions based on levels - with more spacing
    const levelSpacing = 300; // Fixed spacing between levels
    graphData.nodes.forEach(node => {
      // Calculate x position from left to right with fixed spacing
      node.fixedX = node.level * levelSpacing + 150; // Center in each level column
    });
    
    // Group nodes by level for vertical spacing
    type NodesMap = { [key: number]: GraphNode[] };
    const nodesByLevel: NodesMap = {};
    
    graphData.nodes.forEach(node => {
      const level = node.level;
      if (!nodesByLevel[level]) {
        nodesByLevel[level] = [];
      }
      nodesByLevel[level].push(node);
    });
    
    // Distribute nodes vertically within each level
    Object.entries(nodesByLevel).forEach(([_levelStr, nodes]) => {
      const totalHeight = containerHeight - 100; // Leave some padding
      const nodeSpacing = totalHeight / (nodes.length + 1);
      
      nodes.forEach((node, i) => {
        node.fixedY = (i + 1) * nodeSpacing;
      });
    });
    
    // Create a simulation with custom forces
    d3.forceSimulation(graphData.nodes)
      .force("x", d3.forceX(d => d.fixedX as number).strength(1))
      .force("y", d3.forceY(d => d.fixedY as number).strength(0.5))
      .force("collision", d3.forceCollide().radius(40))
      .on("tick", ticked);
    
    // Create links
    const links = g.selectAll(".link")
      .data(graphData.links)
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("stroke-width", 2)
      .attr("stroke-opacity", 0.8)
      .attr("stroke-dasharray", (link: { source: GraphNode | string; target: GraphNode | string }) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : String(link.source);
        const targetId = typeof link.target === 'object' ? link.target.id : String(link.target);
        
        // Check if link involves selected node
        const isSelectedLink = selectedNode && 
          (sourceId === selectedNode.id || targetId === selectedNode.id);
        
        return isSelectedLink ? "none" : "4, 2";
      })
      .attr("stroke", (_link: unknown, i: number) => `url(#link-gradient-${i})`)
      .attr("fill", "none")
      .attr("marker-end", "url(#arrowhead)");
      
    // Create arrow marker
    defs.append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "var(--foreground)");
      
    // Create node groups
    const nodeGroups = g.selectAll(".node")
      .data(graphData.nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("cursor", "pointer")
      .on("mouseover", function(this: SVGElement) {
        // Show tooltip with node information
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = "1";
          const tooltipWidth = tooltipRef.current.offsetWidth;
          
          // Position the tooltip near the node but ensure it stays within the container
          const nodeElement = this;
          const nodeBounds = nodeElement.getBoundingClientRect();
          const containerBounds = graphContainerRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0 };
          
          // Calculate tooltip position
          let tooltipX = nodeBounds.left - containerBounds.left + 20;
          const tooltipY = nodeBounds.top - containerBounds.top - 5;
          
          // Adjust tooltip if it would extend beyond container width
          if (tooltipX + tooltipWidth > containerBounds.width) {
            tooltipX = nodeBounds.left - containerBounds.left - tooltipWidth - 20;
          }
          
          // Apply position
          tooltipRef.current.style.left = `${tooltipX}px`;
          tooltipRef.current.style.top = `${tooltipY}px`;
        }
        
        // Update hovered state
        const d = d3.select(this).datum() as GraphNode;
        setHoveredNode(d);
        
        // Highlight the node and connected links
        d3.select(this)
          .transition()
          .duration(100)
          .attr("transform", `scale(1.1)`);
      })
      .on("mouseout", function(this: SVGElement) {
        // Hide tooltip
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = "0";
        }
        
        // Reset hovered state
        setHoveredNode(null);
        
        // Reset node highlight
        d3.select(this)
          .transition()
          .duration(100)
          .attr("transform", `scale(1)`);
      })
      .on("click", function(this: SVGElement, event: MouseEvent) {
        event.stopPropagation();
        const d = d3.select(this).datum() as GraphNode;
        setSelectedNode(d === selectedNode ? null : d);
      });
    
    // Add node backgrounds (glowing circles)
    nodeGroups.append("circle")
      .attr("r", 28)
      .attr("class", "node-bg")
      .attr("fill", d => getCategoryColor(d.group))
      .attr("fill-opacity", 0.1)
      .attr("stroke", d => getCategoryColor(d.group))
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.7)
      .attr("filter", d => {
        // Determine the appropriate filter based on node status
        if (d.id === selectedNode?.id) {
          return "url(#strongGlow)";
        } else if (isCourseCompleted(d.id)) {
          return "url(#completedGlow)";
        } else if (!isCourseUnlocked(d.id)) {
          return "url(#lockedGlow)";
        }
        return `url(#glow-${d.group.replace(/\s+/g, '-').toLowerCase()})`;
      });
    
    // Add node main circles
    nodeGroups.append("circle")
      .attr("r", 20)
      .attr("fill", d => {
        const baseColor = getCategoryColor(d.group);
        
        // Apply different color styles based on node status
        if (isCourseCompleted(d.id)) {
          return baseColor; // Full color for completed nodes
        } else if (isCourseUnlocked(d.id)) {
          return d3.color(baseColor)?.brighter(0.3)?.toString() || baseColor; // Brighter for unlocked
        } else {
          // For locked nodes, create a desaturated version
          const c = d3.color(baseColor);
          if (c) {
            c.opacity = 0.3;
            return c.toString();
          }
          return "#777"; // Fallback
        }
      })
      .attr("stroke", d => {
        const baseColor = getCategoryColor(d.group);
        // Add a subtle stroke around the node
        return isCourseCompleted(d.id) ? 
          d3.color(baseColor)?.darker(0.5)?.toString() || baseColor : 
          "var(--border)";
      })
      .attr("stroke-width", d => d.id === selectedNode?.id ? 3 : 1.5)
      .style("filter", d => d.id === selectedNode?.id ? "brightness(1.3)" : "none");
    
    // Add lock icon for locked courses
    nodeGroups.filter(d => !isCourseUnlocked(d.id) && !isCourseCompleted(d.id))
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-family", "FontAwesome")
      .attr("font-size", "14px")
      .attr("fill", "var(--foreground)")
      .attr("fill-opacity", 0.7)
      .text("🔒");
    
    // Add check mark for completed courses
    nodeGroups.filter(d => isCourseCompleted(d.id))
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-family", "FontAwesome")
      .attr("font-size", "12px")
      .attr("fill", "white")
      .text("✓");
    
    // Add course labels
    const labels = nodeGroups.append("text")
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--foreground)")
      .style("font-size", "11px")
      .style("font-weight", d => d.id === selectedNode?.id ? "bold" : "normal")
      .text(d => d.name);
    
    // Update positions on tick
    function ticked() {
      links.attr("d", (link) => {
        const source = typeof link.source === 'object' ? link.source : 
          graphData.nodes.find(n => n.id === link.source);
        const target = typeof link.target === 'object' ? link.target : 
          graphData.nodes.find(n => n.id === link.target);
        
        if (!source || !target) return "M0,0L0,0";
        
        const sourceX = source.x || 0;
        const sourceY = source.y || 0;
        const targetX = target.x || 0;
        const targetY = target.y || 0;
        
        // Control point for curved links
        const dx = targetX - sourceX;
        const dy = targetY - sourceY;
        const dr = Math.sqrt(dx * dx + dy * dy);
        
        // Determine if this link should be highlighted
        const isSelectedLink = selectedNode && 
          (source.id === selectedNode.id || target.id === selectedNode.id);
        
        // Adjust curve for selected links
        const curve = isSelectedLink ? dr * 0.8 : dr * 1.2;
        
        return `M${sourceX},${sourceY}A${curve},${curve} 0 0,1 ${targetX},${targetY}`;
      });
      
      nodeGroups.attr("transform", d => `translate(${d.x || 0}, ${d.y || 0})`);
    }
    
    // Handle horizontal scroll using scrollPosition
    const maxScrollX = Math.max(0, totalGraphWidth - containerWidth);
    const scrollX = (scrollPosition / 100) * maxScrollX;
    g.attr("transform", `translate(${-scrollX}, 0)`);
    
    // Set background size
    d3.select(svgRef.current).select("rect")
      .attr("width", totalGraphWidth)
      .attr("height", containerHeight);
  }, [graphData, selectedNode, completedCourses, unlockedCourses, scrollPosition, isCourseCompleted, isCourseUnlocked, tooltipRef, graphContainerRef, setHoveredNode, setSelectedNode]);

  return (
    <svg 
      ref={svgRef} 
      className="w-full h-full" 
      preserveAspectRatio="xMidYMid meet"
    ></svg>
  );
};

export default GraphVisualization;  