import { Link, useLocation } from "react-router-dom";
import { Cpu, Menu, X, Zap, Sun, Moon, User, LogOut, Sparkles, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegionStore } from "../../../store/regionStore";
import { useThemeStore } from "../../../store/themeStore";
import { useAuthStore } from "../../../store/authStore";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { region, setRegion } = useRegionStore();
  const { theme, toggleTheme } = useThemeStore();
  const { user, openAuthModal, logout } = useAuthStore();

  const isDark = theme === "dark";

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { path: "/builder", label: "PC Builder", desc: "Configure parts piece-by-piece", icon: Cpu },
    { path: "/ai-recommend", label: "AI Architect", desc: "Get component recommendations", icon: Sparkles },
    { path: "/comparison", label: "Compare Parts", desc: "CPU & GPU head-to-head", icon: Zap },
    { path: "/benchmarks", label: "Benchmarks", desc: "Gaming & productivity stats", icon: Trophy },
    { path: "/dashboard", label: "Dashboard", desc: "Your saved configurations", icon: User },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navBg = isDark ? "#0A0A0A" : "#FAF9F6";
  const navBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const activeBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const hoverBg = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)";

  if (isMobile) {
    return (
      <nav
        id="main-navbar"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: navBg,
          borderBottom: `1px solid ${navBorder}`,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ width: "100%", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
            {/* Logo */}
            <Link to="/" id="nav-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <span style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: isDark ? "#FAF9F6" : "#0A0A0A",
                lineHeight: 1,
              }}>
                BuildForge
              </span>
            </Link>

            {/* Mobile Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={toggleTheme}
                style={{
                  width: "36px", height: "36px", borderRadius: "6px", border: `1px solid ${navBorder}`,
                  background: "transparent",
                  color: isDark ? "#FAF9F6" : "#0A0A0A", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {isDark ? <Sun style={{ width: "14px", height: "14px" }} /> : <Moon style={{ width: "14px", height: "14px" }} />}
              </button>
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  width: "36px", height: "36px", borderRadius: "6px", border: `1px solid ${navBorder}`,
                  background: "transparent",
                  color: isDark ? "#FAF9F6" : "#0A0A0A", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {mobileMenuOpen ? <X style={{ width: "16px", height: "16px" }} /> : <Menu style={{ width: "16px", height: "16px" }} />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            style={{
              background: navBg,
              borderTop: `1px solid ${navBorder}`,
              padding: "1rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: isActive(link.path) ? (isDark ? "#FAF9F6" : "#0A0A0A") : (isDark ? "#888888" : "#555555"),
                  textDecoration: "none",
                  borderRadius: "6px",
                  background: isActive(link.path) ? activeBg : "transparent",
                }}
              >
                <link.icon style={{ width: "16px", height: "16px" }} />
                <div>
                  <div>{link.label}</div>
                  <div style={{ fontSize: "0.65rem", color: isDark ? "#555555" : "#999999", fontWeight: 400, marginTop: "1px" }}>
                    {link.desc}
                  </div>
                </div>
              </Link>
            ))}

            <div style={{ display: "flex", gap: "8px", marginTop: "12px", paddingTop: "12px", borderTop: `1px solid ${navBorder}` }}>
              <button
                onClick={() => { setRegion(region === "US" ? "IN" : "US"); setMobileMenuOpen(false); }}
                style={{
                  flex: 1, padding: "8px 12px", borderRadius: "6px",
                  background: "transparent", border: `1px solid ${navBorder}`,
                  color: isDark ? "#FAF9F6" : "#0A0A0A",
                  fontSize: "0.75rem", fontWeight: 700, cursor: "pointer",
                }}
              >
                Region: {region}
              </button>
              <button
                onClick={() => { openAuthModal(); setMobileMenuOpen(false); }}
                style={{
                  flex: 1, padding: "8px 12px", borderRadius: "6px",
                  background: isDark ? "#FAF9F6" : "#0A0A0A", color: isDark ? "#0A0A0A" : "#FAF9F6",
                  border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer",
                }}
              >
                {user ? "Account" : "Access"}
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Desktop Sidebar Layout
  return (
    <aside
      id="main-sidebar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        width: "260px",
        background: navBg,
        borderRight: `1px solid ${navBorder}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2rem 1.25rem",
        boxSizing: "border-box",
      }}
    >
      <div>
        {/* Logo */}
        <Link to="/" id="nav-logo" style={{ display: "flex", flexDirection: "column", textDecoration: "none", marginBottom: "2.5rem", paddingLeft: "8px" }}>
          <span style={{
            fontSize: "1.4rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: isDark ? "#FAF9F6" : "#0A0A0A",
            lineHeight: 1,
          }}>
            BuildForge
          </span>
          <span style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: isDark ? "#666666" : "#888888",
            marginTop: "6px",
          }}>
            Digital Hardware Studio
          </span>
        </Link>

        {/* Sidebar Links */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "6px",
                textDecoration: "none",
                background: isActive(link.path) ? activeBg : "transparent",
                borderLeft: isActive(link.path)
                  ? `3px solid ${isDark ? "#FAF9F6" : "#0A0A0A"}`
                  : "3px solid transparent",
                transition: "all 150ms ease",
              }}
              onMouseEnter={e => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.background = hoverBg;
                }
              }}
              onMouseLeave={e => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <link.icon style={{
                width: "18px",
                height: "18px",
                color: isActive(link.path) ? (isDark ? "#FAF9F6" : "#0A0A0A") : (isDark ? "#666666" : "#737373"),
                strokeWidth: 1.8,
              }} />
              <div>
                <div style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: isActive(link.path) ? (isDark ? "#FAF9F6" : "#0A0A0A") : (isDark ? "#888888" : "#555555"),
                  letterSpacing: "-0.01em",
                }}>
                  {link.label}
                </div>
                <div style={{
                  fontSize: "0.65rem",
                  color: isDark ? "#666666" : "#888888",
                  marginTop: "2px",
                }}>
                  {link.desc}
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer Controls */}
      <div style={{ borderTop: `1px solid ${navBorder}`, paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Region */}
          <button
            onClick={() => setRegion(region === "US" ? "IN" : "US")}
            style={{
              flex: 1,
              padding: "6px 10px",
              borderRadius: "4px",
              border: `1px solid ${navBorder}`,
              cursor: "pointer",
              background: "transparent",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: isDark ? "#FAF9F6" : "#0A0A0A",
              transition: "all 150ms ease",
            }}
          >
            {region === "US" ? "USD" : "INR"}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Light mode" : "Dark mode"}
            style={{
              padding: "6px",
              borderRadius: "4px",
              border: `1px solid ${navBorder}`,
              cursor: "pointer",
              background: "transparent",
              color: isDark ? "#FAF9F6" : "#0A0A0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 150ms ease",
              aspectRatio: "1",
            }}
          >
            {isDark ? <Sun style={{ width: "14px", height: "14px" }} /> : <Moon style={{ width: "14px", height: "14px" }} />}
          </button>
        </div>

        {/* User Auth Info */}
        {user ? (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 10px",
            borderRadius: "6px",
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${navBorder}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: isDark ? "#FAF9F6" : "#0A0A0A",
                color: isDark ? "#0A0A0A" : "#FAF9F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 800,
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: isDark ? "#FAF9F6" : "#0A0A0A", maxWidth: "110px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name}
                </span>
                <span style={{ fontSize: "0.6rem", color: isDark ? "#666666" : "#888888" }}>
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log Out"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isDark ? "#666666" : "#737373",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={e => e.currentTarget.style.color = isDark ? "#FAF9F6" : "#0A0A0A"}
              onMouseLeave={e => e.currentTarget.style.color = isDark ? "#666666" : "#737373"}
            >
              <LogOut style={{ width: "14px", height: "14px" }} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => openAuthModal()}
            style={{
              width: "100%",
              padding: "8px 14px",
              borderRadius: "4px",
              border: `1px solid ${isDark ? "#FAF9F6" : "#0A0A0A"}`,
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: isDark ? "#FAF9F6" : "#0A0A0A",
              color: isDark ? "#0A0A0A" : "#FAF9F6",
              transition: "all 150ms ease",
            }}
          >
            Access Account
          </button>
        )}
      </div>
    </aside>
  );
}
