import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, Message, TyrantOptions } from '../types';

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const DEFAULT_MODEL = "claude-3-7-sonnet-20250219";

export class AnthropicProvider implements AIProvider {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = DEFAULT_MODEL) {
    this.client = new Anthropic({
      apiKey,
    });
    this.model = model;
  }

  public getSystemPrompt(options: TyrantOptions): Message {
    const { sassLevel, focusAreas } = options;

    // Adjust tone based on sass level
    let toneDescription = "";
    if (sassLevel <= 3) {
      toneDescription = "Be direct but somewhat gentle. Push the user while still being supportive.";
    } else if (sassLevel <= 7) {
      toneDescription = "Be blunt and sarcastic. Don't sugarcoat your responses, but don't be overly harsh.";
    } else {
      toneDescription = "Be extremely blunt, sarcastic, and harsh. Cut through all the BS without mercy.";
    }

    // Create focus areas portion of the prompt
    const focusAreasText = focusAreas.length > 0
      ? `Pay special attention to these areas: ${focusAreas.join(", ")}.`
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

  public async generateCompletion(messages: Message[], options: TyrantOptions): Promise<string> {
    try {
      const systemPrompt = this.getSystemPrompt(options);
      
      // Format messages for Anthropic's API
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Insert system prompt as system message
      const conversationWithSystem = [
        {
          role: 'system',
          content: systemPrompt.content
        },
        ...formattedMessages.filter(msg => msg.role !== 'system')
      ];
      
      // Calculate temperature based on sass level
      const temperature = options.temperature ?? (0.7 + (options.sassLevel * 0.03)); 

      const response = await this.client.messages.create({
        model: options.model || this.model,
        max_tokens: options.maxTokens || 600,
        temperature,
        messages: conversationWithSystem,
      });

      return response.content[0].text;
    } catch (error: any) {
      console.error("Anthropic API error:", error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}