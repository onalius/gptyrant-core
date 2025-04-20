import { useState, useEffect } from "react";
import { Message, Settings, Conversation } from "./types";

// Local storage keys
const SETTINGS_KEY = "nobsgpt_settings";
const CONVERSATIONS_KEY = "nobsgpt_conversations";
const CURRENT_CONVERSATION_KEY = "nobsgpt_current_conversation";

// Default settings
const defaultSettings: Settings = {
  apiKey: "",
  model: "gpt-3.5-turbo",
  sassLevel: 7,
  focusAreas: ["procrastination", "excuses", "goal-setting"],
};

// Use settings hook
export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  return [settings, setSettings] as const;
}

// Use conversations hook
export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const savedConversations = localStorage.getItem(CONVERSATIONS_KEY);
    return savedConversations ? JSON.parse(savedConversations) : [];
  });

  const [currentConversationId, setCurrentConversationId] = useState<string>(() => {
    return localStorage.getItem(CURRENT_CONVERSATION_KEY) || "";
  });

  // Save conversations to local storage when they change
  useEffect(() => {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  }, [conversations]);

  // Save current conversation ID to local storage when it changes
  useEffect(() => {
    localStorage.setItem(CURRENT_CONVERSATION_KEY, currentConversationId);
  }, [currentConversationId]);

  // Get the current conversation
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConversationId
  );

  // Create a new conversation
  const createConversation = (title = "New Conversation"): string => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString(),
      messages: [
        {
          role: "system",
          content: "NoBS_GPT initialized. I'm here to push you past your excuses and toward your goals. What do you need help with today?",
        },
      ],
    };

    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversationId(newConversation.id);
    return newConversation.id;
  };

  // Add a message to the current conversation
  const addMessage = (message: Message) => {
    if (!currentConversationId) {
      createConversation();
    }

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, message],
            }
          : conv
      )
    );
  };

  return {
    conversations,
    currentConversation,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
    addMessage,
  };
}
