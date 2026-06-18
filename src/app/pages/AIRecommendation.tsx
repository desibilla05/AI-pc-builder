import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRegionStore, formatPrice } from "../../store/regionStore";
import { COMPONENTS_DATABASE } from "../../data/components";
import {
  Sparkles,
  DollarSign,
  Target,
  Monitor,
  Zap,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Save,
  Share2,
  Layers,
  HardDrive,
  MemoryStick,
  Box,
  Fan,
  CircuitBoard,
  Gamepad2,
  Wrench,
  TrendingUp,
  Key,
  MessageSquare,
  Send,
  Loader,
} from "lucide-react";

interface Component {
  name: string;
  price: number;
  specs: string;
  wattage?: number;
  brand?: string;
}

interface BuildRecommendation {
  cpu: Component;
  gpu: Component;
  motherboard: Component;
  ram: Component;
  storage: Component;
  psu: Component;
  case: Component;
  cooler: Component;
  totalPrice: number;
  performance: string;
  reasoning: string;
  gameBenchmarks: { game: string; fps: number; settings: string }[];
}

// Full database aligned with PCBuilder.tsx mockComponents
const CPU_DATABASE = COMPONENTS_DATABASE.cpu;
const GPU_DATABASE = COMPONENTS_DATABASE.gpu;
const MOTHERBOARD_DATABASE = COMPONENTS_DATABASE.motherboard;
const RAM_DATABASE = COMPONENTS_DATABASE.ram;
const STORAGE_DATABASE = COMPONENTS_DATABASE.storage;
const PSU_DATABASE = COMPONENTS_DATABASE.psu;
const CASE_DATABASE = COMPONENTS_DATABASE.case;
const COOLER_DATABASE = COMPONENTS_DATABASE.cooler;

const CHAT_SYSTEM_INSTRUCTION = `
You are the BuildForge AI Architect, an expert custom hardware consultant.
Your role is to chat with the user and guide them in configuring the ultimate desktop PC.
Ask clarifying questions about their budget, form factor, or use cases.

When the user wants to compile a complete PC configuration, select only from the following list of real database components:
CPUs:
${CPU_DATABASE.map(c => `- ${c.name} ($${c.price})`).join("\n")}

GPUs:
${GPU_DATABASE.map(g => `- ${g.name} ($${g.price})`).join("\n")}

Motherboards:
${MOTHERBOARD_DATABASE.map(m => `- ${m.name} ($${m.price})`).join("\n")}

RAM Options:
${RAM_DATABASE.map(r => `- ${r.name} ($${r.price})`).join("\n")}

Storage Options:
${STORAGE_DATABASE.map(s => `- ${s.name} ($${s.price})`).join("\n")}

Cooler Options:
${COOLER_DATABASE.map(c => `- ${c.name} ($${c.price})`).join("\n")}

PSU Options:
${PSU_DATABASE.map(p => `- ${p.name} ($${p.price})`).join("\n")}

Case Options:
${CASE_DATABASE.map(c => `- ${c.name} ($${c.price})`).join("\n")}

Socket Compatibility Rules:
1. AM5 CPUs (Ryzen 9950X, 9900X, 9800X3D, 7800X3D, 9600X, 7600) require AM5 Motherboards (X870E, B850, X670E, B650).
2. LGA1851 Core Ultra CPUs (Ultra 9, Ultra 7, Ultra 5) require LGA1851 Z890 Motherboards.
3. LGA1700 CPUs (i9-14900K) require LGA1700 B760M Motherboards.

Guide the conversation, and be helpful and technical. If you recommend a full list of parts, summarize the specifications and total cost.
`;

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

