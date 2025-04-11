import React from 'react';
import { Node } from './types';
import { categoryColors } from './CurriculumData';

interface CourseDetailsProps {
  selectedNode: Node | null;
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
      <div className="p-4 border rounded-lg shadow-md bg-gray-800 border-gray-700">
        <p className="text-gray-300">Click on an unlocked skill node to see details and complete the course to unlock connected courses.</p>
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
    <div className={`p-4 border rounded-lg shadow-md bg-gray-800 border-opacity-50 ${
      isCourseCompleted(selectedNode.id) ? 'border-green-500' : 
      isCourseUnlocked(selectedNode.id) ? 'border' : 'border-gray-700'
    }`} 
      style={{ 
        borderColor: isCourseCompleted(selectedNode.id) ? 
          '#2ecc71' : isCourseUnlocked(selectedNode.id) ? 
          getCategoryColor(selectedNode.group) : undefined 
      }}>
      <div className="flex justify-between items-center pb-2 border-b" 
        style={{ 
          borderColor: isCourseCompleted(selectedNode.id) ? 
            '#2ecc71' : isCourseUnlocked(selectedNode.id) ? 
            getCategoryColor(selectedNode.group) : '#555' 
        }}>
        <h3 className="text-lg font-semibold" 
          style={{ 
            color: isCourseCompleted(selectedNode.id) ? 
              '#2ecc71' : isCourseUnlocked(selectedNode.id) ? 
              getCategoryColor(selectedNode.group) : '#888' 
          }}>
          {selectedNode.name}
        </h3>
        <div className="text-sm font-medium px-2 py-1 rounded-full" 
          style={{ 
            backgroundColor: isCourseCompleted(selectedNode.id) ? 
              'rgba(46, 204, 113, 0.2)' : isCourseUnlocked(selectedNode.id) ? 
              'rgba(255, 255, 255, 0.1)' : 'rgba(80, 80, 80, 0.2)',
            color: isCourseCompleted(selectedNode.id) ? 
              '#2ecc71' : isCourseUnlocked(selectedNode.id) ? 
              '#fff' : '#888'
          }}>
          {isCourseCompleted(selectedNode.id) ? 'Completed' : 
          isCourseUnlocked(selectedNode.id) ? 'Unlocked' : 'Locked'}
        </div>
      </div>
      
      <div className="my-4">
        <p className="my-2"><strong className="text-gray-300">Year:</strong> <span className="text-white">{selectedNode.year}</span></p>
        <p className="my-2"><strong className="text-gray-300">Category:</strong> <span className="text-white">{selectedNode.group}</span></p>
        <p className="my-2"><strong className="text-gray-300">Level:</strong> <span className="text-white">{selectedNode.level}</span></p>
        <p className="my-2"><strong className="text-gray-300">Description:</strong> <span className="text-gray-300">{selectedNode.description}</span></p>
      </div>
      
      {relatedCourses && (
        <>
          <div className="mt-4">
            <h4 className="font-medium text-gray-300">Direct Prerequisites:</h4>
            {relatedCourses.prerequisites.length > 0 ? (
              <ul className="list-disc pl-5 mt-1">
                {relatedCourses.prerequisites.map(prerequisite => (
                  <li key={prerequisite} 
                    className={completedCourses.includes(prerequisite) ? 
                      "text-green-400" : "text-gray-400"}>
                    {prerequisite} {completedCourses.includes(prerequisite) ? '✓' : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-500 mt-1">No direct prerequisites</p>
            )}
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-300">Unlocks Directly:</h4>
            {relatedCourses.dependents.length > 0 ? (
              <ul className="list-disc pl-5 mt-1">
                {relatedCourses.dependents.map(dependent => {
                  const isCompleted = completedCourses.includes(dependent);
                  const isUnlocked = unlockedCourses.includes(dependent);
                  
                  return (
                    <li key={dependent} 
                      className={
                        isCompleted ? "text-green-400" : 
                        isUnlocked ? "text-white" : "text-gray-500"
                      }>
                      {dependent} {isCompleted ? '✓' : isUnlocked ? '' : '🔒'}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="italic text-gray-500 mt-1">This is a terminal course</p>
            )}
          </div>
        </>
      )}
      
      {/* Complete course button */}
      {isCourseUnlocked(selectedNode.id) && !isCourseCompleted(selectedNode.id) && (
        <button
          className="mt-6 w-full py-2 px-4 rounded font-medium text-white transition-all duration-200 focus:outline-none"
          style={{
            backgroundColor: allPrerequisitesComplete ? '#2ecc71' : '#e74c3c',
            boxShadow: `0 0 10px ${allPrerequisitesComplete ? '#2ecc71' : '#e74c3c'}`
          }}
          onClick={() => completeCourse(selectedNode.id)}
          disabled={!allPrerequisitesComplete}
        >
          {allPrerequisitesComplete ? 'Complete Course' : 'Complete Prerequisites First'}
        </button>
      )}
      
      {isCourseCompleted(selectedNode.id) && (
        <div className="mt-6 w-full py-2 px-4 rounded font-medium text-center text-green-400 bg-green-900 bg-opacity-20 border border-green-700">
          Course Completed! ✓
        </div>
      )}
    </div>
  );
};

export default CourseDetails; 