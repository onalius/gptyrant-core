/**
 * GPTyrant Minimal Example
 * 
 * This example demonstrates basic usage of the minimal version of GPTyrant.
 * 
 * To run this example:
 * 1. Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
 * 2. Run with: ts-node minimal_example.ts
 */

import { createGPTyrant } from '../gptyrant_minimal';

// Replace with your actual API key
const API_KEY = 'YOUR_OPENAI_API_KEY';

async function runMinimalExample() {
  console.log('GPTyrant Minimal Example');
  console.log('------------------------\n');

  // Create a GPTyrant instance using the minimal version
  const tyrant = createGPTyrant(API_KEY, {
    sassLevel: 8,
    focusAreas: ['productivity', 'excuses'],
    model: 'gpt-4o' // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
  });

  // Example 1: Simple message
  console.log('Example 1: Simple message');
  try {
    const response1 = await tyrant.generateResponse('I want to write a book but I never seem to find the time.');
    console.log(`Response: ${response1}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 2: Using message array
  console.log('Example 2: Using message array');
  try {
    const messages = [
      { role: 'user', content: 'I keep saying I'll start eating healthy tomorrow.' }
    ];
    
    const response2 = await tyrant.generateResponse(messages);
    console.log(`Response: ${response2}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 3: Update options
  console.log('Example 3: Update options');
  try {
    // Update options to lower sass level
    tyrant.updateOptions({ sassLevel: 3 });
    
    const gentleResponse = await tyrant.generateResponse('I feel like giving up on my fitness goals.');
    console.log(`Gentle Response: ${gentleResponse}\n`);
    
    // Update options again for sassier response
    tyrant.updateOptions({ sassLevel: 9 });
    
    const sassyResponse = await tyrant.generateResponse('I feel like giving up on my fitness goals.');
    console.log(`Sassy Response: ${sassyResponse}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }
  
  console.log('Examples completed!');
}

// Run the example
runMinimalExample().catch(console.error);