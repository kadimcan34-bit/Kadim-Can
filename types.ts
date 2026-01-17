
export interface SmartGoalData {
  studentName: string;
  classLevel: string;
  generalGoal: string;
  expectedResult: string;
}

export interface SmartGoalResult {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  coachingStatement: string; // Encouraging statement for the student
  effortEmphasis: string; // Focus on the process/effort
  coachingQuestions: string[]; // Questions for the teacher to ask the student
  actionSteps: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SearchResult {
  title: string;
  uri: string;
}
