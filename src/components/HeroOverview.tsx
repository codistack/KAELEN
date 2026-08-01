import React, { useState } from 'react';
import { Shield, Sparkles, Flame, Zap, Eye, Wind, Sword, RefreshCw, Layers, Crosshair } from 'lucide-react';
import { HERO_REF_FACE, HERO_BANNER_IMG } from '../data/mockData';

interface HeroOverviewProps {
  onCastSkill: (skillName: string, damage: number, color: string) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ onCastSkill }) => {
  const [auraColor, setAuraColor] = useState<string>('#06b6d4'); // Cyan
  const [capePhysics, setCapePhysics] = useState<boolean>(true);
  const [windSpeed, setWindSpeed] = useState<number>(75);
  const [activeStance, setActiveStance] = useState<'Ataque' | 'Guardia' | 'Canalización'>('Ataque');
  const [showFaceDetailModal, setShowFaceDetailModal] = useState<boolean>(false);
  const [castingAnimation, setCastingAnimation] = useState<string | null>(null);

  const auraPresets = [
    { name: 'Runa Cian Abisal', color: '#06b6d4', glow: 'shadow-cyan-500/50' },
    { name: 'Fuego Carmesí', color: '#dc2626', glow: 'shadow-red-500/50' },
    { name: 'Sol Dorado', color: '#eab308', glow: 'shadow-yellow-500/50' },
    { name: 'Sombra Purpúrea', color: '#8b5cf6', glow: 'shadow-purple-500/50' },
  ];

  const handleTriggerAbility = (abilityName: string, dmg: number, color: string) => {
    setCastingAnimation(abilityName);
    onCastSkill(abilityName, dmg, color);
    setTimeout(() => {
      setCastingAnimation(null);
    }, 1200);
  };

  return (
    <div id="hero-overview-container" className="space-y-8 animate-fadeIn">
      {/* Hero Showcase Hero Section */}
      <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/30 bg-[#0a0a0a] shadow-2xl gold-glow">
        {/* Banner Image Background */}
        <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden">
          <img
            src={HERO_BANNER_IMG}
            alt="Kaelen el Primogénito Banner"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top transition-transform duration-1000 scale-105 hover:scale-100 opacity-90"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent" />

          {/* Dynamic Aura Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-40 mix-blend-screen hero-mask"
            style={{
              background: `radial-gradient(circle at 50% 40%, ${auraColor} 0%, transparent 70%)`
            }}
          />

          {/* Floating Hero Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/40 text-[#c5a059] text-xs mono font-bold uppercase tracking-widest">
                  Protagonista Principal • Leyenda
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs mono">
                  Clase: Caballero Oscuro Rúnico
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black cinzel text-white tracking-wider leading-none drop-shadow-md">
                KAELEN <span className="text-[#c5a059] font-light">EL PRIMOGÉNITO</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                Reinterpretación original basada en la referencia visajística ancestral. Portador del Mandoble Rúnico del Caos, Kaelen combina una armadura de placas ornamentales, capa con simulación física Chaos, guanteletes bendecidos y ojos imbuidos de energía estelar.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFaceDetailModal(true)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded bg-black/80 border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition font-semibold text-xs sm:text-sm shadow-lg tracking-wider uppercase mono"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Rostro & Detalles</span>
              </button>

              <button
                onClick={() => handleTriggerAbility('Ultimate: Apocalipsis Rúnico', 3500, auraColor)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded bg-[#c5a059] text-black font-bold hover:bg-[#d4af37] transition text-xs sm:text-sm shadow-xl shadow-[#c5a059]/20 active:scale-95 cinzel tracking-widest uppercase"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Ejecutar Ultimate</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Face & Visual Details Reference Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reference Image Card */}
        <div id="hero-face-reference-card" className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 cinzel tracking-wider">
              <Eye className="w-5 h-5 text-[#c5a059]" />
              <span>Rostro de Referencia</span>
            </h3>
            <span className="text-[10px] bg-white/5 text-[#c5a059] mono px-2 py-0.5 rounded border border-[#c5a059]/30">
              Original Design
            </span>
          </div>

          <div className="relative rounded overflow-hidden border border-white/10 bg-[#050505] group h-64">
            <img
              src={HERO_REF_FACE}
              alt="Protagonist Face Reference"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/70 mono">
              Rasgos: Mirada penetrante, ojos incandescentes, cabello dinámico, cicatriz de batalla arcana.
            </div>
          </div>
        </div>

        {/* Dynamic Customization & Physics Controls */}
        <div id="hero-customizer-card" className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-5 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 cinzel tracking-wider">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <span>Aura & Físicas UE 5.5</span>
          </h3>

          {/* Aura Picker */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mono">
              Color de Aura Rúnica
            </label>
            <div className="grid grid-cols-2 gap-2">
              {auraPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setAuraColor(preset.color)}
                  className={`flex items-center space-x-2 p-2 rounded border text-xs text-left transition ${
                    auraColor === preset.color
                      ? 'border-[#c5a059] bg-white/10 text-white font-bold gold-glow-inset'
                      : 'border-white/5 bg-[#050505] text-white/50 hover:bg-white/5'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-md shrink-0"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span className="truncate mono text-[11px]">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cape Simulation Slider */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center space-x-1.5">
                <Wind className="w-4 h-4 text-[#38bdf8]" />
                <span className="mono text-[11px]">Viento en Capa (Chaos)</span>
              </span>
              <button
                onClick={() => setCapePhysics(!capePhysics)}
                className={`px-2 py-0.5 rounded text-[10px] mono ${
                  capePhysics ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40' : 'bg-white/5 text-white/40'
                }`}
              >
                {capePhysics ? 'ACTIVO' : 'PAUSADO'}
              </button>
            </div>

            {capePhysics && (
              <div className="space-y-1">
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-[#c5a059] bg-white/10 rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] mono text-white/40">
                  <span>Suave ({windSpeed} km/h)</span>
                  <span>Ventisca</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hero Attributes & Combat Stance */}
        <div id="hero-stance-card" className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-base font-bold text-white flex items-center space-x-2 cinzel tracking-wider">
            <Sword className="w-5 h-5 text-[#c5a059]" />
            <span>Postura de Combate</span>
          </h3>

          <div className="grid grid-cols-3 gap-2">
            {(['Ataque', 'Guardia', 'Canalización'] as const).map((stance) => (
              <button
                key={stance}
                onClick={() => setActiveStance(stance)}
                className={`py-2 px-1 rounded text-center text-xs font-semibold uppercase tracking-wider mono transition ${
                  activeStance === stance
                    ? 'bg-[#c5a059] text-black shadow-md font-bold'
                    : 'bg-[#050505] text-white/50 border border-white/10 hover:bg-white/5'
                }`}
              >
                {stance}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded bg-[#050505] border border-[#c5a059]/20 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300 font-semibold mono">
              <span>Gran Mandoble</span>
              <span className="text-[#c5a059]">Dmg: 2,850</span>
            </div>
            <p className="text-white/60 text-[11px] leading-relaxed">
              {activeStance === 'Ataque' && 'Aumenta la velocidad de ataque un 30% y añade ráfagas de cortes estelares.'}
              {activeStance === 'Guardia' && 'Absorbe un 60% del daño entrante y genera una barrera reflejo de runas.'}
              {activeStance === 'Canalización' && 'Carga energía de Caos para reducir todos los enfriamientos un 50%.'}
            </p>
          </div>

          {/* Interactive Ability Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleTriggerAbility('Corte Rúnico', 450, '#ff3e3e')}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-[#ff3e3e]/30 text-xs font-bold text-[#ff3e3e] flex flex-col items-center justify-center space-y-1 active:scale-95 transition mono"
            >
              <Flame className="w-4 h-4 text-[#ff3e3e]" />
              <span>Corte</span>
            </button>

            <button
              onClick={() => handleTriggerAbility('Cadenas del Abismo', 800, '#8b5cf6')}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-purple-500/30 text-xs font-bold text-purple-300 flex flex-col items-center justify-center space-y-1 active:scale-95 transition mono"
            >
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Sombra</span>
            </button>

            <button
              onClick={() => handleTriggerAbility('Grito de Guerra', 0, '#c5a059')}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-[#c5a059]/30 text-xs font-bold text-[#c5a059] flex flex-col items-center justify-center space-y-1 active:scale-95 transition mono"
            >
              <Shield className="w-4 h-4 text-[#c5a059]" />
              <span>Grito</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cast Animation Effect Popup */}
      {castingAnimation && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center animate-bounce">
          <div
            className="px-8 py-4 rounded-xl bg-black/95 border-2 border-[#c5a059] text-[#c5a059] text-2xl font-black cinzel shadow-2xl tracking-widest uppercase flex items-center space-x-3 gold-glow"
            style={{ borderColor: auraColor, color: auraColor }}
          >
            <Sparkles className="w-8 h-8 animate-spin" />
            <span>¡EJECUTANDO {castingAnimation}!</span>
          </div>
        </div>
      )}

      {/* Face Detail Modal */}
      {showFaceDetailModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#c5a059]/40 rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative animate-scaleUp">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2 cinzel">
                <Eye className="w-5 h-5 text-[#c5a059]" />
                <span>Desglose de Rostro & Renderizado AAA</span>
              </h3>
              <button
                onClick={() => setShowFaceDetailModal(false)}
                className="text-white/50 hover:text-white mono text-xs px-2 py-1 rounded bg-white/10"
              >
                ESC X
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded overflow-hidden border border-white/10 h-64 bg-black">
                <img
                  src={HERO_REF_FACE}
                  alt="Face Detail High Res"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-2.5 rounded bg-[#050505] border border-white/5">
                  <span className="text-[#c5a059] font-bold block mb-1 mono">Malla Facial Metahuman AAA</span>
                  <p className="text-white/60">4,500 blendshapes para microexpresiones durante ataques, dolor y gritos de guerra.</p>
                </div>

                <div className="p-2.5 rounded bg-[#050505] border border-white/5">
                  <span className="text-[#c5a059] font-bold block mb-1 mono">Físicas de Cabello Groom (UE5)</span>
                  <p className="text-white/60">Simulación basada en hebras individuales con respuesta dinámica al viento y aceleración.</p>
                </div>

                <div className="p-2.5 rounded bg-[#050505] border border-white/5">
                  <span className="text-[#c5a059] font-bold block mb-1 mono">Subsurface Scattering & Scars</span>
                  <p className="text-white/60">Piel hiperrealista con refracción de luz orgánica y cicatrices con emisor de brillo arcano.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFaceDetailModal(false)}
                className="px-4 py-2 rounded bg-[#c5a059] text-black font-bold text-xs hover:bg-[#d4af37] transition cinzel tracking-wider uppercase"
              >
                Cerrar Inspección
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
