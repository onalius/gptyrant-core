# GPTyrant

GPTyrant is a cross-provider AI library that creates a no-nonsense, tough love AI personality designed to push users past their excuses and toward their goals. 

[![npm version](https://img.shields.io/npm/v/gptyrant-core.svg)](https://www.npmjs.com/package/gptyrant-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 💪 **Tough Love AI**: Cuts through excuses and pushes users toward concrete action
- 🔌 **Multiple AI Providers**: Supports OpenAI, Anthropic, Grok, and Google Vertex AI
- 🎚️ **Adjustable Sass Level**: Control how harsh the AI responses are (from 1-10)
- 🎯 **Focus Areas**: Customize the AI to focus on specific areas like procrastination or goal-setting
- 🎭 **Personality Packs**: Choose from multiple coaching styles (Tyrant, Coach, Drill Sergeant, and more)
- 📱 **Cross-Platform**: Use in Node.js, browser, or any JavaScript environment
- 🚀 **Lightweight Options**: Choose between full package, minimal standalone file, or web version

## Installation

### NPM Package (Recommended)

```bash
npm install gptyrant-core
```

### Direct Import

For quick use without npm, you can download and include one of the standalone files:

- `gptyrant_minimal.ts` - Simplified version for TypeScript projects with OpenAI only
- `gptyrant_web.js` - Browser-compatible version for direct inclusion in web pages

## Quick Start

```javascript
import { GPTyrant } from 'gptyrant-core';

// Create a new GPTyrant instance with OpenAI (default provider)
const tyrant = new GPTyrant('your-openai-api-key', {
  sassLevel: 8,
  focusAreas: ['procrastination', 'excuses']
});

// Generate a response
const response = await tyrant.generateResponse('I keep putting off my project because I'm too busy');
console.log(response);
```

## Using Other AI Providers

### Anthropic (Claude)

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-anthropic-api-key', {
  provider: 'anthropic',
  model: 'claude-3-7-sonnet-20250219' // Optional, defaults to latest model
});

const response = await tyrant.generateResponse('I need help staying on track with my diet');
```

### Grok (by xAI)

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-xai-api-key', {
  provider: 'grok',
  model: 'grok-2-1212' // Optional, defaults to latest model
});

const response = await tyrant.generateResponse('I need to stop making excuses for not working out');
```

### Google Gemini

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-google-api-key', {
  provider: 'gemini',
  model: 'gemini-1.5-pro-001' // Optional, defaults to latest model
});

