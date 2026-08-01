import React, { useState } from 'react';
import { GAME_EQUIPMENT } from '../data/mockData';
import { EquipmentItem, Rarity } from '../types';
import { Award, Hammer, Gem, Sparkles, Shield, Sword, Crown, Check, AlertCircle } from 'lucide-react';

interface GearAndCraftingProps {
  onEquipItem: (itemName: string) => void;
}

export const GearAndCrafting: React.FC<GearAndCraftingProps> = ({ onEquipItem }) => {
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<string>('Todos');
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string>('Todos');
  const [activeItem, setActiveItem] = useState<EquipmentItem>(GAME_EQUIPMENT[0]);
  const [socketedRunes, setSocketedRunes] = useState<string[]>(activeItem.runesInserted || []);
  const [craftSuccessMsg, setCraftSuccessMsg] = useState<string | null>(null);

  const slotCategories = ['Todos', 'Espada', 'Bastón', 'Armadura', 'Casco', 'Botas', 'Anillo', 'Mascota'];
  const rarityCategories = ['Todos', 'Común', 'Raro', 'Épico', 'Legendario', 'Mítico', 'Ancestral'];

  const getRarityBadgeStyle = (rarity: Rarity) => {
    switch (rarity) {
      case 'Ancestral':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-cyan-500/30';
      case 'Mítico':
        return 'bg-red-500/20 text-red-300 border-red-400 shadow-red-500/30';
      case 'Legendario':
        return 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-amber-500/30';
      case 'Épico':
        return 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-purple-500/30';
      case 'Raro':
        return 'bg-blue-500/20 text-blue-300 border-blue-400 shadow-blue-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  const filteredEquipment = GAME_EQUIPMENT.filter((item) => {
    const matchSlot = selectedSlotFilter === 'Todos' || item.slot === selectedSlotFilter;
    const matchRarity = selectedRarityFilter === 'Todos' || item.rarity === selectedRarityFilter;
    return matchSlot && matchRarity;
  });

  const handleInsertRuna = () => {
    if (socketedRunes.length < activeItem.sockets) {
      const newRune = `Runa de Poder #${socketedRunes.length + 1}`;
      const updated = [...socketedRunes, newRune];
      setSocketedRunes(updated);
    }
  };

  const handleSimulateCrafting = () => {
    setCraftSuccessMsg(`¡Objeto "${activeItem.name}" forjado exitosamente en el Altar de Aethelgard!`);
    onEquipItem(activeItem.name);
    setTimeout(() => {
      setCraftSuccessMsg(null);
    }, 4000);
  };

  return (
    <div id="gear-crafting-container" className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <Award className="w-4 h-4" />
            <span>Sistema de Equipamiento y Herrería Mítica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Armas, Armaduras & Altar de Fabricación
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Inspecciona atributos legendarios, engarza runas elementales y forja objetos ancestrales recolectando ingredientes de Minería, Alquimia y Pesca.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-black/80 border border-white/10">
        {/* Slot Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          <span className="text-xs mono text-white/40 whitespace-nowrap">Ranura:</span>
          {slotCategories.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlotFilter(slot)}
              className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider mono whitespace-nowrap transition ${
                selectedSlotFilter === slot
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'bg-[#050505] text-white/50 hover:text-white'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>

        {/* Rarity Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          <span className="text-xs mono text-white/40 whitespace-nowrap">Rareza:</span>
          {rarityCategories.map((rarity) => (
            <button
              key={rarity}
              onClick={() => setSelectedRarityFilter(rarity)}
              className={`px-2.5 py-1 rounded text-xs font-semibold mono whitespace-nowrap transition ${
                selectedRarityFilter === rarity
                  ? 'bg-white/10 text-[#c5a059] border border-[#c5a059]/40'
                  : 'bg-[#050505] text-white/50 hover:text-white'
              }`}
            >
              {rarity}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment List & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gear Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredEquipment.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveItem(item);
                  setSocketedRunes(item.runesInserted || []);
                }}
                className={`p-4 rounded border transition cursor-pointer space-y-3 relative ${
                  isSelected
                    ? 'bg-[#050505] border-[#c5a059] shadow-xl gold-glow'
                    : 'bg-black/80 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] mono font-bold border ${getRarityBadgeStyle(item.rarity)}`}>
                    {item.rarity}
                  </span>
                  <span className="text-[10px] mono text-white/40 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    Req. Nivel {item.levelReq}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white cinzel">{item.name}</h4>
                  <span className="text-xs text-white/40 mono">Tipo: {item.slot}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mono text-white/70 pt-2 border-t border-white/5">
                  {item.stats.damage && <div>Daño: +{item.stats.damage}</div>}
                  {item.stats.armor && <div>Armadura: +{item.stats.armor}</div>}
                  {item.stats.health && <div>Vida: +{item.stats.health}</div>}
                  {item.stats.critChance && <div>Crítico: +{item.stats.critChance}%</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Equipment Detail & Crafting Inspector Sidebar */}
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded text-xs mono font-bold border ${getRarityBadgeStyle(activeItem.rarity)}`}>
                {activeItem.rarity}
              </span>
              <span className="text-xs text-white/50 mono">Ranura: {activeItem.slot}</span>
            </div>

            <h3 className="text-xl font-bold text-white cinzel tracking-wider">{activeItem.name}</h3>

            <p className="text-xs text-white/60 italic cinzel leading-relaxed">
              "{activeItem.lore}"
            </p>
          </div>

          {/* Stat Details */}
          <div className="p-4 rounded bg-[#050505] border border-white/10 space-y-2">
            <span className="text-xs mono font-bold text-[#c5a059] uppercase block">Atributos Místicos:</span>
            <div className="grid grid-cols-2 gap-2 text-xs mono text-white/80">
              {activeItem.stats.damage && <div>Daño de Ataque: <span className="text-[#c5a059]">+{activeItem.stats.damage}</span></div>}
              {activeItem.stats.armor && <div>Armadura Física: <span className="text-emerald-400">+{activeItem.stats.armor}</span></div>}
              {activeItem.stats.health && <div>Salud Máxima: <span className="text-[#ff3e3e]">+{activeItem.stats.health}</span></div>}
              {activeItem.stats.mana && <div>Mana Reserva: <span className="text-[#38bdf8]">+{activeItem.stats.mana}</span></div>}
              {activeItem.stats.critChance && <div>Golpe Crítico: <span className="text-[#c5a059]">+{activeItem.stats.critChance}%</span></div>}
              {activeItem.stats.cooldownRed && <div>Reducción CD: <span className="text-[#38bdf8]">+{activeItem.stats.cooldownRed}%</span></div>}
            </div>
          </div>

          {/* Socketed Runes Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white/80 mono uppercase flex items-center space-x-1.5">
                <Gem className="w-4 h-4 text-[#38bdf8]" />
                <span>Engarces de Runas ({socketedRunes.length} / {activeItem.sockets})</span>
              </span>
              {socketedRunes.length < activeItem.sockets && (
                <button
                  onClick={handleInsertRuna}
                  className="px-2.5 py-1 rounded bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] text-[10px] mono hover:bg-[#38bdf8] hover:text-black transition font-bold"
                >
                  + Engarzar Runa
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: activeItem.sockets }).map((_, idx) => {
                const runeName = socketedRunes[idx];
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded border text-xs mono flex items-center space-x-2 ${
                      runeName
                        ? 'bg-[#050505] border-[#38bdf8]/40 text-[#38bdf8]'
                        : 'bg-[#050505]/40 border-white/5 text-white/30'
                    }`}
                  >
                    <Gem className={`w-3.5 h-3.5 ${runeName ? 'text-[#38bdf8]' : 'text-white/20'}`} />
                    <span className="truncate">{runeName || 'Zócalo Vacío'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Crafting Requirements */}
          {activeItem.craftable && activeItem.materialsNeeded && (
            <div className="space-y-3 pt-3 border-t border-white/10">
              <span className="text-xs font-bold text-white/80 mono uppercase flex items-center space-x-1.5">
                <Hammer className="w-4 h-4 text-[#c5a059]" />
                <span>Receta de Fabricación</span>
              </span>

              <div className="space-y-1.5">
                {activeItem.materialsNeeded.map((mat) => (
                  <div key={mat.name} className="flex items-center justify-between text-xs p-2 rounded bg-[#050505] border border-white/5 mono">
                    <span className="text-white/70">{mat.name} ({mat.category})</span>
                    <span className="text-[#c5a059] font-bold">{mat.count}x</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSimulateCrafting}
                className="w-full py-2.5 rounded bg-[#c5a059] text-black font-bold text-xs hover:bg-[#d4af37] transition shadow-lg flex items-center justify-center space-x-2 cinzel uppercase tracking-wider"
              >
                <Hammer className="w-4 h-4" />
                <span>Forjar Objeto en el Altar</span>
              </button>
            </div>
          )}

          {/* Success Message */}
          {craftSuccessMsg && (
            <div className="p-3 rounded bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs flex items-start space-x-2 mono animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>{craftSuccessMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
