# KadirOS - Portfolio Website

Portfolio website for Kadir - AI Automation Developer, designed as a retro-futuristic desktop environment.

## Features

- **KadirOS Desktop Environment**: Retro-futuristic OS-themed interface with windows, taskbar, and desktop icons
- **Dice Roll Navigation**: TTRPG-inspired navigation with D20 dice roll transitions
- **Alba the Cat Companion**: Interactive cat companion with multiple states and animations
- **Inventory System**: RPG-style inventory for skills and tools
- **Quest Log**: Project showcase in a quest log format
- **Terminal Window**: Live terminal showing n8n automation logs

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js App Router pages
- `components/` - React components (UI, features, layout)
- `hooks/` - Custom React hooks
- `store/` - Zustand state management
- `lib/` - Utilities, animations, constants
- `types/` - TypeScript type definitions
- `public/` - Static assets

## Design Philosophy

This portfolio follows a **KadirOS Desktop Environment** theme:
- Retro-futuristic OS interface (inspired by classic operating systems)
- Dark theme with neon cyan accents (#25f4f4)
- Compact window design with minimal padding
- Terminal-style UI elements
- Grid pattern backgrounds
- CRT scanline effects
- Desktop environment metaphors (windows, taskbar, icons)

See `docs/DESIGN_SYSTEM.md` for detailed design guidelines.

## Asset Generation

Alba sprite assets need to be generated externally. See the plan for generation prompts.

## License

MIT