export function AIRecommendation() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"form" | "chat">("form");
  const [budget, setBudget] = useState("1800");
  const [purpose, setPurpose] = useState<string[]>(["gaming"]);
  const [resolution, setResolution] = useState("1440p");
  const [recommendation, setRecommendation] = useState<BuildRecommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { region, exchangeRate } = useRegionStore();
  // Secure backend integration: API key is stored only on the backend server.
  const apiKey = "backend";

  // Chat State
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "model"; parts: { text: string }[] }[]>([
    {
      role: "model",
      parts: [{ text: "Greetings, builder! I am the BuildForge AI Architect. Tell me about the PC you want to build—your budget, your workloads (gaming, streaming, editing, coding), or any brand preferences—and let's design the perfect rig!" }]
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  const purposes = [
    { id: "gaming", label: "Gaming", icon: Target },
    { id: "streaming", label: "Streaming", icon: Zap },
    { id: "video-editing", label: "Video Editing", icon: Monitor },
    { id: "3d-rendering", label: "3D Rendering", icon: Cpu },
    { id: "programming", label: "Programming", icon: Wrench },
    { id: "general", label: "General Use", icon: CheckCircle2 },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const togglePurpose = (id: string) => {
    setPurpose((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one purpose
        return prev.filter((p) => p !== id);
      }
      return [...prev, id];
    });
  };

  // Chat Submission
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    if (!apiKey.trim()) {
      showToast("Backend Gemini API Key is missing. Falling back...");
      return;
    }

    const userMsg = { role: "user" as const, parts: [{ text: chatInput }] };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const resData = await callGeminiAPI(apiKey, {
        contents: updatedMessages,
        systemInstruction: {
          parts: [{ text: CHAT_SYSTEM_INSTRUCTION }]
        }
      });
      const reply = resData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setChatMessages(prev => [...prev, { role: "model", parts: [{ text: reply }] }]);
      } else {
        throw new Error("Empty reply");
      }
    } catch (err: any) {
      console.error(err);
      if (err.name === "RateLimitError") {
        showToast("Rate limit exceeded (429). Please wait before retrying.");
        setChatMessages(prev => [...prev, { role: "model", parts: [{ text: "Rate limit exceeded (429 Too Many Requests). Please wait a moment before sending another message." }] }]);
      } else {
        showToast("Request failed. Verify key or connection.");
        setChatMessages(prev => [...prev, { role: "model", parts: [{ text: "System overload. I could not establish a connection to the Gemini neural network. Check your API Key and try again." }] }]);
      }
    } finally {
      setChatLoading(false);
    }
  };

  const handleLoadIntoBuilder = (rec: any) => {
    const buildToSave = {
      cpu: rec.cpu,
      gpu: rec.gpu,
      motherboard: rec.motherboard,
      ram: rec.ram,
      storage: rec.storage,
      cooler: rec.cooler,
      psu: rec.psu,
      case: rec.case,
    };
    localStorage.setItem("buildforge-current-build", JSON.stringify(buildToSave));
    showToast("Components loaded! Redirecting to Interactive Builder...");
    setTimeout(() => {
      navigate("/builder");
    }, 850);
  };

  const getChatRecommendedBuild = () => {
    const categories = {
      cpu: CPU_DATABASE,
      gpu: GPU_DATABASE,
      motherboard: MOTHERBOARD_DATABASE,
      ram: RAM_DATABASE,
      storage: STORAGE_DATABASE,
      cooler: COOLER_DATABASE,
      psu: PSU_DATABASE,
      case: CASE_DATABASE,
    };
    const loadedBuild: any = {};
    let chatText = "";
    let count = 0;
    
    for (let i = chatMessages.length - 1; i >= 0; i--) {
      const msg = chatMessages[i];
      if (msg.role === "model") {
        chatText += " " + msg.parts[0].text;
        count++;
        if (count >= 3) break;
      }
    }

    if (!chatText.trim()) return null;

    let foundAny = false;
    Object.entries(categories).forEach(([key, db]) => {
      for (const component of db) {
        if (chatText.toLowerCase().includes(component.name.toLowerCase())) {
          loadedBuild[key] = component;
          foundAny = true;
          break;
        }
      }
    });

    return foundAny ? loadedBuild : null;
  };

  // Form recommendation pipeline
  const generateRecommendation = async () => {
    setIsGenerating(true);

    const targetBudget = parseInt(budget);
    const isGaming = purpose.includes("gaming");
    const isStreaming = purpose.includes("streaming");
    const isWorkstation = purpose.includes("3d-rendering") || purpose.includes("video-editing");

    // 1. GENERATIVE AI GENERATION (IF API KEY IS PROVIDED)
    if (apiKey.trim()) {
      const promptText = `
You are an expert PC Building Architect.
The user wants to forge a custom PC build.
Target Budget: $${targetBudget} USD
Workload/Purposes: ${purpose.join(", ")}
Target Resolution: ${resolution}

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
1. Select exactly one CPU, one GPU, one motherboard, one RAM kit, one Storage drive, one Cooler, one PSU, and one Case from the databases above.
2. The total price of all selected components must fit close to the target budget of $${targetBudget} (within 10-15%).
3. AMD AM5 CPUs (Ryzen 9950X, 9900X, 9800X3D, 7800X3D, 9600X, 7600) MUST be paired with AM5 Motherboards (ASUS ROG Crosshair X870E Hero, MSI MPG X870E Carbon WiFi, Gigabyte B850 AORUS Elite, ASUS TUF Gaming B650-PLUS WiFi, Gigabyte X670E AORUS Master).
4. Intel LGA1851 Arrow Lake CPUs (Ultra 9 285K, Ultra 7 265K, Ultra 5 245K) MUST be paired with LGA1851 Motherboards (ASUS ROG Maximus Z890 Hero, MSI MAG Z890 Tomahawk WiFi).
5. Intel LGA1700 Raptor Lake CPUs (i9-14900K) MUST be paired with LGA1700 Motherboards (ASRock B760M Pro RS).
6. Calculate 'totalPrice' as the exact sum of the selected components' prices.
7. Provide the expected performance description and dynamic AI reasoning explaining why you chose these parts.
8. Output estimated frame rates in games (Cyberpunk 2077, GTA VI, Elden Ring, Helldivers 2) at the chosen resolution.
`;

      try {
        const resData = await callGeminiAPI(apiKey, {
          contents: [{
            parts: [{ text: promptText }]
          }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                cpu: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                gpu: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                motherboard: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                ram: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                storage: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                cooler: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                psu: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                case: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    price: { type: "NUMBER" },
                    specs: { type: "STRING" },
                    brand: { type: "STRING" }
                  },
                  required: ["name", "price", "specs", "brand"]
                },
                totalPrice: { type: "NUMBER" },
                performance: { type: "STRING" },
                reasoning: { type: "STRING" },
                gameBenchmarks: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      game: { type: "STRING" },
                      fps: { type: "NUMBER" },
                      settings: { type: "STRING" }
                    },
                    required: ["game", "fps", "settings"]
                  }
                }
              },
              required: [
                "cpu", "gpu", "motherboard", "ram", "storage", "cooler", "psu", "case",
                "totalPrice", "performance", "reasoning", "gameBenchmarks"
              ]
            }
          }
        });

        const generatedText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!generatedText) throw new Error("Empty candidate list from Gemini");

        const liveBuild = JSON.parse(generatedText) as BuildRecommendation;
        
        // Match details with corresponding database entries to restore full metadata if needed
        const cpuMatch = CPU_DATABASE.find(c => c.name === liveBuild.cpu.name) || liveBuild.cpu;
        const gpuMatch = GPU_DATABASE.find(g => g.name === liveBuild.gpu.name) || liveBuild.gpu;
        const moboMatch = MOTHERBOARD_DATABASE.find(m => m.name === liveBuild.motherboard.name) || liveBuild.motherboard;
        const ramMatch = RAM_DATABASE.find(r => r.name === liveBuild.ram.name) || liveBuild.ram;
        const storageMatch = STORAGE_DATABASE.find(s => s.name === liveBuild.storage.name) || liveBuild.storage;
        const coolerMatch = COOLER_DATABASE.find(c => c.name === liveBuild.cooler.name) || liveBuild.cooler;
        const psuMatch = PSU_DATABASE.find(p => p.name === liveBuild.psu.name) || liveBuild.psu;
        const caseMatch = CASE_DATABASE.find(c => c.name === liveBuild.case.name) || liveBuild.case;

        const recalculatedTotal = 
          cpuMatch.price + 
          gpuMatch.price + 
          moboMatch.price + 
          ramMatch.price + 
          storageMatch.price + 
          coolerMatch.price + 
          psuMatch.price + 
          caseMatch.price;

        setRecommendation({
          cpu: cpuMatch,
          gpu: gpuMatch,
          motherboard: moboMatch,
          ram: ramMatch,
          storage: storageMatch,
          cooler: coolerMatch,
          psu: psuMatch,
          case: caseMatch,
          totalPrice: recalculatedTotal,
          performance: liveBuild.performance,
          reasoning: liveBuild.reasoning,
          gameBenchmarks: liveBuild.gameBenchmarks,
        });

        setIsGenerating(false);
        showToast("Live Generative AI PC build compiled successfully!");
        return;
      } catch (err: any) {
        if (err.name === "RateLimitError") {
          setIsGenerating(false);
          showToast("Rate limit exceeded (429). Please wait before requesting another AI recommendation.");
          return;
        }
        console.warn("Generative AI compilation failed. Falling back to local smart compiler.", err);
        showToast("AI model failed. Loading local fallback rig...");
      }
    }

    // 2. FALLBACK COMPILER (RULE-BASED OPTIMIZED LOCAL ENGINE)
    setTimeout(() => {
      const safeFind = (db: Component[], keywords: string[], fallbackIdx = 0) => {
        for (const kw of keywords) {
          const match = db.find(c => c.name.toLowerCase().includes(kw.toLowerCase()));
          if (match) return match;
        }
        return db[fallbackIdx] || db[0];
      };

      let cpuBrand: "AMD" | "Intel" = "AMD";
      if (isWorkstation && Math.random() > 0.5) {
        cpuBrand = "Intel";
      }

      let selectedCpu: Component = CPU_DATABASE[CPU_DATABASE.length - 1] || CPU_DATABASE[0];
      let selectedMobo: Component = MOTHERBOARD_DATABASE[2] || MOTHERBOARD_DATABASE[0];
      
      // CPU tiering
      if (targetBudget >= 3500) {
        selectedCpu = cpuBrand === "AMD" 
          ? safeFind(CPU_DATABASE, ["Ryzen 9 9950X", "9950X", "7950X"], CPU_DATABASE.length - 1)
          : safeFind(CPU_DATABASE, ["Ultra 9 285K", "i9-14900K", "14900K"], CPU_DATABASE.length - 1);
      } else if (targetBudget >= 2200) {
        selectedCpu = isGaming 
          ? safeFind(CPU_DATABASE, ["Ryzen 7 9800X3D", "7800X3D"], CPU_DATABASE.length - 1)
          : (cpuBrand === "AMD" 
              ? safeFind(CPU_DATABASE, ["Ryzen 9 9900X", "7900X"], CPU_DATABASE.length - 1) 
              : safeFind(CPU_DATABASE, ["Ultra 9 285K", "i9-14900K", "14900K"], CPU_DATABASE.length - 1));
      } else if (targetBudget >= 1500) {
        selectedCpu = isGaming 
          ? safeFind(CPU_DATABASE, ["Ryzen 7 7800X3D", "5800X3D"], CPU_DATABASE.length - 1)
          : (cpuBrand === "AMD" 
              ? safeFind(CPU_DATABASE, ["Ryzen 9 9900X", "7900X"], CPU_DATABASE.length - 1)
              : safeFind(CPU_DATABASE, ["Ultra 7 265K", "i7-14700K", "14700K"], CPU_DATABASE.length - 1));
      } else if (targetBudget >= 1000) {
        selectedCpu = cpuBrand === "AMD"
          ? safeFind(CPU_DATABASE, ["Ryzen 5 9600X", "7600X"], 0)
          : safeFind(CPU_DATABASE, ["Ultra 5 245K", "i5-14600K", "14600K"], 0);
      } else {
        selectedCpu = safeFind(CPU_DATABASE, ["Ryzen 5 7600", "5600X"], 0);
      }

      // 2. Select compatible Motherboard
      if (selectedCpu.name.includes("AM5")) {
        if (targetBudget >= 3000) {
          selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Crosshair X870E", "X870E"], 0);
        } else if (targetBudget >= 2000) {
          selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Carbon WiFi X870E", "X870E Carbon", "X870E"], 0);
        } else if (targetBudget >= 1400) {
          selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["B850 AORUS Elite", "B850", "B650"], 0);
        } else {
          selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["B650-PLUS", "B650"], 0);
        }
      } else if (selectedCpu.name.includes("LGA1851")) {
        if (targetBudget >= 2500) {
          selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Maximus Z890", "Z890 Hero", "Z890"], 0);
        } else {
          selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["Z890 Tomahawk", "Z890"], 0);
        }
      } else {
        selectedMobo = safeFind(MOTHERBOARD_DATABASE, ["B760M Pro", "B760", "Z790"], 0);
      }

      // 3. Select GPU based on Budget and Target Resolution
      let selectedGpu: Component = GPU_DATABASE[GPU_DATABASE.length - 1]; // Fallback
      if (targetBudget >= 3500) {
        selectedGpu = safeFind(GPU_DATABASE, ["RTX 5090", "RTX 4090"], GPU_DATABASE.length - 1);
      } else if (targetBudget >= 2500) {
        selectedGpu = resolution === "4k"
          ? safeFind(GPU_DATABASE, ["RTX 5090", "RTX 5080", "RTX 4090"], GPU_DATABASE.length - 1)
          : safeFind(GPU_DATABASE, ["RTX 5080", "RTX 4080"], GPU_DATABASE.length - 1);
      } else if (targetBudget >= 1800) {
        selectedGpu = resolution === "4k"
          ? safeFind(GPU_DATABASE, ["RTX 5080", "RTX 4080 Super", "RTX 4080"], GPU_DATABASE.length - 1)
          : safeFind(GPU_DATABASE, ["RTX 5070 Ti", "RTX 4070 Ti"], GPU_DATABASE.length - 1);
      } else if (targetBudget >= 1300) {
        selectedGpu = isGaming
          ? safeFind(GPU_DATABASE, ["RTX 5070", "RTX 4070"], 0)
          : safeFind(GPU_DATABASE, ["RX 9070 XT", "RX 7900 XT"], 0);
      } else if (targetBudget >= 900) {
        selectedGpu = safeFind(GPU_DATABASE, ["RX 9070", "RX 7800 XT", "RTX 4070"], 0);
      } else {
        selectedGpu = safeFind(GPU_DATABASE, ["RTX 4060 Ti", "RTX 4060", "RX 7600"], 0);
      }

      // 4. Select RAM based on target budget and use case
      let selectedRam: Component = RAM_DATABASE[0]; // 32GB 6000 CL30 standard
      if (isWorkstation || targetBudget >= 3000) {
        selectedRam = targetBudget >= 3200
          ? safeFind(RAM_DATABASE, ["Dominator Titanium 64GB", "64GB DDR5"], 0)
          : safeFind(RAM_DATABASE, ["Trident Z5 RGB 64GB", "64GB DDR5"], 0);
      } else if (targetBudget >= 2000) {
        selectedRam = safeFind(RAM_DATABASE, ["Dominator Titanium 32GB", "32GB DDR5"], 0);
      } else if (targetBudget < 900) {
        selectedRam = safeFind(RAM_DATABASE, ["Crucial Pro 16GB", "16GB DDR4", "16GB DDR5"], 0);
      }

      // 5. Select Storage (Gen5 for workstation, Gen4 standard)
      let selectedStorage: Component = STORAGE_DATABASE[0]; // Samsung 990 Pro 2TB
      if (isWorkstation && targetBudget >= 2500) {
        selectedStorage = safeFind(STORAGE_DATABASE, ["Samsung 990 Evo Plus 4TB", "4TB"], 0);
      } else if (targetBudget >= 2000) {
        selectedStorage = safeFind(STORAGE_DATABASE, ["Crucial T700 2TB", "2TB"], 0);
      } else if (targetBudget < 1000) {
        selectedStorage = safeFind(STORAGE_DATABASE, ["Crucial P5 Plus 1TB", "1TB"], 0);
      }

      // 6. Cooler
      let selectedCooler: Component = COOLER_DATABASE[1] || COOLER_DATABASE[0];
      if (targetBudget >= 3200) {
        selectedCooler = safeFind(COOLER_DATABASE, ["Corsair iCUE H170i", "Liquid Freezer III 420"], 0);
      } else if (targetBudget >= 2000) {
        selectedCooler = safeFind(COOLER_DATABASE, ["Kraken Elite 360", "Liquid Freezer III 360"], 0);
      } else if (targetBudget < 1000) {
        selectedCooler = safeFind(COOLER_DATABASE, ["Peerless Assassin 120", "Air Cooler"], 0);
      } else if (targetBudget < 1400) {
        selectedCooler = safeFind(COOLER_DATABASE, ["Dark Rock Pro 5", "Air Cooler"], 0);
      }

      // 7. PSU
      let selectedPsu: Component = PSU_DATABASE[0]; // RM1000x 1000W
      const powerNeed = (selectedCpu?.wattage || 100) + (selectedGpu?.wattage || 250) + 150;
      if (powerNeed > 800 || targetBudget >= 3500) {
        selectedPsu = safeFind(PSU_DATABASE, ["Seasonic Prime TX-1600", "1600W", "1500W", "1300W"], 0);
      } else if (powerNeed > 650 || targetBudget >= 2200) {
        selectedPsu = safeFind(PSU_DATABASE, ["Corsair RM1000x", "Dark Power 13 1000W", "1000W"], 0);
      } else if (targetBudget < 1000) {
        selectedPsu = safeFind(PSU_DATABASE, ["Corsair RM750e", "750W", "650W"], 0);
      } else {
        selectedPsu = safeFind(PSU_DATABASE, ["EVGA SuperNOVA 850", "850W"], 0);
      }

      // 8. Case
      let selectedCase: Component = CASE_DATABASE[0]; // Lian Li O11
      if (targetBudget >= 3500) {
        selectedCase = safeFind(CASE_DATABASE, ["Cooler Master HAF 700", "Full Tower"], 0);
      } else if (targetBudget >= 2200) {
        selectedCase = safeFind(CASE_DATABASE, ["Corsair 6500X", "Dark Base Pro 901"], 0);
      } else if (targetBudget < 1100) {
        selectedCase = safeFind(CASE_DATABASE, ["Corsair 4000D", "Mid Tower"], 0);
      } else if (targetBudget < 1600) {
        selectedCase = safeFind(CASE_DATABASE, ["Fractal Design North", "Mid Tower"], 0);
      }

      const totalPrice = 
        selectedCpu.price + 
        selectedGpu.price + 
        selectedMobo.price + 
        selectedRam.price + 
        selectedStorage.price + 
        selectedCooler.price + 
        selectedPsu.price + 
        selectedCase.price;

      // Make dynamic explanation
      const resolutionLabel = resolution.toUpperCase();
      let performanceInfo = "";
      if (isGaming) {
        performanceInfo = `Estimated 100+ FPS in modern AAA games at ${resolutionLabel} Ultra settings. `;
      } else if (isWorkstation) {
        performanceInfo = `Optimized for massive render workloads, complex Blender/Cinema4D nodes, and multi-stream 4K editing. `;
      } else {
        performanceInfo = `Ultra-responsive multitasking and lightning-fast compilations. `;
      }

      let reasoning = `We selected the ${selectedCpu.name} CPU and paired it with the powerful ${selectedGpu.name} GPU to maximize your budget for ${purpose.join(" & ")}. `;
      reasoning += `With ${selectedRam.name.split(" ").pop()} RAM and the lightning-fast ${selectedStorage.name}, you have ample resources. `;
      reasoning += `The ${selectedMobo.brand} motherboard binds everything together on a high-speed PCIe bus, cooled by the premium ${selectedCooler.name} cooler.`;

      // Game benchmarks based on the GPU & Resolution
      let baseFps = 100;
      if (selectedGpu.name.includes("5090")) baseFps = 210;
      else if (selectedGpu.name.includes("5080") || selectedGpu.name.includes("4090")) baseFps = 160;
      else if (selectedGpu.name.includes("5070 Ti") || selectedGpu.name.includes("4080")) baseFps = 130;
      else if (selectedGpu.name.includes("5070") || selectedGpu.name.includes("9070 XT")) baseFps = 105;
      else if (selectedGpu.name.includes("9070")) baseFps = 85;
      else baseFps = 60;

      if (resolution === "1440p") baseFps = Math.round(baseFps * 1.4);
      else if (resolution === "1080p") baseFps = Math.round(baseFps * 2.0);

      const gameBenchmarks = [
        { game: "Cyberpunk 2077 (Ray Tracing)", fps: Math.round(baseFps * 0.6), settings: "Ultra RT, DLSS Quality" },
        { game: "GTA VI (Est. 2026)", fps: Math.round(baseFps * 0.7), settings: "High, Temp Upscaling" },
        { game: "Elden Ring", fps: Math.min(60, Math.round(baseFps * 1.1)), settings: "Maximum (Locked/Unlocked)" },
        { game: "Helldivers 2", fps: Math.round(baseFps * 1.05), settings: "Ultra, Super Sampling Off" },
      ];

      setRecommendation({
        cpu: selectedCpu,
        gpu: selectedGpu,
        motherboard: selectedMobo,
        ram: selectedRam,
        storage: selectedStorage,
        psu: selectedPsu,
        case: selectedCase,
        cooler: selectedCooler,
        totalPrice,
        performance: performanceInfo,
        reasoning,
        gameBenchmarks,
      });

      setIsGenerating(false);
      showToast("Local configuration compiled successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 glass px-6 py-3 rounded-xl shadow-2xl border-primary animate-fade-in flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 -top-8 flex items-center justify-center pointer-events-none opacity-5">
            <span className="giant-text uppercase select-none font-mono">AI INTELLIGENCE</span>
          </div>
          <div className="inline-flex items-center gap-2.5 mb-4 px-4 py-2 rounded border border-border bg-card">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">Generative AI Architect</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">
            AI Build Architect
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Get personalized Rig Recommendations. Configure your specs using our diagnostics compiler or query the bot in real-time.
          </p>
        </div>

        {/* Toggle Mode Tab Bar */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-card p-1 rounded border border-border">
            <button
              onClick={() => setActiveTab("form")}
              className={`px-5 py-2 rounded text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer border ${
                activeTab === "form"
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" /> Form Spec Architect
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-5 py-2 rounded text-xs font-mono tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer border ${
                activeTab === "chat"
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Chatbot Architect
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Configuration Card (Form) - ONLY RENDERED IF activeTab is 'form' */}
          {activeTab === "form" && (
            <div className="lg:col-span-5 space-y-6 w-full">
              {/* Form Interface Controls */}
              <div className="p-6 rounded border border-border bg-card space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded border border-border flex items-center justify-center bg-muted/40">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h2 className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Forge Configuration</h2>
                </div>

                <div className="space-y-8">
                  {/* Budget Slider */}
                  <div>
                    <label className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <span className="flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-muted-foreground">
                        <DollarSign className="w-3.5 h-3.5" /> Target Budget
                      </span>
                      <span className="text-xl font-semibold text-foreground">{formatPrice(parseInt(budget), region, exchangeRate)}</span>
                    </label>
                    <input
                      type="range"
                      min="600"
                      max="5000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full h-1 bg-border appearance-none cursor-pointer accent-foreground"
                    />
                    <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground font-mono">
                      <span>{formatPrice(600, region, exchangeRate)} (Entry)</span>
                      <span>{formatPrice(5000, region, exchangeRate)} (Extreme)</span>
                    </div>
                  </div>

                  {/* Purpose Selection */}
                  <div>
                    <label className="flex items-center gap-2 mb-4 font-mono text-xs tracking-wider uppercase text-muted-foreground">
                      <Target className="w-3.5 h-3.5" /> Workloads & Tasks
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {purposes.map((p) => {
                        const IconComponent = p.icon;
                        const isSelected = purpose.includes(p.id);

                        return (
                          <button
                            key={p.id}
                            onClick={() => togglePurpose(p.id)}
                            className={`p-3 rounded border text-left transition-all relative overflow-hidden ${
                              isSelected
                                ? "bg-muted/60 border-foreground text-foreground font-medium"
                                : "border-border hover:border-foreground/50 text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-[10px] font-mono tracking-wider uppercase">{p.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target Resolution */}
                  <div>
                    <label className="flex items-center gap-2 mb-4 font-mono text-xs tracking-wider uppercase text-muted-foreground">
                      <Monitor className="w-3.5 h-3.5" /> Target Resolution
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {["1080p", "1440p", "4k"].map((res) => (
                        <button
                          key={res}
                          onClick={() => setResolution(res)}
                          className={`p-3 rounded border text-center transition-all ${
                            resolution === res
                              ? "bg-muted/60 border-foreground text-foreground font-medium"
                              : "border-border hover:border-foreground/50 text-muted-foreground"
                          }`}
                        >
                          <div className="text-xs font-mono tracking-wider uppercase">{res.toUpperCase()}</div>
                          <div className="text-[9px] text-muted-foreground font-light mt-1">
                            {res === "1080p"
                              ? "Casual"
                              : res === "1440p"
                              ? "Balanced"
                              : "Extreme"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={generateRecommendation}
                    disabled={isGenerating}
                    className="w-full py-3.5 rounded border border-foreground bg-foreground text-background text-xs font-mono tracking-wider uppercase transition-all hover:bg-foreground/90 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        FORGING YOUR RIG...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        {apiKey.trim() ? "GENERATE AI RECOMMENDATION" : "RUN DIAGNOSTIC RIG"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sidebar Guide */}
              <div className="p-6 rounded border border-border bg-card space-y-4">
                <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground">AI KNOWLEDGE BASE</h3>
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Targeted Budgeting", text: "Allocates finances dynamically into components based on workload vectors." },
                    { step: "02", title: "Strict Compatibility", text: "Ensures strict socket, form factor, and TDP requirements match." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                      <div>
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 font-light leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Right Side Content Pane (AI Output results or Chat Interface) */}
          <div className={`${activeTab === "form" ? "lg:col-span-7" : "lg:col-span-12 max-w-4xl mx-auto"} w-full h-full`}>
            
            {/* Tab: Form Spec Output */}
            {activeTab === "form" && (
              <div>
                {recommendation ? (
                  <div className="space-y-6">
                    {/* Build Header Overview */}
                    <div className="p-6 rounded border border-border bg-card relative">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase border border-border rounded text-muted-foreground">
                              {apiKey.trim() ? "LIVE LLM RIG" : "LOCAL OPTIMIZED RIG"}
                            </span>
                            <span className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase border border-border rounded text-muted-foreground">
                              {resolution.toUpperCase()} ULTRA
                            </span>
                          </div>
                          <h2 className="text-xl font-semibold text-foreground uppercase tracking-tight">
                            THE {recommendation.gpu.name.split(" ").slice(1).join(" ")} FORGE
                          </h2>
                          <p className="text-xs text-muted-foreground mt-1 font-light">
                            Compatible socket architecture compiled based on {purpose.join(", ")} requirements
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xl font-semibold text-foreground">
                            {formatPrice(recommendation.totalPrice, region, exchangeRate)}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mt-0.5">Total Spec Price</div>
                        </div>
                      </div>

                      <div className="section-divider my-6" />

                      {/* AI Reasoning Block */}
                      <div className="flex gap-4 items-start bg-muted/30 border border-border p-5 rounded">
                        <div className="w-8 h-8 rounded border border-border bg-card flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="text-xs font-mono tracking-wider uppercase text-muted-foreground">AI ARCHITECT REASONING</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-2 font-light">
                            {recommendation.reasoning}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Component Breakdown list */}
                    <div className="p-6 rounded border border-border bg-card">
                      <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-4 flex items-center gap-2">
                        <CircuitBoard className="w-4 h-4 text-muted-foreground" /> RECOMMENDED HARDWARE BREAKDOWN
                      </h3>
                      <div className="grid gap-3">
                        {[
                          { key: "CPU", val: recommendation.cpu, icon: Cpu },
                          { key: "GPU", val: recommendation.gpu, icon: Layers },
                          { key: "Motherboard", val: recommendation.motherboard, icon: CircuitBoard },
                          { key: "RAM", val: recommendation.ram, icon: MemoryStick },
                          { key: "Storage", val: recommendation.storage, icon: HardDrive },
                          { key: "Cooler", val: recommendation.cooler, icon: Fan },
                          { key: "PSU", val: recommendation.psu, icon: Zap },
                          { key: "Case", val: recommendation.case, icon: Box },
                        ].map((row) => {
                          const IconComponent = row.icon;
                          return (
                            <div key={row.key} className="flex items-center justify-between p-3.5 rounded border border-border bg-card/50 hover:border-foreground/50 transition-all group">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded border border-border bg-card flex items-center justify-center">
                                  <IconComponent className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">{row.key}</div>
                                  <div className="text-xs font-semibold text-foreground mt-0.5">{row.val.name}</div>
                                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{row.val.specs}</div>
                                </div>
                              </div>
                              <div className="text-right pl-2 shrink-0">
                                <div className="text-xs font-semibold text-foreground">{formatPrice(row.val.price, region, exchangeRate)}</div>
                                <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">{row.val.brand}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Performance Estimates */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* FPS estimates */}
                      <div className="p-6 rounded border border-border bg-card">
                        <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-4 flex items-center gap-2">
                          <Gamepad2 className="w-4 h-4 text-muted-foreground" /> GAMING ESTIMATES
                        </h3>
                        <div className="space-y-3">
                          {recommendation.gameBenchmarks.map((g, idx) => (
                            <div key={idx} className="p-3 rounded border border-border bg-card/50 flex items-center justify-between">
                              <div>
                                <div className="text-xs font-semibold text-foreground">{g.game}</div>
                                <div className="text-[9px] text-muted-foreground font-light mt-0.5">{g.settings}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-base font-semibold text-foreground">{g.fps} FPS</div>
                                <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">ESTIMATED</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Summary & Actions */}
                      <div className="p-6 rounded border border-border bg-card flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-6 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" /> EFFICIENCY RATINGS
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-xs font-mono tracking-wider mb-2 text-muted-foreground">
                                <span>COMPATIBILITY OVERVIEW</span>
                                <span className="text-foreground">100% SECURE</span>
                              </div>
                              <div className="h-1 w-full bg-muted border border-border overflow-hidden">
                                <div className="h-full bg-foreground w-full" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs font-mono tracking-wider mb-2 text-muted-foreground">
                                <span>EST. BOTTLE-NECK RATIO</span>
                                <span className="text-foreground">&lt; 2.5% (LOW)</span>
                              </div>
                              <div className="h-1 w-full bg-muted border border-border overflow-hidden">
                                <div className="h-full bg-foreground w-[95%]" />
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-xs font-mono tracking-wider text-muted-foreground pt-2 border-t border-border/50">
                              <span>EST. WATTAGE DRAW</span>
                              <span className="text-foreground font-semibold">
                                {recommendation.cpu.wattage && recommendation.gpu.wattage 
                                  ? (recommendation.cpu.wattage + recommendation.gpu.wattage + 150) 
                                  : 550}W
                              </span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleLoadIntoBuilder(recommendation)}
                          className="mt-8 w-full py-3.5 rounded border border-foreground bg-foreground text-background text-xs font-mono tracking-wider uppercase hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Wrench className="w-4 h-4" /> BUILD THIS PC IN BUILDER
                        </button>

                        <div className="mt-3 flex flex-col sm:flex-row gap-3">
                          <button 
                            onClick={() => showToast("Build config saved under 'My Builds' dashboard.")}
                            className="flex-1 py-3 rounded border border-border hover:border-foreground bg-card text-muted-foreground hover:text-foreground text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Save className="w-4 h-4" /> SAVE BUILD
                          </button>
                          <button 
                            onClick={() => {
                              const url = `${window.location.origin}/builder`;
                              navigator.clipboard.writeText(url);
                              showToast("Build reference copied to clipboard! Share details.");
                            }}
                            className="flex-1 py-3 rounded border border-border hover:border-foreground bg-card text-muted-foreground hover:text-foreground text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Share2 className="w-4 h-4" /> SHARE BUILD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[450px] flex flex-col items-center justify-center p-8 text-center rounded border border-dashed border-border bg-card relative overflow-hidden">
                    <div className="w-12 h-12 rounded border border-border bg-card flex items-center justify-center mb-4 text-primary">
                      <Sparkles className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-base font-normal tracking-wide text-foreground">Rig Configuration Diagnostics</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-2 leading-relaxed font-light">
                      Select your target specifications and initialize compiler recommendations.
                    </p>
                    <button
                      onClick={generateRecommendation}
                      className="mt-6 px-5 py-2.5 rounded border border-border hover:border-foreground text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-muted-foreground" /> Initialize Diagnostics
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Interactive Chatbot Console */}
            {activeTab === "chat" && (
              <div className="flex flex-col h-[650px] rounded border border-border bg-card overflow-hidden relative">
                
                {/* Chat Header */}
                <div className="px-6 py-4 bg-muted/30 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded border border-border flex items-center justify-center bg-card">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">AI Architect Console</h3>
                      <p className="text-[10px] text-muted-foreground font-mono">Gemini-2.5-Flash</p>
                    </div>
                  </div>
                  {!apiKey.trim() && (
                    <span className="px-2 py-0.5 text-[9px] font-mono border border-border rounded text-muted-foreground uppercase">
                      OFFLINE MODE
                    </span>
                  )}
                </div>

                {/* Detected Build Action Banner */}
                {(() => {
                  const chatBuild = getChatRecommendedBuild();
                  if (!chatBuild) return null;
                  const matchedCount = Object.keys(chatBuild).length;
                  return (
                    <div className="px-6 py-3 bg-muted/40 border-b border-border flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-foreground font-light">
                          AI recommended build detected in chat! (<strong>{matchedCount} parts matched</strong>)
                        </span>
                      </div>
                      <button
                        onClick={() => handleLoadIntoBuilder(chatBuild)}
                        className="px-3.5 py-1.5 rounded border border-foreground bg-foreground text-background text-[10px] font-mono tracking-wider uppercase transition-all hover:bg-foreground/90 cursor-pointer"
                      >
                        Build This PC Now
                      </button>
                    </div>
                  );
                })()}

                {/* Messages Board */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((msg, idx) => {
                    const isModel = msg.role === "model";
                    return (
                      <div
                        key={idx}
                        className={`flex gap-3 max-w-[85%] ${
                          isModel ? "mr-auto" : "ml-auto flex-row-reverse"
                        }`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 bg-card ${
                          isModel 
                            ? "border-border text-muted-foreground" 
                            : "border-border text-foreground"
                        }`}>
                          {isModel ? <Sparkles className="w-3.5 h-3.5" /> : <Cpu className="w-3.5 h-3.5" />}
                        </div>

                        {/* Bubble */}
                        <div className={`p-4 rounded text-xs sm:text-sm leading-relaxed border ${
                          isModel 
                            ? "bg-card border-border text-foreground" 
                            : "bg-muted/40 border-border text-foreground"
                        }`}>
                          <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                        </div>
                      </div>
                    );
                  })}

                  {chatLoading && (
                    <div className="flex gap-3 max-w-[85%] mr-auto">
                      <div className="w-8 h-8 rounded border border-border bg-card flex items-center justify-center text-muted-foreground">
                        <Loader className="w-3.5 h-3.5 animate-spin" />
                      </div>
                      <div className="p-4 rounded bg-card border border-border text-muted-foreground flex items-center gap-2">
                        <span className="text-xs italic font-light">Architect is compiling components...</span>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input Tray */}
                <form 
                  onSubmit={handleSendChatMessage}
                  className="p-4 bg-card border-t border-border flex gap-3"
                >
                  <input
                    type="text"
                    placeholder="Describe your ideal PC specifications (budget, games, workloads)..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={chatLoading}
                    className="flex-1 px-4 py-3 rounded border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:border-foreground/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading || !chatInput.trim()}
                    className="px-5 py-3 rounded border border-foreground bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-xs font-mono tracking-wider uppercase hidden sm:inline">Send</span>
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
