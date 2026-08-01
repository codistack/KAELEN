import { CharacterClass, EquipmentItem, MapScenario, EnemyBoss, MobaLaneData, StoreCosmetic } from '../types';

// Image references
export const HERO_REF_FACE = 'https://iili.io/CSRVbUB.png';
export const HERO_BANNER_IMG = '/src/assets/images/aethelgard_hero_banner_1785549397662.jpg';
export const MOBA_MAP_IMG = '/src/assets/images/moba_map_overview_1785549410560.jpg';
export const BOSS_ENCOUNTER_IMG = '/src/assets/images/epic_boss_encounter_1785549422234.jpg';

// 10 Complete Classes
export const GAME_CLASSES: CharacterClass[] = [
  {
    id: 'caballero-oscuro',
    name: 'Caballero Oscuro',
    archetype: 'Fuerza',
    icon: 'ShieldAlert',
    quote: 'La penumbra no es la ausencia de luz, sino la presencia de mi venganza.',
    description: 'Guerrero de élite imbuido con almas caídas y runas de sombra. Combina una armadura impenetrable de placas con habilidades destructivas de robo de vida y auras de pavor.',
    role: 'Tanque',
    stats: { strength: 95, agility: 55, intelligence: 60, defense: 98, mobility: 65, difficulty: 75 },
    primaryWeapon: 'Gran Mandoble de Runas Profanas',
    skills: [
      { id: 'dk-1', name: 'Corte de Sangre Rúnica', type: 'Activa', icon: 'Sword', description: 'Realiza un tajo giratorio que inflige 450 de daño físico y roba un 25% del daño en forma de salud.', cooldown: 6, cost: 40, damageType: 'Físico', particleColor: '#ef4444' },
      { id: 'dk-2', name: 'Sombra Asfixiante', type: 'Activa', icon: 'Hand', description: 'Arrastra a un enemigo lejano hacia ti, frenándolo un 60% e infligiendo silenciamiento por 2 segundos.', cooldown: 12, cost: 65, damageType: 'Caos', particleColor: '#8b5cf6' },
      { id: 'dk-3', name: 'Aura de Abismo', type: 'Pasiva', icon: 'Shield', description: 'Los enemigos cercanos sufren un 3% de su vida máxima como daño de sombra cada segundo y pierden 15% de armadura.', cooldown: 0, cost: 0, damageType: 'Caos', particleColor: '#4c1d95' },
      { id: 'dk-ult', name: 'Ultimate: Apocalipsis del Trono Caído', type: 'Ultimate', icon: 'Flame', description: 'Invoca pilares de energía profana que aplastan el terreno, aturdiendo a todos los enemigos en área por 3.5s e infligiendo 2,400 de daño de Caos.', cooldown: 90, cost: 150, damageType: 'Caos', particleColor: '#dc2626' },
    ],
    evolutions: [
      { name: 'Señor del Vacío Rúnico', title: 'Evolución Ofensiva', description: 'Duplica el alcance de las sombras y añade daño crítico de caos.', icon: 'Zap', bonus: '+35% Daño Crítico, +20% Vampirismo' },
      { name: 'Baluarte de Almas', title: 'Evolución Defensiva', description: 'Genera un escudo equivalente al 50% del daño mitigado.', icon: 'ShieldCheck', bonus: '+40% Armadura, +25% Salud Máxima' },
    ]
  },
  {
    id: 'paladin',
    name: 'Paladín',
    archetype: 'Fe',
    icon: 'Sun',
    quote: 'Por la Luz de la Aurora, ningún mal quedará en pie.',
    description: 'Campeón sagrado bendecido por los Soles Ancestrales. Protege a sus aliados con escudos de luz, curaciones masivas y juicios celestiales.',
    role: 'Soporte',
    stats: { strength: 85, agility: 40, intelligence: 80, defense: 92, mobility: 50, difficulty: 60 },
    primaryWeapon: 'Martillo Celaje & Escudo Sigilar',
    skills: [
      { id: 'pal-1', name: 'Juicio Divino', type: 'Activa', icon: 'Sun', description: 'Lanza un rayo solar que ciega a los objetivos e inflige daño sagrado en área.', cooldown: 8, cost: 50, damageType: 'Elementa', particleColor: '#eab308' },
      { id: 'pal-2', name: 'Baluarte de la Aurora', type: 'Activa', icon: 'Shield', description: 'Concede a los aliados un escudo sagrado que purga efectos negativos y devuelve el 30% del daño.', cooldown: 14, cost: 80, damageType: 'Elementa', particleColor: '#fef08a' },
      { id: 'pal-3', name: 'Aura Santificada', type: 'Pasiva', icon: 'Heart', description: 'Aumenta la regeneración de vida y la resistencia elemental de todo el equipo un 20%.', cooldown: 0, cost: 0, damageType: 'Elementa', particleColor: '#facc15' },
      { id: 'pal-ult', name: 'Ultimate: Ira Celestial de Aethelgard', type: 'Ultimate', icon: 'Sparkles', description: 'Crea un santuario de luz dorada invulnerable durante 4 segundos que cura totalmente a la banda e incinera enemigos.', cooldown: 100, cost: 160, damageType: 'Elementa', particleColor: '#f59e0b' },
    ],
    evolutions: [
      { name: 'Templario Solar', title: 'Rama de Castigo', description: 'Transforma las curaciones en explociones incandescentes.', icon: 'Flame', bonus: '+30% Daño Sagrado' },
      { name: 'Guardián del Alba', title: 'Rama de Bastión', description: 'Inmunidad a controles de masas permanente en aura.', icon: 'Shield', bonus: '+50% Tenacidad' },
    ]
  },
  {
    id: 'asesino',
    name: 'Asesino',
    archetype: 'Agilidad',
    icon: 'Crosshair',
    quote: 'El último sonido que escucharás será la sombra rasgando el viento.',
    description: 'Maestro del sigilo y el asesinato relámpago. Se desplaza en dimensiones sombrías para ejecutar objetivos frágiles en fracciones de segundo.',
    role: 'Asesino',
    stats: { strength: 45, agility: 100, intelligence: 50, defense: 35, mobility: 100, difficulty: 95 },
    primaryWeapon: 'Dagas gemelas del Eclipse Nocturno',
    skills: [
      { id: 'as-1', name: 'Paso Sombrio', type: 'Activa', icon: 'Move', description: 'Se teletransporta instantáneamente tras la espalda del objetivo e inflige un golpe crítico automático.', cooldown: 7, cost: 30, damageType: 'Físico', particleColor: '#3b82f6' },
      { id: 'as-2', name: 'Veneno de Hidra Sombría', type: 'Activa', icon: 'Skull', description: 'Imbuye las armas con toxina neurotóxica que reduce la curación del objetivo un 70%.', cooldown: 10, cost: 45, damageType: 'Caos', particleColor: '#10b981' },
      { id: 'as-3', name: 'Reflejos Fantasma', type: 'Pasiva', icon: 'Eye', description: 'Otorga un 25% de probabilidad de esquiva absoluta y otorga velocidad de movimiento al matar.', cooldown: 0, cost: 0, damageType: 'Físico', particleColor: '#06b6d4' },
      { id: 'as-ult', name: 'Ultimate: Danza de la Guillotina Estelar', type: 'Ultimate', icon: 'Scissors', description: 'Ejecuta 8 cortes ultrarrápidos invisibles en un área, reiniciando los enfriamientos si un enemigo muere.', cooldown: 75, cost: 120, damageType: 'Físico', particleColor: '#6366f1' },
    ],
    evolutions: [
      { name: 'Caminante del Vacío', title: 'Especialista en Invisibilidad', description: 'Invisibilidad prolongada e inmune a revelación por guardianes.', icon: 'EyeOff', bonus: '+40% Daño tras Sigilo' },
      { name: 'Segador de Sangre', title: 'Especialista en Hemorragia', description: 'Los ataques aplican sangrado acumulable hasta 10 veces.', icon: 'Droplet', bonus: '+25% Daño por Sangrado' },
    ]
  },
  {
    id: 'mago',
    name: 'Mago Arcano',
    archetype: 'Inteligencia',
    icon: 'Wand2',
    quote: 'Las leyes de la física son meras sugerencias ante la voluntad del éter.',
    description: 'Manipulador de los elementos primordiales. Desata tormentas de meteoro, congelaciones glaciales y explosiones arcanas a larga distancia.',
    role: 'Nuker',
    stats: { strength: 30, agility: 50, intelligence: 100, defense: 30, mobility: 60, difficulty: 85 },
    primaryWeapon: 'Cetro del Cataclismo Épico',
    skills: [
      { id: 'mg-1', name: 'Rayo Estelar Arcano', type: 'Activa', icon: 'Zap', description: 'Dispara un haz de energía condensada que penetra a todos los enemigos en fila recta.', cooldown: 4, cost: 55, damageType: 'Mágico', particleColor: '#a855f7' },
      { id: 'mg-2', name: 'Nova Glacial Inversa', type: 'Activa', icon: 'Snowflake', description: 'Congela a los enemigos circundantes por 2.5s y crea una barrera helada reflectante.', cooldown: 11, cost: 85, damageType: 'Mágico', particleColor: '#38bdf8' },
      { id: 'mg-3', name: 'Sintonía del Éter', type: 'Pasiva', icon: 'Sparkles', description: 'Cada hechizo lanzado otorga un 5% de velocidad de casteo adicional y reduce costos de mana.', cooldown: 0, cost: 0, damageType: 'Mágico', particleColor: '#c084fc' },
      { id: 'mg-ult', name: 'Ultimate: Lluvia de Meteoros de Titanio', type: 'Ultimate', icon: 'Flame', description: 'Bombardea una amplia zona con 12 meteoros devastadores que reducen a cenizas la resistencia mágica enemiga.', cooldown: 85, cost: 180, damageType: 'Mágico', particleColor: '#ec4899' },
    ],
    evolutions: [
      { name: 'Archimago Astral', title: 'Dominio de la Singularidad', description: 'Permite lanzar dos ultimates consecutivas mediante un eco arcano.', icon: 'Sparkle', bonus: '+40% Poder Mágico' },
      { name: 'Invocador de Tormentas', title: 'Rama Elemental', description: 'Los ataques alteran la gravedad y electrifican el suelo.', icon: 'CloudLightning', bonus: '+30% Probabilidad Crítica Mágica' },
    ]
  },
  {
    id: 'arquero',
    name: 'Arquero Silvano',
    archetype: 'Agilidad',
    icon: 'Target',
    quote: 'Mi flecha vuela antes de que escuches la cuerda del arco.',
    description: 'Tirador legendario de los bosques antiguos de Aethelgard. Combina movilidad ágil, trampas elementales y ráfagas de proyectiles guiados.',
    role: 'DPS a Distancia',
    stats: { strength: 40, agility: 98, intelligence: 55, defense: 40, mobility: 90, difficulty: 70 },
    primaryWeapon: 'Arco Largo del Viento Ancestral',
    skills: [
      { id: 'ar-1', name: 'Disparo Perforante Windrunner', type: 'Activa', icon: 'Target', description: 'Carga una flecha huracanada que atraviesa obstáculos y rompe armaduras.', cooldown: 5, cost: 40, damageType: 'Físico', particleColor: '#22c55e' },
      { id: 'ar-2', name: 'Trampa de Espinas Rúnicas', type: 'Activa', icon: 'Disc', description: 'Coloca una trampa invisible que inmoviliza por 3s e inflige veneno en área.', cooldown: 12, cost: 50, damageType: 'Elementa', particleColor: '#15803d' },
      { id: 'ar-3', name: 'Ojo de Águila Celestial', type: 'Pasiva', icon: 'Eye', description: 'Aumenta el rango de ataque un 30% y otorga visión de stealth a los alrededores.', cooldown: 0, cost: 0, damageType: 'Físico', particleColor: '#4ade80' },
      { id: 'ar-ult', name: 'Ultimate: Lluvia de Flechas Fénix', type: 'Ultimate', icon: 'Flame', description: 'Cubre el cielo con miles de flechas ardientes que caen durante 5 segundos sobre el carril enemigo.', cooldown: 80, cost: 130, damageType: 'Elementa', particleColor: '#f97316' },
    ],
    evolutions: [
      { name: 'Tirador de Élite', title: 'Maestría Snipe', description: 'Disparos a más de 1000m infligen triple daño.', icon: 'Crosshair', bonus: '+50% Daño a Larga Distancia' },
      { name: 'Forestal de la Sombra', title: 'Movilidad Silvana', description: 'Invisibilidad breve tras realizar una voltereta.', icon: 'Wind', bonus: '+35% Velocidad de Ataque' },
    ]
  },
  {
    id: 'nigromante',
    name: 'Nigromante',
    archetype: 'Caos',
    icon: 'Skull',
    quote: 'La muerte no es el final, es solo el comienzo de mi ejército.',
    description: 'Señor de la plaga y las osamentas. Alza legiones de esqueletos, desata maldiciones contagiosas y consume almas enemigas.',
    role: 'Controlador',
    stats: { strength: 35, agility: 45, intelligence: 95, defense: 50, mobility: 40, difficulty: 80 },
    primaryWeapon: 'Guadaña de las Criptas Prohibidas',
    skills: [
      { id: 'ng-1', name: 'Alzar Legión Ósea', type: 'Activa', icon: 'Users', description: 'Invoca 4 guerreros esqueleto y 2 magos de plaga que atacan a los objetivos prioritarios.', cooldown: 15, cost: 70, damageType: 'Caos', particleColor: '#84cc16' },
      { id: 'ng-2', name: 'Maldición de Decrepitud', type: 'Activa', icon: 'Ghost', description: 'Maldice a los enemigos reduciendo su daño de ataque un 40% y ralentizándolos un 50%.', cooldown: 10, cost: 60, damageType: 'Caos', particleColor: '#65a30d' },
      { id: 'ng-3', name: 'Cosechador de Almas', type: 'Pasiva', icon: 'HeartPulse', description: 'Cada unidad que muere cerca recupera vida y mana al Nigromante y fortalece sus esbirros.', cooldown: 0, cost: 0, damageType: 'Caos', particleColor: '#a3e635' },
      { id: 'ng-ult', name: 'Ultimate: Golem de Sangre & Osario Catastrófico', type: 'Ultimate', icon: 'Skull', description: 'Erige un gólem esquelético gigante de nivel jefe que destruye estructuras y devora oleadas enemigas.', cooldown: 110, cost: 200, damageType: 'Caos', particleColor: '#4d7c0f' },
    ],
    evolutions: [
      { name: 'Rey de las Criptas', title: 'Invocación Suprema', description: 'Los esbirros ganan escudos y resucitan una vez.', icon: 'Crown', bonus: '+100% Vida de Invocaciones' },
      { name: 'Señor de la Peste', title: 'Maldición Contagiosa', description: 'Las plagas se transmiten automáticamente a unidades adyacentes.', icon: 'Biohazard', bonus: '+40% Daño de Veneno' },
    ]
  },
  {
    id: 'chaman',
    name: 'Chamán Primordial',
    archetype: 'Fe',
    icon: 'Flame',
    quote: 'Escucha el rugido de la tierra y la furia de los elementos ancestrales.',
    description: 'Comulgador con los tótems elementales. Canaliza la furia del volcán, los relámpagos del firmamento y las mareas sanadoras.',
    role: 'Soporte',
    stats: { strength: 70, agility: 50, intelligence: 85, defense: 75, mobility: 60, difficulty: 65 },
    primaryWeapon: 'Tótem de Guerra de los Ancestros',
    skills: [
      { id: 'ch-1', name: 'Tótem de Tormenta Eléctrica', type: 'Activa', icon: 'Zap', description: 'Planta un tótem que emite descargas eléctricas a 3 enemigos cada segundo.', cooldown: 12, cost: 65, damageType: 'Elementa', particleColor: '#0284c7' },
      { id: 'ch-2', name: 'Ola Sanadora Mares Primordiales', type: 'Activa', icon: 'Droplet', description: 'Una marea de agua curativa rebota entre 5 aliados, aumentando su armadura.', cooldown: 8, cost: 70, damageType: 'Elementa', particleColor: '#38bdf8' },
      { id: 'ch-3', name: 'Piel de Piedra Volcánica', type: 'Pasiva', icon: 'Shield', description: 'Otorga resistencia a aturdimientos y devuelve daño de fuego a los atacantes.', cooldown: 0, cost: 0, damageType: 'Elementa', particleColor: '#ea580c' },
      { id: 'ch-ult', name: 'Ultimate: Terremoto Ancestral de Aethelgard', type: 'Ultimate', icon: 'Mountain', description: 'Abre grietas volcánicas en el terreno, derribando a los campeones enemigos y alterando la geografía del mapa.', cooldown: 95, cost: 170, damageType: 'Elementa', particleColor: '#d97706' },
    ],
    evolutions: [
      { name: 'Espíritu de la Tormenta', title: 'Dominio del Rayo', description: 'Las descargas encadenadas aturden por 1.5s.', icon: 'CloudLightning', bonus: '+35% Daño de Tormenta' },
      { name: 'Anciano de la Tierra', title: 'Tótem Viviente', description: 'Los tótems absorben todo el daño dirigido a aliados.', icon: 'Trees', bonus: '+50% Armadura de Banda' },
    ]
  },
  {
    id: 'monje',
    name: 'Monje Zen del Dragón',
    archetype: 'Agilidad',
    icon: 'Activity',
    quote: 'La mente es la espada más afilada; el cuerpo, la armadura definitiva.',
    description: 'Luchador místico con artes marciales sagradas. Utiliza contraataques fluidos, patadas de dragón y escudos de Qi para dominar el campo de batalla.',
    role: 'DPS Ca cuerpo',
    stats: { strength: 75, agility: 90, intelligence: 65, defense: 70, mobility: 95, difficulty: 90 },
    primaryWeapon: 'Guanteletes de Qi Celestiales & Nunchakus',
    skills: [
      { id: 'mo-1', name: 'Patada del Dragón Dorado', type: 'Activa', icon: 'Zap', description: 'Se lanza hacia adelante con una patada relámpago que empuja a los enemigos contra estructuras.', cooldown: 6, cost: 35, damageType: 'Físico', particleColor: '#eab308' },
      { id: 'mo-2', name: 'Palma del Qi Inviolable', type: 'Activa', icon: 'Shield', description: 'Bloquea todo el daño frontal durante 1.5s y refleja un contraataque desorientador.', cooldown: 10, cost: 40, damageType: 'Físico', particleColor: '#fef08a' },
      { id: 'mo-3', name: 'Fluidez del Chakra', type: 'Pasiva', icon: 'RotateCw', description: 'Cada habilidad utilizada recarga energía de Qi y aumenta la velocidad de movimiento un 15%.', cooldown: 0, cost: 0, damageType: 'Físico', particleColor: '#facc15' },
      { id: 'mo-ult', name: 'Ultimate: Ascensión del Dragón de Jade', type: 'Ultimate', icon: 'Sparkles', description: 'Canaliza el espíritu de un dragón astral que levanta por los aires a los rivales y los remata contra la tierra.', cooldown: 70, cost: 100, damageType: 'Físico', particleColor: '#10b981' },
    ],
    evolutions: [
      { name: 'Maestro Zen Celestial', title: 'Armonía Divina', description: 'Inmunidad a controles de masas durante el combo de Qi.', icon: 'Sun', bonus: '+30% Probabilidad de Contraataque' },
      { name: 'Punzó del Viento Asesino', title: 'Artes Prohibidas', description: 'Gana daño verdadero al atacar por los flancos.', icon: 'Wind', bonus: '+25% Daño Verdadero' },
    ]
  },
  {
    id: 'guerrero',
    name: 'Guerrero Berseker',
    archetype: 'Fuerza',
    icon: 'Axes',
    quote: 'En el centro del caos, solo mi hacha decidirá quién vive.',
    description: 'Incomparable maestro de las armas pesadas. A medida que pierde vida, su furia aumenta drásticamente, volviéndolo imparable.',
    role: 'DPS Ca cuerpo',
    stats: { strength: 100, agility: 60, intelligence: 30, defense: 80, mobility: 70, difficulty: 55 },
    primaryWeapon: 'Hachas Míticas de la Furia Sangrienta',
    skills: [
      { id: 'gu-1', name: 'Salto Devastador', type: 'Activa', icon: 'ArrowUp', description: 'Impacta violentamente contra el suelo, creando un cráter que ralentiza a los enemigos.', cooldown: 7, cost: 30, damageType: 'Físico', particleColor: '#ef4444' },
      { id: 'gu-2', name: 'Grito de Guerra Imparable', type: 'Activa', icon: 'Volume2', description: 'Aumenta el daño de ataque un 40% y elimina todos los efectos de inmovilización.', cooldown: 14, cost: 40, damageType: 'Físico', particleColor: '#f87171' },
      { id: 'gu-3', name: 'Furia de Titán', type: 'Pasiva', icon: 'Flame', description: 'Otorga un 1% de velocidad de ataque y un 0.8% de vampirismo por cada 2% de vida faltante.', cooldown: 0, cost: 0, damageType: 'Físico', particleColor: '#b91c1c' },
      { id: 'gu-ult', name: 'Ultimate: Frenesí Berseker Inmortal', type: 'Ultimate', icon: 'Zap', description: 'Se vuelve inmune a la muerte durante 6 segundos. Todo el daño infligido lo cura al terminar.', cooldown: 80, cost: 0, damageType: 'Físico', particleColor: '#7f1d1d' },
    ],
    evolutions: [
      { name: 'Destructor de Reinos', title: 'Camino del Titán', description: 'Sus ataques causan ondas expansivas que rompen escudos.', icon: 'Hammer', bonus: '+40% Daño a Estructuras y Jefes' },
      { name: 'Señor del Sangrado', title: 'Camino de Sangre', description: 'Cada golpe causa sangrado acumulativo y roba velocidad.', icon: 'Droplet', bonus: '+30% Vampirismo' },
    ]
  },
  {
    id: 'invocador',
    name: 'Invocador Primordial',
    archetype: 'Inteligencia',
    icon: 'Sparkles',
    quote: 'No lucho solo; las bestias astrales de Aethelgard responden a mi llamada.',
    description: 'Estratega místico que invoca quimeras gigantes, grifos de tormenta y bestias astrales para dominar el terreno de juego.',
    role: 'Controlador',
    stats: { strength: 40, agility: 50, intelligence: 98, defense: 55, mobility: 65, difficulty: 88 },
    primaryWeapon: 'Orbe de Invocación de la Nebulosa',
    skills: [
      { id: 'inv-1', name: 'Invocación: Grifo de Tormenta', type: 'Activa', icon: 'Feather', description: 'Despliega una bestia alada que sobrevuela el mapa revelando enemigos y lanzando rayo.', cooldown: 12, cost: 70, damageType: 'Mágico', particleColor: '#38bdf8' },
      { id: 'inv-2', name: 'Portal Astrál de Desplazamiento', type: 'Activa', icon: 'Disc', description: 'Abre un portal para transportar instantáneamente a todo el equipo a 2000m de distancia.', cooldown: 45, cost: 120, damageType: 'Mágico', particleColor: '#c084fc' },
      { id: 'inv-3', name: 'Vínculo Simbiótico', type: 'Pasiva', icon: 'Link', description: 'El 30% del daño recibido por el Invocador se redirige a sus bestias invocadas.', cooldown: 0, cost: 0, damageType: 'Mágico', particleColor: '#a855f7' },
      { id: 'inv-ult', name: 'Ultimate: Quimera Devoradora del Éter', type: 'Ultimate', icon: 'Sparkles', description: 'Invoca una quimera colosal de 3 cabezas que engulle a los héroes enemigos y los aturde.', cooldown: 105, cost: 210, damageType: 'Mágico', particleColor: '#e879f9' },
    ],
    evolutions: [
      { name: 'Maestro de las Bestias Astrales', title: 'Invocaciones Míticas', description: 'Permite mantener 2 Quimeras gigantes simultáneas.', icon: 'Crown', bonus: '+60% Daño de Bestias' },
      { name: 'Estratega del Éter', title: 'Portales de Guerra', description: 'Los portales potencian el ataque de los aliados que los atraviesan.', icon: 'Zap', bonus: '+30% Velocidad de Movimiento Global' },
    ]
  }
];

