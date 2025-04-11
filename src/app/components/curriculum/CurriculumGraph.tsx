"use client"

import React, { useState, useEffect, useRef } from 'react';
import { curriculumData } from './CurriculumData';
import { transformCurriculumToGraphData } from './utils';
import { Node, GraphData } from './types';
import GraphVisualization from './GraphVisualization';
import CourseDetails from './CourseDetails';
import Legend from './Legend';

const CurriculumGraph: React.FC = () => {
  // Initialize with empty but valid GraphData object
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [], maxLevel: 0 });
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [unlockedCourses, setUnlockedCourses] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  // Initialize graph data and unlock starting nodes
  useEffect(() => {
    try {
      const data = transformCurriculumToGraphData(curriculumData);
      
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
    if (!graphData || !graphData.nodes) return;
    
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
      
    // Check each dependent course to see if all its prerequisites are completed
    const newUnlockedCourses = [...unlockedCourses];
    
    // We need to check all courses, not just direct dependents,
    // since completing a prerequisite might fulfill requirements for courses 
    // that don't directly depend on this one
    graphData.nodes.forEach(node => {
      if (!newUnlockedCourses.includes(node.id) && !node.isStartingNode) {
        // Check if all prerequisites are completed
        const allPrereqsMet = node.prerequisites.every(prereq => 
          newCompletedCourses.includes(prereq)
        );
        
        if (allPrereqsMet) {
          newUnlockedCourses.push(node.id);
        }
      }
    });
    
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

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-gray-200" ref={containerRef}>
      <h2 className="text-2xl font-bold mb-2 text-yellow-400">Curriculum Skill Tree</h2>
      <p className="mb-4 text-gray-300">
        This interactive visualization shows direct course dependencies. Hover over nodes for details, 
        click to select courses, and complete them to unlock new ones.
      </p>
      
      <div className="flex flex-1 flex-col lg:flex-row gap-4">
        <div className="lg:w-3/4 h-96 lg:h-auto rounded-lg border border-gray-700 overflow-hidden relative flex flex-col">
          {/* Tooltip element */}
          <div 
            ref={tooltipRef}
            className="absolute z-10 bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600 pointer-events-none opacity-0 transition-opacity duration-200"
            style={{transform: "translateY(-100%)", maxWidth: "250px"}}
          >
            {hoveredNode && (
              <div>
                <h3 className="font-bold text-sm mb-1">{hoveredNode.name}</h3>
                <p className="text-xs text-gray-300 mb-1">{hoveredNode.description}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span 
                    className="px-1 rounded" 
                    style={{backgroundColor: (categoryColors as any)[hoveredNode.group] + "33", color: (categoryColors as any)[hoveredNode.group]}}
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
            className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900"
          >
            <GraphVisualization 
              graphData={graphData}
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
          <div className="px-4 py-2 border-t border-gray-700 bg-gray-800">
            <input 
              type="range"
              min="0"
              max="100"
              value={scrollPosition}
              onChange={handleScrollChange}
              className="w-full appearance-none h-2 bg-gray-700 rounded-full outline-none cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #3498db 0%, #3498db ${scrollPosition}%, #333 ${scrollPosition}%, #333 100%)`
              }}
            />
            <div className="flex justify-between text-gray-500 text-xs mt-1">
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
  
  // Helper functions
  function isCourseCompleted(courseId: string) {
    return completedCourses.includes(courseId);
  }
  
  function isCourseUnlocked(courseId: string) {
    return unlockedCourses.includes(courseId);
  }
};

export default CurriculumGraph; 