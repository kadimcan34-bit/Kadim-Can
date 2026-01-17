
import React from 'react';
import { SmartGoalResult as ResultType } from '../types';

interface Props {
  result: ResultType;
}

const SmartGoalResult: React.FC<Props> = ({ result }) => {
  const smartCategories = [
    { key: 'S', label: 'Belirli', content: result.specific, color: 'text-blue-600', bg: 'bg-blue-50' },
    { key: 'M', label: 'Ölçülebilir', content: result.measurable, color: 'text-green-600', bg: 'bg-green-50' },
    { key: 'A', label: 'Ulaşılabilir', content: result.achievable, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { key: 'R', label: 'İlgili', content: result.relevant, color: 'text-purple-600', bg: 'bg-purple-50' },
    { key: 'T', label: 'Zaman Planı', content: result.timeBound, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* Coaching Statement Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden border border-white/20">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="p-2 bg-white/20 rounded-full text-2xl">✨</span>
            <h3 className="text-xl font-bold">Öğrenciye Koçluk Mesajı</h3>
          </div>
          <p className="text-xl leading-relaxed italic font-medium text-indigo-50">
            "{result.coachingStatement}"
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-indigo-200 bg-black/10 w-fit px-3 py-1 rounded-full border border-white/10">
            <span>💡</span>
            <span>Öğrencinin gözlerinin içine bakarak ve samimiyetle oku.</span>
          </div>
        </div>
        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Effort Tracking Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
        <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
            <span className="p-2 bg-orange-100 rounded-lg">💪</span> Çaba Odak Noktaları
        </h3>
        <p className="text-slate-600 leading-relaxed bg-orange-50/50 p-4 rounded-xl border border-orange-50 italic">
          {result.effortEmphasis}
        </p>
      </div>

      {/* SMART Breakdown for the Teacher */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2">Plan Detayları</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {smartCategories.map((cat) => (
            <div key={cat.key} className={`p-4 rounded-xl ${cat.bg} flex flex-col h-full border border-black/5`}>
              <div className={`text-2xl font-black ${cat.color} opacity-40 mb-1`}>{cat.key}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{cat.label}</div>
              <p className="text-sm text-slate-700 leading-tight flex-grow">{cat.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coaching Questions */}
        <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-sm">
          <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <span>💬</span> Görüşme Soruları
          </h3>
          <ul className="space-y-4">
            {result.coachingQuestions.map((q, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-indigo-200 shadow-sm group hover:border-indigo-400 transition-colors">
                <span className="font-bold text-indigo-500">?</span>
                <span className="text-sm text-slate-700">{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Steps */}
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <span>🏃</span> Aksiyon Adımları
          </h3>
          <ul className="space-y-4">
            {result.actionSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                </div>
                <span className="text-sm text-slate-700 font-medium">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="text-center text-slate-400 text-xs italic">
        "Sonuç bir varış noktasıdır, ancak gelişim yolda gösterilen çabadadır."
      </div>
    </div>
  );
};

export default SmartGoalResult;
