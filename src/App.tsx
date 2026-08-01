import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroOverview } from './components/HeroOverview';
import { ClassEngine } from './components/ClassEngine';
import { GearAndCrafting } from './components/GearAndCrafting';
import { MobaTacticalMap } from './components/MobaTacticalMap';
import { EnvironmentShowcase } from './components/EnvironmentShowcase';
import { BestiaryAndBosses } from './components/BestiaryAndBosses';
import { CombatHudSimulator } from './components/CombatHudSimulator';
import { EngineTechShowcase } from './components/EngineTechShowcase';
import { InGameStore } from './components/InGameStore';
import { CinematicAudioDirector } from './components/CinematicAudioDirector';
import { EngineSettings } from './types';
import { Sparkles, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [lastCastSkill, setLastCastSkill] = useState<{ name: string; damage: number; color: string } | null>(null);

  const [engineSettings, setEngineSettings] = useState<EngineSettings>({
    naniteGeometry: true,
    lumenLighting: true,
    rayTracing: 'Alto',
    dlssMode: 'Frame Gen 3.5',
    volumetricFog: true,
    resolution: '4K Native',
    targetFps: 144,
    pbrQuality: 'Ultra',
  });

  const handleCastSkillGlobal = (skillName: string, damage: number, color: string) => {
    setLastCastSkill({ name: skillName, damage, color });
    setTimeout(() => {
      setLastCastSkill(null);
    }, 2500);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#c5a059] selection:text-black relative overflow-x-hidden">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#ff3e3e]/5 rounded-full blur-[160px]" />
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        audioMuted={audioMuted}
        setAudioMuted={setAudioMuted}
        engineSettings={engineSettings}
        setEngineSettings={setEngineSettings}
      />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {activeTab === 'hero' && <HeroOverview onCastSkill={handleCastSkillGlobal} />}
        {activeTab === 'classes' && <ClassEngine onCastSkill={handleCastSkillGlobal} />}
        {activeTab === 'gear' && <GearAndCrafting onEquipItem={(item) => handleCastSkillGlobal(`Equipado: ${item}`, 0, '#c5a059')} />}
        {activeTab === 'moba' && <MobaTacticalMap onCastSkill={handleCastSkillGlobal} />}
        {activeTab === 'environments' && <EnvironmentShowcase />}
        {activeTab === 'bosses' && <BestiaryAndBosses onCastSkill={handleCastSkillGlobal} />}
        {activeTab === 'hud' && <CombatHudSimulator onCastSkill={handleCastSkillGlobal} />}
        {activeTab === 'engine' && <EngineTechShowcase engineSettings={engineSettings} setEngineSettings={setEngineSettings} />}
        {activeTab === 'store' && <InGameStore />}
        {activeTab === 'cinematic' && <CinematicAudioDirector />}
      </main>

      {/* Floating Damage & Skill Cast Feed Notification Toast */}
      {lastCastSkill && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div
            className="px-5 py-3 rounded-xl bg-black/95 border border-[#c5a059]/40 text-xs mono shadow-2xl flex items-center space-x-3 text-slate-100 gold-glow"
            style={{ borderLeftColor: lastCastSkill.color, borderLeftWidth: '4px' }}
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ color: lastCastSkill.color }} />
            <div>
              <span className="font-bold text-[#c5a059] block">{lastCastSkill.name}</span>
              {lastCastSkill.damage > 0 && (
                <span className="text-slate-400">
                  Daño Infligido: <strong className="text-[#ff3e3e]">-{lastCastSkill.damage.toLocaleString()} HP</strong>
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="app-footer" className="relative z-10 border-t border-white/5 bg-black/90 py-6 mt-12 text-center text-xs text-white/40 mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ETHEREAL • AETHELGARD: Fate of the Ancients</span>
          <span className="text-[#c5a059]">Unreal Engine 5.5 • Nanite & Lumen Render Engine</span>
        </div>
      </footer>
    </div>
  );
}
