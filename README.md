# GPTyrant

GPTyrant is a cross-provider AI library that creates a no-nonsense, tough love AI personality designed to push users past their excuses and toward their goals. 

[![npm version](https://img.shields.io/npm/v/gptyrant-core.svg)](https://www.npmjs.com/package/gptyrant-core)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 💪 **Tough Love AI**: Cuts through excuses and pushes users toward concrete action
- 🔌 **Multiple AI Providers**: Supports OpenAI, Anthropic, Grok, and Google Vertex AI
- 🎚️ **Adjustable Sass Level**: Control how harsh the AI responses are (from 1-10)
- 🎯 **Focus Areas**: Customize the AI to focus on specific areas like procrastination or goal-setting
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

### Google Vertex AI

```javascript
import { GPTyrant } from 'gptyrant-core';

const tyrant = new GPTyrant('your-google-vertex-api-key', {
  provider: 'vertex',
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
| `provider` | string | `'openai'` | AI provider to use (`'openai'`, `'anthropic'`, `'grok'`, or `'vertex'`) |
| `model` | string | Provider-specific | The model to use (defaults to latest appropriate model) |
| `sassLevel` | number | `7` | How harsh/sassy the responses should be (1-10) |
| `focusAreas` | string[] | `['procrastination', 'excuses', 'goal-setting']` | Areas to focus on in responses |
| `temperature` | number | Dynamic | Response randomness (calculated based on sassLevel if not provided) |
| `maxTokens` | number | `600` | Maximum length of generated responses |

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