// Equipment list with 6 Rarities
export const GAME_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'weapon-1',
    name: 'Gran Mandoble del Apocalipsis Rúnico',
    slot: 'Espada',
    rarity: 'Ancestral',
    levelReq: 80,
    icon: 'Sword',
    stats: { damage: 1850, critChance: 35, cooldownRed: 20, health: 1200 },
    sockets: 4,
    runesInserted: ['Runa de Sangre Caótica', 'Runa de Devastación Solar', 'Runa de Titán', 'Runa del Éter'],
    lore: 'Forjada en el corazón del volcán sumergido de Aethelgard con las almas de tres dragones primordiales.',
    craftable: true,
    materialsNeeded: [
      { name: 'Lingote de Adamantita Infernal', count: 12, category: 'Minería' },
      { name: 'Escama de Ignisrax', count: 4, category: 'Monstruos' },
      { name: 'Esencia de Abismo', count: 8, category: 'Alquimia' }
    ]
  },
  {
    id: 'weapon-2',
    name: 'Cetro Astral del Archimago Sol',
    slot: 'Bastón',
    rarity: 'Mítico',
    levelReq: 75,
    icon: 'Wand2',
    stats: { damage: 1620, mana: 2500, elementalPower: 45, cooldownRed: 25 },
    sockets: 3,
    runesInserted: ['Runa del Viento Astral', 'Runa de Singularidad'],
    lore: 'Canaliza las constelaciones muertas para pulverizar barreras mágicas.',
    craftable: true,
    materialsNeeded: [
      { name: 'Cristal de Éter Estelar', count: 20, category: 'Minería' },
      { name: 'Polvo de Halcón Lunar', count: 5, category: 'Pesca' }
    ]
  },
  {
    id: 'armor-1',
    name: 'Coraza del Tirano de las Sombras',
    slot: 'Armadura',
    rarity: 'Legendario',
    levelReq: 70,
    icon: 'Shield',
    stats: { armor: 980, health: 3400, cooldownRed: 15 },
    sockets: 3,
    runesInserted: ['Runa de Placas Fortificadas'],
    lore: 'Portada por el Rey Caído durante el Asedio del Trono Oscuro.',
    craftable: true,
    materialsNeeded: [
      { name: 'Placa de Hierro Negro', count: 15, category: 'Minería' },
      { name: 'Elixir de Sangre de Titán', count: 6, category: 'Alquimia' }
    ]
  },
  {
    id: 'helm-1',
    name: 'Casco de la Corona de Sombras',
    slot: 'Casco',
    rarity: 'Épico',
    levelReq: 60,
    icon: 'Crown',
    stats: { armor: 420, health: 1100, critChance: 12 },
    sockets: 2,
    lore: 'Su aura infunde pavor a los enemigos cercanos.',
    craftable: false
  },
  {
    id: 'pet-1',
    name: 'Fénix Abisal de Aethelgard',
    slot: 'Mascota',
    rarity: 'Ancestral',
    levelReq: 1,
    icon: 'Sparkles',
    stats: { damage: 500, health: 1500, cooldownRed: 10 },
    sockets: 2,
    lore: 'Mascota legendaria que resucita al héroe una vez por partida con 50% de vida.',
    craftable: false
  },
  {
    id: 'boots-1',
    name: 'Grebas del Caminante del Viento',
    slot: 'Botas',
    rarity: 'Raro',
    levelReq: 40,
    icon: 'Footprints',
    stats: { armor: 180, health: 500 },
    sockets: 1,
    lore: 'Aumenta la velocidad de movimiento un 25% fuera de combate.',
    craftable: false
  },
  {
    id: 'ring-1',
    name: 'Anillo del Eclipse Sol-Luna',
    slot: 'Anillo',
    rarity: 'Legendario',
    levelReq: 65,
    icon: 'Disc',
    stats: { damage: 320, critChance: 18, elementalPower: 20 },
    sockets: 2,
    lore: 'Combina el calor abrasador y el frío del espacio exterior.',
    craftable: true,
    materialsNeeded: [
      { name: 'Perla de Marea Profunda', count: 8, category: 'Pesca' },
      { name: 'Polvo Rúnico', count: 10, category: 'Alquimia' }
    ]
  }
];

