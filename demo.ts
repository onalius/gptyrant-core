/**
 * GPTyrant Demo Script (Mock Version)
 * ==========================
 * 
 * This script demonstrates the structure and functionality of GPTyrant
 * without requiring actual API keys. It uses mock responses for demonstration.
 * 
 * To run this demo:
 * 1. Ensure you have Node.js installed
 * 2. Run: `npx tsx demo.ts`
 * 
 * @version 0.1.0
 * @license MIT
 */

// ==============================
// MOCK IMPLEMENTATION
// ==============================

// This is a simplified version of our real types
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface TyrantOptions {
  sassLevel: number;
  focusAreas: string[];
  provider?: 'openai' | 'anthropic' | 'grok' | 'gemini';
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

// Mock system prompt generation based on sass level
function getSystemPrompt(options: TyrantOptions): string {
  const { sassLevel, focusAreas } = options;
  
  const focusAreasText = focusAreas.length > 0 
    ? `Focus especially on these areas: ${focusAreas.join(', ')}.` 
    : '';
  
  let personalityDescription = '';
  
  if (sassLevel <= 3) {
    personalityDescription = "You're a supportive but honest coach who gently pushes people toward their goals.";
  } else if (sassLevel <= 7) {
    personalityDescription = "You're a no-nonsense coach who cuts through excuses and pushes people to take action.";
  } else {
    personalityDescription = "You're a brutally honest, tough-love coach who doesn't tolerate ANY excuses and forces people to confront hard truths.";
  }
  
  return `${personalityDescription} ${focusAreasText} 
Be direct and concise. Don't be afraid to call out self-deception or excuses.
Your goal is to motivate action, not to make the user feel good.`;
}

// Mock response generation
function generateMockResponse(message: string, options: TyrantOptions): string {
  const { sassLevel, focusAreas } = options;
  
  // Map of excuse patterns to responses at different sass levels
  const responseMap: Record<string, string[]> = {
    "too busy": [
      "I understand being busy can make things challenging. Perhaps try identifying small pockets of time in your day?",
      "Being 'too busy' is often about priorities, not time. What could you de-prioritize to make room for this?",
      "EVERYONE is 'too busy.' That's the oldest excuse in the book. Successful people don't find time, they MAKE time. What are you wasting time on instead?"
    ],
    "too tired": [
      "Feeling tired is valid. Could you look at your energy patterns and find when you might have more capacity?",
      "Being tired is often a symptom, not the problem. How's your sleep hygiene? Are you properly fueling your body?",
      "Tired is a state of mind. Your ancestors built civilizations while exhausted. Being 'too tired' is just your brain's way of keeping you comfortable and mediocre."
    ],
    "never achieve": [
      "It's normal to feel discouraged sometimes. What small step could build your confidence?",
      "Thinking you'll 'never achieve' something is a prediction, not a fact. What evidence is this based on?",
      "That defeatist attitude is exactly why you're stuck. People who achieve things BELIEVE they will BEFORE they have evidence. Stop the pity party and start acting like success is inevitable."
    ],
    "haven't worked out": [
      "Getting back to exercise can be challenging. What's one small workout you could do today?",
      "The longer you wait, the harder it gets. What's stopping you from doing even 5 minutes right now?",
      "Your body is literally deteriorating while you make excuses. No one in history has ever regretted a workout after doing it. Stop talking, start moving."
    ]
  };
  
  // Default responses if no specific pattern is matched
  const defaultResponses = [
    "I appreciate you sharing that. What's one small step you could take today?",
    "That's an explanation, but be careful it doesn't become an excuse. What action can you take despite this challenge?",
    "Stop with the excuses. Either you want this or you don't. Your actions tell the truth your words try to hide."
  ];
  
  // Find matching pattern in the message
  let responseOptions = defaultResponses;
  for (const [pattern, responses] of Object.entries(responseMap)) {
    if (message.toLowerCase().includes(pattern)) {
      responseOptions = responses;
      break;
    }
  }
  
  // Determine sass level index (0=gentle, 1=moderate, 2=harsh)
  const sassIndex = sassLevel <= 3 ? 0 : sassLevel <= 7 ? 1 : 2;
  
  // Return appropriate response
  return responseOptions[sassIndex];
}

// Mock GPTyrant class
class MockGPTyrant {
  private options: TyrantOptions;
  
  constructor(apiKey: string, options: Partial<TyrantOptions> = {}) {
    // API key would be used for real implementation
    console.log('(Mock) Initialized with API key:', apiKey.substring(0, 3) + '...');
    
    this.options = {
      sassLevel: options.sassLevel ?? 7,
      focusAreas: options.focusAreas ?? ['procrastination', 'excuses'],
      provider: options.provider ?? 'openai',
      model: options.model ?? 'gpt-4o',
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 500
    };
  }
  
  public getSystemPrompt(): Message {
    return {
      role: 'system',
      content: getSystemPrompt(this.options)
    };
  }
  
  public async generateResponse(input: string | Message[]): Promise<string> {
    console.log('(Mock) Generating response...');
    
    // Handle string input
    if (typeof input === 'string') {
      return generateMockResponse(input, this.options);
    }
    
    // Handle conversation array
    const lastUserMessage = [...input].reverse().find(msg => msg.role === 'user');
    if (lastUserMessage) {
      return generateMockResponse(lastUserMessage.content, this.options);
    }
    
    return "I need a question or statement to respond to.";
  }
  
  public updateOptions(newOptions: Partial<TyrantOptions>): void {
    this.options = { ...this.options, ...newOptions };
    console.log('(Mock) Options updated:', this.options);
  }
  
  public setProvider(provider: string, apiKey: string, model?: string): void {
    this.options.provider = provider as any;
    if (model) this.options.model = model;
    console.log(`(Mock) Provider changed to ${provider} with key ${apiKey.substring(0, 3)}...`);
  }
}

// ==============================
// MOCK API FUNCTIONS
// ==============================

function createTyrant(apiKey: string, options: Partial<TyrantOptions> = {}): MockGPTyrant {
  return new MockGPTyrant(apiKey, options);
}

async function generateToughLoveResponse(
  apiKey: string,
  message: string,
  options: Partial<TyrantOptions> = {}
): Promise<string> {
  const tyrant = createTyrant(apiKey, options);
  return await tyrant.generateResponse(message);
}

// ==============================
// DEMO SCRIPT
// ==============================

async function runDemo() {
  console.log('GPTyrant Demo (MOCK VERSION)\n==========================\n');
  console.log('Note: This demo uses mock responses to demonstrate functionality.\n');
  
  // For demo purposes, use a fake API key
  const FAKE_API_KEY = "sk_demo_1234567890";
  
  // Example 1: Basic response using the simple function
  console.log('Example 1: Basic response');
  try {
    const response = await generateToughLoveResponse(
      FAKE_API_KEY,
      "I keep putting off my important projects because I'm too busy"
    );
    console.log(`Response: ${response}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 2: Creating a GPTyrant instance with low sass level
  console.log('Example 2: Custom GPTyrant with low sass level');
  try {
    // Create a gentle version with lower sass level
    const gentleTyrant = createTyrant(FAKE_API_KEY, { 
      sassLevel: 3,
      focusAreas: ['motivation', 'planning']
    });

    const gentleResponse = await gentleTyrant.generateResponse([
      { role: 'user', content: "I feel like I'll never achieve my goals" }
    ]);
    console.log(`Gentle Response: ${gentleResponse}\n`);
  } catch (error) {
    console.error('Error generating gentle response:', error);
  }

  // Example 3: Creating a GPTyrant instance with high sass level
  console.log('Example 3: Custom GPTyrant with high sass level');
  try {
    // Create a harsh version with higher sass level
    const harshTyrant = createTyrant(FAKE_API_KEY, { 
      sassLevel: 10,
      focusAreas: ['discipline', 'accountability']
    });

    const harshResponse = await harshTyrant.generateResponse([
      { role: 'user', content: "I haven't worked out in weeks because I'm too tired" }
    ]);
    console.log(`Harsh Response: ${harshResponse}\n`);
  } catch (error) {
    console.error('Error generating harsh response:', error);
  }

  // Example 4: Changing providers mid-session
  console.log('Example 4: Changing providers');
  try {
    const tyrant = createTyrant(FAKE_API_KEY);
    let response = await tyrant.generateResponse("I'm too tired to work on my project");
    console.log(`OpenAI Response: ${response}`);
    
    // Change to Anthropic
    tyrant.setProvider('anthropic', 'anthrop_demo_key');
    tyrant.updateOptions({ sassLevel: 9 });
    
    response = await tyrant.generateResponse("I'm too tired to work on my project");
    console.log(`Anthropic Response: ${response}\n`);
  } catch (error) {
    console.error('Error demonstrating provider change:', error);
  }

  console.log('Demo completed!');
  console.log('\nTo use the real implementation with actual API calls:');
  console.log('1. Set your API key as an environment variable (OPENAI_API_KEY, etc.)');
  console.log('2. Run `npx tsx main.ts` instead of this demo script');
}

// Run the demo
runDemo().catch(console.error);