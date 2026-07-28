/**
 * OpenAI Provider - Integração com OpenAI GPT
 */
import { Message, AIResponse, ProviderConfig } from '../types';
import { BaseAIProvider } from './AIProvider';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export class OpenAIProvider extends BaseAIProvider {
  name = 'openai' as const;
  
  constructor(config?: ProviderConfig) {
    super();
    this.config = config || null;
  }
  
  setConfig(config: ProviderConfig): void {
    this.config = config;
  }
  
  async chat(messages: Message[]): Promise<AIResponse> {
    if (!this.isConfigured()) {
      return {
        raw: null,
        text: '',
        error: 'OpenAI API key não configurada',
      };
    }
    
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config!.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config!.model || 'gpt-3.5-turbo',
          messages: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          temperature: 0.3,
          max_tokens: 500,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || '';
      
      return {
        raw: data,
        text,
      };
    } catch (error) {
      return {
        raw: null,
        text: '',
        error: error instanceof Error ? error.message : 'Erro ao chamar OpenAI',
      };
    }
  }
  
  protected callAPI(messages: Message[]): Promise<any> {
    return this.chat(messages).then(r => r.raw);
  }
}

export const openAIProvider = new OpenAIProvider();
