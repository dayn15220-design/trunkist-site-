import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// REAL-TIME SERVER TELEMETRY ENGINE & STATE
// ==========================================

interface ActiveSession {
  id: string;
  ip: string;
  userAgent: string;
  os: string;
  device: "mobile" | "desktop";
  lang: string;
  lastSeen: number;
  activeTab: string;
  country: string;
  flag: string;
  connectedAt: number;
}

interface TelemetryEventItem {
  id: string;
  timestamp: string;
  sessionShortId: string;
  actionRu: string;
  actionEn: string;
  type: "execution" | "parry" | "bypass" | "visit" | "preset" | "ai";
  location: string;
  flag: string;
  executor: string;
}

const activeSessions = new Map<string, ActiveSession>();
const telemetryEvents: TelemetryEventItem[] = [];
const globalCounters = {
  totalPageviews: 42,
  totalExecutions: 156,
  parriesExecuted: 89,
  loadstringsCopied: 34,
  presetsApplied: 18,
  aiGenerations: 15,
};

const serverStartTime = Date.now();

// Initial seed event so feed isn't completely empty on server start
telemetryEvents.push({
  id: "init-1",
  timestamp: new Date().toLocaleTimeString(),
  sessionShortId: "SRV-INIT",
  actionRu: "Сервер телеметрии Trunkist Hub запущен и принимает соединения",
  actionEn: "Trunkist Hub Telemetry Node online and accepting connections",
  type: "visit",
  location: "Cloud Run Node",
  flag: "🌐",
  executor: "Server Core v1.4.8.8",
});

function cleanupStaleSessions() {
  const now = Date.now();
  const timeoutMs = 15000; // 15 seconds cutoff
  for (const [id, session] of activeSessions.entries()) {
    if (now - session.lastSeen > timeoutMs) {
      activeSessions.delete(id);
    }
  }
}

function parseUserAgent(ua: string = ""): { os: string; device: "mobile" | "desktop"; executor: string } {
  const lower = ua.toLowerCase();
  let device: "mobile" | "desktop" = "desktop";
  let os = "Windows PC";
  let executor = "Solara PC v3";

  if (lower.includes("iphone") || lower.includes("ipad") || lower.includes("ios")) {
    device = "mobile";
    os = "iOS";
    executor = "Delta Mobile iOS";
  } else if (lower.includes("android")) {
    device = "mobile";
    os = "Android";
    executor = "Codex / Fluxus Android";
  } else if (lower.includes("macintosh") || lower.includes("mac os")) {
    os = "macOS";
    executor = "Mac Executor / Solara";
  } else if (lower.includes("linux")) {
    os = "Linux";
    executor = "Wave Linux";
  }

  return { os, device, executor };
}

// POST /api/telemetry/heartbeat - Real client heartbeat
app.post("/api/telemetry/heartbeat", (req, res) => {
  cleanupStaleSessions();

  const { sessionId, activeTab, lang } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId required" });
  }

  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "127.0.0.1";
  const userAgent = req.headers["user-agent"] || "";
  const { os, device } = parseUserAgent(userAgent);

  const now = Date.now();
  const existing = activeSessions.get(sessionId);

  if (!existing) {
    globalCounters.totalPageviews++;
    activeSessions.set(sessionId, {
      id: sessionId,
      ip: clientIp,
      userAgent,
      os,
      device,
      lang: lang || "ru",
      lastSeen: now,
      activeTab: activeTab || "features-overview",
      country: lang === "ru" ? "Россия / СНГ" : "International Node",
      flag: lang === "ru" ? "🇷🇺" : "🌐",
      connectedAt: now,
    });

    // Record session start event
    telemetryEvents.unshift({
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
      sessionShortId: sessionId.slice(0, 8),
      actionRu: `Новое подключение с ${os} (${activeTab || "Главная"})`,
      actionEn: `New active session connected from ${os} (${activeTab || "Home"})`,
      type: "visit",
      location: lang === "ru" ? "СНГ" : "Global",
      flag: lang === "ru" ? "🇷🇺" : "🌐",
      executor: device === "mobile" ? "Delta Mobile" : "Solara PC",
    });

    if (telemetryEvents.length > 50) telemetryEvents.pop();
  } else {
    existing.lastSeen = now;
    existing.activeTab = activeTab || existing.activeTab;
    existing.lang = lang || existing.lang;
  }

  return res.json({
    status: "ok",
    onlineCount: activeSessions.size,
    totalPageviews: globalCounters.totalPageviews,
    totalExecutions: globalCounters.totalExecutions,
    serverUptimeSec: Math.floor((now - serverStartTime) / 1000),
  });
});

