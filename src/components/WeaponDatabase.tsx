import React, { useState } from 'react';
import { LanguageType } from '../types';
import { motion } from 'motion/react';
import { Crosshair, CheckCircle2 } from 'lucide-react';

export interface WeaponStat {
  id: string;
  name: string;
  type: 'Heavy' | 'Light' | 'Special';
  damage: number;
  parryWindowMs: number;
  attackSpeed: number;
  rangeStuds: number;
  bleedDamage: number;
  staminaCost: number;
  descriptionRu: string;
  descriptionEn: string;
}

interface WeaponDatabaseProps {
  lang: LanguageType;
}

const WEAPONS: WeaponStat[] = [
  {
    id: 'dsk',
    name: 'Dragon Slayer (DSK)',
    type: 'Heavy',
    damage: 95,
    parryWindowMs: 650,
    attackSpeed: 1.1,
    rangeStuds: 14.5,
    bleedDamage: 25,
    staminaCost: 35,
    descriptionRu: 'Тяжелейший меч с огромным уроном по области и повышенным кровотечением.',
    descriptionEn: 'Devastating heavy sword with massive area damage and heavy bleed status.',
  },
  {
    id: 'halberd',
    name: 'Halberd',
    type: 'Heavy',
    damage: 75,
    parryWindowMs: 520,
    attackSpeed: 1.4,
    rangeStuds: 16.0,
    bleedDamage: 15,
    staminaCost: 28,
    descriptionRu: 'Длинное копьё с малым окном для парирования на дистанции.',
    descriptionEn: 'Long polearm with wide reach and medium windup window.',
  },
  {
    id: 'scythe',
    name: 'Scythe of Dread',
    type: 'Special',
    damage: 82,
    parryWindowMs: 440,
    attackSpeed: 1.6,
    rangeStuds: 13.8,
    bleedDamage: 30,
    staminaCost: 30,
    descriptionRu: 'Жнец душ с быстрым рывком и двойным рассечением.',
    descriptionEn: 'Soul harvester with fast dash strikes and double slash combos.',
  },
  {
    id: 'katana',
    name: 'Ghost Katana',
    type: 'Light',
    damage: 48,
    parryWindowMs: 320,
    attackSpeed: 2.4,
    rangeStuds: 10.5,
    bleedDamage: 10,
    staminaCost: 15,
    descriptionRu: 'Молниеносные выпады с эффектом тяжелого кровотечения.',
    descriptionEn: 'Lightning-fast strikes with heavy bleeding stack capability.',
  },
];

export const WeaponDatabase: React.FC<WeaponDatabaseProps> = ({ lang }) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = WEAPONS.filter((w) => {
    const matchesType = selectedType === 'All' || w.type === selectedType;
    const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="bg-[#120a24] rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crosshair className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {lang === 'ru' ? 'Арсенал Оружия & Таймингов CW' : 'Combat Warriors Weapon & DPS Database'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-600/60 text-purple-300 text-xs font-mono font-bold shadow-md">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>ACTIVE</span>
            </div>

            <div className="flex items-center gap-1">
              {['All', 'Heavy', 'Light', 'Special'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-[#090514] text-purple-300 hover:text-white border border-purple-900/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weapons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filtered.map((w) => (
            <motion.div
              key={w.id}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-[#090514] p-5 rounded-2xl border border-purple-900/50 space-y-3 shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-mono font-bold text-sm text-white">{w.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60">
                    {w.type} Weapon
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-purple-400">{w.damage} DMG</span>
                </div>
              </div>

              <p className="text-xs text-purple-200/80 font-mono">{lang === 'ru' ? w.descriptionRu : w.descriptionEn}</p>

              {/* Stats Bars */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-purple-900/40">
                <div className="flex justify-between">
                  <span className="text-purple-300/60">Parry Window:</span>
                  <span className="text-purple-300 font-bold">{w.parryWindowMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300/60">Attack Range:</span>
                  <span className="text-purple-300 font-bold">{w.rangeStuds} studs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300/60">Bleed Dmg:</span>
                  <span className="text-purple-300 font-bold">+{w.bleedDamage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300/60">Stamina:</span>
                  <span className="text-purple-300 font-bold">{w.staminaCost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
