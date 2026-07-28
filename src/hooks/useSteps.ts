import { useState, useEffect, useCallback } from 'react';
import { stepCounterService } from '../services/stepCounter';

export const useSteps = () => {
  const [steps, setSteps] = useState(0);
  const [weeklySteps, setWeeklySteps] = useState<{ date: string; steps: number }[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      setIsLoading(true);
      const available = await stepCounterService.initialize();
      setIsAvailable(available);

      if (available) {
        const todaySteps = await stepCounterService.getTodaySteps();
        setSteps(todaySteps);

        const weekly = await stepCounterService.getWeeklySteps();
        setWeeklySteps(weekly);
      }
    } catch (err) {
      console.error('Error initializing steps:', err);
      setError('Erro ao inicializar contador de passos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshSteps = useCallback(async () => {
    if (!isAvailable) return;
    
    try {
      const todaySteps = await stepCounterService.getTodaySteps();
      setSteps(todaySteps);
    } catch (err) {
      console.error('Error refreshing steps:', err);
    }
  }, [isAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    steps,
    weeklySteps,
    isAvailable,
    isLoading,
    error,
    refreshSteps,
    reinitialize: initialize,
  };
};

export default useSteps;
