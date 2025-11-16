import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { CommanderDashboard } from "./components/CommanderDashboard";
import { TroopHeadDashboard } from "./components/TroopHeadDashboard";
import { AboutTroopHead } from "./components/AboutTroopHead";

type Page = "login" | "dashboard" | "troop-head" | "about";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [selectedTroopId, setSelectedTroopId] = useState<string | null>(null);

  const handleLogin = (pin: string) => {
    // Simulate PIN validation (in real app, this would validate against backend)
    if (pin.length === 6) {
      setCurrentPage("dashboard");
    }
  };

  const handleSelectTroop = (troopId: string) => {
    setSelectedTroopId(troopId);
    setCurrentPage("troop-head");
  };

  const handleViewProfile = () => {
    setCurrentPage("about");
  };

  const handleSelectMember = (memberId: string) => {
    // When selecting a member, show their dashboard
    setSelectedTroopId(memberId);
    setCurrentPage("troop-head");
  };

  const handleLogout = () => {
    setCurrentPage("login");
    setSelectedTroopId(null);
  };

  return (
    <div className="w-full min-h-screen">
      {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
      
      {currentPage === "dashboard" && (
        <CommanderDashboard onSelectTroop={handleSelectTroop} />
      )}
      
      {currentPage === "troop-head" && selectedTroopId && (
        <TroopHeadDashboard
          troopId={selectedTroopId}
          onViewProfile={handleViewProfile}
        />
      )}
      
      {currentPage === "about" && (
        <AboutTroopHead
          onLogout={handleLogout}
          onSelectMember={handleSelectMember}
        />
      )}
    </div>
  );
}
