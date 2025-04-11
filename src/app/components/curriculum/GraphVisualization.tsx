"use client"

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Node, Link, GraphData } from './types';
import { categoryColors } from './CurriculumData';

interface GraphVisualizationProps {
  graphData: GraphData;
  selectedNode: Node | null;
  hoveredNode: Node | null;
  setHoveredNode: (node: Node | null) => void;
  setSelectedNode: (node: Node | null) => void;
  completedCourses: string[];
  unlockedCourses: string[];
  scrollPosition: number;
  tooltipRef: React.RefObject<HTMLDivElement>;
  graphContainerRef: React.RefObject<HTMLDivElement>;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  graphData,
  selectedNode,
  hoveredNode,
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
      .attr("fill", "#0a0a0a");
      
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
    Object.entries(categoryColors).forEach(([category, color]) => {
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
    
    // Vertical layout - separate nodes in the same level with more spacing
    const levelGroups: Record<number, Node[]> = {};
    graphData.nodes.forEach(node => {
      if (!levelGroups[node.level]) {
        levelGroups[node.level] = [];
      }
      levelGroups[node.level].push(node);
    });
    
    // Distribute nodes vertically with more spacing
    Object.entries(levelGroups).forEach(([level, nodes]) => {
      const groupHeight = containerHeight * 0.8;
      const nodeSpacing = groupHeight / (nodes.length + 1);
      
      nodes.forEach((node, i) => {
        node.fixedY = (i + 1) * nodeSpacing + containerHeight * 0.1;
      });
    });
    
    // Create links group
    const links = g.selectAll(".link")
      .data(graphData.links)
      .enter()
      .append("g");
      
    // Add path for each link
    links.append("path")
      .attr("class", "link-path")
      .attr("stroke", (d: any, i: number) => {
        const sourceCourseId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetCourseId = typeof d.target === 'object' ? d.target.id : d.target;
        
        if (completedCourses.includes(sourceCourseId) && completedCourses.includes(targetCourseId)) {
          return "#2ecc71"; // Completed path is green
        } else if (completedCourses.includes(sourceCourseId) && unlockedCourses.includes(targetCourseId)) {
          return `url(#link-gradient-${i})`; // Active path uses gradient
        } else {
          return "#555"; // Locked path is gray
        }
      })
      .attr("stroke-width", 2)
      .attr("opacity", (d: any) => {
        const sourceCourseId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetCourseId = typeof d.target === 'object' ? d.target.id : d.target;
        
        if (completedCourses.includes(sourceCourseId) && completedCourses.includes(targetCourseId)) {
          return 0.9; // Completed path is more visible
        } else if (completedCourses.includes(sourceCourseId) && unlockedCourses.includes(targetCourseId)) {
          return 0.7; // Active path
        } else {
          return 0.3; // Locked path is faded
        }
      })
      .attr("fill", "none")
      .attr("filter", (d: any) => {
        const sourceCourseId = typeof d.source === 'object' ? d.source.id : d.source;
        const targetCourseId = typeof d.target === 'object' ? d.target.id : d.target;
        
        if (completedCourses.includes(sourceCourseId) && completedCourses.includes(targetCourseId)) {
          return "url(#strongGlow)"; // Completed path has strong glow
        } else if (completedCourses.includes(sourceCourseId) && unlockedCourses.includes(targetCourseId)) {
          return "url(#glow)"; // Active path has normal glow
        } else {
          return "none"; // Locked path has no glow
        }
      });
      
    // Add arrowhead markers
    links.append("path")
      .attr("class", "link-arrow")
      .attr("fill", (d: any) => {
        const targetCourseId = typeof d.target === 'object' ? d.target.id : d.target;
        
        if (completedCourses.includes(targetCourseId)) {
          return "#2ecc71"; // Green for completed
        } else if (unlockedCourses.includes(targetCourseId)) {
          const targetNode = typeof d.target === 'object' ? d.target : 
            graphData.nodes.find(n => n.id === d.target);
          return getCategoryColor(targetNode?.group || '');
        } else {
          return "#555"; // Gray for locked
        }
      })
      .attr("filter", (d: any) => {
        const targetCourseId = typeof d.target === 'object' ? d.target.id : d.target;
        
        if (completedCourses.includes(targetCourseId)) {
          return "url(#strongGlow)";
        } else if (unlockedCourses.includes(targetCourseId)) {
          return "url(#glow)";
        } else {
          return "none";
        }
      });
    
    // Create node groups with proper position
    const nodes = g.selectAll(".node")
      .data(graphData.nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.fixedX},${d.fixedY})`)
      .style("cursor", (d: any) => isCourseUnlocked(d.id) && !isCourseCompleted(d.id) ? "pointer" : isCourseCompleted(d.id) ? "default" : "not-allowed");
    
    // Add outer glow circle for nodes
    nodes.append("circle")
      .attr("r", (d: any) => d.isStartingNode || d.isFinalNode ? 35 : 25)
      .attr("fill", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return "rgba(46, 204, 113, 0.2)"; // Green glow for completed
        } else if (isCourseUnlocked(d.id)) {
          return "rgba(0,0,0,0.4)";
        } else {
          return "rgba(30,30,30,0.6)"; // Darker for locked
        }
      })
      .attr("stroke", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return "#2ecc71"; // Green for completed
        } else if (isCourseUnlocked(d.id)) {
          return getCategoryColor(d.group);
        } else {
          return "#555"; // Gray for locked
        }
      })
      .attr("stroke-width", 3)
      .attr("filter", (d: any) => {
        if (d.id === selectedNode?.id) {
          return "url(#strongGlow)"; // Strong glow for selected node
        } else if (isCourseCompleted(d.id)) {
          return "url(#completedGlow)";
        } else if (isCourseUnlocked(d.id)) {
          if (d.isStartingNode || d.isFinalNode) {
            return "url(#strongGlow)";
          }
          return `url(#glow-${d.group.replace(/\s+/g, '-').toLowerCase()})`;
        } else {
          return "url(#lockedGlow)";
        }
      });
    
    // Add inner circle for nodes
    nodes.append("circle")
      .attr("r", (d: any) => d.isStartingNode || d.isFinalNode ? 25 : 18)
      .attr("fill", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return d3.color("#2ecc71")?.darker(0.5);
        } else if (isCourseUnlocked(d.id)) {
          const color = getCategoryColor(d.group);
          return d3.color(color)?.darker(0.8);
        } else {
          return "#333"; // Dark gray for locked
        }
      })
      .attr("stroke", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return "#2ecc71";
        } else if (isCourseUnlocked(d.id)) {
          return getCategoryColor(d.group);
        } else {
          return "#555";
        }
      })
      .attr("stroke-width", 2);
    
    // Add decorative elements for special nodes
    nodes.filter((d: any) => d.isStartingNode || d.isFinalNode)
      .append("circle")
      .attr("r", 33)
      .attr("fill", "none")
      .attr("stroke", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return d3.color("#2ecc71")?.brighter(0.5);
        } else if (isCourseUnlocked(d.id)) {
          return d3.color(getCategoryColor(d.group))?.brighter(0.5);
        } else {
          return "#555";
        }
      })
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "8,4")
      .attr("opacity", (d: any) => isCourseUnlocked(d.id) ? 0.7 : 0.3);
      
    // Add completion checkmark for completed courses
    nodes.filter((d: any) => isCourseCompleted(d.id))
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 7)
      .attr("font-size", 20)
      .attr("fill", "#fff")
      .attr("filter", "url(#glow)")
      .text("✓");
    
    // Add lock symbol for locked courses
    nodes.filter((d: any) => !isCourseUnlocked(d.id) && !isCourseCompleted(d.id))
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 7)
      .attr("font-size", 16)
      .attr("fill", "#888")
      .text("🔒");
      
    // Add year indicator
    nodes.append("text")
      .attr("dy", (d: any) => d.isFinalNode ? -30 : -25)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return "#9befc3"; // Light green
        } else if (isCourseUnlocked(d.id)) {
          return d3.color(getCategoryColor(d.group))?.brighter(0.8);
        } else {
          return "#888";
        }
      })
      .attr("filter", (d: any) => isCourseUnlocked(d.id) ? "url(#glow)" : "none")
      .text((d: any) => `Y${d.year}`);
    
    // Handle node click
    nodes.on("click", (event: any, d: Node) => {
      // Only allow clicking on unlocked courses
      if (isCourseUnlocked(d.id) || isCourseCompleted(d.id)) {
        setSelectedNode(selectedNode?.id === d.id ? null : d);
        
        // Highlight the selected node with stronger glow
        d3.selectAll(".node circle")
          .attr("filter", (node: any) => {
            if (node.id === d.id) {
              return "url(#strongGlow)";
            } else if (isCourseCompleted(node.id)) {
              return "url(#completedGlow)";
            } else if (isCourseUnlocked(node.id)) {
              if (node.isStartingNode || node.isFinalNode) {
                return "url(#strongGlow)";
              }
              return `url(#glow-${node.group.replace(/\s+/g, '-').toLowerCase()})`;
            } else {
              return "url(#lockedGlow)";
            }
          });
      }
    });
    
    // Handle node hover for tooltip
    nodes.on("mouseenter", (event: any, d: Node) => {
      setHoveredNode(d);
      
      // Get bounding rect for positioning tooltip
      const rect = event.currentTarget.getBoundingClientRect();
      const tooltipElement = tooltipRef.current;
      
      if (tooltipElement) {
        tooltipElement.style.opacity = '1';
        tooltipElement.style.left = `${rect.left}px`;
        tooltipElement.style.top = `${rect.top - 10}px`;
      }
    })
    .on("mouseleave", () => {
      setHoveredNode(null);
      
      const tooltipElement = tooltipRef.current;
      if (tooltipElement) {
        tooltipElement.style.opacity = '0';
      }
    });
    
    // Add course name labels
    const labels = g.selectAll(".label")
      .data(graphData.nodes)
      .enter().append("text")
      .attr("class", "label")
      .attr("x", (d: any) => d.fixedX)
      .attr("y", (d: any) => d.fixedY)
      .attr("text-anchor", "middle")
      .attr("fill", (d: any) => {
        if (isCourseCompleted(d.id)) {
          return "#9befc3"; // Light green
        } else if (isCourseUnlocked(d.id)) {
          return d3.color(getCategoryColor(d.group))?.brighter(1);
        } else {
          return "#888"; // Gray for locked
        }
      })
      .attr("filter", (d: any) => isCourseUnlocked(d.id) ? "url(#glow)" : "none")
      .attr("font-size", (d: any) => d.isStartingNode || d.isFinalNode ? 14 : 12)
      .attr("dy", (d: any) => d.isStartingNode || d.isFinalNode ? 45 : 35)
      .attr("font-weight", (d: any) => d.isStartingNode || d.isFinalNode ? "bold" : "normal")
      .text((d: any) => {
        // Truncate long names
        return d.name.length > 20 ? d.name.substring(0, 18) + '...' : d.name;
      });
      
    // Update link paths as curved lines
    links.selectAll(".link-path")
      .attr("d", (d: any) => {
        const sourceX = d.source.fixedX || 0;
        const sourceY = d.source.fixedY || 0;
        const targetX = d.target.fixedX || 0;
        const targetY = d.target.fixedY || 0;
        
        // Calculate control points for a horizontal curve
        const midX = (sourceX + targetX) / 2;
        
        // More horizontal curve for left-to-right flow
        return `M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`;
      });
    
    // Update arrow positions
    links.selectAll(".link-arrow")
      .attr("d", (d: any) => {
        // Calculate position for arrow
        const sourceX = d.source.fixedX || 0;
        const sourceY = d.source.fixedY || 0;
        const targetX = d.target.fixedX || 0;
        const targetY = d.target.fixedY || 0;
        
        // Calculate midpoints for the Bézier curve
        const midX = (sourceX + targetX) / 2;
        
        // Find a point along the curve
        // For a cubic Bézier, we can use the formula
        const t = 0.9; // Position arrow near the end of the curve
        const x1 = sourceX, y1 = sourceY;
        const x2 = midX, y2 = sourceY;
        const x3 = midX, y3 = targetY;
        const x4 = targetX, y4 = targetY;
        
        const Bx = Math.pow(1-t, 3)*x1 + 3*Math.pow(1-t, 2)*t*x2 + 3*(1-t)*Math.pow(t, 2)*x3 + Math.pow(t, 3)*x4;
        const By = Math.pow(1-t, 3)*y1 + 3*Math.pow(1-t, 2)*t*y2 + 3*(1-t)*Math.pow(t, 2)*y3 + Math.pow(t, 3)*y4;
        
        // Calculate the tangent at point t
        const dx = 3*Math.pow(1-t, 2)*(x2-x1) + 6*(1-t)*t*(x3-x2) + 3*Math.pow(t, 2)*(x4-x3);
        const dy = 3*Math.pow(1-t, 2)*(y2-y1) + 6*(1-t)*t*(y3-y2) + 3*Math.pow(t, 2)*(y4-y3);
        
        // Calculate angle from tangent
        const angle = Math.atan2(dy, dx);
        
        // Calculate arrow points
        const arrowSize = 8;
        const arrowAngle = 0.5;
        
        const tip = [Bx, By];
        const left = [
          Bx - Math.cos(angle - arrowAngle) * arrowSize,
          By - Math.sin(angle - arrowAngle) * arrowSize
        ];
        const right = [
          Bx - Math.cos(angle + arrowAngle) * arrowSize,
          By - Math.sin(angle + arrowAngle) * arrowSize
        ];
        
        return `M${tip[0]},${tip[1]}L${left[0]},${left[1]}L${right[0]},${right[1]}Z`;
      });
      
    // Update scroll position based on slider value
    if (graphContainerRef.current) {
      const maxScroll = totalGraphWidth - containerWidth;
      const scrollValue = (scrollPosition / 100) * maxScroll;
      graphContainerRef.current.scrollLeft = scrollValue;
    }
    
  }, [graphData, selectedNode, completedCourses, unlockedCourses, scrollPosition, setHoveredNode, setSelectedNode, tooltipRef, graphContainerRef]);

  return (
    <svg 
      ref={svgRef} 
      className="h-full"
    />
  );
};

export default GraphVisualization;  