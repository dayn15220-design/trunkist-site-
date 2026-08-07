import React, { useState } from 'react';
import { LanguageType } from '../types';
import { useSiteTheme } from '../context/SiteThemeContext';
import { CreatorProfileAndStats } from './CreatorProfileAndStats';
import { TrunkistCodeVault } from './TrunkistCodeVault';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Swords,
  Crosshair,
  Flame,
  Volume2,
  Lock,
  Cpu,
  Trophy,
  Target,
  Award,
  ZapOff,
  AlertTriangle,
  ChevronRight,
  Star,
  Layers,
  Search,
} from 'lucide-react';

interface TrunkistFeaturesOverviewProps {
  lang: LanguageType;
}

export const TrunkistFeaturesOverview: React.FC<TrunkistFeaturesOverviewProps> = ({ lang }) => {
  const { theme, playUISound } = useSiteTheme();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Combat' | 'Aim' | 'Physics' | 'Visuals' | 'Security'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number | null>(0);

  const reasonsWhyBest = [
    {
      icon: ShieldCheck,
      color: 'from-purple-900 via-purple-800 to-black',
      badgeColor: 'text-purple-300 bg-purple-950/90 border-purple-600/50',
      titleRu: '0% Шанс Бана (Black Eye / Cat Eye Bypass)',
      titleEn: '0% Ban Rate (Black Eye / Cat Eye Bypass)',
      descRu: 'Уникальный алгоритм маскировки Luau-хуков и подделки аргументов. Скрипт полностью обходит внутренний античит Combat Warriors (Black Eye / Cat Eye / Red Eye).',
      descEn: 'Unique Luau function hooking and argument spoofing architecture. Completely invisible to Combat Warriors internal anti-cheat (Black Eye / Cat Eye / Red Eye).',
      stat: '0% BANS',
    },
    {
      icon: Zap,
      color: 'from-purple-950 via-purple-850 to-purple-900',
      badgeColor: 'text-purple-300 bg-purple-950/90 border-purple-600/50',
      titleRu: 'Мгновенный Threat Index & Auto Parry (0 ms)',
      titleEn: 'Zero-Delay Threat Engine (0 ms)',
      descRu: 'Расчет угрозы на уровне анимационных фреймов (Track.TimePosition), дистации оружия и пинга игрока. Вы отбиваете 100% атак без промахов.',
      descEn: 'Frame-precise threat calculation assessing weapon distance, server ping, and animation vectors for 100% parry accuracy.',
      stat: '0ms LATENCY',
    },
    {
      icon: Target,
      color: 'from-purple-900 via-indigo-950 to-black',
      badgeColor: 'text-purple-300 bg-purple-950/90 border-purple-600/50',
      titleRu: 'Защита от Фейковых Замахов (Anti-Bait Feint)',
      titleEn: 'Bypass Feint (Anti-Bait Logic)',
      descRu: 'Обычные скрипты трапываются на байты и тратять блок. Trunkist Hub распознает отмену атаки и отменяет парирование за доли миллисекунды.',
      descEn: 'Standard scripts fall for enemy attack feints. Trunkist Hub detects attack cancellation in real-time and aborts parry instantly.',
      stat: '100% ANTI-BAIT',
    },
    {
      icon: Cpu,
      color: 'from-purple-950 via-purple-900 to-black',
      badgeColor: 'text-purple-300 bg-purple-950/90 border-purple-600/50',
      titleRu: 'Поддержка Любых Инжекторов (ПК & Mobile)',
      titleEn: 'Universal Executor Compatibility',
      descRu: 'Оптимизированный байткод с минимальной нагрузкой. Работает на Wave, Delta, Fluxus, Hydrogen, Celery и MacSploit с стабильными 60 FPS (Solara и Xeno НЕ поддерживаются из-за нехватки UNC/хуков).',
      descEn: 'Ultra-lightweight Luau codebase. Seamlessly executes on Wave, Delta, Fluxus, Hydrogen, Celery, and MacSploit (Solara & Xeno unsupported due to low UNC).',
      stat: '60+ FPS',
    },
    {
      icon: Trophy,
      color: 'from-purple-900 via-purple-800 to-black',
      badgeColor: 'text-purple-300 bg-purple-950/90 border-purple-600/50',
      titleRu: '100% Бесплатно & Без Ключей (Keyless)',
      titleEn: '100% Free & Keyless System',
      descRu: 'Никаких сокращателей ссылок, рекламы и генераторов ключей. Вставил loadstring в консоль — и скрипт мгновенно готов к бою.',
      descEn: 'No tedious linkvertise, ads, or key verification systems. Paste the loadstring and start dominating instantly.',
      stat: 'NO KEYS',
    },
  ];

  const allFeaturesDetailed = [
    // COMBAT & PARRY
    {
      category: 'Combat',
      icon: Swords,
      nameRu: 'Master Auto-Parry Threat Engine',
      nameEn: 'Master Auto-Parry Threat Engine',
      summaryRu: 'Главный движок автоматического парирования атак врага в Combat Warriors.',
      summaryEn: 'Primary automated parry engine with real-time attack threat assessment.',
      detailsRu: 'Сканирует анимационные треки соперников в радиусе 30 студов. Рассчитывает время прилета удара на основе хитбокса оружия, скорости анимации и сетевого пинга, посылая нажатие [F] точно в идеальное окно.',
      detailsEn: 'Scans enemy animation tracks within 30 studs. Calculates exact strike arrival using weapon reach, animation speed, and network latency to inject [F] keypress at the exact parry window.',
      status: 'UNDETECTED',
      hotkey: 'F Key',
    },
    {
      category: 'Combat',
      icon: Target,
      nameRu: 'Bypass Feint (Anti-Bait System)',
      nameEn: 'Bypass Feint (Anti-Bait System)',
      summaryRu: 'Интеллектуальная защита от обманных замахов и финтов со стороны опытных игроков.',
      summaryEn: 'Smart protection against attack feints and baits by experienced players.',
      detailsRu: 'Опытные игроки в CW часто отменяют атаку прямо перед ударом, чтобы выбить вашу стамину. Trunkist Hub мониторит параметр Track.TimePosition и, если атака прервана, отменяет команду парирования.',
      detailsEn: 'Skilled CW players frequently feint attacks to trigger your parry cooldown. Trunkist Hub monitors Track.TimePosition; if feinted, it aborts the parry command instantly.',
      status: 'ACTIVE',
      hotkey: 'Auto',
    },
    {
      category: 'Combat',
      icon: Zap,
      nameRu: 'Silent Backstab (Stealth Teleport)',
      nameEn: 'Silent Backstab (Stealth Teleport)',
      summaryRu: 'Моментальная переориентация за спину соперника во время вашей атаки.',
      summaryEn: 'Instant back-position CFrame reorientation during melee attack swings.',
      detailsRu: 'При нажатии удара вектор CFrame вашего персонажа бесшовно сдвигается за спину цели. Соперник не успевает поставит блок и получает гарантированный критический урон в спину.',
      detailsEn: 'Upon swing input, shifts character CFrame behind target position. Prevents target from parrying and guarantees critical backstab damage.',
      status: 'ACTIVE',
      hotkey: 'Custom Key',
    },
    {
      category: 'Combat',
      icon: CheckCircle2,
      nameRu: 'Auto-Execute (Downed Finisher)',
      nameEn: 'Auto-Execute (Downed Finisher)',
      summaryRu: 'Автоматическое добивание упавших соперников клавишей [E].',
      summaryEn: 'Automated finisher execution on downed targets using [E] key.',
      detailsRu: 'Как только здоровье врага падает до нокаута, скрипт считывает состояние Ragdoll / Downed и мгновенно активирует анимацию добивания, не теряя времени.',
      detailsEn: 'As soon as enemy health drops to downed state, the script detects the Ragdoll attribute and triggers the finisher instantly.',
      status: 'ACTIVE',
      hotkey: 'E Key',
    },
    {
      category: 'Combat',
      icon: ZapOff,
      nameRu: 'Anti-Parry (Auto Unequip)',
      nameEn: 'Anti-Parry (Auto Unequip)',
      summaryRu: 'Защита вашего оружия от парирования соперником.',
      summaryEn: 'Protects your attacks from being parried by enemies.',
      detailsRu: 'Если скрипт замечает, что враг прожимает блок во время вашего замаха, оружие мгновенно убирается в инвентарь на доли секунды, предотвращая ваше оглушение.',
      detailsEn: 'If enemy parry animation triggers during your swing, weapon is unequipped for a fraction of a second to prevent you from being stunned.',
      status: 'ACTIVE',
      hotkey: 'Auto',
    },

    // AIMBOT & TRACKING
    {
      category: 'Aim',
      icon: Crosshair,
      nameRu: 'Vector 2D Mouse Aimbot',
      nameEn: 'Vector 2D Mouse Aimbot',
      summaryRu: 'Плавный наводчик прицела на тело или голову с валидацией стен.',
      summaryEn: 'Smooth target tracking aimbot targeting torso/head with wall checks.',
      detailsRu: 'Вычисляет траекторию движения соперников с учетом инерции. Оснащен настраиваемым кругом FOV, проверкой препятствий (Raycast Visible) и регулятором плавности для сэмулированного движения мыши.',
      detailsEn: 'Calculates target trajectory factoring in velocity vectors. Features customizable FOV circle, Raycast wall check, and smoothness slider.',
      status: 'ACTIVE',
      hotkey: 'RMB / Key',
    },
    {
      category: 'Aim',
      icon: Target,
      nameRu: 'Smart Target Selector',
      nameEn: 'Smart Target Selector',
      summaryRu: 'Выбор идеальной цели: по наименьшей дистанции или ближнему к прицелу.',
      summaryEn: 'Intelligent targeting prioritizing closest distance or nearest cursor target.',
      detailsRu: 'Автоматически переключает приоритет автопарирования и аимбота на наиболее опасного противника в толпе, игнорируя союзников и безопасных игроков.',
      detailsEn: 'Dynamically shifts auto-parry and aimbot priority to the most dangerous enemy in group fights, ignoring allies and out-of-range players.',
      status: 'ACTIVE',
      hotkey: 'Auto',
    },

    // PHYSICS & MOBILITY
    {
      category: 'Physics',
      icon: Flame,
      nameRu: 'Infinite Stamina & Oxygen',
      nameEn: 'Infinite Stamina & Oxygen',
      summaryRu: 'Бесконечная стамина для непрерывных прыжков, рывков и ударов.',
      summaryEn: 'Infinite stamina for non-stop sprinting, dashes, and heavy swings.',
      detailsRu: 'Замораживает счетчик стамины в клиенте Игра и подменяет сетевой ответ сервера, позволяя делать бесконечные слайд-канселы и супер-рывки.',
      detailsEn: 'Freezes local stamina consumption values and bypasses depletion events, allowing endless slide cancels and heavy attacks.',
      status: 'ACTIVE',
      hotkey: 'Passive',
    },
    {
      category: 'Physics',
      icon: Cpu,
      nameRu: 'Anti-Knockback (No Ragdoll)',
      nameEn: 'Anti-Knockback (No Ragdoll)',
      summaryRu: 'Полная отмена отбрасывания и моментальный подъем при падающих атак.',
      summaryEn: 'Complete knockback negation and instant recovery from knockdown attacks.',
      detailsRu: 'Нейтрализует BodyVelocity при попадании тяжелых мечей (DSK, Halberd) и сбрасывает флаги Ragdoll, позволяя продолжать атаку без задержки.',
      detailsEn: 'Neutralizes incoming BodyVelocity forces from heavy weapons and instantly clears ragdoll states for non-stop combat flow.',
      status: 'ACTIVE',
      hotkey: 'Passive',
    },
    {
      category: 'Physics',
      icon: Zap,
      nameRu: 'Target Strafe Orbit',
      nameEn: 'Target Strafe Orbit',
      summaryRu: 'Орбитальное вращение вокруг цели для сбития вражеского аима.',
      summaryEn: 'Orbital high-speed strafing around enemies to disrupt target aim.',
      detailsRu: 'Персонаж автоматически вращается по заданной траектории вокруг противника со скоростью 30+ студов/сек, сохраняя постоянную возможность наносить удары.',
      detailsEn: 'Orbits around your target at high velocity, confusing enemy mouse aim while keeping your attacks in striking range.',
      status: 'ACTIVE',
      hotkey: 'Toggle Key',
    },

    // VISUALS & ESP
    {
      category: 'Visuals',
      icon: Layers,
      nameRu: 'Universal Chams & Health ESP',
      nameEn: 'Universal Chams & Health ESP',
      summaryRu: 'Подсветка игроков сквозь стены с полосой здоровья и расстоянием.',
      summaryEn: 'Wallhack player highlights with dynamic health bars and distance badges.',
      detailsRu: 'Отрисовывает шейдерную или векторную заливку моделей соперников. Цвет изменяется от зелёного к красному в зависимости от остатка HP врага.',
      detailsEn: 'Renders custom wallhack highlights around enemy models. Color dynamically shifts from green to red based on remaining health.',
      status: 'ACTIVE',
      hotkey: 'Toggle',
    },
    {
      category: 'Visuals',
      icon: Sparkles,
      nameRu: '3D Floating Damage Numbers',
      nameEn: '3D Floating Damage Numbers',
      summaryRu: 'Вылетающие 3D тексты урона над головой при каждом успешном ударе.',
      summaryEn: 'Floating 3D damage indicator text above enemy models upon impact.',
      detailsRu: 'Красочные всплывающие числа урона с кривой анимацией вылета. Показывает критический урон, урон кровотечением и заблокированный урон.',
      detailsEn: 'Vibrant animated damage text floating above targets. Displays critical hits, bleed ticks, and blocked damage values.',
      status: 'ACTIVE',
      hotkey: 'Toggle',
    },

    // SECURITY
    {
      category: 'Security',
      icon: Lock,
      nameRu: 'Black Eye / Cat Eye Anti-Cheat Bypass',
      nameEn: 'Black Eye / Cat Eye Anti-Cheat Bypass',
      summaryRu: 'Полный обход внутриигровой защиты Combat Warriors (Black Eye / Cat Eye / Red Eye).',
      summaryEn: 'Complete bypass of Combat Warriors in-game anti-cheat (Black Eye / Cat Eye / Red Eye).',
      detailsRu: 'Все Luau-хуки и метаметоды защищены и маскируются под легитимные клиентские события игры. Скрипт не триггерит античит-демки Combat Warriors и совместим со всеми актуальными эксплоитами.',
      detailsEn: 'All Luau hooks and metamethods are spoofed as legitimate client events. Does not trigger Combat Warriors in-game detection logs.',
      status: 'UNDETECTED',
      hotkey: 'Built-in',
    },
  ];

  const comparisonData = [
    {
      featureRu: 'Скорость Реакции Авто-Парирования',
      featureEn: 'Auto-Parry Reaction Speed',
      trunkist: '0 - 5 ms (Мгновенно)',
      others: '120 - 250 ms (Промахи)',
      winner: 'Trunkist',
    },
    {
      featureRu: 'Защита от Фейковых Замахов (Anti-Bait)',
      featureEn: 'Anti-Feint / Anti-Bait Logic',
      trunkist: '100% (Распознает отмену)',
      others: 'Отсутствует (Тратит блок)',
      winner: 'Trunkist',
    },
    {
      featureRu: 'Риск Получения Бана (Ban Rate)',
      featureEn: 'Ban Risk Level',
      trunkist: '0% (Обход Black Eye / Cat Eye)',
      others: 'Высокий (Частые баны)',
      winner: 'Trunkist',
    },
    {
      featureRu: 'Система Доступа (Keys)',
      featureEn: 'Access System',
      trunkist: 'Keyless (Без ключей & рекламы)',
      others: '5+ страниц Linkvertise',
      winner: 'Trunkist',
    },
    {
      featureRu: 'Поддержка Мобильных Инжекторов (Delta/Fluxus)',
      featureEn: 'Mobile Executor Support (Delta/Fluxus)',
      trunkist: 'Полная совместимость 60 FPS',
      others: 'Вылетает или лагает',
      winner: 'Trunkist',
    },
    {
      featureRu: 'Кастомный Загрузочный Welcome UI',
      featureEn: 'Custom Animated Welcome UI',
      trunkist: 'Интерактивный с эффектами',
      others: 'Стандартное текстовое окно',
      winner: 'Trunkist',
    },
  ];

  const filteredFeatures = allFeaturesDetailed.filter((f) => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch =
      f.nameRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.summaryRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.summaryEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      {/* HERO SECTION: Why Trunkist Hub is #1 */}
      <div
        className="relative rounded-3xl p-6 sm:p-10 border shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}20`,
        }}
      >
        {/* Animated Background Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ backgroundColor: theme.primaryColor }}
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 space-y-8">
          {/* Header Title & Badge */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-purple-900/40 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-900/80 to-pink-900/80 text-purple-200 text-xs font-mono font-bold border border-purple-500/40 shadow-lg">
                <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
                <span>v1.4.8.8 TR ENGINE | OFFICIAL OVERVIEW</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight leading-tight">
                {lang === 'ru' ? (
                  <>
                    Почему <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">Trunkist Hub</span> — Скрипт №1 в Roblox?
                  </>
                ) : (
                  <>
                    Why <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">Trunkist Hub</span> is the #1 Roblox Script?
                  </>
                )}
              </h1>

              <p className="text-purple-200/80 font-mono text-xs sm:text-sm max-w-3xl leading-relaxed">
                {lang === 'ru'
                  ? 'Trunkist Hub — это ультимативный приватный скрипт для Combat Warriors в Roblox. Мы разработали собственный математический алгоритм расчета угроз (Threat Index), обхода внутриигрового античита Black Eye / Cat Eye / Red Eye и нулевую задержку парирования.'
                  : 'Trunkist Hub is the ultimate script engine for Combat Warriors in Roblox. Featuring a custom real-time Threat Index, Black Eye / Cat Eye in-game anti-cheat bypass, and zero-latency auto-parry.'}
              </p>
            </div>

            {/* Quick Live Stats Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#090414]/90 border border-purple-500/40 shadow-xl shrink-0 text-center select-none"
            >
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-black text-xl">
                <CheckCircle2 className="w-5 h-5" />
                <span>100% ACTIVE</span>
              </div>
              <span className="text-[10px] font-mono text-purple-300/70 uppercase tracking-wider mt-1">
                {lang === 'ru' ? 'Античит Пройден' : 'Anti-Cheat Bypassed'}
              </span>
            </motion.div>
          </div>

          {/* 5 KEY REASONS CARDS */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {reasonsWhyBest.map((r, idx) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderColor: `${theme.borderColor}80`,
                  }}
                  className="p-5 rounded-2xl border shadow-lg flex flex-col justify-between space-y-4 transition-all group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform border"
                        style={{
                          backgroundColor: `${theme.primaryColor}25`,
                          borderColor: `${theme.primaryColor}80`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: theme.primaryColor }} />
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${theme.primaryColor}15`,
                          borderColor: `${theme.primaryColor}50`,
                          color: theme.primaryColor,
                        }}
                      >
                        {r.stat}
                      </span>
                    </div>

                    <h3 className="font-mono font-bold text-sm text-white group-hover:text-gray-200 transition-colors">
                      {lang === 'ru' ? r.titleRu : r.titleEn}
                    </h3>

                    <p className="text-gray-300 text-xs font-mono leading-relaxed">
                      {lang === 'ru' ? r.descRu : r.descEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span style={{ color: theme.primaryColor }}>TRUNKIST EXCLUSIVE</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" style={{ color: theme.primaryColor }} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* GET LOADSTRING CODE VAULT SECTION */}
      <TrunkistCodeVault lang={lang} />

      {/* STATS & CREATOR PROFILE CARD (dayn15220) */}
      <CreatorProfileAndStats lang={lang} />

      {/* COMPARISON MATRIX: Trunkist vs Competitors */}
      <div
        className="rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 transition-all duration-300"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}20`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl border text-white"
            style={{
              backgroundColor: `${theme.primaryColor}20`,
              borderColor: `${theme.primaryColor}60`,
            }}
          >
            <Trophy className="w-5 h-5" style={{ color: theme.accentColor }} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {lang === 'ru' ? 'Сравнение: Trunkist Hub против Других Скриптов' : 'Comparison Matrix: Trunkist Hub vs Others'}
            </h2>
            <p className="text-xs font-mono text-gray-300">
              {lang === 'ru' ? 'Почему игроки Combat Warriors выбирают именно наш хаб' : 'Why top Combat Warriors players switch to Trunkist Hub'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr
                className="border-b text-white"
                style={{
                  backgroundColor: `${theme.bgColor}aa`,
                  borderColor: `${theme.borderColor}60`,
                }}
              >
                <th className="p-4 font-bold uppercase">{lang === 'ru' ? 'Характеристика' : 'Feature / Capability'}</th>
                <th
                  className="p-4 font-bold uppercase"
                  style={{
                    backgroundColor: `${theme.primaryColor}25`,
                    color: theme.primaryColor,
                  }}
                >
                  ⚔️ {theme.titlePrefix || 'Trunkist'} Hub
                </th>
                <th className="p-4 font-bold uppercase text-stone-400">{lang === 'ru' ? 'Другие Скрипты' : 'Other Scripts'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-semibold">{lang === 'ru' ? row.featureRu : row.featureEn}</td>
                  <td
                    className="p-4 font-bold flex items-center gap-2"
                    style={{
                      backgroundColor: `${theme.primaryColor}10`,
                      color: theme.primaryColor,
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: theme.primaryColor }} />
                    <span>{row.trunkist}</span>
                  </td>
                  <td className="p-4 text-rose-400/80">
                    <div className="flex items-center gap-2">
                      <ZapOff className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{row.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILED FEATURES BREAKDOWN */}
      <div
        className="rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 transition-all duration-300"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.borderColor,
          boxShadow: `0 0 ${theme.borderGlow / 2}px ${theme.primaryColor}20`,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5" style={{ color: theme.primaryColor }} />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                {lang === 'ru' ? 'Полный Подробный Обзор Каждой Функции' : 'Detailed Breakdown of All Features'}
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-300">
              {lang === 'ru'
                ? 'Полный функционал v1.4.8.8 TR Engine. Выберите категорию или используйте поиск'
                : 'Explore all capabilities of v1.4.8.8 TR Engine. Select a category or search'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 pointer-events-none text-gray-400" />
            <input
              type="text"
              placeholder={lang === 'ru' ? 'Поиск функции...' : 'Search feature...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderColor: `${theme.borderColor}80`,
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl border text-xs font-mono text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white shadow-inner"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {[
            { id: 'All', labelRu: 'Все Функции', labelEn: 'All Features' },
            { id: 'Combat', labelRu: '⚔️ Бой & Парирование', labelEn: '⚔️ Combat & Parry' },
            { id: 'Aim', labelRu: '🎯 Аимбот', labelEn: '🎯 Aimbot' },
            { id: 'Physics', labelRu: '⚡ Физика & Полет', labelEn: '⚡ Physics & Movement' },
            { id: 'Visuals', labelRu: '👁️ Визуал & ESP', labelEn: '👁️ Visuals & ESP' },
            { id: 'Security', labelRu: '🛡️ Защита & HWID', labelEn: '🛡️ Security & HWID' },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  playUISound('cyber');
                }}
                style={{
                  backgroundColor: isActive ? theme.primaryColor : 'rgba(0,0,0,0.3)',
                  borderColor: isActive ? theme.accentColor : 'rgba(255,255,255,0.1)',
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span>{lang === 'ru' ? cat.labelRu : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            const isSelected = selectedFeatureIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                onClick={() => {
                  setSelectedFeatureIndex(idx);
                  playUISound('mech');
                }}
                whileHover={{ scale: 1.01 }}
                style={{
                  backgroundColor: isSelected ? `${theme.primaryColor}15` : 'rgba(0,0,0,0.35)',
                  borderColor: isSelected ? theme.primaryColor : 'rgba(255,255,255,0.1)',
                  boxShadow: isSelected ? `0 0 15px ${theme.primaryColor}35` : 'none',
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl border text-white"
                      style={{
                        backgroundColor: `${theme.primaryColor}20`,
                        borderColor: `${theme.primaryColor}50`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-white">
                        {lang === 'ru' ? feat.nameRu : feat.nameEn}
                      </h3>
                      <span className="text-[10px] font-mono text-gray-300">
                        {lang === 'ru' ? feat.summaryRu : feat.summaryEn}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                      {feat.status}
                    </span>
                    <span className="text-[9px] font-mono text-gray-400">
                      [{feat.hotkey}]
                    </span>
                  </div>
                </div>

                <div
                  className="pt-3 border-t text-xs font-mono text-gray-200 leading-relaxed p-3 rounded-xl border"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.25)',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="font-bold block mb-1" style={{ color: theme.primaryColor }}>
                    {lang === 'ru' ? 'Как это работает под капотом:' : 'Under the hood operation:'}
                  </span>
                  {lang === 'ru' ? feat.detailsRu : feat.detailsEn}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};
