# GPTyrant API Documentation

This document provides detailed documentation for the GPTyrant API.

## Core Classes and Functions

### `GPTyrant` Class

The main class for creating and working with the GPTyrant AI assistant.

```typescript
class GPTyrant {
  constructor(apiKey: string, options?: Partial<TyrantOptions>);
  
  public getSystemPrompt(): Message;
  public generateResponse(input: string | Message[]): Promise<string>;
  public updateOptions(options: Partial<TyrantOptions>): void;
  public setProvider(provider: ProviderType, apiKey: string, model?: string): void;
}
```

#### Constructor

Creates a new GPTyrant instance.

**Parameters:**
- `apiKey` (string): API key for the selected provider
- `options` (Partial\<TyrantOptions\>): Optional configuration options

**Example:**
```typescript
const tyrant = new GPTyrant('your-api-key', {
  sassLevel: 7,
  focusAreas: ['procrastination', 'fitness'],
  provider: 'openai',
  model: 'gpt-4o'
});
```

#### Methods

##### `getSystemPrompt()`

Returns the system prompt used to define the GPTyrant personality.

**Returns:** A system message object

##### `generateResponse(input: string | Message[])`

Generates a response to a user message or conversation.

**Parameters:**
- `input`: Either a string message or an array of message objects

**Returns:** A promise resolving to the assistant's response as a string

**Example:**
```typescript
// Using a string message
const response = await tyrant.generateResponse('I keep putting off my project');

// Using a message array for conversation history
const conversation = [
  { role: 'user', content: 'I want to get fit but never find time' },
  { role: 'assistant', content: 'Stop with the excuses...' },
  { role: 'user', content: 'But my schedule is really busy' }
];
const response = await tyrant.generateResponse(conversation);
```

##### `updateOptions(options: Partial<TyrantOptions>)`

Updates the configuration options for this GPTyrant instance.

**Parameters:**
- `options`: New options to apply

**Example:**
```typescript
tyrant.updateOptions({
  sassLevel: 9,
  focusAreas: ['discipline', 'motivation']
});
```

##### `setProvider(provider: ProviderType, apiKey: string, model?: string)`

Changes the AI provider being used.

**Parameters:**
- `provider`: The provider type to switch to
- `apiKey`: API key for the new provider
- `model`: Optional model to use with the new provider

**Example:**
```typescript
tyrant.setProvider('anthropic', 'your-anthropic-api-key', 'claude-3-7-sonnet-20250219');
```

### Helper Functions

#### `createTyrant(apiKey: string, options?: Partial<TyrantOptions>)`

A factory function that creates a new GPTyrant instance.

**Parameters:**
- `apiKey` (string): API key for the selected provider
- `options` (Partial\<TyrantOptions\>): Optional configuration options

**Returns:** A new GPTyrant instance

**Example:**
```typescript
import { createTyrant } from 'gptyrant';

const tyrant = createTyrant('your-api-key', { sassLevel: 5 });
```

#### `generateToughLoveResponse(apiKey: string, message: string, options?: Partial<TyrantOptions>)`

A one-shot function to generate a tough love response without creating an instance.

**Parameters:**
- `apiKey` (string): API key for the AI provider
- `message` (string): User message to respond to
- `options` (Partial\<TyrantOptions\>): Optional configuration options

**Returns:** A promise resolving to the assistant's response as a string

**Example:**
```typescript
import { generateToughLoveResponse } from 'gptyrant';

const response = await generateToughLoveResponse(
  'your-api-key',
  'I keep procrastinating on my project',
  { sassLevel: 8 }
);
```

## Enhanced Version

### `GPTyrantEnhanced` Class

An extended version of GPTyrant with additional features.

```typescript
class GPTyrantEnhanced {
  constructor(configPath?: string);
  
  public updateConfig(newConfig: Partial<EnhancedConfig>): void;
  public setApiKey(apiKey: string, provider?: ProviderType): void;
  public generateResponse(message: string): Promise<string>;
  public saveCurrentConversation(): void;
  public newConversation(systemPrompt?: string): void;
  public addFeedback(feedback: string): void;
  public getHistory(): ConversationEntry[];
  public getCurrentConversation(): Message[];
  public saveConfig(): void;
}
```

#### Constructor

Creates a new enhanced GPTyrant instance with conversation management and additional features.

**Parameters:**
- `configPath` (string, optional): Path to the configuration file

**Example:**
```typescript
import { GPTyrantEnhanced } from 'gptyrant/enhanced';

const enhancedTyrant = new GPTyrantEnhanced();
```

#### Methods

Enhanced GPTyrant includes all core functionality plus:

##### `updateConfig(newConfig: Partial<EnhancedConfig>)`

Updates the configuration including enhanced features.

##### `setApiKey(apiKey: string, provider?: ProviderType)`

Sets the API key and optionally changes the provider.

##### `generateResponse(message: string)`

Generates a response and automatically manages conversation history.

##### `saveCurrentConversation()`

Saves the current conversation to history.

##### `newConversation(systemPrompt?: string)`

Starts a new conversation with an optional custom system prompt.

##### `addFeedback(feedback: string)`

Records user feedback for the last conversation.

##### `getHistory()`

Returns the conversation history.

##### `getCurrentConversation()`

Returns the current conversation messages.

##### `saveConfig()`

Saves the current configuration to file.

### Helper Function

#### `createEnhancedTyrant(configPath?: string)`

A factory function that creates a new enhanced GPTyrant instance.

**Parameters:**
- `configPath` (string, optional): Path to the configuration file

**Returns:** A new GPTyrantEnhanced instance

**Example:**
```typescript
import { createEnhancedTyrant } from 'gptyrant/enhanced';

const tyrant = createEnhancedTyrant();
```

## Types and Interfaces

### `TyrantOptions`

Configuration options for GPTyrant.

```typescript
interface TyrantOptions {
  sassLevel: number;       // Level of sassiness/harshness (1-10)
  focusAreas: string[];    // Areas to focus on in responses
  temperature?: number;    // Temperature for response generation
  maxTokens?: number;      // Maximum tokens in responses
  provider?: ProviderType; // AI provider to use
  model?: string;          // Model name to use
}
```

### `Message`

A message in a conversation.

```typescript
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string | MessageContent[];
}
```

### `MessageContent`

Content in a message, supporting both text and images.

```typescript
type MessageContent = {
  type: 'text';
  text: string;
} | {
  type: 'image_url';
  image_url: {
    url: string;
  };
};
```

### `ProviderType`

Supported AI providers.

```typescript
type ProviderType = 'openai' | 'anthropic' | 'grok' | 'vertex';
```

### Enhanced Types

#### `EnhancedConfig`

Extended configuration for GPTyrantEnhanced.

```typescript
interface EnhancedConfig extends TyrantOptions {
  historySize: number;       // Number of conversations to keep
  autoSaveHistory: boolean;  // Whether to auto-save history
  feedbackPrompt: string;    // Prompt for requesting feedback
  historyPath: string;       // Path to save history
}
```

#### `ConversationEntry`

A conversation entry in history.

```typescript
interface ConversationEntry {
  timestamp: string;
  messages: Message[];
  feedback?: string;
}
```

## Minimal Version

The standalone minimal version in `gptyrant_minimal.ts` provides a simplified version of the API with only the core functions.

See the [standalone version documentation](../gptyrant_minimal.ts) for more details.

## Web Version

The browser-compatible version in `gptyrant_web.js` is designed for direct inclusion in web pages.

See the [web version documentation](../gptyrant_web.js) for more details.