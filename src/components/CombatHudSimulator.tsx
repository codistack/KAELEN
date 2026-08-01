import React, { useState } from 'react';
import { Sparkles, Shield, Swords, Zap, Crosshair, Flame, Heart, RefreshCw, Trophy } from 'lucide-react';

interface CombatHudSimulatorProps {
  onCastSkill: (skillName: string, damage: number, color: string) => void;
}

export const CombatHudSimulator: React.FC<CombatHudSimulatorProps> = ({ onCastSkill }) => {
  const [heroHp, setHeroHp] = useState<number>(3400);
  const maxHp = 4200;
  const [heroMana, setHeroMana] = useState<number>(850);
  const maxMana = 1200;
  const [xp, setXp] = useState<number>(75); // %
  const [targetType, setTargetType] = useState<'Muñeco de Pruebas' | 'Oleada de Súbditos' | 'Jefe Titán'>('Muñeco de Pruebas');
  const [targetHp, setTargetHp] = useState<number>(10000);

  // Skill cooldowns in progress
  const [cooldowns, setCooldowns] = useState<{ [key: string]: number }>({});
  const [floatingDamage, setFloatingDamage] = useState<{ id: number; text: string; color: string; x: number; y: number }[]>([]);

  const skillHotbar = [
    { key: 'Q', name: 'Corte Rúnico', cd: 4, cost: 40, damage: 480, color: '#ef4444' },
    { key: 'W', name: 'Sombra Asfixiante', cd: 8, cost: 65, damage: 750, color: '#8b5cf6' },
    { key: 'E', name: 'Escudo de Abismo', cd: 10, cost: 50, damage: 0, color: '#06b6d4' },
    { key: 'R', name: 'Ultimate Apocalipsis', cd: 60, cost: 150, damage: 2800, color: '#eab308' },
    { key: 'D', name: 'Destello Astral', cd: 90, cost: 0, damage: 0, color: '#38bdf8' },
    { key: 'F', name: 'Ignición Caótica', cd: 120, cost: 0, damage: 1200, color: '#f97316' },
  ];

  const handleCastHotbarSkill = (skill: typeof skillHotbar[0]) => {
    if (cooldowns[skill.key] || heroMana < skill.cost) return;

    // Deduct mana
    setHeroMana((prev) => Math.max(0, prev - skill.cost));

    // Damage target
    if (skill.damage > 0) {
      setTargetHp((prev) => Math.max(0, prev - skill.damage));

      // Trigger floating damage text
      const newDmgId = Date.now();
      const popup = {
        id: newDmgId,
        text: `-${skill.damage}`,
        color: skill.color,
        x: Math.random() * 40 + 30, // %
        y: Math.random() * 30 + 30, // %
      };
      setFloatingDamage((prev) => [...prev, popup]);

      setTimeout(() => {
        setFloatingDamage((prev) => prev.filter((p) => p.id !== newDmgId));
      }, 1000);
    }

    onCastSkill(skill.name, skill.damage, skill.color);

    // Set CD timer
    setCooldowns((prev) => ({ ...prev, [skill.key]: skill.cd }));
    const interval = setInterval(() => {
      setCooldowns((prev) => {
        const remaining = (prev[skill.key] || 0) - 1;
        if (remaining <= 0) {
          clearInterval(interval);
          const copy = { ...prev };
          delete copy[skill.key];
          return copy;
        }
        return { ...prev, [skill.key]: remaining };
      });
    }, 1000);
  };

  return (
    <div id="combat-hud-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interfaz HUD Interactivo AAA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Simulador de HUD de Combate en Vivo
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Prueba el HUD de juego en directo: presiona las teclas (Q, W, E, R, D, F) o haz clic en las habilidades para desatar combos sobre el objetivo.
          </p>
        </div>

        {/* Target Selector */}
        <div className="flex items-center space-x-2 bg-[#050505] p-1.5 rounded border border-white/10 text-xs mono">
          <span className="text-white/40 px-2">Objetivo:</span>
          {(['Muñeco de Pruebas', 'Oleada de Súbditos', 'Jefe Titán'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTargetType(t);
                setTargetHp(t === 'Jefe Titán' ? 50000 : 10000);
              }}
              className={`px-2.5 py-1 rounded transition uppercase tracking-wider ${
                targetType === t ? 'bg-[#c5a059] text-black font-bold' : 'text-white/50 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Full Simulated In-Game Screen Frame */}
      <div className="relative rounded-xl overflow-hidden border border-[#c5a059]/40 bg-[#050505] h-[520px] shadow-2xl flex flex-col justify-between p-4 font-sans select-none gold-glow">
        {/* Top Bar Scoreboard HUD */}
        <div className="flex items-center justify-between bg-black/90 backdrop-blur-md p-2.5 rounded border border-white/10 text-xs mono">
          <div className="flex items-center space-x-4">
            <span className="text-[#c5a059] font-bold">Kaelen (Nivel 18)</span>
            <span className="text-[#38bdf8]">KDA: <strong className="text-white">12 / 2 / 8</strong></span>
            <span className="text-[#c5a059]">CS: <strong className="text-white">245</strong></span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 font-bold">Oro: 14,850g</span>
            <span className="text-white/40">FPS: <strong className="text-emerald-400">144.0 UE5</strong></span>
          </div>
        </div>

        {/* Center Target Combat Zone */}
        <div className="relative flex-1 flex flex-col items-center justify-center space-y-3">
          {/* Floating Damage Text Overlay */}
          {floatingDamage.map((d) => (
            <div
              key={d.id}
              className="absolute font-black cinzel text-3xl animate-ping pointer-events-none drop-shadow-md"
              style={{
                left: `${d.x}%`,
                top: `${d.y}%`,
                color: d.color,
              }}
            >
              {d.text}
            </div>
          ))}

          {/* Target Health Card */}
          <div className="p-4 rounded bg-black/80 border border-white/10 text-center space-y-2 w-72 backdrop-blur-md">
            <span className="text-xs mono text-white/60 font-bold uppercase block">{targetType}</span>
            <div className="text-sm font-black text-[#c5a059] mono">{targetHp.toLocaleString()} HP</div>
            <div className="w-full bg-[#050505] rounded-full h-2 overflow-hidden border border-white/5">
              <div
                className="bg-[#ff3e3e] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (targetHp / (targetType === 'Jefe Titán' ? 50000 : 10000)) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Main Action Bar HUD */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-black/95 backdrop-blur-md p-3 rounded-xl border border-[#c5a059]/30">
          {/* Health & Mana Bars */}
          <div className="w-full md:w-64 space-y-1.5 text-xs mono font-bold">
            {/* Health */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[11px] text-[#ff3e3e]">
                <span>VIDA</span>
                <span>{heroHp} / {maxHp}</span>
              </div>
              <div className="w-full bg-[#050505] rounded-full h-3 overflow-hidden border border-[#ff3e3e]/40 p-0.5">
                <div className="bg-[#ff3e3e] h-full rounded-full" style={{ width: `${(heroHp / maxHp) * 100}%` }} />
              </div>
            </div>

            {/* Mana */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[11px] text-[#38bdf8]">
                <span>MANA</span>
                <span>{heroMana} / {maxMana}</span>
              </div>
              <div className="w-full bg-[#050505] rounded-full h-2.5 overflow-hidden border border-[#38bdf8]/40 p-0.5">
                <div className="bg-[#38bdf8] h-full rounded-full" style={{ width: `${(heroMana / maxMana) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Ability Hotbar (Q, W, E, R, D, F) */}
          <div className="flex items-center space-x-2">
            {skillHotbar.map((s) => {
              const cd = cooldowns[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => handleCastHotbarSkill(s)}
                  disabled={Boolean(cd)}
                  className={`relative w-12 h-12 rounded border flex flex-col items-center justify-center mono font-bold transition active:scale-95 ${
                    cd
                      ? 'bg-[#050505] border-white/5 text-white/20'
                      : 'bg-black/90 border-[#c5a059]/50 hover:border-[#c5a059] text-[#c5a059] shadow-md'
                  }`}
                >
                  <span className="text-[10px] text-white/40 absolute top-0.5 left-1">{s.key}</span>
                  <Zap className="w-4 h-4 mt-2" style={{ color: cd ? '#475569' : s.color }} />

                  {/* Cooldown Overlay */}
                  {cd && (
                    <div className="absolute inset-0 bg-[#050505]/90 rounded flex items-center justify-center text-sm text-[#c5a059] font-bold">
                      {cd}s
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Interactive Refill Mana/HP Button */}
          <button
            onClick={() => {
              setHeroHp(maxHp);
              setHeroMana(maxMana);
              setTargetHp(targetType === 'Jefe Titán' ? 50000 : 10000);
            }}
            className="px-3 py-2 rounded bg-[#050505] hover:bg-white/5 border border-white/10 text-xs mono text-white/70 flex items-center space-x-1.5"
            title="Recargar Vida, Mana y Objetivo"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Recargar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
