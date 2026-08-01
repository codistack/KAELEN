import React, { useState } from 'react';
import { STORE_COSMETICS } from '../data/mockData';
import { StoreCosmetic } from '../types';
import { ShoppingBag, Sparkles, Trophy, Crown, Check, Tag } from 'lucide-react';

export const InGameStore: React.FC = () => {
  const [purchasedIds, setPurchasedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'store' | 'pass'>('store');

  const handlePurchaseItem = (item: StoreCosmetic) => {
    if (!purchasedIds.includes(item.id)) {
      setPurchasedIds([...purchasedIds, item.id]);
    }
  };

  return (
    <div id="ingame-store-container" className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#c5a059]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 gold-glow">
        <div>
          <div className="flex items-center space-x-2 text-[#c5a059] mono text-xs uppercase tracking-widest mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Tienda Oficial de Aethelgard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white cinzel tracking-wider">
            Aspectos Místicos, Monturas & Pase de Batalla
          </h2>
          <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-2xl">
            Skins exclusivas con partículas únicas, efectos visuales de armas y el Pase de Batalla con 100 niveles de recompensas.
          </p>
        </div>

        {/* Currency Display */}
        <div className="flex items-center space-x-4 p-3 rounded bg-[#050505] border border-white/10 text-xs mono">
          <div className="text-[#c5a059] font-bold">Oro: 45,200g</div>
          <div className="text-[#38bdf8] font-bold">Gemas: 3,450</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('store')}
          className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider cinzel transition ${
            activeTab === 'store' ? 'bg-[#c5a059] text-black' : 'bg-black/80 text-white/50 hover:text-white'
          }`}
        >
          Tienda de Cosméticos
        </button>

        <button
          onClick={() => setActiveTab('pass')}
          className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider cinzel transition ${
            activeTab === 'pass' ? 'bg-[#c5a059] text-black' : 'bg-black/80 text-white/50 hover:text-white'
          }`}
        >
          Pase de Batalla - Temporada I (100 Niveles)
        </button>
      </div>

      {/* Store Grid */}
      {activeTab === 'store' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STORE_COSMETICS.map((item) => {
            const isOwned = purchasedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-black/80 border border-white/10 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] mono px-2 py-0.5 rounded bg-[#050505] text-[#c5a059] border border-[#c5a059]/30 uppercase">
                      {item.type}
                    </span>
                    {item.discountBadge && (
                      <span className="text-[9px] mono bg-[#ff3e3e] text-white font-bold px-1.5 py-0.5 rounded">
                        {item.discountBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white cinzel">{item.name}</h3>

                  <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs mono">
                    <span className="text-[#38bdf8] font-bold">{item.priceGems} Gemas</span>
                    <span className="text-[#c5a059] font-bold">{item.priceGold.toLocaleString()}g</span>
                  </div>

                  <button
                    onClick={() => handlePurchaseItem(item)}
                    disabled={isOwned}
                    className={`w-full py-2 rounded font-bold text-xs transition flex items-center justify-center space-x-1.5 cinzel uppercase tracking-wider ${
                      isOwned
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#c5a059] text-black hover:bg-[#d4af37]'
                    }`}
                  >
                    {isOwned ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Adquirido</span>
                      </>
                    ) : (
                      <span>Comprar Objeto</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Battle Pass Track Preview */}
      {activeTab === 'pass' && (
        <div className="p-6 rounded-xl bg-black/80 border border-white/10 space-y-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#c5a059] cinzel tracking-wider">Camino de Recompensas Pase de Batalla</h3>
              <p className="text-xs text-white/50 mono">Progreso actual: Nivel 42 de 100</p>
            </div>
            <span className="px-3 py-1 bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#c5a059] text-xs mono font-bold rounded">
              PASE PREMIUM ACTIVO
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[1, 10, 25, 50, 100].map((lvl) => (
              <div key={lvl} className="p-4 rounded bg-[#050505] border border-white/10 text-center space-y-2">
                <span className="text-xs mono text-[#c5a059] font-bold">NIVEL {lvl}</span>
                <div className="text-xs font-bold text-white cinzel">
                  {lvl === 100 ? 'Skin Mítica Kaelen' : `Cofre Mítico #${lvl}`}
                </div>
                <span className="text-[10px] text-emerald-400 mono block">
                  {lvl <= 42 ? 'RECLAMADO' : 'BLOQUEADO'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
