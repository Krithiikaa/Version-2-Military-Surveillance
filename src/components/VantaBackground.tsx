import { useEffect, useRef } from "react";

interface VantaBackgroundProps {
  children: React.ReactNode;
  overlay?: boolean;
}

export function VantaBackground({ children, overlay = true }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    // Load Vanta dependencies via CDN
    const loadVanta = async () => {
      // Check if THREE is already loaded
      if (!(window as any).THREE) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // Check if VANTA is already loaded
      if (!(window as any).VANTA) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (vantaRef.current && !vantaEffect.current) {
        const VANTA = (window as any).VANTA;
        const THREE = (window as any).THREE;
        vantaEffect.current = VANTA.NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00ffd0,
          backgroundColor: 0x131c23,
          points: 10.0,
          maxDistance: 23.0,
          spacing: 16.0,
          showDots: true,
          backgroundAlpha: 0.0,
        });
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Indian Army Backdrop Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/029/559/885/non_2x/indian-holiday-background-free-photo.jpg)`,
          filter: "blur(2px)",
        }}
      />

      {/* Vanta.js NET Effect */}
      <div
        ref={vantaRef}
        className="absolute inset-0"
        style={{
          opacity: 0.5,
        }}
      />

      {/* Dark Overlay */}
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(19, 28, 35, 0.85) 0%, rgba(19, 28, 35, 0.75) 100%)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}