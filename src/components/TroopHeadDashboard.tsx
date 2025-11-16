import { useState } from "react";
import { Mic, Crosshair, MapPin, Battery, Signal, Video, Thermometer, Eye } from "lucide-react";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { VantaBackground } from "./VantaBackground";

interface TroopHeadDashboardProps {
  troopId: string;
  onViewProfile: () => void;
}

export function TroopHeadDashboard({ troopId, onViewProfile }: TroopHeadDashboardProps) {
  const [viewMode, setViewMode] = useState<"normal" | "ir" | "thermal">("normal");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const troopHead = {
    name: "Lt. Rajesh Kumar",
    designation: "Alpha Squad Leader",
    rank: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    latitude: "28.6139° N",
    longitude: "77.2090° E",
    battery: 87,
    signal: 4,
    resolution: "1920x1080",
    frameRate: "30 fps",
    bitrate: "2.5 Mbps",
    codec: "H.264",
  };

  const getViewModeOverlay = () => {
    if (viewMode === "ir") {
      return "bg-gradient-to-b from-green-500/20 to-green-900/20";
    } else if (viewMode === "thermal") {
      return "bg-gradient-to-b from-red-500/20 to-orange-900/20";
    }
    return "";
  };

  return (
    <VantaBackground>
      <div className="min-h-screen w-full p-6">
        {/* Primary Header */}
        <div
          className="flex items-center justify-between mb-6 p-4 rounded-xl"
          style={{
            background: "#1a2830",
            border: "1px solid #2a3c47",
          }}
        >
          <div className="flex items-center gap-4">
            <Avatar
              className="w-16 h-16 cursor-pointer ring-2 ring-[#00ffd0] ring-offset-2 ring-offset-[#131c23]"
              onClick={onViewProfile}
            >
              <AvatarImage src={troopHead.avatar} />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div>
              <h2
                className="mb-1"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {troopHead.name}
              </h2>
              <p className="text-sm text-gray-400">{troopHead.designation}</p>
            </div>
            <div className="flex gap-1 ml-4">
              {[...Array(troopHead.rank)].map((_, i) => (
                <svg key={i} className="w-5 h-5" fill="#00ffd0" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Minimized Live Feed Window */}
          <div
            className="w-64 h-36 rounded-lg overflow-hidden relative"
            style={{
              background: "#131c23",
              border: "1px solid #2a3c47",
            }}
          >
            <video
              src={troopHead.videoUrl}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
            <div
              className="absolute bottom-2 left-2 px-2 py-1 rounded text-xs"
              style={{
                background: "rgba(0, 255, 208, 0.2)",
                border: "1px solid #00ffd0",
                color: "#00ffd0",
              }}
            >
              SECONDARY VIEW
            </div>
          </div>
        </div>

        {/* Split Main Area */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left: Camera Section (60%) */}
          <div className="col-span-2 space-y-4">
            {/* Camera Feed */}
            <div
              className="rounded-xl overflow-hidden relative"
              style={{
                background: "#1a2830",
                border: "1px solid #2a3c47",
              }}
            >
              <div className="relative aspect-video">
                <video
                  src={troopHead.videoUrl}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />
                {/* View Mode Overlay */}
                <div className={`absolute inset-0 ${getViewModeOverlay()} pointer-events-none`} />

                {/* Sniper Target Crosshair Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Outer crosshair circle */}
                    <svg
                      className="absolute w-[400px] h-[400px]"
                      viewBox="0 0 400 400"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Main circle */}
                      <circle
                        cx="200"
                        cy="200"
                        r="150"
                        fill="none"
                        stroke="#00ffd0"
                        strokeWidth="2"
                        opacity="0.6"
                      />
                      {/* Inner circle */}
                      <circle
                        cx="200"
                        cy="200"
                        r="100"
                        fill="none"
                        stroke="#00ffd0"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                      {/* Center dot */}
                      <circle
                        cx="200"
                        cy="200"
                        r="3"
                        fill="#00ffd0"
                        opacity="0.8"
                      />
                      {/* Crosshair lines - Horizontal */}
                      <line
                        x1="0"
                        y1="200"
                        x2="80"
                        y2="200"
                        stroke="#00ffd0"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <line
                        x1="320"
                        y1="200"
                        x2="400"
                        y2="200"
                        stroke="#00ffd0"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      {/* Crosshair lines - Vertical */}
                      <line
                        x1="200"
                        y1="0"
                        x2="200"
                        y2="80"
                        stroke="#00ffd0"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <line
                        x1="200"
                        y1="320"
                        x2="200"
                        y2="400"
                        stroke="#00ffd0"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      {/* Tick marks on outer circle */}
                      <line x1="200" y1="50" x2="200" y2="60" stroke="#00ffd0" strokeWidth="1.5" opacity="0.5" />
                      <line x1="200" y1="340" x2="200" y2="350" stroke="#00ffd0" strokeWidth="1.5" opacity="0.5" />
                      <line x1="50" y1="200" x2="60" y2="200" stroke="#00ffd0" strokeWidth="1.5" opacity="0.5" />
                      <line x1="340" y1="200" x2="350" y2="200" stroke="#00ffd0" strokeWidth="1.5" opacity="0.5" />
                      
                      {/* Corner brackets */}
                      <path d="M 50 80 L 50 50 L 80 50" stroke="#00ffd0" strokeWidth="2" fill="none" opacity="0.4" />
                      <path d="M 320 50 L 350 50 L 350 80" stroke="#00ffd0" strokeWidth="2" fill="none" opacity="0.4" />
                      <path d="M 350 320 L 350 350 L 320 350" stroke="#00ffd0" strokeWidth="2" fill="none" opacity="0.4" />
                      <path d="M 80 350 L 50 350 L 50 320" stroke="#00ffd0" strokeWidth="2" fill="none" opacity="0.4" />
                    </svg>
                  </div>
                </div>

                {/* Top Left: View Mode Toggles */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={() => setViewMode(viewMode === "ir" ? "normal" : "ir")}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                      viewMode === "ir" ? "ring-2 ring-[#00ffd0]" : ""
                    }`}
                    style={{
                      background: viewMode === "ir" ? "rgba(0, 255, 208, 0.2)" : "rgba(26, 40, 48, 0.8)",
                      border: `1px solid ${viewMode === "ir" ? "#00ffd0" : "#2a3c47"}`,
                      color: viewMode === "ir" ? "#00ffd0" : "#ffffff",
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    IR VIEW
                  </button>
                  <button
                    onClick={() => setViewMode(viewMode === "thermal" ? "normal" : "thermal")}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                      viewMode === "thermal" ? "ring-2 ring-[#00ffd0]" : ""
                    }`}
                    style={{
                      background: viewMode === "thermal" ? "rgba(231, 51, 51, 0.2)" : "rgba(26, 40, 48, 0.8)",
                      border: `1px solid ${viewMode === "thermal" ? "#e73333" : "#2a3c47"}`,
                      color: viewMode === "thermal" ? "#e73333" : "#ffffff",
                    }}
                  >
                    <Thermometer className="w-4 h-4" />
                    THERMAL
                  </button>
                </div>

                {/* Top Right: Location */}
                <div
                  className="absolute top-4 right-4 px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: "rgba(26, 40, 48, 0.9)",
                    border: "1px solid #00ffd0",
                  }}
                >
                  <div className="flex items-center gap-2 text-[#00ffd0]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">
                      {troopHead.latitude}, {troopHead.longitude}
                    </span>
                  </div>
                </div>

                {/* Bottom Right: Status Cards */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <div
                    className="px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                    style={{
                      background: "rgba(26, 40, 48, 0.9)",
                      border: "1px solid #2a3c47",
                    }}
                  >
                    <span className="text-gray-400 text-xs">Time:</span>
                    <span className="text-[#00ffd0] font-mono">{formatTime(currentTime)}</span>
                  </div>
                  <div
                    className="px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                    style={{
                      background: "rgba(26, 40, 48, 0.9)",
                      border: "1px solid #2a3c47",
                    }}
                  >
                    <Battery className="w-4 h-4 text-[#00ffd0]" />
                    <span className="text-white">{troopHead.battery}%</span>
                  </div>
                  <div
                    className="px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                    style={{
                      background: "rgba(26, 40, 48, 0.9)",
                      border: "1px solid #2a3c47",
                    }}
                  >
                    <Signal className="w-4 h-4 text-[#00ffd0]" />
                    <span className="text-white">{troopHead.signal}/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: "#1a2830",
                border: "1px solid #2a3c47",
              }}
            >
              <h3 className="text-sm text-gray-400 mb-3 tracking-wider">STREAM STATISTICS</h3>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Resolution</p>
                  <p className="text-sm text-[#00ffd0]">{troopHead.resolution}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Frame Rate</p>
                  <p className="text-sm text-[#00ffd0]">{troopHead.frameRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bitrate</p>
                  <p className="text-sm text-[#00ffd0]">{troopHead.bitrate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Codec</p>
                  <p className="text-sm text-[#00ffd0]">{troopHead.codec}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tactical Map Section (40%) */}
          <div className="space-y-4">
            {/* Tactical Map */}
            <div
              className="rounded-xl p-6 h-[500px] relative overflow-hidden"
              style={{
                background: "#1a2830",
                border: "1px solid #2a3c47",
              }}
            >
              <h3
                className="mb-4 tracking-wider"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "1rem",
                  color: "#00ffd0",
                }}
              >
                TACTICAL MAP
              </h3>

              {/* Map Grid Background */}
              <div
                className="absolute inset-6 rounded-lg"
                style={{
                  background: `
                    linear-gradient(to right, rgba(0, 255, 208, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 255, 208, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Compass Overlay */}
                <div className="absolute top-4 right-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(26, 40, 48, 0.9)",
                      border: "2px solid #00ffd0",
                    }}
                  >
                    <div className="text-center">
                      <span className="text-[#00ffd0] text-xs font-bold">N</span>
                      <div className="text-[10px] text-gray-400 mt-1">045°</div>
                    </div>
                  </div>
                </div>

                {/* GPS Indicators */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing Circles */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "-40px",
                        background: "rgba(0, 255, 208, 0.2)",
                        border: "2px solid #00ffd0",
                      }}
                    />
                    <div
                      className="relative rounded-full flex items-center justify-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#00ffd0",
                        boxShadow: "0 0 20px rgba(0, 255, 208, 0.6)",
                      }}
                    >
                      <MapPin className="w-6 h-6 text-[#131c23]" />
                    </div>
                  </div>
                </div>

                {/* Path Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <path
                    d="M 50 400 Q 150 300, 250 200 T 350 100"
                    stroke="#00ffd0"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.4"
                  />
                </svg>

                {/* Target Dots */}
                <div
                  className="absolute"
                  style={{ top: "20%", left: "30%" }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#00ffd0] opacity-60" />
                </div>
                <div
                  className="absolute"
                  style={{ top: "60%", left: "70%" }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#00ffd0] opacity-60" />
                </div>
              </div>
            </div>

            {/* Tap to Speak Button */}
            <button
              className="w-full py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #e73333 0%, #c42a2a 100%)",
                border: "1px solid #e73333",
                boxShadow: "0 0 30px rgba(231, 51, 51, 0.4)",
              }}
            >
              <Mic className="w-6 h-6 text-white" />
              <span
                className="text-white tracking-wider"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                TAP TO SPEAK
              </span>
            </button>
          </div>
        </div>
      </div>
    </VantaBackground>
  );
}