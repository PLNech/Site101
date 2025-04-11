"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import courseData, { 
  Course, 
  Category, 
  Year, 
  CurriculumData,
  getAllCourses
} from '@/app/components/curriculum/courseData';

interface CourseContextType {
  curriculum: CurriculumData;
  updateCourse: (courseTitle: string, updatedCourse: Course) => void;
  addCourse: (newCourse: Course, categoryName: string, yearNumber: number) => void;
  deleteCourse: (courseTitle: string) => void;
  resetToDefault: () => void;
  allCourseNames: string[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'course_curriculum_data';

export function CourseProvider({ children }: { children: ReactNode }) {
  const [curriculum, setCurriculum] = useState<CurriculumData>(courseData);
  const [allCourseNames, setAllCourseNames] = useState<string[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as CurriculumData;
        setCurriculum(parsedData);
      } catch (error) {
        console.error('Failed to parse saved curriculum data:', error);
        // Fallback to default data
        setCurriculum(courseData);
      }
    }
    
    // Update course names list
    setAllCourseNames(getAllCourses().map(course => course.title));
  }, []);

  // Save to localStorage whenever curriculum changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(curriculum));
    
    // Update course names list when curriculum changes
    setAllCourseNames(
      curriculum.years.flatMap(year => 
        year.categories.flatMap(category => 
          category.courses.map(course => course.title)
        )
      )
    );
  }, [curriculum]);

  // Update an existing course
  const updateCourse = (courseTitle: string, updatedCourse: Course) => {
    setCurriculum(prevCurriculum => {
      const newCurriculum = { ...prevCurriculum };
      
      // Find and update the course
      for (const year of newCurriculum.years) {
        for (const category of year.categories) {
          const courseIndex = category.courses.findIndex(c => c.title === courseTitle);
          if (courseIndex !== -1) {
            category.courses[courseIndex] = updatedCourse;
            return newCurriculum;
          }
        }
      }
      
      return prevCurriculum; // Return unchanged if course not found
    });
  };

  // Add a new course to a specific category
  const addCourse = (newCourse: Course, categoryName: string, yearNumber: number) => {
    setCurriculum(prevCurriculum => {
      const newCurriculum = { ...prevCurriculum };
      
      // Find the right year and category
      const yearIndex = newCurriculum.years.findIndex(y => y.year_number === yearNumber);
      if (yearIndex === -1) return prevCurriculum;
      
      const categoryIndex = newCurriculum.years[yearIndex].categories.findIndex(
        c => c.category_name === categoryName
      );
      if (categoryIndex === -1) return prevCurriculum;
      
      // Add the new course
      newCurriculum.years[yearIndex].categories[categoryIndex].courses.push(newCourse);
      return newCurriculum;
    });
  };

  // Delete a course
  const deleteCourse = (courseTitle: string) => {
    setCurriculum(prevCurriculum => {
      const newCurriculum = { ...prevCurriculum };
      
      // Find and remove the course
      for (const year of newCurriculum.years) {
        for (const category of year.categories) {
          const courseIndex = category.courses.findIndex(c => c.title === courseTitle);
          if (courseIndex !== -1) {
            // Remove this course
            category.courses.splice(courseIndex, 1);
            
            // Also update prerequisites in all other courses that reference this one
            for (const y of newCurriculum.years) {
              for (const c of y.categories) {
                for (const course of c.courses) {
                  course.prerequisites = course.prerequisites.filter(
                    prereq => prereq !== courseTitle
                  );
                }
              }
            }
            
            return newCurriculum;
          }
        }
      }
      
      return prevCurriculum; // Return unchanged if course not found
    });
  };

  // Reset to default data
  const resetToDefault = () => {
    setCurriculum(courseData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <CourseContext.Provider
      value={{
        curriculum,
        updateCourse,
        addCourse,
        deleteCourse,
        resetToDefault,
        allCourseNames
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
}
