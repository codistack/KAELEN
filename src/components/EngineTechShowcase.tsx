import React from 'react';
import { Cpu, Zap, Shield, Eye, Flame, Layers, Sparkles } from 'lucide-react';
import { EngineSettings } from '../types';

interface EngineTechShowcaseProps {
  engineSettings: EngineSettings;
  setEngineSettings: React.Dispatch<React.SetStateAction<EngineSettings>>;
}

export const EngineTechShowcase: React.FC<EngineTechShowcaseProps> = ({
  engineSettings,
  setEngineSettings,
}) => {
  const toggleSetting = (key: keyof EngineSettings) => {
    setEngineSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div id="engine-tech-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Cpu className="w-4 h-4" />
            <span>Motor Gráfico & Renderizado Next-Gen</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Demostración Tecnológica Unreal Engine 5.5
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Nanite Virtualized Geometry, Lumen Global Illumination, Ray Tracing, DLSS 3.5 Frame Generation y Texturas 8K PBR para gráficos fotorrealistas.
          </p>
        </div>
      </div>

      {/* Tech Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Nanite */}
        <div className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#c5a059] font-bold text-sm cinzel">
              <Layers className="w-5 h-5 text-[#c5a059]" />
              <span>Nanite Geometry Virtualizada</span>
            </div>
            <button
              onClick={() => toggleSetting('naniteGeometry')}
              className={`px-2.5 py-1 rounded text-xs mono font-bold ${
                engineSettings.naniteGeometry
                  ? 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                  : 'bg-[#050505] text-white/30'
              }`}
            >
              {engineSettings.naniteGeometry ? 'ACTIVO' : 'OFF'}
            </button>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Mallas poligonales de más de 100 millones de polígonos por escenario sin pérdida de rendimiento ni Pop-In de LODs.
          </p>
          <div className="p-2.5 rounded bg-[#050505] border border-white/5 text-[11px] mono text-[#c5a059]">
            Polígonos Renderizados: 124,500,000 tris
          </div>
        </div>

        {/* Lumen */}
        <div className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#c5a059] font-bold text-sm cinzel">
              <Sparkles className="w-5 h-5 text-[#c5a059]" />
              <span>Lumen Global Illumination</span>
            </div>
            <button
              onClick={() => toggleSetting('lumenLighting')}
              className={`px-2.5 py-1 rounded text-xs mono font-bold ${
                engineSettings.lumenLighting
                  ? 'bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40'
                  : 'bg-[#050505] text-white/30'
              }`}
            >
              {engineSettings.lumenLighting ? 'ACTIVO' : 'OFF'}
            </button>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Iluminación difusa rebotada en tiempo real que reacciona instantáneamente a hechizos, antorchas y ciclos de sol.
          </p>
          <div className="p-2.5 rounded bg-[#050505] border border-white/5 text-[11px] mono text-[#38bdf8]">
            Bounce Resolution: Infinite Diffuse Bounce
          </div>
        </div>

        {/* DLSS 3.5 */}
        <div className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#c5a059] font-bold text-sm cinzel">
              <Zap className="w-5 h-5 text-[#c5a059]" />
              <span>DLSS 3.5 & Frame Generation</span>
            </div>
            <span className="text-xs text-[#c5a059] mono bg-[#050505] px-2 py-0.5 rounded border border-white/10">
              {engineSettings.dlssMode}
            </span>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Reconstrucción por Inteligencia Artificial para alcanzar más de 144 FPS estables en resolución 4K Native.
          </p>
          <div className="p-2.5 rounded bg-[#050505] border border-white/5 text-[11px] mono text-emerald-400">
            Tasa de Refresco: 144 FPS @ 4K Ultra
          </div>
        </div>
      </div>
    </div>
  );
};
