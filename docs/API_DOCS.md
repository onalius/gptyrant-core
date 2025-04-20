# GPTyrant API Documentation

This document provides detailed information about the GPTyrant API, classes, and methods.

## Table of Contents

- [GPTyrant Class](#gptyrant-class)
- [Provider Classes](#provider-classes)
- [Types and Interfaces](#types-and-interfaces)
- [Standalone Functions](#standalone-functions)
- [Browser API](#browser-api)

## GPTyrant Class

The main class for interacting with GPTyrant functionality.

### Constructor

```typescript
constructor(apiKey: string, options: Partial<TyrantOptions> = {})
```

Creates a new GPTyrant instance.

**Parameters:**
- `apiKey` (string): API key for the selected provider
- `options` (Partial\<TyrantOptions\>): Optional configuration

**Example:**
```typescript
const tyrant = new GPTyrant('your-api-key', {
  provider: 'openai',
  sassLevel: 8,
  focusAreas: ['procrastination']
});
```

### Methods

#### generateResponse

```typescript
public async generateResponse(
  messages: Message[],
  options: Partial<TyrantOptions> = {}
): Promise<string>
```

Generates a response to a conversation.

**Parameters:**
- `messages` (Message[]): Array of messages in the conversation
- `options` (Partial\<TyrantOptions\>): Optional runtime options to override defaults

**Returns:**
- Promise\<string\>: A string containing the assistant's response

**Example:**
```typescript
const response = await tyrant.generateResponse([
  { role: 'user', content: 'I keep procrastinating on my project' }
]);
```

#### getSystemPrompt

```typescript
public getSystemPrompt(): Message
```

Gets the system prompt used for the conversation.

**Returns:**
- Message: A system message that defines the GPTyrant personality

**Example:**
```typescript
const systemPrompt = tyrant.getSystemPrompt();
console.log(systemPrompt.content);
```

#### updateOptions

```typescript
public updateOptions(options: Partial<TyrantOptions>): void
```

Updates the configuration options for this GPTyrant instance.

**Parameters:**
- `options` (Partial\<TyrantOptions\>): New options to apply

**Example:**
```typescript
tyrant.updateOptions({ 
  sassLevel: 10,
  maxTokens: 800
});
```

#### setProvider

```typescript
public setProvider(provider: ProviderType, apiKey: string, model?: string): void
```

Changes the AI provider being used.

**Parameters:**
- `provider` (ProviderType): The provider type to switch to
- `apiKey` (string): API key for the new provider
- `model` (string, optional): Model to use with the new provider

**Example:**
```typescript
tyrant.setProvider('anthropic', 'your-anthropic-api-key', 'claude-3-7-sonnet-20250219');
```

## Provider Classes

GPTyrant includes several provider classes that implement the AIProvider interface.

### OpenAIProvider

```typescript
constructor(apiKey: string, model: string = DEFAULT_MODEL, organization?: string)
```

### AnthropicProvider

```typescript
constructor(apiKey: string, model: string = DEFAULT_MODEL)
```

### GrokProvider

```typescript
constructor(apiKey: string, model: string = DEFAULT_MODEL)
```

### VertexProvider

```typescript
constructor(apiKey: string, model: string = DEFAULT_MODEL)
```

Each provider implements:

- `getSystemPrompt(options: TyrantOptions): Message`
- `generateCompletion(messages: Message[], options: TyrantOptions): Promise<string>`

## Types and Interfaces

### Message

```typescript
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string | MessageContent[];
}
```

### MessageContent

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

### ProviderType

```typescript
type ProviderType = 'openai' | 'anthropic' | 'grok' | 'vertex';
```

### TyrantOptions

```typescript
interface TyrantOptions {
  sassLevel: number;
  focusAreas: string[];
  temperature?: number;
  maxTokens?: number;
  provider?: ProviderType;
  model?: string;
}
```

### AIProvider

```typescript
interface AIProvider {
  generateCompletion(messages: Message[], options: TyrantOptions): Promise<string>;
  getSystemPrompt(options: TyrantOptions): Message;
}
```

## Standalone Functions

### generateToughLoveResponse

```typescript
export async function generateToughLoveResponse(
  message: string,
  apiKey: string,
  options: Partial<TyrantOptions> = {}
): Promise<string>
```

Generate a tough love response without creating a GPTyrant instance.

**Parameters:**
- `message` (string): The user's message
- `apiKey` (string): API key for the provider
- `options` (Partial\<TyrantOptions\>): Configuration options

**Returns:**
- Promise\<string\>: The assistant's response

**Example:**
```typescript
const response = await generateToughLoveResponse(
  'I keep procrastinating on my project',
  'your-api-key',
  { sassLevel: 9 }
);
```

## Browser API

When using the browser version (`gptyrant_web.js`), the API is slightly different:

### GPTyrant.create

```javascript
GPTyrant.create(apiKey, customOptions = {})
```

**Returns an object with:**

- `generateResponse(input, runtimeOptions = {})`
- `updateOptions(newOptions)`
- `setSassLevel(level)`
- `getSystemPrompt()`
- `getOptions()`

**Example:**
```javascript
const tyrant = GPTyrant.create('your-api-key', { sassLevel: 8 });
const response = await tyrant.generateResponse('I need motivation');
```