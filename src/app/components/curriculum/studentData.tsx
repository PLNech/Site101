const studentData = [
    // Classe 1 - Développement et IA - Année 1 (27 étudiants)
    {
        class_id: "DEV-IA-1-2024",
        parcours: "Développement et IA",
        niveau: "Année 1",
        promotion: "Promotion 2024",
        teacher: "Dr. Marie Dubois",
        students: [
            {
                id: "STU001",
                name: "Antoine Lefèvre",
                email: "antoine.lefevre@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["GNU/Linux Fundamentals", "C Programming Essentials"]
                }
            },
            {
                id: "STU002",
                name: "Sophia Chen",
                email: "sophia.chen@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["Web Development Basics"]
                }
            },
            {
                id: "STU003",
                name: "Camille Moreau",
                email: "camille.moreau@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "Python Programming", "C Programming Essentials"]
                }
            },
            {
                id: "STU004",
                name: "Mohammed Al-Farsi",
                email: "mohammed.alfarsi@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Data Structures Implementation"]
                }
            },
            {
                id: "STU005",
                name: "Lucie Bernard",
                email: "lucie.bernard@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["JavaScript Fundamentals", "Python Programming"]
                }
            },
            {
                id: "STU006",
                name: "Yuki Tanaka",
                email: "yuki.tanaka@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["Discrete Mathematics & Algorithms"]
                }
            },
            {
                id: "STU007",
                name: "Thomas Petit",
                email: "thomas.petit@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["GNU/Linux Fundamentals", "Web Development Basics"]
                }
            },
            {
                id: "STU008",
                name: "Priya Patel",
                email: "priya.patel@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "C Programming Essentials"]
                }
            },
            {
                id: "STU009",
                name: "Julien Rousseau",
                email: "julien.rousseau@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["JavaScript Fundamentals"]
                }
            },
            {
                id: "STU010",
                name: "Ana Rodriguez",
                email: "ana.rodriguez@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["C Programming Essentials", "Web Development Basics"]
                }
            },
            {
                id: "STU011",
                name: "Mathieu Lambert",
                email: "mathieu.lambert@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Python Programming", "Command Line & Shell Scripting", "GNU/Linux Fundamentals"]
                }
            },
            {
                id: "STU012",
                name: "Fatima Okoye",
                email: "fatima.okoye@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "25/05/2025",
                    currentFocus: ["Version Control with Git"]
                }
            },
            {
                id: "STU013",
                name: "Pierre Dupont",
                email: "pierre.dupont@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["C Programming Essentials", "Computer Architecture"]
                }
            },
            {
                id: "STU014",
                name: "Mei Lin",
                email: "mei.lin@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["JavaScript Fundamentals"]
                }
            },
            {
                id: "STU015",
                name: "Sophie Martin",
                email: "sophie.martin@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Web Development Basics", "Python Programming"]
                }
            },
            {
                id: "STU016",
                name: "Omar Hassan",
                email: "omar.hassan@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "GNU/Linux Fundamentals", "Web Development Basics"]
                }
            },
            {
                id: "STU017",
                name: "Élise Fournier",
                email: "elise.fournier@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["C Programming Essentials"]
                }
            },
            {
                id: "STU018",
                name: "Carlos Mendoza",
                email: "carlos.mendoza@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "25/05/2025",
                    currentFocus: ["Python Programming", "JavaScript Fundamentals"]
                }
            },
            {
                id: "STU019",
                name: "Émilie Blanc",
                email: "emilie.blanc@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Operating Systems Concepts"]
                }
            },
            {
                id: "STU020",
                name: "David Nkosi",
                email: "david.nkosi@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["C Programming Essentials", "Command Line & Shell Scripting"]
                }
            },
            {
                id: "STU021",
                name: "Chloé Legrand",
                email: "chloe.legrand@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Discrete Mathematics & Algorithms"]
                }
            },
            {
                id: "STU022",
                name: "Hiroshi Yamamoto",
                email: "hiroshi.yamamoto@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["Python Programming", "Web Development Basics", "GNU/Linux Fundamentals"]
                }
            },
            {
                id: "STU023",
                name: "Nicolas Roux",
                email: "nicolas.roux@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["C Programming Essentials", "Computer Architecture"]
                }
            },
            {
                id: "STU024",
                name: "Amara Diallo",
                email: "amara.diallo@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "25/05/2025",
                    currentFocus: ["JavaScript Fundamentals"]
                }
            },
            {
                id: "STU025",
                name: "Gabriel Mercier",
                email: "gabriel.mercier@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "Version Control with Git"]
                }
            },
            {
                id: "STU026",
                name: "Aisha Khan",
                email: "aisha.khan@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["Data Structures Implementation"]
                }
            },
            {
                id: "STU027",
                name: "Alexandre Leclerc",
                email: "alexandre.leclerc@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["Web Development Basics", "Python Programming", "C Programming Essentials"]
                }
            }
        ]
    },
    
    // Classe 2 - Systèmes, Réseaux et Cybersécurité - Année 1 (24 étudiants)
    {
        class_id: "SRC-1-2024",
        parcours: "Systèmes, Réseaux et Cybersécurité",
        niveau: "Année 1",
        promotion: "Promotion 2024",
        teacher: "Prof. Jean-Michel Renard",
        students: [
            {
                id: "STU028",
                name: "Maxime Durand",
                email: "maxime.durand@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["GNU/Linux Fundamentals", "Computer Architecture"]
                }
            },
            {
                id: "STU029",
                name: "Ling Wu",
                email: "ling.wu@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Operating Systems Concepts"]
                }
            },
            {
                id: "STU030",
                name: "Audrey Lemaire",
                email: "audrey.lemaire@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "C Programming Essentials", "Version Control with Git"]
                }
            },
            {
                id: "STU031",
                name: "Raj Sharma",
                email: "raj.sharma@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["Discrete Mathematics & Algorithms"]
                }
            },
            {
                id: "STU032",
                name: "Elodie Moreau",
                email: "elodie.moreau@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["Computer Architecture", "C Programming Essentials"]
                }
            },
            {
                id: "STU033",
                name: "Miguel Fernandez",
                email: "miguel.fernandez@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["Command Line & Shell Scripting"]
                }
            },
            {
                id: "STU034",
                name: "Adrien Leroy",
                email: "adrien.leroy@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["GNU/Linux Fundamentals", "Python Programming"]
                }
            },
            {
                id: "STU035",
                name: "Naomi Okoro",
                email: "naomi.okoro@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Operating Systems Concepts", "Computer Architecture"]
                }
            },
            {
                id: "STU036",
                name: "Paul Garnier",
                email: "paul.garnier@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["Version Control with Git"]
                }
            },
            {
                id: "STU037",
                name: "Elena Popescu",
                email: "elena.popescu@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["C Programming Essentials", "Command Line & Shell Scripting"]
                }
            },
            {
                id: "STU038",
                name: "Hugo Bertrand",
                email: "hugo.bertrand@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["Python Programming", "GNU/Linux Fundamentals", "Discrete Mathematics & Algorithms"]
                }
            },
            {
                id: "STU039",
                name: "Surya Nair",
                email: "surya.nair@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Computer Architecture"]
                }
            },
            {
                id: "STU040",
                name: "Marie Fontaine",
                email: "marie.fontaine@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "Version Control with Git"]
                }
            },
            {
                id: "STU041",
                name: "Javier Gomez",
                email: "javier.gomez@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["Operating Systems Concepts"]
                }
            },
            {
                id: "STU042",
                name: "Claire Dupuis",
                email: "claire.dupuis@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["C Programming Essentials", "Python Programming"]
                }
            },
            {
                id: "STU043",
                name: "Ahmed Al-Mansoor",
                email: "ahmed.almansoor@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["GNU/Linux Fundamentals", "Computer Architecture", "Command Line & Shell Scripting"]
                }
            },
            {
                id: "STU044",
                name: "Manon Girard",
                email: "manon.girard@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["Discrete Mathematics & Algorithms"]
                }
            },
            {
                id: "STU045",
                name: "Takashi Ito",
                email: "takashi.ito@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Version Control with Git", "Operating Systems Concepts"]
                }
            },
            {
                id: "STU046",
                name: "Léa Brun",
                email: "lea.brun@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 5,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["C Programming Essentials"]
                }
            },
            {
                id: "STU047",
                name: "Kwame Acheampong",
                email: "kwame.acheampong@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "24/05/2025",
                    currentFocus: ["Command Line & Shell Scripting", "Computer Architecture"]
                }
            },
            {
                id: "STU048",
                name: "Margot Leroux",
                email: "margot.leroux@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "20/05/2025",
                    currentFocus: ["Python Programming"]
                }
            },
            {
                id: "STU049",
                name: "Farhan Ahmed",
                email: "farhan.ahmed@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 2,
                    coursesInProgress: 3,
                    totalCourses: 15,
                    nextEvaluation: "21/05/2025",
                    currentFocus: ["GNU/Linux Fundamentals", "Operating Systems Concepts", "C Programming Essentials"]
                }
            },
            {
                id: "STU050",
                name: "Jeanne Marchand",
                email: "jeanne.marchand@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 3,
                    coursesInProgress: 2,
                    totalCourses: 15,
                    nextEvaluation: "22/05/2025",
                    currentFocus: ["Discrete Mathematics & Algorithms", "Version Control with Git"]
                }
            },
            {
                id: "STU051",
                name: "Diego Vargas",
                email: "diego.vargas@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 4,
                    coursesInProgress: 1,
                    totalCourses: 15,
                    nextEvaluation: "23/05/2025",
                    currentFocus: ["Computer Architecture"]
                }
            }
        ]
    },
    
    // Classe 3 - Développement et IA - Année 2 (23 étudiants)
    {
        class_id: "DEV-IA-2-2023",
        parcours: "Développement et IA",
        niveau: "Année 2",
        promotion: "Promotion 2023",
        teacher: "Prof. Sarah Bouaziz",
        students: [
            {
                id: "STU052",
                name: "Lucas Chevalier",
                email: "lucas.chevalier@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Frontend Development", "Deep Learning with Keras"]
                }
            },
            {
                id: "STU053",
                name: "Ananya Singh",
                email: "ananya.singh@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Natural Language Processing 101"]
                }
            },
            {
                id: "STU054",
                name: "Simon Dubois",
                email: "simon.dubois@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 13,
                    coursesInProgress: 3,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Machine Learning 101", "Backend Development", "Database Systems"]
                }
            },
            {
                id: "STU055",
                name: "Jin-Hee Park",
                email: "jinhee.park@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 17,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Transformers and Attention Mechanisms"]
                }
            },
            {
                id: "STU056",
                name: "Romain Fabre",
                email: "romain.fabre@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Software Development Methodologies", "Frontend Development"]
                }
            },
            {
                id: "STU057",
                name: "Aisha Mbeki",
                email: "aisha.mbeki@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 18,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Deep Learning with Keras"]
                }
            },
            {
                id: "STU058",
                name: "Théo Morel",
                email: "theo.morel@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Database Systems", "Design Patterns & Architecture"]
                }
            },
            {
                id: "STU059",
                name: "Maria Sanchez",
                email: "maria.sanchez@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Neural Networks 101", "Building AI Assistants"]
                }
            },
            {
                id: "STU060",
                name: "Baptiste Laurent",
                email: "baptiste.laurent@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Backend Development", "Frontend Development"]
                }
            },
            {
                id: "STU061",
                name: "Sara Kim",
                email: "sara.kim@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 17,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Sentiment Analysis and Text Classification"]
                }
            },
            {
                id: "STU062",
                name: "Vincent Boucher",
                email: "vincent.boucher@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 3,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Machine Learning 101", "Data Science with Python", "MLOps and Model Deployment"]
                }
            },
            {
                id: "STU063",
                name: "Leila Benali",
                email: "leila.benali@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Software Development Methodologies"]
                }
            },
            {
                id: "STU064",
                name: "Florian Guichard",
                email: "florian.guichard@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Design Patterns & Architecture", "Database Systems"]
                }
            },
            {
                id: "STU065",
                name: "Li Wei",
                email: "li.wei@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 18,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Deep Learning with Keras"]
                }
            }
        ]
    },
    {
        id: "STU066",
        name: "Charlotte Roux",
        email: "charlotte.roux@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 14,
            coursesInProgress: 2,
            totalCourses: 30,
            nextEvaluation: "16/05/2025",
            currentFocus: ["Backend Development", "Natural Language Processing 101"]
        }
    },
    {
        id: "STU067",
        name: "Ricardo Santos",
        email: "ricardo.santos@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 15,
            coursesInProgress: 2,
            totalCourses: 30,
            nextEvaluation: "17/05/2025",
            currentFocus: ["Frontend Development", "Design Patterns & Architecture"]
        }
    },
    {
        id: "STU068",
        name: "Pauline Gaillard",
        email: "pauline.gaillard@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 16,
            coursesInProgress: 1,
            totalCourses: 30,
            nextEvaluation: "15/05/2025",
            currentFocus: ["MLOps and Model Deployment"]
        }
    },
    {
        id: "STU069",
        name: "Pavel Ivanov",
        email: "pavel.ivanov@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 14,
            coursesInProgress: 2,
            totalCourses: 30,
            nextEvaluation: "16/05/2025",
            currentFocus: ["Machine Learning 101", "Neural Networks 101"]
        }
    },
    {
        id: "STU070",
        name: "Émile Perrin",
        email: "emile.perrin@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 17,
            coursesInProgress: 1,
            totalCourses: 30,
            nextEvaluation: "17/05/2025",
            currentFocus: ["Database Systems"]
        }
    },
    {
        id: "STU071",
        name: "Zainab Abadi",
        email: "zainab.abadi@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 15,
            coursesInProgress: 2,
            totalCourses: 30,
            nextEvaluation: "15/05/2025",
            currentFocus: ["Frontend Development", "Sentiment Analysis and Text Classification"]
        }
    },
    {
        id: "STU072",
        name: "Quentin Meunier",
        email: "quentin.meunier@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 16,
            coursesInProgress: 2,
            totalCourses: 30,
            nextEvaluation: "16/05/2025",
            currentFocus: ["Data Science with Python", "Software Development Methodologies"]
        }
    },
    {
        id: "STU073",
        name: "Nina Fischer",
        email: "nina.fischer@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 18,
            coursesInProgress: 1,
            totalCourses: 30,
            nextEvaluation: "17/05/2025",
            currentFocus: ["Building AI Assistants"]
        }
    },
    {
        id: "STU074",
        name: "Arthur Colin",
        email: "arthur.colin@etudiant.ecole101vitry.fr",
        progression: {
            coursesCompleted: 14,
            coursesInProgress: 2,
            totalCourses: 30,
            nextEvaluation: "15/05/2025",
            currentFocus: ["Backend Development", "Design Patterns & Architecture"]
        }
    },
    // Classe 4 - Systèmes, Réseaux et Cybersécurité - Année 2 (25 étudiants)
    {
        class_id: "SRC-2-2023",
        parcours: "Systèmes, Réseaux et Cybersécurité",
        niveau: "Année 2",
        promotion: "Promotion 2023",
        teacher: "Dr. Karim Benzema",
        students: [
            {
                id: "STU075",
                name: "Mathilde Renaud",
                email: "mathilde.renaud@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Network Programming", "System Administration"]
                }
            },
            {
                id: "STU076",
                name: "Vikram Patel",
                email: "vikram.patel@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Security Fundamentals"]
                }
            },
            {
                id: "STU077",
                name: "Justine Lefevre",
                email: "justine.lefevre@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["DevOps Practices", "Software Development Methodologies"]
                }
            },
            {
                id: "STU078",
                name: "Takumi Nakamura",
                email: "takumi.nakamura@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 17,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Network Programming"]
                }
            },
            {
                id: "STU079",
                name: "Loïc Masson",
                email: "loic.masson@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 3,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Security Fundamentals", "System Administration", "Design Patterns & Architecture"]
                }
            },
            {
                id: "STU080",
                name: "Amina El-Masri",
                email: "amina.elmasri@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["DevOps Practices"]
                }
            },
            {
                id: "STU081",
                name: "Alexandre Simon",
                email: "alexandre.simon@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Network Programming", "Backend Development"]
                }
            },
            {
                id: "STU082",
                name: "Luna Morales",
                email: "luna.morales@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 17,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Security Fundamentals"]
                }
            },
            {
                id: "STU083",
                name: "Rémi Lacroix",
                email: "remi.lacroix@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["System Administration", "Software Development Methodologies"]
                }
            },
            {
                id: "STU084",
                name: "Aya Nakamura",
                email: "aya.nakamura@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Network Programming", "DevOps Practices"]
                }
            },
            {
                id: "STU085",
                name: "Alexis Berger",
                email: "alexis.berger@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Security Fundamentals", "Database Systems"]
                }
            },
            {
                id: "STU086",
                name: "Olga Ivanova",
                email: "olga.ivanova@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 18,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["System Administration"]
                }
            },
            {
                id: "STU087",
                name: "Nathan Boulanger",
                email: "nathan.boulanger@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 3,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["Design Patterns & Architecture", "DevOps Practices", "Open Source Contribution"]
                }
            },
            {
                id: "STU088",
                name: "Grace Okonkwo",
                email: "grace.okonkwo@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Network Programming"]
                }
            },
            {
                id: "STU089",
                name: "Jules Marchand",
                email: "jules.marchand@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Security Fundamentals", "Software Development Methodologies"]
                }
            },
            {
                id: "STU090",
                name: "Mei-Ling Chen",
                email: "meiling.chen@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 17,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["System Administration"]
                }
            },
            {
                id: "STU091",
                name: "Laurent Perrier",
                email: "laurent.perrier@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["DevOps Practices", "Database Systems"]
                }
            },
            {
                id: "STU092",
                name: "Fatima Al-Zahrani",
                email: "fatima.alzahrani@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Network Programming", "Security Fundamentals"]
                }
            },
            {
                id: "STU093",
                name: "Damien Faure",
                email: "damien.faure@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["System Administration", "Open Source Contribution"]
                }
            },
            {
                id: "STU094",
                name: "Indira Gupta",
                email: "indira.gupta@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 18,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Security Fundamentals"]
                }
            },
            {
                id: "STU095",
                name: "Yves Martin",
                email: "yves.martin@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 3,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Network Programming", "DevOps Practices", "Design Patterns & Architecture"]
                }
            },
            {
                id: "STU096",
                name: "Chiara Rossi",
                email: "chiara.rossi@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 16,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["System Administration"]
                }
            },
            {
                id: "STU097",
                name: "Pascal Lecomte",
                email: "pascal.lecomte@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 15,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "16/05/2025",
                    currentFocus: ["Security Fundamentals", "Software Development Methodologies"]
                }
            },
            {
                id: "STU098",
                name: "Khadija El-Amin",
                email: "khadija.elamin@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 17,
                    coursesInProgress: 1,
                    totalCourses: 30,
                    nextEvaluation: "17/05/2025",
                    currentFocus: ["Capstone Project"]
                }
            },
            {
                id: "STU099",
                name: "Tristan Roussel",
                email: "tristan.roussel@etudiant.ecole101vitry.fr",
                progression: {
                    coursesCompleted: 14,
                    coursesInProgress: 2,
                    totalCourses: 30,
                    nextEvaluation: "15/05/2025",
                    currentFocus: ["DevOps Practices", "Open Source Contribution"]
                }
            }
        ]
    }
];

export default studentData;