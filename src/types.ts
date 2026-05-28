export interface QuizQuestion {
  q: string;
  options: string[];
  ans: number;
  explanation: string;
}

export interface LessonStep {
  text: string;
  visualTag: string;
}

export interface TopicData {
  id: string;
  name: string;
  term: string;
  title: string;
  objectives: string;
  steps: LessonStep[];
  quiz: QuizQuestion[];
  labPrompt: string;
  structuralPrompt: string;
}

export interface ClassLevelData {
  level: string;
  label: string;
  topics: TopicData[];
}

export interface UserProgress {
  theoretical: number; // 0 to 100
  experimental: number; // 0 to 100
  structural: number; // 0 to 100
}
