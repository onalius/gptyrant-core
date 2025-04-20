import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../lib/types';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onResetChat: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  onResetChat
}) => {
  const [inputValue, setInputValue] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <section className="md:col-span-9">
      <div className="bg-[#252525] rounded-lg border border-[#333333] flex flex-col h-[75vh]">
        <div className="border-b border-[#333333] p-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#FF5722] animate-pulse mr-2"></div>
            <h2 className="font-semibold">Chat Session</h2>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onResetChat}
              className="p-1.5 hover:bg-[#121212] rounded-md text-gray-400 hover:text-white transition-colors"
              title="Clear chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 p-4 overflow-y-auto terminal-scrollbar flex flex-col space-y-4"
        >
          {messages.map((message, index) => {
            if (message.role === 'system') {
              return (
                <div key={index} className="flex items-start">
                  <div className="bg-[#2563eb]/10 border border-[#2563eb]/30 rounded-lg p-3 max-w-[85%]">
                    <div className="text-xs text-[#2563eb] font-mono mb-1">SYSTEM</div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              );
            } else if (message.role === 'user') {
              return (
                <div key={index} className="flex items-start">
                  <div className="bg-[#1E1E1E] rounded-lg p-3 max-w-[85%] self-end ml-auto border border-[#333333]">
                    <div className="text-xs text-gray-400 font-mono mb-1">YOU</div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index} className="flex items-start">
                  <div className="bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-lg p-3 max-w-[85%]">
                    <div className="text-xs text-[#FF5722] font-mono mb-1">NOBSGPT</div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              );
            }
          })}

          {isLoading && (
            <div className="flex items-start">
              <div className="bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-lg p-3 max-w-[85%]">
                <div className="text-xs text-[#FF5722] font-mono mb-1">NOBSGPT</div>
                <p className="text-sm flex items-center">
                  <span className="inline-block h-2 w-2 bg-[#FF5722] rounded-full mr-1 animate-pulse"></span>
                  <span className="inline-block h-2 w-2 bg-[#FF5722] rounded-full mr-1 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="inline-block h-2 w-2 bg-[#FF5722] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-[#333333] p-3">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="w-full bg-[#121212] border border-[#333333] rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb] font-mono placeholder-gray-500"
                placeholder={isLoading ? "Waiting for response..." : "Type your message (or excuse) here..."}
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className={`${
                isLoading || !inputValue.trim() 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-[#FF5722] hover:bg-[#E64A19]'
              } text-white py-2 px-4 rounded-md font-medium text-sm transition-colors flex items-center`}
            >
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
