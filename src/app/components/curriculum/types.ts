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

export interface Node {
  id: string;
  name: string;
  group: string;
  year: number;
  description: string;
  isStartingNode: boolean;
  isFinalNode: boolean;
  level: number;
  prerequisites: string[];
  allPrerequisites: string[];
  isUnlocked: boolean;
  isCompleted: boolean;
  fixedX?: number;
  fixedY?: number;
}

export interface Link {
  source: string | Node;
  target: string | Node;
  isDirectPrerequisite: boolean;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
  maxLevel: number;
} 