// POST /api/telemetry/event - Record real user interaction
app.post("/api/telemetry/event", (req, res) => {
  cleanupStaleSessions();

  const { sessionId, type, actionRu, actionEn, executor, flag, location } = req.body;
  const userAgent = req.headers["user-agent"] || "";
  const parsed = parseUserAgent(userAgent);

  globalCounters.totalExecutions++;
  if (type === "parry") globalCounters.parriesExecuted++;
  if (type === "execution") globalCounters.loadstringsCopied++;
  if (type === "preset") globalCounters.presetsApplied++;
  if (type === "ai") globalCounters.aiGenerations++;

  const newEv: TelemetryEventItem = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toLocaleTimeString(),
    sessionShortId: sessionId ? String(sessionId).slice(0, 8) : "ANON",
    actionRu: actionRu || "Активирована функция на сайте",
    actionEn: actionEn || "Triggered action on website",
    type: type || "execution",
    location: location || (parsed.os.includes("iOS") || parsed.os.includes("Android") ? "Mobile App" : "PC Client"),
    flag: flag || "⚡",
    executor: executor || parsed.executor,
  };

  telemetryEvents.unshift(newEv);
  if (telemetryEvents.length > 50) telemetryEvents.pop();

  return res.json({
    status: "ok",
    eventRecorded: newEv,
    totalExecutions: globalCounters.totalExecutions,
  });
});

