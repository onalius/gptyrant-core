import OpenAI from "openai";
import { AIProvider, Message, TyrantOptions } from "../types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const DEFAULT_MODEL = "gpt-4o";

export class OpenAIProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = DEFAULT_MODEL, organization?: string) {
    this.client = new OpenAI({ 
      apiKey, 
      organization 
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
      const conversationWithSystem = [systemPrompt, ...messages];
      
      // Calculate temperature based on sass level (higher sass = higher temperature for more creative responses)
      const temperature = options.temperature ?? (0.7 + (options.sassLevel * 0.03)); 

      const response = await this.client.chat.completions.create({
        model: options.model || this.model,
        messages: conversationWithSystem,
        temperature,
        max_tokens: options.maxTokens || 600
      });

      return response.choices[0].message.content || "I'm tired of your excuses, but I'm also tired right now. Try again later.";
    } catch (error: any) {
      console.error("OpenAI API error:", error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }
}