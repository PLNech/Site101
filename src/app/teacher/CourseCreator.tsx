"use client";

import React, { useState } from 'react';
import { useCourseContext } from '@/app/contexts/CourseContext';
import { Course } from '@/app/components/curriculum/courseData';
import PrerequisiteSelector from './PrerequisiteSelector';

interface CourseCreatorProps {
  yearNumber: number;
  categoryName: string;
  onCancel: () => void;
}

export default function CourseCreator({ yearNumber, categoryName, onCancel }: CourseCreatorProps) {
  const { addCourse, allCourseNames } = useCourseContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [isStartingNode, setIsStartingNode] = useState(false);
  const [isFinalNode, setIsFinalNode] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that title is unique
    if (allCourseNames.includes(title)) {
      setError('Un cours avec ce titre existe déjà. Veuillez choisir un titre différent.');
      return;
    }
    
    const newCourse: Course = {
      title,
      description,
      prerequisites,
      ...(isStartingNode && { isStartingNode: true }),
      ...(isFinalNode && { isFinalNode: true })
    };
    
    addCourse(newCourse, categoryName, yearNumber);
    onCancel();
  };
  
  return (
    <div className="p-6 bg-black/20 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Créer un nouveau cours</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Titre
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-2 bg-black/30 rounded border border-gray-600 focus:ring-primary focus:border-primary"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-2 bg-black/30 rounded border border-gray-600 focus:ring-primary focus:border-primary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            Prérequis
          </label>
          <PrerequisiteSelector
            selectedPrerequisites={prerequisites}
            onChange={setPrerequisites}
            currentCourseTitle=""
          />
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              id="isStartingNode"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 text-primary focus:ring-primary"
              checked={isStartingNode}
              onChange={(e) => setIsStartingNode(e.target.checked)}
            />
            <label htmlFor="isStartingNode" className="ml-2 block text-sm">
              Cours initial
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="isFinalNode"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-600 text-primary focus:ring-primary"
              checked={isFinalNode}
              onChange={(e) => setIsFinalNode(e.target.checked)}
            />
            <label htmlFor="isFinalNode" className="ml-2 block text-sm">
              Cours final
            </label>
          </div>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium transition-colors"
          >
            Créer le cours
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
} 