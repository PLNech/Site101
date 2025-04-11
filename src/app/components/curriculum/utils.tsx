import { CurriculumData, GraphData, Node, Link } from './types';

// Transform curriculum data to graph format with levels and optimized links
export const transformCurriculumToGraphData = (curriculum: CurriculumData): GraphData => {
  const nodes: Node[] = [];
  const nodeMap: Record<string, Node> = {};
  const allPrerequisites: Record<string, string[]> = {};
  
  // First pass: create nodes
  curriculum.years.forEach(year => {
    year.categories.forEach(category => {
      category.courses.forEach(course => {
        const node: Node = {
          id: course.title,
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
  const links: Link[] = [];
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
    source: nodeMap[link.source as string] || link.source,
    target: nodeMap[link.target as string] || link.target,
    isDirectPrerequisite: link.isDirectPrerequisite
  }));
  
  // Return graph data
  return { 
    nodes, 
    links: processedLinks,
    maxLevel
  };
}; 