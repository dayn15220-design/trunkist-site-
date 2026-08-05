1. src/App.tsx (Главный контейнер сайта)
code
Tsx
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TrunkistFeaturesOverview } from './components/TrunkistFeaturesOverview';
import { ParrySimulator } from './components/ParrySimulator';
import { WeaponDatabase } from './components/WeaponDatabase';
import { ExecutorConsole } from './components/ExecutorConsole';
import { MobileScriptModal } from './components/MobileScriptModal';
import { TabType, LanguageType } from './types';
import { motion, AnimatePresence } from 'motion/react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('features-overview');
  const [lang, setLang] = useState<LanguageType>('ru');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090511] text-purple-100 font-sans selection:bg-purple-600 selection:text-white">
      <div className="relative min-h-screen flex flex-col">
        {/* Background Ambient Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-900/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-900/15 rounded-full blur-3xl" />
        </div>

        {/* Top Header Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
          setLang={setLang}
          onOpenMobileModal={() => setIsMobileModalOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {activeTab === 'features-overview' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <TrunkistFeaturesOverview lang={lang} />
              </motion.div>
            )}

            {activeTab === 'parry-simulator' && (
              <motion.div
                key="simulator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ParrySimulator lang={lang} />
              </motion.div>
            )}

            {activeTab === 'weapon-database' && (
              <motion.div
                key="weapons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <WeaponDatabase lang={lang} />
              </motion.div>
            )}

            {activeTab === 'executor-console' && (
              <motion.div
                key="console"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <ExecutorConsole lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-purple-900/40 py-6 text-center text-xs text-purple-400 font-mono bg-[#0c0816]/90">
          <p>
            Trunkist HUB Monolith Engine • Created by{' '}
            <span className="text-white font-bold">Trunkist (@dayn15220-design)</span>
          </p>
        </footer>
      </div>

      {/* Mobile & Delta Script Modal */}
      <MobileScriptModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
