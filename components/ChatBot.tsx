
import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini, searchEducationalStrategies } from '../services/geminiService';
import { ChatMessage, SearchResult } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setSearchResults([]);

    try {
      let responseText = '';
      if (useSearch) {
        const result = await searchEducationalStrategies(input);
        responseText = result.text;
        if (result.sources) {
          const sources = result.sources.map((chunk: any) => ({
            title: chunk.web?.title || 'Kaynak',
            uri: chunk.web?.uri || '#'
          })).filter((s: any) => s.uri !== '#');
          setSearchResults(sources);
        }
      } else {
        responseText = await chatWithGemini(input, messages);
      }
      
      const botMessage: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="gradient-bg w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="gradient-bg p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">🤖</span>
              <span className="font-bold">Eğitim Danışmanı</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-1 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center text-slate-400 mt-10">
                <p>Selam! Öğrenci gelişimi veya SMART hedefler hakkında ne sormak istersin?</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 rounded-bl-none flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs space-y-1">
                <p className="font-bold text-blue-700 mb-1">Kaynaklar:</p>
                {searchResults.map((s, idx) => (
                  <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:underline">
                    • {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
               <button 
                onClick={() => setUseSearch(!useSearch)}
                className={`text-[10px] px-2 py-1 rounded-full transition-colors flex items-center gap-1 ${useSearch ? 'bg-green-100 text-green-700 font-bold border border-green-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}
               >
                 <span className={useSearch ? 'opacity-100' : 'opacity-40'}>🌐</span>
                 {useSearch ? 'Google Araması Aktif' : 'Arama Kapalı'}
               </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Mesajınızı yazın..."
                className="flex-1 px-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="gradient-bg text-white p-2 rounded-xl disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
