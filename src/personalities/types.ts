/**
 * Personality Pack Types
 * ======================
 * 
 * This file defines the types and interfaces for the GPTyrant personality pack system.
 * Personality packs allow for different communication styles and coaching approaches.
 */

import { ProviderType, TyrantOptions } from '../types';

/**
 * PersonalityPack defines a specific personality type for GPTyrant
 */
export interface PersonalityPack {
  /**
   * Unique identifier for the personality
   */
  id: string;
  
  /**
   * Display name of the personality
   */
  name: string;
  
  /**
   * Description of the personality and its coaching style
   */
  description: string;
  
  /**
   * Template for system prompt with variables {{sassLevel}} and {{focusAreas}}
   */
  systemPromptTemplate: string;
  
  /**
   * Optional function to transform response text
   * @param response The original AI response
   * @param level The effective sass level (base level × multiplier)
   * @returns The transformed response
   */
  responseTransformer?: (response: string, level: number) => string;
  
  /**
   * How this personality amplifies or reduces the sass level
   * Values > 1 make responses more intense, values < 1 make them less intense
   */
  sassMultiplier?: number;
  
  /**
   * List of recommended providers for this personality
   */
  recommendedProviders?: ProviderType[];
  
  /**
   * Default options to apply when using this personality
   */
  defaultOptions?: Partial<TyrantOptions>;
  
  /**
   * Additional metadata for this personality (for extension)
   */
  metadata?: Record<string, any>;
  
  /**
   * Whether this is a premium personality (requires subscription)
   */
  isPremium?: boolean;
  
  /**
   * Version of the personality pack
   */
  version?: string;
  
  /**
   * Author of the personality pack
   */
  author?: string;
}

/**
 * Type for tracking registered personalities
 */
export type PersonalityRegistry = Map<string, PersonalityPack>;

/**
 * Options for personality application
 */
export interface PersonalityOptions {
  /**
   * Whether to apply the personality's default options
   */
  applyDefaultOptions?: boolean;
  
  /**
   * Override the sass multiplier
   */
  overrideSassMultiplier?: number;
}

/**
 * Extended options for GPTyrant including personality selection
 */
export interface PersonalityTyrantOptions extends TyrantOptions {
  /**
   * ID of the personality to use
   */
  personalityId?: string;
  
  /**
   * Options for personality application
   */
  personalityOptions?: PersonalityOptions;
}