/**
 * Personality Manager
 * ==================
 * 
 * This file provides functionality for managing personality packs
 * in the GPTyrant library. It handles registration, retrieval, and
 * application of personality packs.
 */

import { PersonalityPack, PersonalityRegistry } from './types';
import { getDefaultPersonalityMap } from './default';
import { Message, TyrantOptions } from '../types';

/**
 * PersonalityManager handles the registration and management of personality packs
 */
export class PersonalityManager {
  private personalities: PersonalityRegistry;
  
  /**
   * Creates a new PersonalityManager
   * @param includeDefaults Whether to include default personalities (default: true)
   */
  constructor(includeDefaults: boolean = true) {
    this.personalities = new Map<string, PersonalityPack>();
    
    if (includeDefaults) {
      // Register all default personalities
      const defaultPersonalities = getDefaultPersonalityMap();
      defaultPersonalities.forEach((personality, id) => {
        this.personalities.set(id, personality);
      });
    }
  }
  
  /**
   * Register a new personality pack
   * @param personality The personality pack to register
   * @throws Error if a personality with the same ID already exists
   */
  registerPersonality(personality: PersonalityPack): void {
    if (this.personalities.has(personality.id)) {
      throw new Error(`Personality with ID "${personality.id}" already exists`);
    }
    
    this.personalities.set(personality.id, personality);
  }
  
  /**
   * Unregister a personality pack
   * @param id The ID of the personality to unregister
   * @returns true if the personality was unregistered, false if it didn't exist
   */
  unregisterPersonality(id: string): boolean {
    return this.personalities.delete(id);
  }
  
  /**
   * Get a personality pack by ID
   * @param id The ID of the personality to retrieve
   * @returns The personality pack, or undefined if not found
   */
  getPersonality(id: string): PersonalityPack | undefined {
    return this.personalities.get(id);
  }
  
  /**
   * Get all registered personalities
   * @returns Array of all registered personality packs
   */
  getAllPersonalities(): PersonalityPack[] {
    return Array.from(this.personalities.values());
  }
  
  /**
   * Get a list of available personality IDs
   * @returns Array of personality IDs
   */
  getPersonalityIds(): string[] {
    return Array.from(this.personalities.keys());
  }
  
  /**
   * Apply a personality to generate a system prompt
   * @param personalityId The ID of the personality to apply
   * @param options The TyrantOptions to use
   * @returns A system message with the personality applied
   * @throws Error if the personality is not found
   */
  generateSystemPrompt(personalityId: string, options: TyrantOptions): Message {
    const personality = this.personalities.get(personalityId);
    if (!personality) {
      throw new Error(`Personality "${personalityId}" not found`);
    }
    
    // Replace variables in the template
    const content = personality.systemPromptTemplate
      .replace(/{{sassLevel}}/g, options.sassLevel.toString())
      .replace(/{{focusAreas}}/g, options.focusAreas.join(', '));
    
    return { role: 'system', content };
  }
  
  /**
   * Apply a personality's response transformer
   * @param personalityId The ID of the personality to apply
   * @param response The response to transform
   * @param sassLevel The sass level to use
   * @returns The transformed response
   * @throws Error if the personality is not found
   */
  transformResponse(personalityId: string, response: string, sassLevel: number): string {
    const personality = this.personalities.get(personalityId);
    if (!personality) {
      throw new Error(`Personality "${personalityId}" not found`);
    }
    
    // Apply the transformer if it exists
    if (personality.responseTransformer) {
      // Calculate effective sass level
      const effectiveSassLevel = sassLevel * (personality.sassMultiplier || 1);
      return personality.responseTransformer(response, effectiveSassLevel);
    }
    
    // Otherwise return the original response
    return response;
  }
  
  /**
   * Apply a personality's default options
   * @param personalityId The ID of the personality to apply
   * @param options The original options
   * @returns Options with the personality defaults applied
   * @throws Error if the personality is not found
   */
  applyPersonalityDefaults(personalityId: string, options: TyrantOptions): TyrantOptions {
    const personality = this.personalities.get(personalityId);
    if (!personality) {
      throw new Error(`Personality "${personalityId}" not found`);
    }
    
    if (personality.defaultOptions) {
      return { ...options, ...personality.defaultOptions };
    }
    
    return options;
  }
  
  /**
   * Create a singleton instance of PersonalityManager
   */
  private static instance: PersonalityManager;
  
  /**
   * Get the singleton instance of the PersonalityManager
   * @returns The singleton PersonalityManager instance
   */
  public static getInstance(): PersonalityManager {
    if (!PersonalityManager.instance) {
      PersonalityManager.instance = new PersonalityManager();
    }
    
    return PersonalityManager.instance;
  }
}