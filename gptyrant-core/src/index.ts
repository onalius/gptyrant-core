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
import { PersonalityManager } from './personalities/manager';
import { PersonalityTyrantOptions, PersonalityPack } from './personalities/types';

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
  private personalityManager: PersonalityManager;
  private currentPersonalityId: string | null = null;

  /**
   * Create a new GPTyrant instance
   * @param apiKey - API key for the selected provider
   * @param options - Configuration options for GPTyrant
   */
  constructor(apiKey: string, options: Partial<PersonalityTyrantOptions> = {}) {
    this.personalityManager = PersonalityManager.getInstance();
    
    // Initialize with default options
    this.options = { ...DEFAULT_OPTIONS, ...options };
    
    // Apply personality if specified
    if ((options as PersonalityTyrantOptions).personalityId) {
      const personalityId = (options as PersonalityTyrantOptions).personalityId!;
      const personalityOptions = (options as PersonalityTyrantOptions).personalityOptions;
      
      // Set the current personality
      this.setPersonality(personalityId, personalityOptions?.applyDefaultOptions ?? true);
    }
    
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
    // If a personality is set, use its system prompt
    if (this.currentPersonalityId) {
      return this.personalityManager.generateSystemPrompt(this.currentPersonalityId, this.options);
    }
    
    // Otherwise use the provider's default system prompt
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
    
    // Get the base response from the provider
    let response = await this.provider.generateCompletion(messages, mergedOptions);
    
    // Apply personality transformation if a personality is set
    if (this.currentPersonalityId) {
      response = this.personalityManager.transformResponse(
        this.currentPersonalityId, 
        response, 
        mergedOptions.sassLevel
      );
    }
    
    return response;
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
  
  /**
   * Set the personality for this GPTyrant instance
   * @param personalityId - The ID of the personality to use
   * @param applyDefaults - Whether to apply the personality's default options (default: true)
   * @returns The personality that was set
   * @throws Error if the personality is not found
   */
  public setPersonality(personalityId: string, applyDefaults: boolean = true): PersonalityPack {
    const personality = this.personalityManager.getPersonality(personalityId);
    if (!personality) {
      throw new Error(`Personality "${personalityId}" not found`);
    }
    
    this.currentPersonalityId = personalityId;
    
    // Apply the personality's default options if requested
    if (applyDefaults && personality.defaultOptions) {
      this.options = { ...this.options, ...personality.defaultOptions };
    }
    
    return personality;
  }
  
  /**
   * Get the current personality
   * @returns The current personality, or null if none is set
   */
  public getCurrentPersonality(): PersonalityPack | null {
    if (!this.currentPersonalityId) {
      return null;
    }
    
    return this.personalityManager.getPersonality(this.currentPersonalityId) || null;
  }
  
  /**
   * Get a list of all available personalities
   * @returns Array of all registered personalities
   */
  public getAvailablePersonalities(): PersonalityPack[] {
    return this.personalityManager.getAllPersonalities();
  }
  
  /**
   * Register a new personality
   * @param personality - The personality to register
   */
  public registerPersonality(personality: PersonalityPack): void {
    this.personalityManager.registerPersonality(personality);
  }
}

// Export types and providers for direct usage
export * from './types';
export * from './providers/openai';
export * from './providers/anthropic';
export * from './providers/grok';
export * from './providers/gemini';
export * from './personalities';

// Export simplified functions for quick usage
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

/**
 * Generate a response using a specific personality
 * @param message - The user's message
 * @param personalityId - The ID of the personality to use
 * @param apiKey - API key for the provider
 * @param options - Configuration options
 * @returns A promise that resolves to the assistant's response
 */
export async function generatePersonalityResponse(
  message: string,
  personalityId: string,
  apiKey: string,
  options: Partial<TyrantOptions> = {}
): Promise<string> {
  const tyrant = new GPTyrant(apiKey, {
    ...options,
    personalityId
  } as PersonalityTyrantOptions);
  
  const messages: Message[] = [
    {
      role: 'user',
      content: message
    }
  ];

  return tyrant.generateResponse(messages, options);
}

/**
 * Get a list of all available personalities
 * @returns Array of all registered personalities
 */
export function getAvailablePersonalities(): PersonalityPack[] {
  return PersonalityManager.getInstance().getAllPersonalities();
}

/**
 * Register a custom personality
 * @param personality - The personality pack to register
 */
export function registerPersonality(personality: PersonalityPack): void {
  PersonalityManager.getInstance().registerPersonality(personality);
}