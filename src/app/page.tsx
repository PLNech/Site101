import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="content-grid">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 flex items-center justify-between px-6 sm:px-10 border-b border-border h-16">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-mono text-white font-bold">101</span>
          </div>
          <h1 className="font-bold text-xl">École 101</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="nav-link">Accueil</Link>
          <Link href="#formation" className="nav-link">Formation</Link>
          <Link href="#" className="nav-link">À propos</Link>
          <Link href="/student" className="nav-link">Espace étudiant</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="#contact" className="btn-secondary hidden sm:inline-flex">Nous contacter</Link>
          <Link href="/student" className="btn-primary">Espace étudiant</Link>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex flex-col">
        {/* Hero section */}
        <section className="py-16 px-6 sm:px-10 md:py-24 hero-gradient flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary-dark flex items-center justify-center mb-8 shadow-xl shadow-primary/30">
            <span className="font-mono text-white text-3xl font-bold">101</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl">
            L'excellence technique à <span className="gradient-text">échelle humaine</span>
          </h1>
          <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl">
            Fondée par quatre enseignants profondément attachés à Vitry et cumulant plus de cinquante ans d'expérience pédagogique, 
            École 101 est plus qu'une simple école—c'est un engagement envers l'avenir technologique de notre communauté.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="#formation" className="btn-primary">Découvrir nos formations</Link>
            <Link href="#contact" className="btn-secondary">Prendre rendez-vous</Link>
          </div>
          
          <div className="w-full max-w-5xl glass-effect rounded-2xl p-4 md:p-8 shadow-2xl">
            <Image 
              src="/placeholder-dashboard.png" 
              alt="Campus de l'École 101 à Vitry"
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Enraciné à Vitry, tourné vers l'avenir</h2>
            <p className="text-center text-muted mb-12 max-w-3xl mx-auto">
              Dans un monde d'éducation de masse impersonnelle, École 101 adopte une approche différente. 
              Avec des classes à effectif limité et des plans d'apprentissage individualisés, nous garantissons 
              que chaque étudiant reçoit l'accompagnement nécessaire pour exceller.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-card-hover border border-border hover:border-primary/50 transition-all">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16L12 12L16 16M16 8L12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Apprendre en faisant</h3>
                <p className="text-muted">La théorie a sa place, mais à École 101, nous croyons en l'apprentissage par la pratique. Notre programme est construit autour de défis concrets qui vous préparent aux réalités de la vie professionnelle.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-card-hover border border-border hover:border-primary/50 transition-all">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Suivi personnalisé</h3>
                <p className="text-muted">Avec des classes à effectif limité et des plans d'apprentissage individualisés, nous garantissons que chaque étudiant reçoit l'accompagnement nécessaire pour exceller.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-card-hover border border-border hover:border-primary/50 transition-all">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Engagement citoyen</h3>
                <p className="text-muted">L'éducation technologique ne se limite pas au code et aux systèmes—il s'agit de créer un changement positif. À École 101, l'engagement citoyen fait partie de notre ADN.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Formation section */}
        <section id="formation" className="py-16 px-4 sm:px-6 md:px-10 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium font-mono mb-3">
                NOS PARCOURS
              </span>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                Former les <span className="gradient-text">architectes numériques</span> de demain
              </h2>
              <p className="text-lg text-muted max-w-2xl mx-auto">
                École 101 propose des formations spécialisées dans les deux secteurs les plus dynamiques de la technologie aujourd'hui : 
                Développement & IA et Systèmes, Réseaux & Cybersécurité—chaque parcours menant à des qualifications reconnues au niveau national.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
              <div className="card p-6 hover:transform hover:translate-y-0">
                <div className="w-16 h-16 bg-primary-dark/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 18L22 12L16 6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6L2 12L8 18" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Développement et IA</h3>
                <p className="text-muted mb-6">
                  De la conception d'applications web jusqu'à l'entraînement de modèles d'intelligence artificielle, 
                  ce parcours vous immerge dans toutes les étapes du développement logiciel moderne.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Programmation Web Frontend et Backend</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Fondamentaux des sciences de données</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Conception et déploiement de modèles d'IA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Certification RNCP niveau 6 (Bac+3) et niveau 7 (Bac+5)</span>
                  </li>
                </ul>
                <Link href="#" className="btn-primary w-full">Découvrir ce parcours</Link>
              </div>
              
              <div className="card p-6 hover:transform hover:translate-y-0">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16L12 12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8L12.01 8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Systèmes, Réseaux et Cybersécurité</h3>
                <p className="text-muted mb-6">
                  De l'architecture des systèmes d'exploitation à la sécurisation des infrastructures d'entreprise, 
                  maîtrisez les compétences essentielles pour protéger et optimiser les systèmes d'information.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Administration systèmes Linux et Windows</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Conception d'infrastructures réseau</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Audit de sécurité et réponse aux incidents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>Certification RNCP niveau 6 (Bac+3) et niveau 7 (Bac+5)</span>
                  </li>
                </ul>
                <Link href="#" className="btn-primary w-full">Découvrir ce parcours</Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Approche pédagogique section */}
        <section className="py-16 px-6 sm:px-10 bg-gradient-to-br from-background to-card">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Une école par des professionnels, pour des professionnels</h2>
                <p className="text-muted mb-6">
                  La théorie a sa place, mais à École 101, nous croyons en l'apprentissage par la pratique. 
                  Notre programme est construit autour de défis concrets qui vous préparent aux réalités de la vie professionnelle.
                </p>
                <p className="text-muted mb-8">
                  Nos formateurs sont des professionnels en activité qui partagent non seulement leur expertise technique, 
                  mais aussi leur expérience du terrain et leur réseau professionnel.
                </p>
                <Link href="#" className="btn-primary">Découvrir notre approche</Link>
              </div>
              
              <div className="md:w-1/2">
                <div className="terminal-border">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="terminal-dot" style={{ backgroundColor: "#ff5f57" }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: "#febc2e" }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: "#28c840" }}></div>
                    </div>
                    <div className="terminal-title">progression.collaborative</div>
                    <div></div>
                  </div>
                  <div className="terminal-window font-mono text-sm">
                    <p className="mb-3"><span className="text-primary-light">$</span> <span className="text-secondary">parcours</span> <span className="text-accent">--aperçu</span></p>
                    <p className="mb-4 pl-4">
                      ◉ Formation intensive sur 3 à 5 ans<br />
                      ◉ Des classes à effectif réduit (20-30 étudiants)<br />
                      ◉ Mentorat individuel par des professionnels
                    </p>
                    
                    <p className="mb-3"><span className="text-primary-light">$</span> <span className="text-secondary">parcours</span> <span className="text-accent">--approche</span></p>
                    <p className="mb-4 pl-4">
                      ⟢ 60% de projets pratiques<br />
                      ⟢ 25% de cours théoriques<br />
                      ⟢ 15% d'engagement communautaire
                    </p>
                    
                    <p className="mb-3"><span className="text-primary-light">$</span> <span className="text-secondary">parcours</span> <span className="text-accent">--certification</span></p>
                    <p className="mb-4 pl-4">
                      • RNCP niveau 6 (Bac+3)<br />
                      • RNCP niveau 7 (Bac+5)
                    </p>
                    
                    <p><span className="text-primary-light">$</span> <span className="text-secondary">./</span><span className="text-accent blink">_</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact section */}
        <section id="contact" className="py-20 px-6 sm:px-10 glass-effect">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Transformez votre passion en expertise</h2>
            <p className="text-muted text-lg mb-10">
              Rejoignez l'École 101 à Vitry et devenez un acteur du changement technologique, tout en contribuant au développement de votre communauté locale.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="#" className="btn-primary text-lg px-8 py-3">Demander un entretien</Link>
              <Link href="/student" className="btn-secondary text-lg px-8 py-3">Espace étudiant</Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 sm:px-10 bg-background-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="font-mono text-white font-bold text-xs">101</span>
                </div>
                <h3 className="font-bold">École 101 Vitry</h3>
              </div>
              <p className="text-sm text-muted">
                L'excellence technique à échelle humaine. Enraciné à Vitry, tourné vers l'avenir.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Formations</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Développement & IA</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Systèmes, Réseaux & Cybersécurité</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Certifications RNCP</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Validation des acquis</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Espace étudiant</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Projets communautaires</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Partenaires</Link></li>
                <li><Link href="#" className="text-sm text-muted hover:text-foreground">Actualités</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted">contact@ecole101vitry.fr</li>
                <li className="text-sm text-muted">01 23 45 67 89</li>
                <li className="text-sm text-muted">15 Rue de la République, 94400 Vitry-sur-Seine</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted">© 2024 École 101 Vitry. Tous droits réservés.</p>
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
