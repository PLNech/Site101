import { CurriculumData } from './types';

export const curriculumData: CurriculumData = {
  "program_name": "Open Source Computer Science School: Learn by Doing",
  "years": [
    {
      "year_number": 1,
      "year_title": "FOUNDATIONS & CORE PROGRAMMING",
      "categories": [
        {
          "category_name": "System Fundamentals",
          "courses": [
            {
              "title": "GNU/Linux Fundamentals",
              "description": "Introduction to GNU/Linux operating systems, file system hierarchy, permissions, users, and groups.",
              "prerequisites": [],
              "isStartingNode": true
            },
            // Other courses in this category...
          ]
        },
        // Other categories...
      ]
    },
    // Year 2 data...
  ]
};

// Category colors with glowing theme
export const categoryColors = {
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