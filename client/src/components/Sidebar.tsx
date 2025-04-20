import React from 'react';
import { Conversation } from '../lib/types';

interface SidebarProps {
  conversations: Conversation[];
  currentConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onOpenSettings
}) => {
  // Format date to relative time (e.g., "2h ago", "Yesterday", "3d ago")
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <aside className="md:col-span-3 space-y-6">
      <div className="flex flex-col space-y-2">
        <button 
          onClick={onNewConversation}
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
        <button 
          onClick={onOpenSettings}
          className="bg-[#252525] hover:bg-[#333333] text-gray-300 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>
      </div>

      <div className="bg-[#252525] rounded-lg p-4 border border-[#333333]">
        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-3">About</h2>
        <p className="text-sm text-gray-300 mb-4">NoBS_GPT is a wrapper that delivers tough love, calls out your excuses, and pushes you to be your best self.</p>
        <div className="space-y-1">
          <div className="flex items-center text-xs text-gray-400">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FF5722] mr-2"></span>
            <span>Tough Love Responses</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <span className="inline-block w-3 h-3 rounded-full bg-[#2563eb] mr-2"></span>
            <span>OpenAI Integration</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            <span>Goal-Oriented Feedback</span>
          </div>
        </div>
      </div>

      <div className="bg-[#252525] rounded-lg p-4 border border-[#333333]">
        <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-3">Quick Start</h2>
        <div className="font-mono text-xs bg-[#121212] p-3 rounded mb-2 text-gray-300 overflow-x-auto">
          <code>pip install nobsgpt</code>
        </div>
        <div className="font-mono text-xs bg-[#121212] p-3 rounded text-gray-300 overflow-x-auto">
          <code>from nobsgpt import NoBS<br />
          bot = NoBS(api_key="your_key")<br />
          bot.chat("I'll start tomorrow")</code>
        </div>
      </div>

      {conversations.length > 0 && (
        <div className="bg-[#252525] rounded-lg p-4 border border-[#333333]">
          <h2 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-3">History</h2>
          <ul className="space-y-2 text-sm">
            {conversations.map(conversation => (
              <li 
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`flex justify-between items-center py-2 px-3 rounded cursor-pointer ${
                  conversation.id === currentConversationId 
                    ? 'bg-[#1E1E1E] border border-[#FF5722]/50'
                    : 'bg-[#121212] hover:bg-[#1E1E1E]'
                }`}
              >
                <span className="truncate text-gray-300">{conversation.title}</span>
                <span className="text-xs text-gray-500">{formatDate(conversation.createdAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
