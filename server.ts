import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", game: "Aethelgard: Fate of the Ancients", engine: "Unreal Engine 5.5" });
});

// AI Lore & Hero Backstory Generator
app.post("/api/ai/lore", async (req, res) => {
  try {
    const { heroName, heroClass, faction, prompt } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is missing on server" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Eres el Director Creativo y Guionista Principal del videojuego de fantasía épica AAA "Aethelgard: Fate of the Ancients".
Escribe un fragmento de lore dramático, poético y atmosférico en español sobre el héroe "${heroName || 'Kaelen el Primogénito'}" de la clase "${heroClass || 'Caballero Oscuro'}" perteneciente a la facción "${faction || 'Orden de la Runa Caída'}".
Contexto adicional del usuario: ${prompt || 'Crear historia de origen legendario con artefacto mítico'}.
Responde en formato JSON con la siguiente estructura:
{
  "title": "Título del Capítulo de Lore",
  "synopsis": "Breve resumen poético",
  "fullText": "Fragmento largo y épico con descripciones de armadura, habilidades y destino en Aethelgard",
  "quote": "Cita memorable del héroe",
  "keyArtifact": "Nombre del arma o artefacto legendario asociado"
}`,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Lore API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate lore" });
  }
});

// AI Build & Synergy Optimizer
app.post("/api/ai/build-advisor", async (req, res) => {
  try {
    const { heroClass, playstyle, gameMode } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is missing on server" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Eres un Game Designer Senior de MOBA y Action RPG AAA.
Crea una recomendación de Build Optimizada para la clase "${heroClass}" enfocada en un estilo de juego "${playstyle}" en modo "${gameMode}".
Escribe la respuesta en español en formato JSON con la siguiente estructura:
{
  "buildName": "Nombre épico de la Build",
  "coreStatFocus": ["Estadística 1", "Estadística 2"],
  "recommendedItems": ["Objeto 1", "Objeto 2", "Objeto 3", "Objeto 4", "Objeto 5", "Objeto 6"],
  "skillPriority": ["Habilidad Prioridad 1", "Habilidad Prioridad 2", "Ultimate"],
  "comboSequence": "Explicación paso a paso de la rotación de habilidades",
  "tacticalAdvice": "Consejo táctico para peleas de equipo 5v5 o jefes de raid"
}`,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Build Advisor Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate build advice" });
  }
});

// AI Boss Strategy & Tactical Raid Guide
app.post("/api/ai/boss-strategy", async (req, res) => {
  try {
    const { bossName, partyComposition } = req.body;
    const ai = getAiClient();
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is missing on server" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Eres el Director de Combate de "Aethelgard: Fate of the Ancients".
Genera una guía de estrategia táctica para derrotar al Jefe Gigante de Raid "${bossName}" con un equipo compuesto por "${partyComposition}".
Escribe en español en formato JSON:
{
  "bossThreatLevel": "Mítico / Ancestral",
  "phaseBreakdown": [
    { "phase": "Fase 1", "mechanic": "Mecánica clave", "warning": "Ataque fatal a esquivar" },
    { "phase": "Fase 2", "mechanic": "Mecánica clave", "warning": "Ataque fatal a esquivar" },
    { "phase": "Fase 3", "mechanic": "Enrage y colapso del entorno", "warning": "Condición de victoria rápida" }
  ],
  "raidRequirements": "Estrategia de posicionamiento y rotación de escudos",
  "enrageTimer": "5:00 minutos"
}`,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Boss Strategy Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate boss strategy" });
  }
});

// Setup Vite Development Server or Serve Dist in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aethelgard Server] AAA Engine backend running on http://localhost:${PORT}`);
  });
}

startServer();