// Map Scenarios AAA
export const MAP_SCENARIOS: MapScenario[] = [
  {
    id: 'map-1',
    name: 'Bosque de los Faros de Jade',
    category: 'Bosque',
    description: 'Arboleda encantada cubierta de esporas luminosas y árboles ancestrales de 100 metros. Luz de Lumen atravesando el follaje denso.',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1600&q=80',
    ambientAudio: 'Viento susurrante & grillos místicos',
    features: ['Vegetación Interactiva Nanite', 'Niebla Volumétrica', 'Esporas Mágicas en Suspensión', 'Ríos con Físicas Realistas'],
    rayTracingReflections: true,
    defaultWeather: 'Niebla'
  },
  {
    id: 'map-2',
    name: 'Bastión Colosal del Rey Sol',
    category: 'Castillo',
    description: 'Fortaleza medieval con arquitectura gótica monumental, vitrales de cristal arcano y estandartes con físicas de tela en tiempo real.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    ambientAudio: 'Campanas lejanas & coros orquestales',
    features: ['Destrucción Estructural en Tiempo Real', 'Sombra Dinámica Lumen', 'Banderas con Simulación Física Chaos'],
    rayTracingReflections: true,
    defaultWeather: 'Despejado'
  },
  {
    id: 'map-3',
    name: 'Abismo de las Calderas de Volcán',
    category: 'Volcán',
    description: 'Caverna subterránea eruptiva con ríos de lava incandescente, humo volumétrico denso y rocas flotantes sujetas por cadenas sagradas.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    ambientAudio: 'Rugido de magma & explosiones de ceniza',
    features: ['Emisión de Luz Dinámica por Lava', 'Ray Tracing Reflejos Térmicos', 'Ceniza Volumétrica HD'],
    rayTracingReflections: true,
    defaultWeather: 'Ceniza Volcánica'
  },
  {
    id: 'map-4',
    name: 'Catedral en Ruinas del Eclipse',
    category: 'Ruina',
    description: 'Antiguo templo gótico derruido por guerras de titanes. Pilares derribados y altar inundado por aguas celestiales.',
    imageUrl: HERO_BANNER_IMG,
    ambientAudio: 'Lluvia cayendo sobre arcos de piedra',
    features: ['Texturas 8K PBR', 'Lumen Global Illumination', 'Rastro de Runas'],
    rayTracingReflections: true,
    defaultWeather: 'Lluvia'
  }
];

