/**
 * GPTyrant Anthropic Example
 * 
 * This example demonstrates using GPTyrant with Anthropic's Claude API.
 * 
 * To run this example:
 * 1. Replace 'YOUR_ANTHROPIC_API_KEY' with your actual Anthropic API key
 * 2. Run with: ts-node anthropic_example.ts
 */

import { GPTyrant } from '../src/index';

// Replace with your actual API key
const API_KEY = 'YOUR_ANTHROPIC_API_KEY';

async function runExample() {
  console.log('GPTyrant Anthropic (Claude) Example');
  console.log('----------------------------------\n');

  // Create a GPTyrant instance with Anthropic as the provider
  const tyrant = new GPTyrant(API_KEY, {
    provider: 'anthropic',
    sassLevel: 7,
    focusAreas: ['goal-setting', 'accountability'],
    // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
    model: 'claude-3-7-sonnet-20250219'
  });

  // Example 1: Basic response
  console.log('Example 1: Basic response to goal excuses');
  try {
    const response1 = await tyrant.generateResponse([
      { role: 'user', content: 'I set these big goals for myself but never seem to achieve them.' }
    ]);
    console.log(`Response: ${response1}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 2: Get more specific advice
  console.log('Example 2: Get more specific accountability advice');
  try {
    const conversation = [
      { role: 'user', content: 'I need to lose weight but my diet keeps failing.' },
      { role: 'assistant', content: 'Everyone "needs" to lose weight, but few people actually do it. The difference? Consistency and accountability. Your diet isn\'t "failing" - YOU are failing your diet. What specific actions are you taking daily? Do you track your calories? Have you scheduled your meals? Do you have a workout plan? Stop being vague about "failing" and get specific about what exactly you\'re doing wrong.' },
      { role: 'user', content: 'I guess I don\'t really track what I eat consistently...' }
    ];
    
    const response2 = await tyrant.generateResponse(conversation);
    console.log(`Response: ${response2}\n`);
  } catch (error) {
    console.error('Error generating response:', error);
  }

  // Example 3: Compare with different focus areas
  console.log('Example 3: Different focus areas');
  
  // Try with productivity focus
  const tyrantProductivity = new GPTyrant(API_KEY, { 
    provider: 'anthropic', 
    focusAreas: ['productivity', 'time-management'] 
  });
  
  try {
    const productivityResponse = await tyrantProductivity.generateResponse([
      { role: 'user', content: 'I feel overwhelmed with all the tasks I need to complete.' }
    ]);
    console.log(`Productivity Focus: ${productivityResponse}\n`);
  } catch (error) {
    console.error('Error generating productivity response:', error);
  }
  
  // Try with mindset focus
  const tyrantMindset = new GPTyrant(API_KEY, { 
    provider: 'anthropic', 
    focusAreas: ['mindset', 'limiting-beliefs'] 
  });
  
  try {
    const mindsetResponse = await tyrantMindset.generateResponse([
      { role: 'user', content: 'I feel overwhelmed with all the tasks I need to complete.' }
    ]);
    console.log(`Mindset Focus: ${mindsetResponse}\n`);
  } catch (error) {
    console.error('Error generating mindset response:', error);
  }
  
  console.log('Examples completed!');
}

// Run the example
runExample().catch(console.error);