import React from 'react';
import { Shield, Sparkles, Flame, Swords, Map, Cpu, ShoppingBag, Volume2, VolumeX, Clapperboard, Award, Compass } from 'lucide-react';
import { EngineSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  audioMuted: boolean;
  setAudioMuted: (muted: boolean) => void;
  engineSettings: EngineSettings;
  setEngineSettings: React.Dispatch<React.SetStateAction<EngineSettings>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  audioMuted,
  setAudioMuted,
  engineSettings,
  setEngineSettings,
}) => {
  const navItems = [
    { id: 'hero', label: 'Hero', icon: Shield },
    { id: 'classes', label: 'Clases (10)', icon: Swords },
    { id: 'gear', label: 'Equipamiento', icon: Award },
    { id: 'moba', label: 'Mapa MOBA', icon: Map },
    { id: 'environments', label: 'Escenarios', icon: Compass },
    { id: 'bosses', label: 'Jefes & Raid', icon: Flame },
    { id: 'hud', label: 'HUD Combate', icon: Sparkles },
    { id: 'engine', label: 'Motor UE5', icon: Cpu },
    { id: 'store', label: 'Tienda & Pass', icon: ShoppingBag },
    { id: 'cinematic', label: 'Cinemáticas & AI', icon: Clapperboard },
  ];

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#c5a059]/20 text-slate-100 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#c5a059] via-[#d4af37] to-[#e6ca65] p-0.5 shadow-lg shadow-[#c5a059]/20">
              <div className="w-full h-full bg-[#050505] rounded-[7px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#c5a059] animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl cinzel font-black tracking-widest text-[#c5a059] uppercase block">
                ETHEREAL
              </span>
              <div className="flex items-center space-x-2 text-[10px] tracking-widest text-white/50 mono uppercase">
                <span>AETHELGARD</span>
                <span className="text-[#c5a059] font-bold">• UE 5.5</span>
              </div>
            </div>
          </div>

          {/* Currencies & Controls Right */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase text-white/40 tracking-wider mono">Currencies</span>
              <div className="flex gap-3 mono text-xs font-semibold">
                <span className="text-[#c5a059]">12,450G</span>
                <span className="text-[#38bdf8]">480C</span>
              </div>
            </div>

            {/* Resolution Badge */}
            <button
              onClick={() => {
                const nextRes = engineSettings.resolution === '4K Native' ? '8K Cinematic' : '4K Native';
                setEngineSettings((prev) => ({ ...prev, resolution: nextRes }));
              }}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/5 border border-[#c5a059]/30 text-xs mono text-[#c5a059] hover:border-[#c5a059] transition"
              title="Cambiar Calidad Gráfica UE5"
            >
              <Cpu className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{engineSettings.resolution}</span>
            </button>

            {/* Level badge */}
            <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center font-bold text-xs mono text-[#c5a059]">
              LV.42
            </div>

            {/* Mute Toggle */}
            <button
              id="audio-mute-btn"
              onClick={() => setAudioMuted(!audioMuted)}
              className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-[#c5a059] transition"
              title={audioMuted ? "Activar Audio Orquestal" : "Silenciar Audio"}
            >
              {audioMuted ? <VolumeX className="w-5 h-5 text-[#ff3e3e]" /> : <Volume2 className="w-5 h-5 text-[#c5a059]" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto scrollbar-none py-2 border-t border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#c5a059]/15 border border-[#c5a059] text-white shadow-[0_0_12px_rgba(197,160,89,0.25)]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#c5a059]' : 'text-white/40'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
