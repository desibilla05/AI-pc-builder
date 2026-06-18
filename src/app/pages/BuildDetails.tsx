import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useRegionStore, formatPrice } from "../../store/regionStore";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
  CircuitBoard,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Share2,
  Edit,
  Star,
  DollarSign,
  Activity,
  Gamepad2,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

export function BuildDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const { region, exchangeRate } = useRegionStore();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buildData = {
    id: id || "1",
    name: "Quantum Blackwell Forge",
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    totalPrice: 4472,
    totalWattage: 844,
    compatibilityScore: 100,
    performanceScore: 99,
    components: {
      cpu: {
        name: "AMD Ryzen 9 9950X",
        price: 599,
        specs: "16 Cores, 32 Threads, 5.7GHz Boost, AM5 Socket",
        wattage: 170,
        brand: "AMD",
      },
      gpu: {
        name: "NVIDIA RTX 5090",
        price: 1999,
        specs: "32GB GDDR7, Blackwell Architecture, PCIe 5.0",
        wattage: 575,
        brand: "NVIDIA",
      },
      motherboard: {
        name: "ASUS ROG Crosshair X870E Hero",
        price: 699,
        specs: "X870E Chipset, AM5 Socket, PCIe 5.0, Wi-Fi 7",
        wattage: 80,
        brand: "ASUS",
      },
      ram: {
        name: "Corsair Dominator Titanium 64GB",
        price: 399,
        specs: "2x32GB DDR5-7200, CL34, Custom XMP Profile",
        wattage: 12,
        brand: "Corsair",
      },
      storage: {
        name: "Samsung 990 Evo Plus 4TB",
        price: 299,
        specs: "M.2 PCIe Gen 5 NVMe, Sequential: 10000MB/s read",
        wattage: 8,
        brand: "Samsung",
      },
      psu: {
        name: "Corsair RM1000x 2024",
        price: 189,
        specs: "1000W, 80+ Gold, ATX 3.1, Fully Modular",
        wattage: 0,
        brand: "Corsair",
      },
      case: {
        name: "Lian Li O11 Dynamic EVO 2",
        price: 189,
        specs: "Dual-Chamber Mid Tower, Panoramic Glass Front/Side",
        wattage: 0,
        brand: "Lian Li",
      },
      cooler: {
        name: "Arctic Liquid Freezer III 360",
        price: 99,
        specs: "360mm AIO Liquid Cooler, ARGB, VRM Cooling Fan",
        wattage: 15,
        brand: "Arctic",
      },
    },
  };

  const componentIcons: Record<string, any> = {
    cpu: Cpu,
    gpu: Layers,
    motherboard: CircuitBoard,
    ram: MemoryStick,
    storage: HardDrive,
    psu: Zap,
    case: Box,
    cooler: Fan,
  };

  const compatibilityChecks = [
    {
      category: "Socket Compatibility",
      status: "compatible",
      message: "Ryzen 9 9950X (AM5 Socket) is fully supported by X870E motherboard out-of-the-box.",
    },
    {
      category: "PCIe Gen 5 Signal",
      status: "optimal",
      message: "RTX 5090 Blackwell GPU communicates on full PCIe 5.0 x16 lanes.",
    },
    {
      category: "RAM Speeds",
      status: "optimal",
      message: "Corsair DDR5-7200 is verified on QVL list for ASUS ROG X870E Hero at rated EXPO speeds.",
    },
    {
      category: "Power Headroom",
      status: "compatible",
      message: "Corsair 1000W ATX 3.1 PSU accommodates RTX 5090 transients. Remaining headroom: 156W (15%).",
    },
    {
      category: "Thermal Clearance",
      status: "compatible",
      message: "360mm Arctic AIO fits the top bracket of Lian Li O11 Evo 2 without colliding with tall RAM heatspreaders.",
    },
  ];

  const performanceMetrics = [
    { metric: "4K Gaming", score: 99 },
    { metric: "3D Rendering", score: 98 },
    { metric: "Multitasking", score: 99 },
    { metric: "Thermal Efficiency", score: 85 },
    { metric: "Upgrade Room", score: 90 },
  ];

  const gamingBenchmarks = [
    { game: "GTA VI (Estimate)", fps1080: 240, fps1440: 195, fps4k: 125, settings: "Ultra Settings" },
    { game: "Cyberpunk 2077 (RT Overdrive)", fps1080: 180, fps1440: 145, fps4k: 92, settings: "Path Tracing, DLSS Quality" },
    { game: "Elden Ring (Shadow of the Erdtree)", fps1080: 240, fps1440: 220, fps4k: 165, settings: "Max Settings, RT High" },
    { game: "Helldivers 2", fps1080: 320, fps1440: 260, fps4k: 180, settings: "Ultra Quality" },
  ];

  const upgradeSuggestions = [
    {
      component: "Storage Add-On",
      suggestion: "Samsung 990 Evo Plus 4TB",
      benefit: "Add secondary NVMe for massive game library speed",
      cost: 299,
    },
    {
      component: "Power Supply",
      suggestion: "Seasonic Prime TX-1600",
      benefit: "Provides 1600W Titanium tier for liquid nitrogen overclocking",
      cost: 499,
    },
    {
      component: "Custom Accessories",
      suggestion: "Corsair Premium PSU Cable Kit",
      benefit: "Individually sleeved cables for clean aesthetic routing",
      cost: 79,
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative overflow-hidden">
      
      {/* Background massive typography */}
      <div className="absolute inset-0 top-16 flex items-center justify-center pointer-events-none opacity-5">
        <span className="giant-text uppercase select-none">BLACKWELL</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation Breadcrumb & Page Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <span>/</span>
              <span className="text-white">Build Details</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              {buildData.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Rig ID: <span className="font-mono text-primary font-bold">{buildData.id}</span> • Compiled on {new Date(buildData.createdAt).toLocaleDateString()} • Updated {new Date(buildData.updatedAt).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="px-5 py-2.5 rounded-xl border border-border bg-slate-950/40 text-xs font-black uppercase tracking-wider text-muted-foreground hover:text-white transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-primary" />
              {copied ? "Copied Link!" : "Share Build"}
            </button>
            <Link
              to="/builder"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-xs font-black uppercase tracking-wider hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Rig
            </Link>
          </div>
        </div>

        {/* Dynamic Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl glass hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">EST. PRICE</div>
                <div className="text-sm sm:text-base font-black text-gradient-blue mt-2 leading-relaxed">{formatPrice(buildData.totalPrice, region, exchangeRate)}</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass hover:border-warning/20 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">POWER LOAD</div>
                <div className="text-2xl sm:text-3xl font-black text-warning mt-1">{buildData.totalWattage}W</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-warning" />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass hover:border-success/20 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">COMPATIBILITY</div>
                <div className="text-2xl sm:text-3xl font-black text-success mt-1">{buildData.compatibilityScore}%</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass hover:border-accent/20 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">PERF SCORE</div>
                <div className="text-2xl sm:text-3xl font-black text-accent mt-1">{buildData.performanceScore}/100</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Primary Page Layout Split */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Hardware List & Compatibility */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Component list */}
            <div className="p-6 rounded-2xl glass hover:border-primary/10 transition-all">
              <h2 className="text-lg font-black text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                <CircuitBoard className="w-5 h-5 text-primary" /> SYSTEM SPEC BREAKDOWN
              </h2>
              
              <div className="space-y-3.5">
                {Object.entries(buildData.components).map(([key, component]) => {
                  const IconComponent = componentIcons[key] || Cpu;
                  return (
                    <div
                      key={key}
                      className="p-4 rounded-xl bg-slate-950/40 border border-border hover:border-primary/45 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-lg bg-slate-900 flex items-center justify-center border border-border group-hover:border-primary/20 transition-all">
                            <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{key}</span>
                              <span className="px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[8px] font-black text-primary uppercase">{component.brand}</span>
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-white mt-1 uppercase tracking-tight">{component.name}</h3>
                            <p className="text-[10px] sm:text-xs text-muted-foreground font-mono mt-0.5">{component.specs}</p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0 border-t border-dashed border-border sm:border-0 pt-2 sm:pt-0 pl-2 shrink-0">
                          <span className="text-xs sm:text-sm font-black text-primary">{formatPrice(component.price, region, exchangeRate)}</span>
                          {component.wattage > 0 && (
                            <span className="flex items-center gap-1 text-[9px] text-muted-foreground/60 font-mono uppercase tracking-wider mt-0.5">
                              <Zap className="w-3 h-3 text-warning/70" /> {component.wattage}W TDP
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compatibility Detailed Report */}
            <div className="p-6 rounded-2xl glass hover:border-primary/10 transition-all">
              <h2 className="text-lg font-black text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> DETAILED COMPATIBILITY CHECKS
              </h2>
              <div className="grid gap-3">
                {compatibilityChecks.map((check, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex gap-3.5 items-start ${
                      check.status === "compatible"
                        ? "bg-success/5 border-success/20"
                        : "bg-primary/5 border-primary/20"
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckCircle2 className={`w-4 h-4 ${check.status === "compatible" ? "text-success" : "text-primary"}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">{check.category}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{check.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gaming Performance Frame Rates */}
            <div className="p-6 rounded-2xl glass hover:border-primary/10 transition-all">
              <h2 className="text-lg font-black text-white tracking-widest uppercase mb-6 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" /> REAL-TIME FPS ESTIMATIONS
              </h2>
              
              <div className="grid gap-4">
                {gamingBenchmarks.map((game, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/40 border border-border hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">{game.game}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{game.settings}</p>
                      </div>
                      <span className="px-2.5 py-1 text-[9px] font-black tracking-widest bg-slate-900 border border-border text-muted-foreground rounded-full uppercase">
                        STABLE ESTIMATES
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-border/80 text-center relative overflow-hidden group">
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">1080P Ultra</div>
                        <div className="text-xl sm:text-2xl font-black text-primary tracking-tight">{game.fps1080}</div>
                        <div className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">FPS</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-border/80 text-center relative overflow-hidden group">
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">1440P Ultra</div>
                        <div className="text-xl sm:text-2xl font-black text-accent tracking-tight">{game.fps1440}</div>
                        <div className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">FPS</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-border/80 text-center relative overflow-hidden group">
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">4K Native</div>
                        <div className="text-xl sm:text-2xl font-black text-success tracking-tight">{game.fps4k}</div>
                        <div className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">FPS</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Performance Charts & Upgrade Suggestions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Radar Score Graphic */}
            <div className="p-6 rounded-2xl glass hover:border-primary/10 transition-all text-center">
              <h3 className="text-sm font-black text-white tracking-widest uppercase mb-6 text-left flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> RIG PERFORMANCE RATIO
              </h3>
              
              <div className="h-[260px] flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid stroke="rgba(148, 163, 184, 0.08)" />
                    <PolarAngleAxis dataKey="metric" stroke="#94A3B8" fontSize={9} tickLine={false} />
                    <PolarRadiusAxis stroke="rgba(148, 163, 184, 0.15)" angle={30} domain={[0, 100]} fontSize={8} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.15}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="section-divider my-6" />

              <div className="space-y-3">
                {performanceMetrics.map((m, idx) => (
                  <div key={idx} className="text-left">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground mb-1.5 tracking-wider">
                      <span>{m.metric}</span>
                      <span className="text-white font-mono">{m.score}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                        style={{ width: `${m.score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade Path Suggestions */}
            <div className="p-6 rounded-2xl glass hover:border-primary/10 transition-all">
              <h3 className="text-sm font-black text-white tracking-widest uppercase mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> RECOMMENDED UPGRADES
              </h3>
              
              <div className="space-y-3">
                {upgradeSuggestions.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/40 border border-border hover:border-primary/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{item.component}</span>
                        <span className="text-xs font-black text-primary text-right pl-2 shrink-0">{formatPrice(item.cost, region, exchangeRate)}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase mt-1 tracking-tight">{item.suggestion}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Callout banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-transparent border border-primary/20 hover:border-primary/30 transition-all">
              <Sparkles className="w-7 h-7 text-accent animate-pulse mb-3" />
              <h3 className="text-sm font-black text-white tracking-widest uppercase">HARDWARE COMPARISON</h3>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed mb-4">
                Compare the performance benchmarks and thermal metrics of the Blackwell architecture directly side-by-side with previous-gen graphics chips.
              </p>
              <Link
                to="/comparison"
                className="block w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-900 border border-border text-center text-xs font-black uppercase tracking-wider text-white transition-all"
              >
                Launch Bench Comparison
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
