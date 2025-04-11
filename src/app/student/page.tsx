"use client"

import React, { useState } from 'react';
import Link from "next/link";
import CurriculumGraph from "@/app/components/curriculum";
import UserDropdown from "@/components/header/UserDropdown";
import { useStudentContext } from "@/app/contexts/StudentContext";

// Mock student data
const studentData = {
  name: "John Doe",
  email: "john.doe@etudiant.ecole101vitry.fr",
  promotion: "Promotion 2024",
  parcours: "Développement et IA",
  niveau: "Année 1",
  progression: {
    coursesCompleted: 5,
    coursesInProgress: 2,
    totalCourses: 45,
    nextEvaluation: "15/06/2024",
  }
};

export default function StudentPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentStudent } = useStudentContext();
  
  return (
    <div className="content-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 flex items-center justify-between px-6 sm:px-10 border-b border-border h-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="font-mono text-white font-bold">101</span>
            </div>
            <h1 className="font-bold text-xl">École 101</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <UserDropdown />
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card/20 hidden lg:block pt-6">
          <nav className="px-4">
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-card'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('curriculum')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'curriculum' ? 'bg-primary/10 text-primary' : 'hover:bg-card'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Parcours
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'projects' ? 'bg-primary/10 text-primary' : 'hover:bg-card'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 9C2 8.46957 2.21071 7.96086 2.58579 7.58579C2.96086 7.21071 3.46957 7 4 7H20C20.5304 7 21.0391 7.21071 21.4142 7.58579C21.7893 7.96086 22 8.46957 22 9V20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 7V3.5C8 2.83696 8.26339 2.20107 8.73223 1.73223C9.20107 1.26339 9.83696 1 10.5 1H13.5C14.163 1 14.7989 1.26339 15.2678 1.73223C15.7366 2.20107 16 2.83696 16 3.5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Projets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('evaluations')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'evaluations' ? 'bg-primary/10 text-primary' : 'hover:bg-card'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 14L11 16L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Évaluations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('community')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'community' ? 'bg-primary/10 text-primary' : 'hover:bg-card'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Communauté
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 space-y-6">
                  {/* Welcome card */}
                  <div className="card p-6">
                    <h1 className="text-2xl font-bold mb-2">Bienvenue, {studentData.name}</h1>
                    <p className="text-muted">
                      Votre espace personnel pour suivre votre progression et accéder à vos ressources pédagogiques à l'École 101.
                    </p>
                    
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-card-hover p-4 rounded-lg">
                        <p className="text-sm text-muted">Parcours</p>
                        <p className="font-medium">{studentData.parcours}</p>
                      </div>
                      <div className="bg-card-hover p-4 rounded-lg">
                        <p className="text-sm text-muted">Niveau</p>
                        <p className="font-medium">{studentData.niveau}</p>
                      </div>
                      <div className="bg-card-hover p-4 rounded-lg">
                        <p className="text-sm text-muted">Promotion</p>
                        <p className="font-medium">{studentData.promotion}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress card */}
                  <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Progression globale</h2>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-muted">Cours complétés</span>
                        <span className="text-sm font-medium">{studentData.progression.coursesCompleted}/{studentData.progression.totalCourses}</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-secondary to-accent h-2.5 rounded-full" 
                          style={{ width: `${(studentData.progression.coursesCompleted / studentData.progression.totalCourses) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-card-hover p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-secondary">{studentData.progression.coursesCompleted}</div>
                        <p className="text-sm text-muted">Cours complétés</p>
                      </div>
                      <div className="bg-card-hover p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{studentData.progression.coursesInProgress}</div>
                        <p className="text-sm text-muted">Cours en cours</p>
                      </div>
                      <div className="bg-card-hover p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-accent">{studentData.progression.nextEvaluation}</div>
                        <p className="text-sm text-muted">Prochaine évaluation</p>
                      </div>
                    </div>
                    
                    <Link href="#" onClick={() => setActiveTab('curriculum')} className="btn-primary w-full">
                      Voir mon parcours complet
                    </Link>
                  </div>
                </div>
                
                <div className="md:w-1/3 space-y-6">
                  {/* Calendar card */}
                  <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Agenda</h2>
                    <div className="space-y-3">
                      <div className="flex gap-3 items-start p-3 bg-card-hover rounded-lg">
                        <div className="min-w-10 text-center">
                          <div className="text-xs text-muted">JUN</div>
                          <div className="text-xl font-bold">15</div>
                        </div>
                        <div>
                          <h3 className="font-medium">Évaluation - React.js</h3>
                          <p className="text-sm text-muted">10:00 - 12:00, Salle B12</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 bg-card-hover rounded-lg">
                        <div className="min-w-10 text-center">
                          <div className="text-xs text-muted">JUN</div>
                          <div className="text-xl font-bold">18</div>
                        </div>
                        <div>
                          <h3 className="font-medium">Atelier - API Design</h3>
                          <p className="text-sm text-muted">14:00 - 17:00, Labo A</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start p-3 bg-card-hover rounded-lg">
                        <div className="min-w-10 text-center">
                          <div className="text-xs text-muted">JUN</div>
                          <div className="text-xl font-bold">22</div>
                        </div>
                        <div>
                          <h3 className="font-medium">Rendu Projet - Backend Node.js</h3>
                          <p className="text-sm text-muted">Date limite 23:59</p>
                        </div>
                      </div>
                    </div>
                    <Link href="#" className="btn-secondary w-full mt-4">
                      Voir l'agenda complet
                    </Link>
                  </div>
                  
                  {/* Resources card */}
                  <div className="card p-6">
                    <h2 className="text-xl font-bold mb-4">Ressources</h2>
                    <ul className="space-y-2">
                      <li>
                        <Link href="#" className="flex items-center gap-2 p-2 hover:bg-card-hover rounded-lg">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Guide d'utilisation de la plateforme</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center gap-2 p-2 hover:bg-card-hover rounded-lg">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Documentation React.js</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="flex items-center gap-2 p-2 hover:bg-card-hover rounded-lg">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 2V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Planning du semestre</span>
                        </Link>
                      </li>
                    </ul>
                    <Link href="#" className="btn-secondary w-full mt-4">
                      Accéder à toutes les ressources
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'curriculum' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Parcours pédagogique</h1>
                <p className="text-muted max-w-3xl">
                  Votre parcours d&apos;apprentissage est unique. Visualisez votre progression, accédez à vos cours et ressources, 
                  et gardez une trace de vos accomplissements.
                </p>
              </div>
              
              <CurriculumGraph />
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Mes projets</h1>
              <p className="text-muted mb-6">
                Voici l&apos;ensemble de vos projets. Cliquez sur un projet pour voir les détails.
              </p>
              
              <div className="card p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Projets en cours</h2>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold">Création d'une API REST avec Node.js</h3>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">En cours</span>
                    </div>
                    <p className="text-sm text-muted mb-4">
                      Développer une API REST complète avec authentification, gestion d'utilisateurs et CRUD de ressources.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted">Date de rendu</p>
                        <p className="text-sm font-medium">22 juin 2024</p>
                      </div>
                      <Link href="#" className="btn-secondary text-sm">Voir détails</Link>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold">Frontend React pour application de gestion</h3>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">En cours</span>
                    </div>
                    <p className="text-sm text-muted mb-4">
                      Créer une interface utilisateur réactive et intuitive pour gérer des ressources via l'API.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted">Date de rendu</p>
                        <p className="text-sm font-medium">30 juin 2024</p>
                      </div>
                      <Link href="#" className="btn-secondary text-sm">Voir détails</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-4">Projets terminés</h2>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold">Site web statique HTML/CSS</h3>
                      <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">Terminé</span>
                    </div>
                    <p className="text-sm text-muted mb-4">
                      Création d'un site web responsive en HTML et CSS pur.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted">Note</p>
                        <p className="text-sm font-medium">18/20</p>
                      </div>
                      <Link href="#" className="btn-secondary text-sm">Voir feedback</Link>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold">Application JavaScript</h3>
                      <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">Terminé</span>
                    </div>
                    <p className="text-sm text-muted mb-4">
                      Développement d'une application de gestion de tâches en JavaScript.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-muted">Note</p>
                        <p className="text-sm font-medium">16/20</p>
                      </div>
                      <Link href="#" className="btn-secondary text-sm">Voir feedback</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {(activeTab === 'evaluations' || activeTab === 'community') && (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-16 h-16 bg-card-hover rounded-full flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Module en développement</h2>
              <p className="text-muted text-center max-w-md">
                Cette section est en cours de développement et sera disponible prochainement.
                Merci de votre patience.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 