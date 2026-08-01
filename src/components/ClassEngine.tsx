import React, { useState } from 'react';
import { GAME_CLASSES } from '../data/mockData';
import { CharacterClass, Skill } from '../types';
import { Swords, Shield, Zap, Sparkles, Flame, Eye, Crown, Target, Heart, Wand2 } from 'lucide-react';

interface ClassEngineProps {
  onCastSkill: (skillName: string, damage: number, color: string) => void;
}

export const ClassEngine: React.FC<ClassEngineProps> = ({ onCastSkill }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(GAME_CLASSES[0].id);
  const [activeTab, setActiveTab] = useState<'skills' | 'evolutions' | 'stats'>('skills');

  const selectedClass: CharacterClass =
    GAME_CLASSES.find((c) => c.id === selectedClassId) || GAME_CLASSES[0];

  return (
    <div id="class-engine-container" className="space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Swords className="w-4 h-4" />
            <span>Sistema de Clases Legado DE AETHELGARD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            10 Clases Legendarias & Árboles de Habilidades
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Cada clase cuenta con sus propias activas, pasivas, ultimate devastadora, especializaciones de evolución y armas legendarias.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-black p-1.5 rounded border border-white/10">
          <span className="text-xs text-white/40 px-3 mono">Arquetipo:</span>
          <span className="px-2.5 py-1 rounded bg-[#c5a059]/20 text-[#c5a059] text-xs font-bold mono">
            {selectedClass.archetype}
          </span>
        </div>
      </div>

      {/* Class Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {GAME_CLASSES.map((cls) => {
          const isSelected = cls.id === selectedClassId;
          return (
            <button
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-3 rounded border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#c5a059]/15 border-[#c5a059] text-white shadow-lg gold-glow scale-[1.02]'
                  : 'bg-black/80 border-white/10 text-white/50 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] mono font-bold ${isSelected ? 'text-[#c5a059]' : 'text-white/40'}`}>
                  {cls.archetype}
                </span>
                <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/50 border border-white/5 mono">
                  {cls.role}
                </span>
              </div>
              <div className="text-sm font-bold text-white truncate cinzel tracking-wider">{cls.name}</div>
            </button>
          );
        })}
      </div>

      {/* Class Details Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Overview Sidebar */}
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs mono text-[#c5a059] font-bold uppercase tracking-wider">
                {selectedClass.archetype} • {selectedClass.role}
              </span>
              <span className="text-xs bg-white/5 px-2 py-0.5 rounded text-white/60 mono">
                Dificultad: {selectedClass.stats.difficulty}%
              </span>
            </div>

            <h3 className="text-3xl font-black text-white cinzel tracking-wider">{selectedClass.name}</h3>

            <p className="text-[#c5a059]/90 text-xs italic cinzel leading-relaxed">
              "{selectedClass.quote}"
            </p>

            <p className="text-white/70 text-xs leading-relaxed pt-2 border-t border-white/10">
              {selectedClass.description}
            </p>
          </div>

          {/* Primary Weapon */}
          <div className="p-3.5 rounded bg-[#050505] border border-[#c5a059]/20 space-y-1">
            <span className="text-[10px] mono uppercase text-white/40 block">Arma Primaria Predilecta:</span>
            <div className="text-sm font-bold text-[#c5a059] flex items-center space-x-2 cinzel">
              <Swords className="w-4 h-4" />
              <span>{selectedClass.primaryWeapon}</span>
            </div>
          </div>

          {/* Quick Stat Bar Summary */}
          <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
            <span className="font-bold text-white/80 block mb-2 mono uppercase text-[11px]">
              Atributos Base
            </span>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-white/50">
                <span>Fuerza / Ataque</span>
                <span className="mono text-[#c5a059]">{selectedClass.stats.strength}</span>
              </div>
              <div className="w-full bg-[#050505] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#c5a059] h-full" style={{ width: `${selectedClass.stats.strength}%` }} />
              </div>

              <div className="flex justify-between text-[11px] text-white/50">
                <span>Agilidad / Velocidad</span>
                <span className="mono text-[#38bdf8]">{selectedClass.stats.agility}</span>
              </div>
              <div className="w-full bg-[#050505] rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#38bdf8] h-full" style={{ width: `${selectedClass.stats.agility}%` }} />
              </div>

              <div className="flex justify-between text-[11px] text-white/50">
                <span>Inteligencia / Mana</span>
                <span className="mono text-purple-400">{selectedClass.stats.intelligence}</span>
              </div>
              <div className="w-full bg-[#050505] rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-full" style={{ width: `${selectedClass.stats.intelligence}%` }} />
              </div>

              <div className="flex justify-between text-[11px] text-white/50">
                <span>Defensa / Armadura</span>
                <span className="mono text-emerald-400">{selectedClass.stats.defense}</span>
              </div>
              <div className="w-full bg-[#050505] rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${selectedClass.stats.defense}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Class Content Interactive View (Skills / Evolutions) */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          {/* Tabs */}
          <div className="flex space-x-2 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider mono transition ${
                activeTab === 'skills'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'bg-[#050505] text-white/50 hover:text-white'
              }`}
            >
              Árbol de Habilidades ({selectedClass.skills.length})
            </button>

            <button
              onClick={() => setActiveTab('evolutions')}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider mono transition ${
                activeTab === 'evolutions'
                  ? 'bg-[#c5a059] text-black shadow-md'
                  : 'bg-[#050505] text-white/50 hover:text-white'
              }`}
            >
              Evoluciones ({selectedClass.evolutions.length})
            </button>
          </div>

          {/* Skills List */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <p className="text-xs text-white/50">
                Haz clic en cualquier habilidad para simular su ejecución en tiempo real.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedClass.skills.map((skill: Skill) => (
                  <div
                    key={skill.id}
                    onClick={() => onCastSkill(skill.name, skill.type === 'Ultimate' ? 2400 : 650, skill.particleColor)}
                    className="p-4 rounded bg-[#050505] border border-white/10 hover:border-[#c5a059]/60 transition cursor-pointer group space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded flex items-center justify-center font-bold text-black shadow-md shrink-0"
                          style={{ backgroundColor: skill.particleColor }}
                        >
                          <Zap className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#c5a059] transition cinzel">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] mono text-white/40 uppercase">
                            Tipo: {skill.type} • {skill.damageType}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] mono px-2 py-0.5 rounded bg-black border border-white/10 text-[#c5a059]">
                        {skill.cooldown > 0 ? `${skill.cooldown}s CD` : 'PASIVA'}
                      </span>
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-white/40 pt-2 border-t border-white/5 mono">
                      <span>Mana: {skill.cost}</span>
                      <span className="text-[#c5a059] group-hover:underline">Simular →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evolutions Branch */}
          {activeTab === 'evolutions' && (
            <div className="space-y-4">
              <p className="text-xs text-white/50">
                Al alcanzar el Nivel 50, puedes especializar tu clase en dos maestrias ancestrales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedClass.evolutions.map((evo) => (
                  <div key={evo.name} className="p-5 rounded bg-[#050505] border border-[#c5a059]/30 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/40">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#c5a059] cinzel">{evo.name}</h4>
                        <span className="text-xs text-white/50 mono">{evo.title}</span>
                      </div>
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed">
                      {evo.description}
                    </p>

                    <div className="p-2.5 rounded bg-black text-xs mono text-emerald-400 border border-emerald-500/20">
                      Bono Pasivo: {evo.bonus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
