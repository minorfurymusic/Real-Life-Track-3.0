/**
 * Step History Service - Serviço de contador de passos usando Android History API
 * 
 * Este serviço busca os dados de passos do Android Step Counter,
 * que é mantido pelo sistema operacional Android mesmo com o app fechado.
 * 
 * COMO FUNCIONA:
 * O Android mantém um histórico de passos através do sensor de movimento
 * (Step Counter/Detector). Esse histórico é incrementado pelo hardware
 * do celular e armazenado pelo sistema operacional.
 * 
 * O Pedometer.getStepCountAsync() busca esses dados históricos,
 * que representam TODOS os passos contados desde que o sensor foi resetado,
 * independentemente de o app estar aberto ou não.
 * 
 * REQUER:
 * - Permissão ACTIVITY_RECOGNITION
 * - Celular com sensor de passos (a maioria dos smartphones modernos tem)
 */

import { Platform, PermissionsAndroid } from 'react-native';
import { Pedometer } from 'expo-sensors';

export interface StepData {
  date: string;
  steps: number;
}

class StepHistoryService {
  private isAuthorized: boolean = false;
  private isAvailable: boolean = false;

  /**
   * Inicializa o serviço
   */
  async initialize(): Promise<boolean> {
    try {
      // Verifica se o sensor de passos está disponível
      this.isAvailable = await Pedometer.isAvailableAsync();
      console.log('[StepHistory] Sensor de passos disponível:', this.isAvailable);

      if (!this.isAvailable) {
        console.log('[StepHistory] Sensor não disponível neste dispositivo');
        return false;
      }

      if (Platform.OS === 'android') {
        const granted = await this.requestPermission();
        if (!granted) {
          console.log('[StepHistory] Permissão negada');
          return false;
        }
        this.isAuthorized = true;
      } else {
        this.isAuthorized = true;
      }

      console.log('[StepHistory] Serviço inicializado com sucesso');
      return this.isAuthorized;
    } catch (error) {
      console.error('[StepHistory] Erro ao inicializar:', error);
      return false;
    }
  }

  /**
   * Solicita permissão de reconhecimento de atividade
   */
  private async requestPermission(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: 'Permissão de Atividade Física',
            message: 'Real Life Track precisa acessar seus dados de passos para rastrear sua atividade física. O Android coleta esses dados automaticamente pelo sensor de movimento do celular.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (error) {
      console.error('[StepHistory] Erro ao solicitar permissão:', error);
      return false;
    }
  }

  /**
   * Verifica se o sensor está disponível
   */
  getAvailability(): boolean {
    return this.isAvailable;
  }

  /**
   * Verifica se está autorizado
   */
  getAuthorization(): boolean {
    return this.isAuthorized;
  }

  /**
   * Obtém os passos de HOJE
   * 
   * Este método busca os passos do Android Step Counter History.
   * Os dados são atualizados pelo Android mesmo quando o app está fechado.
   */
  async getTodaySteps(): Promise<number> {
    if (!this.isAvailable) {
      console.log('[StepHistory] Sensor não disponível');
      return 0;
    }

    try {
      const now = new Date();
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const result = await Pedometer.getStepCountAsync(startOfDay, now);
      const steps = result?.steps ?? 0;
      
      console.log('[StepHistory] Passos de hoje:', steps);
      return steps;
    } catch (error) {
      console.error('[StepHistory] Erro ao buscar passos:', error);
      return 0;
    }
  }

  /**
   * Obtém os passos de uma data específica
   */
  async getStepsForDate(date: Date): Promise<number> {
    if (!this.isAvailable) return 0;

    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const result = await Pedometer.getStepCountAsync(startOfDay, endOfDay);
      return result?.steps ?? 0;
    } catch (error) {
      console.error('[StepHistory] Erro ao buscar passos para data:', error);
      return 0;
    }
  }

  /**
   * Obtém os passos da última semana
   */
  async getWeeklySteps(): Promise<StepData[]> {
    if (!this.isAvailable) return [];

    const weeklyData: StepData[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const steps = await this.getStepsForDate(date);
      
      weeklyData.push({
        date: date.toISOString().split('T')[0],
        steps: steps,
      });
    }

    return weeklyData;
  }

  /**
   * Inicia observações em tempo real (quando app está aberto)
   */
  startLiveUpdates(callback: (steps: number) => void): () => void {
    if (!this.isAvailable) {
      console.log('[StepHistory] Não é possível iniciar updates em tempo real');
      return () => {};
    }

    const subscription = Pedometer.watchStepCount(result => {
      callback(result.steps);
    });

    return () => {
      subscription.remove();
    };
  }

  /**
   * Calcula a média diária de passos
   */
  async getAverageSteps(days: number = 7): Promise<number> {
    const data = await this.getWeeklySteps();
    
    if (data.length === 0) return 0;
    
    const totalSteps = data.reduce((sum, day) => sum + day.steps, 0);
    return Math.round(totalSteps / data.length);
  }

  /**
   * Verifica se a meta foi atingida (padrão: 10.000 passos)
   */
  async isGoalReached(goal: number = 10000): Promise<boolean> {
    const todaySteps = await this.getTodaySteps();
    return todaySteps >= goal;
  }

  /**
   * Retorna mensagem motivacional
   */
  async getMotivationalMessage(): Promise<string> {
    const todaySteps = await this.getTodaySteps();
    const goal = 10000;

    if (todaySteps >= goal) {
      return `🎉 Parabéns! Você atingiu sua meta de ${goal.toLocaleString()} passos!`;
    }

    const remaining = goal - todaySteps;
    const percent = Math.round((todaySteps / goal) * 100);

    if (percent >= 75) {
      return `🔥 Quase lá! Faltam apenas ${remaining.toLocaleString()} passos para atingir sua meta!`;
    }
    if (percent >= 50) {
      return `💪 Ótimo progresso! Você já caminhou ${todaySteps.toLocaleString()} passos. Continue assim!`;
    }
    if (percent >= 25) {
      return `🚶 Bom começo! Você tem ${todaySteps.toLocaleString()} passos. Que tal uma caminhada?`;
    }
    
    return `🌅 Bom dia! Sua meta é ${goal.toLocaleString()} passos. Vamos começar?`;
  }
}

// Singleton
export const stepHistoryService = new StepHistoryService();
export default stepHistoryService;
