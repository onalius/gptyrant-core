/**
 * GPTyrant Enhanced - Advanced implementation of GPTyrant
 * ======================================================
 * 
 * This file provides an enhanced version of GPTyrant with additional
 * functionality including:
 * - Conversation history management
 * - Automatic API key handling
 * - Custom model configurations
 * - Feedback mechanisms
 * 
 * @version 0.1.0
 * @license MIT
 */

import fs from 'fs';
import path from 'path';
import { GPTyrant, TyrantOptions, Message, ProviderType } from './gptyrant';

// Default config path
const DEFAULT_CONFIG_PATH = './.gptyrant-config.json';

// Default configuration
const DEFAULT_CONFIG = {
  apiKey: '',
  provider: 'openai' as ProviderType,
  model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
  sassLevel: 7,
  focusAreas: ['procrastination', 'excuses', 'motivation'],
  historySize: 10,
  autoSaveHistory: true,
  feedbackPrompt: 'Did that response help you get unstuck? (yes/no)',
  historyPath: './.gptyrant-history.json'
};

// Enhanced GPTyrant configuration
interface EnhancedConfig extends TyrantOptions {
  historySize: number;
  autoSaveHistory: boolean;
  feedbackPrompt: string;
  historyPath: string;
}

// Conversation history entry
interface ConversationEntry {
  timestamp: string;
  messages: Message[];
  feedback?: string;
}

/**
 * Enhanced GPTyrant with conversation management and additional features
 */
export class GPTyrantEnhanced {
  private tyrant: GPTyrant;
  private config: EnhancedConfig;
  private history: ConversationEntry[] = [];
  private currentConversation: Message[] = [];
  private configPath: string;

  /**
   * Create a new enhanced GPTyrant instance
   * @param configPath - Path to the configuration file (optional)
   */
  constructor(configPath?: string) {
    this.configPath = configPath || DEFAULT_CONFIG_PATH;
    this.config = this.loadConfig();
    
    if (!this.config.apiKey) {
      // Try to get API key from environment variable
      const envKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
      if (envKey) {
        this.config.apiKey = envKey;
      } else {
        console.warn('Warning: No API key found. You will need to set an API key before making requests.');
      }
    }
    
    // Initialize the core GPTyrant
    this.tyrant = new GPTyrant(this.config.apiKey, {
      sassLevel: this.config.sassLevel,
      focusAreas: this.config.focusAreas,
      provider: this.config.provider,
      model: this.config.model,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens
    });
    
    // Load history if it exists
    this.loadHistory();
  }

  /**
   * Load configuration from file or create default if not exists
   * @returns The configuration object
   */
  private loadConfig(): EnhancedConfig {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        const loadedConfig = JSON.parse(data);
        return { ...DEFAULT_CONFIG, ...loadedConfig };
      }
    } catch (error) {
      console.warn(`Error loading config: ${error}`);
    }
    
    // Return default config if loading fails
    return { ...DEFAULT_CONFIG };
  }

  /**
   * Save current configuration to file
   */
  public saveConfig(): void {
    try {
      const dir = path.dirname(this.configPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error saving config: ${error}`);
    }
  }

  /**
   * Load conversation history from file
   */
  private loadHistory(): void {
    try {
      if (fs.existsSync(this.config.historyPath)) {
        const data = fs.readFileSync(this.config.historyPath, 'utf8');
        this.history = JSON.parse(data);
      }
    } catch (error) {
      console.warn(`Error loading history: ${error}`);
      this.history = [];
    }
  }

  /**
   * Save conversation history to file
   */
  private saveHistory(): void {
    try {
      const dir = path.dirname(this.config.historyPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.config.historyPath, JSON.stringify(this.history, null, 2), 'utf8');
    } catch (error) {
      console.error(`Error saving history: ${error}`);
    }
  }

  /**
   * Update the configuration
   * @param newConfig - New configuration options
   */
  public updateConfig(newConfig: Partial<EnhancedConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update the tyrant with relevant options
    this.tyrant.updateOptions({
      sassLevel: this.config.sassLevel,
      focusAreas: this.config.focusAreas,
      provider: this.config.provider,
      model: this.config.model,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens
    });
    
    if (newConfig.provider && newConfig.apiKey) {
      this.tyrant.setProvider(newConfig.provider, newConfig.apiKey, newConfig.model);
    }
    
    // Save the updated config
    this.saveConfig();
  }

  /**
   * Set the API key
   * @param apiKey - The API key to use
   * @param provider - The provider for this API key
   */
  public setApiKey(apiKey: string, provider?: ProviderType): void {
    this.config.apiKey = apiKey;
    if (provider) {
      this.config.provider = provider;
    }
    
    // Update the tyrant
    this.tyrant.setProvider(this.config.provider, apiKey, this.config.model);
    
    // Save the updated config
    this.saveConfig();
  }

  /**
   * Generate a response to the user's message
   * @param message - The user's message
   * @returns The assistant's response
   */
  public async generateResponse(message: string): Promise<string> {
    // Add user message to current conversation
    this.currentConversation.push({ role: 'user', content: message });
    
    // Generate response with conversation history
    const response = await this.tyrant.generateResponse(this.currentConversation);
    
    // Add assistant response to current conversation
    this.currentConversation.push({ role: 'assistant', content: response });
    
    // Trim conversation history if it's getting too long
    if (this.currentConversation.length > this.config.historySize * 2) {
      // Keep the system message if it exists, then trim
      const systemMessage = this.currentConversation.find(m => m.role === 'system');
      
      this.currentConversation = systemMessage 
        ? [systemMessage, ...this.currentConversation.slice(-this.config.historySize * 2 + 1)]
        : this.currentConversation.slice(-this.config.historySize * 2);
    }
    
    // Save history if auto-save is enabled
    if (this.config.autoSaveHistory) {
      this.saveCurrentConversation();
    }
    
    return response;
  }

  /**
   * Save the current conversation to history
   */
  public saveCurrentConversation(): void {
    if (this.currentConversation.length > 0) {
      this.history.push({
        timestamp: new Date().toISOString(),
        messages: [...this.currentConversation]
      });
      
      // Trim history if it's getting too long
      if (this.history.length > this.config.historySize) {
        this.history = this.history.slice(-this.config.historySize);
      }
      
      this.saveHistory();
    }
  }

  /**
   * Start a new conversation
   * @param systemPrompt - Optional custom system prompt
   */
  public newConversation(systemPrompt?: string): void {
    // Save current conversation if it exists
    this.saveCurrentConversation();
    
    // Reset conversation
    this.currentConversation = [];
    
    // Add system message if provided
    if (systemPrompt) {
      this.currentConversation.push({ role: 'system', content: systemPrompt });
    }
  }

  /**
   * Record feedback for the last conversation
   * @param feedback - User feedback
   */
  public addFeedback(feedback: string): void {
    if (this.history.length > 0) {
      this.history[this.history.length - 1].feedback = feedback;
      this.saveHistory();
    }
  }

  /**
   * Get conversation history
   * @returns Array of conversation entries
   */
  public getHistory(): ConversationEntry[] {
    return this.history;
  }

  /**
   * Get the current conversation
   * @returns Array of messages in the current conversation
   */
  public getCurrentConversation(): Message[] {
    return this.currentConversation;
  }
}

/**
 * Create a new enhanced GPTyrant instance
 * @param configPath - Optional path to a configuration file
 * @returns A new GPTyrantEnhanced instance
 */
export function createEnhancedTyrant(configPath?: string): GPTyrantEnhanced {
  return new GPTyrantEnhanced(configPath);
}