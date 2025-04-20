import { Message, Settings } from "./types";

const API_URL = "/api/chat";

export async function sendMessage(
  messages: Message[],
  settings: Settings
): Promise<Message> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (settings.apiKey) {
      headers["X-API-Key"] = settings.apiKey;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        messages,
        model: settings.model,
        sassLevel: settings.sassLevel,
        focusAreas: settings.focusAreas,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get response");
    }

    const data = await response.json();
    return data.message as Message;
  } catch (error: any) {
    console.error("Error sending message:", error);
    throw error;
  }
}
