import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cpu, Layers, HardDrive, MemoryStick, Zap, Box, Fan, CircuitBoard,
  AlertCircle, CheckCircle2, Search, Filter, Save, Share2, X,
  ExternalLink, RefreshCw, User, Mail, Lock, ArrowRight, Sparkles, Plus, ShoppingBag, Calendar
} from "lucide-react";
import { usePrices } from "../hooks/usePrices";
import { useRegionStore, formatPrice } from "../../store/regionStore";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { COMPONENTS_DATABASE } from "../../data/components";

interface Component {
  id: string;
  name: string;
  price: number;
  specs: string;
  wattage?: number;
  brand?: string;
  socket?: string;
  supportedMemory?: string;
}

interface BuildConfig {
  cpu: Component | null;
  gpu: Component | null;
  motherboard: Component | null;
  ram: Component | null;
  storage: Component | null;
  psu: Component | null;
  case: Component | null;
  cooler: Component | null;
}

type ToastType = "success" | "info" | null;

const CPU_DATABASE = COMPONENTS_DATABASE.cpu;
const GPU_DATABASE = COMPONENTS_DATABASE.gpu;
const MOTHERBOARD_DATABASE = COMPONENTS_DATABASE.motherboard;
const RAM_DATABASE = COMPONENTS_DATABASE.ram;
const STORAGE_DATABASE = COMPONENTS_DATABASE.storage;
const PSU_DATABASE = COMPONENTS_DATABASE.psu;
const CASE_DATABASE = COMPONENTS_DATABASE.case;
const COOLER_DATABASE = COMPONENTS_DATABASE.cooler;

class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitError";
  }
}

