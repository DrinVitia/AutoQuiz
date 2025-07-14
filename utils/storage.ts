import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserStats {
  totalCorrect: number;
  currentStreak: number;
  bestScore: number;
  totalQuestions: number;
}

export interface ExamResult {
  id: string;
  score: number;
  date: string;
  category?: string;
  questionsAnswered: number;
  timeSpent: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const STORAGE_KEYS = {
  USER_STATS: 'user_stats',
  EXAM_RESULTS: 'exam_results',
  DAILY_STREAK: 'daily_streak',
  LAST_STUDY_DATE: 'last_study_date',
};

export const getUserStats = async (): Promise<UserStats> => {
  try {
    const statsString = await AsyncStorage.getItem(STORAGE_KEYS.USER_STATS);
    if (statsString) {
      return JSON.parse(statsString);
    }
    return {
      totalCorrect: 0,
      currentStreak: 0,
      bestScore: 0,
      totalQuestions: 0,
    };
  } catch (error) {
    console.error('Error loading user stats:', error);
    return {
      totalCorrect: 0,
      currentStreak: 0,
      bestScore: 0,
      totalQuestions: 0,
    };
  }
};

export const updateUserStats = async (stats: Partial<UserStats>): Promise<void> => {
  try {
    const currentStats = await getUserStats();
    const updatedStats = { ...currentStats, ...stats };
    await AsyncStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(updatedStats));
  } catch (error) {
    console.error('Error updating user stats:', error);
  }
};

export const saveExamResult = async (result: ExamResult): Promise<void> => {
  try {
    const existingResults = await getExamResults();
    const updatedResults = [result, ...existingResults];
    await AsyncStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(updatedResults));
    
    // Update user stats
    const currentStats = await getUserStats();
    const newStats = {
      totalQuestions: currentStats.totalQuestions + result.questionsAnswered,
      bestScore: Math.max(currentStats.bestScore, result.score),
    };
    await updateUserStats(newStats);
  } catch (error) {
    console.error('Error saving exam result:', error);
  }
};

export const getExamResults = async (): Promise<ExamResult[]> => {
  try {
    const resultsString = await AsyncStorage.getItem(STORAGE_KEYS.EXAM_RESULTS);
    if (resultsString) {
      return JSON.parse(resultsString);
    }
    return [];
  } catch (error) {
    console.error('Error loading exam results:', error);
    return [];
  }
};

export const updateDailyStreak = async (): Promise<number> => {
  try {
    const today = new Date().toDateString();
    const lastStudyDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_STUDY_DATE);
    const currentStreakString = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_STREAK);
    
    let streak = currentStreakString ? parseInt(currentStreakString) : 0;
    
    if (lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastStudyDate === yesterday.toDateString()) {
        // Consecutive day
        streak += 1;
      } else if (lastStudyDate !== today) {
        // Streak broken
        streak = 1;
      }
      
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_STUDY_DATE, today);
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_STREAK, streak.toString());
      
      // Update user stats
      await updateUserStats({ currentStreak: streak });
    }
    
    return streak;
  } catch (error) {
    console.error('Error updating daily streak:', error);
    return 0;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};