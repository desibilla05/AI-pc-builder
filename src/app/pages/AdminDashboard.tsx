import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  Users,
  Activity,
  TrendingUp,
  Settings,
  Database,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  BarChart3,
  ShoppingCart,
  DollarSign,
  Package,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "hardware" | "users" | "analytics">(
    "overview"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "Total Users",
      value: "12,847",
      change: "+12.5%",
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Total Builds",
      value: "45,231",
      change: "+8.2%",
      icon: Cpu,
      color: "text-accent",
    },
    {
      label: "Components",
      value: "2,458",
      change: "+3.1%",
      icon: Package,
      color: "text-success",
    },
    {
      label: "Revenue",
      value: "$284K",
      change: "+18.7%",
      icon: DollarSign,
      color: "text-warning",
    },
  ];

  const userActivity = [
    { date: "May 29", users: 1240, builds: 450 },
    { date: "May 30", users: 1380, builds: 520 },
    { date: "May 31", users: 1520, builds: 580 },
    { date: "Jun 01", users: 1650, builds: 610 },
    { date: "Jun 02", users: 1780, builds: 680 },
    { date: "Jun 03", users: 1920, builds: 740 },
    { date: "Jun 04", users: 2100, builds: 820 },
    { date: "Jun 05", users: 2240, builds: 890 },
  ];

  const componentCategories = [
    { name: "GPUs", value: 450, color: "#3B82F6" },
    { name: "CPUs", value: 380, color: "#8B5CF6" },
    { name: "RAM", value: 320, color: "#22C55E" },
    { name: "Storage", value: 280, color: "#F59E0B" },
    { name: "PSU", value: 240, color: "#EF4444" },
    { name: "Other", value: 788, color: "#A1A1AA" },
  ];

  const recentComponents = [
    {
      id: "1",
      name: "NVIDIA RTX 5090",
      category: "GPU",
      price: 1999,
      stock: 45,
      added: "2026-06-05",
    },
    {
      id: "2",
      name: "AMD Ryzen 9 8950X",
      category: "CPU",
      price: 649,
      stock: 128,
      added: "2026-06-04",
    },
    {
      id: "3",
      name: "Corsair Dominator 64GB DDR5",
      category: "RAM",
      price: 329,
      stock: 67,
      added: "2026-06-03",
    },
    {
      id: "4",
      name: "Samsung 990 EVO 4TB",
      category: "Storage",
      price: 349,
      stock: 92,
      added: "2026-06-02",
    },
    {
      id: "5",
      name: "Seasonic Prime 1200W",
      category: "PSU",
      price: 299,
      stock: 34,
      added: "2026-06-01",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: "Alex Thompson",
      email: "alex.t@email.com",
      builds: 5,
      joined: "2026-05-28",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.c@email.com",
      builds: 12,
      joined: "2026-05-25",
      status: "active",
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      email: "m.rodriguez@email.com",
      builds: 3,
      joined: "2026-05-20",
      status: "active",
    },
    {
      id: "4",
      name: "Emily Johnson",
      email: "emily.j@email.com",
      builds: 8,
      joined: "2026-05-15",
      status: "inactive",
    },
  ];

  const topBuilds = [
    { name: "Ultimate 4K Gaming", views: 15420, builds: 892 },
    { name: "Budget Esports", views: 12350, builds: 1245 },
    { name: "Content Creator Pro", views: 9870, builds: 567 },
    { name: "Workstation Beast", views: 7650, builds: 423 },
  ];

  const sidebar = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "hardware", label: "Hardware", icon: Database },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <aside className="w-64 border-r border-border bg-card min-h-screen sticky top-0">
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <Cpu className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold text-lg">BuildForge AI</div>
                <div className="text-xs text-muted-foreground">Admin Panel</div>
              </div>
            </Link>

            <nav className="space-y-2">
              {sidebar.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6 border-t border-border">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="w-4 h-4" />
              Back to Main Site
            </Link>
          </div>
        </aside>

        <main className="flex-1">
          <div className="p-8">
            {activeTab === "overview" && (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
                  <p className="text-xl text-muted-foreground">
                    Manage hardware, users, and analytics
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}
                        >
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-sm text-success font-semibold">
                          {stat.change}
                        </div>
                      </div>
                      <div className="text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-semibold mb-6">User Activity</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={userActivity}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <XAxis dataKey="date" stroke="#A1A1AA" />
                        <YAxis stroke="#A1A1AA" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#18181B",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#3B82F6"
                          strokeWidth={3}
                          name="Active Users"
                        />
                        <Line
                          type="monotone"
                          dataKey="builds"
                          stroke="#8B5CF6"
                          strokeWidth={3}
                          name="Builds Created"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-semibold mb-6">
                      Component Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={componentCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {componentCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-semibold mb-6">Top Builds</h2>
                    <div className="space-y-4">
                      {topBuilds.map((build, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-xl bg-background border border-border"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold">{build.name}</div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {build.views}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <ShoppingCart className="w-4 h-4" />
                              {build.builds} builds
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h2 className="text-2xl font-semibold mb-6">Recent Users</h2>
                    <div className="space-y-3">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="p-4 rounded-xl bg-background border border-border flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold mb-1">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold mb-1">
                              {user.builds} builds
                            </div>
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${
                                user.status === "active"
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {user.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "hardware" && (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Hardware Management</h1>
                    <p className="text-xl text-muted-foreground">
                      Add, edit, and manage components
                    </p>
                  </div>
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Component
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search components..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <button className="px-4 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Import
                  </button>
                  <button className="px-4 py-3 rounded-lg bg-card border border-border hover:bg-muted transition-colors flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Export
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Component
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Stock
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground">
                            Added
                          </th>
                          <th className="px-4 py-3 text-right text-sm font-semibold text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentComponents.map((component) => (
                          <tr
                            key={component.id}
                            className="border-b border-border hover:bg-muted/50 transition-colors"
                          >
                            <td className="px-4 py-4">
                              <div className="font-semibold">{component.name}</div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                {component.category}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-semibold">${component.price}</span>
                            </td>
                            <td className="px-4 py-4">
                              <span
                                className={`${
                                  component.stock > 50
                                    ? "text-success"
                                    : component.stock > 20
                                    ? "text-warning"
                                    : "text-destructive"
                                }`}
                              >
                                {component.stock} units
                              </span>
                            </td>
                            <td className="px-4 py-4 text-muted-foreground text-sm">
                              {new Date(component.added).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                                  <Edit className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === "users" && (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">User Management</h1>
                  <p className="text-xl text-muted-foreground">
                    View and manage registered users
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <p className="text-muted-foreground text-center py-12">
                    User management interface would be displayed here
                  </p>
                </div>
              </>
            )}

            {activeTab === "analytics" && (
              <>
                <div className="mb-8">
                  <h1 className="text-4xl font-bold mb-2">Analytics</h1>
                  <p className="text-xl text-muted-foreground">
                    Detailed insights and metrics
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <p className="text-muted-foreground text-center py-12">
                    Advanced analytics dashboard would be displayed here
                  </p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
