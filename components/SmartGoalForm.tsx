
import React, { useState } from 'react';
import { SmartGoalData } from '../types';

interface Props {
  onSubmit: (data: SmartGoalData) => void;
  isLoading: boolean;
}

const SmartGoalForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<SmartGoalData>({
    studentName: '',
    classLevel: '',
    generalGoal: '',
    expectedResult: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Öğrenci Adı (Opsiyonel)
            </label>
            <input
              type="text"
              placeholder="Örn: Ali Yılmaz"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Sınıf Seviyesi *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: 3. Sınıf, Lise 2, vb."
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.classLevel}
              onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Genel Hedef(ler) *
          </label>
          <textarea
            required
            placeholder="Örn: Bir öğrencinin okuma seviyesini geliştirmek."
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
            value={formData.generalGoal}
            onChange={(e) => setFormData({ ...formData, generalGoal: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            İstenen Sonuç(lar) *
          </label>
          <textarea
            required
            placeholder="Örn: Okuma seviyesini B1 düzeyine, dakikada 80 kelime ölçütüne göre 3 ayda yükseltmek istiyorum."
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
            value={formData.expectedResult}
            onChange={(e) => setFormData({ ...formData, expectedResult: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-xl text-white font-bold transition-all shadow-md ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'gradient-bg hover:opacity-90 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Hedef Analiz Ediliyor...
            </span>
          ) : (
            'SMART Hedefini Oluştur'
          )}
        </button>
      </form>
    </div>
  );
};

export default SmartGoalForm;
