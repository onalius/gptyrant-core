import OpenAI from "openai";
import { ChatMessage } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const DEFAULT_MODEL = "gpt-4o";

interface NoBSPromptOptions {
  sassLevel: number;
  focusAreas: string[];
}

export function createNoBS(apiKey: string) {
  const openai = new OpenAI({ apiKey });

  function getSystemPrompt(options: NoBSPromptOptions): ChatMessage {
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
      content: `You are NoBS_GPT, an AI assistant that's tired of people's excuses and pushes them to be better through tough love. 
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

  async function generateCompletion(messages: ChatMessage[], options: NoBSPromptOptions): Promise<string> {
    try {
      const systemPrompt = getSystemPrompt(options);
      const conversationWithSystem = [systemPrompt, ...messages];

      const response = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: conversationWithSystem.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        temperature: 0.7 + (options.sassLevel * 0.03), // Higher temperature for sassier responses
        max_tokens: 600
      });

      return response.choices[0].message.content || "I'm tired of your excuses, but I'm also tired right now. Try again later.";
    } catch (error: any) {
      console.error("OpenAI API error:", error);
      throw new Error(`Failed to generate response: ${error.message}`);
    }
  }

  return {
    generateCompletion
  };
}
