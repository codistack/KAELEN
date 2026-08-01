/**
 * Aethelgard: Fate of the Ancients - Types & Interfaces
 */

export type Rarity = 'Común' | 'Raro' | 'Épico' | 'Legendario' | 'Mítico' | 'Ancestral';

export interface Skill {
  id: string;
  name: string;
  type: 'Pasiva' | 'Activa' | 'Ultimate' | 'Evolución';
  icon: string;
  description: string;
  cooldown: number; // in seconds
  cost: number; // mana or energy
  damageType: 'Físico' | 'Mágico' | 'Puro' | 'Elementa' | 'Caos';
  particleColor: string;
}

export interface ClassEvolution {
  name: string;
  title: string;
  description: string;
  icon: string;
  bonus: string;
}

export interface CharacterClass {
  id: string;
  name: string;
  archetype: 'Fuerza' | 'Agilidad' | 'Inteligencia' | 'Fe' | 'Caos';
  icon: string;
  quote: string;
  description: string;
  role: 'Tanque' | 'DPS Ca cuerpo' | 'DPS a Distancia' | 'Soporte' | 'Nuker' | 'Asesino' | 'Controlador';
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    defense: number;
    mobility: number;
    difficulty: number;
  };
  skills: Skill[];
  evolutions: ClassEvolution[];
  primaryWeapon: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  slot: 'Espada' | 'Hacha' | 'Martillo' | 'Bastón' | 'Daga' | 'Arco' | 'Casco' | 'Armadura' | 'Guantes' | 'Botas' | 'Anillo' | 'Collar' | 'Reliquia' | 'Mascota';
  rarity: Rarity;
  levelReq: number;
  icon: string;
  stats: {
    damage?: number;
    armor?: number;
    health?: number;
    mana?: number;
    critChance?: number;
    cooldownRed?: number;
    elementalPower?: number;
  };
  sockets: number;
  runesInserted?: string[];
  lore: string;
  craftable: boolean;
  materialsNeeded?: { name: string; count: number; category: 'Minería' | 'Alquimia' | 'Pesca' | 'Monstruos' }[];
}

export interface MapScenario {
  id: string;
  name: string;
  category: 'Bosque' | 'Castillo' | 'Mazmorra' | 'Templo' | 'Volcán' | 'Pantano' | 'Cueva' | 'Ruina' | 'Ciudad' | 'Reino Flotante' | 'Desierto' | 'Océano';
  description: string;
  imageUrl: string;
  ambientAudio: string;
  features: string[];
  rayTracingReflections: boolean;
  defaultWeather: 'Lluvia' | 'Niebla' | 'Tormenta' | 'Despejado' | 'Nieve' | 'Ceniza Volcánica';
}

export interface EnemyBoss {
  id: string;
  name: string;
  title: string;
  type: 'Regular' | 'Élite' | 'Jefe de Zanja' | 'Jefe Final de Raid';
  level: number;
  health: number;
  imageUrl: string;
  description: string;
  mechanics: string[];
  phases: {
    phaseNumber: number;
    name: string;
    triggerHealthPercent: number;
    specialAttack: string;
    enviroDestruction: string;
  }[];
  weakness: string;
  drops: { itemName: string; rarity: Rarity }[];
}

export interface MobaLaneData {
  name: 'Carril Superior' | 'Carril Central' | 'Carril Inferior' | 'Jungla' | 'Fosa de Aethelgard';
  towersLeft: { radiants: number; dire: number };
  creepWaveState: string;
  neutralBossState: 'Disponible' | 'Respawn en 2:30' | 'Derrotado (Buff Activo)';
  recommendedStrategy: string;
}

export interface EngineSettings {
  naniteGeometry: boolean;
  lumenLighting: boolean;
  rayTracing: 'Desactivado' | 'Alto' | 'Path Tracing AAA';
  dlssMode: 'Calidad' | 'Rendimiento' | 'Frame Gen 3.5';
  volumetricFog: boolean;
  resolution: '1080p' | '1440p' | '4K Native' | '8K Cinematic';
  targetFps: number;
  pbrQuality: 'Ultra' | 'Cinematic';
}

export interface StoreCosmetic {
  id: string;
  name: string;
  type: 'Skin Mítica' | 'Efecto de Arma' | 'Montura Legendaria' | 'Mascota Ancestral' | 'Gesto' | 'Pase de Batalla';
  rarity: Rarity;
  priceGold: number;
  priceGems: number;
  previewColor: string;
  discountBadge?: string;
  description: string;
}
