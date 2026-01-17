
import React, { useState } from 'react';
import Header from './components/Header';
import SmartGoalForm from './components/SmartGoalForm';
import SmartGoalResult from './components/SmartGoalResult';
import ChatBot from './components/ChatBot';
import { SmartGoalData, SmartGoalResult as ResultType } from './types';
import { generateSmartGoal } from './services/geminiService';

const App: React.FC = () => {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: SmartGoalData) => {
    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateSmartGoal(data);
      setResult(generated);
    } catch (err) {
      console.error(err);
      setError('Hedef oluşturulurken bir hata oluştu. Lütfen girdilerinizi kontrol edip tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="p-2 bg-indigo-100 rounded-lg">📋</span> Hedef Tanımı
              </h2>
              <SmartGoalForm onSubmit={handleGenerate} isLoading={isLoading} />
            </section>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 animate-pulse">
                <span>⚠️</span> {error}
              </div>
            )}

            {!result && !isLoading && (
              <div className="bg-indigo-50 border border-indigo-100 p-8 rounded-2xl text-center">
                <div className="text-4xl mb-3">🎓</div>
                <h3 className="text-lg font-bold text-indigo-900 mb-2">Başlamaya Hazır mısın?</h3>
                <p className="text-indigo-700">Öğrencinin bilgilerini girin ve Gemini AI sizin için bilimsel temelli bir gelişim planı oluştursun.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {result ? (
              <SmartGoalResult result={result} />
            ) : (
              <div className="hidden lg:block h-full border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center p-12 text-slate-400">
                <div className="text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p className="text-lg">Analiz sonuçları burada görünecek.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <ChatBot />
      
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 text-center text-sm text-slate-500 z-10">
        &copy; {new Date().getFullYear()} Eğitimci SMART Asistanı • Pedagojik Verimlilik İçin Geliştirilmiştir
      </footer>
    </div>
  );
};

export default App;
