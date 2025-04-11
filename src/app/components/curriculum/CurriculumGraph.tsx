"use client"

import React, { useState, useEffect, useRef } from 'react';
import courseData from './courseData';
import { categoryColors, transformCurriculumToGraphData, getUnlockedCourses, GraphNode, GraphData, GraphLink } from './courseUtils';
import GraphVisualization from './GraphVisualization';
import CourseDetails from './CourseDetails';
import Legend from './Legend';

const CurriculumGraph: React.FC = () => {
  // Initialize with empty but valid GraphData object
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [], maxLevel: 0 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [unlockedCourses, setUnlockedCourses] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  // Initialize graph data and unlock starting nodes
  useEffect(() => {
    try {
      const data = transformCurriculumToGraphData();
      
      // Find starting nodes
      const startingNodeIds = data.nodes
        .filter(node => node.isStartingNode)
        .map(node => node.id);
        
      setUnlockedCourses(startingNodeIds);
      setGraphData(data);
    } catch (error) {
      console.error("Error initializing curriculum graph:", error);
      // Set fallback empty valid state
      setGraphData({ nodes: [], links: [], maxLevel: 0 });
    }
  }, []);

  // Complete a course and unlock its dependents
  const completeCourse = (courseId: string) => {
    if (!graphData || graphData.nodes.length === 0) return;
    
    // Update completed courses list
    const newCompletedCourses = [...completedCourses, courseId];
    setCompletedCourses(newCompletedCourses);
    
    // Find all courses that depend on this course
    const dependentCourses = graphData.links
      .filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        return sourceId === courseId;
      })
      .map(link => {
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return targetId;
      });
      
    // Get all unlocked courses based on what's completed
    const newUnlockedCourses = getUnlockedCourses(newCompletedCourses);
    setUnlockedCourses(newUnlockedCourses);
  };

  // Handle horizontal scrolling
  const handleScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrollPosition(parseInt(e.target.value));
  };

  // Get direct prerequisites - for display only
  const getDirectPrerequisites = (courseId: string) => {
    if (!graphData || !graphData.links || !courseId) return [];
    
    return graphData.links
      .filter(link => {
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return targetId === courseId;
      })
      .map(link => typeof link.source === 'object' ? link.source.id : String(link.source));
  };
  
  // Get direct dependents - for display only
  const getDirectDependents = (courseId: string) => {
    if (!graphData || !graphData.links || !courseId) return [];
    
    return graphData.links
      .filter(link => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        return sourceId === courseId;
      })
      .map(link => typeof link.target === 'object' ? link.target.id : String(link.target));
  };
  
  // Determine prerequisites and dependents for display
  const relatedCourses = selectedNode ? {
    prerequisites: getDirectPrerequisites(selectedNode.id),
    dependents: getDirectDependents(selectedNode.id),
    allPrerequisites: selectedNode.allPrerequisites || []
  } : null;

  // Helper functions
  function isCourseCompleted(courseId: string) {
    return completedCourses.includes(courseId);
  }
  
  function isCourseUnlocked(courseId: string) {
    return unlockedCourses.includes(courseId);
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col bg-card border border-border rounded-xl shadow-xl" ref={containerRef}>
      <div className="p-6 border-b border-border backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-primary font-mono">Curriculum <span className="text-foreground font-sans">Skill Tree</span></h2>
        <p className="mt-2 text-muted max-w-3xl">
          Cette visualisation interactive montre les dépendances directes entre les cours. Survolez les nœuds pour plus de détails, 
          cliquez pour sélectionner un cours, et complétez-les pour débloquer les suivants.
        </p>
      </div>
      
      <div className="flex flex-1 flex-col lg:flex-row gap-4 p-4">
        <div className="lg:w-3/4 h-[600px] sm:h-[700px] rounded-lg border border-border overflow-hidden relative flex flex-col">
          {/* Tooltip element */}
          <div 
            ref={tooltipRef}
            className="absolute z-10 bg-card text-foreground p-3 rounded-lg shadow-lg border border-border pointer-events-none opacity-0 transition-opacity duration-200"
            style={{transform: "translateY(-100%)", maxWidth: "250px"}}
          >
            {hoveredNode && (
              <div>
                <h3 className="font-bold text-sm mb-1">{hoveredNode.name}</h3>
                <p className="text-xs text-muted mb-1">{hoveredNode.description}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span 
                    className="px-1 rounded" 
                    style={{
                      backgroundColor: `${categoryColors[hoveredNode.group as keyof typeof categoryColors] || '#888'}33`, 
                      color: categoryColors[hoveredNode.group as keyof typeof categoryColors] || '#888'
                    }}
                  >
                    {hoveredNode.group}
                  </span>
                  <span>
                    {isCourseCompleted(hoveredNode.id) 
                      ? "✅ Completed" 
                      : isCourseUnlocked(hoveredNode.id) 
                        ? "🔓 Unlocked" 
                        : "🔒 Locked"}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Graph container with horizontal scroll */}
          <div 
            ref={graphContainerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-background"
          >
            <GraphVisualization 
              graphData={{
                nodes: graphData.nodes,
                links: graphData.links,
                maxLevel: graphData.maxLevel
              }}
              selectedNode={selectedNode}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
              setSelectedNode={setSelectedNode}
              completedCourses={completedCourses}
              unlockedCourses={unlockedCourses}
              scrollPosition={scrollPosition}
              tooltipRef={tooltipRef}
              graphContainerRef={graphContainerRef}
            />
          </div>
          
          {/* Horizontal scrollbar */}
          <div className="px-4 py-2 border-t border-border bg-card-hover backdrop-blur-sm">
            <input 
              type="range"
              min="0"
              max="100"
              value={scrollPosition}
              onChange={handleScrollChange}
              className="w-full appearance-none h-2 bg-background rounded-full outline-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${scrollPosition}%, var(--border) ${scrollPosition}%, var(--border) 100%)`
              }}
            />
            <div className="flex justify-between text-muted text-xs mt-1">
              <span>Level 0</span>
              <span>Level {graphData.maxLevel}</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/4 flex flex-col gap-4">
          <CourseDetails
            selectedNode={selectedNode}
            completedCourses={completedCourses}
            unlockedCourses={unlockedCourses}
            completeCourse={completeCourse}
            relatedCourses={relatedCourses}
          />
          
          <Legend
            completedCourses={completedCourses}
            graphData={graphData}
          />
        </div>
      </div>
    </div>
  );
};

export default CurriculumGraph; 