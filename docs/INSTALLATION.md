# GPTyrant Installation Guide

This document provides detailed installation instructions for the GPTyrant library.

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation Options

### 1. NPM Package (Recommended)

The simplest way to install GPTyrant is through npm:

```bash
npm install gptyrant
```

This installs the full package with all providers and features.

### 2. Standalone Files

For simpler projects or specific use cases, you can directly use one of the standalone files:

#### Minimal Version (TypeScript)

The `gptyrant_minimal.ts` file provides a simple implementation with OpenAI support only.

1. Download the file from the repository
2. Include it directly in your TypeScript project:

```typescript
import { createGPTyrant } from './path/to/gptyrant_minimal';

const tyrant = createGPTyrant('your-api-key');
```

#### Web Version (JavaScript)

The `gptyrant_web.js` file provides a browser-compatible version that works directly in web pages.

1. Download the file from the repository
2. Include it in your HTML:

```html
<script src="path/to/gptyrant_web.js"></script>
<script>
  const tyrant = GPTyrant.create('your-api-key');
</script>
```

### 3. Clone Repository (For Development)

If you want to contribute or modify the library:

```bash
git clone https://github.com/yourusername/gptyrant.git
cd gptyrant
npm install
npm run build
```

## API Key Requirements

GPTyrant requires an API key from at least one of the supported AI providers:

1. **OpenAI** (default provider)
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Create an API key in your account dashboard
   - Requires a paid account for production usage

2. **Anthropic** (Claude)
   - Sign up at [Anthropic Console](https://console.anthropic.com/)
   - Create an API key in your account dashboard
   - Requires approval for Claude API access

3. **xAI** (Grok)
   - Sign up at [xAI Platform](https://platform.x.ai/)
   - Create an API key in your account dashboard

4. **Google** (Vertex AI)
   - Sign up for Google Cloud Platform
   - Enable the Vertex AI API
   - Create API credentials in the Google Cloud Console

## Setting Up Your Environment

It's recommended to set up your API keys as environment variables:

```bash
# For OpenAI
export OPENAI_API_KEY="your-openai-key"

# For Anthropic
export ANTHROPIC_API_KEY="your-anthropic-key"

# For xAI
export XAI_API_KEY="your-xai-key"

# For Google Vertex AI
export GOOGLE_APPLICATION_CREDENTIALS="path/to/credentials.json"
```

## Troubleshooting

### Common Issues

1. **API Key Authentication Errors**
   - Ensure your API key is valid
   - Check that you're using the correct API key for the provider
   - Verify your account status with the provider

2. **Import Errors**
   - If you get TypeScript import errors, make sure you've installed the package properly
   - For direct file imports, check the path is correct

3. **Rate Limiting**
   - Most AI providers have rate limits for API calls
   - Implement back-off strategies for high-volume usage

4. **Missing Peer Dependencies**
   - If using multiple providers, install their respective SDKs:
     ```bash
     npm install openai @anthropic-ai/sdk
     ```

## Next Steps

Once installed, check out:

- [API Documentation](./API_DOCS.md) - Detailed API reference
- [Examples](../examples) - Code examples for various use cases
- [README](../README.md) - Overview and quick start guide

## Support

If you encounter any issues with installation:

1. Check the documentation
2. Look through existing GitHub Issues
3. Create a new Issue with detailed information about the problem