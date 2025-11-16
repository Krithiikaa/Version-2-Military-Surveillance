import { useState } from "react";
import { Fingerprint, User } from "lucide-react";
import { Button } from "./ui/button";
import { VantaBackground } from "./VantaBackground";

interface LoginPageProps {
  onLogin: (pin: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [pin, setPin] = useState<string>("");
  const maxPinLength = 6;

  const handleNumberClick = (num: string) => {
    if (pin.length < maxPinLength) {
      setPin(pin + num);
    }
  };

  const handleClear = () => {
    setPin("");
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === maxPinLength) {
      onLogin(pin);
    }
  };

  return (
    <VantaBackground>
      <div className="min-h-screen w-full flex items-center justify-center">
        {/* Glassmorphic Login Card */}
        <div
          className="w-[440px] p-10 rounded-xl"
          style={{
            background: "rgba(26, 40, 48, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 255, 208, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(17, 35, 39, 0.7), 0 0 20px rgba(0, 255, 208, 0.1)",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-600 rounded flex items-center justify-center">
              <div className="text-white opacity-70">
                <svg
                  viewBox="0 0 100 100"
                  className="w-16 h-16"
                  fill="currentColor"
                >
                  <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="none" />
                  <text x="50" y="60" textAnchor="middle" className="text-3xl font-bold">
                    IA
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="mb-2 tracking-wider"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#00ffd0",
                letterSpacing: "0.15em",
              }}
            >
              COMMANDER LOGIN
            </h1>
            <p className="text-gray-400 text-sm">Authorized Access Only</p>
          </div>

          {/* Commander ID Display */}
          <div className="mb-6">
            <label
              className="block mb-3 tracking-wider text-sm"
              style={{
                fontFamily: "Orbitron, sans-serif",
                color: "#8a9ba5",
                letterSpacing: "0.2em",
              }}
            >
              COMMANDER ID
            </label>
            <div
              className="w-full p-4 rounded-lg flex items-center gap-3"
              style={{
                background: "rgba(19, 28, 35, 0.8)",
                border: "1px solid rgba(0, 255, 208, 0.3)",
              }}
            >
              <User className="w-5 h-5" style={{ color: "#00ffd0" }} />
              <span
                className="tracking-wider"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  color: "#ffffff",
                  fontSize: "1.1rem",
                }}
              >
                CMDR-01
              </span>
            </div>
          </div>

          {/* Access Code Label */}
          <label
            className="block mb-3 text-center tracking-wider text-sm"
            style={{
              fontFamily: "Orbitron, sans-serif",
              color: "#8a9ba5",
              letterSpacing: "0.2em",
            }}
          >
            ACCESS CODE
          </label>

          {/* PIN Dots Display */}
          <div className="flex justify-center gap-3 mb-8">
            {[...Array(maxPinLength)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full transition-all duration-200"
                style={{
                  background: i < pin.length ? "#00ffd0" : "transparent",
                  border: `2px solid ${i < pin.length ? "#00ffd0" : "rgba(0, 255, 208, 0.3)"}`,
                  boxShadow: i < pin.length ? "0 0 10px rgba(0, 255, 208, 0.5)" : "none",
                }}
              />
            ))}
          </div>

          {/* Number Keypad */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="p-4 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "1.5rem",
                  background: "rgba(26, 40, 48, 0.8)",
                  border: "1px solid rgba(0, 255, 208, 0.2)",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "1px solid #00ffd0";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 208, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(0, 255, 208, 0.2)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Bottom Row: Clear, 0, Delete */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={handleClear}
              className="p-4 rounded-lg transition-all duration-200"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.9rem",
                background: "rgba(26, 40, 48, 0.8)",
                border: "1px solid rgba(231, 51, 51, 0.4)",
                color: "#e73333",
              }}
            >
              CLEAR
            </button>
            <button
              onClick={() => handleNumberClick("0")}
              className="p-4 rounded-lg transition-all duration-200"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.5rem",
                background: "rgba(26, 40, 48, 0.8)",
                border: "1px solid rgba(0, 255, 208, 0.2)",
                color: "#ffffff",
              }}
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="p-4 rounded-lg transition-all duration-200 flex items-center justify-center"
              style={{
                background: "rgba(26, 40, 48, 0.8)",
                border: "1px solid rgba(0, 255, 208, 0.2)",
                color: "#00ffd0",
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
            </button>
          </div>

          {/* Authenticate Button */}
          <button
            onClick={handleSubmit}
            disabled={pin.length !== maxPinLength}
            className="w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              background: pin.length === maxPinLength ? "#00ffd0" : "rgba(0, 255, 208, 0.2)",
              color: pin.length === maxPinLength ? "#131c23" : "#8a9ba5",
              border: "none",
              boxShadow:
                pin.length === maxPinLength
                  ? "0 0 20px rgba(0, 255, 208, 0.5)"
                  : "none",
              cursor: pin.length === maxPinLength ? "pointer" : "not-allowed",
            }}
          >
            <Fingerprint className="w-5 h-5" />
            AUTHENTICATE
          </button>
        </div>
      </div>
    </VantaBackground>
  );
}