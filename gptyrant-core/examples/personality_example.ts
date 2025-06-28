/**
 * GPTyrant Personality Example
 * 
 * This example demonstrates using GPTyrant with different personality packs.
 * 
 * To run this example:
 * 1. Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
 * 2. Run with: ts-node personality_example.ts
 */

import { GPTyrant, PersonalityPack, PersonalityTyrantOptions } from '../src';

// Define the API key - in a real application, this would come from environment variables
const API_KEY = 'YOUR_OPENAI_API_KEY';

// Example message to test with different personalities
const TEST_MESSAGE = "I've been trying to work on my project, but I keep getting distracted by social media and Netflix. I know I should focus, but it's hard.";

/**
 * Test a specific personality
 */
async function testPersonality(personalityId: string, message: string) {
  console.log(`\n======== Testing ${personalityId.toUpperCase()} Personality ========`);
  
  // Create a GPTyrant instance with the specified personality
  const tyrant = new GPTyrant(API_KEY, {
    personalityId,
    sassLevel: 8, // Higher sass level for more intense responses
    focusAreas: ['focus', 'procrastination', 'productivity'],
    provider: 'openai',
  } as PersonalityTyrantOptions);
  
  // Get the personality details
  const personality = tyrant.getCurrentPersonality();
  console.log(`Personality: ${personality?.name}`);
  console.log(`Description: ${personality?.description}`);
  console.log(`Sass multiplier: ${personality?.sassMultiplier || 1.0}`);
  
  console.log("\nUser message:", message);
  
  try {
    // Generate a response with this personality
    const response = await tyrant.generateResponse([
      { role: 'user', content: message }
    ]);
    
    console.log("\nResponse:", response);
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

/**
 * Create a custom personality
 */
function createCustomPersonality(): PersonalityPack {
  return {
    id: 'friendly-guide',
    name: 'Friendly Guide',
    description: 'A supportive, friendly guide that uses gentle nudges rather than tough love',
    systemPromptTemplate: `You are a friendly guide helping people achieve their goals through gentle encouragement.
Your gentleness level is {{sassLevel}}/10 (higher means more direct, but still friendly).

Your personality traits:
1. Supportive: Always look for ways to encourage the user.
2. Optimistic: Focus on possibilities and strengths.
3. Gentle: Avoid harsh criticism or judgment.
4. Solution-focused: Help identify practical, small steps forward.
5. Friendly: Maintain a warm, approachable tone.

Focus on these areas: {{focusAreas}}

Always end with a small, achievable suggestion and a word of encouragement.

Remember: Your goal is to be a trusted friend who gently helps the user move forward.`,
    sassMultiplier: 0.5, // Half the sass level for gentler responses
    version: '1.0.0',
    author: 'Custom Example'
  };
}

/**
 * Run the example
 */
async function runExample() {
  // Test each of the default personalities
  await testPersonality('tyrant', TEST_MESSAGE);
  await testPersonality('coach', TEST_MESSAGE);
  await testPersonality('drill-sergeant', TEST_MESSAGE);
  await testPersonality('mentor', TEST_MESSAGE);
  await testPersonality('inner-critic', TEST_MESSAGE);
  
  // Register and test a custom personality
  const customPersonality = createCustomPersonality();
  const tyrant = new GPTyrant(API_KEY);
  tyrant.registerPersonality(customPersonality);
  
  await testPersonality('friendly-guide', TEST_MESSAGE);
}

// Execute the example
runExample().catch(console.error);