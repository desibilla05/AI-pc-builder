import { Link } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";
import { useAuthStore } from "../../store/authStore";
import { ArrowRight, Cpu, Sparkles, User, LogIn, UserPlus, FileText, LogOut } from "lucide-react";
import { ParticleSwarm } from "../components/ui/ParticleSwarm";

export function Welcome() {
  const { theme } = useThemeStore();
  const { user, openAuthModal, logout } = useAuthStore();
  const isDark = theme === "dark";

  const fgPrimary = "#ffffff";
  const fgMuted = "#ffffff";
  const borderStrong = "#ffffff";

  return (
    <div style={{
      background: "#0A0A0A",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      color: fgPrimary,
      transition: "all 0.3s ease",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <ParticleSwarm />
      
      {/* ── IMMERSIVE HERO PORTAL ── */}
      <section style={{
        width: "100%",
        maxWidth: "1100px",
        padding: "0 2.5rem",
        textAlign: "center",
        position: "relative",
        zIndex: 1
      }}>
        
        {/* Title */}
        <h1 style={{
          fontSize: "clamp(3.5rem, 7vw, 6rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          color: fgPrimary,
          margin: "0 auto 1.5rem",
          maxWidth: "1000px",
        }}>
          Build the <span style={{ fontWeight: 800 }}>Exceptional.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
          color: "#ffffff",
          lineHeight: 1.6,
          maxWidth: "680px",
          margin: "0 auto 3rem",
        }}>
          Precision engineering meets architectural clarity. Forge your digital masterpiece with curated hardware for the discerning professional.
        </p>

        {/* ── PORTAL GRID ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "left"
        }}>
          
          {/* Workspace Portal */}
          <div style={{
            border: "none",
            background: "transparent",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "220px",
            transition: "all 0.3s ease",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                <Cpu style={{ width: "20px", height: "20px", color: fgPrimary, strokeWidth: 1.5 }} />
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Hardware Studio</h3>
              </div>
              <p style={{ fontSize: "0.85rem", color: fgMuted, lineHeight: 1.5, margin: "0 0 1.25rem 0" }}>
                Configure your custom computer piece-by-piece, or collaborate with our generative AI hardware architect.
              </p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to="/builder"
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "opacity 150ms ease",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Custom Build <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
              
              <Link
                to="/builder?ai=true"
                style={{
                  background: "#ffffff",
                  color: "#000000",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "opacity 150ms ease",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <Sparkles style={{ width: "14px", height: "14px" }} /> AI Builder
              </Link>
            </div>
          </div>

          {/* Profile Portal */}
          <div style={{
            border: "none",
            background: "transparent",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "220px",
            transition: "all 0.3s ease",
          }}>
            {!user ? (
              <>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                    <User style={{ width: "20px", height: "20px", color: fgPrimary, strokeWidth: 1.5 }} />
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Forge Account</h3>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: fgMuted, lineHeight: 1.5, margin: "0 0 1.25rem 0" }}>
                    Access saved system configurations, review aggregate power limits, and compile custom compatibility diagnostics.
                  </p>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button
                    onClick={() => openAuthModal(false)}
                    style={{
                      background: "#ffffff",
                      color: "#000000",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "opacity 150ms ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <LogIn style={{ width: "14px", height: "14px" }} /> Log In
                  </button>
                  
                  <button
                    onClick={() => openAuthModal(true)}
                    style={{
                      background: "#ffffff",
                      color: "#000000",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "opacity 150ms ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <UserPlus style={{ width: "14px", height: "14px" }} /> Create Account
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                    <User style={{ width: "20px", height: "20px", color: fgPrimary, strokeWidth: 1.5 }} />
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Welcome Back</h3>
                  </div>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div style={{ fontSize: "0.65rem", color: fgMuted, textTransform: "uppercase", fontFamily: "monospace" }}>Logged In As</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "2px" }}>{user.name}</div>
                    <div style={{ fontSize: "0.8rem", color: fgMuted, marginTop: "2px" }}>{user.email}</div>
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Link
                    to="/dashboard"
                    style={{
                      background: "#ffffff",
                      color: "#000000",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "opacity 150ms ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <FileText style={{ width: "14px", height: "14px" }} /> View Saved Builds
                  </Link>
                  
                  <button
                    onClick={() => logout()}
                    style={{
                      background: "#ffffff",
                      color: "#000000",
                      border: "none",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "opacity 150ms ease",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    <LogOut style={{ width: "14px", height: "14px" }} /> Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
