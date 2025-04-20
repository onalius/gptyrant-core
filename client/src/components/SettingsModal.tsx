import React, { useState, useEffect } from 'react';
import { Settings } from '../lib/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSaveSettings: (settings: Settings) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [formState, setFormState] = useState<Settings>(settings);

  // Update form state when settings change
  useEffect(() => {
    setFormState(settings);
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const focusArea = name.replace('focus-', '');
    
    setFormState(prev => {
      if (checked) {
        return {
          ...prev,
          focusAreas: [...prev.focusAreas, focusArea]
        };
      } else {
        return {
          ...prev,
          focusAreas: prev.focusAreas.filter(area => area !== focusArea)
        };
      }
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      sassLevel: parseInt(e.target.value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#252525] rounded-lg border border-[#333333] max-w-lg w-full mx-4 overflow-hidden">
        <div className="border-b border-[#333333] p-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">API Configuration</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="apiKey" className="block text-sm text-gray-400 mb-1">OpenAI API Key</label>
                  <input 
                    type="password" 
                    id="apiKey"
                    name="apiKey"
                    value={formState.apiKey}
                    onChange={handleChange}
                    className="w-full bg-[#121212] border border-[#333333] rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]"
                    placeholder="sk-..." 
                  />
                  <p className="mt-1 text-xs text-gray-500">Your API key is stored locally and never sent to our servers</p>
                </div>
                
                <div>
                  <label htmlFor="model" className="block text-sm text-gray-400 mb-1">Model</label>
                  <select 
                    id="model"
                    name="model"
                    value={formState.model}
                    onChange={handleChange}
                    className="w-full bg-[#121212] border border-[#333333] rounded-md py-2 px-3 text-sm focus:ring-1 focus:ring-[#2563eb] focus:border-[#2563eb]"
                  >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Personality Settings</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="sassLevel" className="block text-sm text-gray-400 mb-1">Sassiness Level</label>
                  <input 
                    type="range" 
                    id="sassLevel" 
                    min="1" 
                    max="10" 
                    value={formState.sassLevel}
                    onChange={handleRangeChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Mild</span>
                    <span>Brutal</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Focus Areas</label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="focus-procrastination"
                        checked={formState.focusAreas.includes('procrastination')}
                        onChange={handleCheckboxChange}
                        className="rounded bg-[#121212] border-[#333333] text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span>Procrastination</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="focus-excuses"
                        checked={formState.focusAreas.includes('excuses')}
                        onChange={handleCheckboxChange}
                        className="rounded bg-[#121212] border-[#333333] text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span>Excuses</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="focus-goal-setting"
                        checked={formState.focusAreas.includes('goal-setting')}
                        onChange={handleCheckboxChange}
                        className="rounded bg-[#121212] border-[#333333] text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span>Goal Setting</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        name="focus-time-management"
                        checked={formState.focusAreas.includes('time-management')}
                        onChange={handleCheckboxChange}
                        className="rounded bg-[#121212] border-[#333333] text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span>Time Management</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#333333] p-4 flex justify-end space-x-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#121212] hover:bg-[#1E1E1E] border border-[#333333] rounded-md text-sm transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-md text-sm transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
