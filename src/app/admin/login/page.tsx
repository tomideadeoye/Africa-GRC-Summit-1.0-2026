"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuroraText } from "@/components/ui/aurora-text";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Lock, User, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Invalid credentials. Access denied.");
      }
    } catch (err) {
      setError("Connection failure. Please check your network.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-950 overflow-hidden font-sans">
      <InteractiveGridPattern 
        className="opacity-40"
        squares={[30, 30]}
        width={32}
        height={32}
        squaresClassName="fill-slate-800"
      />
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-16 h-16 bg-[#d4af37] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] border border-[#d4af37]/20">
            <span className="text-slate-950 font-black text-2xl tracking-tighter">GRC</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-2">
            Africa GRC <AuroraText className="text-[#d4af37]">Summit</AuroraText>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] text-center">
            Administrative Portal 1.0 (2026)
          </p>
        </div>

        <Card className="bg-slate-900/50 border-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Admin Login</CardTitle>
            <CardDescription className="text-slate-400 font-medium">
              Authenticate to manage the summit configuration.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#d4af37] transition-colors" />
                  <Input 
                    placeholder="Enter Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 bg-black/40 border-white/5 focus-visible:ring-[#d4af37]/50 focus-visible:border-[#d4af37] text-white h-12 rounded-sm transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-[#d4af37] transition-colors" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 bg-black/40 border-white/5 focus-visible:ring-[#d4af37]/50 focus-visible:border-[#d4af37] text-white h-12 rounded-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#d4af37] transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88l-3.29-3.29m7.53 7.53l3.29 3.29M3 3l18 18M10.58 10.58a2 2 0 0 1 2.84 2.84M19.35 15.4A10 10 0 0 0 12 4.5a10 10 0 0 0-7.35 10.9m11.23 3.12A10 10 0 0 1 12 19.5c-2.75 0-5.27-1.12-7.1-2.93"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-sm">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-tight text-center">{error}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-[#d4af37] hover:bg-[#c4a030] text-slate-950 font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all rounded-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
          Summit Management System <br/>
          (c) 2026 AAA Global Advisory
        </p>
      </div>
    </div>
  );
}
