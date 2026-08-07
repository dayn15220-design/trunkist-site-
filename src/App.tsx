import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TrunkistFeaturesOverview } from './components/TrunkistFeaturesOverview';
import { LiveOnlineTracker } from './components/LiveOnlineTracker';
import { WebsiteThemeCustomizer } from './components/WebsiteThemeCustomizer';
import { ParrySimulator } from './components/ParrySimulator';
import { WeaponDatabase } from './components/WeaponDatabase';
import { ExecutorConsole } from './components/ExecutorConsole';
import { LiveCommunityChat } from './components/LiveCommunityChat';
import { MobileScriptModal } from './components/MobileScriptModal';
import { AtmosphereFX } from './components/AtmosphereFX';
import { SiteThemeProvider, useSiteTheme } from './context/SiteThemeContext';
import { TabType, LanguageType } from './types';
import { sendHeartbeat } from './services/telemetryService';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { theme } = useSiteTheme();
  const [activeTab, setActiveTab] = useState<TabType>('features-overview');
  const [lang, setLang] = useState<LanguageType>('en');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  useEffect(() => {
    sendHeartbeat(activeTab, lang);
    const interval = setInterval(() => {
      sendHeartbeat(activeTab, lang);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeTab, lang]);

  const fontClass =
    theme.fontStyle === 'mono'
      ? 'font-mono'
      : theme.fontStyle === 'pixel'
      ? 'font-mono tracking-wider'
      : 'font-sans';

  return (
    <div
      className={`min-h-screen text-purple-100 selection:bg-purple-600 selection:text-white relative transition-colors duration-300 ${fontClass}`}
      style={{ backgroundColor: theme.bgColor }}
    >
      <AtmosphereFX />

      {theme.showGridLines && (
        <div
          className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none z-0"
          style={{ opacity: theme.gridOpacity / 100 }}
        />
      )}

      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% -20%, ${theme.primaryColor}22, transparent)`,
        }}
      />

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
              <motion.div key="features-overview" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <TrunkistFeaturesOverview lang={lang} />
              </motion.div>
            )}

            {activeTab === 'live-telemetry' && (
              <motion.div key="live-telemetry" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <LiveOnlineTracker lang={lang} />
              </motion.div>
            )}

            {activeTab === 'live-chat' && (
              <motion.div key="live-chat" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <LiveCommunityChat lang={lang} />
              </motion.div>
            )}

            {activeTab === 'ui-customizer' && (
              <motion.div key="ui-customizer" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <WebsiteThemeCustomizer lang={lang} />
              </motion.div>
            )}

            {activeTab === 'parry-arena' && (
              <motion.div key="parry-arena" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <ParrySimulator lang={lang} />
              </motion.div>
            )}

            {activeTab === 'weapon-dps' && (
              <motion.div key="weapon-dps" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <WeaponDatabase lang={lang} />
              </motion.div>
            )}

            {activeTab === 'executor-console' && (
              <motion.div key="executor-console" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <ExecutorConsole lang={lang} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-purple-900/30 bg-[#07040d]/90 py-6 text-center text-xs font-mono text-purple-300/60">
          <p>⚔️ Trunkist Hub | v1.4.8.8 TR Edition (Combat Warriors) — Official Live Hub</p>
        </footer>
      </div>

      <MobileScriptModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export function App() {
  return (
    <SiteThemeProvider>
      <AppContent />
    </SiteThemeProvider>
  );
}

export default App;
