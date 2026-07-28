/**
 * AI Types - Tipos comuns para todos os provedores de IA
 */

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  raw: any;
  text: string;
  parsed?: ParsedCommand;
  error?: string;
}

export interface ParsedCommand {
  action: string;
  confidence: number;
  entities: Record<string, any>;
  originalText: string;
}

export type ProviderType = 'openai' | 'gemini' | 'claude' | 'local';

export interface ProviderConfig {
  apiKey: string;
  model?: string;
  baseUrl?: string;
}

// Configuração do cérebro
export interface BrainConfig {
  apiKey: string;
  provider: ProviderType;
  model?: string;
}

// Resultado de um comando processado
export interface CommandResult {
  success: boolean;
  action: string;
  data?: any;
  message?: string;
}

export const PROVIDER_NAMES: Record<ProviderType, string> = {
  openai: 'OpenAI',
  gemini: 'Google Gemini',
  claude: 'Anthropic Claude',
  local: 'Servidor Local',
};

// Sistema de prompts para interpretar comandos
export const SYSTEM_PROMPT = `Você é um assistente de saúde pessoal. Analise a mensagem do usuário e determine qual ação tomar.

Ações disponíveis:
- add_water: Quando usuário menciona beber água ou hidratação
- add_steps: Quando usuário menciona exercícios ou passos
- log_meal: Quando usuário menciona comida/refeição
- log_medication: Quando usuário menciona medicamento/remédio
- log_sleep: Quando usuário menciona sono/descanso
- log_mood: Quando usuário menciona humor/sentimentos
- show_help: Quando usuário pede ajuda
- unknown: Quando não consegue identificar a ação

Responda APENAS com JSON no formato:
{"action": "ação_identificada", "confidence": 0.0-1.0, "entities": {}, "originalText": "texto original"}

Exemplos:
- "bebi um copo de água" → {"action": "add_water", "confidence": 0.95, "entities": {"amount": 250}, "originalText": "bebi um copo de água"}
- "comi almoço agora" → {"action": "log_meal", "confidence": 0.9, "entities": {"mealType": "almoco"}, "originalText": "comi almoço agora"}
- "estou triste hoje" → {"action": "log_mood", "confidence": 0.9, "entities": {"mood": "sad"}, "originalText": "estou triste hoje"}`;
