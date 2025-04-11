"use client";

import React, { useState } from 'react';
import { useCourseContext } from '@/app/contexts/CourseContext';
import { Course } from '@/app/components/curriculum/courseData';
import CourseEditor from './CourseEditor';
import CourseCreator from './CourseCreator';

export default function CourseManager() {
  const { curriculum, resetToDefault } = useCourseContext();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearNumber = parseInt(e.target.value, 10);
    setSelectedYear(yearNumber);
    setSelectedCategory(null);
    setSelectedCourse(null);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedCourse(null);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseTitle = e.target.value;
    if (selectedYear && selectedCategory) {
      const year = curriculum.years.find(y => y.year_number === selectedYear);
      if (year) {
        const category = year.categories.find(c => c.category_name === selectedCategory);
        if (category) {
          const course = category.courses.find(c => c.title === courseTitle);
          if (course) {
            setSelectedCourse(course);
            setIsCreatingCourse(false);
          }
        }
      }
    }
  };

  const handleCreateNewCourse = () => {
    setSelectedCourse(null);
    setIsCreatingCourse(true);
  };

  const handleResetData = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données du curriculum ? Cette action est irréversible.")) {
      resetToDefault();
      setSelectedYear(null);
      setSelectedCategory(null);
      setSelectedCourse(null);
      setIsCreatingCourse(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6 p-6 bg-black/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Sélectionner un cours</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="yearSelect" className="block text-sm font-medium mb-1">
              Année
            </label>
            <select
              id="yearSelect"
              className="w-full p-2 bg-black/30 rounded border border-gray-600 focus:ring-primary focus:border-primary"
              onChange={handleYearChange}
              value={selectedYear || ""}
            >
              <option value="">Sélectionner une année</option>
              {curriculum.years.map(year => (
                <option key={year.year_number} value={year.year_number}>
                  {year.year_number}: {year.year_title}
                </option>
              ))}
            </select>
          </div>

          {selectedYear && (
            <div>
              <label htmlFor="categorySelect" className="block text-sm font-medium mb-1">
                Catégorie
              </label>
              <select
                id="categorySelect"
                className="w-full p-2 bg-black/30 rounded border border-gray-600 focus:ring-primary focus:border-primary"
                onChange={handleCategoryChange}
                value={selectedCategory || ""}
              >
                <option value="">Sélectionner une catégorie</option>
                {curriculum.years
                  .find(y => y.year_number === selectedYear)
                  ?.categories.map(category => (
                    <option key={category.category_name} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {selectedYear && selectedCategory && (
            <div>
              <label htmlFor="courseSelect" className="block text-sm font-medium mb-1">
                Cours
              </label>
              <select
                id="courseSelect"
                className="w-full p-2 bg-black/30 rounded border border-gray-600 focus:ring-primary focus:border-primary"
                onChange={handleCourseChange}
                value={selectedCourse?.title || ""}
              >
                <option value="">Sélectionner un cours</option>
                {curriculum.years
                  .find(y => y.year_number === selectedYear)
                  ?.categories.find(c => c.category_name === selectedCategory)
                  ?.courses.map(course => (
                    <option key={course.title} value={course.title}>
                      {course.title}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button
            onClick={handleCreateNewCourse}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium transition-colors"
            disabled={!selectedYear || !selectedCategory}
          >
            Créer un nouveau cours
          </button>
          
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-medium transition-colors"
          >
            Réinitialiser toutes les données
          </button>
        </div>
      </div>

      <div className="lg:col-span-2">
        {isCreatingCourse && selectedYear && selectedCategory ? (
          <CourseCreator 
            yearNumber={selectedYear} 
            categoryName={selectedCategory}
            onCancel={() => setIsCreatingCourse(false)}
          />
        ) : selectedCourse ? (
          <CourseEditor 
            course={selectedCourse} 
            onCancel={() => setSelectedCourse(null)}
          />
        ) : (
          <div className="p-8 bg-black/20 rounded-lg flex items-center justify-center min-h-[400px]">
            <p className="text-lg text-gray-400">
              Sélectionnez un cours à modifier ou créez-en un nouveau
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 