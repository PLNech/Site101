import React from 'react';
import { GraphNode, categoryColors } from './courseUtils';

interface CourseDetailsProps {
  selectedNode: GraphNode | null;
  completedCourses: string[];
  unlockedCourses: string[];
  completeCourse: (courseId: string) => void;
  relatedCourses: {
    prerequisites: string[];
    dependents: string[];
    allPrerequisites: string[];
  } | null;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  selectedNode,
  completedCourses,
  unlockedCourses,
  completeCourse,
  relatedCourses
}) => {
  if (!selectedNode) {
    return (
      <div className="p-4 border rounded-lg shadow-md bg-card border-border text-foreground">
        <p>Click on an unlocked skill node to see details and complete the course to unlock connected courses.</p>
      </div>
    );
  }

  const isCourseCompleted = (courseId: string) => completedCourses.includes(courseId);
  const isCourseUnlocked = (courseId: string) => unlockedCourses.includes(courseId);
  const allPrerequisitesComplete = selectedNode.allPrerequisites.every(prereq => 
    completedCourses.includes(prereq)
  );

  // Safe access to category colors with fallback
  const getCategoryColor = (category: string): string => {
    return (categoryColors as Record<string, string>)[category] || '#888';
  };

  return (
    <div className={`p-4 border rounded-lg shadow-md bg-card border-opacity-50 ${
      isCourseCompleted(selectedNode.id) ? 'border-secondary' : 
      isCourseUnlocked(selectedNode.id) ? 'border' : 'border-border'
    }`} 
      style={{ 
        borderColor: isCourseCompleted(selectedNode.id) ? 
          'var(--secondary)' : isCourseUnlocked(selectedNode.id) ? 
          getCategoryColor(selectedNode.group) : undefined 
      }}>
      <div className="flex justify-between items-center pb-2 border-b" 
        style={{ 
          borderColor: isCourseCompleted(selectedNode.id) ? 
            'var(--secondary)' : isCourseUnlocked(selectedNode.id) ? 
            getCategoryColor(selectedNode.group) : 'var(--border)' 
        }}>
        <h3 className="text-lg font-semibold text-foreground" 
          style={{ 
            color: isCourseCompleted(selectedNode.id) ? 
              'var(--secondary)' : isCourseUnlocked(selectedNode.id) ? 
              getCategoryColor(selectedNode.group) : 'var(--foreground)' 
          }}>
          {selectedNode.name}
        </h3>
        <div className="text-sm font-medium px-2 py-1 rounded-full" 
          style={{ 
            backgroundColor: isCourseCompleted(selectedNode.id) ? 
              'rgba(48, 225, 164, 0.2)' : isCourseUnlocked(selectedNode.id) ? 
              'rgba(126, 48, 225, 0.2)' : 'rgba(63, 51, 83, 0.4)',
            color: isCourseCompleted(selectedNode.id) ? 
              'var(--secondary)' : isCourseUnlocked(selectedNode.id) ? 
              'var(--foreground)' : 'var(--muted)'
          }}>
          {isCourseCompleted(selectedNode.id) ? 'Completed' : 
          isCourseUnlocked(selectedNode.id) ? 'Unlocked' : 'Locked'}
        </div>
      </div>
      
      <div className="my-4 text-foreground">
        <p className="my-2"><strong>Year:</strong> <span>{selectedNode.year}</span></p>
        <p className="my-2"><strong>Category:</strong> <span>{selectedNode.group}</span></p>
        <p className="my-2"><strong>Level:</strong> <span>{selectedNode.level}</span></p>
        <p className="my-2"><strong>Description:</strong> <span className="text-foreground opacity-80">{selectedNode.description}</span></p>
      </div>
      
      {relatedCourses && (
        <>
          <div className="mt-4">
            <h4 className="font-medium text-foreground">Direct Prerequisites:</h4>
            {relatedCourses.prerequisites.length > 0 ? (
              <ul className="list-disc pl-5 mt-1">
                {relatedCourses.prerequisites.map(prerequisite => (
                  <li key={prerequisite} 
                    className={completedCourses.includes(prerequisite) ? 
                      "text-secondary" : "text-foreground opacity-80"}>
                    {prerequisite} {completedCourses.includes(prerequisite) ? '✓' : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-muted mt-1">No direct prerequisites</p>
            )}
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-foreground">Unlocks Directly:</h4>
            {relatedCourses.dependents.length > 0 ? (
              <ul className="list-disc pl-5 mt-1">
                {relatedCourses.dependents.map(dependent => {
                  const isCompleted = completedCourses.includes(dependent);
                  const isUnlocked = unlockedCourses.includes(dependent);
                  
                  return (
                    <li key={dependent} 
                      className={
                        isCompleted ? "text-secondary" : 
                        isUnlocked ? "text-foreground" : "text-muted"
                      }>
                      {dependent} {isCompleted ? '✓' : isUnlocked ? '' : '🔒'}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="italic text-muted mt-1">This is a terminal course</p>
            )}
          </div>
        </>
      )}
      
      {/* Complete course button */}
      {isCourseUnlocked(selectedNode.id) && !isCourseCompleted(selectedNode.id) && (
        <button
          className="mt-6 w-full py-2 px-4 rounded font-medium text-foreground transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: allPrerequisitesComplete ? 'var(--secondary)' : 'var(--primary-dark)',
            boxShadow: `0 0 10px ${allPrerequisitesComplete ? 'var(--secondary)' : 'var(--primary-dark)'}`
          }}
          onClick={() => completeCourse(selectedNode.id)}
          disabled={!allPrerequisitesComplete}
        >
          {allPrerequisitesComplete ? 'Complete Course' : 'Complete Prerequisites First'}
        </button>
      )}
      
      {isCourseCompleted(selectedNode.id) && (
        <div className="mt-6 w-full py-2 px-4 rounded font-medium text-center text-secondary bg-card bg-opacity-20 border border-secondary border-opacity-30">
          Course Completed! ✓
        </div>
      )}
    </div>
  );
};

export default CourseDetails; 