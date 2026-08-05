import React, { useState } from 'react';

export default function App() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  const stats = [
    {
      labelRu: 'Активных пользователей',
      labelEn: 'Active Users',
      value: '45,000+',
      change: '+12% this month',
      subtextRu: 'Стабильная аудитория проекта',
      subtextEn: 'Stable project community',
      badgeColor: '#a855f7',
    },
    {
      labelRu: 'Bypass Статус',
      labelEn: 'Bypass Status',
      value: '100% Undetected',
      change: 'Hyperion V2 Safe',
      subtextRu: 'Полный обход античита',
      subtextEn: 'Full anti-cheat bypass',
      badgeColor: '#10b981',
    },
    {
      labelRu: 'Успешных парирований',
      labelEn: 'Successful Parries',
      value: '1.2M+',
      change: '99.8% Precision',
      subtextRu: 'Зафиксировано симулятором',
      subtextEn: 'Recorded by simulator',
      badgeColor: '#f59e0b',
    },
    {
      labelRu: 'Аптайм сервера',
      labelEn: 'Server Uptime',
      value: '99.9%',
      change: '24/7 Monitored',
      subtextRu: 'Минимальный пинг и задержка',
      subtextEn: 'Minimal ping and latency',
      badgeColor: '#06b6d4',
    },
  ];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.logoGroup}>
          <span style={styles.logoBadge}>HUB</span>
          <h1 style={styles.logoTitle}>Trunkist HUB</h1>
          <span style={styles.subtitle}>MONOLITH EDITION</span>
        </div>
        <button
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          style={styles.langBtn}
        >
          {lang.toUpperCase()}
        </button>
      </header>

      {/* STATS GRID */}
      <div style={styles.statsGrid}>
        {stats.map((st, i) => (
          <div key={i} style={styles.statCard}>
            <div style={{ ...styles.badge, color: st.badgeColor, borderColor: `${st.badgeColor}44` }}>
              {st.change}
            </div>
            <div style={styles.statLabel}>{lang === 'ru' ? st.labelRu : st.labelEn}</div>
            <div style={styles.statValue}>{st.value}</div>
            <div style={styles.statSub}>{lang === 'ru' ? st.subtextRu : st.subtextEn}</div>
          </div>
        ))}
      </div>

      {/* PROFILE CARD */}
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatarBox}>
            <div style={styles.avatarInner}>⚡</div>
            <div style={styles.onlineStatus}>
              <span style={styles.onlineDot} /> ONLINE
            </div>
          </div>

          <div style={styles.profileInfo}>
            <div style={styles.nameRow}>
              <h2 style={styles.userName}>Trunkist</h2>
              <span style={styles.roleBadge}>👑 CREATOR & SCRIPT ARCHITECT</span>
            </div>
            <p style={styles.userSub}>
              Developer of Trunkist HUB Monolith Engine • GitHub: @dayn15220-design
            </p>
            <p style={styles.bio}>
              {lang === 'ru'
                ? 'Главный разработчик архитектуры Trunkist HUB. Специализируется на высокопроизводительных луа-скриптах, алгоритмах автоматического парирования с машинной точностью и безопасных методах инжекта в клиент.'
                : 'Lead architect of Trunkist HUB. Specializes in high-performance Lua scripts, sub-millisecond parry algorithms, and stealth execution techniques for Roblox client.'}
            </p>

            <div style={styles.btnRow}>
              <a
                href="https://github.com/dayn15220-design"
                target="_blank"
                rel="noreferrer"
                style={styles.btnGithub}
              >
                💻 GitHub Profile ↗
              </a>
              <span style={styles.techTag}>⚡ Lua / TypeScript / React / C++</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#07030e',
    color: '#ffffff',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, Roboto, sans-serif',
    padding: '2rem 1rem',
    maxWidth: '1100px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    marginBottom: '2rem',
  },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  logoBadge: {
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    fontWeight: 900,
    fontSize: '0.75rem',
  },
  logoTitle: { margin: 0, fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.05em' },
  subtitle: { color: 'rgba(216, 180, 254, 0.5)', fontSize: '0.75rem', fontWeight: 700 },
  langBtn: {
    background: 'rgba(168, 85, 247, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.4)',
    color: '#d8b4fe',
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  statCard: {
    background: '#120a24',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '16px',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  badge: {
    alignSelf: 'flex-start',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    border: '1px solid',
    background: 'rgba(0,0,0,0.3)',
  },
  statLabel: { fontSize: '0.75rem', color: 'rgba(216, 180, 254, 0.7)', textTransform: 'uppercase' },
  statValue: { fontSize: '1.75rem', fontWeight: 900, fontFamily: 'monospace' },
  statSub: { fontSize: '0.7rem', color: 'rgba(216, 180, 254, 0.5)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' },
  profileCard: {
    background: 'linear-gradient(180deg, #180c33 0%, #0c061a 100%)',
    border: '2px solid rgba(168, 85, 247, 0.4)',
    borderRadius: '24px',
    padding: '2rem',
    boxShadow: '0 0 50px rgba(168, 85, 247, 0.15)',
  },
  profileHeader: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
  avatarBox: { position: 'relative', width: '120px', height: '120px', flexShrink: 0 },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
  },
  onlineStatus: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#064e3b',
    border: '1px solid #10b981',
    color: '#6ee7b7',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  onlineDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#34d399' },
  profileInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  nameRow: { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' },
  userName: { margin: 0, fontSize: '2rem', fontWeight: 900, fontFamily: 'monospace' },
  roleBadge: {
    background: 'linear-gradient(90deg, #e11d48, #9333ea)',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
  userSub: { margin: 0, color: '#d8b4fe', fontSize: '0.8rem', fontWeight: 600 },
  bio: { margin: 0, color: 'rgba(216, 180, 254, 0.8)', fontSize: '0.9rem', lineHeight: 1.5 },
  btnRow: { display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.5rem' },
  btnGithub: {
    background: 'rgba(168, 85, 247, 0.2)',
    border: '1px solid rgba(168, 85, 247, 0.5)',
    color: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    textDecoration: 'none',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  techTag: {
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(216, 180, 254, 0.8)',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
  },
};
