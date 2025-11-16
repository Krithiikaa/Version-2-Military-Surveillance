import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { LogOut, User } from "lucide-react";
import { VantaBackground } from "./VantaBackground";

interface TroopMember {
  id: string;
  name: string;
  designation: string;
  avatar: string;
  isActive: boolean;
  rank: number;
}

interface AboutTroopHeadProps {
  onLogout: () => void;
  onSelectMember: (id: string) => void;
}

const troopHead = {
  name: "Lt. Rajesh Kumar",
  designation: "Alpha Squad Leader",
  rank: 4,
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
  bio: "Decorated officer with 8 years of distinguished service in tactical operations. Specialist in covert reconnaissance and strategic command. Led 15 successful missions with zero casualties.",
  achievements: [
    "Shaurya Chakra - 2022",
    "Sena Medal - 2020",
    "Chief of Army Staff Commendation - 2019",
  ],
};

const troopMembers: TroopMember[] = [
  {
    id: "1",
    name: "Sgt. Anil Verma",
    designation: "Communications Specialist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil",
    isActive: true,
    rank: 3,
  },
  {
    id: "2",
    name: "Cpl. Priya Nair",
    designation: "Tactical Medic",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    isActive: true,
    rank: 2,
  },
  {
    id: "3",
    name: "Pvt. Karan Singh",
    designation: "Weapons Expert",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan",
    isActive: true,
    rank: 2,
  },
  {
    id: "4",
    name: "Sgt. Meera Reddy",
    designation: "Intelligence Officer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    isActive: false,
    rank: 3,
  },
  {
    id: "5",
    name: "Cpl. Ravi Kumar",
    designation: "Demolitions Expert",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
    isActive: true,
    rank: 2,
  },
  {
    id: "6",
    name: "Pvt. Neha Sharma",
    designation: "Logistics Coordinator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    isActive: false,
    rank: 2,
  },
  {
    id: "7",
    name: "Sgt. Vikram Joshi",
    designation: "Sniper",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    isActive: true,
    rank: 3,
  },
  {
    id: "8",
    name: "Cpl. Anjali Desai",
    designation: "Tech Specialist",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    isActive: false,
    rank: 2,
  },
];

// Sort members by active status
const sortedMembers = [...troopMembers].sort((a, b) => {
  if (a.isActive && !b.isActive) return -1;
  if (!a.isActive && b.isActive) return 1;
  return 0;
});

export function AboutTroopHead({ onLogout, onSelectMember }: AboutTroopHeadProps) {
  return (
    <VantaBackground>
      <div className="min-h-screen w-full p-8">
        {/* Officer Profile Card */}
        <div
          className="max-w-4xl mx-auto mb-8 p-8 rounded-xl"
          style={{
            background: "#1a2830",
            border: "1px solid #2a3c47",
            boxShadow: "0 4px 20px rgba(17, 35, 39, 0.5)",
          }}
        >
          <div className="flex items-start gap-6 mb-6">
            <Avatar className="w-32 h-32 ring-4 ring-[#00ffd0] ring-offset-4 ring-offset-[#1a2830]">
              <AvatarImage src={troopHead.avatar} />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1
                    className="mb-1"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {troopHead.name}
                  </h1>
                  <p className="text-gray-400 mb-3">{troopHead.designation}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(troopHead.rank)].map((_, i) => (
                    <svg key={i} className="w-6 h-6" fill="#00ffd0" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">{troopHead.bio}</p>
              <div>
                <h3 className="text-sm text-gray-400 mb-2 tracking-wider">MAJOR ACHIEVEMENTS</h3>
                <div className="space-y-2">
                  {troopHead.achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#00ffd0]" />
                      <span className="text-[#00ffd0]">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Troop Members Section */}
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-6"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#00ffd0",
              letterSpacing: "0.1em",
            }}
          >
            TROOP MEMBERS
          </h2>

          <div className="space-y-3 mb-8">
            {sortedMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => onSelectMember(member.id)}
                className="p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "#1a2830",
                  border: member.isActive
                    ? "1px solid rgba(0, 255, 208, 0.3)"
                    : "1px solid #2a3c47",
                  boxShadow: member.isActive
                    ? "0 0 15px rgba(0, 255, 208, 0.1)"
                    : "none",
                }}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.designation}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(member.rank)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4"
                        fill={member.isActive ? "#00ffd0" : "#4a5a64"}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        member.isActive ? "bg-[#00ffd0] animate-pulse" : "bg-gray-600"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        member.isActive ? "text-[#00ffd0]" : "text-gray-500"
                      }`}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="flex justify-center">
            <Button
              onClick={onLogout}
              variant="outline"
              size="lg"
              className="group"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                background: "transparent",
                border: "2px solid #e73333",
                color: "#e73333",
                padding: "1.5rem 3rem",
              }}
            >
              <LogOut className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
    </VantaBackground>
  );
}