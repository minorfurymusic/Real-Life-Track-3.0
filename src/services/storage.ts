import AsyncStorage from '@react-native-async-storage/async-storage';
import { StepData, WaterEntry, MealEntry, MoodEntry } from '../types';

const STORAGE_KEYS = {
  STEPS: '@real_life_track_steps',
  WATER: '@real_life_track_water',
  MEALS: '@real_life_track_meals',
  MOODS: '@real_life_track_moods',
  USER_PROFILE: '@real_life_track_user',
  SETTINGS: '@real_life_track_settings',
};

export const StorageService = {
  // Steps
  async saveSteps(data: StepData[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STEPS, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving steps:', error);
      throw error;
    }
  },

  async getSteps(): Promise<StepData[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STEPS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting steps:', error);
      return [];
    }
  },

  // Water
  async saveWaterEntries(entries: WaterEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WATER, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving water entries:', error);
      throw error;
    }
  },

  async getWaterEntries(): Promise<WaterEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.WATER);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting water entries:', error);
      return [];
    }
  },

  // Meals
  async saveMeals(meals: MealEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
    } catch (error) {
      console.error('Error saving meals:', error);
      throw error;
    }
  },

  async getMeals(): Promise<MealEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MEALS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting meals:', error);
      return [];
    }
  },

  // Moods
  async saveMoodEntries(entries: MoodEntry[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving mood entries:', error);
      throw error;
    }
  },

  async getMoodEntries(): Promise<MoodEntry[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MOODS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting mood entries:', error);
      return [];
    }
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

export default StorageService;
