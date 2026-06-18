import { useState, useEffect } from "react";
import { useAuthStore } from "../../../store/authStore";
import { useThemeStore } from "../../../store/themeStore";
import { X, Mail, Lock, User } from "lucide-react";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, signUp, isSignUpMode } = useAuthStore();
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [isSignUp, setIsSignUp] = useState(isSignUpMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Sync state when mode parameter changes
  useEffect(() => {
    setIsSignUp(isSignUpMode);
    setError(null);
  }, [isSignUpMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    if (isSignUp) {
      if (!name.trim()) {
        setError("Please enter your display name.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      const res = await signUp(name, email, password);
      if (!res.success) {
        setError(res.message || "Failed to create account.");
      }
    } else {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message || "Incorrect email or password.");
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
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

          {/* Error Message Display */}
          {error && (
            <div style={{
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#EF4444",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              marginBottom: "1.5rem",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

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



          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button
              onClick={toggleMode}
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
