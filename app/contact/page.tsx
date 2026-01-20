"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { WindowContainer } from "@/components/ui/WindowContainer";

type Channel = "direct" | "social" | "scheduling";

export default function Contact() {
  const router = useRouter();
  const [channel, setChannel] = useState<Channel>("direct");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Calendar state
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );
  const [selectedTimeSlot, setSelectedTimeSlot] =
    useState<string>("14:00 - 14:30");

  // Calendar calculations
  const monthNames = useMemo(
    () => [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ],
    []
  );

  const calendarData = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Convert to Monday = 0 format
    const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    return {
      daysInMonth,
      startingDay,
      monthName: monthNames[currentMonth],
      year: currentYear,
    };
  }, [currentMonth, currentYear, monthNames]);

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const isToday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const isAvailable = (day: number) => {
    // Example: First 5 days of month are available
    return day >= 1 && day <= 5;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    alert("Transmission initiated! (Form submission coming soon)");
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-3 md:p-4">
      <WindowContainer className="relative flex flex-col w-full max-w-4xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Window Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20">
          <div className="flex items-center gap-2">
            <Icon name="terminal" className="text-primary" size={16} />
            <h3 className="text-white text-sm font-bold tracking-[0.1em]">
              {/* SECURE_COMMS_LINK_V2.0 */}
            </h3>
            <div className="ml-3 flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded text-[9px] text-primary font-mono border border-primary/20">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              ONLINE
            </div>
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

        {/* Window Body */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row min-h-0 max-h-full">
          {/* Left Sidebar: Channel Select */}
          <div className="w-full md:w-64 bg-surface-dark/50 border-r border-primary/10 flex flex-col p-3 md:p-4 gap-3 overflow-y-auto flex-shrink-0 min-h-0">
            <div>
              <p className="text-[10px] text-accent-text tracking-widest mb-3 font-mono">
                CHANNEL_SELECT
              </p>
              <div className="flex flex-col gap-2">
                {/* DIRECT_UPLINK */}
                <label
                  className={`group relative flex items-center gap-2 rounded border p-2 cursor-pointer transition-all ${
                    channel === "direct"
                      ? "border-primary/40 bg-primary/10"
                      : "border-transparent hover:border-border-color hover:bg-[#152a2a]"
                  }`}
                >
                  <input
                    checked={channel === "direct"}
                    onChange={() => setChannel("direct")}
                    className="hidden peer"
                    name="nav"
                    type="radio"
                  />
                  {channel === "direct" && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                  )}
                  <Icon
                    name="alternate_email"
                    size={16}
                    className={
                      channel === "direct"
                        ? "text-primary"
                        : "text-accent-text group-hover:text-white"
                    }
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight tracking-wider ${
                        channel === "direct"
                          ? "text-white"
                          : "text-accent-text group-hover:text-white transition-colors"
                      }`}
                    >
                      &gt; DIRECT_UPLINK
                    </p>
                    {channel === "direct" && (
                      <p className="text-[9px] text-primary/70 mt-0.5">
                        Encrypted Email
                      </p>
                    )}
                  </div>
                </label>

                {/* SOCIAL_NET */}
                <label
                  className={`group relative flex items-center gap-2 rounded border p-2 cursor-pointer transition-all ${
                    channel === "social"
                      ? "border-primary/40 bg-primary/10"
                      : "border-transparent hover:border-border-color hover:bg-[#152a2a]"
                  }`}
                >
                  <input
                    checked={channel === "social"}
                    onChange={() => setChannel("social")}
                    className="hidden peer"
                    name="nav"
                    type="radio"
                  />
                  {channel === "social" && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                  )}
                  <Icon
                    name="share"
                    size={16}
                    className={
                      channel === "social"
                        ? "text-primary"
                        : "text-accent-text group-hover:text-white"
                    }
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight tracking-wider ${
                        channel === "social"
                          ? "text-white"
                          : "text-accent-text group-hover:text-white transition-colors"
                      }`}
                    >
                      &gt; SOCIAL_NET
                    </p>
                    {channel === "social" && (
                      <p className="text-[9px] text-primary/70 mt-0.5">
                        External Connections
                      </p>
                    )}
                  </div>
                </label>

                {/* SCHEDULING */}
                <label
                  className={`group relative flex items-center gap-2 rounded border p-2 cursor-pointer transition-all ${
                    channel === "scheduling"
                      ? "border-primary/40 bg-primary/10"
                      : "border-transparent hover:border-border-color hover:bg-[#152a2a]"
                  }`}
                >
                  <input
                    checked={channel === "scheduling"}
                    onChange={() => setChannel("scheduling")}
                    className="hidden peer"
                    name="nav"
                    type="radio"
                  />
                  {channel === "scheduling" && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                  )}
                  <Icon
                    name="calendar_month"
                    size={16}
                    className={
                      channel === "scheduling"
                        ? "text-primary"
                        : "text-accent-text group-hover:text-white"
                    }
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight tracking-wider ${
                        channel === "scheduling"
                          ? "text-white"
                          : "text-accent-text group-hover:text-white transition-colors"
                      }`}
                    >
                      &gt; SCHEDULING
                    </p>
                    {channel === "scheduling" && (
                      <p className="text-[9px] text-primary/70 mt-0.5">
                        Neural Sync
                      </p>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* System Stats */}
            <div className="mt-auto pt-3 border-t border-primary/10">
              <div className="p-2 bg-black/20 rounded border border-border-color space-y-2">
                <div className="flex justify-between text-[10px] text-accent-text font-mono">
                  <span>CPU_LOAD</span>
                  <span>
                    {channel === "social"
                      ? "15%"
                      : channel === "scheduling"
                      ? "15%"
                      : "12%"}
                  </span>
                </div>
                <div className="w-full bg-border-color h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{
                      width:
                        channel === "social"
                          ? "15%"
                          : channel === "scheduling"
                          ? "15%"
                          : "12%",
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-accent-text font-mono">
                  <span>MEM_USAGE</span>
                  <span>
                    {channel === "social"
                      ? "482MB"
                      : channel === "scheduling"
                      ? "512MB"
                      : "428MB"}
                  </span>
                </div>
                <div className="w-full bg-border-color h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{
                      width:
                        channel === "social"
                          ? "38%"
                          : channel === "scheduling"
                          ? "40%"
                          : "35%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Main Interface */}
          <div className="flex-1 flex flex-col bg-background-dark/30 min-h-0 overflow-hidden">
            {channel === "direct" ? (
              <>
                {/* Info Header */}
                <div className="p-3 md:p-4 border-b border-border-color/50 flex-shrink-0">
                  <h1 className="text-white text-lg md:text-xl font-bold tracking-tight mb-3 flex items-center gap-2">
                    <span className="text-primary">&gt;</span> DIRECT_UPLINK
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-[#0d1f1f] p-3 rounded border border-border-color relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-20">
                      <Icon
                        name="lock"
                        size={32}
                        className="text-border-color"
                      />
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-accent-text text-[9px] uppercase tracking-widest">
                        Target Node
                      </span>
                      <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                        KADIR [ADMIN]
                        <Icon
                          name="verified"
                          size={12}
                          className="text-primary"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-accent-text text-[9px] uppercase tracking-widest">
                        Encryption Protocol
                      </span>
                      <span className="text-primary font-bold text-xs">
                        AES-256 (STANDARD)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Area */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 min-h-0">
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 max-w-2xl"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Sender ID */}
                      <label className="flex flex-col gap-1.5 group">
                        <span className="text-accent-text text-[10px] font-bold tracking-wider group-focus-within:text-primary transition-colors">
                          SENDER_ID (NAME)
                        </span>
                        <div className="relative">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-[#152a2a] border border-border-color text-white rounded p-2.5 pl-9 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 font-mono text-xs h-10"
                            placeholder="Identify yourself..."
                          />
                          <Icon
                            name="person"
                            size={14}
                            className="absolute left-2.5 top-2.5 text-accent-text/50"
                          />
                        </div>
                      </label>

                      {/* Return Address */}
                      <label className="flex flex-col gap-1.5 group">
                        <span className="text-accent-text text-[10px] font-bold tracking-wider group-focus-within:text-primary transition-colors">
                          RETURN_ADDRESS (EMAIL)
                        </span>
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#152a2a] border border-border-color text-white rounded p-2.5 pl-9 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 font-mono text-xs h-10"
                            placeholder="freq@domain.com"
                          />
                          <Icon
                            name="mail"
                            size={14}
                            className="absolute left-2.5 top-2.5 text-accent-text/50"
                          />
                        </div>
                      </label>
                    </div>

                    {/* Data Packet (Message) */}
                    <label className="flex flex-col gap-1.5 group flex-1">
                      <div className="flex justify-between items-end">
                        <span className="text-accent-text text-[10px] font-bold tracking-wider group-focus-within:text-primary transition-colors">
                          DATA_PACKET (MESSAGE)
                        </span>
                        <span className="text-[9px] text-accent-text/50 font-mono">
                          TXT_ONLY
                        </span>
                      </div>
                      <div className="relative flex-1">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full min-h-[120px] bg-[#152a2a] border border-border-color text-white rounded p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600 font-mono text-xs resize-y leading-relaxed"
                          placeholder="Initialize message sequence..."
                        />
                        {/* Corner decorations */}
                        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-r border-b border-primary/50 pointer-events-none" />
                        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-l border-b border-primary/50 pointer-events-none" />
                        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-r border-t border-primary/50 pointer-events-none" />
                        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-l border-t border-primary/50 pointer-events-none" />
                      </div>
                    </label>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-color/30 mt-1">
                      <div className="text-[9px] text-accent-text font-mono flex items-center gap-1.5">
                        <Icon name="info" size={12} />
                        All transmissions are logged securely.
                      </div>
                      <button
                        type="submit"
                        className="relative overflow-hidden group bg-primary hover:bg-[#aefbfb] text-background-dark font-bold py-2 px-6 rounded flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs"
                      >
                        <Icon
                          name="send"
                          size={16}
                          className="group-hover:animate-ping absolute left-3 opacity-0 group-hover:opacity-20"
                        />
                        <Icon name="send" size={16} />
                        <span className="tracking-wider">
                          INITIATE_TRANSMISSION
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : channel === "social" ? (
              <>
                {/* Info Header */}
                <div className="p-3 md:p-4 border-b border-border-color/50 flex-shrink-0">
                  <h1 className="text-white text-lg md:text-xl font-bold tracking-tight mb-3 flex items-center gap-2">
                    <span className="text-primary">&gt;</span> SOCIAL_NET
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-[#0d1f1f] p-3 rounded border border-border-color relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-20">
                      <Icon
                        name="hub"
                        size={32}
                        className="text-border-color"
                      />
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-accent-text text-[9px] uppercase tracking-widest">
                        Network Status
                      </span>
                      <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                        BROADCASTING
                        <Icon
                          name="wifi"
                          size={12}
                          className="text-primary animate-pulse"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-accent-text text-[9px] uppercase tracking-widest">
                        Security Level
                      </span>
                      <span className="text-primary font-bold text-xs">
                        PUBLIC_ACCESS (READ-ONLY)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Cards */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 min-h-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl">
                    {/* GitHub Card */}
                    <a
                      href="https://github.com/8kaze8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-[#152a2a] border border-border-color hover:border-primary/50 transition-all duration-300 rounded overflow-hidden flex flex-col"
                    >
                      <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                      <div className="relative p-4 flex items-center gap-3 z-10">
                        <div className="size-10 rounded bg-black/40 border border-border-color group-hover:border-primary/50 flex items-center justify-center text-accent-text group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                          <Icon name="terminal" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-bold tracking-wider text-xs">
                              GITHUB_REPO
                            </h3>
                            <Icon
                              name="arrow_outward"
                              size={14}
                              className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                            />
                          </div>
                          <div className="text-accent-text text-[10px] font-mono truncate opacity-70">
                            git remote -v origin
                          </div>
                        </div>
                      </div>
                      <div className="relative px-4 pb-2 pt-0 mt-auto z-10">
                        <div className="flex justify-between items-center text-[9px] font-mono text-accent-text/60 mb-1">
                          <span>LAST_COMMIT</span>
                          <span>2h_AGO</span>
                        </div>
                        <div className="w-full bg-black/30 h-1 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[85%] group-hover:w-full transition-all duration-700" />
                        </div>
                      </div>
                    </a>

                    {/* LinkedIn Card */}
                    <a
                      href="https://linkedin.com/in/kadirzeyrek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-[#152a2a] border border-border-color hover:border-primary/50 transition-all duration-300 rounded overflow-hidden flex flex-col"
                    >
                      <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                      <div className="relative p-4 flex items-center gap-3 z-10">
                        <div className="size-10 rounded bg-black/40 border border-border-color group-hover:border-primary/50 flex items-center justify-center text-accent-text group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                          <Icon name="business_center" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-bold tracking-wider text-xs">
                              LINKEDIN_PRO
                            </h3>
                            <Icon
                              name="arrow_outward"
                              size={14}
                              className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                            />
                          </div>
                          <div className="text-accent-text text-[10px] font-mono truncate opacity-70">
                            /network/professional
                          </div>
                        </div>
                      </div>
                      <div className="relative px-4 pb-2 pt-0 mt-auto z-10">
                        <div className="flex justify-between items-center text-[9px] font-mono text-accent-text/60 mb-1">
                          <span>CONNECTIONS</span>
                          <span>500+</span>
                        </div>
                        <div className="w-full bg-black/30 h-1 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full w-[65%] group-hover:w-full transition-all duration-700" />
                        </div>
                      </div>
                    </a>

                    {/* X/Twitter Card */}
                    <a
                      href="https://x.com/kadir_dev_ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-[#152a2a] border border-border-color hover:border-primary/50 transition-all duration-300 rounded overflow-hidden flex flex-col"
                    >
                      <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                      <div className="relative p-4 flex items-center gap-3 z-10">
                        <div className="size-10 rounded bg-black/40 border border-border-color group-hover:border-primary/50 flex items-center justify-center text-accent-text group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                          <Icon name="tag" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-bold tracking-wider text-xs">
                              X_FEED
                            </h3>
                            <Icon
                              name="arrow_outward"
                              size={14}
                              className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                            />
                          </div>
                          <div className="text-accent-text text-[10px] font-mono truncate opacity-70">
                            @kadir_dev_ai
                          </div>
                        </div>
                      </div>
                      <div className="relative px-4 pb-2 pt-0 mt-auto z-10">
                        <div className="flex justify-between items-center text-[9px] font-mono text-accent-text/60 mb-1">
                          <span>STREAM_STATUS</span>
                          <span>LIVE</span>
                        </div>
                        <div className="w-full bg-black/30 h-1 rounded-full overflow-hidden">
                          <div className="bg-white/80 h-full w-[45%] group-hover:w-[60%] transition-all duration-700" />
                        </div>
                      </div>
                    </a>

                    {/* Portfolio Card */}
                    <a
                      href="https://kadir.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-[#152a2a] border border-border-color hover:border-primary/50 transition-all duration-300 rounded overflow-hidden flex flex-col"
                    >
                      <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                      <div className="relative p-4 flex items-center gap-3 z-10">
                        <div className="size-10 rounded bg-black/40 border border-border-color group-hover:border-primary/50 flex items-center justify-center text-accent-text group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                          <Icon name="language" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-white font-bold tracking-wider text-xs">
                              WEB_PORTFOLIO
                            </h3>
                            <Icon
                              name="arrow_outward"
                              size={14}
                              className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"
                            />
                          </div>
                          <div className="text-accent-text text-[10px] font-mono truncate opacity-70">
                            https://kadir.io
                          </div>
                        </div>
                      </div>
                      <div className="relative px-4 pb-2 pt-0 mt-auto z-10">
                        <div className="flex justify-between items-center text-[9px] font-mono text-accent-text/60 mb-1">
                          <span>UPTIME</span>
                          <span>99.9%</span>
                        </div>
                        <div className="w-full bg-black/30 h-1 rounded-full overflow-hidden">
                          <div className="bg-primary h-full w-[99%]" />
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Console Log */}
                  <div className="mt-6 max-w-3xl bg-black/30 border border-border-color/50 rounded p-3 font-mono text-xs text-accent-text/80 space-y-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-30">
                      <Icon name="terminal" size={14} />
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-emerald-500">➜</span>
                      <span>scanning_frequencies...</span>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-blue-500">ℹ</span>
                      <span>[INFO] Uplink established with Github API v3</span>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-blue-500">ℹ</span>
                      <span>[INFO] LinkedIn handshake verification: OK</span>
                    </div>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-yellow-500">⚠</span>
                      <span>[WARN] Twitter/X API rate limit approaching</span>
                    </div>
                    <div className="flex gap-2 text-[10px] animate-pulse">
                      <span className="text-emerald-500">➜</span>
                      <span>
                        awaiting_user_interaction_
                        <span className="animate-pulse">_</span>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : channel === "scheduling" ? (
              <>
                {/* Info Header */}
                <div className="p-3 md:p-4 border-b border-border-color/50 flex-shrink-0">
                  <h1 className="text-white text-lg md:text-xl font-bold tracking-tight mb-3 flex items-center gap-2">
                    <span className="text-primary">&gt;</span>{" "}
                    SCHEDULING_PROTOCOL
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono bg-[#0d1f1f] p-3 rounded border border-border-color relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-20">
                      <Icon
                        name="calendar_month"
                        size={32}
                        className="text-border-color"
                      />
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-accent-text text-[9px] uppercase tracking-widest">
                        Target Node
                      </span>
                      <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                        KADIR [ADMIN]
                        <Icon
                          name="verified"
                          size={12}
                          className="text-primary"
                        />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                      <span className="text-accent-text text-[9px] uppercase tracking-widest">
                        Availability Status
                      </span>
                      <span className="text-white font-bold flex items-center gap-1.5 text-xs">
                        ACCEPTING_UPLINKS
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scheduling Content */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 min-h-0">
                  <div className="max-w-4xl space-y-4">
                    {/* Calendar and Slots Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Calendar Section */}
                      <div className="bg-[#152a2a] border border-border-color rounded p-3 md:p-4">
                        <div className="flex items-center justify-between mb-3">
                          <button
                            onClick={() => navigateMonth("prev")}
                            className="text-accent-text hover:text-primary transition-colors"
                          >
                            <Icon
                              name="arrow_forward_ios"
                              size={14}
                              className="rotate-180"
                            />
                          </button>
                          <h3 className="text-white text-xs font-bold font-mono">
                            {calendarData.monthName} {calendarData.year}
                          </h3>
                          <button
                            onClick={() => navigateMonth("next")}
                            className="text-accent-text hover:text-primary transition-colors"
                          >
                            <Icon name="arrow_forward_ios" size={14} />
                          </button>
                        </div>
                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map(
                            (day) => (
                              <div
                                key={day}
                                className="text-center text-[9px] text-accent-text font-mono py-1"
                              >
                                {day}
                              </div>
                            )
                          )}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {/* Empty cells for days before month starts */}
                          {Array.from({ length: calendarData.startingDay }).map(
                            (_, i) => (
                              <div
                                key={`empty-${i}`}
                                className="aspect-square"
                              />
                            )
                          )}
                          {/* Days of the month */}
                          {Array.from(
                            { length: calendarData.daysInMonth },
                            (_, i) => i + 1
                          ).map((day) => {
                            const dayIsToday = isToday(day);
                            const dayIsSelected = isSelected(day);
                            const dayIsAvailable = isAvailable(day);
                            return (
                              <button
                                key={day}
                                onClick={() => handleDateSelect(day)}
                                className={`aspect-square rounded text-[10px] font-mono transition-all ${
                                  dayIsSelected
                                    ? "bg-primary text-background-dark font-bold"
                                    : dayIsToday
                                    ? "bg-primary/30 text-primary border-2 border-primary font-bold"
                                    : dayIsAvailable
                                    ? "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                                    : "text-accent-text/50 hover:bg-[#0d1a1a]"
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Available Slots */}
                      <div className="bg-[#152a2a] border border-border-color rounded p-3 md:p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white text-xs font-bold font-mono">
                            AVAILABLE SLOTS
                          </h3>
                          <span className="text-[9px] text-accent-text font-mono">
                            UTC+02:00
                          </span>
                        </div>
                        <div className="space-y-2 max-h-[280px] overflow-y-auto">
                          {[
                            "09:00 - 09:30",
                            "10:30 - 11:00",
                            "14:00 - 14:30",
                            "15:30 - 16:00",
                          ].map((slot) => {
                            const isSelected = slot === selectedTimeSlot;
                            return (
                              <label
                                key={slot}
                                onClick={() => setSelectedTimeSlot(slot)}
                                className={`flex items-center gap-2 p-2 rounded border cursor-pointer transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary/10"
                                    : "border-border-color hover:border-primary/50 hover:bg-[#1a3535]"
                                }`}
                              >
                                <div className="relative">
                                  <input
                                    type="radio"
                                    name="timeSlot"
                                    checked={isSelected}
                                    onChange={() => setSelectedTimeSlot(slot)}
                                    className="sr-only"
                                  />
                                  <div
                                    className={`size-4 rounded-full border-2 flex items-center justify-center ${
                                      isSelected
                                        ? "border-primary bg-primary"
                                        : "border-border-color"
                                    }`}
                                  >
                                    {isSelected && (
                                      <div className="size-2 rounded-full bg-background-dark" />
                                    )}
                                  </div>
                                </div>
                                <span className="text-white text-xs font-mono">
                                  {slot}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Selected Uplink */}
                    <div className="bg-[#0d1f1f] border border-border-color rounded p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          name="calendar_month"
                          size={16}
                          className="text-primary"
                        />
                        <div>
                          <span className="text-[9px] text-accent-text font-mono uppercase tracking-widest block">
                            Selected Uplink
                          </span>
                          <span className="text-white text-xs font-mono font-bold">
                            {monthNames[selectedDate.getMonth()]
                              .substring(0, 3)
                              .toUpperCase()}{" "}
                            {selectedDate.getDate()} @{" "}
                            {selectedTimeSlot.split(" - ")[0]}
                          </span>
                        </div>
                      </div>
                      <button className="bg-primary hover:bg-[#aefbfb] text-background-dark font-bold py-2 px-4 rounded flex items-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-xs">
                        <span className="tracking-wider">CONFIRM_SEQUENCE</span>
                        <Icon name="arrow_forward_ios" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-3 md:p-4">
                <p className="text-accent-text text-xs font-mono">
                  SCHEDULING coming soon...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar Footer */}
        <div className="bg-[#102222] border-t border-primary/10 px-4 py-1 flex justify-between items-center text-[10px] text-primary/60 font-mono select-none flex-shrink-0">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-emerald-500" />
              SYSTEM_READY
            </span>
            <span className="w-px h-3 bg-border-color" />
            <span className="hidden md:inline">LATENCY: 24ms</span>
            <span className="w-px h-3 bg-border-color hidden md:inline" />
            <span className="hidden md:inline">UPTIME: 42:10:05</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-primary">_</span>
            <span>
              {channel === "social"
                ? "DATA_STREAM_ACTIVE"
                : channel === "scheduling"
                ? "AWAITING_INPUT..."
                : "AWAITING_INPUT..."}
            </span>
          </div>
        </div>
      </WindowContainer>
    </div>
  );
}
