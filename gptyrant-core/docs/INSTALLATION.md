# Installation Guide for GPTyrant

This guide covers various ways to install and integrate GPTyrant into your projects.

## Table of Contents

- [NPM Installation (Node.js/TypeScript)](#npm-installation-nodejs-typescript)
- [Browser Installation](#browser-installation)
- [Manual Installation](#manual-installation)
- [API Key Requirements](#api-key-requirements)

## NPM Installation (Node.js/TypeScript)

### Prerequisites

- Node.js 16 or higher
- npm or yarn

### Installation Steps

1. Add GPTyrant to your project:

```bash
# Using npm
npm install gptyrant-core

# Using yarn
yarn add gptyrant-core
```

2. Import and use GPTyrant in your code:

```typescript
// Using ES Modules
import { GPTyrant } from 'gptyrant-core';

// Using CommonJS
const { GPTyrant } = require('gptyrant-core');
```

## Browser Installation

### Direct Script Tag

1. Download the `gptyrant_web.js` file from this repository or include it via CDN (example CDN link would be here if published)

2. Include it in your HTML:

```html
<script src="gptyrant_web.js"></script>
<!-- Or via CDN -->
<script src="https://cdn.example.com/gptyrant_web.js"></script>
```

3. Use GPTyrant in your JavaScript code:

```html
<script>
  const tyrant = GPTyrant.create('your-api-key');
  
  // Use tyrant methods
  tyrant.generateResponse('Help me stay motivated')
    .then(response => {
      console.log(response);
    });
</script>
```

### As an ES Module in Modern Browsers

```html
<script type="module">
  import { GPTyrant } from './path/to/gptyrant-core/index.js';
  
  const tyrant = new GPTyrant('your-api-key');
  // Use tyrant...
</script>
```

## Manual Installation

For projects without a package manager:

1. Download or clone this repository
2. Copy one of the following files to your project:
   - Full package: Copy the entire `src` directory
   - Minimal version: Copy just `gptyrant_minimal.ts` (for TypeScript projects)
   - Web version: Copy just `gptyrant_web.js` (for browser projects)
3. Import or include the file according to your project setup

## API Key Requirements

GPTyrant supports multiple AI providers, each requiring its own API key:

### OpenAI (Default Provider)

- Sign up at [OpenAI Platform](https://platform.openai.com/)
- Create an API key in your account dashboard
- Required for using models like GPT-4, GPT-4o, etc.

### Anthropic

- Sign up at [Anthropic](https://www.anthropic.com/)
- Get access to the Claude API
- Required for using Claude models

### Grok (xAI)

- Sign up for Grok API access at [X.AI](https://www.x.ai/)
- Get your API key from the developer portal
- Required for using Grok models

### Google Vertex AI

- Create a Google Cloud account
- Enable the Vertex AI API
- Set up authentication credentials
- Required for using Gemini models

For detailed instructions on obtaining and using these API keys, please consult each provider's documentation.