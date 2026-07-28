/**
 * Step Counter Service - Serviço de contador de passos
 * 
 * Usa Google Fit History API para buscar dados de passos que são
 * coletados pelo sistema Android mesmo com o app fechado.
 * 
 * IMPORTANTE: O Android mantém um histórico de passos através do
 * sensor de movimento. O Google Fit sincroniza esses dados.
 */

import { stepHistoryService, StepData } from './GoogleFitService';

class StepCounterService {
  private isAvailable: boolean = false;
  private isInitialized: boolean = false;
  private liveUpdateCleanup: (() => void) | null = null;

  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return this.isAvailable;
    }

    try {
      console.log('[StepCounter] Inicializando Step History Service...');
      this.isAvailable = await stepHistoryService.initialize();
      this.isInitialized = true;
      
      console.log('[StepCounter] Step History disponível:', this.isAvailable);
      
      return this.isAvailable;
    } catch (error) {
      console.error('[StepCounter] Erro ao inicializar:', error);
      this.isInitialized = true;
      return false;
    }
  }

  /**
   * Obtém os passos de HOJE
   * 
   * IMPORTANTE: Os dados são buscados do Google Fit/History API,
   * que mantém os passos mesmo quando o app está fechado.
   */
  async getTodaySteps(): Promise<number> {
    if (!this.isAvailable) {
      console.log('[StepCounter] Serviço não disponível');
      return 0;
    }

    return await stepHistoryService.getTodaySteps();
  }

  /**
   * Obtém os passos da última semana
   * 
   * Funciona mesmo com app fechado porque busca do histórico
   * do Google Fit (Android History API).
   */
  async getWeeklySteps(): Promise<StepData[]> {
    if (!this.isAvailable) {
      console.log('[StepCounter] Serviço não disponível');
      return [];
    }

    return await stepHistoryService.getWeeklySteps();
  }

  /**
   * Inicia observações em tempo real
   * 
   * ATENÇÃO: Esta função só funciona enquanto o app está aberto.
   * Para tracking em background, os dados já estão no Google Fit.
   */
  startLiveUpdates(callback: (steps: number) => void): void {
    if (!this.isAvailable) {
      console.log('[StepCounter] Não é possível iniciar - serviço não disponível');
      return;
    }

    if (this.liveUpdateCleanup) {
      this.liveUpdateCleanup();
    }

    console.log('[StepCounter] Iniciando updates em tempo real...');
    this.liveUpdateCleanup = stepHistoryService.startLiveUpdates(callback);
  }

  /**
   * Para observações em tempo real
   */
  stopLiveUpdates(): void {
    if (this.liveUpdateCleanup) {
      this.liveUpdateCleanup();
      this.liveUpdateCleanup = null;
      console.log('[StepCounter] Updates em tempo real encerrados');
    }
  }

  /**
   * Verifica se o Google Fit está disponível
   */
  isGoogleFitAvailable(): boolean {
    return this.isAvailable;
  }

  /**
   * Retorna mensagem motivacional
   */
  async getMotivationalMessage(): Promise<string> {
    if (!this.isAvailable) {
      return 'Inicie o app para começar a rastrear seus passos!';
    }
    return await stepHistoryService.getMotivationalMessage();
  }

  /**
   * Calcula média de passos
   */
  async getAverageSteps(days: number = 7): Promise<number> {
    if (!this.isAvailable) return 0;
    return await stepHistoryService.getAverageSteps(days);
  }

  /**
   * Verifica se a meta foi atingida
   */
  async isGoalReached(goal: number = 10000): Promise<boolean> {
    if (!this.isAvailable) return false;
    return await stepHistoryService.isGoalReached(goal);
  }
}

export const stepCounterService = new StepCounterService();
export default stepCounterService;
