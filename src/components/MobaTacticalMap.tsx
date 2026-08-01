import React, { useState } from 'react';
import { MOBA_MAP_IMG, MOBA_LANES } from '../data/mockData';
import { Map, Shield, Swords, Eye, Flame, Trophy, Play, RotateCcw, Crosshair } from 'lucide-react';

interface MobaTacticalMapProps {
  onCastSkill: (skillName: string, damage: number, color: string) => void;
}

export const MobaTacticalMap: React.FC<MobaTacticalMapProps> = ({ onCastSkill }) => {
  const [selectedLane, setSelectedLane] = useState<string>(MOBA_LANES[1].name);
  const [showWards, setShowWards] = useState<boolean>(true);
  const [simulatingTeamfight, setSimulatingTeamfight] = useState<boolean>(false);
  const [teamfightLog, setTeamfightLog] = useState<string[]>([]);
  const [radiantScore, setRadiantScore] = useState<number>(14);
  const [direScore, setDireScore] = useState<number>(11);

  const activeLane = MOBA_LANES.find((l) => l.name === selectedLane) || MOBA_LANES[0];

  const handleStartSimulatedTeamfight = () => {
    setSimulatingTeamfight(true);
    setTeamfightLog(['[00:05] Se inicia disputa por la Runa de Doble Daño en el Río de Aethelgard.']);

    setTimeout(() => {
      setTeamfightLog((prev) => [
        ...prev,
        '[00:12] ¡Kaelen ejecuta Ultimate Apocalipsis Rúnico atrapando a 3 héroes enemigos!',
      ]);
      onCastSkill('Apocalipsis Rúnico 5v5', 3200, '#dc2626');
      setRadiantScore((s) => s + 2);
    }, 1500);

    setTimeout(() => {
      setTeamfightLog((prev) => [
        ...prev,
        '[00:20] El Archimago Sol lanza Lluvia de Meteoros limpiando la torre enemigo de Mid.',
        '[00:25] ¡ACE! Equipo Radiant toma el control de la Fosa de Aethelgard.',
      ]);
      setRadiantScore((s) => s + 3);
      setSimulatingTeamfight(false);
    }, 3500);
  };

  return (
    <div id="moba-map-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Map className="w-4 h-4" />
            <span>Sistema Competitivo MOBA 5v5</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Arena de Aethelgard: Mapa Táctico 5 vs 5
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Inspirado en la profundidad de Dota 2 y la agilidad de League of Legends. Tres carriles, bases ancestrales, jungla profunda y el Titán Neutral de Aethelgard.
          </p>
        </div>

        {/* Live Scoreboard */}
        <div className="flex items-center space-x-4 p-3 rounded bg-black border border-white/10">
          <div className="text-center">
            <span className="text-[10px] mono text-[#38bdf8] uppercase block font-bold">RADIANT</span>
            <span className="text-2xl font-black text-[#38bdf8] mono">{radiantScore}</span>
          </div>
          <span className="text-white/30 font-black text-lg">VS</span>
          <div className="text-center">
            <span className="text-[10px] mono text-[#ff3e3e] uppercase block font-bold">DIRE</span>
            <span className="text-2xl font-black text-[#ff3e3e] mono">{direScore}</span>
          </div>
        </div>
      </div>

      {/* Main MOBA Canvas & Tactical Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white mono flex items-center space-x-2">
              <Crosshair className="w-4 h-4 text-[#c5a059]" />
              <span>Mapa Táctico en Tiempo Real (Unreal Engine 5 Render)</span>
            </h3>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowWards(!showWards)}
                className={`px-3 py-1 rounded text-xs mono transition flex items-center space-x-1.5 ${
                  showWards
                    ? 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                    : 'bg-[#050505] text-white/40'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showWards ? 'Centinelas Visibles' : 'Niebla de Guerra'}</span>
              </button>
            </div>
          </div>

          {/* MOBA Arena Image Container with Interactive Overlay Markers */}
          <div className="relative rounded overflow-hidden border border-white/10 h-[380px] sm:h-[450px] bg-[#050505] group">
            <img
              src={MOBA_MAP_IMG}
              alt="MOBA Map Overview 8K"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/30 pointer-events-none" />

            {/* Tactical Ward Vision Circles */}
            {showWards && (
              <>
                <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/50 animate-ping pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8]/50 animate-ping pointer-events-none" />
              </>
            )}

            {/* Lane Pins */}
            <button
              onClick={() => setSelectedLane('Carril Superior')}
              className={`absolute top-12 left-1/4 px-2.5 py-1 rounded text-[10px] mono font-bold shadow-lg transition uppercase tracking-wider ${
                selectedLane === 'Carril Superior'
                  ? 'bg-[#c5a059] text-black scale-110'
                  : 'bg-black/90 text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#c5a059] hover:text-black'
              }`}
            >
              TOP LANE
            </button>

            <button
              onClick={() => setSelectedLane('Carril Central')}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded text-[10px] mono font-bold shadow-lg transition uppercase tracking-wider ${
                selectedLane === 'Carril Central'
                  ? 'bg-[#c5a059] text-black scale-110'
                  : 'bg-black/90 text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#c5a059] hover:text-black'
              }`}
            >
              MID LANE
            </button>

            <button
              onClick={() => setSelectedLane('Carril Inferior')}
              className={`absolute bottom-12 right-1/4 px-2.5 py-1 rounded text-[10px] mono font-bold shadow-lg transition uppercase tracking-wider ${
                selectedLane === 'Carril Inferior'
                  ? 'bg-[#c5a059] text-black scale-110'
                  : 'bg-black/90 text-[#c5a059] border border-[#c5a059]/40 hover:bg-[#c5a059] hover:text-black'
              }`}
            >
              BOT LANE
            </button>

            <button
              onClick={() => setSelectedLane('Fosa de Aethelgard')}
              className={`absolute top-1/3 right-1/3 px-2.5 py-1 rounded text-[10px] mono font-bold shadow-lg transition uppercase tracking-wider ${
                selectedLane === 'Fosa de Aethelgard'
                  ? 'bg-[#ff3e3e] text-white scale-110 border border-[#c5a059]'
                  : 'bg-black/90 text-[#ff3e3e] border border-[#ff3e3e]/40 hover:bg-[#ff3e3e] hover:text-white'
              }`}
            >
              FOSA DE TITÁN
            </button>
          </div>
        </div>

        {/* Tactical Lane & Match Inspector */}
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs mono text-[#c5a059] uppercase font-bold block">
              Inspector de Zona:
            </span>
            <h3 className="text-xl font-bold text-white cinzel tracking-wider">{activeLane.name}</h3>
            <p className="text-xs text-white/70 leading-relaxed">{activeLane.recommendedStrategy}</p>
          </div>

          <div className="p-3.5 rounded bg-[#050505] border border-white/10 space-y-2 text-xs mono">
            <div className="flex justify-between text-white/50">
              <span>Torres Radiant Restantes:</span>
              <span className="text-[#38bdf8] font-bold">{activeLane.towersLeft.radiants} / 3</span>
            </div>
            <div className="flex justify-between text-white/50">
              <span>Torres Dire Restantes:</span>
              <span className="text-[#ff3e3e] font-bold">{activeLane.towersLeft.dire} / 3</span>
            </div>
            <div className="flex justify-between text-white/50 pt-1 border-t border-white/5">
              <span>Jefe Neutral Fosa:</span>
              <span className="text-[#c5a059] font-bold">{activeLane.neutralBossState}</span>
            </div>
          </div>

          {/* Teamfight Simulation Trigger */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleStartSimulatedTeamfight}
              disabled={simulatingTeamfight}
              className="w-full py-3 rounded bg-[#c5a059] text-black font-bold text-xs hover:bg-[#d4af37] transition shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 cinzel tracking-wider uppercase"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{simulatingTeamfight ? 'Simulando Pelea 5v5...' : 'Simular Pelea 5v5'}</span>
            </button>

            {teamfightLog.length > 0 && (
              <div className="p-3 rounded bg-[#050505] border border-[#c5a059]/30 text-[11px] mono text-[#c5a059] space-y-1 max-h-40 overflow-y-auto">
                <span className="text-xs font-bold text-white block mb-1">Registro de Pelea:</span>
                {teamfightLog.map((log, i) => (
                  <div key={i} className="leading-snug">{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
