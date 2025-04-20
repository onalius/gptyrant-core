import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  apiKey: text("api_key"),
  model: text("model").default("gpt-3.5-turbo"),
  sassLevel: integer("sass_level").default(7),
  focusAreas: json("focus_areas").$type<string[]>().default(["procrastination", "excuses", "goal-setting"]),
  createdAt: timestamp("created_at").defaultNow()
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull().default("New Conversation"),
  createdAt: timestamp("created_at").defaultNow()
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => conversations.id, { onDelete: "cascade" }).notNull(),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  apiKey: true,
  model: true,
  sassLevel: true,
  focusAreas: true
});

export const insertConversationSchema = createInsertSchema(conversations).pick({
  userId: true,
  title: true
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  conversationId: true,
  role: true,
  content: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

// Chat message types used in the frontend
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string()
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

// Chat completion request schema
export const chatCompletionRequestSchema = z.object({
  messages: z.array(chatMessageSchema),
  model: z.string().default("gpt-3.5-turbo"),
  sassLevel: z.number().min(1).max(10).default(7),
  focusAreas: z.array(z.string()).default(["procrastination", "excuses", "goal-setting"])
});

export type ChatCompletionRequest = z.infer<typeof chatCompletionRequestSchema>;
