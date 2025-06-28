/**
 * GPTyrant - A tough love AI assistant wrapper
 * ==================================================
 * A wrapper for multiple AI providers that creates a tough love, no-nonsense
 * personality to push users past their excuses and toward their goals.
 * 
 * @version 0.1.0
 * @license MIT
 */

import { AIProvider, Message, ProviderType, TyrantOptions } from './types';
import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GrokProvider } from './providers/grok';
import { GeminiProvider } from './providers/gemini';

const DEFAULT_OPTIONS: TyrantOptions = {
  sassLevel: 7,
  focusAreas: ['procrastination', 'excuses', 'goal-setting'],
  temperature: 0.7,
  maxTokens: 600,
  provider: 'openai',
};

/**
 * GPTyrant class - Main entry point for using the GPTyrant core functionality
 */
export class GPTyrant {
  private provider: AIProvider;
  private options: TyrantOptions;

  /**
   * Create a new GPTyrant instance
   * @param apiKey - API key for the selected provider
   * @param options - Configuration options for GPTyrant
   */
  constructor(apiKey: string, options: Partial<TyrantOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Initialize the appropriate provider
    switch (this.options.provider) {
      case 'anthropic':
        this.provider = new AnthropicProvider(apiKey, this.options.model);
        break;
      case 'grok':
        this.provider = new GrokProvider(apiKey, this.options.model);
        break;
      case 'gemini':
        this.provider = new GeminiProvider(apiKey, this.options.model);
        break;
      case 'openai':
      default:
        this.provider = new OpenAIProvider(apiKey, this.options.model);
        break;
    }
  }

  /**
   * Get the system prompt used for the conversation
   * @returns A system message that defines the GPTyrant personality
   */
  public getSystemPrompt(): Message {
    return this.provider.getSystemPrompt(this.options);
  }

  /**
   * Generate a response to a conversation
   * @param messages - Array of messages in the conversation
   * @param options - Optional runtime options to override defaults
   * @returns A string containing the assistant's response
   */
  public async generateResponse(
    messages: Message[], 
    options: Partial<TyrantOptions> = {}
  ): Promise<string> {
    const mergedOptions = { ...this.options, ...options };
    return this.provider.generateCompletion(messages, mergedOptions);
  }

  /**
   * Update the configuration options for this GPTyrant instance
   * @param options - New options to apply
   */
  public updateOptions(options: Partial<TyrantOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Change the AI provider being used
   * @param provider - The provider type to switch to
   * @param apiKey - API key for the new provider
   * @param model - Optional model to use with the new provider
   */
  public setProvider(provider: ProviderType, apiKey: string, model?: string): void {
    const providerOptions = { ...this.options, provider, model };

    switch (provider) {
      case 'anthropic':
        this.provider = new AnthropicProvider(apiKey, model);
        break;
      case 'grok':
        this.provider = new GrokProvider(apiKey, model);
        break;
      case 'gemini':
        this.provider = new GeminiProvider(apiKey, model);
        break;
      case 'openai':
      default:
        this.provider = new OpenAIProvider(apiKey, model);
        break;
    }

    this.options = providerOptions;
  }
}

// Export types and providers for direct usage
export * from './types';
export * from './providers/openai';
export * from './providers/anthropic';
export * from './providers/grok';
export * from './providers/gemini';

// Export a simplified function for quick usage
/**
 * Generate a tough love response without creating a GPTyrant instance
 * @param message - The user's message
 * @param apiKey - API key for the provider
 * @param options - Configuration options
 * @returns A promise that resolves to the assistant's response
 */
export async function generateToughLoveResponse(
  message: string,
  apiKey: string,
  options: Partial<TyrantOptions> = {}
): Promise<string> {
  const tyrant = new GPTyrant(apiKey, options);
  
  const messages: Message[] = [
    {
      role: 'user',
      content: message
    }
  ];

  return tyrant.generateResponse(messages, options);
}