"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Placeholder: call your auth API when ready, e.g. POST /api/auth/login
      const r = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        setError(data.detail ?? `Login failed: ${r.status}`);
        setLoading(false);
        return;
      }

      const data = await r.json().catch(() => ({}));
      // Store token or user; adjust key/format to match your backend
      if (data.access_token) {
        typeof window !== "undefined" && sessionStorage.setItem("token", data.access_token);
      }
      router.push("/");
      router.refresh();
    } catch (e) {
      // Backend not implemented yet: treat as demo login if email is non-empty
      if (email.trim()) {
        typeof window !== "undefined" && sessionStorage.setItem("token", "demo");
        router.push("/");
        router.refresh();
        return;
      }
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <div className="loginField">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="loginField">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
      </div>
      {error && <p className="loginError">{error}</p>}
      <button type="submit" className="btn-post" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
