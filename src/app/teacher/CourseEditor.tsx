"use client";

import React, { useState, useEffect } from 'react';
import { useCourseContext } from '@/app/contexts/CourseContext';
import { Course } from '@/app/components/curriculum/courseData';
import PrerequisiteSelector from './PrerequisiteSelector';

interface CourseEditorProps {
  course: Course;
  onCancel: () => void;
}

export default function CourseEditor({ course, onCancel }: CourseEditorProps) {
  const { updateCourse, deleteCourse } = useCourseContext();
  
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [prerequisites, setPrerequisites] = useState<string[]>([...course.prerequisites]);
  const [isStartingNode, setIsStartingNode] = useState(course.isStartingNode || false);
  const [isFinalNode, setIsFinalNode] = useState(course.isFinalNode || false);
  
  // Update form when course changes
  useEffect(() => {
    setTitle(course.title);
    setDescription(course.description);
    setPrerequisites([...course.prerequisites]);
    setIsStartingNode(course.isStartingNode || false);
    setIsFinalNode(course.isFinalNode || false);
  }, [course]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedCourse: Course = {
      title,
      description,
      prerequisites,
      isStartingNode: isStartingNode || undefined,
      isFinalNode: isFinalNode || undefined
    };
    
    updateCourse(course.title, updatedCourse);
    onCancel();
  };
  
  const handleDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le cours "${course.title}" ? Cette action est irréversible.`)) {
      deleteCourse(course.title);
      onCancel();
    }
  };
  
  return (
    <div className="p-6 bg-black/20 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Modifier un cours</h2>
      
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
            onChange={(e) => setTitle(e.target.value)}
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
            currentCourseTitle={course.title}
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors"
          >
            Enregistrer les modifications
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-medium transition-colors"
          >
            Annuler
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium transition-colors ml-auto"
          >
            Supprimer ce cours
          </button>
        </div>
      </form>
    </div>
  );
} 