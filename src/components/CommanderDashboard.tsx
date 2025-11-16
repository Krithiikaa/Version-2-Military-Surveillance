import { useState } from "react";
import { Mic, Map, MapPin, Video } from "lucide-react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { VantaBackground } from "./VantaBackground";

interface TroopCommander {
  id: string;
  name: string;
  designation: string;
  rank: number;
  isActive: boolean;
  videoUrl?: string;
  latitude: string;
  longitude: string;
}

interface CommanderDashboardProps {
  onSelectTroop: (id: string) => void;
}

const mockTroops: TroopCommander[] = [
  {
    id: "1",
    name: "Lt. Rajesh Kumar",
    designation: "Alpha Squad Leader",
    rank: 4,
    isActive: true,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    latitude: "28.6139° N",
    longitude: "77.2090° E",
  },
  {
    id: "2",
    name: "Cpt. Arjun Singh",
    designation: "Bravo Team Lead",
    rank: 5,
    isActive: false,
    latitude: "28.6141° N",
    longitude: "77.2095° E",
  },
  {
    id: "3",
    name: "Maj. Vikram Batra",
    designation: "Charlie Unit Chief",
    rank: 5,
    isActive: true,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    latitude: "28.6145° N",
    longitude: "77.2088° E",
  },
  {
    id: "4",
    name: "Lt. Priya Sharma",
    designation: "Delta Squad Leader",
    rank: 4,
    isActive: true,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    latitude: "28.6138° N",
    longitude: "77.2092° E",
  },
  {
    id: "5",
    name: "Cpt. Rohit Mehra",
    designation: "Echo Team Lead",
    rank: 4,
    isActive: false,
    latitude: "28.6142° N",
    longitude: "77.2091° E",
  },
  {
    id: "6",
    name: "Col. Aditya Rao",
    designation: "Foxtrot Commander",
    rank: 6,
    isActive: true,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    latitude: "28.6140° N",
    longitude: "77.2093° E",
  },
];

export function CommanderDashboard({ onSelectTroop }: CommanderDashboardProps) {
  const [hoveredTroop, setHoveredTroop] = useState<string | null>(null);
  const [selectedMapTroop, setSelectedMapTroop] = useState<TroopCommander | null>(null);

  return (
    <VantaBackground>
      <div className="min-h-screen w-full p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="mb-2"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "2rem",
              fontWeight: 700,
              color: "#00ffd0",
              letterSpacing: "0.1em",
            }}
          >
            TROOP COMMAND OVERVIEW
          </h1>
          <p className="text-gray-400">Real-time monitoring of all active commanders</p>
        </div>

        {/* Troop Cards Scroll Area */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {mockTroops.map((troop) => (
              <div
                key={troop.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredTroop(troop.id)}
                onMouseLeave={() => setHoveredTroop(null)}
                onClick={() => onSelectTroop(troop.id)}
              >
                {/* Hover Info Card */}
                {hoveredTroop === troop.id && (
                  <div
                    className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-20 p-4 rounded-lg w-64"
                    style={{
                      background: "rgba(26, 40, 48, 0.95)",
                      border: "1px solid #00ffd0",
                      boxShadow: "0 0 20px rgba(0, 255, 208, 0.3)",
                    }}
                  >
                    <div className="space-y-1">
                      <p className="text-white font-semibold">{troop.name}</p>
                      <p className="text-sm text-gray-400">{troop.designation}</p>
                      <div className="flex gap-4 mt-2 text-xs">
                        <span className="text-[#00ffd0]">📍 {troop.latitude}</span>
                        <span className="text-[#00ffd0]">{troop.longitude}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Main Card */}
                <div
                  className="w-80 rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "#1a2830",
                    border: "1px solid #2a3c47",
                    boxShadow:
                      hoveredTroop === troop.id
                        ? "0 8px 24px rgba(0, 255, 208, 0.2)"
                        : "0 4px 12px rgba(17, 35, 39, 0.5)",
                  }}
                >
                  {/* Video/Image Area */}
                  <div className="relative h-48 bg-gray-900">
                    {troop.isActive && troop.videoUrl ? (
                      <video
                        src={troop.videoUrl}
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <Video className="w-12 h-12 text-gray-600" />
                      </div>
                    )}
                    {/* Live Badge */}
                    {troop.isActive && (
                      <div
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs flex items-center gap-2"
                        style={{
                          background: "rgba(0, 255, 208, 0.2)",
                          border: "1px solid #00ffd0",
                          color: "#00ffd0",
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#00ffd0] animate-pulse" />
                        LIVE
                      </div>
                    )}
                    {/* Map Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMapTroop(troop);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110"
                      style={{
                        background: "rgba(26, 40, 48, 0.8)",
                        border: "1px solid #00ffd0",
                      }}
                    >
                      <MapPin className="w-5 h-5 text-[#00ffd0]" />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{troop.name}</h3>
                        <p className="text-sm text-gray-400">{troop.designation}</p>
                      </div>
                      {/* Rank Stars */}
                      <div className="flex gap-1">
                        {[...Array(troop.rank)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4"
                            fill="#00ffd0"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    {!troop.isActive ? (
                      <div className="text-center py-3">
                        <Badge
                          variant="outline"
                          className="text-gray-500 border-gray-600"
                        >
                          No Active Operation
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-xs text-[#00ffd0] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ffd0] animate-pulse" />
                        Operation in Progress
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tap to Speak Button */}
        <div className="flex justify-center">
          <button
            className="group relative"
            style={{
              width: "200px",
              height: "200px",
            }}
          >
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: "radial-gradient(circle, rgba(231, 51, 51, 0.3) 0%, rgba(231, 51, 51, 0) 70%)",
              }}
            />
            <div
              className="absolute inset-4 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #e73333 0%, #c42a2a 100%)",
                boxShadow: "0 0 40px rgba(231, 51, 51, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="text-center">
                <Mic className="w-12 h-12 text-white mx-auto mb-2" />
                <span
                  className="text-white tracking-wider"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  TAP TO<br />SPEAK
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Map Dialog */}
        <Dialog open={!!selectedMapTroop} onOpenChange={() => setSelectedMapTroop(null)}>
          <DialogContent
            className="max-w-4xl"
            style={{
              background: "#1a2830",
              border: "1px solid #00ffd0",
            }}
          >
            {selectedMapTroop && (
              <div>
                <DialogTitle
                  className="mb-4"
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "1.5rem",
                    color: "#00ffd0",
                  }}
                >
                  {selectedMapTroop.name} - Location Tracker
                </DialogTitle>
                <DialogDescription>
                  <div className="space-y-4">
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-400">Latitude:</span>
                      <span className="text-[#00ffd0]">{selectedMapTroop.latitude}</span>
                      <span className="text-gray-400">Longitude:</span>
                      <span className="text-[#00ffd0]">{selectedMapTroop.longitude}</span>
                    </div>
                    <div
                      className="w-full h-96 rounded-lg flex items-center justify-center"
                      style={{
                        background: "#131c23",
                        border: "1px solid #2a3c47",
                      }}
                    >
                      <div className="text-center">
                        <Map className="w-16 h-16 text-[#00ffd0] mx-auto mb-4" />
                        <p className="text-gray-400">Tactical Map View</p>
                        <p className="text-sm text-gray-500 mt-2">
                          GPS Tracking: {selectedMapTroop.latitude}, {selectedMapTroop.longitude}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogDescription>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </VantaBackground>
  );
}