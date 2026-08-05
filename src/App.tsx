import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { TrunkistFeaturesOverview } from './components/TrunkistFeaturesOverview.tsx';
import { ParrySimulator } from './components/ParrySimulator.tsx';
import { WeaponDatabase } from './components/WeaponDatabase.tsx';
import { ExecutorConsole } from './components/ExecutorConsole.tsx';
import { MobileScriptModal } from './components/MobileScriptModal.tsx';
import { TabType, LanguageType } from './types.ts';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('features-overview');
  const [lang, setLang] = useState<LanguageType>('ru');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090511] text-purple-100 font-sans selection:bg-purple-600 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        onOpenMobileModal={() => setIsMobileModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'features-overview' && <TrunkistFeaturesOverview lang={lang} />}
        {activeTab === 'parry-simulator' && <ParrySimulator lang={lang} />}
        {activeTab === 'weapon-database' && <WeaponDatabase lang={lang} />}
        {activeTab === 'executor-console' && <ExecutorConsole lang={lang} />}
      </main>

      <MobileScriptModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
