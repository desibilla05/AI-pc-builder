import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useThemeStore } from "../../../store/themeStore";
import { X, Mail, Lock, User, Github } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, isSignUpMode } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [isSignUp, setIsSignUp] = useState(isSignUpMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Sync state when mode parameter changes
  useEffect(() => {
    setIsSignUp(isSignUpMode);
  }, [isSignUpMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, isSignUp ? name || "Builder" : "Builder");
  };

  const bg = isDark ? "#0A0A09" : "#FFFFFF";
  const fg = isDark ? "#FAF9F6" : "#0A0A0A";
  const muted = isDark ? "#666666" : "#737373";
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const inputBg = isDark ? "#121212" : "#F5F5F5";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
      padding: "1rem",
    }}>
      <div style={{
        width: "100%", maxWidth: "400px",
        background: bg, borderRadius: "8px",
        border: `1px solid ${border}`,
        boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
        overflow: "hidden", position: "relative",
      }}>
        {/* Close btn */}
        <button
          onClick={closeAuthModal}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "transparent", border: "none", color: muted, cursor: "pointer",
            width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 150ms ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; (e.currentTarget as HTMLElement).style.color = fg; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = muted; }}
        >
          <X style={{ width: "18px", height: "18px" }} />
        </button>

        {/* Decorative Top (Monochrome) */}
        <div style={{ height: "4px", background: fg }} />

        <div style={{ padding: "2.5rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 300, color: fg, letterSpacing: "-0.02em", marginBottom: "8px", lineHeight: 1 }}>
              {isSignUp ? "Join BuildForge" : "Welcome Back"}
            </h2>
            <p style={{ fontSize: "0.8rem", color: muted }}>
              {isSignUp ? "Create an account to save your builds." : "Log in to access your saved PC builds."}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {isSignUp && (
              <div style={{ position: "relative" }}>
                <User style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: muted }} />
                <input
                  type="text" required placeholder="Display Name" value={name} onChange={e => setName(e.target.value)}
                  style={{
                    width: "100%", padding: "12px 14px 12px 42px", borderRadius: "4px",
                    background: inputBg, border: `1px solid ${border}`, color: fg,
                    fontSize: "0.85rem", outline: "none", boxSizing: "border-box"
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = fg)}
                  onBlur={e => (e.currentTarget.style.borderColor = border)}
                />
              </div>
            )}
            <div style={{ position: "relative" }}>
              <Mail style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: muted }} />
              <input
                type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px 12px 42px", borderRadius: "4px",
                  background: inputBg, border: `1px solid ${border}`, color: fg,
                  fontSize: "0.85rem", outline: "none", boxSizing: "border-box"
                }}
                onFocus={e => (e.currentTarget.style.borderColor = fg)}
                onBlur={e => (e.currentTarget.style.borderColor = border)}
              />
            </div>
            <div style={{ position: "relative" }}>
              <Lock style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: muted }} />
              <input
                type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%", padding: "12px 14px 12px 42px", borderRadius: "4px",
                  background: inputBg, border: `1px solid ${border}`, color: fg,
                  fontSize: "0.85rem", outline: "none", boxSizing: "border-box"
                }}
                onFocus={e => (e.currentTarget.style.borderColor = fg)}
                onBlur={e => (e.currentTarget.style.borderColor = border)}
              />
            </div>

            <button type="submit" style={{
              width: "100%", padding: "12px", borderRadius: "4px", marginTop: "8px",
              background: fg, color: isDark ? "#0A0A09" : "#FFFFFF", border: "none", cursor: "pointer",
              fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
              transition: "opacity 150ms ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              {isSignUp ? "Create Account" : "Log In"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: "1px", background: border }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: border }} />
          </div>

          <button style={{
            width: "100%", padding: "12px", borderRadius: "4px",
            background: "transparent", color: fg, border: `1px solid ${border}`, cursor: "pointer",
            fontSize: "0.8rem", fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transition: "all 150ms ease",
          }}
            onMouseEnter={e => { (e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"); }}
            onMouseLeave={e => { (e.currentTarget.style.background = "transparent"); }}
          >
            <Github style={{ width: "16px", height: "16px" }} />
            Continue with GitHub
          </button>

          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.75rem", color: muted,
                textDecoration: "underline", textUnderlineOffset: "4px",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = fg)}
              onMouseLeave={e => (e.currentTarget.style.color = muted)}
            >
              {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