// Secure Gemini API call via Node/Express Backend proxy
async function callGeminiAPI(apiKey: string, bodyData: any): Promise<any> {
  const backendUrl = (import.meta as any).env?.VITE_BACKEND_URL || "http://localhost:3001";
  
  const response = await fetch(`${backendUrl}/api/gemini`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  if (response.status === 429) {
    throw new RateLimitError("Rate limit exceeded. Please try again later.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned status ${response.status}`);
  }

  return await response.json();
}

export function PCBuilder() {
  const navigate = useNavigate();
  const [build, setBuild] = useState<BuildConfig>({
    // Pre-populate with Screen 1 defaults for beautiful out-of-the-box minimal look
    cpu: {
      id: "cpu-custom-foundry-x",
      name: "Foundry-X Core 9900",
      price: 599.00,
      specs: "16-core, 32-thread architecture designed for uncompromising creative workflows and extreme-scale computing.",
      wattage: 125,
      brand: "Foundry-X",
      socket: "LGA1700"
    },
    gpu: {
      id: "gpu-custom-lumina",
      name: "Lumina RTX 4090 Black",
      price: 1649.00,
      specs: "Hyper-realistic ray tracing and AI-accelerated performance for next-generation visual experiences.",
      wattage: 450,
      brand: "Lumina"
    },
    ram: {
      id: "ram-custom-velocity",
      name: "Velocity 64GB DDR5",
      price: 249.00,
      specs: "Ultra-low latency modules tested for maximum stability under heavy multitasking loads.",
      brand: "Velocity"
    },
    motherboard: null,
    storage: null,
    psu: null,
    case: null,
    cooler: null,
  });

  const [selectedCategory, setSelectedCategory] = useState<keyof BuildConfig>("cpu");
  const [performanceTier, setPerformanceTier] = useState<"ELITE" | "PRO" | "BASE">("ELITE");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // AI Modal & UI States
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);

  // Chatbot states
  interface ChatMessage {
    id: string;
    sender: "user" | "ai";
    text: string;
    timestamp: Date;
    recommendedParts?: {
      category: keyof BuildConfig;
      component: Component;
    }[];
  }

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hello! I am your AI Hardware Architect. How can I help you compile your build today? Tell me your budget or hardware preferences, and I'll suggest a custom configuration.",
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [activeAIParts, setActiveAIParts] = useState<{ category: keyof BuildConfig; component: Component }[] | null>(null);
  const [selectedSuggestedParts, setSelectedSuggestedParts] = useState<Record<keyof BuildConfig, boolean>>({
    cpu: true,
    gpu: true,
    motherboard: true,
    ram: true,
    storage: true,
    cooler: true,
    psu: true,
    case: true
  });

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const selectPreset = (tier: "ELITE" | "PRO" | "BASE") => {
    setPerformanceTier(tier);
    if (tier === "ELITE") {
      setBuild(prev => ({
        ...prev,
        cpu: {
          id: "cpu-custom-foundry-x",
          name: "Foundry-X Core 9900",
          price: 599.00,
          specs: "16-core, 32-thread architecture designed for uncompromising creative workflows and extreme-scale computing.",
          wattage: 125,
          brand: "Foundry-X",
          socket: "LGA1700"
        },
        gpu: {
          id: "gpu-custom-lumina",
          name: "Lumina RTX 4090 Black",
          price: 1649.00,
          specs: "Hyper-realistic ray tracing and AI-accelerated performance for next-generation visual experiences.",
          wattage: 450,
          brand: "Lumina"
        },
        ram: {
          id: "ram-custom-velocity",
          name: "Velocity 64GB DDR5",
          price: 249.00,
          specs: "Ultra-low latency modules tested for maximum stability under heavy multitasking loads.",
          brand: "Velocity"
        }
      }));
    } else if (tier === "PRO") {
      setBuild(prev => ({
        ...prev,
        cpu: {
          id: "cpu-custom-pro-intel",
          name: "Intel Core i7-14700K",
          price: 389.00,
          specs: "20-core desktop processor built for gamers and professionals.",
          wattage: 125,
          brand: "Intel",
          socket: "LGA1700"
        },
        gpu: {
          id: "gpu-custom-pro-rtx",
          name: "Lumina RTX 4080 Super",
          price: 999.00,
          specs: "High-fidelity gaming and AI workstation graphics architecture.",
          wattage: 320,
          brand: "Lumina"
        },
        ram: {
          id: "ram-custom-pro-vel",
          name: "Velocity 32GB DDR5",
          price: 149.00,
          specs: "High speed, low profile custom RAM modules.",
          brand: "Velocity"
        }
      }));
    } else {
      setBuild(prev => ({
        ...prev,
        cpu: {
          id: "cpu-custom-base-intel",
          name: "Intel Core i5-14600K",
          price: 299.00,
          specs: "14-core gaming processor with great multi-thread value.",
          wattage: 125,
          brand: "Intel",
          socket: "LGA1700"
        },
        gpu: {
          id: "gpu-custom-base-rtx",
          name: "Lumina RTX 4070 Black",
          price: 599.00,
          specs: "Exceptional 1440p gaming performance and thermal efficiency.",
          wattage: 220,
          brand: "Lumina"
        },
        ram: {
          id: "ram-custom-base-vel",
          name: "Velocity 16GB DDR5",
          price: 89.00,
          specs: "Standard ultra-stable custom RAM kit.",
          brand: "Velocity"
        }
      }));
    }
    showToast(`Loaded ${tier} configuration preset.`);
  };

  // Secure backend integration: API key is stored only on the backend server.
  const apiKey = "backend";

  useEffect(() => {
    const savedBuildStr = localStorage.getItem("buildforge-current-build");
    if (savedBuildStr) {
      try {
        const savedBuild = JSON.parse(savedBuildStr);
        setBuild(prev => ({
          ...prev,
          ...savedBuild
        }));
        showToast("Loaded AI-generated build configuration!");
        localStorage.removeItem("buildforge-current-build");
      } catch (e) {
        console.error("Failed to parse saved build", e);
      }
    }

    // Auto-open AI chatbot modal if query param is set
    const params = new URLSearchParams(window.location.search);
    if (params.get("ai") === "true") {
      setIsAIModalOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const findComponentInDB = (category: keyof BuildConfig, name: string): Component | null => {
    const db = COMPONENTS_DATABASE[category];
    if (!db) return null;
    const match = db.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (match) return match;
    // Fuzzy search
    const fuzzy = db.find(c => c.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(c.name.toLowerCase()));
    return fuzzy || null;
  };

  const parseBudgetAndWorkloads = (text: string) => {
    const numbers = text.match(/\b\d{3,4}\b/g);
    let budget = 1500;
    if (numbers) {
      for (const numStr of numbers) {
        const num = parseInt(numStr);
        if (num >= 400 && num <= 10000) {
          budget = num;
          break;
        }
      }
    }
    const workloads: string[] = [];
    const textLower = text.toLowerCase();
    if (textLower.includes("gam")) workloads.push("gaming");
    if (textLower.includes("stream") || textLower.includes("broadcast")) workloads.push("streaming");
    if (textLower.includes("edit") || textLower.includes("video") || textLower.includes("premiere") || textLower.includes("davinci")) workloads.push("video-editing");
    if (textLower.includes("render") || textLower.includes("3d") || textLower.includes("blender") || textLower.includes("unreal")) workloads.push("3d-rendering");
    if (textLower.includes("program") || textLower.includes("code") || textLower.includes("compile") || textLower.includes("dev")) workloads.push("programming");
    if (workloads.length === 0) workloads.push("general");
    
    return { budget, workloads };
  };

  const compileLocalFallbackBuild = (budget: number, workloads: string[]): { category: keyof BuildConfig; component: Component }[] => {
    const safeFind = (db: any[], keywords: string[], fallbackIdx = 0) => {
      for (const kw of keywords) {
        const match = db.find(c => c.name.toLowerCase().includes(kw.toLowerCase()));
        if (match) return match;
      }
      return db[fallbackIdx] || db[0];
    };

    let cpuBrand: "AMD" | "Intel" = "AMD";
    if (budget >= 2000 && Math.random() > 0.5) {
      cpuBrand = "Intel";
    }

    let selectedCpu = CPU_DATABASE[CPU_DATABASE.length - 1] || CPU_DATABASE[0];
    let selectedMobo = MOTHERBOARD_DATABASE[2] || MOTHERBOARD_DATABASE[0];
    
    if (budget >= 3500) {
      selectedCpu = cpuBrand === "AMD" 
        ? safeFind(CPU_DATABASE, ["Ryzen 9 9950X", "9950X", "7950X"], CPU_DATABASE.length - 1)
        : safeFind(CPU_DATABASE, ["Ultra 9 285K", "i9-14900K", "14900K"], CPU_DATABASE.length - 1);
    } else if (budget >= 2200) {
      selectedCpu = safeFind(CPU_DATABASE, ["Ryzen 7 9800X3D", "7800X3D", "Ryzen 7"], CPU_DATABASE.length - 1);
    } else if (budget >= 1500) {
      selectedCpu = safeFind(CPU_DATABASE, ["Ryzen 7 7800X3D", "5800X3D", "Intel Core i7", "Ultra 7"], CPU_DATABASE.length - 1);
    } else if (budget >= 1000) {
      selectedCpu = cpuBrand === "AMD"
        ? safeFind(CPU_DATABASE, ["Ryzen 5 9600X", "7600X"], 0)
        : safeFind(CPU_DATABASE, ["Ultra 5 245K", "i5-14600K", "14600K"], 0);
    } else {
      selectedCpu = safeFind(CPU_DATABASE, ["Ryzen 5 7600", "5600X"], 0);
    }

    if (selectedCpu.name.includes("AM5") || selectedCpu.socket === "AM5") {
      if (budget >= 3000) {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Crosshair X870E", "X870E"], 0);
      } else if (budget >= 2000) {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Carbon WiFi X870E", "X870E Carbon", "X870E"], 0);
      } else if (budget >= 1400) {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["B850 AORUS Elite", "B850", "B650"], 0);
      } else {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["B650-PLUS", "B650"], 0);
      }
    } else if (selectedCpu.name.includes("LGA1851") || selectedCpu.socket === "LGA1851") {
      if (budget >= 2500) {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Maximus Z890", "Z890 Hero", "Z890"], 0);
      } else {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Z890 Tomahawk", "Z890"], 0);
      }
    } else {
      selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["B760M Pro", "B760", "Z790"], 0);
    }

    let selectedGpu = GPU_DATABASE[GPU_DATABASE.length - 1];
    if (budget >= 3500) {
      selectedGpu = safeFind(GPU_DATABASE, ["RTX 5090", "RTX 4090"], GPU_DATABASE.length - 1);
    } else if (budget >= 2500) {
      selectedGpu = safeFind(GPU_DATABASE, ["RTX 5080", "RTX 4080"], GPU_DATABASE.length - 1);
    } else if (budget >= 1800) {
      selectedGpu = safeFind(GPU_DATABASE, ["RTX 5080", "RTX 4080 Super", "RTX 4080"], GPU_DATABASE.length - 1);
    } else if (budget >= 1300) {
      selectedGpu = safeFind(GPU_DATABASE, ["RTX 5070", "RTX 4070"], 0);
    } else if (budget >= 900) {
      selectedGpu = safeFind(GPU_DATABASE, ["RX 9070", "RX 7800 XT", "RTX 4070"], 0);
    } else {
      selectedGpu = safeFind(GPU_DATABASE, ["RTX 4060 Ti", "RTX 4060"], 0);
    }

    let selectedRam = RAM_DATABASE[0];
    if (budget >= 3000) {
      selectedRam = safeFind(RAM_DATABASE, ["Dominator Titanium 64GB", "64GB DDR5"], 0);
    } else if (budget >= 2000) {
      selectedRam = safeFind(RAM_DATABASE, ["Dominator Titanium 32GB", "32GB DDR5"], 0);
    } else if (budget < 900) {
      selectedRam = safeFind(RAM_DATABASE, ["Crucial Pro 16GB", "16GB DDR4"], 0);
    }

    let selectedStorage = STORAGE_DATABASE[0];
    if (budget >= 2500) {
      selectedStorage = safeFind(STORAGE_DATABASE, ["Samsung 990 Evo Plus 4TB", "4TB"], 0);
    } else if (budget < 1200) {
      selectedStorage = safeFind(STORAGE_DATABASE, ["WD Black SN850X 1TB", "1TB"], 0);
    }

    let selectedCooler = COOLER_DATABASE[0];
    if (budget >= 2500) {
      selectedCooler = safeFind(COOLER_DATABASE, ["Liquid Freezer II 360", "360mm"], 0);
    } else if (budget < 1200) {
      selectedCooler = safeFind(COOLER_DATABASE, ["Dark Rock 4", "Air Cooler"], 0);
    }

    let selectedPsu = PSU_DATABASE[0];
    if (budget >= 3000) {
      selectedPsu = safeFind(PSU_DATABASE, ["RM1000x", "1000W"], 0);
    } else if (budget < 1200) {
      selectedPsu = safeFind(PSU_DATABASE, ["Pure Power 11", "600W"], 0);
    }

    let selectedCase = CASE_DATABASE[0];
    if (budget >= 2000) {
      selectedCase = safeFind(CASE_DATABASE, ["O11 Dynamic EVO", "Lian Li"], 0);
    } else if (budget < 1200) {
      selectedCase = safeFind(CASE_DATABASE, ["4000D Airflow", "Corsair"], 0);
    }

    return [
      { category: "cpu", component: selectedCpu },
      { category: "gpu", component: selectedGpu },
      { category: "motherboard", component: selectedMobo },
      { category: "ram", component: selectedRam },
      { category: "storage", component: selectedStorage },
      { category: "cooler", component: selectedCooler },
      { category: "psu", component: selectedPsu },
      { category: "case", component: selectedCase }
    ];
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsgText = chatInput.trim();
    setChatInput("");
    
    const newMsg: ChatMessage = {
      id: "msg-" + Date.now() + "-user",
      sender: "user",
      text: userMsgText,
      timestamp: new Date()
    };
    
    const updatedMessages = [...chatMessages, newMsg];
    setChatMessages(updatedMessages);
    setIsGeneratingAI(true);

    try {
      if (apiKey.trim()) {
        const chatHistory = updatedMessages.slice(-6);
        const promptText = `
You are an expert PC Building Architect.
The user is talking to you in a chat. Here is their message: "${userMsgText}"
Here is the chat history so far:
${chatHistory.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join("\n")}

Here is the database of available components you MUST select from. Do not invent components that are not in this list:

CPU Options:
${CPU_DATABASE.map(c => `- ${c.name} (Price: $${c.price}, specs: ${c.specs}, brand: ${c.brand})`).join("\n")}

GPU Options:
${GPU_DATABASE.map(g => `- ${g.name} (Price: $${g.price}, specs: ${g.specs}, brand: ${g.brand})`).join("\n")}

Motherboard Options:
${MOTHERBOARD_DATABASE.map(m => `- ${m.name} (Price: $${m.price}, specs: ${m.specs}, brand: ${m.brand})`).join("\n")}

RAM Options:
${RAM_DATABASE.map(r => `- ${r.name} (Price: $${r.price}, specs: ${r.specs}, brand: ${r.brand})`).join("\n")}

Storage Options:
${STORAGE_DATABASE.map(s => `- ${s.name} (Price: $${s.price}, specs: ${s.specs}, brand: ${s.brand})`).join("\n")}

Cooler Options:
${COOLER_DATABASE.map(c => `- ${c.name} (Price: $${c.price}, specs: ${c.specs}, brand: ${c.brand})`).join("\n")}

PSU Options:
${PSU_DATABASE.map(p => `- ${p.name} (Price: $${p.price}, specs: ${p.specs}, brand: ${p.brand})`).join("\n")}

Case Options:
${CASE_DATABASE.map(c => `- ${c.name} (Price: $${c.price}, specs: ${c.specs}, brand: ${c.brand})`).join("\n")}

RULES:
1. If the user asks for a PC build suggestion or configuration, select exactly one CPU, GPU, motherboard, RAM kit, Storage drive, Cooler, PSU, and Case from the databases above. If they are just asking a general question, do not include recommended parts in the response (return an empty list).
2. The total price of all selected components must fit close to their budget if specified.
3. AMD AM5 CPUs MUST be paired with AM5 Motherboards.
4. Intel LGA1851 CPUs MUST be paired with LGA1851 Motherboards.
5. Intel LGA1700 CPUs MUST be paired with LGA1700 Motherboards.
6. Provide a text response explaining your suggestions in the 'reply' field. If recommending parts, list the names of recommended parts exactly as they appear in the database list in the 'recommendedParts' field.

You must reply in JSON format matching this schema:
{
  "reply": "your text response or explanation here",
  "recommendedParts": [
    { "category": "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "cooler" | "psu" | "case", "name": "Exact component name" }
  ]
}
`;

        const resData = await callGeminiAPI(apiKey, {
          contents: [{
            parts: [{ text: promptText }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                reply: { type: "STRING" },
                recommendedParts: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      category: { type: "STRING" },
                      name: { type: "STRING" }
                    },
                    required: ["category", "name"]
                  }
                }
              },
              required: ["reply", "recommendedParts"]
            }
          }
        });

        const generatedText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!generatedText) throw new Error("Empty candidate list from Gemini");
        const parsed = JSON.parse(generatedText);
        
        const mappedParts: { category: keyof BuildConfig; component: Component }[] = [];
        if (parsed.recommendedParts && Array.isArray(parsed.recommendedParts)) {
          for (const item of parsed.recommendedParts) {
            const matched = findComponentInDB(item.category as keyof BuildConfig, item.name);
            if (matched) {
              mappedParts.push({ category: item.category as keyof BuildConfig, component: matched });
            }
          }
        }

        const aiMsg: ChatMessage = {
          id: "msg-" + Date.now() + "-ai",
          sender: "ai",
          text: parsed.reply,
          timestamp: new Date(),
          recommendedParts: mappedParts.length > 0 ? mappedParts : undefined
        };
        
        setChatMessages(prev => [...prev, aiMsg]);
        if (mappedParts.length > 0) {
          setActiveAIParts(mappedParts);
          const initialSelection: Record<keyof BuildConfig, boolean> = { cpu: true, gpu: true, motherboard: true, ram: true, storage: true, cooler: true, psu: true, case: true };
          setSelectedSuggestedParts(initialSelection);
        }
        setIsGeneratingAI(false);
        return;
      }
    } catch (e: any) {
      if (e.name === "RateLimitError") {
        showToast("Rate limit exceeded (429). Please wait before trying again.");
        setChatMessages(prev => [...prev, {
          id: "msg-" + Date.now() + "-ai-error",
          sender: "ai",
          text: "Rate limit exceeded (429 Too Many Requests). Please wait a moment before sending another message.",
          timestamp: new Date()
        }]);
        setIsGeneratingAI(false);
        return;
      }
      console.warn("Generative chatbot failed or no API key, falling back to rule-based responder.", e);
    }

    // Fallback Local Responder
    setTimeout(() => {
      const textLower = userMsgText.toLowerCase();
      let replyText = "";
      let recommendedParts: { category: keyof BuildConfig; component: Component }[] | undefined = undefined;

      const isBuildRequest = textLower.includes("build") || textLower.includes("suggest") || textLower.includes("setup") || textLower.includes("pc") || textLower.includes("config") || /\b\d{3,4}\b/.test(textLower);

      if (isBuildRequest) {
        const { budget, workloads } = parseBudgetAndWorkloads(userMsgText);
        recommendedParts = compileLocalFallbackBuild(budget, workloads);
        const estPrice = recommendedParts.reduce((sum, item) => sum + item.component.price, 0);
        
        replyText = `I have compiled a custom configuration for your budget of $${budget}. The estimated total cost is $${estPrice.toFixed(2)}.

I selected:
- CPU: ${recommendedParts.find(p => p.category === 'cpu')?.component.name}
- GPU: ${recommendedParts.find(p => p.category === 'gpu')?.component.name}
- Motherboard: ${recommendedParts.find(p => p.category === 'motherboard')?.component.name}

You can select which components to keep and apply them to your active build in the side panel!`;
      } else if (textLower.includes("amd") || textLower.includes("intel") || textLower.includes("cpu") || textLower.includes("processor")) {
        replyText = "For processors, AMD's Ryzen 7 7800X3D is the absolute best choice for gaming. If you're building a rendering or workstation PC, Intel's Core i9-14900K or the newer Arrow Lake Ultra 9 285K offer class-leading multi-threaded computing power.";
      } else if (textLower.includes("nvidia") || textLower.includes("amd") || textLower.includes("gpu") || textLower.includes("rtx") || textLower.includes("graphics")) {
        replyText = "For graphics, Nvidia's RTX 4090 represents the absolute peak performance. For 1440p gaming, the RTX 4070 or Radeon RX 7800 XT are outstanding value choices. What resolution and quality are you planning to target?";
      } else if (textLower.includes("compatibility") || textLower.includes("conflict") || textLower.includes("fit")) {
        replyText = "I automatically check for compatibility conflicts: socket configurations (AM5 vs LGA1700/LGA1851), memory types (DDR5 RAM matches DDR5 Motherboards), and aggregate power requirements. Let me know if you want me to recommend a safe build!";
      } else {
        replyText = "Hello! I am your AI Hardware Architect. How can I help you compile a build today? Tell me your budget (e.g., '$1500 gaming build') or ask about specific components!";
      }

      const aiMsg: ChatMessage = {
        id: "msg-" + Date.now() + "-ai",
        sender: "ai",
        text: replyText,
        timestamp: new Date(),
        recommendedParts
      };

      setChatMessages(prev => [...prev, aiMsg]);
      if (recommendedParts) {
        setActiveAIParts(recommendedParts);
        const initialSelection: Record<keyof BuildConfig, boolean> = { cpu: true, gpu: true, motherboard: true, ram: true, storage: true, cooler: true, psu: true, case: true };
        setSelectedSuggestedParts(initialSelection);
      }
      setIsGeneratingAI(false);
    }, 1200);
  };

  const applySuggestedParts = () => {
    if (!activeAIParts) return;
    setBuild(prev => {
      const updated = { ...prev };
      for (const item of activeAIParts) {
        if (selectedSuggestedParts[item.category]) {
          updated[item.category] = item.component;
        }
      }
      return updated;
    });
    showToast("Applied selected parts to build configuration!");
    setActiveAIParts(null);
  };

  const getDiagnostics = () => {
    const list: { id: string; status: "success" | "warning" | "info"; text: string }[] = [];
    
    // CPU & Motherboard Socket Check
    if (build.cpu && build.motherboard) {
      if (build.cpu.socket && build.motherboard.socket && build.cpu.socket !== build.motherboard.socket) {
        list.push({
          id: "socket-mismatch",
          status: "warning",
          text: `Socket mismatch: CPU uses ${build.cpu.socket} but Motherboard uses ${build.motherboard.socket}.`
        });
      } else {
        list.push({
          id: "socket-ok",
          status: "success",
          text: `Processor & Motherboard socket matched (${build.cpu.socket || "compatible"}).`
        });
      }
    } else {
      list.push({
        id: "socket-missing",
        status: "info",
        text: "Select CPU and Motherboard to verify socket compatibility."
      });
    }

    // Power supply adequacy
    const tdp = (build.cpu?.wattage || 0) + (build.gpu?.wattage || 0) + 100;
    if (build.psu) {
      const psuWattageMatch = build.psu.name.match(/(\d+)\s*W/i) || build.psu.specs.match(/(\d+)\s*W/i);
      const psuWattage = psuWattageMatch ? parseInt(psuWattageMatch[1]) : 600;
      if (psuWattage < tdp) {
        list.push({
          id: "psu-insufficient",
          status: "warning",
          text: `Insufficient Power: Est. draw is ${tdp}W but PSU capacity is only ${psuWattage}W.`
        });
      } else {
        list.push({
          id: "psu-ok",
          status: "success",
          text: `Power Supply headroom is optimal (Est. draw ${tdp}W vs ${psuWattage}W PSU).`
        });
      }
    } else {
      list.push({
        id: "psu-missing",
        status: "info",
        text: `Est. Draw: ${tdp}W. Choose a power supply of at least ${Math.ceil((tdp + 150) / 50) * 50}W.`
      });
    }

    // Memory slot / Motherboard memory type check
    if (build.ram && build.motherboard) {
      const isMoboDdr5 = build.motherboard.name.toLowerCase().includes("ddr5") || build.motherboard.specs.toLowerCase().includes("ddr5") || !build.motherboard.name.toLowerCase().includes("b760m");
      const isRamDdr5 = build.ram.name.toLowerCase().includes("ddr5") || build.ram.specs.toLowerCase().includes("ddr5");
      if (isMoboDdr5 !== isRamDdr5) {
        list.push({
          id: "ram-mismatch",
          status: "warning",
          text: `Memory Type Mismatch: Motherboard expects ${isMoboDdr5 ? "DDR5" : "DDR4"} but RAM is ${isRamDdr5 ? "DDR5" : "DDR4"}.`
        });
      } else {
        list.push({
          id: "ram-ok",
          status: "success",
          text: `Memory standards matched (${isRamDdr5 ? "DDR5" : "DDR4"}).`
        });
      }
    } else {
      list.push({
        id: "ram-missing",
        status: "info",
        text: "Select Motherboard and RAM kit to verify memory compatibility."
      });
    }

    // Form Factor
    if (build.case && build.motherboard) {
      list.push({
        id: "form-factor-ok",
        status: "success",
        text: "Form Factor: ATX Mid Tower case fits motherboard profile."
      });
    } else {
      list.push({
        id: "form-factor-missing",
        status: "info",
        text: "Select Motherboard and Case to verify form factor size specs."
      });
    }

    return list;
  };

  const { prices, loading: pricesLoading, error: pricesError, getPrice } = usePrices();
  const { region, exchangeRate } = useRegionStore();
  const { theme } = useThemeStore();
  const { user, openAuthModal, saveBuild } = useAuthStore();
  const isDark = theme === "dark";

  const bg = isDark ? "#0A0A0A" : "#FAF9F6";
  const cardBg = isDark ? "#121212" : "#FFFFFF";
  const fgPrimary = isDark ? "#FAF9F6" : "#0A0A0A";
  const fgMuted = isDark ? "#666666" : "#737373";
  const border = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const borderStrong = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  const handleSave = () => {
    const selectedCount = Object.values(build).filter((c) => c !== null).length;
    if (selectedCount === 0) {
      showToast("Add at least one component before saving.", "info");
      return;
    }
    if (!user) {
      openAuthModal(true); // Open directly in Sign Up mode
      return;
    }
    const totalPrice = Object.values(build).reduce((sum, c) => sum + (c ? c.price : 0), 0);
    saveBuild({
      id: "build-" + Date.now(),
      name: `Custom PC Build (${performanceTier})`,
      date: new Date().toISOString(),
      totalPrice,
      components: {
        cpu: build.cpu ? { id: build.cpu.id, name: build.cpu.name } : undefined,
        gpu: build.gpu ? { id: build.gpu.id, name: build.gpu.name } : undefined,
        motherboard: build.motherboard ? { id: build.motherboard.id, name: build.motherboard.name } : undefined,
        ram: build.ram ? { id: build.ram.id, name: build.ram.name } : undefined,
      }
    });
    showToast("Build saved to cloud!");
  };

  const handleShare = () => {
    const url = `${window.location.origin}/build/custom-${Date.now()}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast("Build link copied to clipboard!");
    }).catch(() => {
      showToast("Share link: " + url, "info");
    });
  };

  const systemWattage = (build.cpu?.wattage || 0) + (build.gpu?.wattage || 0) + 100;
  
  const categories = [
    { key: "cpu", label: "Processor (CPU)", icon: Cpu },
    { key: "gpu", label: "Graphics (GPU)", icon: Layers },
    { key: "motherboard", label: "Motherboard", icon: CircuitBoard },
    { key: "ram", label: "Memory (RAM)", icon: MemoryStick },
    { key: "storage", label: "Storage", icon: HardDrive },
    { key: "psu", label: "Power Supply (PSU)", icon: Zap },
    { key: "case", label: "Case", icon: Box },
    { key: "cooler", label: "Cooler", icon: Fan },
  ] as const;

  const filteredComponents = COMPONENTS_DATABASE[selectedCategory].filter((c) => {
    // Compatibility rules
    if (selectedCategory === "motherboard" && build.cpu?.socket) {
      if (c.socket && c.socket !== build.cpu.socket) return false;
    }
    if (selectedCategory === "cpu" && build.motherboard?.socket) {
      if (c.socket && c.socket !== build.motherboard.socket) return false;
    }
    if (selectedCategory === "ram" && build.motherboard?.supportedMemory) {
      if (c.supportedMemory && !build.motherboard.supportedMemory.includes(c.supportedMemory)) return false;
    }

    const queryTokens = searchQuery.toLowerCase().trim().split(/\s+/);
    if (!searchQuery.trim()) return true;
    const compName = c.name.toLowerCase();
    return queryTokens.every(token => compName.includes(token));
  });

  const selectComponent = (component: Component) => {
    setBuild((prev) => ({ ...prev, [selectedCategory]: component }));
    showToast(`Added ${component.name} to build.`);
  };

  const removeComponent = (catKey: keyof BuildConfig) => {
    setBuild((prev) => ({ ...prev, [catKey]: null }));
    showToast(`Removed component.`);
  };

  const subtotal = Object.values(build).reduce((sum, c) => sum + (c?.price || 0), 0);
  const assemblyFee = subtotal > 0 ? 150.00 : 0;
  const totalPrice = subtotal + assemblyFee;
  const selectedCount = Object.values(build).filter((c) => c !== null).length;
  const compatibilityScore = selectedCount >= 6 ? 95 : selectedCount >= 3 ? 75 : 50;

  return (
    <div style={{ minHeight: "100vh", background: bg, padding: "3rem 0 6rem", color: fgPrimary, transition: "all 0.3s ease" }}>
      
      {/* Toast popup */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 150,
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 18px", borderRadius: "4px",
          background: cardBg, border: `1px solid ${borderStrong}`,
          fontSize: "0.8rem", fontWeight: 600, color: fgPrimary,
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        }}>
          {toast.message}
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", cursor: "pointer", color: fgMuted, marginLeft: "8px" }}>
            <X style={{ width: "12px", height: "12px" }} />
          </button>
        </div>
      )}

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2.5rem" }}>
        
        {/* Monospace node tag */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
          <div>
            <div style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: fgMuted,
              textTransform: "uppercase", marginBottom: "0.75rem", fontFamily: "monospace"
            }}>
              Builder Node
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, letterSpacing: "-0.03em", margin: 0 }}>
              Architect Your Power
            </h1>
          </div>
          
          {/* Compatibility Dot */}
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: fgMuted }}>
              Compatibility
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00B85C", display: "inline-block" }} />
              <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>All systems nominal</span>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: borderStrong, marginBottom: "2.5rem" }} />

        {/* Configurations selector */}
        <div style={{ display: "flex", gap: "3rem", marginBottom: "3rem", fontSize: "0.8rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: fgMuted, display: "block", marginBottom: "0.75rem" }}>
              Performance Tier
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              {(["ELITE", "PRO", "BASE"] as const).map(tier => (
                <button
                  key={tier}
                  onClick={() => selectPreset(tier)}
                  style={{
                    padding: "6px 16px", borderRadius: "4px", cursor: "pointer",
                    background: performanceTier === tier ? fgPrimary : "transparent",
                    color: performanceTier === tier ? (isDark ? "#0A0A0A" : "#FAF9F6") : fgPrimary,
                    border: `1px solid ${performanceTier === tier ? fgPrimary : borderStrong}`,
                    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em",
                    transition: "all 150ms ease",
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: fgMuted, display: "block", marginBottom: "0.75rem" }}>
              AI Architect
            </span>
            <button
              onClick={() => setIsAIModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                background: "transparent",
                color: fgPrimary,
                border: `1px solid ${fgPrimary}`,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "all 150ms ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = fgPrimary;
                e.currentTarget.style.color = isDark ? "#0A0A0A" : "#FAF9F6";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = fgPrimary;
              }}
            >
              <Sparkles style={{ width: "12px", height: "12px", color: "inherit" }} />
              Build with AI
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: fgMuted, display: "block", marginBottom: "0.75rem" }}>
              System Configuration
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => {
                  setBuild({
                    cpu: null,
                    gpu: null,
                    motherboard: null,
                    ram: null,
                    storage: null,
                    psu: null,
                    case: null,
                    cooler: null,
                  });
                  showToast("Cleared active build configuration.", "info");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  background: "transparent",
                  color: fgPrimary,
                  border: `1px solid ${borderStrong}`,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = fgPrimary;
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = borderStrong;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <X style={{ width: "12px", height: "12px" }} />
                Clear Build
              </button>

              <button
                onClick={handleShare}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  background: "transparent",
                  color: fgPrimary,
                  border: `1px solid ${borderStrong}`,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  transition: "all 150ms ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = fgPrimary;
                  e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = borderStrong;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Share2 style={{ width: "12px", height: "12px" }} />
                Share Build
              </button>

              <button
                onClick={() => setIsDiagnosticsOpen(!isDiagnosticsOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  background: isDiagnosticsOpen ? fgPrimary : "transparent",
                  color: isDiagnosticsOpen ? (isDark ? "#0A0A0A" : "#FAF9F6") : fgPrimary,
                  border: `1px solid ${isDiagnosticsOpen ? fgPrimary : borderStrong}`,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  transition: "all 150ms ease",
                }}
              >
                <AlertCircle style={{ width: "12px", height: "12px" }} />
                Diagnostics
              </button>
            </div>

            {/* Diagnostics Popover Dropdown */}
            {isDiagnosticsOpen && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                zIndex: 90,
                width: "360px",
                background: cardBg,
                border: `1px solid ${fgPrimary}`,
                borderRadius: "4px",
                padding: "1.25rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: fgMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Compatibility Analysis</span>
                  <button
                    onClick={() => setIsDiagnosticsOpen(false)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: fgMuted, fontSize: "0.75rem", padding: 0 }}
                  >
                    Close
                  </button>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {getDiagnostics().map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "0.75rem" }}>
                      <span style={{
                        width: "6px", height: "6px", borderRadius: "50%",
                        background: item.status === "success" ? "#00B85C" : item.status === "warning" ? "var(--coral)" : fgMuted,
                        marginTop: "6px", flexShrink: 0
                      }} />
                      <span style={{
                        color: item.status === "warning" ? (isDark ? "#FFA7A7" : "#C21F3C") : fgPrimary,
                        lineHeight: 1.4
                      }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: fgMuted, display: "block", marginBottom: "0.75rem" }}>
              Form Factor
            </span>
            <span style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", paddingTop: "6px" }}>
              ATX Mid Tower
            </span>
          </div>
        </div>

        {/* main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "3.5rem", alignItems: "start" }}>
          
          {/* ── LEFT PANEL: Configurator / Picker ── */}
          <div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {/* Category selector grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginBottom: "1.5rem"
              }}>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.key;
                  const hasComponent = build[cat.key] !== null;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setSelectedCategory(cat.key);
                        setSearchQuery("");
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem 0.5rem",
                        borderRadius: "4px",
                        border: `1px solid ${isSelected ? fgPrimary : borderStrong}`,
                        background: isSelected ? (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)") : "transparent",
                        color: isSelected ? fgPrimary : fgMuted,
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        position: "relative"
                      }}
                    >
                      {hasComponent && (
                        <span style={{
                          position: "absolute",
                          top: "6px",
                          right: "6px",
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#00B85C"
                        }} />
                      )}
                      <Icon style={{ width: "20px", height: "20px", marginBottom: "6px", strokeWidth: 1.5 }} />
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {cat.label.replace(/\s*\(.*\)/, "")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: fgMuted }} />
                <input
                  type="text"
                  placeholder={`Search ${categories.find(c => c.key === selectedCategory)?.label}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%", padding: "12px 12px 12px 38px",
                    background: isDark ? "#121212" : "#FFFFFF",
                    border: `1px solid ${borderStrong}`, borderRadius: "4px",
                    color: fgPrimary, outline: "none", fontSize: "0.85rem",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              {/* Parts list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "650px", overflowY: "auto", paddingRight: "6px" }}>
                {filteredComponents.length > 0 ? (
                  filteredComponents.map((comp) => {
                    const isSelected = build[selectedCategory]?.id === comp.id;
                    return (
                      <div
                        key={comp.id}
                        onClick={() => selectComponent(comp)}
                        style={{
                          border: `1px solid ${isSelected ? fgPrimary : borderStrong}`,
                          borderRadius: "4px",
                          padding: "1.25rem",
                          background: cardBg,
                          cursor: "pointer",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          transition: "all 150ms ease"
                        }}
                        onMouseEnter={e => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = fgPrimary;
                            e.currentTarget.style.background = isDark ? "#181818" : "#FAF9F6";
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isSelected) {
                            e.currentTarget.style.borderColor = borderStrong;
                            e.currentTarget.style.background = cardBg;
                          }
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: fgPrimary }}>
                              {comp.name}
                            </span>
                            {isSelected && (
                              <CheckCircle2 style={{ width: "14px", height: "14px", color: fgPrimary }} />
                            )}
                          </div>
                          <p style={{ fontSize: "0.75rem", color: fgMuted, margin: 0 }}>
                            {comp.specs} {comp.wattage && `· ${comp.wattage}W TDP`}
                          </p>
                        </div>
                        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "end", gap: "4px" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: fgPrimary }}>
                            {formatPrice(comp.price, region, exchangeRate)}
                          </span>
                          {isSelected && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeComponent(selectedCategory);
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: fgMuted,
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                cursor: "pointer",
                                padding: 0,
                                textDecoration: "underline"
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", padding: "3rem", border: `1px dashed ${borderStrong}`, borderRadius: "4px", color: fgMuted }}>
                    No compatible components found.
                  </div>
                )}
              </div>

              {/* Forge Live Insights Card */}
              <div style={{
                marginTop: "2.5rem",
                border: `1px solid ${borderStrong}`,
                borderRadius: "4px",
                background: cardBg,
                padding: "1.5rem",
                boxSizing: "border-box",
                transition: "all 0.3s ease"
              }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                  <Sparkles style={{ width: "16px", height: "16px", color: isDark ? "#FAF9F6" : "#0A0A0A" }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>Forge Live Insights</h3>
                </div>

                {/* Grid Layout for Bottleneck and game FPS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", flexWrap: "wrap" }}>
                  
                  {/* Left Column: Bottleneck info */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: fgMuted }}>
                        Bottleneck Analysis
                      </span>
                      <div style={{ marginTop: "0.5rem" }}>
                        {build.cpu && build.gpu ? (() => {
                          const isHighGPU = (build.gpu.price || 0) >= 700;
                          const isHighCPU = (build.cpu.price || 0) >= 400;
                          
                          if (isHighGPU && !isHighCPU) {
                            return (
                              <>
                                <div style={{ fontSize: "1.5rem", fontWeight: 300, color: "#FFA7A7" }}>18.2% (Moderate CPU)</div>
                                <p style={{ fontSize: "0.75rem", color: fgMuted, margin: "0.5rem 0 0 0", lineHeight: 1.4 }}>
                                  Your graphics processor is highly potent. A stronger CPU (like a Ryzen 7 9800X3D) will unlock higher frames in simulator or eSports titles.
                                </p>
                              </>
                            );
                          } else if (!isHighGPU && isHighCPU) {
                            return (
                              <>
                                <div style={{ fontSize: "1.5rem", fontWeight: 300, color: fgPrimary }}>14.5% (GPU Bottleneck)</div>
                                <p style={{ fontSize: "0.75rem", color: fgMuted, margin: "0.5rem 0 0 0", lineHeight: 1.4 }}>
                                  Your CPU is exceptionally fast. The system is GPU-bound in heavy gaming, which is ideal for maximum ray-tracing or high-resolution visual rendering.
                                </p>
                              </>
                            );
                          } else if (isHighGPU && isHighCPU) {
                            return (
                              <>
                                <div style={{ fontSize: "1.5rem", fontWeight: 300, color: "#00B85C" }}>2.5% (Optimal Balance)</div>
                                <p style={{ fontSize: "0.75rem", color: fgMuted, margin: "0.5rem 0 0 0", lineHeight: 1.4 }}>
                                  Perfect pairing! Your core computational nodes are balanced for extreme data throughput and professional rendering workflows.
                                </p>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <div style={{ fontSize: "1.5rem", fontWeight: 300, color: "#00B85C" }}>5.0% (Well Balanced)</div>
                                <p style={{ fontSize: "0.75rem", color: fgMuted, margin: "0.5rem 0 0 0", lineHeight: 1.4 }}>
                                  Healthy component pairing. Safe bottleneck ratios for normal 1080p and 1440p gaming configurations.
                                </p>
                              </>
                            );
                          }
                        })() : (
                          <div style={{ fontSize: "0.8rem", color: fgMuted, fontStyle: "italic", paddingTop: "4px" }}>
                            Select both a Processor and a Graphics Card to calculate pipeline balance metrics.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Game FPS estimates */}
                  <div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: fgMuted, display: "block", marginBottom: "0.5rem" }}>
                      Projected Performance (1440p)
                    </span>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      
                      {/* Game 1 */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}`, paddingBottom: "4px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Cyberpunk 2077</span>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: build.gpu ? "#00B85C" : fgMuted }}>
                          {build.gpu ? (() => {
                            if (build.gpu.name.includes("4090") || build.gpu.name.includes("5090")) return "165+ FPS";
                            if (build.gpu.name.includes("5080") || build.gpu.name.includes("4080")) return "130+ FPS";
                            if (build.gpu.name.includes("5070") || build.gpu.name.includes("9070")) return "105+ FPS";
                            return "75+ FPS";
                          })() : "-- FPS"}
                        </span>
                      </div>

                      {/* Game 2 */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}`, paddingBottom: "4px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>GTA VI (Projected)</span>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: build.gpu ? "#00B85C" : fgMuted }}>
                          {build.gpu ? (() => {
                            if (build.gpu.name.includes("4090") || build.gpu.name.includes("5090")) return "110+ FPS";
                            if (build.gpu.name.includes("5080") || build.gpu.name.includes("4080")) return "90+ FPS";
                            if (build.gpu.name.includes("5070") || build.gpu.name.includes("9070")) return "75+ FPS";
                            return "50+ FPS";
                          })() : "-- FPS"}
                        </span>
                      </div>

                      {/* Game 3 */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}`, paddingBottom: "4px" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Counter-Strike 2</span>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: build.cpu ? "#00B85C" : fgMuted }}>
                          {build.cpu ? (() => {
                            if (build.cpu.name.includes("9900") || build.cpu.name.includes("9950X")) return "450+ FPS";
                            if (build.cpu.name.includes("285K") || build.cpu.name.includes("9800X3D")) return "420+ FPS";
                            if (build.cpu.name.includes("14900K") || build.cpu.name.includes("265K")) return "380+ FPS";
                            return "280+ FPS";
                          })() : "-- FPS"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: border, margin: "1.25rem 0" }} />

                {/* Custom builder recommendation tip */}
                <div style={{ fontSize: "0.75rem", color: fgMuted, lineHeight: 1.4 }}>
                  <strong>Forge Advice:</strong> {(() => {
                    if (!build.ram) {
                      return "Install high-speed velocity DDR5 RAM (dual-channel) to prevent instruction bottlenecks.";
                    }
                    if (systemWattage > 500 && !build.cooler) {
                      return "High-performance components detected. We suggest selecting a high-efficiency liquid cooler for thermal safety.";
                    }
                    if (!build.storage) {
                      return "Select a high-speed NVMe PCIe 4.0 storage drive to keep boot times under 5 seconds.";
                    }
                    if (!build.motherboard) {
                      return "Choose a compatible motherboard matching your processor's socket to proceed with power distribution checks.";
                    }
                    return "Excellent node balance! Proceed to review estimated system wattage requirements.";
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Sidebar Summary ── */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div style={{ border: `1px solid ${borderStrong}`, borderRadius: "4px", background: cardBg, padding: "1.5rem" }}>
              
              <h2 style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "-0.02em", margin: "0 0 1.25rem 0" }}>
                Build Summary
              </h2>

              {/* 8 Component Boxes */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.5rem" }}>
                {categories.map((cat) => {
                  const component = build[cat.key];
                  const isCurrentCategory = selectedCategory === cat.key;
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.key}
                      onClick={() => {
                        setSelectedCategory(cat.key);
                        setSearchQuery("");
                      }}
                      style={{
                        border: `1px solid ${isCurrentCategory ? fgPrimary : borderStrong}`,
                        borderRadius: "4px",
                        background: cardBg,
                        padding: "0.75rem",
                        cursor: "pointer",
                        transition: "all 150ms ease",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                      onMouseEnter={e => {
                        if (!isCurrentCategory) {
                          e.currentTarget.style.borderColor = fgPrimary;
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isCurrentCategory) {
                          e.currentTarget.style.borderColor = borderStrong;
                        }
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px", alignItems: "center", flex: 1, minWidth: 0 }}>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "4px",
                          background: isDark ? "#1C1C1C" : "#F3F2EE",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <Icon style={{ width: "14px", height: "14px", color: fgPrimary, strokeWidth: 1.5 }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.05em",
                            textTransform: "uppercase", color: fgMuted, fontFamily: "monospace"
                          }}>
                            {cat.label}
                          </div>
                          <div style={{
                            fontSize: "0.75rem", fontWeight: 600, color: component ? fgPrimary : fgMuted,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            marginTop: "1px"
                          }}>
                            {component ? component.name : "Not selected"}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", paddingLeft: "10px", display: "flex", flexDirection: "column", alignItems: "end", gap: "1px" }}>
                        {component ? (
                          <>
                            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: fgPrimary }}>
                              {formatPrice(component.price, region, exchangeRate)}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeComponent(cat.key);
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: fgMuted,
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                padding: 0,
                                textDecoration: "underline"
                              }}
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <span style={{
                            fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em",
                            textTransform: "uppercase", color: fgPrimary, textDecoration: "underline"
                          }}>
                            Select
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.8rem", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: fgMuted }}>Subtotal</span>
                  <span style={{ marginLeft: "auto" }}>{formatPrice(subtotal, region, exchangeRate)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: fgMuted }}>Assembly & Tuning</span>
                  <span style={{ marginLeft: "auto" }}>{subtotal > 0 ? formatPrice(assemblyFee, region, exchangeRate) : "$0.00"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: fgMuted }}>Shipping</span>
                  <span style={{ marginLeft: "auto", color: "#00B85C", fontWeight: 700 }}>FREE</span>
                </div>
              </div>

              <div style={{ height: "1px", background: borderStrong, marginBottom: "1.25rem" }} />

              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: fgMuted, display: "block", marginBottom: "0.25rem" }}>
                  Total Investment
                </span>
                <div style={{ fontSize: "1.8rem", fontWeight: 300, color: fgPrimary, letterSpacing: "-0.02em" }}>
                  {formatPrice(totalPrice, region, exchangeRate)}
                </div>
              </div>

              {/* Compatibility & Power Draw block */}
              <div style={{ border: `1px solid ${borderStrong}`, borderRadius: "4px", padding: "1rem", background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: fgMuted, textTransform: "uppercase" }}>Compatibility</span>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#00B85C" }}>{compatibilityScore}%</span>
                </div>
                <div style={{ width: "100%", height: "4px", background: borderStrong, borderRadius: "2px", overflow: "hidden", marginBottom: "10px" }}>
                  <div style={{ width: `${compatibilityScore}%`, height: "100%", background: "#00B85C", transition: "width 0.3s ease" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: fgMuted }}>
                  <span>Est. Power Draw</span>
                  <span style={{ color: fgPrimary, fontWeight: 600 }}>{systemWattage}W</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "1.25rem" }}>
                <button
                  onClick={() => showToast("Redirecting to checkout...", "info")}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "4px",
                    background: fgPrimary, color: isDark ? "#0A0A0A" : "#FAF9F6",
                    border: "none", cursor: "pointer",
                    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  }}
                >
                  Proceed to Checkout <ArrowRight style={{ width: "14px", height: "14px" }} />
                </button>
                
                <button
                  onClick={handleSave}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "4px",
                    background: "transparent", color: fgPrimary,
                    border: `1px solid ${borderStrong}`, cursor: "pointer",
                    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    transition: "all 150ms ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = fgPrimary}
                  onMouseLeave={e => e.currentTarget.style.borderColor = borderStrong}
                >
                  Save Configuration
                </button>
              </div>

              {/* Monospace legal disclaimer */}
              <p style={{ fontSize: "0.6rem", color: fgMuted, lineHeight: 1.4, margin: "0 0 1.5rem 0", fontFamily: "monospace" }}>
                *Final price includes our premium 3-year warranty and thermal optimization service. Financing available at checkout.
              </p>

              {/* Contact box */}
              <div style={{ borderTop: `1px solid ${borderStrong}`, paddingTop: "1.25rem" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <Calendar style={{ width: "16px", height: "16px", color: fgPrimary, marginTop: "2px" }} />
                  <div>
                    <h5 style={{ fontSize: "0.8rem", fontWeight: 700, margin: "0 0 4px 0" }}>
                      Need an architect?
                    </h5>
                    <p style={{ fontSize: "0.75rem", color: fgMuted, margin: "0 0 10px 0", lineHeight: 1.4 }}>
                      Our engineers are available for a one-on-one consultation to review your build.
                    </p>
                    <button
                      onClick={() => showToast("Opening schedule modal...", "info")}
                      style={{
                        background: "transparent", border: "none", padding: 0, cursor: "pointer",
                        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
                        color: fgPrimary, textTransform: "uppercase", textDecoration: "underline"
                      }}
                    >
                      Schedule Call
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* AI Build Modal / Chatbot */}
      {isAIModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 200, padding: "1.5rem"
        }}>
          <div style={{
            background: cardBg, border: `1px solid ${fgPrimary}`,
            borderRadius: "6px", width: "100%", maxWidth: "900px",
            height: "80vh", minHeight: "500px",
            color: fgPrimary, boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
            display: "grid", gridTemplateColumns: "1.3fr 1fr",
            overflow: "hidden",
            transition: "all 0.3s ease"
          }}>
            {/* LEFT PANEL: Chat Thread */}
            <div style={{ display: "flex", flexDirection: "column", height: "100%", borderRight: `1px solid ${borderStrong}` }}>
              
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: `1px solid ${borderStrong}`, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Sparkles style={{ width: "20px", height: "20px", color: fgPrimary }} />
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Hardware Architect AI</h3>
                </div>
              </div>

              {/* Chat messages */}
              <div style={{ flex: "1 1 0%", minHeight: 0, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {chatMessages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div key={msg.id} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
                      <div style={{
                        maxWidth: "80%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: isUser ? "none" : `1px solid ${borderStrong}`,
                        background: isUser ? fgPrimary : cardBg,
                        color: isUser ? (isDark ? "#0A0A0A" : "#FAF9F6") : fgPrimary,
                        fontSize: "0.8rem",
                        lineHeight: 1.5,
                        whiteSpace: "pre-line"
                      }}>
                        {msg.text}
                        
                        {/* Inline parts hint */}
                        {!isUser && msg.recommendedParts && msg.recommendedParts.length > 0 && (
                          <div style={{ marginTop: "8px", fontSize: "0.7rem", color: fgMuted, borderTop: `1px dashed ${borderStrong}`, paddingTop: "6px", cursor: "pointer", textDecoration: "underline" }} onClick={() => {
                            setActiveAIParts(msg.recommendedParts!);
                            const initialSelection: Record<keyof BuildConfig, boolean> = { cpu: true, gpu: true, motherboard: true, ram: true, storage: true, cooler: true, psu: true, case: true };
                            setSelectedSuggestedParts(initialSelection);
                          }}>
                            View recommendations checklist in the side panel →
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {isGeneratingAI && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: `1px solid ${borderStrong}`,
                      background: cardBg,
                      color: fgMuted,
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <RefreshCw style={{ width: "12px", height: "12px", animation: "spin 1.5s linear infinite" }} />
                      Designing...
                    </div>
                  </div>
                )}
              </div>

              {/* Chat suggestions pills */}
              <div style={{ display: "flex", gap: "6px", padding: "0.5rem 1.5rem", overflowX: "auto", flexShrink: 0 }}>
                {[
                  { label: "$1500 Gaming PC", query: "Suggest a $1500 gaming PC build" },
                  { label: "Best Video Editing setup", query: "Can you build a high-performance video editing PC?" },
                  { label: "Check Compatibility rules", query: "What compatibility rules do you check?" }
                ].map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setChatInput(pill.query);
                    }}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      border: `1px solid ${borderStrong}`,
                      background: "transparent",
                      color: fgMuted,
                      fontSize: "0.65rem",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 150ms ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = fgPrimary;
                      e.currentTarget.style.color = fgPrimary;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = borderStrong;
                      e.currentTarget.style.color = fgMuted;
                    }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Message input */}
              <div style={{ padding: "1.25rem 1.5rem", borderTop: `1px solid ${borderStrong}`, display: "flex", gap: "8px", flexShrink: 0 }}>
                <input
                  type="text"
                  placeholder="Type a message (e.g. 'Build a 3D workstation for $2500')..."
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") sendChatMessage();
                  }}
                  style={{
                    flex: 1, padding: "10px 14px",
                    background: isDark ? "#121212" : "#FFFFFF",
                    border: `1px solid ${borderStrong}`, borderRadius: "4px",
                    color: fgPrimary, outline: "none", fontSize: "0.8rem"
                  }}
                />
                <button
                  onClick={sendChatMessage}
                  style={{
                    padding: "10px 20px", borderRadius: "4px",
                    background: fgPrimary, color: isDark ? "#0A0A0A" : "#FAF9F6",
                    border: "none", cursor: "pointer",
                    fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}
                >
                  Send
                </button>
              </div>
            </div>

            {/* RIGHT PANEL: Suggested Parts Checklist */}
            <div style={{ display: "flex", flexDirection: "column", height: "100%", background: isDark ? "#0C0C0C" : "#FAF9F6" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 1.5rem", borderBottom: `1px solid ${borderStrong}`, flexShrink: 0 }}>
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>AI Recommendations</span>
                <button
                  onClick={() => setIsAIModalOpen(false)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: fgMuted, display: "flex", padding: 0 }}
                >
                  <X style={{ width: "16px", height: "16px" }} />
                </button>
              </div>

              {activeAIParts ? (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", minHeight: 0 }}>
                  <div style={{ flex: "1 1 0%", minHeight: 0, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontSize: "0.75rem", color: fgMuted, margin: "0 0 10px 0", lineHeight: 1.4 }}>
                      Select which suggested components you would like to keep in your configurator build:
                    </p>
                    
                    {activeAIParts.map((item) => {
                      const isChecked = selectedSuggestedParts[item.category];
                      return (
                        <div
                          key={item.category}
                          onClick={() => {
                            setSelectedSuggestedParts(prev => ({
                              ...prev,
                              [item.category]: !prev[item.category]
                            }));
                          }}
                          style={{
                            display: "flex", alignItems: "center", gap: "10px",
                            padding: "10px", borderRadius: "4px",
                            border: `1px solid ${isChecked ? fgPrimary : borderStrong}`,
                            background: cardBg, cursor: "pointer",
                            transition: "all 150ms ease"
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // handled by parent onClick
                            style={{ cursor: "pointer" }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "0.6rem", fontWeight: 700, color: fgMuted, textTransform: "uppercase", fontFamily: "monospace" }}>
                              {item.category}
                            </div>
                            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: fgPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {item.component.name}
                            </div>
                          </div>
                          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: fgPrimary }}>
                            {formatPrice(item.component.price, region, exchangeRate)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer apply */}
                  <div style={{ padding: "1.5rem", borderTop: `1px solid ${borderStrong}`, background: cardBg, flexShrink: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.75rem", color: fgMuted }}>Selected Subtotal:</span>
                      <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                        {formatPrice(
                          activeAIParts.reduce((sum, item) => sum + (selectedSuggestedParts[item.category] ? item.component.price : 0), 0),
                          region,
                          exchangeRate
                        )}
                      </span>
                    </div>
                    
                    <button
                      onClick={applySuggestedParts}
                      style={{
                        width: "100%", padding: "12px", borderRadius: "4px",
                        background: fgPrimary, color: isDark ? "#0A0A0A" : "#FAF9F6",
                        border: "none", cursor: "pointer",
                        fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase", textAlign: "center"
                      }}
                    >
                      Apply Selected to Build
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center", color: fgMuted }}>
                  <Sparkles style={{ width: "32px", height: "32px", color: borderStrong, marginBottom: "12px", strokeWidth: 1 }} />
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, margin: "0 0 6px 0", color: fgPrimary }}>No recommendations loaded</h4>
                  <p style={{ fontSize: "0.75rem", color: fgMuted, margin: 0, lineHeight: 1.4, maxWidth: "220px" }}>
                    Ask the AI Architect in the chat thread to recommend parts to see them here.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}