import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layouts/RootLayout";
import { Welcome } from "./pages/Welcome";
import { PCBuilder } from "./pages/PCBuilder";
import { Comparison } from "./pages/Comparison";
import { Benchmarks } from "./pages/Benchmarks";
import { AIRecommendation } from "./pages/AIRecommendation";
import { Dashboard } from "./pages/Dashboard";
import { BuildDetails } from "./pages/BuildDetails";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Welcome },
      { path: "builder", Component: PCBuilder },
      { path: "comparison", Component: Comparison },
      { path: "benchmarks", Component: Benchmarks },
      { path: "ai-recommend", Component: AIRecommendation },
      { path: "dashboard", Component: Dashboard },
      { path: "build/:id", Component: BuildDetails },
      { path: "admin", Component: AdminDashboard },
    ],
  },
]);
