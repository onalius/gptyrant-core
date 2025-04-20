/**
 * GPTyrant - A tough love AI assistant wrapper
 * =============================================
 * 
 * A wrapper for multiple AI providers that creates a tough love, no-nonsense
 * personality to push users past their excuses and toward their goals.
 * 
 * This file serves as the main entry point for the TypeScript implementation.
 * For Python, see gptyrant.py
 * 
 * @version 0.1.0
 * @license MIT
 */

import { Message, TyrantOptions, ProviderType } from './gptyrant/src/types';
import { GPTyrant } from './gptyrant/src';

/**
 * Default configuration for the GPTyrant
 */
const DEFAULT_OPTIONS: TyrantOptions = {
  sassLevel: 7,
  focusAreas: ['procrastination', 'excuses', 'motivation'],
  temperature: 0.7,
  maxTokens: 1000,
  model: 'gpt-4o',
  provider: 'openai'
};

/**
 * Create a GPTyrant instance with the given API key and options
 * 
 * @param apiKey - API key for the selected provider
 * @param options - Configuration options for GPTyrant
 * @returns A GPTyrant instance
 */
export function createTyrant(apiKey: string, options: Partial<TyrantOptions> = {}) {
  return new GPTyrant(apiKey, { ...DEFAULT_OPTIONS, ...options });
}

/**
 * Generate a tough love response to a single message
 * 
 * @param apiKey - API key for the selected provider
 * @param message - User message to respond to
 * @param options - Configuration options for the response
 * @returns A promise resolving to the assistant's response string
 */
export async function generateToughLoveResponse(
  apiKey: string,
  message: string,
  options: Partial<TyrantOptions> = {}
): Promise<string> {
  const tyrant = createTyrant(apiKey, options);
  return await tyrant.generateResponse([{ role: 'user', content: message }]);
}

// Export the core components for advanced usage
export { GPTyrant, Message, TyrantOptions, ProviderType };