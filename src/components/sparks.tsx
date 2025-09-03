"use client";

import { useEffect, useState } from "react";

const SPARK_COUNT = 30;

export function Sparks() {
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const generateSparks = () => {
      const newSparks = Array.from({ length: SPARK_COUNT }).map((_, i) => {
        const isRose = Math.random() > 0.3;
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          animationDuration: `${Math.random() * 5 + 5}s`,
          animationDelay: `${Math.random() * 5}s`,
          backgroundColor: isRose ? "hsl(var(--primary))" : "#ffffff",
          opacity: Math.random() * 0.7 + 0.1,
        };
        return { id: i, style };
      });
      setSparks(newSparks);
    };
    generateSparks();
  }, []);


  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="spark"
          style={spark.style}
        />
      ))}
    </div>
  );
}
