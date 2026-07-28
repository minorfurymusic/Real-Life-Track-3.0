/**
 * Brain Service - Serviço de inteligência para comandos de voz/texto
 * 
 * Fluxo:
 * 1. Se tem API key → Usa IA (OpenAI/Gemini) para interpretar
 * 2. Se não tem API key → Usa comandos programados (fallback)
 * 
 * Suporta múltiplos provedores de IA de forma transparente.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  BrainConfig, 
  CommandResult, 
  ProviderType,
  AIProvider,
  OpenAIProvider,
  GeminiProvider,
  SYSTEM_PROMPT
} from './ai';

const BRAIN_CONFIG_KEY = '@real_life_track_brain_config';

// Provedores disponíveis
const PROVIDERS: Record<ProviderType, () => AIProvider> = {
  openai: () => new OpenAIProvider(),
  gemini: () => new GeminiProvider(),
  claude: () => {
    // Placeholder para Claude - pode ser implementado depois
    console.warn('Claude provider ainda não implementado');
    return new OpenAIProvider(); // Fallback temporário
  },
  local: () => {
    // Placeholder para servidor local - pode ser implementado depois
    console.warn('Local provider ainda não implementado');
    return new OpenAIProvider(); // Fallback temporário
  },
};

// Comandos programados (fallback)
const COMMAND_PATTERNS: Record<string, string[]> = {
  water: ['agua', 'águ', 'beber', 'hidratar', 'water', 'drink', 'hydrate', 'copo'],
  steps: ['passos', 'steps', 'caminhar', 'walk', 'exercise', 'exercicio', 'caminhada', 'corrida'],
  meal: ['comi', 'comida', 'refeic', 'meal', 'food', 'comer', 'eat', 'almoc', 'almo', 'jantar', 'café', 'lanche'],
  medication: ['remedio', 'reméd', 'medicamento', 'medicine', 'medication', 'pilula', 'tomar', 'tarja'],
  sleep: ['dormi', 'sono', 'horas de sono', 'descansar', 'sleep', 'noite'],
  mood: ['humor', 'mood', 'sentir', 'feel', 'feliz', 'triste', 'ansioso', 'estou', 'me sentindo'],
  help: ['ajuda', 'help', 'comandos', 'commands', 'o que você', 'o que pode'],
};

const COMMAND_HANDLERS: Record<string, (params?: any) => Promise<CommandResult>> = {
  water: async (params?: { amount?: number }) => {
    const amount = params?.amount || 250;
    return {
      success: true,
      action: 'add_water',
      data: { amount },
      message: `💧 Adicionando ${amount}ml de água ao seu registro`,
    };
  },
  
  steps: async () => {
    return {
      success: true,
      action: 'sync_steps',
      data: {},
      message: '🚶 Sincronizando passos...',
    };
  },
  
  meal: async (params?: { name?: string }) => {
    return {
      success: true,
      action: 'log_meal',
      data: { name: params?.name || 'Refeição' },
      message: '🍽️ Registrando refeição',
    };
  },
  
  medication: async (params?: { name?: string }) => {
    return {
      success: true,
      action: 'log_medication',
      data: { name: params?.name || 'Medicamento' },
      message: '💊 Registrando medicamento',
    };
  },
  
  sleep: async () => {
    return {
      success: true,
      action: 'log_sleep',
      data: {},
      message: '😴 Registrando sono',
    };
  },
  
  mood: async (params?: { mood?: string }) => {
    return {
      success: true,
      action: 'log_mood',
      data: { mood: params?.mood || 'neutral' },
      message: '😊 Registrando humor',
    };
  },
  
  help: async () => {
    const commands = Object.entries(COMMAND_PATTERNS)
      .filter(([key]) => key !== 'help')
      .map(([key]) => {
        const descriptions: Record<string, string> = {
          water: '💧 Registrar água',
          steps: '🚶 Registrar passos',
          meal: '🍽️ Registrar refeição',
          medication: '💊 Registrar medicamento',
          sleep: '😴 Registrar sono',
          mood: '😊 Registrar humor',
        };
        return descriptions[key] || key;
      });
    
    return {
      success: true,
      action: 'show_help',
      data: { commands },
      message: `📋 Comandos disponíveis:\n${commands.join('\n')}`,
    };
  },
};

export class BrainService {
  private config: BrainConfig | null = null;
  private provider: AIProvider | null = null;
  
  /**
   * Inicializa o serviço - carrega configuração
   */
  async initialize(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(BRAIN_CONFIG_KEY);
      if (stored) {
        this.config = JSON.parse(stored);
        this.setupProvider();
      }
    } catch (error) {
      console.error('Erro ao carregar config do cérebro:', error);
      this.config = null;
    }
  }
  
  /**
   * Configura o provedor de IA baseado na configuração atual
   */
  private setupProvider(): void {
    if (!this.config?.apiKey) {
      this.provider = null;
      return;
    }
    
    const createProvider = PROVIDERS[this.config.provider];
    if (createProvider) {
      this.provider = createProvider();
      
      // Configura o provider com a API key
      if ('setConfig' in this.provider) {
        (this.provider as any).setConfig({
          apiKey: this.config.apiKey,
          model: this.config.model,
        });
      }
    }
  }
  
  /**
   * Salva a configuração do cérebro
   */
  async setConfig(config: BrainConfig): Promise<void> {
    this.config = config;
    this.setupProvider();
    
    try {
      await AsyncStorage.setItem(BRAIN_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Erro ao salvar config do cérebro:', error);
    }
  }
  
  /**
   * Retorna a configuração atual
   */
  getConfig(): BrainConfig | null {
    return this.config;
  }
  
  /**
   * Verifica se tem API key configurada
   */
  hasApiKey(): boolean {
    return !!this.config?.apiKey;
  }
  
  /**
   * Verifica se tem provedor de IA disponível
   */
  hasAIProvider(): boolean {
    return this.provider !== null && this.provider.isConfigured();
  }
  
  /**
   * Processa um comando de entrada
   * 
   * Fluxo:
   * 1. Se tem API key → Usa IA para interpretar
   * 2. Se não tem → Usa comandos programados
   */
  async processCommand(input: string): Promise<CommandResult> {
    const normalizedInput = input.toLowerCase().trim();
    
    // Se tem provedor de IA configurado, usa ele
    if (this.hasAIProvider()) {
      return this.processWithAI(normalizedInput);
    }
    
    // Caso contrário, usa comandos programados
    return this.processWithProgrammedCommands(normalizedInput);
  }
  
  /**
   * Processa comando usando IA
   */
  private async processWithAI(input: string): Promise<CommandResult> {
    if (!this.provider) {
      return {
        success: false,
        action: 'error',
        message: 'Provedor de IA não configurado',
      };
    }
    
    try {
      console.log(`🤖 Processando com ${this.provider.name}: "${input}"`);
      
      const response = await this.provider.interpret(input, SYSTEM_PROMPT);
      
      if (response.error) {
        console.error('Erro do provedor de IA:', response.error);
        // Faz fallback para comandos programados
        return this.processWithProgrammedCommands(input);
      }
      
      if (response.parsed) {
        const { action, confidence, entities } = response.parsed;
        
        console.log(`📊 IA interpretou: action=${action}, confidence=${confidence}`);
        
        // Só executa se tiver confiança suficiente
        if (confidence >= 0.6) {
          return this.executeCommand(action, entities);
        }
        
        // Se confiança baixa, tenta comandos programados
        console.log('Confiança baixa, tentando comandos programados...');
        const fallbackResult = this.processWithProgrammedCommands(input);
        
        // Se encontrou comando, usa ele. Caso contrário, retorna aviso
        if (fallbackResult.success) {
          return fallbackResult;
        }
        
        return {
          success: false,
          action: 'low_confidence',
          message: `Não tenho certeza do que você quis dizer. Confiança: ${Math.round(confidence * 100)}%`,
        };
      }
      
      // Fallback se não conseguiu parsear
      return this.processWithProgrammedCommands(input);
      
    } catch (error) {
      console.error('Erro ao processar com IA:', error);
      return {
        success: false,
        action: 'error',
        message: 'Erro ao processar com IA. Tentando comandos locais...',
      };
    }
  }
  
  /**
   * Processa comando usando padrões programados
   */
  private processWithProgrammedCommands(input: string): CommandResult {
    for (const [command, patterns] of Object.entries(COMMAND_PATTERNS)) {
      if (patterns.some(pattern => input.includes(pattern))) {
        return {
          success: true,
          action: command,
          message: `📝 Comando reconhecido (modo local): ${command}`,
        };
      }
    }
    
    return {
      success: false,
      action: 'unknown',
      message: '❓ Comando não reconhecido. Digite "ajuda" para ver os comandos disponíveis.',
    };
  }
  
  /**
   * Executa um comando reconhecido
   */
  async executeCommand(action: string, params?: any): Promise<CommandResult> {
    const handler = COMMAND_HANDLERS[action];
    if (handler) {
      return await handler(params);
    }
    
    return {
      success: false,
      action: 'error',
      message: `Handler não encontrado para: ${action}`,
    };
  }
  
  /**
   * Limpa toda a configuração
   */
  async clearConfig(): Promise<void> {
    this.config = null;
    this.provider = null;
    
    try {
      await AsyncStorage.removeItem(BRAIN_CONFIG_KEY);
    } catch (error) {
      console.error('Erro ao limpar config do cérebro:', error);
    }
  }
  
  /**
   * Retorna lista de provedores disponíveis
   */
  getAvailableProviders(): ProviderType[] {
    return Object.keys(PROVIDERS) as ProviderType[];
  }
}

// Singleton
export const brainService = new BrainService();
export default brainService;