// Enemy & Giant Bosses
export const GAME_BOSSES: EnemyBoss[] = [
  {
    id: 'boss-1',
    name: 'Ignisrax el Devorador de Soles',
    title: 'Jefe Final de Raid de Zanja - Nivel 100',
    type: 'Jefe Final de Raid',
    level: 100,
    health: 2500000,
    imageUrl: BOSS_ENCOUNTER_IMG,
    description: 'Dragón titánico de magma y obsidianas primordiales. Sus llamaradas derriten la armadura y colapsan las columnas de la mazmorra.',
    weakness: 'Daño Sagrado y Glacial en el Núcleo del Pecho',
    mechanics: [
      'Llamarada Volumétrica de 360 grados',
      'Colapso de Techumbre con caída de estalactitas',
      'Marca de Conflagración Incurable'
    ],
    phases: [
      { phaseNumber: 1, name: 'Despertar de Ignisrax', triggerHealthPercent: 100, specialAttack: 'Soplido de Magma Volumétrico', enviroDestruction: 'Agrietamiento del suelo' },
      { phaseNumber: 2, name: 'Furia de las Calderas', triggerHealthPercent: 60, specialAttack: 'Lluvia de Meteoros de Lava', enviroDestruction: 'Inundación parcial de lava en la arena' },
      { phaseNumber: 3, name: 'Enrage Apocalíptico', triggerHealthPercent: 20, specialAttack: 'Onda del Cataclismo Final', enviroDestruction: 'Destrucción total de los pilares de cobertura' }
    ],
    drops: [
      { itemName: 'Escama de Ignisrax Ancestral', rarity: 'Ancestral' },
      { itemName: 'Núcleo de Magma Titánico', rarity: 'Mítico' },
      { itemName: 'Coraza del Devorador', rarity: 'Legendario' }
    ]
  },
  {
    id: 'boss-2',
    name: 'Malakor el Rey de Sombras',
    title: 'Gobernante del Trono Caído',
    type: 'Jefe de Zanja',
    level: 85,
    health: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    description: 'Monarca nigromántico que manipula espejismos de sombra y cadenas profanas para dividir a la banda.',
    weakness: 'Ataques de Luz Celaje y Aturdimientos',
    mechanics: [
      'Clones de Sombras Espejo',
      'Cadenas de Almas Vinculadas',
      'Grito de Decrepitud'
    ],
    phases: [
      { phaseNumber: 1, name: 'Manto de Penumbra', triggerHealthPercent: 100, specialAttack: 'Corte de Abismo', enviroDestruction: 'Apagón de las antorchas' },
      { phaseNumber: 2, name: 'Ejército de los Caídos', triggerHealthPercent: 50, specialAttack: 'Invocación de Espectros', enviroDestruction: 'Niebla de sombra densa' }
    ],
    drops: [
      { itemName: 'Guadaña de Malakor', rarity: 'Mítico' },
      { itemName: 'Manto de Pavor', rarity: 'Épico' }
    ]
  }
];