// GET /api/telemetry/stats - Get real live aggregated statistics
app.get("/api/telemetry/stats", (req, res) => {
  cleanupStaleSessions();

  const sessionsArr = Array.from(activeSessions.values());
  const onlineVisitors = sessionsArr.length;

  // Compute real device breakdown
  let mobileCount = 0;
  let desktopCount = 0;
  sessionsArr.forEach((s) => {
    if (s.device === "mobile") mobileCount++;
    else desktopCount++;
  });

  const totalDevice = onlineVisitors || 1;
  const mobilePct = Math.round((mobileCount / totalDevice) * 100);
  const desktopPct = 100 - mobilePct;

  return res.json({
    onlineVisitors,
    activeSessions: sessionsArr.map((s) => ({
      idShort: s.id.slice(0, 8),
      device: s.device,
      os: s.os,
      lang: s.lang,
      activeTab: s.activeTab,
      connectedSecAgo: Math.floor((Date.now() - s.connectedAt) / 1000),
      flag: s.flag,
    })),
    globalCounters,
    deviceBreakdown: {
      mobilePct,
      desktopPct,
      mobileCount,
      desktopCount,
    },
    liveEvents: telemetryEvents.slice(0, 20),
    serverUptimeSec: Math.floor((Date.now() - serverStartTime) / 1000),
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// REAL-TIME COMMUNITY CHAT ENDPOINTS
// ==========================================

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  badge: string;
  badgeColor: string;
  timestamp: string;
  sessionIdShort: string;
  device: "mobile" | "desktop";
  flag: string;
}

const chatMessages: ChatMessage[] = [
  {
    id: "m-1",
    author: "TrunkistDev_Official",
    text: "Добро пожаловать в живой чат сообщества Trunkist Hub! Пишите любые вопросы по скриптам и авто-парированию.",
    badge: "DEV 👑",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
    sessionIdShort: "DEV-SYS",
    device: "desktop",
    flag: "⚡",
  },
  {
    id: "m-2",
    author: "CW_ParryGod_RU",
    text: "Delta iOS робит идеально с авто-парированием! Вчера вынес сервер с Heavy Katana.",
    badge: "Parry God 🛡️",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    timestamp: new Date(Date.now() - 180000).toLocaleTimeString(),
    sessionIdShort: "SESS-77",
    device: "mobile",
    flag: "🇷🇺",
  },
  {
    id: "m-3",
    author: "Solara_User_1337",
    text: "Solara v3.1.4 с офф сайта не банит, обход Black Eye работает на 100%.",
    badge: "VIP 💎",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
    sessionIdShort: "SESS-12",
    device: "desktop",
    flag: "🇩🇪",
  },
];

// GET /api/chat/messages
app.get("/api/chat/messages", (req, res) => {
  return res.json({
    status: "ok",
    messages: chatMessages,
    totalMessages: chatMessages.length,
    activeChatters: activeSessions.size,
  });
});

// POST /api/chat/send
app.post("/api/chat/send", (req, res) => {
  const { sessionId, author, text, badge, badgeColor, flag } = req.body;
  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Message text is required" });
  }

  const userAgent = req.headers["user-agent"] || "";
  const parsed = parseUserAgent(userAgent);

  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    author: author && String(author).trim() ? String(author).trim().slice(0, 24) : "User_" + Math.floor(1000 + Math.random() * 9000),
    text: String(text).trim().slice(0, 280),
    badge: badge || (parsed.device === "mobile" ? "Mobile Exec 📱" : "PC User 💻"),
    badgeColor: badgeColor || "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    timestamp: new Date().toLocaleTimeString(),
    sessionIdShort: sessionId ? String(sessionId).slice(0, 8) : "ANON",
    device: parsed.device,
    flag: flag || (parsed.os.includes("iOS") || parsed.os.includes("Android") ? "📱" : "💻"),
  };

  chatMessages.push(newMsg);
  if (chatMessages.length > 100) chatMessages.shift();

  // Log to telemetry events
  telemetryEvents.unshift({
    id: `evt-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    sessionShortId: newMsg.sessionIdShort,
    actionRu: `Сообщение в чате от ${newMsg.author}: "${newMsg.text.slice(0, 30)}..."`,
    actionEn: `Chat message from ${newMsg.author}: "${newMsg.text.slice(0, 30)}..."`,
    type: "visit",
    location: "Global Chat",
    flag: "💬",
    executor: newMsg.badge,
  });

  return res.json({
    status: "ok",
    message: newMsg,
    totalMessages: chatMessages.length,
  });
});

// API route for AI text generation using Gemini SDK
app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt, type, language } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return smart fallback if API key is not yet set
      return res.json({
        result: getFallbackResponse(prompt, type, language || "ru"),
        isFallback: true,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    let systemInstruction = "You are CW-EXPLOIT AI, the ultimate expert Luau script generator for Roblox Combat Warriors, Synapse, KRNL, Solara, and Rayfield UI library.";
    if (type === "code" || type === "luau") {
      systemInstruction += " Generate fully functional, optimized Roblox Luau scripts with Rayfield / Orion UI library code, hooks, localscript connections, keybinds, and detailed comments.";
    } else if (type === "autoparry") {
      systemInstruction += " Generate advanced Roblox Combat Warriors Auto-Parry / Hitbox prediction Luau code logic with distance calculations and animation ID checks.";
    } else if (type === "ideas") {
      systemInstruction += " Provide strategic Combat Warriors combat tips, loadout optimizations, combo sequences, and execution tricks.";
    }

    if (language === "ru") {
      systemInstruction += " Response MUST be in Russian language.";
    } else {
      systemInstruction += " Response MUST be in English language.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "No output generated.";
    return res.json({ result: text, isFallback: false });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Failed to generate AI response",
      details: error?.message || "Internal server error",
    });
  }
});

function getFallbackResponse(prompt: string, type: string, lang: string): string {
  if (lang === "ru") {
    if (type === "code" || type === "luau") {
      return `-- ⚔️ Combat Warriors [V4.8] - Rayfield UI Luau Script
-- Сгенерировано по запросу: "${prompt}"

local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "⚔️ Combat Warriors Hub | V4.8 Pro",
   LoadingTitle = "Загрузка модулей CW...",
   LoadingSubtitle = "by CW-Studio",
   ConfigurationSaving = { Enabled = true, FolderName = "CW_Hub" }
})

local CombatTab = Window:CreateTab("⚔️ Combat", 4483362458)
local MainSection = CombatTab:CreateSection("Auto Parry & Hitbox")

local AutoParryToggle = CombatTab:CreateToggle({
   Name = "Auto Parry (God Mode)",
   CurrentValue = true,
   Flag = "AutoParry",
   Callback = function(Value)
      _G.AutoParry = Value
      print("[CW Hub] Auto Parry status: " .. tostring(Value))
   end,
})

local HitboxSlider = CombatTab:CreateSlider({
   Name = "Hitbox Expander Size",
   Range = {2, 25},
   Increment = 1,
   Suffix = " studs",
   CurrentValue = 12,
   Flag = "HitboxSize",
   Callback = function(Value)
      _G.HitboxSize = Value
   end,
})

Rayfield:Notify({
   Title = "Скрипт активирован!",
   Content = "Успешно подключено к серверу Combat Warriors",
   Duration = 5,
})
`;
    } else if (type === "autoparry") {
      return `-- 🛡️ CW Advanced Auto Parry Logic (Distance & Animation Detector)
local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local RunService = game:GetService("RunService")

local PARRY_DISTANCE = 14.5 -- Настраиваемая дистанция парирования

local function getEnemyAnimation(enemy)
   local char = enemy.Character
   if not char then return nil end
   local animator = char:FindFirstChildOfClass("Humanoid") and char.Humanoid:FindFirstChildOfClass("Animator")
   if not animator font return end
   for _, track in ipairs(animator:GetPlayingAnimationTracks()) do
      if track.IsPlaying and (track.Animation.AnimationId:find("attack") or track.Animation.AnimationId:find("slash")) then
         return track
      end
   end
   return nil
end

RunService.RenderStepped:Connect(function()
   if not _G.AutoParry then return end
   for _, enemy in ipairs(Players:GetPlayers()) do
      if enemy ~= LocalPlayer and enemy.Character and enemy.Character:FindFirstChild("HumanoidRootPart") then
         local dist = (LocalPlayer.Character.HumanoidRootPart.Position - enemy.Character.HumanoidRootPart.Position).Magnitude
         if dist <= PARRY_DISTANCE then
            local anim = getEnemyAnimation(enemy)
            if anim then
               -- Нажатие кнопки F (Парирование)
               game:GetService("VirtualInputManager"):SendKeyEvent(true, Enum.KeyCode.F, false, game)
               task.wait(0.05)
               game:GetService("VirtualInputManager"):SendKeyEvent(false, Enum.KeyCode.F, false, game)
            end
         end
      end
   end
end)`;
    } else {
      return `⚔️ **Спецификация скрипта Combat Warriors по запросу "${prompt}"**:\n\n1. **Auto Parry (Бог Парирования)**: Сканирует AnimationTrack врага в радиусе 15 стадов и посылает симуляцию клавиши F ровно за 0.08с до контакта.\n2. **Infinite Stamina & Speed**: Заменяет метатаблицу __namecall для обхода античита и блокировки вызовов истощения стамины.\n3. **Hitbox Expander**: Увеличивает HumanoidRootPart всех врагов до 15x15x15 с полупрозрачным красным мешем.\n4. **ESP & Chams**: Подсвечивает игроков сквозь стены с индикацией уровня здоровья и текущего оружия.`;
    }
  } else {
    return `-- ⚔️ Combat Warriors Master Hub Script
-- Prompt: "${prompt}"

local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()
local Window = Rayfield:CreateWindow({ Name = "CW Ultra Script" })
-- Script ready for execution in Solara / Wave / Synapse Z
`;
  }
}

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
    console.log(`Nexus Creative Studio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
