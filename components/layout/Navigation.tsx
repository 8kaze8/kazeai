"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/useNavigation";
import { getRandomOffset } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/skills", label: "Skills" },
  { path: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const { navigate } = useNavigation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-organic-off-white/80 backdrop-blur-sm border-b-2 border-cyber-charcoal">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            const offsetY = getRandomOffset();

            return (
              <li
                key={item.path}
                className="relative"
                style={{ transform: `translateY(${offsetY}px)` }}
              >
                <button
                  onClick={() => navigate(item.path)}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-organic-green font-bold"
                      : "text-cyber-charcoal hover:text-organic-green"
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.svg
                    className="absolute -bottom-1 left-0 w-full h-1"
                    viewBox="0 0 100 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.path
                      d="M 0,2 Q 25,0 50,2 T 100,2"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      className="text-organic-green"
                    />
                  </motion.svg>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

