"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { WindowContainer } from "@/components/ui/WindowContainer";

interface BlogPost {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  comments?: number;
  featured?: boolean;
  imageUrl?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "2023-11-05",
    date: "2023-11-05",
    category: "AI Experiments",
    title: "Optimizing Nutrient Delivery with Computer Vision",
    excerpt:
      "By integrating a camera module with my Raspberry Pi controller, I've managed to create a feedback loop that detects leaf discoloration before the pH sensors even register a drift. Here is the breakdown of the OpenCV pipeline...",
    tags: ["#PYTHON", "#IOT", "#HARDWARE"],
    readTime: "12 min",
    comments: 12,
    featured: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3y-DP1p4TqGLbO1OfswEkk7jNbZf03hJfIglQvr6ODR_JoKmlSvraDyiLrTlWIkl5urYu8HdzPxX6kzWe0-33QObm8gzWjpEDMQ0li56_2n7oE4mhZJMm_feLmhhbBdObC27mdf3VTeGIwKJLdT1ZD7Th-XxMj7bhxRu95EMKUBRXOnrw7fklG7HEkx3tdiZ4gdBryHu7Gm1ecd7kTfIVN05eVP_0COn11WAQmlJjihpkhHKEOo9TSkbb4EzgN6XzEpOZNmfT_Bc",
  },
  {
    id: "2023-10-28",
    date: "2023-10-28",
    category: "LLMs in the Garden",
    title: "Talking to Basil: A customized GPT Agent",
    excerpt:
      "I fed 6 months of sensor logs into a fine-tuned model. Now I can ask 'How are you feeling?' and get a response based on VPD and EC levels. The results are surprisingly sassy.",
    tags: ["#AI", "#DATA"],
    readTime: "4 min",
  },
  {
    id: "2023-10-15",
    date: "2023-10-15",
    category: "Hardware Upgrade",
    title: "Hydro Lab v2.0: Switching to High-Pressure Aeroponics",
    excerpt:
      "Deep Water Culture was great for starting out, but the root growth was getting unmanageable. I'm documenting the migration to a custom HPA system with misting nozzles.",
    tags: ["#SETUP", "#BUILD"],
    readTime: "8 min",
  },
  {
    id: "2023-09-30",
    date: "2023-09-30",
    category: "Portfolio Design",
    title: "Creating a 'Desktop Environment' in HTML/Tailwind",
    excerpt:
      "Why settle for a standard landing page when you can build an OS? A deep dive into the CSS grids, backdrop filters, and CRT scanline effects used to build this site.",
    tags: ["#UI/UX", "#RETRO"],
    readTime: "12 min",
  },
];

