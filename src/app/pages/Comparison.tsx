import { useState } from "react";
import { Cpu, TrendingUp, DollarSign, Zap, Search, Plus, X, Monitor } from "lucide-react";
import { useRegionStore, formatPrice } from "../../store/regionStore";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface HardwareItem {
  id: string;
  name: string;
  price: number;
  performance: number;
  powerDraw: number;
  cores?: number;
  boost?: string;
  memory?: string;
  brand?: string;
}

export function Comparison() {
  const [comparisonType, setComparisonType] = useState<"cpu" | "gpu">("gpu");
  const [selectedItems, setSelectedItems] = useState<HardwareItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { region, exchangeRate } = useRegionStore();

  const gpuList: HardwareItem[] = [
    { id: "1", name: "RTX 5090", price: 1999, performance: 100, powerDraw: 575, memory: "32GB GDDR7", brand: "NVIDIA" },
    { id: "2", name: "RTX 5080", price: 999, performance: 78, powerDraw: 360, memory: "16GB GDDR7", brand: "NVIDIA" },
    { id: "3", name: "RTX 5070 Ti", price: 749, performance: 68, powerDraw: 300, memory: "16GB GDDR7", brand: "NVIDIA" },
    { id: "4", name: "RTX 5070", price: 549, performance: 58, powerDraw: 250, memory: "12GB GDDR7", brand: "NVIDIA" },
    { id: "5", name: "RTX 4090", price: 1399, performance: 88, powerDraw: 450, memory: "24GB GDDR6X", brand: "NVIDIA" },
    { id: "6", name: "RTX 4080 Super", price: 979, performance: 72, powerDraw: 320, memory: "16GB GDDR6X", brand: "NVIDIA" },
    { id: "7", name: "RX 9070 XT", price: 549, performance: 62, powerDraw: 300, memory: "16GB GDDR6", brand: "AMD" },
    { id: "8", name: "RX 9070", price: 449, performance: 52, powerDraw: 250, memory: "12GB GDDR6", brand: "AMD" },
    { id: "9", name: "RX 7900 XTX", price: 849, performance: 74, powerDraw: 355, memory: "24GB GDDR6", brand: "AMD" },
    { id: "10", name: "RTX 4060 Ti", price: 369, performance: 42, powerDraw: 165, memory: "16GB GDDR6", brand: "NVIDIA" },
  ];

  const cpuList: HardwareItem[] = [
    { id: "1", name: "Ryzen 9 9950X", price: 599, performance: 98, powerDraw: 170, cores: 16, boost: "5.7GHz", brand: "AMD" },
    { id: "2", name: "Ryzen 9 9900X", price: 449, performance: 90, powerDraw: 120, cores: 12, boost: "5.6GHz", brand: "AMD" },
    { id: "3", name: "Ryzen 7 9800X3D", price: 479, performance: 96, powerDraw: 120, cores: 8, boost: "5.2GHz", brand: "AMD" },
    { id: "4", name: "Core Ultra 9 285K", price: 589, performance: 95, powerDraw: 125, cores: 24, boost: "5.7GHz", brand: "Intel" },
    { id: "5", name: "Core Ultra 7 265K", price: 394, performance: 88, powerDraw: 125, cores: 20, boost: "5.5GHz", brand: "Intel" },
    { id: "6", name: "Ryzen 7 7800X3D", price: 349, performance: 92, powerDraw: 120, cores: 8, boost: "5.0GHz", brand: "AMD" },
    { id: "7", name: "Core i9-14900K", price: 489, performance: 93, powerDraw: 253, cores: 24, boost: "6.0GHz", brand: "Intel" },
    { id: "8", name: "Ryzen 5 9600X", price: 279, performance: 78, powerDraw: 65, cores: 6, boost: "5.4GHz", brand: "AMD" },
    { id: "9", name: "Core Ultra 5 245K", price: 309, performance: 75, powerDraw: 125, cores: 14, boost: "5.2GHz", brand: "Intel" },
    { id: "10", name: "Ryzen 5 7600", price: 199, performance: 70, powerDraw: 65, cores: 6, boost: "5.1GHz", brand: "AMD" },
  ];

  const availableItems = comparisonType === "gpu" ? gpuList : cpuList;

  const filteredItems = availableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedItems.find((selected) => selected.id === item.id)
  );

  const addToComparison = (item: HardwareItem) => {
    if (selectedItems.length < 4) {
      setSelectedItems([...selectedItems, item]);
      setSearchQuery("");
    }
  };

  const removeFromComparison = (id: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  const performanceData = selectedItems.map((item) => ({
    name: item.name,
    performance: item.performance,
    efficiency: Math.round((item.performance / item.powerDraw) * 100),
    value: Math.round((item.performance / item.price) * 1000),
  }));

  const radarData = [
    {
      metric: "Performance",
      ...Object.fromEntries(
        selectedItems.map((item, idx) => [`item${idx}`, item.performance])
      ),
    },
    {
      metric: "Efficiency",
      ...Object.fromEntries(
        selectedItems.map((item, idx) => [
          `item${idx}`,
          Math.round((item.performance / item.powerDraw) * 100),
        ])
      ),
    },
    {
      metric: "Value",
      ...Object.fromEntries(
        selectedItems.map((item, idx) => [
          `item${idx}`,
          Math.min(Math.round((item.performance / item.price) * 1000), 100),
        ])
      ),
    },
    {
      metric: "Power",
      ...Object.fromEntries(
        selectedItems.map((item, idx) => [
          `item${idx}`,
          Math.max(100 - Math.round((item.powerDraw / 575) * 100), 0),
        ])
      ),
    },
  ];

  const colors = [
    "var(--fg)",
    "var(--fg-2)",
    "var(--fg-muted)",
    "var(--border-strong)",
  ];

  return (
    <div className="min-h-screen py-12 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-3">
            The Architecture of Power.
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Compare performance profiles, design specifications, and thermals side by side.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-lg bg-card border border-border">
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => {
                    setComparisonType("gpu");
                    setSelectedItems([]);
                  }}
                  className={`px-5 py-2.5 rounded border text-xs font-mono tracking-wider uppercase transition-all ${
                    comparisonType === "gpu"
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Compare GPUs
                  </div>
                </button>
                <button
                  onClick={() => {
                    setComparisonType("cpu");
                    setSelectedItems([]);
                  }}
                  className={`px-5 py-2.5 rounded border text-xs font-mono tracking-wider uppercase transition-all ${
                    comparisonType === "cpu"
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Compare CPUs
                  </div>
                </button>
              </div>

              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={`Search ${comparisonType.toUpperCase()}s to compare...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded bg-input border border-border text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {searchQuery && (
                  <div className="mt-2 p-1 rounded bg-card border border-border max-h-60 overflow-y-auto">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addToComparison(item)}
                          className="w-full p-3 rounded hover:bg-muted transition-colors flex items-center justify-between text-left"
                        >
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatPrice(item.price, region, exchangeRate)} • {item.powerDraw}W
                              {item.brand && <span className="ml-2">({item.brand})</span>}
                            </div>
                          </div>
                          <Plus className="w-4 h-4 text-muted-foreground" />
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-muted-foreground">
                        No items found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedItems.length === 0 && (
                <div className="p-16 text-center border border-dashed border-border rounded">
                  <div className="w-12 h-12 rounded border border-border flex items-center justify-center mx-auto mb-4">
                    {comparisonType === "gpu" ? (
                      <Monitor className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Cpu className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-normal mb-2">Start Comparison</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto font-light">
                    Select up to 4 components from the search filter to display technical integrity overlays.
                  </p>
                </div>
              )}

              {selectedItems.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {selectedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded border border-border transition-all relative bg-card"
                      >
                        <button
                          onClick={() => removeFromComparison(item.id)}
                          className="absolute top-3 right-3 p-1 rounded border border-transparent hover:border-border text-muted-foreground hover:text-foreground transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="font-semibold text-sm">{item.name}</span>
                          {item.brand && (
                            <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 border border-border rounded text-muted-foreground">
                              {item.brand}
                            </span>
                          )}
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Investment</span>
                            <span className="font-medium text-foreground">{formatPrice(item.price, region, exchangeRate)}</span>
                          </div>
                          <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Performance Index</span>
                            <span className="font-medium">{item.performance}%</span>
                          </div>
                          <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                            <span className="text-muted-foreground">Power Limit</span>
                            <span className="font-medium">{item.powerDraw}W</span>
                          </div>
                          {item.memory && (
                            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                              <span className="text-muted-foreground">VRAM / Standard</span>
                              <span className="font-medium">{item.memory}</span>
                            </div>
                          )}
                          {item.cores && (
                            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                              <span className="text-muted-foreground">Cores</span>
                              <span className="font-medium">{item.cores}</span>
                            </div>
                          )}
                          {item.boost && (
                            <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                              <span className="text-muted-foreground">Frequency Clock</span>
                              <span className="font-medium">{item.boost}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromComparison(item.id)}
                          className="mt-5 w-full py-2 border border-border hover:border-foreground rounded text-[10px] font-mono tracking-wider transition-all uppercase text-center text-muted-foreground hover:text-foreground"
                        >
                          Swap Component
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded border border-border mb-8 bg-card">
                    <h3 className="text-sm font-mono tracking-wider uppercase mb-6 text-muted-foreground">Performance Overlays</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="name" stroke="var(--fg-muted)" fontSize={10} tickLine={false} />
                        <YAxis stroke="var(--fg-muted)" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--bg-card)",
                            border: "1px solid var(--border-strong)",
                            borderRadius: "4px",
                            color: "var(--fg)",
                            fontSize: "11px"
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Bar dataKey="performance" fill="var(--fg)" name="Performance Index" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="efficiency" fill="var(--fg-2)" name="Thermal Efficiency" radius={[2, 2, 0, 0]} />
                        <Bar dataKey="value" fill="var(--fg-muted)" name="Value Index" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-6 rounded border border-border bg-card">
                    <h3 className="text-sm font-mono tracking-wider uppercase mb-6 text-muted-foreground">System Vectors</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="metric" stroke="var(--fg-muted)" fontSize={10} />
                        <PolarRadiusAxis stroke="var(--border)" fontSize={9} />
                        {selectedItems.map((item, idx) => (
                          <Radar
                            key={item.id}
                            name={item.name}
                            dataKey={`item${idx}`}
                            stroke={colors[idx]}
                            fill={colors[idx]}
                            fillOpacity={0.15}
                          />
                        ))}
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-xs font-mono tracking-wider uppercase text-muted-foreground mb-6">Quick Diagnostics</h2>

              {selectedItems.length === 0 ? (
                <div className="text-center text-xs text-muted-foreground py-8">
                  Awaiting component selections...
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Top Performance</span>
                    </div>
                    <div className="text-sm font-semibold">
                      {
                        selectedItems.reduce((prev, current) =>
                          prev.performance > current.performance ? prev : current
                        ).name
                      }
                    </div>
                  </div>

                  <div className="p-4 rounded border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Economic Efficiency</span>
                    </div>
                    <div className="text-sm font-semibold">
                      {
                        selectedItems.reduce((prev, current) =>
                          prev.performance / prev.price > current.performance / current.price
                            ? prev
                            : current
                        ).name
                      }
                    </div>
                  </div>

                  <div className="p-4 rounded border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Thermal Yield</span>
                    </div>
                    <div className="text-sm font-semibold">
                      {
                        selectedItems.reduce((prev, current) =>
                          prev.performance / prev.powerDraw >
                          current.performance / current.powerDraw
                            ? prev
                            : current
                        ).name
                      }
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-2">Price Bounds</div>
                    <div className="text-xs text-muted-foreground space-y-1 font-mono">
                      <div>MIN: {formatPrice(Math.min(...selectedItems.map((i) => i.price)), region, exchangeRate)}</div>
                      <div>MAX: {formatPrice(Math.max(...selectedItems.map((i) => i.price)), region, exchangeRate)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <h3 className="text-sm font-mono tracking-wider uppercase mb-4 text-muted-foreground">
                Metric Glossary
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-foreground mb-1">Performance Index</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                    Scaled index indicating multi-core compute throughput and raw graphics pipeline fillrates relative to baseline models.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-foreground mb-1">Thermal Yield</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                    Calculated efficiency coefficient comparing output performance scores to thermal wattage footprint (TDP). Higher yields indicate superior performance-per-watt efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-foreground mb-1">Value Score</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                    Direct correlation index mapping benchmark scores to component retail pricing. Highlights high value-for-money hardware nodes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