const response = await tyrant.generateResponse('I keep saying I'll start my business tomorrow');
```

## Browser Usage

Include the standalone web version in your HTML:

```html
<script src="gptyrant_web.js"></script>
<script>
  const tyrant = GPTyrant.create('your-openai-api-key', {
    sassLevel: 5,
    focusAreas: ['goal-setting', 'time-management']
  });
  
  async function getToughLove() {
    const userInput = document.getElementById('user-input').value;
    const response = await tyrant.generateResponse(userInput);
    document.getElementById('response').textContent = response;
  }
</script>
```

## Configuration Options

The GPTyrant constructor and `generateResponse` method accept these options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider` | string | `'openai'` | AI provider to use (`'openai'`, `'anthropic'`, `'grok'`, or `'gemini'`) |
| `model` | string | Provider-specific | The model to use (defaults to latest appropriate model) |
| `sassLevel` | number | `7` | How harsh/sassy the responses should be (1-10) |
| `focusAreas` | string[] | `['procrastination', 'excuses', 'goal-setting']` | Areas to focus on in responses |
| `temperature` | number | Dynamic | Response randomness (calculated based on sassLevel if not provided) |
| `maxTokens` | number | `600` | Maximum length of generated responses |
| `personalityId` | string | none | ID of the personality pack to use (e.g., 'tyrant', 'coach', 'drill-sergeant') |
| `personalityOptions` | object | {} | Additional options for personality application |

## Personality Packs

GPTyrant includes several personality packs that provide different coaching styles:

| Personality ID | Name | Description | Sass Multiplier |
|---------------|------|-------------|-----------------|
| `tyrant` | Tyrant | No-nonsense, tough love coach that pushes you beyond excuses | 1.0 |
| `coach` | Supportive Coach | Encouraging but firm coach that balances support with accountability | 0.7 |
| `drill-sergeant` | Drill Sergeant | Intense military-style instructor that demands excellence | 1.3 |
| `mentor` | Wise Mentor | Experienced guide who uses wisdom, stories, and occasional tough love | 0.8 |
| `inner-critic` | Inner Critic | Personification of your self-doubt that challenges you to prove it wrong | 1.1 |

### Using Personality Packs

```javascript
import { GPTyrant } from 'gptyrant-core';

// Create a GPTyrant instance with the Drill Sergeant personality
const drillSergeant = new GPTyrant('your-api-key', {
  personalityId: 'drill-sergeant',
  sassLevel: 7
});

// Generate a response with the drill sergeant personality
const response = await drillSergeant.generateResponse('I want to get in shape but I hate exercise');
console.log(response); // WHAT'S YOUR MAJOR MALFUNCTION, RECRUIT? DROP AND GIVE ME 20!
```

### Switching Personalities

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-api-key');

// Start with the default tyrant personality
let response = await tyrant.generateResponse('I keep procrastinating');

// Switch to the supportive coach personality
tyrant.setPersonality('coach');
response = await tyrant.generateResponse('I keep procrastinating');

// Switch to the mentor personality
tyrant.setPersonality('mentor');
response = await tyrant.generateResponse('I keep procrastinating');
```

### Creating Custom Personalities

```javascript
import { GPTyrant, PersonalityPack } from 'gptyrant-core';

// Define a custom personality
const friendlyGuide: PersonalityPack = {
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

Always end with a small, achievable suggestion and a word of encouragement.`,
  sassMultiplier: 0.5, // Half the sass level for gentler responses
};

// Register the custom personality
const tyrant = new GPTyrant('your-api-key');
tyrant.registerPersonality(friendlyGuide);

// Use the custom personality
tyrant.setPersonality('friendly-guide');
const response = await tyrant.generateResponse('I'm struggling with motivation');
```

### Helper Functions for Personalities

```javascript
import { 
  getAvailablePersonalities, 
  registerPersonality, 
  generatePersonalityResponse 
} from 'gptyrant-core';

// Get all available personalities
const personalities = getAvailablePersonalities();
console.log(personalities.map(p => p.name)); // ["Tyrant", "Supportive Coach", ...]

// Register a custom personality globally
registerPersonality({
  id: 'custom-personality',
  name: 'Custom Personality',
  // ... other properties
});

// Generate a one-off response with a specific personality
const response = await generatePersonalityResponse(
  'I keep procrastinating',
  'drill-sergeant', // Personality ID
  'your-api-key'
);
```

## Advanced Usage

### Conversation History

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-api-key');

// Create a conversation with message history
const messages = [
  { role: 'user', content: 'I want to start a business but I'm afraid to fail' },
  { role: 'assistant', content: 'Everyone's afraid to fail. The difference between successful people and everyone else is that successful people take action despite their fear...' },
  { role: 'user', content: 'But what if I lose all my money?' }
];

// Continue the conversation
const response = await tyrant.generateResponse(messages);
```

### Changing Providers Mid-Session

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-openai-api-key');

// Later, switch to Anthropic
tyrant.setProvider('anthropic', 'your-anthropic-api-key');

// Now uses Anthropic for responses
const response = await tyrant.generateResponse('Help me stay motivated');
```

### One-off Function Usage

For simple one-time use without creating an instance:

```javascript
import { generateToughLoveResponse } from 'gptyrant-core';

// Quick one-time usage
const response = await generateToughLoveResponse(
  'I keep procrastinating on my project',
  'your-api-key',
  { provider: 'openai', sassLevel: 9 }
);
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.