export default function Research() {
  const router = useRouter();
  const [selectedDirectory, setSelectedDirectory] = useState("/root/all_logs");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const directories = [
    "/root/all_logs",
    "/mnt/hydroponics",
    "/mnt/ai_automation",
    "/usr/dev_diary",
    "/tmp/thoughts",
  ];

  const keywords = ["#PYTHON", "#BASIL", "#IOT", "#LLM", "#HARDWARE", "#CSS"];

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  const handlePostClick = (postId: string) => {
    router.push(`/research/${postId}`);
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-3 md:p-4">
      <WindowContainer className="relative flex flex-col w-full max-w-4xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20 shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="science" className="text-primary" size={16} />
            <h3 className="text-white text-sm font-bold tracking-[0.1em]">
              RESEARCH_LAB [KAZE_OS]
            </h3>
          </div>
          <div className="flex gap-2">
            <button className="text-primary/70 hover:text-primary transition-colors">
              <Icon name="minimize" size={18} />
            </button>
            <button className="text-primary/70 hover:text-primary transition-colors">
              <Icon name="crop_square" size={18} />
            </button>
            <button
              onClick={() => router.push("/")}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 min-h-0 custom-scrollbar">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-primary/60 text-[10px] font-mono uppercase tracking-widest">
                  Database Status: Online
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Research <span className="text-primary">Logs</span>
              </h1>
              <p className="text-gray-400 text-xs mt-1">
                Kadir&apos;s Archives • AI Experiments • Hydroponic Systems
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Icon
                  name="search"
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary/50"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-2 bg-[#0d1a1a] border border-primary/30 rounded text-xs text-primary placeholder-primary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all w-48 md:w-64 font-mono"
                  placeholder="Search entries..."
                />
              </div>
              <button className="px-3 py-2 bg-primary hover:bg-primary/90 text-background-dark border border-primary rounded text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,244,244,0.3)] flex items-center gap-1.5">
                <Icon name="rss_feed" size={14} />
                Subscribe
              </button>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Directory */}
              <div className="rounded-lg border border-primary/20 bg-[#0d1a1a]/50 backdrop-blur-sm p-1">
                <div className="bg-primary/10 px-2 py-1.5 border-b border-primary/10 mb-2">
                  <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">
                    Directory
                  </h3>
                </div>
                <nav className="flex flex-col gap-1 p-2">
                  {directories.map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setSelectedDirectory(dir)}
                      className={`flex items-center gap-2 px-2 py-1.5 text-xs font-mono rounded transition-colors ${
                        selectedDirectory === dir
                          ? "text-primary bg-primary/10 border border-primary/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon
                        name={
                          selectedDirectory === dir ? "folder_open" : "folder"
                        }
                        size={14}
                      />
                      {dir}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Common Keywords */}
              <div className="rounded-lg border border-primary/20 bg-[#0d1a1a]/50 backdrop-blur-sm p-3">
                <h3 className="text-[10px] font-bold text-primary/70 uppercase tracking-widest mb-3">
                  Common Keywords
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.map((keyword) => (
                    <button
                      key={keyword}
                      className="px-2 py-0.5 text-[9px] font-mono border border-primary/30 text-primary/80 rounded bg-primary/5 hover:bg-primary/20 cursor-pointer transition-colors"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>

              {/* System Stats */}
              <div className="rounded-lg border border-primary/20 bg-black/60 p-3 font-mono text-[9px] text-gray-500">
                <div className="flex justify-between mb-1">
                  <span>SENSORS</span>
                  <span className="text-emerald-500">OK</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>DATABASE</span>
                  <span className="text-emerald-500">CONNECTED</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>UPTIME</span>
                  <span className="text-primary">42d 12h</span>
                </div>
                <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full animate-pulse"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 flex flex-col gap-4">
              {/* Featured Post */}
              {featuredPost && (
                <div
                  onClick={() => handlePostClick(featuredPost.id)}
                  className="group relative rounded-lg border border-primary/30 bg-[#0d1a1a]/80 overflow-hidden hover:border-primary/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a1a] via-[#0d1a1a]/90 to-transparent z-10" />
                  {featuredPost.imageUrl && (
                    <div
                      className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${featuredPost.imageUrl}')`,
                      }}
                    />
                  )}
                  <div className="relative z-20 p-4 md:p-6 flex flex-col h-full justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider rounded">
                        Featured
                      </span>
                      <span className="text-primary/60 font-mono text-[10px]">
                        LOG_ID: {featuredPost.date}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-300 mb-4 max-w-2xl text-xs md:text-sm leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-background-dark border border-primary/50 rounded font-bold text-xs transition-all flex items-center gap-1.5">
                        Read Entry
                        <Icon name="arrow_forward" size={14} />
                      </button>
                      {featuredPost.comments && (
                        <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                          <Icon name="comment" size={12} />
                          {featuredPost.comments} comments
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              <div className="space-y-3">
                {regularPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="flex flex-col md:flex-row gap-3 p-3 rounded-lg border border-primary/20 bg-[#0d1a1a]/40 hover:bg-[#0d1a1a] hover:border-primary/40 transition-all group cursor-pointer"
                  >
                    <div className="md:w-40 shrink-0 flex flex-col justify-center border-b md:border-b-0 md:border-r border-primary/10 pb-3 md:pb-0 md:pr-3">
                      <span className="text-primary/50 font-mono text-[10px] mb-1">
                        {post.date}
                      </span>
                      <span className="text-white font-bold text-xs">
                        {post.category}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] text-primary/70 bg-primary/5 px-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-gray-200 group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[9px] font-mono text-gray-600">
                          Time to read: {post.readTime}
                        </span>
                        <button className="text-primary hover:text-white text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                          Access Data
                          <Icon name="chevron_right" size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center pt-3 border-t border-primary/10">
                <span className="text-[10px] text-gray-500 font-mono">
                  Showing 1-{regularPosts.length} of {blogPosts.length} entries
                </span>
                <div className="flex gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    className="w-7 h-7 flex items-center justify-center rounded border border-primary/30 text-primary/50 hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="chevron_left" size={12} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-primary text-background-dark bg-primary font-bold text-[10px]">
                    1
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-primary/30 text-primary hover:border-primary hover:bg-primary/10 transition-colors text-[10px] font-mono">
                    2
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-primary/30 text-primary hover:border-primary hover:bg-primary/10 transition-colors text-[10px] font-mono">
                    3
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-primary/30 text-primary hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors">
                    <Icon name="chevron_right" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar Footer */}
        <div className="bg-[#102222] border-t border-primary/10 px-4 py-1 flex justify-between items-center text-[10px] text-primary/60 font-mono select-none">
          <div className="flex gap-4">
            <span>MEM: 64TB FREE</span>
            <span>NET: CONNECTED (SECURE)</span>
          </div>
          <div>KAZE_OS v2.4.0</div>
        </div>
      </WindowContainer>
    </div>
  );
}
