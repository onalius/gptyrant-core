/**
 * GPTyrant - Demo Script
 * =====================
 * 
 * This script demonstrates basic usage of GPTyrant.
 * It provides examples of using the library with different configurations.
 * 
 * To run this demo:
 * 1. Ensure you have Node.js installed
 * 2. Set your OpenAI API key as an environment variable: OPENAI_API_KEY
 * 3. Run: `npx tsx main.ts`
 * 
 * @version 0.1.0
 * @license MIT
 */

import { createTyrant, generateToughLoveResponse } from './gptyrant';

// Retrieve API keys from environment variables
const api_keys = {
  openai: process.env.OPENAI_API_KEY || "",
  anthropic: process.env.ANTHROPIC_API_KEY || "",
  grok: process.env.XAI_API_KEY || "",
  gemini: process.env.GOOGLE_API_KEY || ""
};

// Check if we have at least one API key available
if (!api_keys.openai && !api_keys.anthropic && !api_keys.grok && !api_keys.gemini) {
  console.error(`
Error: No API keys found. Please set at least one of the following environment variables:
  - OPENAI_API_KEY (for OpenAI models)
  - ANTHROPIC_API_KEY (for Claude models)
  - XAI_API_KEY (for Grok models)
  - GOOGLE_API_KEY (for Google Gemini models)
  
For this demo, we'll be using OpenAI as the default provider.
`);
  process.exit(1);
}

// Select the first available API key and provider for the demo
const selectedProvider = api_keys.openai ? 'openai' : 
                        api_keys.anthropic ? 'anthropic' : 
                        api_keys.grok ? 'grok' : 'gemini';

const API_KEY = api_keys[selectedProvider];

console.log(`Using provider: ${selectedProvider}`);

async function runDemo() {
  console.log('GPTyrant Demo\n============\n');

  // Example 1: Basic response using the simple function
  console.log('Example 1: Basic response');
  try {
    const response = await generateToughLoveResponse(
      API_KEY,
      "I keep putting off my important projects because I'm too busy"
    );
    console.log(`Response: ${response}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 2: Creating a GPTyrant instance
  console.log('Example 2: Custom GPTyrant with low sass level');
  try {
    // Create a gentle version with lower sass level
    const gentleTyrant = createTyrant(API_KEY, { 
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
    const harshTyrant = createTyrant(API_KEY, { 
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

  console.log('Demo completed!');
}

// Run the demo
runDemo().catch(console.error);