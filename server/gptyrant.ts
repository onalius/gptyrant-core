import { ChatMessage } from '@shared/schema';
import { GPTyrant, TyrantOptions, Message as GPTMessage } from '../gptyrant-core/src';

// Map between server settings type and gptyrant options type
interface GPTyrantSettings {
  apiKey: string;
  model: string;
  sassLevel: number;
  focusAreas: string[];
  provider?: 'openai' | 'anthropic' | 'grok' | 'vertex';
}

export function createGPTyrant(settings: GPTyrantSettings) {
  const { apiKey, model, sassLevel, focusAreas, provider = 'openai' } = settings;
  
  // Create GPTyrant instance with the provided settings
  const tyrant = new GPTyrant(apiKey, {
    model,
    sassLevel,
    focusAreas,
    provider
  });
  
  // Convert server message format to GPTyrant message format
  function convertMessages(messages: ChatMessage[]): GPTMessage[] {
    return messages.map(msg => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content
    }));
  }
  
  // Generate a response using the GPTyrant instance
  async function generateResponse(messages: ChatMessage[]): Promise<string> {
    try {
      const gptMessages = convertMessages(messages);
      return await tyrant.generateResponse(gptMessages);
    } catch (error: any) {
      console.error("GPTyrant error:", error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
  
  // Update GPTyrant settings
  function updateSettings(newSettings: Partial<GPTyrantSettings>): void {
    const options: Partial<TyrantOptions> = {};
    
    if (newSettings.model) options.model = newSettings.model;
    if (typeof newSettings.sassLevel === 'number') options.sassLevel = newSettings.sassLevel;
    if (newSettings.focusAreas) options.focusAreas = newSettings.focusAreas;
    
    tyrant.updateOptions(options);
    
    // If provider changed, need to create a new instance
    if (newSettings.provider && newSettings.provider !== provider && newSettings.apiKey) {
      tyrant.setProvider(newSettings.provider, newSettings.apiKey, newSettings.model);
    }
  }
  
  return {
    generateResponse,
    updateSettings
  };
}