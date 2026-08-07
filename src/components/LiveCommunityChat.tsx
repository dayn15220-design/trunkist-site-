import React, { useState, useEffect, useRef } from 'react';
import { LanguageType } from '../types';
import { useSiteTheme } from '../context/SiteThemeContext';
import { getOrCreateSessionId, recordTelemetryEvent } from '../services/telemetryService';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  User,
  Shield,
  Sparkles,
  Zap,
  CheckCircle2,
  Smile,
  Flame,
  Volume2,
  VolumeX,
  Crown,
  Terminal,
  Radio,
  Clock,
  Settings,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  badge: string;
  badgeColor: string;
  timestamp: string;
  sessionIdShort: string;
  device: 'mobile' | 'desktop';
  flag: string;
}

interface LiveCommunityChatProps {
  lang: LanguageType;
}

const BADGES = [
  { name: 'VIP 💎', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { name: 'Parry God 🛡️', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { name: 'Script Creator ⚡', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { name: 'Delta Pro 📱', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  { name: 'Solara User 💻', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { name: 'Bypasser 🗝️', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
];

const PRESET_MESSAGES_RU = [
  'Trunkist Hub 1.4.8.8 просто имба! 🔥',
  'Delta iOS робит идеально с парированием!',
  'Solara v3 без ключа работает 100%',
  'Какой тайтинг парирования ставите для Katana?',
  'Официальный лоадстринг скопировал, от души!',
];

const PRESET_MESSAGES_EN = [
  'Trunkist Hub 1.4.8.8 is absolute fire! 🔥',
  'Delta iOS working flawless with auto parry!',
  'Solara v3 keyless is solid 100%',
  'What parry delay offset do you use for Heavy Katana?',
  'Copied official loadstring script, thanks!',
];

export const LiveCommunityChat: React.FC<LiveCommunityChatProps> = ({ lang }) => {
  const { theme, playUISound } = useSiteTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [authorName, setAuthorName] = useState(() => {
    return localStorage.getItem('trunkist_chat_nick') || `Player_${Math.floor(100 + Math.random() * 900)}`;
  });
  const [selectedBadge, setSelectedBadge] = useState(BADGES[0]);
  const [isSending, setIsSending] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mySessionId = getOrCreateSessionId();

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/chat/messages');
      if (res.ok) {
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      }
    } catch (e) {
      console.error('Chat poll error:', e);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSaveNickname = (name: string) => {
    setAuthorName(name);
    localStorage.setItem('trunkist_chat_nick', name);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const finalMsg = textToSend || inputText;
    if (!finalMsg.trim() || isSending) return;

    setIsSending(true);
    if (soundEnabled) playUISound('laser');

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: mySessionId,
          author: authorName,
          text: finalMsg.trim(),
          badge: selectedBadge.name,
          badgeColor: selectedBadge.color,
          flag: lang === 'ru' ? '🇷🇺' : '🌐',
        }),
      });

      if (res.ok) {
        setInputText('');
        await fetchMessages();
        recordTelemetryEvent({
          type: 'visit',
          actionRu: `Отправлено сообщение в чат: "${finalMsg.slice(0, 20)}..."`,
          actionEn: `Sent chat message: "${finalMsg.slice(0, 20)}..."`,
        });
      }
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setIsSending(false);
    }
  };

  const presets = lang === 'ru' ? PRESET_MESSAGES_RU : PRESET_MESSAGES_EN;

  return (
    <div className="space-y-6">
      {/* CHAT HEADER CARD */}
      <div
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow}px ${theme.primaryColor}25`,
        }}
        className="relative rounded-3xl p-6 sm:p-8 border-2 shadow-2xl overflow-hidden transition-all duration-300"
      >
        <div
          style={{ backgroundColor: `${theme.primaryColor}20` }}
          className="absolute -top-12 -right-12 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>EXPRESS CHAT ENGINE ONLINE</span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[10px] font-bold">
                REAL-TIME MESSAGING
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-wide flex items-center gap-2">
              <MessageSquare className="w-8 h-8" style={{ color: theme.primaryColor }} />
              <span>{lang === 'ru' ? 'Живой Чат Сообщества (Имба)' : 'Global Live Community Chat'}</span>
            </h2>

            <p className="text-xs sm:text-sm font-mono text-gray-300 max-w-xl">
              {lang === 'ru'
                ? 'Общайтесь с другими игроками в реальном времени! Обсуждайте настройки парирования, инжекторы и скрипты.'
                : 'Real-time chat with players across connected sessions. Share parry settings, executors and feedback!'}
            </p>
          </div>

          {/* NICKNAME & BADGE DISPLAY / SETTINGS TOGGLE */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                playUISound('cyber');
                setShowSettings(!showSettings);
              }}
              className="p-3 rounded-2xl bg-black/50 border border-white/10 hover:border-white/30 text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Settings className="w-4 h-4 text-purple-400" />
              <span className="font-bold">{authorName}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${selectedBadge.color}`}>
                {selectedBadge.name}
              </span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-2xl bg-black/50 border border-white/10 hover:bg-white/10 text-gray-300 transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* NICKNAME & BADGE CUSTOMIZER PANEL */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs"
            >
              <div className="space-y-2">
                <label className="text-gray-300 font-bold flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" />
                  <span>{lang === 'ru' ? 'Ваш Никнейм в Чате:' : 'Your Chat Nickname:'}</span>
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => handleSaveNickname(e.target.value)}
                  maxLength={24}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 font-bold flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ru' ? 'Выберите Ваш Значок:' : 'Select Your Badge:'}</span>
                </label>

                <div className="flex flex-wrap gap-1.5">
                  {BADGES.map((b) => (
                    <button
                      key={b.name}
                      onClick={() => {
                        playUISound('laser');
                        setSelectedBadge(b);
                      }}
                      className={`px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                        selectedBadge.name === b.name
                          ? 'ring-2 ring-white scale-105 shadow-md ' + b.color
                          : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CHAT MESSAGES WINDOW */}
      <div
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
        }}
        className="rounded-3xl p-6 border shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="font-bold text-white">
              {lang === 'ru' ? 'ПРЯМОЙ ЭФИР ЧАТА' : 'LIVE CHAT MESSAGES'}
            </span>
            <span className="text-gray-400">({messages.length} {lang === 'ru' ? 'сообщений' : 'messages'})</span>
          </div>

          <div className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
            POLLED EVERY 1.5s
          </div>
        </div>

        {/* MESSAGES FEED CONTAINER */}
        <div className="h-96 overflow-y-auto pr-2 space-y-3 font-mono text-xs no-scrollbar">
          {messages.length === 0 ? (
            <div className="p-12 text-center text-gray-500 animate-pulse">
              💬 {lang === 'ru' ? 'Сообщений пока нет. Напишите первым!' : 'No messages yet. Be the first to type!'}
            </div>
          ) : (
            messages.map((m) => {
              const isMine = m.sessionIdShort === mySessionId.slice(0, 8) || m.author === authorName;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-2xl border flex flex-col space-y-1.5 transition-all ${
                    isMine
                      ? 'bg-purple-950/40 border-purple-500/40 ml-4 sm:ml-12'
                      : 'bg-black/40 border-white/10 mr-4 sm:mr-12'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base">{m.flag || '💬'}</span>
                      <span className="font-extrabold text-white">{m.author}</span>
                      <span className={`text-[10px] px-2 py-0.2 rounded border font-bold ${m.badgeColor}`}>
                        {m.badge}
                      </span>
                      {isMine && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          YOU
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span>{m.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-gray-100 text-sm font-sans leading-relaxed break-words pl-1">
                    {m.text}
                  </p>
                </motion.div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* PRESET CHIPS */}
        <div className="pt-2">
          <span className="text-[10px] font-mono text-gray-400 block mb-1.5">
            ⚡ {lang === 'ru' ? 'Быстрые фразы для отправки:' : 'Quick chat presets:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-gray-300 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT BOX */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              lang === 'ru'
                ? `Написать сообщение от имени ${authorName}...`
                : `Type a message as ${authorName}...`
            }
            maxLength={280}
            className="flex-1 px-4 py-3 rounded-2xl bg-black/60 border border-white/10 text-white font-mono text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            style={{
              backgroundColor: theme.primaryColor,
              boxShadow: `0 0 15px ${theme.primaryColor}50`,
            }}
            className="px-5 py-3 rounded-2xl text-white font-mono font-bold text-sm hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'ru' ? 'Отправить' : 'Send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