// MOBA Lanes & Arena Data
export const MOBA_LANES: MobaLaneData[] = [
  {
    name: 'Carril Superior',
    towersLeft: { radiants: 3, dire: 3 },
    creepWaveState: 'Oleada de Megasúbditos colisionando cerca del Portal',
    neutralBossState: 'Disponible',
    recommendedStrategy: 'Zona de duelo 1v1 para Tanques y Bersekers. Control de visión en las hierbas de jungla superior.'
  },
  {
    name: 'Carril Central',
    towersLeft: { radiants: 2, dire: 2 },
    creepWaveState: 'Pelea de Midlaners cerca de la Runa de Doble Daño',
    neutralBossState: 'Respawn en 2:30',
    recommendedStrategy: 'Vía estratégica rápida para la rotación de Magos y Asesinos. Prioridad de torre de nivel 1.'
  },
  {
    name: 'Carril Inferior',
    towersLeft: { radiants: 3, dire: 3 },
    creepWaveState: 'Empuje de la línea por el Arquero y Paladín',
    neutralBossState: 'Disponible',
    recommendedStrategy: 'Carril dual de tirador y soporte. Asegurar campamentos de la zanja inferior.'
  },
  {
    name: 'Fosa de Aethelgard',
    towersLeft: { radiants: 0, dire: 0 },
    creepWaveState: 'Territorio Neutral de Combate',
    neutralBossState: 'Derrotado (Buff Activo)',
    recommendedStrategy: 'Zona de combate 5v5 por el buff ancestral de Aegis de la Inmortalidad.'
  }
];

