"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Mock student data for demonstration
const mockStudentData = {
  id: "s123456",
  name: "Alex Dupont",
  email: "alex.dupont@example.com",
  parcours: "Développement et IA",
  niveau: "Année 1",
  promotion: "2023-2024",
  progression: {
    completedCourses: 8,
    totalCourses: 24,
    inProgressCourses: 3,
    nextEvaluation: "2024-07-15",
    currentFocus: "Frontend Development with React"
  }
};

// Admin placeholder for view switching
const mockAdminData = {
  id: "a789012",
  name: "Professeur Martin",
  email: "prof.martin@example.com",
  role: "Professeur",
  department: "Développement Web"
};

interface StudentData {
  id: string;
  name: string;
  email: string;
  parcours: string;
  niveau: string;
  promotion: string;
  progression: {
    completedCourses: number;
    totalCourses: number;
    inProgressCourses: number;
    nextEvaluation: string;
    currentFocus: string;
  };
}

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

interface StudentContextType {
  currentStudent: StudentData;
  isAdmin: boolean;
  adminData: AdminData | null;
  toggleAdminView: () => void;
  setActiveStudent: (studentId: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<StudentData>(mockStudentData);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData | null>(mockAdminData);

  const toggleAdminView = () => {
    setIsAdmin(!isAdmin);
  };

  const setActiveStudent = (studentId: string) => {
    // In a real app, this would fetch the student data by ID
    // For now, we'll just keep using the mock data
    console.log(`Setting active student to ${studentId}`);
    // We could add logic here to look up a different student if we had multiple
  };

  return (
    <StudentContext.Provider
      value={{
        currentStudent,
        isAdmin,
        adminData,
        toggleAdminView,
        setActiveStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
} 