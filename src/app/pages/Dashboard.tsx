import { Link } from "react-router-dom";
import { useRegionStore, formatPrice } from "../../store/regionStore";
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
  const savedBuilds = [
    {
      id: "1",
      name: "Gaming Beast 2026",
      totalPrice: 2499,
      createdAt: "2026-06-01",
      performance: "4K Ultra",
      components: 8,
      compatibility: 98,
    },
    {
      id: "2",
      name: "Budget Gaming Rig",
      totalPrice: 899,
      createdAt: "2026-05-28",
      performance: "1440p High",
      components: 8,
      compatibility: 95,
    },
    {
      id: "3",
      name: "Workstation Pro",
      totalPrice: 1799,
      createdAt: "2026-05-25",
      performance: "Productivity",
      components: 7,
      compatibility: 92,
    },
  ];

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

  const recentActivity = [
    {
      id: "1",
      type: "build",
      action: "Created new build",
      target: "Gaming Beast 2026",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "favorite",
      action: "Added to favorites",
      target: "AMD Ryzen 9 7950X",
      timestamp: "5 hours ago",
    },
    {
      id: "3",
      type: "compare",
      action: "Compared components",
      target: "RTX 4090 vs RTX 4080",
      timestamp: "1 day ago",
    },
    {
      id: "4",
      type: "build",
      action: "Updated build",
      target: "Budget Gaming Rig",
      timestamp: "2 days ago",
    },
  ];

  const priceHistory = [
    { date: "May 25", total: 1799 },
    { date: "May 28", total: 2698 },
    { date: "Jun 01", total: 5197 },
    { date: "Jun 03", total: 5197 },
    { date: "Jun 05", total: 5197 },
  ];

  const stats = [
    {
      label: "Total Builds",
      value: "3",
      change: "+1 this week",
      icon: Cpu,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Avg Build Cost",
      value: 1732,
      change: "+12% vs last month",
      icon: TrendingUp,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Favorites",
      value: "12",
      change: "4 components",
      icon: Heart,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
    {
      label: "Total Value",
      value: 5197,
      change: "Across all builds",
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
            Monitor environment performance vectors, stored architectures, and telemetry feeds.
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
                <div className="text-sm font-semibold">{typeof stat.value === "number" ? formatPrice(stat.value, region, exchangeRate) : stat.value}</div>
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
                {savedBuilds.map((build) => (
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
                            {new Date(build.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Cpu className="w-3.5 h-3.5" />
                            {build.components} components
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-foreground mb-1">
                          {formatPrice(build.totalPrice, region, exchangeRate)}
                        </div>
                        <div className="text-xs text-muted-foreground font-light">
                          {build.performance}
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
                              style={{ width: `${build.compatibility}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            {build.compatibility}%
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded hover:bg-muted transition-colors">
                          <Share2 className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </button>
                        <Link
                          to={`/build/${build.id}`}
                          className="p-2 rounded hover:bg-muted transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </Link>
                        <button className="p-2 rounded hover:bg-destructive/10 transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded border border-border bg-card">
              <h2 className="text-sm font-mono tracking-wider uppercase text-muted-foreground mb-6">Investment Progression</h2>
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
                      fontSize: "11px"
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
                {recentActivity.map((activity) => (
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
    </div>
  );
}