// Cosmetics
export const STORE_COSMETICS: StoreCosmetic[] = [
  {
    id: 'skin-1',
    name: 'Kaelen: Señor del Caos Cósmico',
    type: 'Skin Mítica',
    rarity: 'Ancestral',
    priceGold: 50000,
    priceGems: 2500,
    previewColor: '#8b5cf6',
    discountBadge: '-20% OFERTA LANZAMIENTO',
    description: 'Aspecto mítico con efectos de partículas de agujero negro, voz personalizada y animación de victoria de trono.'
  },
  {
    id: 'skin-2',
    name: 'Efecto de Arma: Furia Incandescente',
    type: 'Efecto de Arma',
    rarity: 'Mítico',
    priceGold: 25000,
    priceGems: 1200,
    previewColor: '#f97316',
    description: 'Envuelve tu arma en un aura de fuego fénix con estelas de humo volumétrico.'
  },
  {
    id: 'mount-1',
    name: 'Grifo del Amanecer Dorado',
    type: 'Montura Legendaria',
    rarity: 'Legendario',
    priceGold: 30000,
    priceGems: 1500,
    previewColor: '#eab308',
    description: 'Montura voladora con alas compuestas de plumas de luz celaje.'
  },
  {
    id: 'pass-1',
    name: 'Pase de Batalla: Temporada I - Destino del Éter',
    type: 'Pase de Batalla',
    rarity: 'Legendario',
    priceGold: 10000,
    priceGems: 950,
    previewColor: '#10b981',
    discountBadge: 'INCLUYE 100 NIVELES',
    description: 'Desbloquea 100 recompensas exclusivas incluyendo skins, monturas, cofres míticos y 1500 gemas.'
  }
];
