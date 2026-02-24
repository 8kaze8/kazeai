"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { WindowContainer } from "@/components/ui/WindowContainer";
import type { BlogPost } from "@/lib/supabase/types";

interface ResearchDetailClientProps {
  post: BlogPost;
  previousPost?: { slug: string; title: string } | null;
  nextPost?: { slug: string; title: string } | null;
}

export default function ResearchDetailClient({
  post,
  previousPost,
  nextPost,
}: ResearchDetailClientProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full w-full p-3 md:p-4">
      <WindowContainer className="relative flex flex-col w-full max-w-5xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-50 opacity-10 scanline" />

        {/* Window Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20 shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="terminal" className="text-primary" size={16} />
            <h3 className="text-white text-sm font-bold tracking-[0.1em]">
              KADIR_OS V2.0 // accessing_memory_bank...
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
              onClick={() => router.push("/about")}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Window Body */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row min-h-0 max-h-full">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-3 md:p-4 min-h-0 custom-scrollbar">
            {/* Breadcrumbs */}
            <nav className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-primary/70 font-mono mb-4">
              <button
                onClick={() => router.push("/about")}
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <Icon name="home" size={12} />
                HOME
              </button>
              <span>/</span>
              <button
                onClick={() => router.push("/about")}
                className="hover:text-primary transition-colors"
              >
                RESEARCH LAB
              </button>
              <span>/</span>
              <span className="text-white">
                POST_{post.slug.replace(/-/g, "")}
              </span>
            </nav>

            {/* Title & Meta */}
            <div className="mb-4 pb-4 border-b border-border-color">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-white mb-3">
                {post.title}
                {post.subtitle && (
                  <>
                    <br />
                    <span className="text-primary">
                      {post.subtitle}
                    </span>
                  </>
                )}
              </h1>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag, index) => (
                    <div
                      key={tag}
                      className="flex h-6 items-center justify-center gap-x-1.5 rounded border border-border-color bg-background-dark px-2 hover:border-primary transition-colors"
                    >
                      {index === 0 && (
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                      <p className="text-white text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-[9px] md:text-[10px] font-mono text-gray-400 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Icon name="person" size={10} />
                    {post.author}
                  </span>
                  <span className="w-px h-3 bg-gray-600" />
                  <span className="flex items-center gap-1">
                    <Icon name="calendar_month" size={10} />
                    {post.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            {post.image_url && (
              <div className="mb-4">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border-color">
                  <div className="absolute top-2 right-2 z-10 bg-black/70 backdrop-blur px-2 py-0.5 rounded border border-white/10">
                    <p className="text-[9px] text-primary font-mono uppercase tracking-widest">
                      IMG_RENDER_FINAL.PNG
                    </p>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${post.image_url}')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-80" />
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="space-y-4">
              {/* Introduction */}
              {post.content?.introduction && (
                <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                  {post.content.introduction}
                </p>
              )}

              {/* Sections */}
              {post.content?.sections.map((section, index) => (
                <div key={index} className="space-y-3">
                  {section.title && (
                    <h3 className="flex items-center gap-2 text-primary text-base md:text-lg font-bold">
                      {section.icon && (
                        <Icon name={section.icon} size={16} />
                      )}
                      {section.title}
                    </h3>
                  )}

                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-gray-300 text-xs md:text-sm leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Code Block */}
                  {section.codeBlock && (
                    <div className="my-4 rounded-lg overflow-hidden border border-border-color bg-[#0d1818]">
                      <div className="flex items-center justify-between px-3 py-1.5 bg-border-color/30 border-b border-border-color">
                        <span className="text-[9px] md:text-[10px] font-mono text-gray-400">
                          {section.codeBlock.filename}
                        </span>
                        <div className="flex gap-1">
                          <div className="size-1.5 rounded-full bg-red-500/50" />
                          <div className="size-1.5 rounded-full bg-yellow-500/50" />
                          <div className="size-1.5 rounded-full bg-green-500/50" />
                        </div>
                      </div>
                      <div className="p-3 overflow-x-auto">
                        <pre className="!bg-transparent !border-0 !p-0 !m-0">
                          <code className="text-[10px] md:text-xs font-mono text-gray-300 whitespace-pre">
                            {section.codeBlock.code}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Quote */}
                  {section.quote && (
                    <blockquote className="border-l-2 border-primary bg-primary/5 p-3 my-4 italic text-gray-300 rounded-r text-xs md:text-sm">
                      &quot;{section.quote}&quot;
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-border-color flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-border-color/30 text-white hover:bg-primary hover:text-black transition-all text-xs font-bold uppercase tracking-wider border border-transparent hover:border-primary">
                  <Icon name="favorite" size={14} />
                  Save to Memory
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-border-color/30 text-white hover:bg-primary hover:text-black transition-all text-xs font-bold uppercase tracking-wider border border-transparent hover:border-primary">
                  <Icon name="share" size={14} />
                  Share Protocol
                </button>
              </div>
              <span className="text-[9px] font-mono text-gray-500">
                SESSION ID: #8821-XJ
              </span>
            </div>

            {/* Pagination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {previousPost && (
                <button
                  onClick={() =>
                    router.push(`/research/${previousPost.slug}`)
                  }
                  className="group relative block p-3 bg-surface-dark border border-border-color rounded-lg hover:border-primary transition-all overflow-hidden text-left"
                >
                  <div className="absolute top-0 right-0 p-1.5 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon name="arrow_back" size={24} />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 mb-1 block">
                    PREVIOUS LOG
                  </span>
                  <h4 className="text-white text-xs font-bold group-hover:text-primary transition-colors truncate">
                    {previousPost.title}
                  </h4>
                </button>
              )}
              {nextPost && (
                <button
                  onClick={() =>
                    router.push(`/research/${nextPost.slug}`)
                  }
                  className="group relative block p-3 bg-surface-dark border border-border-color rounded-lg hover:border-primary transition-all overflow-hidden text-right"
                >
                  <div className="absolute top-0 left-0 p-1.5 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon name="arrow_forward" size={24} />
                  </div>
                  <span className="text-[9px] font-mono text-gray-500 mb-1 block">
                    NEXT LOG
                  </span>
                  <h4 className="text-white text-xs font-bold group-hover:text-primary transition-colors truncate">
                    {nextPost.title}
                  </h4>
                </button>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="hidden md:block w-48 md:w-64 border-l border-border-color bg-surface-dark/50 p-3 md:p-4 flex flex-col gap-4 overflow-y-auto flex-shrink-0 min-h-0">
            {/* Author Profile */}
            <div className="bg-[#0d1a1a] border border-border-color rounded-lg p-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 size-12 bg-primary/5 rounded-bl-full" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="size-10 rounded-full border-2 border-primary p-0.5 bg-surface-dark relative">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Icon
                      name="person"
                      size={18}
                      className="text-primary"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 border-2 border-surface-dark rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    KADIR
                  </h3>
                  <p className="text-primary text-[10px] font-mono">
                    Lvl 42. Automation Dev
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">
                Building digital bridges in the void. Obsessed with
                Python, agents, and retro aesthetics.
              </p>
              <div className="grid grid-cols-3 gap-1.5 border-t border-border-color pt-3 text-center">
                <div>
                  <span className="block text-sm font-bold text-white">
                    12
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    Projects
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-white">
                    45
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    Posts
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-white">
                    8k
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase">
                    XP
                  </span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-[#0d1a1a] border border-border-color rounded-lg p-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Icon name="list" size={12} />
                Index
              </h4>
              <ul className="space-y-2">
                {post.table_of_contents?.map((item, index) => (
                  <li key={item}>
                    <button className="flex items-center gap-2 group w-full text-left">
                      <span
                        className={`size-1.5 rounded-full ${
                          index === 0
                            ? "bg-primary shadow-[0_0_8px_rgba(37,244,244,0.8)]"
                            : "bg-border-color group-hover:bg-primary transition-colors"
                        }`}
                      />
                      <span
                        className={`text-[10px] ${
                          index === 0
                            ? "text-white group-hover:text-primary"
                            : "text-gray-400 group-hover:text-primary"
                        } transition-colors`}
                      >
                        {item}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Reading Stats */}
              <div className="mt-4 pt-4 border-t border-border-color space-y-2.5">
                <div>
                  <div className="flex justify-between text-[9px] font-mono mb-1">
                    <span className="text-primary">
                      READING_STAMINA
                    </span>
                    <span className="text-white">75%</span>
                  </div>
                  <div className="h-1 w-full bg-background-dark rounded-full overflow-hidden border border-border-color">
                    <div className="h-full bg-primary w-3/4 shadow-[0_0_10px_rgba(37,244,244,0.5)]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-mono mb-1">
                    <span className="text-blue-400">
                      COGNITIVE_LOAD
                    </span>
                    <span className="text-white">32%</span>
                  </div>
                  <div className="h-1 w-full bg-background-dark rounded-full overflow-hidden border border-border-color">
                    <div className="h-full bg-blue-400 w-1/3 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Status Bar Footer */}
        <div className="h-8 bg-[#102222] border-t border-primary/10 px-4 flex items-center justify-between text-[10px] text-primary/60 font-mono select-none shrink-0">
          <div className="flex gap-4">
            <span>Index: 82%</span>
            <span>Cache: 12MB</span>
            <span>Net: 1Gbps</span>
          </div>
          <div>
            Logged in as:{" "}
            <span className="text-primary">Kadir_Admin</span>
          </div>
        </div>
      </WindowContainer>
    </div>
  );
}
