/**
 * KazeOS Design Tokens
 * 
 * Bu dosya, tüm tasarım sistemi değerlerini merkezi bir yerden yönetmek için kullanılır.
 * Yeni component'ler oluştururken bu değerleri kullanın.
 */

export const designTokens = {
  // Window Sizes
  window: {
    maxWidth: {
      small: "max-w-2xl",
      medium: "max-w-4xl",
      large: "max-w-5xl",
    },
    maxHeight: {
      mobile: "max-h-[calc(100vh-12rem)]",
      desktop: "md:max-h-[75vh]",
      desktopLarge: "md:max-h-[80vh]",
    },
    header: {
      height: "h-10",
      padding: "px-3 py-2",
    },
  },

  // Typography
  typography: {
    heading: {
      h1: "text-lg md:text-xl font-bold",
      h2: "text-base md:text-lg font-bold",
      h3: "text-sm font-bold",
      windowTitle: "text-sm font-bold tracking-[0.1em]",
    },
    body: {
      normal: "text-xs",
      small: "text-[10px]",
      tiny: "text-[9px]",
    },
    mono: {
      normal: "font-mono text-xs",
      small: "font-mono text-[10px]",
    },
  },

  // Spacing
  spacing: {
    padding: {
      windowHeader: "px-3 py-2",
      windowBody: "p-3 md:p-4",
      panel: "p-2 md:p-3",
      compact: "p-1.5",
    },
    gap: {
      section: "gap-3 md:gap-4",
      items: "gap-2",
      compact: "gap-1.5",
      grid: "gap-2",
    },
    margin: {
      section: "space-y-2",
      compact: "space-y-1.5",
    },
  },

  // Icon Sizes
  icons: {
    windowHeader: 16,
    sectionHeader: 14,
    button: 12,
    buttonLarge: 16,
    display: 40,
    displayLarge: 48,
    avatar: {
      mobile: 40,
      desktop: 48,
    },
  },

  // Colors
  colors: {
    primary: "#25f4f4",
    backgroundDark: "#102222",
    backgroundLight: "#f5f8f8",
    surfaceDark: "#152a2a",
    n8n: "#ff6d5a",
    green: "#4ade80",
    purple: "#cba6f7",
    yellow: "#f9e2af",
  },

  // Component Patterns
  components: {
    window: {
      base: "relative flex flex-col w-full bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden",
      header: "flex items-center justify-between bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20",
      body: "flex flex-1 overflow-hidden flex-col md:flex-row min-h-0 max-h-full",
    },
    scrollable: "flex-1 overflow-y-auto min-h-0",
    avatar: {
      container: "w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-[0_0_20px_rgba(37,244,244,0.2)] flex items-center justify-center",
    },
    card: {
      base: "flex flex-col gap-2 p-2 rounded-lg bg-[#162a2a] border border-white/5 cursor-pointer transition-all duration-200",
      selected: "border-primary shadow-[0_0_10px_rgba(37,244,244,0.3)]",
    },
  },
} as const;

/**
 * Helper function to combine window classes
 */
export function getWindowClasses(size: "small" | "medium" | "large" = "medium") {
  return [
    designTokens.components.window.base,
    designTokens.window.maxWidth[size],
    designTokens.window.maxHeight.mobile,
    designTokens.window.maxHeight.desktop,
  ].join(" ");
}

/**
 * Helper function to get responsive padding
 */
export function getResponsivePadding(size: "small" | "medium" | "large" = "medium") {
  const paddingMap = {
    small: "p-2",
    medium: "p-3 md:p-4",
    large: "p-4 md:p-6",
  };
  return paddingMap[size];
}

