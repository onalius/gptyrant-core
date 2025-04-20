import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createNoBS } from "./openai";
import { ChatMessage, chatCompletionRequestSchema, chatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Chat completion endpoint
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validationResult = chatCompletionRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: 'Invalid request body', 
          errors: validationResult.error.format() 
        });
      }
      
      const { messages, model, sassLevel, focusAreas } = validationResult.data;
      
      // Get API key from request headers or environment variable
      const apiKey = req.headers["x-api-key"] as string || process.env.OPENAI_API_KEY;
      
      if (!apiKey) {
        return res.status(400).json({ 
          message: 'OpenAI API key is required. Provide it in the X-API-Key header or set the OPENAI_API_KEY environment variable.' 
        });
      }
      
      // Create NoBS instance with the API key
      const noBs = createNoBS(apiKey);
      
      // Generate the completion
      const response = await noBs.generateCompletion(messages, { 
        sassLevel, 
        focusAreas 
      });
      
      // Return the response
      return res.json({ 
        message: {
          role: "assistant",
          content: response
        }
      });
    } catch (error: any) {
      console.error('Error generating chat completion:', error);
      return res.status(500).json({ 
        message: `Failed to generate response: ${error.message}` 
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'healthy' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
