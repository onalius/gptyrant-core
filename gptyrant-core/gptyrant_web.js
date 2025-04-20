/**
 * GPTyrant Web - A browser-compatible version of GPTyrant
 * ======================================================
 * 
 * This file provides a browser-compatible version of GPTyrant 
 * that works with OpenAI's API. It's designed for direct inclusion
 * in web pages without a build step.
 * 
 * Usage:
 * ```html
 * <script src="gptyrant_web.js"></script>
 * <script>
 *   const tyrant = GPTyrant.create('your-openai-api-key');
 *   
 *   async function getResponse() {
 *     const input = document.getElementById('user-input').value;
 *     const response = await tyrant.generateResponse(input);
 *     document.getElementById('response').textContent = response;
 *   }
 * </script>
 * ```
 * 
 * @version 0.1.0
 * @license MIT
 */

(function(global) {
  'use strict';
  
  /**
   * Default options for GPTyrant
   */
  const DEFAULT_OPTIONS = {
    sassLevel: 7,
    focusAreas: ['procrastination', 'excuses', 'goal-setting'],
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 600
  };
  
  /**
   * Create a GPTyrant instance
   * @param {string} apiKey - OpenAI API key
   * @param {object} customOptions - Optional configuration options
   */
  function create(apiKey, customOptions = {}) {
    if (!apiKey) {
      throw new Error('API key is required to use GPTyrant');
    }
    
    // Merge custom options with defaults
    const options = Object.assign({}, DEFAULT_OPTIONS, customOptions);
    
    /**
     * Generate the system prompt based on current options
     * @returns {object} A system message object
     */
    function getSystemPrompt() {
      // Adjust tone based on sass level
      let toneDescription = "";
      if (options.sassLevel <= 3) {
        toneDescription = "Be direct but somewhat gentle. Push the user while still being supportive.";
      } else if (options.sassLevel <= 7) {
        toneDescription = "Be blunt and sarcastic. Don't sugarcoat your responses, but don't be overly harsh.";
      } else {
        toneDescription = "Be extremely blunt, sarcastic, and harsh. Cut through all the BS without mercy.";
      }

      // Create focus areas portion of the prompt
      const focusAreasText = options.focusAreas.length > 0
        ? `Pay special attention to these areas: ${options.focusAreas.join(", ")}.`
        : "Respond to any type of excuse or procrastination with tough love.";

      return {
        role: "system",
        content: `You are GPTyrant, an AI assistant that's tired of people's excuses and pushes them to be better through tough love. 
${toneDescription}

Your personality traits:
1. No-nonsense attitude: Be direct, blunt, and don't sugarcoat responses.
2. Frustration with BS: Express exasperation and impatience with excuses, procrastination, or lack of effort.
3. Motivational tough love: Use tough love to push users to be better, challenge them, and hold them accountable.
4. Sarcastic and witty: Use sarcasm and witty remarks to drive points home.
5. Goal-oriented: Focus on helping users achieve their goals, even if it means being harsh or critical.

${focusAreasText}

Always end your response by pushing the user toward a concrete next step or action. Make them take responsibility.

Remember: Your goal is not to be mean, but to motivate through a no-BS approach that cuts through excuses and pushes for action.`
      };
    }
    
    /**
     * Update the options for this GPTyrant instance
     * @param {object} newOptions - New options to apply
     */
    function updateOptions(newOptions) {
      Object.assign(options, newOptions);
    }
    
    /**
     * Set the sassiness level of the GPTyrant
     * @param {number} level - A number between 1 and 10
     */
    function setSassLevel(level) {
      if (level < 1 || level > 10) {
        throw new Error('Sass level must be between 1 and 10');
      }
      options.sassLevel = level;
    }
    
    /**
     * Generate a response to a user message
     * @param {string|Array} input - Either a string message or an array of message objects
     * @param {object} runtimeOptions - Optional runtime options
     * @returns {Promise<string>} The assistant's response
     */
    async function generateResponse(input, runtimeOptions = {}) {
      // Merge runtime options with instance options
      const mergedOptions = Object.assign({}, options, runtimeOptions);
      
      // Format the input as messages
      let messages;
      if (typeof input === 'string') {
        messages = [{ role: 'user', content: input }];
      } else {
        messages = input;
      }
      
      try {
        // Add system message
        const systemPrompt = getSystemPrompt();
        const conversationWithSystem = [systemPrompt, ...messages];
        
        // Calculate temperature based on sass level
        const temperature = mergedOptions.temperature ?? (0.7 + (mergedOptions.sassLevel * 0.03));
        
        // Make request to OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: mergedOptions.model,
            messages: conversationWithSystem,
            temperature,
            max_tokens: mergedOptions.maxTokens
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Unknown API error');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
      } catch (error) {
        console.error('GPTyrant API error:', error);
        throw new Error(`Failed to generate response: ${error.message}`);
      }
    }
    
    // Return the public interface
    return {
      generateResponse,
      updateOptions,
      setSassLevel,
      getSystemPrompt,
      getOptions: () => Object.assign({}, options) // Return a copy of options
    };
  }
  
  // Export the GPTyrant object
  global.GPTyrant = {
    create,
    DEFAULT_OPTIONS
  };
  
})(typeof window !== 'undefined' ? window : this);