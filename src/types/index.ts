export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface StepData {
  date: string;
  count: number;
  goal: number;
}

export interface WaterEntry {
  id: string;
  amount: number;
  timestamp: Date;
}

export interface MealEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: Date;
  imageUri?: string;
}

export interface SleepEntry {
  id: string;
  startTime: Date;
  endTime: Date;
  quality: 'light' | 'deep' | 'rem';
  duration: number;
}

export interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'tired';
  note?: string;
  timestamp: Date;
}

export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  reminderTime: string;
  taken: boolean;
}

export interface ActivityEntry {
  id: string;
  type: 'steps' | 'running' | 'cycling' | 'swimming' | 'gym';
  duration: number;
  calories: number;
  timestamp: Date;
}

export interface CycleEntry {
  id: string;
  date: Date;
  flow: 'none' | 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  target: number;
}
