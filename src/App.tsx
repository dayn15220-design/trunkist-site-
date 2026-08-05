import React, { useState } from 'react';
import { LanguageType } from './types';
import { CreatorProfileAndStats } from './components/CreatorProfileAndStats';
import { ExecutorConsole } from './components/ExecutorConsole';

export default function App() {
  const [lang, setLang] = useState<LanguageType>('ru');

  return (
    <div className="min-h-screen bg-[#07030e] text-white p-4 sm:p-8 space-y-8 font-sans">
      <header className="flex justify-between items-center max-w-6xl mx-auto border-b border-purple-900/50 pb-4">
        <h1 className="text-2xl font-black font-mono text-purple-400">Trunkist HUB</h1>
        <button
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="px-3 py-1 rounded-lg bg-purple-900/40 border border-purple-500/30 text-xs font-mono uppercase"
        >
          {lang}
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        <CreatorProfileAndStats lang={lang} />
        <ExecutorConsole lang={lang} />
      </main>
    </div>
  );
}
