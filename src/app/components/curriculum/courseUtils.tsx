// curriculumUtils.tsx
// Utility functions for working with curriculum data in a graph format

import courseData, { Course, getAllCourses } from './courseData';

export interface GraphNode {
  id: string;           // Same as title in most cases
  title: string;        // Required from Course
  name: string;         // Display name
  description: string;  // Required from Course
  prerequisites: string[]; // Required from Course
  group: string;        // Category name
  year: number;
  level: number;
  allPrerequisites: string[];
  isUnlocked: boolean;
  isCompleted: boolean;
  isStartingNode?: boolean; // Optional in Course
  isFinalNode?: boolean;    // Optional in Course
  fixedX?: number;         // For visualization
  fixedY?: number;         // For visualization
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  isDirectPrerequisite: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  maxLevel: number;
}

// Category colors with glowing theme - matches the visualization
export const categoryColors: Record<string, string> = {
  'System Fundamentals': '#3498db',     // Blue
  'Programming Foundations': '#e74c3c', // Red
  'Computer Systems': '#f1c40f',        // Yellow
  'Web Fundamentals': '#2ecc71',        // Green
  'Mathematics & Algorithms': '#9b59b6', // Purple
  'Software Engineering': '#1abc9c',    // Teal
  'Full-Stack Development': '#e67e22',  // Orange
  'Systems & Networks': '#34495e',      // Dark Blue
  'Advanced Applications': '#f39c12',   // Gold
  'Capstone': '#16a085'                 // Dark Teal
};

// Transform curriculum data to graph format with levels and optimized links
export const transformCurriculumToGraphData = (): GraphData => {
  const nodes: GraphNode[] = [];
  const nodeMap: Record<string, GraphNode> = {};
  const allPrerequisites: Record<string, string[]> = {};
  
  // First pass: create nodes
  courseData.years.forEach(year => {
    year.categories.forEach(category => {
      category.courses.forEach(course => {
        const node: GraphNode = {
          id: course.title,
          title: course.title,  // Make sure title is explicitly set
          name: course.title,
          group: category.category_name,
          year: year.year_number,
          description: course.description,
          isStartingNode: course.isStartingNode || false,
          isFinalNode: course.isFinalNode || false,
          level: 0, // Will be calculated later
          prerequisites: course.prerequisites,
          allPrerequisites: [], // Will be calculated
          isUnlocked: course.isStartingNode || false,
          isCompleted: false
        };
        nodes.push(node);
        nodeMap[course.title] = node;
        allPrerequisites[course.title] = [...course.prerequisites];
      });
    });
  });
  
  // Calculate all prerequisites (direct and indirect)
  let changed = true;
  while (changed) {
    changed = false;
    for (const courseId in allPrerequisites) {
      const prereqs = allPrerequisites[courseId];
      
      // For each direct prerequisite, add its prerequisites too
      for (const prereq of [...prereqs]) {
        if (allPrerequisites[prereq]) {
          for (const transitivePrereq of allPrerequisites[prereq]) {
            if (!prereqs.includes(transitivePrereq)) {
              allPrerequisites[courseId].push(transitivePrereq);
              changed = true;
            }
          }
        }
      }
    }
  }
  
  // Store all prerequisites in nodes
  nodes.forEach(node => {
    node.allPrerequisites = allPrerequisites[node.id] || [];
  });
  
  // Calculate levels based on prerequisites (topological ordering)
  changed = true;
  while (changed) {
    changed = false;
    nodes.forEach(node => {
      if (node.isStartingNode) return; // Skip starting nodes
      
      // Find max level of prerequisites
      const prerequisiteLevels = node.prerequisites.map(prereq => 
        nodeMap[prereq] ? nodeMap[prereq].level : 0
      );
      
      const maxPrereqLevel = prerequisiteLevels.length > 0 
        ? Math.max(...prerequisiteLevels) 
        : -1;
      
      // Set node level to max prereq level + 1
      const newLevel = maxPrereqLevel + 1;
      if (node.level !== newLevel) {
        node.level = newLevel;
        changed = true;
      }
    });
  }
  
  // Create optimized links (only direct prerequisites between adjacent levels)
  const links: GraphLink[] = [];
  nodes.forEach(node => {
    const directPrerequisites: string[] = [];
    
    node.prerequisites.forEach(prereqId => {
      const prereqNode = nodeMap[prereqId];
      if (prereqNode && prereqNode.level === node.level - 1) {
        // Only add link if prerequisite is exactly one level below
        directPrerequisites.push(prereqId);
        links.push({
          source: prereqId,
          target: node.id,
          isDirectPrerequisite: true
        });
      }
    });
    
    // If no direct prerequisites were found but we have prerequisites,
    // connect to prerequisites at the highest level available
    if (directPrerequisites.length === 0 && node.prerequisites.length > 0) {
      // Group prerequisites by level
      const prereqsByLevel: Record<number, string[]> = {};
      node.prerequisites.forEach(prereqId => {
        const prereqNode = nodeMap[prereqId];
        if (prereqNode) {
          if (!prereqsByLevel[prereqNode.level]) {
            prereqsByLevel[prereqNode.level] = [];
          }
          prereqsByLevel[prereqNode.level].push(prereqId);
        }
      });
      
      // Find highest level
      const levels = Object.keys(prereqsByLevel).map(Number).sort((a, b) => b - a);
      if (levels.length > 0) {
        const highestLevel = levels[0];
        prereqsByLevel[highestLevel].forEach(prereqId => {
          links.push({
            source: prereqId,
            target: node.id,
            isDirectPrerequisite: true
          });
        });
      }
    }
  });
  
  // Calculate max level
  const maxLevel = Math.max(...nodes.map(n => n.level));
  
  // Process the links to use node objects
  const processedLinks = links.map(link => ({
    source: nodeMap[link.source.toString()] || link.source,
    target: nodeMap[link.target.toString()] || link.target,
    isDirectPrerequisite: link.isDirectPrerequisite
  }));
  
  // Add level count to graph data
  return { 
    nodes, 
    links: processedLinks,
    maxLevel
  };
};

// Get all courses that depend on a specific course
export const getDependentCourses = (courseTitle: string): Course[] => {
  const allCourses = getAllCourses();
  return allCourses.filter(course => 
    course.prerequisites.includes(courseTitle)
  );
};

// Check if all prerequisites are completed for a course
export const areAllPrerequisitesCompleted = (
  courseTitle: string, 
  completedCourses: string[]
): boolean => {
  const course = getAllCourses().find(c => c.title === courseTitle);
  if (!course) return false;
  
  // If it's a starting node, no prerequisites needed
  if (course.isStartingNode) return true;
  
  // Check if all prerequisites are in the completed list
  return course.prerequisites.every(prereq => 
    completedCourses.includes(prereq)
  );
};

// Get unlocked courses based on current completed courses
export const getUnlockedCourses = (completedCourses: string[]): string[] => {
  const unlockedCourses: string[] = [];
  const allCourses = getAllCourses();
  
  // First add starting nodes
  allCourses
    .filter(course => course.isStartingNode)
    .forEach(course => unlockedCourses.push(course.title));
  
  // Then add courses whose prerequisites are all completed
  allCourses
    .filter(course => !course.isStartingNode)
    .forEach(course => {
      const allPrereqsMet = course.prerequisites.every(prereq => 
        completedCourses.includes(prereq)
      );
      
      if (allPrereqsMet) {
        unlockedCourses.push(course.title);
      }
    });
  
  return unlockedCourses;
};