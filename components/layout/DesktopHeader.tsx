"use client";

export function DesktopHeader() {
  // No icons in header currently
  return (
    <header className="flex justify-between items-start p-6 select-none relative z-20">
      <div className="flex flex-col">
        <h3 className="text-white/90 tracking-widest text-xl font-bold uppercase drop-shadow-lg">
          KadirOS <span className="text-primary text-sm align-top ml-1">v1.1</span>
        </h3>
        <span className="text-white/40 text-xs font-mono tracking-wider">
          SYSTEM: ONLINE
        </span>
      </div>
      <div className="hidden md:flex gap-4">
        <div className="px-3 py-1 bg-surface-dark/50 backdrop-blur-sm rounded border border-white/5 text-xs text-white/60 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          HYDRO: OPTIMAL
        </div>
        <div className="px-3 py-1 bg-surface-dark/50 backdrop-blur-sm rounded border border-white/5 text-xs text-white/60 font-mono">
          MEM: 64TB / OK
        </div>
        <div className="px-3 py-1 bg-surface-dark/50 backdrop-blur-sm rounded border border-white/5 text-xs text-white/60 font-mono">
          CPU: 12% / STABLE
        </div>
      </div>
    </header>
  );
}

