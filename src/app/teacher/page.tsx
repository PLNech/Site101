"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCourseContext } from '@/app/contexts/CourseContext';
import { useStudentContext } from '@/app/contexts/StudentContext';
import CourseManager from './CourseManager';

export default function TeacherPage() {
  const { isAdmin } = useStudentContext();
  const router = useRouter();

  // Redirect non-admin users
  React.useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Accès restreint. Redirection...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gestion du Curriculum</h1>
      <CourseManager />
    </div>
  );
} 