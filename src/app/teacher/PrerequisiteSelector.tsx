"use client";

import React, { useState, useEffect } from 'react';
import { useCourseContext } from '@/app/contexts/CourseContext';

interface PrerequisiteSelectorProps {
  selectedPrerequisites: string[];
  onChange: (prerequisites: string[]) => void;
  currentCourseTitle: string;
}

export default function PrerequisiteSelector({
  selectedPrerequisites,
  onChange,
  currentCourseTitle
}: PrerequisiteSelectorProps) {
  const { allCourseNames } = useCourseContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  
  // Filter out the current course from available prerequisites
  useEffect(() => {
    const filteredCourses = allCourseNames.filter(
      name => name !== currentCourseTitle
    );
    setAvailableCourses(filteredCourses);
  }, [allCourseNames, currentCourseTitle]);
  
  const handleAddPrerequisite = (course: string) => {
    if (!selectedPrerequisites.includes(course)) {
      onChange([...selectedPrerequisites, course]);
    }
    setSearchTerm('');
  };
  
  const handleRemovePrerequisite = (course: string) => {
    onChange(selectedPrerequisites.filter(p => p !== course));
  };
  
  // Filter courses based on search term
  const filteredCourses = availableCourses
    .filter(course => 
      !selectedPrerequisites.includes(course) && 
      course.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5); // Limit to 5 results for better UX
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 bg-black/30 rounded border border-gray-600 focus:ring-primary focus:border-primary"
          placeholder="Rechercher un cours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {searchTerm && filteredCourses.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 rounded border border-gray-600 shadow-lg max-h-48 overflow-y-auto">
            {filteredCourses.map(course => (
              <button
                key={course}
                type="button"
                className="w-full text-left p-2 hover:bg-gray-700 focus:bg-gray-700 transition-colors"
                onClick={() => handleAddPrerequisite(course)}
              >
                {course}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {selectedPrerequisites.length === 0 ? (
          <p className="text-sm text-gray-400">Aucun prérequis sélectionné</p>
        ) : (
          <ul className="space-y-1">
            {selectedPrerequisites.map(prerequisite => (
              <li 
                key={prerequisite}
                className="flex items-center bg-gray-700/30 p-2 rounded group"
              >
                <span className="flex-grow">{prerequisite}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePrerequisite(prerequisite)}
                  className="p-1 ml-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Supprimer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 