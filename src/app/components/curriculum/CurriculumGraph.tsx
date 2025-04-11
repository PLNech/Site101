"use client"

import React, { useState, useEffect, useRef } from 'react';
import { categoryColors, transformCurriculumToGraphData, getUnlockedCourses, GraphNode, GraphData } from './courseUtils';
import GraphVisualization from './GraphVisualization';
import CourseDetails from './CourseDetails';
import Legend from './Legend';
import studentData from './studentData';

// Default student ID
const DEFAULT_STUDENT_ID = "STU001";

// Helper to get storage key for a specific student
const getStorageKey = (studentId: string) => `ecole101_student_${studentId}_courses`;

// Student info type
interface StudentInfo {
  id: string;
  name: string;
  email: string;
  parcours?: string;
  niveau?: string;
  promotion?: string;
  class_id?: string;
  teacher?: string;
  progression?: {
    coursesCompleted: number;
    coursesInProgress: number;
    totalCourses: number;
    nextEvaluation: string;
    currentFocus?: string[];
  };
}

// Helper to flatten student data for easier access
const getAllStudents = () => {
  const allStudents: StudentInfo[] = [];
  
  // Process class groups
  studentData.forEach(item => {
    if (Array.isArray(item.students)) {
      item.students.forEach(student => {
        allStudents.push({
          ...student,
          parcours: item.parcours,
          niveau: item.niveau,
          promotion: item.promotion,
          class_id: item.class_id || '',
          teacher: item.teacher || ''
        });
      });
    } else if (item.id) {
      // Top-level student entries
      allStudents.push(item as StudentInfo);
    }
  });
  
  return allStudents;
};

const CurriculumGraph: React.FC = () => {
  // Initialize with empty but valid GraphData object
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [], maxLevel: 0 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [unlockedCourses, setUnlockedCourses] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [currentStudentId, setCurrentStudentId] = useState<string>(DEFAULT_STUDENT_ID);
  const [allStudents, setAllStudents] = useState<StudentInfo[]>([]);
  
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);

  // Helper functions for course status - defined at the top level to be used in useEffect
  const isCourseCompleted = (courseId: string) => {
    return completedCourses.includes(courseId);
  };
  
  const isCourseUnlocked = (courseId: string) => {
    return unlockedCourses.includes(courseId);
  };

  // Load all students
  useEffect(() => {
    const students = getAllStudents();
    setAllStudents(students);
  }, []);

  // Load student info when student ID changes
  useEffect(() => {
    if (allStudents.length === 0) return;
    
    const student = allStudents.find(s => s.id === currentStudentId);
    if (student) {
      setStudentInfo(student);
      console.log("Student info loaded:", student);
    }
    
    // Reset graph state when changing student
    setSelectedNode(null);
    
    // Load completed courses for the selected student
    try {
      const data = transformCurriculumToGraphData();
      
      // Find starting nodes
      const startingNodeIds = data.nodes
        .filter(node => node.isStartingNode === true)
        .map(node => node.id);

      // Load completed courses from localStorage for this specific student
      const savedCourses = localStorage.getItem(getStorageKey(currentStudentId));
      const initialCompletedCourses = savedCourses ? JSON.parse(savedCourses) : [];
      
      setCompletedCourses(initialCompletedCourses);
      
      // Calculate unlocked courses based on completed ones
      const initialUnlockedCourses = getUnlockedCourses(initialCompletedCourses);
      // Always make sure starting nodes are unlocked
      const allUnlockedCourses = [...new Set([...initialUnlockedCourses, ...startingNodeIds])];
      
      setUnlockedCourses(allUnlockedCourses);
      setGraphData(data);
    } catch (error) {
      console.error("Error initializing curriculum graph:", error);
      // Set fallback empty valid state
      setGraphData({ nodes: [], links: [], maxLevel: 0 });
    }
  }, [currentStudentId, allStudents]);

  // Save completed courses to localStorage when they change
  useEffect(() => {
    if (completedCourses.length > 0 && currentStudentId) {
      localStorage.setItem(getStorageKey(currentStudentId), JSON.stringify(completedCourses));
      
      // Update student info in localStorage
      if (studentInfo) {
        const updatedInfo = {
          ...studentInfo,
          progression: {
            ...studentInfo.progression,
            coursesCompleted: completedCourses.length
          }
        };
        localStorage.setItem(`ecole101_student_${currentStudentId}_info`, JSON.stringify(updatedInfo));
      }
    }
  }, [completedCourses, studentInfo, currentStudentId]);

  // Complete a course and unlock its dependents
  const completeCourse = (courseId: string) => {
    if (!graphData || graphData.nodes.length === 0) return;
    
    // Update completed courses list if not already completed
    if (!completedCourses.includes(courseId)) {
      const newCompletedCourses = [...completedCourses, courseId];
      setCompletedCourses(newCompletedCourses);
      
      // Get all unlocked courses based on what's completed
      const newUnlockedCourses = getUnlockedCourses(newCompletedCourses);
      setUnlockedCourses(newUnlockedCourses);
    }
  };

  // Handle horizontal scrolling
  const handleScrollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrollPosition(parseInt(e.target.value));
  };

  // Handle student change
  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentStudentId(e.target.value);
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
    <div className="w-full min-h-[80vh] flex flex-col bg-background border border-border rounded-xl shadow-xl" ref={containerRef}>
      {/* Student Selector */}
      <div className="p-4 border-b border-border bg-card/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="student-selector" className="block text-sm font-medium mb-1">
              Sélectionner un étudiant:
            </label>
            <select
              id="student-selector"
              value={currentStudentId}
              onChange={handleStudentChange}
              className="w-full md:max-w-md px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {allStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.parcours} - {student.niveau})
                </option>
              ))}
            </select>
          </div>
          {studentInfo && (
            <div className="bg-primary/5 px-4 py-3 rounded-lg border border-border">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Progression: <span className="text-primary">{completedCourses.length}/{graphData.nodes.length} cours</span></span>
                <span className="text-xs text-foreground/80">{studentInfo.parcours} · {studentInfo.niveau} · {studentInfo.promotion}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Student Info */}
      {studentInfo && (
        <div className="p-3 border-b border-border bg-card/10">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-lg font-medium text-primary">{studentInfo.name}</h3>
              <p className="text-sm text-foreground/80">Professeur: {studentInfo.teacher || 'Non assigné'}</p>
            </div>
            <div className="space-y-1">
              {studentInfo.progression?.currentFocus && (
                <div className="text-sm">
                  <span className="font-medium">Focus actuel:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {studentInfo.progression.currentFocus.map((focus: string, idx: number) => (
                      <span key={idx} className="inline-block px-2 py-1 bg-card text-xs rounded-full border border-border">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6 border-b border-border backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-primary font-mono">Curriculum <span className="text-foreground font-sans">Skill Tree</span></h2>
        <p className="mt-2 text-foreground max-w-3xl">
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
                <h3 className="font-bold text-sm mb-1 text-foreground">{hoveredNode.name}</h3>
                <p className="text-xs text-foreground mb-1">{hoveredNode.description}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span 
                    className="px-1 rounded" 
                    style={{
                      backgroundColor: `${categoryColors[hoveredNode.group as keyof typeof categoryColors] || '#888'}33`, 
                      color: categoryColors[hoveredNode.group as keyof typeof categoryColors] || '#ccc'
                    }}
                  >
                    {hoveredNode.group}
                  </span>
                  <span className="text-foreground">
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
          <div className="px-4 py-2 border-t border-border bg-card backdrop-blur-sm">
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
            <div className="flex justify-between text-foreground text-xs mt-1">
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