import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-dark-border bg-[#1E1E1E]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-[#FF5722] font-bold text-xl font-mono tracking-tight">NoBS_GPT</span>
          <span className="text-xs bg-[#252525] px-2 py-0.5 rounded-md opacity-70">v1.0.0</span>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="https://github.com/yourusername/nobsgpt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Docs</a>
          <a href="https://github.com/yourusername/nobsgpt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Github</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
