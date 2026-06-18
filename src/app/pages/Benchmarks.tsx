import { useState } from "react";
import { Trophy, TrendingUp, Gamepad2, Briefcase, Monitor, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

export function Benchmarks() {
  const [category, setCategory] = useState<"gaming" | "productivity">("gaming");
  const [resolution, setResolution] = useState<"1080p" | "1440p" | "4k">("1440p");

  const gpuRankings = [
    { rank: 1, name: "RTX 5090", score: 100, fps1080: 340, fps1440: 280, fps4k: 195 },
    { rank: 2, name: "RTX 4090", score: 82, fps1080: 260, fps1440: 200, fps4k: 135 },
    { rank: 3, name: "RTX 5080", score: 78, fps1080: 280, fps1440: 220, fps4k: 148 },
    { rank: 4, name: "RX 9070 XT", score: 68, fps1080: 230, fps1440: 175, fps4k: 115 },
    { rank: 5, name: "RTX 5070 Ti", score: 66, fps1080: 245, fps1440: 190, fps4k: 125 },
    { rank: 6, name: "RTX 4080 Super", score: 65, fps1080: 215, fps1440: 165, fps4k: 108 },
    { rank: 7, name: "RX 7900 XTX", score: 62, fps1080: 200, fps1440: 155, fps4k: 100 },
    { rank: 8, name: "RTX 5070", score: 58, fps1080: 210, fps1440: 160, fps4k: 105 },
    { rank: 9, name: "RX 9070", score: 52, fps1080: 185, fps1440: 140, fps4k: 90 },
    { rank: 10, name: "RTX 4060 Ti", score: 42, fps1080: 145, fps1440: 110, fps4k: 68 },
  ];

  const cpuRankings = [
    { rank: 1, name: "Ryzen 9 9950X", score: 100, singleCore: 890, multiCore: 3200 },
    { rank: 2, name: "Core Ultra 9 285K", score: 97, singleCore: 880, multiCore: 3100 },
    { rank: 3, name: "Ryzen 7 9800X3D", score: 96, singleCore: 870, multiCore: 2400 },
    { rank: 4, name: "Core i9-14900K", score: 93, singleCore: 850, multiCore: 2800 },
    { rank: 5, name: "Core Ultra 7 265K", score: 90, singleCore: 860, multiCore: 2600 },
    { rank: 6, name: "Ryzen 9 9900X", score: 88, singleCore: 865, multiCore: 2700 },
    { rank: 7, name: "Ryzen 7 7800X3D", score: 85, singleCore: 830, multiCore: 2000 },
    { rank: 8, name: "Ryzen 5 9600X", score: 78, singleCore: 845, multiCore: 1800 },
    { rank: 9, name: "Core Ultra 5 245K", score: 75, singleCore: 840, multiCore: 1750 },
    { rank: 10, name: "Ryzen 5 7600", score: 70, singleCore: 795, multiCore: 1400 },
  ];

  const gamingBenchmarks = [
    {
      game: "Cyberpunk 2077",
      "RTX 5090": 210,
      "RTX 5080": 155,
      "RX 9070 XT": 128,
      "RTX 4090": 142,
    },
    {
      game: "GTA VI",
      "RTX 5090": 185,
      "RTX 5080": 138,
      "RX 9070 XT": 112,
      "RTX 4090": 125,
    },
    {
      game: "Elden Ring",
      "RTX 5090": 250,
      "RTX 5080": 195,
      "RX 9070 XT": 160,
      "RTX 4090": 175,
    },
    {
      game: "Helldivers 2",
      "RTX 5090": 220,
      "RTX 5080": 168,
      "RX 9070 XT": 140,
      "RTX 4090": 155,
    },
    {
      game: "Fortnite",
      "RTX 5090": 380,
      "RTX 5080": 290,
      "RX 9070 XT": 240,
      "RTX 4090": 280,
    },
    {
      game: "Starfield",
      "RTX 5090": 195,
      "RTX 5080": 145,
      "RX 9070 XT": 118,
      "RTX 4090": 138,
    },
    {
      game: "COD MW3",
      "RTX 5090": 310,
      "RTX 5080": 240,
      "RX 9070 XT": 195,
      "RTX 4090": 245,
    },
  ];

  const productivityBenchmarks = [
    {
      task: "Blender",
      "Ryzen 9 9950X": 100,
      "Core Ultra 9 285K": 95,
      "Ryzen 7 9800X3D": 72,
      "Core i9-14900K": 88,
    },
    {
      task: "Premiere Pro",
      "Ryzen 9 9950X": 98,
      "Core Ultra 9 285K": 94,
      "Ryzen 7 9800X3D": 78,
      "Core i9-14900K": 90,
    },
    {
      task: "Photoshop",
      "Ryzen 9 9950X": 92,
      "Core Ultra 9 285K": 90,
      "Ryzen 7 9800X3D": 82,
      "Core i9-14900K": 85,
    },
    {
      task: "DaVinci Resolve",
      "Ryzen 9 9950X": 96,
      "Core Ultra 9 285K": 93,
      "Ryzen 7 9800X3D": 70,
      "Core i9-14900K": 86,
    },
    {
      task: "Compilation",
      "Ryzen 9 9950X": 100,
      "Core Ultra 9 285K": 97,
      "Ryzen 7 9800X3D": 68,
      "Core i9-14900K": 92,
    },
  ];

  const fpsData = gpuRankings.map((gpu) => ({
    name: gpu.name.replace(/NVIDIA |AMD /g, ""),
    "1080p": gpu.fps1080,
    "1440p": gpu.fps1440,
    "4K": gpu.fps4k,
  }));

  return (
    <div className="min-h-screen py-8 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-black mb-3">Performance Benchmarks</h1>
          <p className="text-xl text-muted-foreground">
            Real-world performance data for gaming and productivity
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={() => setCategory("gaming")}
            className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-semibold ${
              category === "gaming"
                ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            Gaming
          </button>
          <button
            onClick={() => setCategory("productivity")}
            className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-semibold ${
              category === "productivity"
                ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            <Briefcase className="w-5 h-5" />
            Productivity
          </button>

          {category === "gaming" && (
            <>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                {(["1080p", "1440p", "4k"] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      resolution === res
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {res.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {category === "gaming" && (
              <>
                <div className="p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">GPU Performance Rankings</h2>
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>

                  <div className="space-y-3">
                    {gpuRankings.map((gpu) => {
                      const fps =
                        resolution === "1080p"
                          ? gpu.fps1080
                          : resolution === "1440p"
                          ? gpu.fps1440
                          : gpu.fps4k;

                      return (
                        <div
                          key={gpu.rank}
                          className="p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-all"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                                  gpu.rank === 1
                                    ? "bg-primary text-white"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {gpu.rank}
                              </div>
                              <div>
                                <div className="font-semibold text-lg">{gpu.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Performance Score: {gpu.score}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {fps} FPS
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {resolution.toUpperCase()} Avg
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                              style={{ width: `${gpu.score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="text-2xl font-semibold mb-6">
                    FPS Across Resolutions
                  </h2>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={fpsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                      <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                      <YAxis stroke="#94A3B8" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111827",
                          border: "1px solid rgba(148, 163, 184, 0.12)",
                          borderRadius: "12px",
                          color: "#E8ECF4",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="1080p"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#3B82F6", stroke: "#111827", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="1440p"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#8B5CF6", stroke: "#111827", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="4K"
                        stroke="#22D3EE"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="text-2xl font-semibold mb-6">Game-by-Game FPS</h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={gamingBenchmarks}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="game" stroke="#A1A1AA" />
                      <YAxis stroke="#A1A1AA" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181B",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="RTX 5090" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="RTX 5080" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="RX 9070 XT" fill="#22D3EE" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="RTX 4090" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

            {category === "productivity" && (
              <>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">CPU Performance Rankings</h2>
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>

                  <div className="space-y-3">
                    {cpuRankings.map((cpu) => (
                      <div
                        key={cpu.rank}
                        className="p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                                cpu.rank === 1
                                  ? "bg-primary text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {cpu.rank}
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{cpu.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Single: {cpu.singleCore} | Multi: {cpu.multiCore}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {cpu.score}
                            </div>
                            <div className="text-sm text-muted-foreground">Score</div>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                            style={{ width: `${cpu.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h2 className="text-2xl font-semibold mb-6">
                    Productivity Application Performance
                  </h2>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={productivityBenchmarks} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis type="number" stroke="#A1A1AA" />
                      <YAxis dataKey="task" type="category" stroke="#A1A1AA" width={100} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#18181B",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="Ryzen 9 9950X" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="Core Ultra 9 285K" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="Ryzen 7 9800X3D" fill="#22D3EE" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="Core i9-14900K" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded border border-border bg-card">
              <h2 className="text-xl font-semibold mb-6">Benchmark Info</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold">Test Methodology</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category === "gaming"
                      ? "Gaming benchmarks measured at Ultra settings with RT/DLSS where applicable"
                      : "Productivity tests measured with real-world workloads and standard settings"}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Monitor className="w-5 h-5 text-accent" />
                    <span className="text-sm font-semibold">Test System</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• 32GB DDR5-6000 RAM</div>
                    <div>• PCIe 4.0 NVMe SSD</div>
                    <div>• Windows 11 Pro</div>
                    <div>• Latest drivers</div>
                  </div>
                </div>

                {category === "gaming" && (
                  <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                    <div className="font-semibold mb-2">Performance Tiers</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ultra (4K 60+)</span>
                        <span className="font-semibold text-primary">Top 3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">High (1440p 100+)</span>
                        <span className="font-semibold text-accent">Rank 4-6</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Medium (1080p 60+)</span>
                        <span className="font-semibold text-success">Rank 7+</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <h3 className="text-sm font-mono tracking-wider uppercase mb-4 text-muted-foreground">
                Test Rig Configurations
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase mb-1">NVIDIA Drivers</h4>
                  <div className="text-xs text-muted-foreground font-mono">GeForce Game Ready 551.86 (WHQL)</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase mb-1">AMD Drivers</h4>
                  <div className="text-xs text-muted-foreground font-mono">AMD Software: Adrenalin 24.3.1</div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase mb-1">Intel Microcode</h4>
                  <div className="text-xs text-muted-foreground font-mono">Platform Patch 0x129 (Stability Fix)</div>
                </div>
                <div className="pt-2 border-t border-border/50 text-[11px] text-muted-foreground font-light leading-relaxed">
                  All tests run on reference open-air testbeds in temperature-controlled environments (21°C ambient) to ensure maximum baseline parity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
