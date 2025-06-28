# GPTyrant - Cross-Provider AI Tough Love Assistant

## Overview

GPTyrant is a TypeScript/JavaScript library that creates a "tough love" AI personality designed to push users past their excuses and toward their goals. The system wraps multiple AI providers (OpenAI, Anthropic, Grok, Google Gemini) with a consistent personality layer that delivers no-nonsense, motivational responses with configurable "sass levels" and focus areas.

## System Architecture

### Frontend Architecture
- **Multi-Distribution Strategy**: The project supports three deployment modes:
  - Full npm package with TypeScript support
  - Minimal standalone TypeScript file (`gptyrant_minimal.ts`)
  - Browser-compatible JavaScript file (`gptyrant_web.js`)
- **Framework Agnostic**: Works in Node.js, browser environments, and TypeScript projects
- **Zero Build Requirements**: Standalone files work without build tools

### Backend Architecture
- **Provider Abstraction Layer**: Common interface (`AIProvider`) abstracts different AI providers
- **Personality System**: Configurable personality packs that modify system prompts and response behavior
- **Modular Provider Implementation**: Each AI provider (OpenAI, Anthropic, Grok, Gemini) has its own implementation class

### Core Components
1. **GPTyrant Main Class**: Central orchestrator that manages providers and personality application
2. **Provider Classes**: Individual implementations for each AI service
3. **Personality Manager**: Handles registration and application of different coaching personalities
4. **Type System**: Comprehensive TypeScript interfaces for type safety

## Key Components

### Provider Layer
- **OpenAIProvider**: Uses OpenAI's GPT models (default: gpt-4o)
- **AnthropicProvider**: Integrates Claude models (default: claude-3-7-sonnet-20250219)
- **GrokProvider**: Connects to xAI's Grok API
- **GeminiProvider**: Interfaces with Google's Gemini models

### Personality System
- **Default Personalities**: Includes "Tyrant" (harsh), "Coach" (supportive but firm), and "Drill Sergeant" personalities
- **Customizable Sass Levels**: 1-10 scale controlling response intensity
- **Focus Areas**: Targeting specific topics like procrastination, goal-setting, accountability
- **Template System**: Personalities use templated system prompts with variable substitution

### Configuration Management
- **Environment Variable Integration**: API keys stored in environment variables
- **Flexible Options**: Supports temperature, max tokens, model selection per provider
- **Provider Switching**: Runtime provider changes without recreating instances

## Data Flow

1. **User Input**: Message or conversation array provided to GPTyrant instance
2. **Personality Application**: Current personality modifies system prompt based on sass level and focus areas
3. **Provider Selection**: Appropriate AI provider called based on configuration
4. **API Request**: Provider formats request according to its API requirements
5. **Response Processing**: Raw AI response potentially transformed by personality-specific filters
6. **Output**: Processed tough love response returned to user

## External Dependencies

### Required Dependencies
- **openai**: ^4.11.0 (peer dependency for OpenAI provider)
- **@anthropic-ai/sdk**: ^0.9.0 (peer dependency for Anthropic provider)

### Development Dependencies
- **TypeScript**: ^5.2.2 for type checking and compilation
- **Jest**: ^29.7.0 for testing framework
- **ESLint**: ^8.53.0 for code linting
- **Rimraf**: ^5.0.5 for clean builds

### API Requirements
- **OpenAI API Key**: For GPT model access
- **Anthropic API Key**: For Claude model access
- **xAI API Key**: For Grok model access
- **Google API Key**: For Gemini model access

## Deployment Strategy

### Package Distribution
- **NPM Registry**: Primary distribution as `gptyrant-core` package
- **Direct Download**: Standalone files for quick integration
- **Multiple Entry Points**: Support for CommonJS and ES modules

### Build Process
- **TypeScript Compilation**: Source TypeScript compiled to JavaScript with type definitions
- **Multiple Targets**: Supports ES2020 with CommonJS modules
- **Source Maps**: Generated for debugging support

### Environment Support
- **Node.js**: 16.0.0+ required
- **Browser Compatibility**: Works in modern browsers via web bundle
- **Development Tools**: Full TypeScript development experience

## Changelog
- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.