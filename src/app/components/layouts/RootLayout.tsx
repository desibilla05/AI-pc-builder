import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { AuthModal } from "../ui/AuthModal";
import { useThemeStore } from "../../../store/themeStore";
import { useAuthStore } from "../../../store/authStore";

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isWelcomePage = location.pathname === "/";
  const showHeaderFooter = !isAdminPage && !isWelcomePage;

  // Subscribe to trigger re-renders on theme change
  useThemeStore();
  
  const { checkAuth } = useAuthStore();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Check auth on layout mount
    checkAuth();

    // Redirect to the Welcome page on initial page load / full browser reload
    if (window.location.pathname !== "/") {
      navigate("/");
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ display: "flex", flexDirection: "column" }}>
      {showHeaderFooter && <Navbar />}
      <div style={{ 
        flex: 1,
        paddingLeft: showHeaderFooter && !isMobile ? "260px" : "0", 
        paddingTop: showHeaderFooter && isMobile ? "68px" : "0",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
      <AuthModal />
    </div>
  );
}
