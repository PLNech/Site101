// curriculumData.tsx
// Data structure for Open Source Computer Science curriculum

export interface Course {
    title: string;
    description: string;
    prerequisites: string[];
    isStartingNode?: boolean;
    isFinalNode?: boolean;
  }
  
  export interface Category {
    category_name: string;
    courses: Course[];
  }
  
  export interface Year {
    year_number: number;
    year_title: string;
    categories: Category[];
  }
  
  export interface CurriculumData {
    program_name: string;
    years: Year[];
  }
  
  const courseData: CurriculumData = {
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
              {
                "title": "Command Line & Shell Scripting",
                "description": "Bash terminal usage, basic commands, pipes, redirection, file manipulation, process management, and shell scripting.",
                "prerequisites": ["GNU/Linux Fundamentals"]
              },
              {
                "title": "Version Control with Git",
                "description": "Distributed version control, Git workflows, branching strategies, collaboration techniques.",
                "prerequisites": ["Command Line & Shell Scripting"]
              }
            ]
          },
          {
            "category_name": "Programming Foundations",
            "courses": [
              {
                "title": "C Programming Essentials",
                "description": "C syntax, data types, operators, control structures, functions, arrays, pointers, memory management, file I/O.",
                "prerequisites": ["Command Line & Shell Scripting"],
                "isStartingNode": true
              },
              {
                "title": "Data Structures Implementation",
                "description": "Implementation of arrays, linked lists, stacks, queues, trees, and graphs in C.",
                "prerequisites": ["C Programming Essentials", "Discrete Mathematics & Algorithms"]
              },
              {
                "title": "Python Programming",
                "description": "Python syntax, data types, control structures, functions, modules, packages, and object-oriented programming.",
                "prerequisites": ["C Programming Essentials"]
              }
            ]
          },
          {
            "category_name": "Computer Systems",
            "courses": [
              {
                "title": "Computer Architecture",
                "description": "CPU design, memory hierarchy, instruction sets, assembly basics, hardware-software interface.",
                "prerequisites": ["C Programming Essentials"]
              },
              {
                "title": "Operating Systems Concepts",
                "description": "Process management, memory management, file systems, I/O, virtualization, POSIX standards.",
                "prerequisites": ["Computer Architecture", "C Programming Essentials"]
              }
            ]
          },
          {
            "category_name": "Web Fundamentals",
            "courses": [
              {
                "title": "Web Development Basics",
                "description": "HTML5, CSS3, responsive design, semantic markup, accessibility principles.",
                "prerequisites": [],
                "isStartingNode": true
              },
              {
                "title": "JavaScript Fundamentals",
                "description": "JavaScript syntax, DOM manipulation, event handling, asynchronous programming with ES6+ features.",
                "prerequisites": ["Web Development Basics", "Python Programming"]
              }
            ]
          },
          {
            "category_name": "Mathematics & Algorithms",
            "courses": [
              {
                "title": "Discrete Mathematics & Algorithms",
                "description": "Logic, set theory, combinatorics, graph theory, algorithm design, complexity analysis.",
                "prerequisites": ["C Programming Essentials"]
              }
            ]
          }
        ]
      },
      {
        "year_number": 2,
        "year_title": "ADVANCED TOPICS & APPLICATIONS",
        "categories": [
          {
            "category_name": "Software Engineering",
            "courses": [
              {
                "title": "Software Development Methodologies",
                "description": "Agile, Scrum, Kanban, requirements engineering, test-driven development, continuous integration.",
                "prerequisites": ["Version Control with Git", "Python Programming"]
              },
              {
                "title": "Design Patterns & Architecture",
                "description": "SOLID principles, common design patterns, architectural styles, code quality, refactoring.",
                "prerequisites": ["Python Programming", "Data Structures Implementation"]
              }
            ]
          },
          {
            "category_name": "Full-Stack Development",
            "courses": [
              {
                "title": "Frontend Development",
                "description": "Modern JavaScript frameworks (Vue.js), component architecture, state management, SPAs.",
                "prerequisites": ["JavaScript Fundamentals", "Web Development Basics"]
              },
              {
                "title": "Backend Development",
                "description": "Server-side programming with Python (Flask/Django) or Node.js (Express), RESTful APIs, GraphQL.",
                "prerequisites": ["Python Programming", "JavaScript Fundamentals", "Operating Systems Concepts"]
              },
              {
                "title": "Database Systems",
                "description": "Relational databases (PostgreSQL), NoSQL (MongoDB), database design, SQL, ORMs, performance optimization.",
                "prerequisites": ["Data Structures Implementation", "Python Programming"]
              }
            ]
          },
          {
            "category_name": "Machine Learning",
            "courses": [
              {
                "title": "Machine Learning 101",
                "description": "Introduction to machine learning concepts, supervised and unsupervised learning, and basic algorithms.",
                "prerequisites": ["Python Programming"],
                "isStartingNode": true
              },
              {
                "title": "Neural Networks 101",
                "description": "Fundamentals of neural networks, perceptrons, and activation functions.",
                "prerequisites": ["Machine Learning 101"]
              },
              {
                "title": "Natural Language Processing 101",
                "description": "Introduction to NLP concepts, text processing, and basic libraries like NLTK and spaCy.",
                "prerequisites": ["Machine Learning 101"]
              },
              {
                "title": "Deep Learning with Keras",
                "description": "Building neural networks using Keras, including CNNs and RNNs.",
                "prerequisites": ["Neural Networks 101"]
              },
              {
                "title": "Transformers and Attention Mechanisms",
                "description": "Understanding transformers, attention mechanisms, and their applications in NLP.",
                "prerequisites": ["Deep Learning with Keras"]
              },
              {
                "title": "Sentiment Analysis and Text Classification",
                "description": "Implementing sentiment analysis and text classification using machine learning techniques.",
                "prerequisites": ["Natural Language Processing 101", "Deep Learning with Keras"]
              },
              {
                "title": "MLOps and Model Deployment",
                "description": "Best practices for deploying machine learning models, including versioning and monitoring.",
                "prerequisites": ["Deep Learning with Keras"]
              },
              {
                "title": "Building AI Assistants",
                "description": "Creating interactive AI assistants using machine learning and UX design principles.",
                "prerequisites": ["Sentiment Analysis and Text Classification", "MLOps and Model Deployment"]
              }
            ]
          },
          {
            "category_name": "Systems & Networks",
            "courses": [
              {
                "title": "Network Programming",
                "description": "TCP/IP, socket programming, network protocols, distributed systems basics, client-server architecture.",
                "prerequisites": ["Operating Systems Concepts", "Python Programming"]
              },
              {
                "title": "System Administration",
                "description": "Advanced GNU/Linux administration, server management, containerization with Docker, deployment strategies.",
                "prerequisites": ["GNU/Linux Fundamentals", "Command Line & Shell Scripting", "Network Programming"]
              },
              {
                "title": "Security Fundamentals",
                "description": "Cryptography, common vulnerabilities, secure coding practices, authentication, authorization.",
                "prerequisites": ["Operating Systems Concepts", "Network Programming"]
              }
            ]
          },
          {
            "category_name": "Advanced Applications",
            "courses": [
              {
                "title": "Data Science with Python",
                "description": "Data analysis with Pandas/NumPy, data visualization, statistical analysis, machine learning basics with scikit-learn.",
                "prerequisites": ["Python Programming", "Discrete Mathematics & Algorithms"]
              },
              {
                "title": "DevOps Practices",
                "description": "CI/CD pipelines with GitLab CI or Jenkins, infrastructure as code, monitoring, containerization.",
                "prerequisites": ["System Administration", "Version Control with Git", "Backend Development"]
              }
            ]
          },
          {
            "category_name": "Capstone",
            "courses": [
              {
                "title": "Open Source Contribution",
                "description": "Contributing to existing open source projects, understanding open source communities and licenses.",
                "prerequisites": ["Version Control with Git", "Software Development Methodologies"]
              },
              {
                "title": "Capstone Project",
                "description": "End-to-end project development addressing real-world problems using free and open source technologies.",
                "prerequisites": ["Software Development Methodologies", "Design Patterns & Architecture", "Frontend Development", "Backend Development", "Database Systems"],
                "isFinalNode": true
              }
            ]
          }
        ]
      }
    ]
  };
  // Helper functions for accessing curriculum data
  
  // Get all courses as a flat array
  export const getAllCourses = (): Course[] => {
    const courses: Course[] = [];
    courseData.years.forEach(year => {
      year.categories.forEach(category => {
        category.courses.forEach(course => {
          courses.push({
            ...course,
            // You could add year and category data here if needed
          });
        });
      });
    });
    return courses;
  };
  
  // Get starting courses
  export const getStartingCourses = (): Course[] => {
    return getAllCourses().filter(course => course.isStartingNode);
  };
  
  // Get course by title
  export const getCourseByTitle = (title: string): Course | undefined => {
    return getAllCourses().find(course => course.title === title);
  };
  
  // Get courses by category
  export const getCoursesByCategory = (categoryName: string): Course[] => {
    const courses: Course[] = [];
    courseData.years.forEach(year => {
      year.categories
        .filter(category => category.category_name === categoryName)
        .forEach(category => {
          courses.push(...category.courses);
        });
    });
    return courses;
  };
  
  // Get all categories
  export const getAllCategories = (): string[] => {
    const categories = new Set<string>();
    courseData.years.forEach(year => {
      year.categories.forEach(category => {
        categories.add(category.category_name);
      });
    });
    return Array.from(categories);
  };
  
  // Get all prerequisites for a course (direct and indirect)
  export const getAllPrerequisites = (courseTitle: string): string[] => {
    const course = getCourseByTitle(courseTitle);
    if (!course) return [];
    
    const allPrereqs = new Set<string>();
    const directPrereqs = [...course.prerequisites];
    
    // Add direct prerequisites
    directPrereqs.forEach(prereq => allPrereqs.add(prereq));
    
    // Add indirect prerequisites recursively
    directPrereqs.forEach(prereq => {
      getAllPrerequisites(prereq).forEach(indirectPrereq => {
        allPrereqs.add(indirectPrereq);
      });
    });
    
    return Array.from(allPrereqs);
  };
  
  export default courseData;