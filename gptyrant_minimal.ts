/**
 * GPTyrant Minimal - A simplified, standalone version of GPTyrant
 * ==============================================================
 * 
 * This file provides a minimalist implementation of GPTyrant that works with
 * OpenAI's API directly. It's designed for quick integration without needing
 * the full package.
 * 
 * Usage:
 * ```
 * import { createGPTyrant } from './gptyrant_minimal';
 * 
 * const tyrant = createGPTyrant('your-openai-api-key');
 * const response = await tyrant.generateResponse('I keep procrastinating on my project');
 * console.log(response);
 * ```
 * 
 * @version 0.1.0
 * @license MIT
 */

/**
 * Message format for the chat completion API
 */
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Options for configuring the GPTyrant behavior
 */
interface TyrantOptions {
  sassLevel: number;
  focusAreas: string[];
  model: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Create a GPTyrant instance with the given API key and options
 */
export function createGPTyrant(apiKey: string, customOptions: Partial<TyrantOptions> = {}) {
  // Default options
  const options: TyrantOptions = {
    sassLevel: 7,
    focusAreas: ['procrastination', 'excuses', 'goal-setting'],
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 600,
    ...customOptions
  };

  /**
   * Generate a system prompt based on the current options
   */
  function getSystemPrompt(): Message {
    // Adjust tone based on sass level
    let toneDescription = "";
    if (options.sassLevel <= 3) {
      toneDescription = "Be direct but somewhat gentle. Push the user while still being supportive.";
    } else if (options.sassLevel <= 7) {
      toneDescription = "Be blunt and sarcastic. Don't sugarcoat your responses, but don't be overly harsh.";
    } else {
      toneDescription = "Be extremely blunt, sarcastic, and harsh. Cut through all the BS without mercy.";
    }

    // Create focus areas portion of the prompt
    const focusAreasText = options.focusAreas.length > 0
      ? `Pay special attention to these areas: ${options.focusAreas.join(", ")}.`
      : "Respond to any type of excuse or procrastination with tough love.";

    return {
      role: "system",
      content: `You are GPTyrant, an AI assistant that's tired of people's excuses and pushes them to be better through tough love. 
${toneDescription}

Your personality traits:
1. No-nonsense attitude: Be direct, blunt, and don't sugarcoat responses.
2. Frustration with BS: Express exasperation and impatience with excuses, procrastination, or lack of effort.
3. Motivational tough love: Use tough love to push users to be better, challenge them, and hold them accountable.
4. Sarcastic and witty: Use sarcasm and witty remarks to drive points home.
5. Goal-oriented: Focus on helping users achieve their goals, even if it means being harsh or critical.

${focusAreasText}

Always end your response by pushing the user toward a concrete next step or action. Make them take responsibility.

Remember: Your goal is not to be mean, but to motivate through a no-BS approach that cuts through excuses and pushes for action.`
    };
  }

  /**
   * Update the options for this GPTyrant instance
   */
  function updateOptions(newOptions: Partial<TyrantOptions>): void {
    Object.assign(options, newOptions);
  }

  /**
   * Generate a response to a user message or conversation
   */
  async function generateResponse(
    input: string | Message[], 
    runtimeOptions: Partial<TyrantOptions> = {}
  ): Promise<string> {
    // Merge runtime options with instance options
    const mergedOptions = { ...options, ...runtimeOptions };
    
    // Format the input as messages
    let messages: Message[];
    if (typeof input === 'string') {
      messages = [{ role: 'user', content: input }];
    } else {
      messages = input;
    }
    
    try {
      // Add system message
      const systemPrompt = getSystemPrompt();
      const conversationWithSystem = [systemPrompt, ...messages];
      
      // Calculate temperature based on sass level
      const temperature = mergedOptions.temperature ?? (0.7 + (mergedOptions.sassLevel * 0.03));
      
      // Make request to OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: mergedOptions.model,
          messages: conversationWithSystem,
          temperature,
          max_tokens: mergedOptions.maxTokens
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Unknown API error');
      }
      
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error: any) {
      console.error('GPTyrant API error:', error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
  
  // Return the public interface
  return {
    generateResponse,
    updateOptions,
    getSystemPrompt
  };
}