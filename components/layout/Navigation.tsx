"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/useNavigation";
import { getRandomOffset, getRandomRotation } from "@/lib/utils";

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
    <nav className="fixed top-0 left-0 right-0 z-30 bg-organic-off-white/95 backdrop-blur-md border-b-3 border-cyber-charcoal hand-drawn-shadow">
      <div className="container mx-auto px-6 py-5">
        <ul className="flex items-center gap-6 md:gap-10 flex-wrap">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            const offsetY = getRandomOffset();
            const rotation = getRandomRotation();

            return (
              <li
                key={item.path}
                className="relative"
                style={{
                  transform: `translateY(${offsetY}px) rotate(${rotation}deg)`,
                }}
              >
                <motion.button
                  onClick={() => navigate(item.path)}
                  className={`text-base md:text-lg font-black transition-all ${
                    isActive
                      ? "text-organic-green"
                      : "text-cyber-charcoal hover:text-organic-green"
                  }`}
                  whileHover={{
                    scale: 1.1,
                    rotate: `${rotation + 1}deg`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    textShadow: isActive
                      ? "2px 2px 0px rgba(127, 176, 105, 0.3)"
                      : "none",
                  }}
                >
                  {item.label}
                </motion.button>
                {isActive && (
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full h-2"
                    viewBox="0 0 100 8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.path
                      d="M 0,4 Q 20,2 40,4 T 80,4 Q 90,5 100,4"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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

