<div align="center">

# 🖥️ KazeOS v1.1

**A Retro-Futuristic Desktop Environment Portfolio**

_AI Automation Developer • TTRPG Enthusiast • Hydroponics Hobbyist_

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.0-0055ff?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

[Live Demo](#) • [Documentation](#design-system) • [Deployment](#deployment)

</div>

---

## 📖 Overview

**KazeOS** is a unique portfolio website that transforms the traditional web experience into an immersive retro-futuristic desktop environment. Built with Next.js 14 and TypeScript, it combines nostalgic OS aesthetics with modern web technologies to showcase skills, projects, and interests in an interactive, gamified interface.

### ✨ Key Features

- 🖥️ **Desktop Environment UI** - Complete OS-themed interface with windows, taskbar, and desktop icons
- 🎲 **Dice Roll Navigation** - TTRPG-inspired navigation with D20 dice roll transitions
- 🐱 **Alba Companion** - Interactive cat companion with drag-and-drop, multiple states, and animations
- 📦 **Inventory System** - RPG-style inventory showcasing skills and tools
- 📜 **Quest Log** - Project showcase in a quest log format
- 💻 **Live Terminal** - Real-time terminal window displaying n8n automation logs
- 📚 **Research Lab** - Blog system for technical articles and thoughts
- 📅 **Timeline Archives** - Professional experience timeline
- 📡 **Comms Link** - Contact system with scheduling calendar and social links

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kazeai.git
cd kazeai

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 🏗️ Project Structure

```
kazeai/
├── app/                    # Next.js App Router pages
│   ├── about/              # Research Lab (blog listing)
│   ├── contact/           # Comms Link (contact & scheduling)
│   ├── projects/           # Quest Log
│   ├── research/           # Blog detail pages
│   ├── skills/             # Inventory & Skill Tree
│   ├── timeline/           # Timeline Archives
│   └── layout.tsx          # Root layout
├── components/
│   ├── features/           # Feature components
│   │   ├── alba/          # Alba cat companion
│   │   ├── dice/          # D20 dice roll system
│   │   ├── inventory/     # Inventory window
│   │   └── quests/        # Quest log window
│   ├── layout/             # Layout components
│   │   ├── DesktopEnvironment.tsx
│   │   ├── DesktopIcons.tsx
│   │   ├── Taskbar.tsx
│   │   └── TerminalWindow.tsx
│   └── ui/                 # UI components
├── hooks/                   # Custom React hooks
├── store/                   # Zustand state management
├── lib/                     # Utilities & animations
├── types/                   # TypeScript definitions
├── public/                  # Static assets
│   └── sprites/            # Alba sprite assets
└── styles/                  # Global styles
```

---

## 🎨 Design System

KazeOS follows a strict design system for consistency:

### Window Sizing

- **Max Width:** `max-w-4xl` or `max-w-5xl` (never larger)
- **Max Height:** `max-h-[calc(100vh-12rem)] md:max-h-[75vh]`
- **Header:** `h-10`, padding `px-3 py-2`

### Typography

- **Headings:** `text-lg md:text-xl` (H1), `text-base md:text-lg` (H2), `text-sm` (H3)
- **Body:** `text-xs` (normal), `text-[10px]` (small), `text-[9px]` (tiny)
- **Window Titles:** `text-sm font-bold tracking-[0.1em]`

### Colors

- **Primary:** `#25f4f4` (cyan)
- **Background:** `#102222` (dark)
- **Surface:** `#152a2a` (panel dark)

### Spacing

- **Window Body:** `p-3 md:p-4`
- **Panel Padding:** `p-2 md:p-3`
- **Gaps:** `gap-2` or `gap-1.5` between items

See [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) for complete guidelines.

---

## 🛠️ Tech Stack

### Core

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS

### Libraries

- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Zustand](https://github.com/pmndrs/zustand)** - State management
- **[Lucide React](https://lucide.dev/)** - Icon library

### Development

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📱 Pages & Features

### 🏠 Home

Desktop environment landing page with navigation icons and terminal.

### 📦 Inventory (`/skills`)

RPG-style inventory system showcasing:

- Technical skills
- Tools and technologies
- Proficiency levels
- Category organization

### 📜 Quest Log (`/projects`)

Project showcase in quest log format:

- Project cards with status badges
- Completion tracking
- Technology tags
- Links to live demos

### 📚 Research Lab (`/about`)

Blog system for technical articles:

- Featured posts
- Category filtering
- Directory navigation
- Search functionality
- Pagination

### 📄 Research Detail (`/research/[id]`)

Individual blog post pages with:

- Hero sections
- Code blocks
- Table of contents
- Author profile
- Reading stats

### 📅 Timeline Archives (`/timeline`)

Professional experience timeline:

- Chronological job history
- Company details
- Role descriptions
- Interactive navigation

### 📡 Comms Link (`/contact`)

Contact system with three channels:

- **Direct Uplink:** Email form with encryption status
- **Social Net:** Social media links with progress bars
- **Scheduling:** Calendar with available time slots

---

## 🎮 Interactive Features

### Alba the Cat Companion

- **Drag & Drop:** Move Alba around the screen
- **Click Interaction:** Click to move to nearest edge
- **States:** Awake, sleeping, walking, curious, angry, purring
- **Idle Behavior:** Falls asleep after 5 seconds of inactivity
- **Hover Effects:** Interactive messages and animations

### D20 Dice Navigation

- TTRPG-inspired navigation transitions
- Critical success/failure animations
- Smooth page transitions

### Live Terminal

- Real-time log streaming
- n8n automation workflow display
- System status indicators

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Environment Variables:**
   - Currently none required
   - Add API keys if needed in Vercel dashboard

### Other Platforms

The project can be deployed on any platform supporting Next.js:

- **Netlify** - Similar to Vercel
- **AWS Amplify** - AWS hosting
- **Railway** - Simple deployment
- **Docker** - Containerized deployment

---

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

### Code Style

- **Indentation:** 2 spaces
- **Quotes:** Double quotes
- **Semicolons:** Always
- **Line Length:** Max 80 characters
- **Type Safety:** Strict TypeScript

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Kadir** - AI Automation Developer

- Portfolio: [Live Site](#)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Profile](#)

---

## 🙏 Acknowledgments

- Design inspiration from classic operating systems
- TTRPG mechanics for navigation system
- n8n community for automation workflows

---

<div align="center">

**Built with ❤️ using Next.js and TypeScript**

⭐ Star this repo if you find it interesting!

</div>
