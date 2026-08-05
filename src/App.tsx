import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TrunkistFeaturesOverview } from './components/TrunkistFeaturesOverview';
import { TrunkistCodeVault } from './components/TrunkistCodeVault';
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
      {/* Dark Purple Ambient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,200,0.18),rgba(255,255,255,0))] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1d1233_1px,transparent_1px),linear-gradient(to_bottom,#1d1233_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-40" />

      <div className="relative z-10 flex flex-col min-h-screen">
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
                key="features-overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <TrunkistFeaturesOverview lang={lang} />
              </motion.div>
            )}

            {activeTab === 'script-get' && (
              <motion.div
                key="script-get"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <TrunkistCodeVault lang={lang} />
              </motion.div>
            )}

            {activeTab === 'parry-arena' && (
              <motion.div
                key="parry-arena"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ParrySimulator lang={lang} />
              </motion.div>
            )}

            {activeTab === 'weapon-dps' && (
              <motion.div
                key="weapon-dps"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <WeaponDatabase lang={lang} />
              </motion.div>
            )}

            {activeTab === 'executor-console' && (
              <motion.div
                key="executor-console"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ExecutorConsole lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-purple-900/30 bg-[#07040d]/90 py-6 text-center text-xs font-mono text-purple-300/60">
          <p>
            ⚔️ Trunkist Hub | Monolith Edition (Combat Warriors) — Official Live Interactive Script Showcase & Hub
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
