
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="gradient-bg text-white py-8 px-6 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eğitim Koçu SMART Asistanı</h1>
          <p className="mt-2 text-indigo-100">Gelişim odaklı, çabayı ödüllendiren rehberlik aracı.</p>
        </div>
        <div className="hidden md:block">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/30">
                <span className="text-sm font-medium">🤝 Öğrenci Koçluğu Rehberi</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
