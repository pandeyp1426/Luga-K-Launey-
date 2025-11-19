
import React, { useState, useEffect, useRef } from 'react';
import { startChat, sendMessageToAI, isGeminiConfigured } from '../services/geminiService';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';
import Spinner from './Spinner';

const FashionAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { products } = useApp();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      try {
        startChat(products);
        setMessages([{ role: 'model', text: "Hello! I'm ChicBot, your personal fashion assistant. How can I help you create the perfect look today?" }]);
      } catch (e) {
        setError("Could not initialize the assistant. Please ensure your API key is configured.");
        console.error(e);
      }
    }
  }, [isOpen, products]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const stream = await sendMessageToAI(input);
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of stream) {
        modelResponse += chunk;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = modelResponse;
            return newMessages;
        });
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isGeminiConfigured()) {
    return null; // Don't render the assistant if API key is missing
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gray-900 text-white rounded-full p-4 shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-110 z-50"
        aria-label="Open Fashion Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12 2.25a.75.75 0 0 1 .75.75v.516a8.963 8.963 0 0 1 4.34 1.933.75.75 0 0 1-.787 1.285A7.463 7.463 0 0 0 12 6.001a7.463 7.463 0 0 0-4.303.486.75.75 0 0 1-.787-1.285A8.963 8.963 0 0 1 11.25 3.516v-.516a.75.75 0 0 1 .75-.75ZM2.25 12c0-3.033 1.693-5.705 4.173-7.112a.75.75 0 0 1 .787 1.285A7.466 7.466 0 0 0 6.001 12a7.466 7.466 0 0 0 1.213 4.327.75.75 0 1 1-1.285.787A8.966 8.966 0 0 1 2.25 12Z" />
          <path d="M12 15.75a.75.75 0 0 1 .75.75v.516a8.963 8.963 0 0 1-4.34 1.933.75.75 0 1 1-.787-1.285A7.463 7.463 0 0 0 12 18.001a7.463 7.463 0 0 0 4.303.486.75.75 0 1 1 .787 1.285A8.963 8.963 0 0 1 12.75 20.484v.516a.75.75 0 0 1-1.5 0v-.516a8.963 8.963 0 0 1-4.34-1.933.75.75 0 1 1 .787-1.285A7.463 7.463 0 0 0 12 18.001a7.463 7.463 0 0 0-4.303-.486.75.75 0 0 1-.787-1.285A8.963 8.963 0 0 1 11.25 15.516v-.516a.75.75 0 0 1 .75-.75ZM21.75 12c0 3.033-1.693 5.705-4.173 7.112a.75.75 0 1 1-.787-1.285A7.466 7.466 0 0 0 17.999 12a7.466 7.466 0 0 0-1.213-4.327.75.75 0 0 1 1.285-.787A8.966 8.966 0 0 1 21.75 12Z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <header className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
            <h3 className="text-lg font-serif font-semibold">ChicBot Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </header>

          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1].role === 'user' && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
                  <Spinner />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for style advice..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-900 disabled:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.949a.75.75 0 0 0 .95.826L11.25 9.25v1.5L4.643 12.01a.75.75 0 0 0-.826.95l1.414 4.949a.75.75 0 0 0 .95.826L16.25 15.25a.75.75 0 0 0 0-1.414L3.105 2.289Z" /></svg>
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
};

export default FashionAssistant;

