/**
 * AIProvider - Interface comum para todos os provedores de IA
 */
import { Message, AIResponse, ParsedCommand, ProviderConfig, ProviderType } from '../types';

export interface AIProvider {
  /** Nome do provedor */
  name: ProviderType;
  
  /** Verifica se o provider está configurado */
  isConfigured(): boolean;
  
  /** Envia mensagem e recebe resposta */
  chat(messages: Message[]): Promise<AIResponse>;
  
  /** Interpreta texto livre e retorna comando estruturado */
  interpret(text: string, systemPrompt: string): Promise<AIResponse>;
}

export abstract class BaseAIProvider implements AIProvider {
  protected config: ProviderConfig | null = null;
  abstract name: ProviderType;
  
  abstract chat(messages: Message[]): Promise<AIResponse>;
  protected abstract callAPI(messages: Message[]): Promise<any>;
  
  isConfigured(): boolean {
    return !!this.config?.apiKey;
  }
  
  async interpret(text: string, systemPrompt: string): Promise<AIResponse> {
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ];
    
    try {
      const response = await this.chat(messages);
      return this.parseResponse(response);
    } catch (error) {
      return {
        raw: null,
        text: '',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
  
  protected parseResponse(response: AIResponse): AIResponse {
    try {
      // Tenta extrair JSON da resposta
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as ParsedCommand;
        return {
          ...response,
          parsed,
        };
      }
      
      // Fallback: tentar encontrar ação por palavras-chave
      return {
        ...response,
        parsed: this.fallbackParse(response.text),
      };
    } catch {
      return {
        ...response,
        parsed: this.fallbackParse(response.text),
      };
    }
  }
  
  private fallbackParse(text: string): ParsedCommand {
    const lowerText = text.toLowerCase();
    
    // Detecção por palavras-chave
    if (lowerText.includes('água') || lowerText.includes('agua') || lowerText.includes('beber')) {
      return { action: 'add_water', confidence: 0.7, entities: {}, originalText: text };
    }
    if (lowerText.includes('comida') || lowerText.includes('refeic') || lowerText.includes('comi')) {
      return { action: 'log_meal', confidence: 0.7, entities: {}, originalText: text };
    }
    if (lowerText.includes('reméd') || lowerText.includes('medicamento') || lowerText.includes('tomar')) {
      return { action: 'log_medication', confidence: 0.7, entities: {}, originalText: text };
    }
    if (lowerText.includes('sono') || lowerText.includes('dormi')) {
      return { action: 'log_sleep', confidence: 0.7, entities: {}, originalText: text };
    }
    if (lowerText.includes('triste') || lowerText.includes('feliz') || lowerText.includes('humor')) {
      return { action: 'log_mood', confidence: 0.7, entities: {}, originalText: text };
    }
    if (lowerText.includes('passo') || lowerText.includes('exercício') || lowerText.includes('exercicio')) {
      return { action: 'add_steps', confidence: 0.7, entities: {}, originalText: text };
    }
    
    return { action: 'unknown', confidence: 0, entities: {}, originalText: text };
  }
}
