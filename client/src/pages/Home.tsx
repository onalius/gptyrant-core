import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import Footer from '../components/Footer';
import SettingsModal from '../components/SettingsModal';
import { useSettings, useConversations } from '../lib/hooks';
import { sendMessage } from '../lib/openai';
import { Message } from '../lib/types';

const Home: React.FC = () => {
  const [settings, setSettings] = useSettings();
  const {
    conversations,
    currentConversation,
    currentConversationId,
    setCurrentConversationId,
    createConversation,
    addMessage
  } = useConversations();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create a new conversation if none exists
  useEffect(() => {
    if (conversations.length === 0) {
      createConversation();
    }
  }, [conversations.length, createConversation]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Create user message
    const userMessage: Message = {
      role: 'user',
      content
    };

    // Add user message to conversation
    addMessage(userMessage);
    
    // Set loading state
    setIsLoading(true);

    try {
      // Prepare messages for API
      const messages = currentConversation?.messages.filter(
        msg => msg.role !== 'system'
      ) || [];

      // Send to API
      const response = await sendMessage([...messages, userMessage], settings);
      
      // Add response to conversation
      addMessage(response);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      addMessage({
        role: 'assistant',
        content: 'Error: Failed to get a response. Please check your API key and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    createConversation();
  };

  const handleResetChat = () => {
    createConversation();
  };

  return (
    <div className="bg-[#121212] text-gray-100 font-sans antialiased min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl">
        <Sidebar 
          conversations={conversations}
          currentConversationId={currentConversationId}
          onSelectConversation={setCurrentConversationId}
          onNewConversation={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        
        <ChatInterface 
          messages={currentConversation?.messages || []}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          onResetChat={handleResetChat}
        />
      </main>
      
      <Footer />
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={setSettings}
      />

      <style jsx global>{`
        /* Terminal scrollbar styling */
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: #1E1E1E;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: #333333;
          border-radius: 4px;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444444;
        }
      `}</style>
    </div>
  );
};

export default Home;
