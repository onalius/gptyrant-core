import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#333333] py-4 text-sm text-gray-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p>© {new Date().getFullYear()} NoBS_GPT - Tough love for your excuses</p>
        </div>
        <div className="flex space-x-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="https://github.com/yourusername/nobsgpt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
