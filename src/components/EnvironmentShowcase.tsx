import React, { useState } from 'react';
import { MAP_SCENARIOS } from '../data/mockData';
import { MapScenario } from '../types';
import { Compass, Sun, Moon, CloudRain, CloudFog, CloudLightning, Snowflake, Flame, Cpu, Eye } from 'lucide-react';

export const EnvironmentShowcase: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<MapScenario>(MAP_SCENARIOS[0]);
  const [timeOfDay, setTimeOfDay] = useState<number>(14); // 14:00
  const [selectedWeather, setSelectedWeather] = useState<string>(selectedMap.defaultWeather);
  const [enableRayTracing, setEnableRayTracing] = useState<boolean>(true);
  const [fogDensity, setFogDensity] = useState<number>(65);

  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const weatherOptions = [
    { name: 'Despejado', icon: Sun },
    { name: 'Lluvia', icon: CloudRain },
    { name: 'Niebla', icon: CloudFog },
    { name: 'Tormenta', icon: CloudLightning },
    { name: 'Nieve', icon: Snowflake },
    { name: 'Ceniza Volcánica', icon: Flame },
  ];

  const isNightTime = timeOfDay < 6 || timeOfDay > 19;

  return (
    <div id="environment-showcase-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4" />
            <span>Simulador de Escenarios AAA & Motor Climático</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Escenarios de Aethelgard: Ciclo Día/Noche & Clima Dinámico
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Ajusta el reloj solar, activa tempestades volumétricas y compara los reflejos de Ray Tracing e Iluminación Global Lumen en tiempo real.
          </p>
        </div>
      </div>

      {/* Scenario Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {MAP_SCENARIOS.map((map) => {
          const isSelected = selectedMap.id === map.id;
          return (
            <button
              key={map.id}
              onClick={() => {
                setSelectedMap(map);
                setSelectedWeather(map.defaultWeather);
              }}
              className={`p-3 rounded border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-[#050505] border-[#c5a059] text-[#c5a059] shadow-xl gold-glow'
                  : 'bg-black/80 border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] mono text-[#c5a059] uppercase">{map.category}</span>
                <span className="text-[10px] mono text-white/30">{map.defaultWeather}</span>
              </div>
              <div className="text-xs font-bold text-white cinzel truncate">{map.name}</div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environment Canvas View */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white mono flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#c5a059]" />
              <span>{selectedMap.name} ({formatTime(timeOfDay)} hs)</span>
            </span>

            <span className="text-xs mono text-[#c5a059] bg-[#050505] px-2.5 py-1 rounded border border-white/10">
              Clima: {selectedWeather}
            </span>
          </div>

          {/* Interactive Environment Image Frame */}
          <div className="relative rounded overflow-hidden border border-white/10 h-[380px] sm:h-[460px] bg-[#050505]">
            <img
              src={selectedMap.imageUrl}
              alt={selectedMap.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 opacity-90"
            />

            {/* Night Time Tint Overlay */}
            {isNightTime && (
              <div className="absolute inset-0 bg-indigo-950/70 mix-blend-multiply pointer-events-none transition duration-700" />
            )}

            {/* Weather Overlay simulation */}
            {selectedWeather === 'Lluvia' && (
              <div className="absolute inset-0 bg-cyan-900/20 backdrop-brightness-90 pointer-events-none animate-pulse" />
            )}
            {selectedWeather === 'Niebla' && (
              <div className="absolute inset-0 bg-slate-200/20 backdrop-blur-[1px] pointer-events-none" />
            )}
            {selectedWeather === 'Ceniza Volcánica' && (
              <div className="absolute inset-0 bg-red-950/40 mix-blend-color-dodge pointer-events-none" />
            )}

            {/* Floating Info Badge */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded bg-black/80 backdrop-blur-md border border-[#c5a059]/30 text-xs text-white/70 flex items-center justify-between mono">
              <span>Audio Ambiental: {selectedMap.ambientAudio}</span>
              <span className="text-[#c5a059] font-bold">Lumen Ray Bounces: {enableRayTracing ? '16x' : 'OFF'}</span>
            </div>
          </div>
        </div>

        {/* Environment Controls Sidebar */}
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          {/* Day/Night Time Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs mono text-white">
              <span className="flex items-center space-x-1.5">
                {isNightTime ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-[#c5a059]" />}
                <span>Reloj Solar Día/Noche</span>
              </span>
              <span className="text-[#c5a059] font-bold">{formatTime(timeOfDay)}</span>
            </div>

            <input
              type="range"
              min="0"
              max="23.9"
              step="0.2"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(Number(e.target.value))}
              className="w-full accent-[#c5a059] bg-[#050505] rounded h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] mono text-white/40">
              <span>00:00 (Medianoche)</span>
              <span>12:00 (Mediodía)</span>
              <span>23:59</span>
            </div>
          </div>

          {/* Weather Selector Buttons */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <span className="text-xs mono font-bold text-white/80 uppercase block">
              Selección de Clima Volumétrico:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {weatherOptions.map((w) => {
                const Icon = w.icon;
                const isCurrent = selectedWeather === w.name;
                return (
                  <button
                    key={w.name}
                    onClick={() => setSelectedWeather(w.name)}
                    className={`flex items-center space-x-2 p-2 rounded border text-xs text-left transition ${
                      isCurrent
                        ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059] font-bold'
                        : 'bg-[#050505] border-white/5 text-white/50 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span className="truncate">{w.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ray Tracing & Fog Controls */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/80 mono">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-[#38bdf8]" />
                <span>Ray Tracing Reflejos (UE5)</span>
              </span>
              <button
                onClick={() => setEnableRayTracing(!enableRayTracing)}
                className={`px-2.5 py-1 rounded text-[10px] mono font-bold ${
                  enableRayTracing ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40' : 'bg-white/5 text-white/30'
                }`}
              >
                {enableRayTracing ? 'ACTIVADO' : 'DESACTIVADO'}
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] mono text-white/50">
                <span>Niebla Volumétrica</span>
                <span>{fogDensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fogDensity}
                onChange={(e) => setFogDensity(Number(e.target.value))}
                className="w-full accent-[#38bdf8] bg-[#050505] rounded h-1.5 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
