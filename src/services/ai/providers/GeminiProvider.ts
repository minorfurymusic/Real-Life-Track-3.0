/**
 * Gemini Provider - Integração com Google Gemini
 */
import { Message, AIResponse, ProviderConfig } from '../types';
import { BaseAIProvider } from './AIProvider';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export class GeminiProvider extends BaseAIProvider {
  name = 'gemini' as const;
  
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
        error: 'Gemini API key não configurada',
      };
    }
    
    try {
      const model = this.config!.model || 'gemini-1.5-flash';
      const apiUrl = `${GEMINI_API_URL}/${model}:generateContent?key=${this.config!.apiKey}`;
      
      // Converte mensagens para o formato do Gemini
      const contents = this.convertToGeminiFormat(messages);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      return {
        raw: data,
        text,
      };
    } catch (error) {
      return {
        raw: null,
        text: '',
        error: error instanceof Error ? error.message : 'Erro ao chamar Gemini',
      };
    }
  }
  
  protected callAPI(messages: Message[]): Promise<any> {
    return this.chat(messages).then(r => r.raw);
  }
  
  private convertToGeminiFormat(messages: Message[]): any[] {
    // Gemini usa um formato diferente de mensagens
    // system messages são combinados no início
    let systemInstruction = '';
    const contents: any[] = [];
    
    for (const msg of messages) {
      if (msg.role === 'system') {
        systemInstruction += msg.content + '\n';
      } else if (msg.role === 'user') {
        contents.push({
          role: 'user',
          parts: [{ text: msg.content }],
        });
      } else if (msg.role === 'assistant') {
        contents.push({
          role: 'model',
          parts: [{ text: msg.content }],
        });
      }
    }
    
    // Retorna contents - system instruction seria adicionada separadamente
    return contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: '' }] }];
  }
}

export const geminiProvider = new GeminiProvider();
