"use client";

import React from 'react';
import { useStudentContext } from '@/app/contexts/StudentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CalendarIcon, BookOpenIcon, GraduationCapIcon, ClockIcon } from 'lucide-react';
import AppHeader from '@/app/components/header/AppHeader';

export default function StudentDashboard() {
  const { currentStudent, isAdmin, toggleAdminView } = useStudentContext();
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="flex-grow p-6">
        {isAdmin ? (
          <AdminView />
        ) : (
          <StudentView student={currentStudent} />
        )}
        
        <div className="mt-8 text-center">
          <Button onClick={toggleAdminView}>
            {isAdmin ? "Switch to Student View" : "Switch to Admin View"}
          </Button>
        </div>
      </main>
    </div>
  );
}

function StudentView({ student }: { student: any }) {
  const progress = (student.progression.completedCourses / student.progression.totalCourses) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle>Bienvenue, {student.name}!</CardTitle>
            <CardDescription>
              {student.parcours} - {student.niveau}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Progression globale</div>
                  <div className="text-sm text-muted-foreground">
                    {student.progression.completedCourses}/{student.progression.totalCourses} modules
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <BookOpenIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Modules en cours</p>
                    <p className="text-sm text-muted-foreground">{student.progression.inProgressCourses} modules actifs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Prochaine évaluation</p>
                    <p className="text-sm text-muted-foreground">{student.progression.nextEvaluation}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <GraduationCapIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Promotion</p>
                    <p className="text-sm text-muted-foreground">{student.promotion}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Focus actuel</p>
                    <p className="text-sm text-muted-foreground">{student.progression.currentFocus}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpenIcon className="mr-2 h-4 w-4" />
                Reprendre mes cours
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Voir mon planning
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <GraduationCapIcon className="mr-2 h-4 w-4" />
                Consulter mes notes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Activités récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">
                <span className="font-semibold">Module 5 - Chapitre 3</span> terminé
                <div className="text-xs text-muted-foreground">Il y a 2 jours</div>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Quiz React Hooks</span> réussi avec 85%
                <div className="text-xs text-muted-foreground">Il y a 4 jours</div>
              </li>
              <li className="text-sm">
                <span className="font-semibold">TP Framework CSS</span> soumis
                <div className="text-xs text-muted-foreground">Il y a 1 semaine</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prochains événements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">
                <span className="font-semibold">Workshop UX/UI</span>
                <div className="text-xs text-muted-foreground">15 Juillet 2024, 14h-16h</div>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Soutenance de projet</span>
                <div className="text-xs text-muted-foreground">28 Juillet 2024, 10h</div>
              </li>
              <li className="text-sm">
                <span className="font-semibold">Conférence Tech</span>
                <div className="text-xs text-muted-foreground">5 Août 2024, 18h-20h</div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ressources pédagogiques</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="text-sm">
                <a href="#" className="text-primary hover:underline">Documentation React</a>
              </li>
              <li className="text-sm">
                <a href="#" className="text-primary hover:underline">Guide TypeScript</a>
              </li>
              <li className="text-sm">
                <a href="#" className="text-primary hover:underline">Tutoriel NextJS</a>
              </li>
              <li className="text-sm">
                <a href="#" className="text-primary hover:underline">Bonnes pratiques CSS</a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminView() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Vue Administrateur</CardTitle>
          <CardDescription>Cette vue est réservée aux professeurs et administrateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Vous êtes connecté en tant qu'administrateur. Cette interface vous permet de gérer les étudiants, les cours et les évaluations.</p>
          <p className="mt-4">Fonctionnalités à venir:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Gestion des étudiants</li>
            <li>Création et modification de cours</li>
            <li>Planification d'évaluations</li>
            <li>Suivi de progression des étudiants</li>
            <li>Gestion des notifications</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 