import Image from "next/image";
import Link from "next/link";
import CurriculumGraph from "@/app/components/curriculum";

export default function Home() {
  return (
    <div className="content-grid">
      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-mono text-white font-bold">101</span>
          </div>
          <h1 className="font-bold text-xl">101 Vitry</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="nav-link">Accueil</Link>
          <Link href="#" className="nav-link">Formations</Link>
          <Link href="#" className="nav-link">À propos</Link>
          <Link href="#" className="nav-link">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="btn-secondary hidden sm:inline-flex">S'inscrire</button>
          <button className="btn-primary">Connexion</button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex flex-col">
        {/* Hero section */}
        <section className="py-16 px-6 sm:px-10 md:py-24 hero-gradient flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl">
            Apprenez à <span className="gradient-text">coder</span> comme un pro
          </h1>
          <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl">
            Une formation intensive aux métiers du numérique dans un environnement innovant
          </p>
                    
          <div className="w-full max-w-5xl bg-card border border-border rounded-2xl p-4 md:p-8 shadow-lg">
            <Image 
              src="/placeholder-dashboard.png" 
              alt="Aperçu de la plateforme"
              width={1200}
              height={675}
              className="rounded-lg w-full h-auto"
              priority
            />
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 px-6 sm:px-10 bg-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Une formation conçue pour votre réussite</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-card-hover border border-border">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16L12 12L16 16M16 8L12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Cours pratiques</h3>
                <p className="text-muted">Apprenez en codant sur des projets concrets encadrés par des professionnels.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-card-hover border border-border">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Suivi personnalisé</h3>
                <p className="text-muted">Bénéficiez d'un accompagnement sur mesure tout au long de votre parcours.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-card-hover border border-border">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Formation intensive</h3>
                <p className="text-muted">Maîtrisez rapidement les compétences les plus recherchées sur le marché.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Graph Visualization section */}
        <section className="py-16 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Parcours d'Apprentissage</h2>
            <CurriculumGraph />
          </div>
        </section>
        
        {/* Interactive curriculum section */}
        <section className="py-16 px-6 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Parcours d'apprentissage interactif</h2>
                <p className="text-muted mb-8">
                  Suivez votre progression et débloquez de nouveaux modules à mesure que vous maîtrisez les compétences fondamentales.
                </p>
                <button className="btn-primary">Explorer le cursus</button>
              </div>
              
              <div className="md:w-1/2">
                <div className="terminal-border">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="terminal-dot" style={{ backgroundColor: "#ff5f57" }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: "#febc2e" }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: "#28c840" }}></div>
                    </div>
                    <div className="terminal-title">cursus.interactive</div>
                    <div></div>
                  </div>
                  <div className="terminal-window font-mono text-sm">
                    <p className="mb-3"><span className="text-primary-light">$</span> <span className="text-secondary">courses</span> <span className="text-accent">--list-completed</span></p>
                    <p className="mb-4 pl-4">
                      ✓ HTML/CSS Basics<br />
                      ✓ JavaScript Fundamentals<br />
                      ✓ Git & GitHub
                    </p>
                    
                    <p className="mb-3"><span className="text-primary-light">$</span> <span className="text-secondary">courses</span> <span className="text-accent">--current-progress</span></p>
                    <p className="mb-4 pl-4">
                      ⟢ React.js - 65% completed<br />
                      ⟢ API Design - 40% completed
                    </p>
                    
                    <p className="mb-3"><span className="text-primary-light">$</span> <span className="text-secondary">courses</span> <span className="text-accent">--next-available</span></p>
                    <p className="mb-4 pl-4">
                      • Node.js Backend (req: JavaScript Fundamentals ✓)<br />
                      • Database Design (req: API Design ⟢)
                    </p>
                    
                    <p><span className="text-primary-light">$</span> <span className="text-secondary">./</span><span className="text-accent blink">_</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses preview */}
        <section className="py-16 px-6 sm:px-10 bg-card">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Nos formations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="card h-full">
                <div className="bg-primary-dark h-40 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 18L22 12L16 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6L2 12L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Développement Web</h3>
                  <p className="text-muted mb-4">Frontend, Backend, Frameworks modernes et Déploiement.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">8 modules</span>
                    <Link href="#" className="text-primary font-medium">Détails →</Link>
                  </div>
                </div>
              </div>
              
              <div className="card h-full">
                <div className="bg-accent h-40 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20 7L12 12L4 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Data Science</h3>
                  <p className="text-muted mb-4">Python, Machine Learning, IA et Analyse de données.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">6 modules</span>
                    <Link href="#" className="text-primary font-medium">Détails →</Link>
                  </div>
                </div>
              </div>
              
              <div className="card h-full">
                <div className="bg-secondary h-40 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Cybersécurité</h3>
                  <p className="text-muted mb-4">Sécurité web, cryptographie, pentest et analyse de vulnérabilités.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">7 modules</span>
                    <Link href="#" className="text-primary font-medium">Détails →</Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button className="btn-secondary">Voir toutes nos formations</button>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Prêt à commencer votre carrière tech ?</h2>
            <p className="text-muted text-lg mb-10">
              Rejoignez 101 Vitry et transformez votre passion pour le code en compétences professionnelles.
            </p>
            <button className="btn-primary text-lg px-8 py-3">Postuler maintenant</button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-mono text-white font-bold text-xs">101</span>
                </div>
                <h3 className="font-bold">101 Vitry</h3>
              </div>
              <p className="text-sm text-muted">
                Formation intensive aux métiers du numérique depuis 2024.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Programmes</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Développement Web</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Data Science</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Cybersécurité</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">DevOps</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Tutoriels</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Communauté</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted">contact@101vitry.com</li>
                <li className="text-sm text-muted">01 23 45 67 89</li>
                <li className="text-sm text-muted">15 Rue de Vitry, 94190 Villeneuve-Saint-Georges</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted">© 2025 101 Vitry. Tous droits réservés.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted hover:text-foreground">Mentions légales</Link>
              <Link href="#" className="text-sm text-muted hover:text-foreground">Confidentialité</Link>
              <Link href="#" className="text-sm text-muted hover:text-foreground">CGU</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
