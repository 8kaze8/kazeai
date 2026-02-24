"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0c1818" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,244,244,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,244,244,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-xs">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#25f4f4] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#25f4f4]">
              KAZEOS
            </span>
            <div className="w-2 h-2 rounded-full bg-[#25f4f4] animate-pulse" />
          </div>
          <p className="text-[8px] text-[#25f4f4]/25 tracking-[0.3em] uppercase">
            Admin Console
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-lg p-5 border"
          style={{
            backgroundColor: "#0e1e1e",
            borderColor: "rgba(37, 244, 244, 0.08)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[9px] uppercase tracking-[0.15em]"
                style={{ color: "rgba(37, 244, 244, 0.35)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-xs rounded-md border
                  bg-[#0a1414] outline-none
                  focus:border-[#25f4f4]/30 focus:shadow-[0_0_12px_rgba(37,244,244,0.05)]
                  transition-all duration-200"
                style={{
                  borderColor: "rgba(37, 244, 244, 0.1)",
                  color: "#e0f0f0",
                }}
                placeholder="admin@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[9px] uppercase tracking-[0.15em]"
                style={{ color: "rgba(37, 244, 244, 0.35)" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 text-xs rounded-md border
                  bg-[#0a1414] outline-none
                  focus:border-[#25f4f4]/30 focus:shadow-[0_0_12px_rgba(37,244,244,0.05)]
                  transition-all duration-200"
                style={{
                  borderColor: "rgba(37, 244, 244, 0.1)",
                  color: "#e0f0f0",
                }}
              />
            </div>

            {error && (
              <p className="text-[10px] text-red-400/80 bg-red-400/5 px-2 py-1.5 rounded">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 px-3 py-2.5 text-xs font-bold uppercase
                tracking-[0.15em] rounded-md
                bg-[#25f4f4]/10 border border-[#25f4f4]/20 text-[#25f4f4]
                hover:bg-[#25f4f4]/15 hover:border-[#25f4f4]/30
                hover:shadow-[0_0_20px_rgba(37,244,244,0.08)]
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25f4f4] animate-pulse" />
                  Authenticating
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[8px] text-[#25f4f4]/15 mt-4 tracking-widest">
          SECURE CONNECTION
        </p>
      </div>
    </div>
  );
}
