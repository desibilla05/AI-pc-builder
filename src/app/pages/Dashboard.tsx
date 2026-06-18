import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRegionStore, formatPrice } from "../../store/regionStore";
import { useAuthStore } from "../../store/authStore";
import {
  Cpu,
  Heart,
  Clock,
  TrendingUp,
  Zap,
  Edit,
  Trash2,
  Share2,
  Star,
  Activity,
  Award,
  Lock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function Dashboard() {
  const { region, exchangeRate } = useRegionStore();
  const { user, savedBuilds, deleteBuild, checkAuth, openAuthModal } = useAuthStore();
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | null } | null>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen py-12 bg-grid-pattern relative flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="p-8 rounded border border-border bg-card text-center shadow-2xl relative overflow-hidden">
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-foreground" />
            
            <div className="w-16 h-16 rounded-full border border-border bg-muted flex items-center justify-center mx-auto mb-6">
              <Lock className="w-6 h-6 text-foreground animate-pulse" />
            </div>
            
            <h1 className="text-xl font-mono uppercase tracking-widest text-foreground mb-3">
              Telemetry Encrypted
            </h1>
            <p className="text-sm text-muted-foreground font-light mb-8 leading-relaxed">
              Access to the system control panel is restricted. Please authenticate to view and manage your saved PC architectures.
            </p>
            
            <button
              onClick={() => openAuthModal(false)}
              className="w-full py-3 rounded border border-border text-xs font-mono tracking-wider uppercase transition-all hover:bg-foreground hover:text-background hover:border-foreground cursor-pointer bg-card font-bold"
            >
              Authenticate Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  const favoriteComponents = [
    {
      id: "1",
      name: "AMD Ryzen 9 7950X",
      category: "CPU",
      price: 549,
      rating: 4.9,
    },
    {
      id: "2",
      name: "NVIDIA RTX 4090",
      category: "GPU",
      price: 1599,
      rating: 4.8,
    },
    {
      id: "3",
      name: "G.Skill Trident Z5 RGB 32GB",
      category: "RAM",
      price: 159,
      rating: 4.7,
    },
    {
      id: "4",
      name: "Samsung 990 Pro 2TB",
      category: "Storage",
      price: 199,
      rating: 4.9,
    },
  ];

  const recentActivity = savedBuilds.slice(0, 4).map((b, i) => ({
    id: b.id,
    type: "build",
    action: "Architecture Saved",
    target: b.name,
    timestamp: new Date(b.date).toLocaleDateString(),
  }));

  // Fallback for activity log if no builds are saved
  const activeLogs = recentActivity.length > 0 ? recentActivity : [
    {
      id: "activity-empty",
      type: "compare",
      action: "System diagnostics clear",
      target: "No architectures saved",
      timestamp: "Just now",
    }
  ];

  const priceHistory = [...savedBuilds]
    .reverse()
    .map((build) => ({
      date: new Date(build.date).toLocaleDateString(undefined, { month: "short", day: "2-digit" }),
      total: build.totalPrice,
    }));

  const totalValue = savedBuilds.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
  const avgCost = savedBuilds.length > 0 ? Math.round(totalValue / savedBuilds.length) : 0;

  const stats = [
    {
      label: "Total Builds",
      value: savedBuilds.length.toString(),
      change: savedBuilds.length > 0 ? "Stored in cloud" : "No builds saved yet",
      icon: Cpu,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Avg Build Cost",
      value: avgCost,
      change: savedBuilds.length > 0 ? "Across all builds" : "N/A",
      icon: TrendingUp,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Favorites",
      value: "4",
      change: "Static monitored items",
      icon: Heart,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Total Value",
      value: totalValue,
      change: "Across all saved builds",
      icon: Award,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
  ];

  return (
    <div className="min-h-screen py-12 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-border pb-8">
          <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-3">
            System Integrity & Creative Output
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            Monitor environment performance vectors, stored architectures, and telemetry feeds for {user.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded border border-border bg-card transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded border border-border ${stat.bgColor} flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold">
                  {typeof stat.value === "number" ? formatPrice(stat.value, region, exchangeRate) : stat.value}
                </div>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground font-light">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded border border-border bg-card">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-mono tracking-wider uppercase text-muted-foreground">Saved Architectures</h2>
                <Link
                  to="/builder"
                  className="px-4 py-2 rounded border border-border text-xs font-mono tracking-wider uppercase transition-all hover:bg-foreground hover:text-background hover:border-foreground flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  New Build
                </Link>
              </div>

              <div className="space-y-4">
                {savedBuilds.length > 0 ? (
                  savedBuilds.map((build) => {
                    const compCount = build.components
                      ? (typeof build.components === "number"
                          ? build.components
                          : Object.values(build.components).filter(Boolean).length)
                      : 0;
                    const compatibility = (build as any).compatibility || 95;
                    const performance = (build as any).performance || "Custom Configuration";

                    return (
                      <div
                        key={build.id}
                        className="p-5 rounded border border-border hover:border-foreground/40 transition-all bg-card/50"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <Link
                              to={`/build/${build.id}`}
                              className="text-base font-semibold hover:text-muted-foreground transition-colors inline-block"
                            >
                              {build.name}
                            </Link>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2 font-light">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(build.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Cpu className="w-3.5 h-3.5" />
                                {compCount} components
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-foreground mb-1">
                              {formatPrice(build.totalPrice, region, exchangeRate)}
                            </div>
                            <div className="text-xs text-muted-foreground font-light">
                              {performance}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="text-xs text-muted-foreground">
                              Integrity Index
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-1 border border-border bg-muted overflow-hidden">
                                <div
                                  className="h-full bg-foreground"
                                  style={{ width: `${compatibility}%` }}
                                />
                              </div>
                              <span className="text-xs font-mono text-muted-foreground">
                                {compatibility}%
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                const url = `${window.location.origin}/build/${build.id}`;
                                navigator.clipboard.writeText(url).then(() => {
                                  showToast("Build link copied to clipboard!");
                                }).catch(() => {
                                  showToast("Failed to copy link.", "info");
                                });
                              }}
                              className="p-2 rounded hover:bg-muted transition-colors cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                            </button>
                            <Link
                              to={`/build/${build.id}`}
                              className="p-2 rounded hover:bg-muted transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                            </Link>
                            <button
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this build?")) {
                                  deleteBuild(build.id);
                                  showToast("Build configuration deleted.");
                                }
                              }}
                              className="p-2 rounded hover:bg-destructive/10 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 rounded border border-dashed border-border bg-card/25 text-center flex flex-col items-center justify-center">
                    <Cpu className="w-8 h-8 text-muted-foreground opacity-50 mb-4 animate-bounce" />
                    <p className="text-sm text-muted-foreground font-light mb-6">
                      No active architectures detected in your cloud database.
                    </p>
                    <Link
                      to="/builder"
                      className="px-6 py-2 rounded border border-border text-xs font-mono tracking-wider uppercase transition-all hover:bg-foreground hover:text-background hover:border-foreground flex items-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Configure Architecture
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <h2 className="text-sm font-mono tracking-wider uppercase text-muted-foreground mb-6">Investment Progression</h2>
              {priceHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="date" stroke="var(--fg-muted)" fontSize={10} tickLine={false} />
                    <YAxis stroke="var(--fg-muted)" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-strong)",
                        borderRadius: "4px",
                        color: "var(--fg)",
                        fontSize: "11px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--fg)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "var(--fg)", stroke: "var(--bg)", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "var(--fg)", stroke: "var(--bg)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center border border-dashed border-border bg-card/10 rounded text-xs text-muted-foreground font-mono">
                  Insufficient telemetry data to plot investment progression
                </div>
              )}
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-4 h-4 text-foreground" />
                <h2 className="text-sm font-mono tracking-wider uppercase text-muted-foreground">Monitored Items</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {favoriteComponents.map((component) => (
                  <div
                    key={component.id}
                    className="p-4 rounded border border-border bg-card/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-[10px] font-mono tracking-wider text-muted-foreground mb-1 uppercase">
                          {component.category}
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {component.name}
                        </div>
                      </div>
                      <button className="p-1 rounded hover:bg-muted transition-colors">
                        <Heart className="w-4 h-4 text-foreground fill-foreground" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-foreground fill-foreground" />
                        <span className="text-xs font-semibold">
                          {component.rating}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-foreground text-right">
                        {formatPrice(component.price, region, exchangeRate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded border border-border bg-card">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-foreground" />
                <h2 className="text-xs font-mono tracking-wider uppercase text-muted-foreground">Diagnostics Log</h2>
              </div>

              <div className="space-y-4">
                {activeLogs.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded border border-border flex items-center justify-center flex-shrink-0 bg-muted/40">
                      {activity.type === "build" && (
                        <Cpu className="w-4 h-4 text-muted-foreground" />
                      )}
                      {activity.type === "favorite" && (
                        <Heart className="w-4 h-4 text-muted-foreground" />
                      )}
                      {activity.type === "compare" && (
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">
                        {activity.action}
                      </div>
                      <div className="text-xs text-muted-foreground truncate font-light mt-0.5">
                        {activity.target}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-light mt-1">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 border border-border hover:border-foreground rounded text-[10px] font-mono tracking-wider transition-all uppercase text-center text-muted-foreground hover:text-foreground">
                Edit Environment
              </button>
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <Zap className="w-5 h-5 text-foreground mb-4" />
              <h3 className="text-sm font-mono tracking-wider uppercase mb-2 text-muted-foreground">
                AI Diagnostics
              </h3>
              <p className="text-xs text-muted-foreground mb-6 font-light leading-relaxed">
                Request machine learning synthesis to recommend premium architectural component hardware matches.
              </p>
              <Link
                to="/ai-recommend"
                className="block w-full py-3 bg-foreground text-background text-center text-xs font-mono tracking-wider uppercase rounded hover:bg-foreground/90 transition-all"
              >
                Synthesize Build
              </Link>
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-4 h-4 text-foreground" />
                <h3 className="text-sm font-mono tracking-wider uppercase text-muted-foreground">
                  System Telemetry Guidelines
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4 font-light leading-relaxed">
                Telemetry standards for system optimization and compatibility thresholds.
              </p>
              <div className="space-y-3">
                <div className="p-3 rounded border border-border/50 bg-card/40">
                  <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Memory Pipeline</div>
                  <div className="text-xs font-medium text-foreground">Bandwidth: 48 GB/s (Dual Channel)</div>
                </div>
                <div className="p-3 rounded border border-border/50 bg-card/40">
                  <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Thermal Overhead</div>
                  <div className="text-xs font-medium text-foreground">Target Temp: &lt;80°C under load</div>
                </div>
                <div className="p-3 rounded border border-border/50 bg-card/40">
                  <div className="text-[10px] font-mono uppercase text-muted-foreground mb-1">Power Buffer</div>
                  <div className="text-xs font-medium text-foreground">Recommended PSU margin: +150W</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "32px", right: "32px", zIndex: 99999,
          background: "#0A0A0A",
          color: "#FAF9F6",
          padding: "14px 20px", borderRadius: "4px",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", gap: "12px",
          fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.02em",
        }}>
          {toast.message}
          <button onClick={() => setToast(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#FAF9F6", opacity: 0.6, fontSize: "11px", fontWeight: "bold" }}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
