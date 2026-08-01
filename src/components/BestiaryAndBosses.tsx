import React, { useState } from 'react';
import { GAME_BOSSES, BOSS_ENCOUNTER_IMG } from '../data/mockData';
import { EnemyBoss } from '../types';
import { Flame, ShieldAlert, Swords, Skull, Zap, AlertTriangle, RefreshCw, Trophy, Crown } from 'lucide-react';

interface BestiaryAndBossesProps {
  onCastSkill: (skillName: string, damage: number, color: string) => void;
}

export const BestiaryAndBosses: React.FC<BestiaryAndBossesProps> = ({ onCastSkill }) => {
  const [activeBoss, setActiveBoss] = useState<EnemyBoss>(GAME_BOSSES[0]);
  const [bossHealth, setBossHealth] = useState<number>(activeBoss.health);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [enrageSecondsLeft, setEnrageSecondsLeft] = useState<number>(300); // 5 mins
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [lootClaimed, setLootClaimed] = useState<boolean>(false);

  const healthPercent = Math.max(0, Math.round((bossHealth / activeBoss.health) * 100));

  const handleAttackBoss = (damageAmount: number, skillLabel: string) => {
    if (bossHealth <= 0) return;

    const newHp = Math.max(0, bossHealth - damageAmount);
    setBossHealth(newHp);
    onCastSkill(skillLabel, damageAmount, '#f97316');

    const newHpPercent = (newHp / activeBoss.health) * 100;

    // Phase transition check
    if (newHpPercent <= 20 && currentPhaseIndex < 2) {
      setCurrentPhaseIndex(2);
      setCombatLog((prev) => [
        `[¡ALERTA!] ${activeBoss.name} entra en FASE 3: ENRAGE APOCALÍPTICO. Destrucción total de pilares.`,
        ...prev,
      ]);
    } else if (newHpPercent <= 60 && currentPhaseIndex < 1) {
      setCurrentPhaseIndex(1);
      setCombatLog((prev) => [
        `[ALERTA] ${activeBoss.name} entra en FASE 2: Inundación parcial de lava en la arena.`,
        ...prev,
      ]);
    } else {
      setCombatLog((prev) => [`Ataque con ${skillLabel} inflige -${damageAmount.toLocaleString()} HP.`, ...prev]);
    }
  };

  const handleResetBossFight = () => {
    setBossHealth(activeBoss.health);
    setCurrentPhaseIndex(0);
    setEnrageSecondsLeft(300);
    setCombatLog(['El encuentro ha sido reiniciado por el Director de Banda.']);
    setLootClaimed(false);
  };

  const currentPhase = activeBoss.phases[currentPhaseIndex] || activeBoss.phases[0];

  return (
    <div id="bestiary-bosses-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Flame className="w-4 h-4 text-[#ff3e3e]" />
            <span>Bestiario Ancestral & Encuentros de Raid AAA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Jefes Gigantes de Zanja & Mecánicas de Banda
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Simulador de combate contra jefes gigantes multi-fase. Experimenta destructibilidad del entorno, límites de tiempo enrage y botín de rareza Ancestral.
          </p>
        </div>
      </div>

      {/* Main Boss Fight Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Boss View & Live Health Bar */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          {/* Boss Header Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] mono text-[#ff3e3e] uppercase font-bold tracking-wider block">
                {activeBoss.title}
              </span>
              <h3 className="text-2xl font-black text-white cinzel tracking-wider">{activeBoss.name}</h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded bg-[#ff3e3e]/20 text-[#ff3e3e] mono text-xs border border-[#ff3e3e]/40 font-bold uppercase tracking-wider">
                FASE {currentPhase.phaseNumber}: {currentPhase.name}
              </span>
            </div>
          </div>

          {/* Boss Image Banner */}
          <div className="relative rounded overflow-hidden border border-white/10 h-[340px] sm:h-[420px] bg-[#050505]">
            <img
              src={activeBoss.imageUrl}
              alt={activeBoss.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />

            {/* Health Bar Overlay */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2 p-4 rounded bg-[#050505]/90 border border-[#ff3e3e]/40 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs mono font-bold">
                <span className="text-white flex items-center space-x-2">
                  <Skull className="w-4 h-4 text-[#ff3e3e]" />
                  <span>SALUD DEL JEFE DE RAID</span>
                </span>
                <span className="text-[#ff3e3e]">{bossHealth.toLocaleString()} / {activeBoss.health.toLocaleString()} HP ({healthPercent}%)</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-black rounded-full h-4 overflow-hidden border border-[#ff3e3e]/30 p-0.5">
                <div
                  className="bg-gradient-to-r from-[#ff3e3e] via-[#c5a059] to-[#ff3e3e] h-full rounded-full transition-all duration-300 shadow-md shadow-red-900/50"
                  style={{ width: `${healthPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Attack Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => handleAttackBoss(150000, 'Tajo Fuerte de Mandoble')}
              className="py-2.5 px-3 rounded bg-[#050505] hover:bg-white/10 border border-[#c5a059]/40 text-[#c5a059] font-bold text-xs active:scale-95 transition cinzel"
            >
              Tajo Mandoble (-150k)
            </button>

            <button
              onClick={() => handleAttackBoss(450000, 'Ultimate Rúnico 5v5')}
              className="py-2.5 px-3 rounded bg-[#ff3e3e] text-white font-bold text-xs active:scale-95 transition shadow-lg cinzel uppercase tracking-wider"
            >
              ¡Ultimate Rúnica! (-450k)
            </button>

            <button
              onClick={() => handleAttackBoss(750000, 'Cataclismo de Banda')}
              className="py-2.5 px-3 rounded bg-[#c5a059] text-black font-bold text-xs active:scale-95 transition shadow-lg cinzel uppercase tracking-wider"
            >
              Combo Banda (-750k)
            </button>

            <button
              onClick={handleResetBossFight}
              className="py-2.5 px-3 rounded bg-[#050505] hover:bg-white/5 text-white/50 border border-white/10 text-xs mono flex items-center justify-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reiniciar Raid</span>
            </button>
          </div>
        </div>

        {/* Boss Mechanics & Loot Inspector */}
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs mono text-[#c5a059] uppercase font-bold block">
              Mecánicas de Fase Actual:
            </span>
            <div className="p-3 rounded bg-[#050505] border border-[#ff3e3e]/30 text-xs space-y-1">
              <span className="font-bold text-[#ff3e3e] block">Ataque Especial: {currentPhase.specialAttack}</span>
              <p className="text-white/60">Destrucción: {currentPhase.enviroDestruction}</p>
            </div>
          </div>

          {/* Weakness & Threat */}
          <div className="space-y-2 text-xs mono">
            <span className="text-white/50 block font-bold">Punto Débil del Jefe:</span>
            <div className="p-2.5 rounded bg-[#050505] border border-white/10 text-[#38bdf8]">
              {activeBoss.weakness}
            </div>
          </div>

          {/* Combat Event Log */}
          <div className="space-y-2">
            <span className="text-xs mono font-bold text-white/80 block">Registro de Eventos:</span>
            <div className="p-3 rounded bg-[#050505] border border-white/10 text-[11px] mono text-[#c5a059] space-y-1 h-32 overflow-y-auto">
              {combatLog.length === 0 ? (
                <span className="text-white/30">Comienza el ataque para ver las mecánicas.</span>
              ) : (
                combatLog.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          </div>

          {/* Loot Reward Box */}
          {bossHealth <= 0 && (
            <div className="p-4 rounded bg-[#c5a059]/10 border border-[#c5a059] text-[#c5a059] space-y-3 animate-fadeIn gold-glow">
              <div className="flex items-center space-x-2 font-bold cinzel text-base text-[#c5a059]">
                <Crown className="w-5 h-5 text-[#c5a059]" />
                <span>¡JEFE DE RAID DERROTADO!</span>
              </div>

              <div className="space-y-1 text-xs mono">
                <span className="text-white/80 block font-bold">Botín Mítico Obtenido:</span>
                {activeBoss.drops.map((drop) => (
                  <div key={drop.itemName} className="flex justify-between p-1.5 rounded bg-[#050505] text-white/80 border border-white/5">
                    <span>{drop.itemName}</span>
                    <span className="text-[#c5a059] font-bold">{drop.rarity}</span>
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
