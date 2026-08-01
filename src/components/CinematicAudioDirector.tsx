import React, { useState } from 'react';
import { Clapperboard, Volume2, Sparkles, Bot, Wand2, Play, Pause, RefreshCw, Send, Check } from 'lucide-react';

export const CinematicAudioDirector: React.FC = () => {
  const [activeSubtab, setActiveSubtab] = useState<'ai' | 'audio' | 'cinematic'>('ai');

  // AI Generator state
  const [heroLorePrompt, setHeroLorePrompt] = useState<string>('Origen secreto del Mandoble Rúnico');
  const [selectedClassForLore, setSelectedClassForLore] = useState<string>('Caballero Oscuro');
  const [loreResult, setLoreResult] = useState<any | null>(null);
  const [loadingLore, setLoadingLore] = useState<boolean>(false);

  // Audio track state
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<string>('Tema Principal: Obertura de Aethelgard');

  const audioTracks = [
    'Tema Principal: Obertura de Aethelgard (Orquesta & Coros)',
    'Batalla en la Fosa de Titanes (Percusión Épica)',
    'Bosque de los Faros de Jade (Sintetizador Místico)',
    'Lamento del Trono Caído (Violín & Arpa)',
  ];

  const handleGenerateAiLore = async () => {
    setLoadingLore(true);
    setLoreResult(null);

    try {
      const response = await fetch('/api/ai/lore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroName: 'Kaelen el Primogénito',
          heroClass: selectedClassForLore,
          faction: 'Orden de la Runa Caída',
          prompt: heroLorePrompt,
        }),
      });

      const data = await response.json();
      setLoreResult(data);
    } catch (err) {
      console.error('Failed to fetch AI Lore:', err);
    } finally {
      setLoadingLore(false);
    }
  };

  return (
    <div id="cinematic-audio-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Clapperboard className="w-4 h-4" />
            <span>Dirección Cinematográfica, Audio & Asistente IA Gemini</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Director de Cinemáticas, Audio Orquestal & Guionista IA
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Genera pasajes de lore profundos impulsados por Gemini 3.6 Flash, reproduce bandas sonoras orquestales y configura la cámara de cinemáticas.
          </p>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex space-x-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveSubtab('ai')}
          className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider cinzel transition flex items-center space-x-2 ${
            activeSubtab === 'ai' ? 'bg-[#c5a059] text-black' : 'bg-black/80 text-white/50 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Guionista de Lore & Builds IA (Gemini Server-Side)</span>
        </button>

        <button
          onClick={() => setActiveSubtab('audio')}
          className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider cinzel transition flex items-center space-x-2 ${
            activeSubtab === 'audio' ? 'bg-[#c5a059] text-black' : 'bg-black/80 text-white/50 hover:text-white'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>Banda Sonora Orquestal & Voces</span>
        </button>
      </div>

      {/* Subtab Content: AI Generator */}
      {activeSubtab === 'ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center space-x-2 cinzel tracking-wider">
              <Wand2 className="w-5 h-5 text-[#c5a059]" />
              <span>Generador de Lore de Héroes con Gemini</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-white/50 mono block mb-1">Clase del Héroe:</label>
                <select
                  value={selectedClassForLore}
                  onChange={(e) => setSelectedClassForLore(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#050505] border border-white/10 text-white mono focus:border-[#c5a059] outline-none"
                >
                  <option value="Caballero Oscuro">Caballero Oscuro</option>
                  <option value="Paladín">Paladín</option>
                  <option value="Mago Arcano">Mago Arcano</option>
                  <option value="Asesino">Asesino</option>
                  <option value="Arquero Silvano">Arquero Silvano</option>
                </select>
              </div>

              <div>
                <label className="text-white/50 mono block mb-1">Prompt / Concepto de Origen:</label>
                <input
                  type="text"
                  value={heroLorePrompt}
                  onChange={(e) => setHeroLorePrompt(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#050505] border border-white/10 text-white mono focus:border-[#c5a059] outline-none"
                  placeholder="Escribe el destino o secreto del héroe..."
                />
              </div>

              <button
                onClick={handleGenerateAiLore}
                disabled={loadingLore}
                className="w-full py-3 rounded bg-[#c5a059] hover:bg-[#d4af37] text-black font-bold text-xs transition shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 cinzel uppercase tracking-wider"
              >
                {loadingLore ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini 3.6 Flash redactando lore...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generar Capítulo de Lore Épico</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result */}
          <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white cinzel tracking-wider">Resultado del Guión IA</h3>

            {loreResult ? (
              <div className="space-y-3 p-4 rounded bg-[#050505] border border-[#c5a059]/30 text-xs cinzel leading-relaxed animate-fadeIn">
                <span className="text-xs mono text-[#c5a059] font-bold block">{loreResult.title}</span>
                <p className="text-white/70 italic">"{loreResult.synopsis}"</p>
                <p className="text-white/90 whitespace-pre-line">{loreResult.fullText}</p>

                <div className="p-2.5 rounded bg-black text-[#c5a059] mono text-[11px] border border-[#c5a059]/20">
                  Artefacto Asociado: <strong>{loreResult.keyArtifact}</strong>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded bg-[#050505] border border-white/10 text-center text-xs text-white/40 mono">
                Presiona "Generar Capítulo" para crear una narrativa cinematográfica única con Gemini API.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab Content: Audio */}
      {activeSubtab === 'audio' && (
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-3">
            <span className="text-xs mono text-[#c5a059] uppercase font-bold block">
              Banda Sonora Original de Aethelgard (Orquesta & Coros)
            </span>

            <div className="space-y-2">
              {audioTracks.map((track) => {
                const isSelected = currentTrack === track;
                return (
                  <div
                    key={track}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlayingMusic(true);
                    }}
                    className={`p-3.5 rounded border text-xs mono flex items-center justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059] font-bold'
                        : 'bg-[#050505] border-white/10 text-white/50 hover:bg-white/5'
                    }`}
                  >
                    <span>{track}</span>
                    <button className="p-1.5 rounded-full bg-black text-[#c5a059]">
                      {isSelected && isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
