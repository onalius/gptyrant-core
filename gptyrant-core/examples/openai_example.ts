/**
 * GPTyrant OpenAI Example
 * 
 * This example demonstrates basic usage of GPTyrant with OpenAI's API.
 * 
 * To run this example:
 * 1. Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
 * 2. Run with: ts-node openai_example.ts
 */

import { GPTyrant } from '../src/index';

// Replace with your actual API key
const API_KEY = 'YOUR_OPENAI_API_KEY';

async function runExample() {
  console.log('GPTyrant OpenAI Example');
  console.log('------------------------\n');

  // Create a GPTyrant instance
  const tyrant = new GPTyrant(API_KEY, {
    sassLevel: 8,
    focusAreas: ['procrastination', 'excuses'],
    model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
  });

  // Example 1: Basic response
  console.log('Example 1: Basic response to procrastination');
  try {
    const response1 = await tyrant.generateResponse([
      { role: 'user', content: 'I keep putting off my important project because I'm too busy with other things.' }
    ]);
    console.log(`Response: ${response1}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 2: Conversation with follow-up
  console.log('Example 2: Conversation with follow-up');
  try {
    const conversation = [
      { role: 'user', content: 'I want to start working out, but I never seem to find the time.' },
      { role: 'assistant', content: 'Stop with the "never find the time" nonsense. You have 24 hours in a day just like everyone else. The difference is that successful people MAKE time for what matters. What are you doing with the 30 minutes you waste scrolling social media? Or the hour you spend watching Netflix? Time is a choice. What are you going to choose to do with yours today?' },
      { role: 'user', content: 'But I'm really tired after work...' }
    ];
    
    const response2 = await tyrant.generateResponse(conversation);
    console.log(`Response: ${response2}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 3: Different sass levels
  console.log('Example 3: Different sass levels');
  
  // Try with low sass level (gentle)
  const tyrantGentle = new GPTyrant(API_KEY, { sassLevel: 2 });
  try {
    const gentleResponse = await tyrantGentle.generateResponse([
      { role: 'user', content: 'I said I would start my business this year but haven't done anything yet.' }
    ]);
    console.log(`Gentle (Level 2): ${gentleResponse}\n`);
  } catch (error) {
    console.error('Error generating gentle response:', error);
  }
  
  // Try with high sass level (harsh)
  const tyrantHarsh = new GPTyrant(API_KEY, { sassLevel: 10 });
  try {
    const harshResponse = await tyrantHarsh.generateResponse([
      { role: 'user', content: 'I said I would start my business this year but haven't done anything yet.' }
    ]);
    console.log(`Harsh (Level 10): ${harshResponse}\n`);
  } catch (error) {
    console.error('Error generating harsh response:', error);
  }
  
  console.log('Examples completed!');
}

// Run the example
runExample().catch(console.error);