"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

export default function ThermalExpansion() {
  const [temperature, setTemperature] = useState(4);
  const [showMolecules, setShowMolecules] = useState(true);

  // Calculate water level based on temperature
  const waterHeight = 50 + (temperature - 4) * 2;
  const moleculeSpeed = Math.max(0.1, (temperature / 50));

  return (
    <div className="w-full">
      {/* Visual Demo */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8">
        {/* Cold Beaker */}
        <div className="relative">
          <motion.div 
            className="w-32 h-48 bg-slate-800/50 border-4 border-slate-600/50 rounded-b-3xl relative overflow-hidden"
            style={{ borderTop: "none" }}
          >
            {/* Water */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 to-blue-500"
              animate={{ height: "50%" }}
              transition={{ duration: 0.5 }}
            >
              {/* Molecules */}
              {showMolecules && (
                <div className="absolute inset-0 flex flex-wrap justify-center items-end gap-1.5 p-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-white/60 rounded-full"
                      animate={{
                        x: [0, 1, -1, 0],
                        y: [0, -1, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Temperature Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">❄️</div>
          </motion.div>
          
          <p className="text-center mt-4 font-semibold text-blue-400">Cold Water</p>
          <p className="text-center text-sm text-muted-foreground">4°C</p>
          <p className="text-center text-xs text-slate-500 mt-1">Molecules close together</p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl"
          >
            →
          </motion.div>
        </div>

        {/* Warm Beaker (Interactive) */}
        <div className="relative">
          <motion.div 
            className="w-32 h-48 bg-slate-800/50 border-4 border-slate-600/50 rounded-b-3xl relative overflow-hidden"
            style={{ borderTop: "none" }}
          >
            {/* Water */}
            <motion.div
              className="absolute bottom-0 left-0 right-0"
              animate={{ 
                height: `${waterHeight}%`,
                background: `linear-gradient(to top, 
                  hsl(${Math.max(0, 220 - temperature * 4)}, 80%, 45%), 
                  hsl(${Math.max(0, 220 - temperature * 3)}, 70%, 55%))`
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Molecules with vibration */}
              {showMolecules && (
                <div className="absolute inset-0 flex flex-wrap justify-center items-end gap-2 p-3">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-white/60 rounded-full"
                      animate={{
                        x: [0, 4 * moleculeSpeed, -4 * moleculeSpeed, 0],
                        y: [0, -4 * moleculeSpeed, 4 * moleculeSpeed, 0],
                      }}
                      transition={{
                        duration: Math.max(0.2, 0.5 / moleculeSpeed),
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Temperature Icon */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">
              {temperature > 30 ? "🔥" : temperature > 15 ? "☀️" : "🌡️"}
            </div>
          </motion.div>
          
          <p className="text-center mt-4 font-semibold text-orange-400">Warm Water</p>
          <p className="text-center text-sm text-muted-foreground">{temperature}°C</p>
          <p className="text-center text-xs text-slate-500 mt-1">Molecules spread apart</p>
        </div>
      </div>

      {/* Temperature Control */}
      <Card className="p-5 bg-card/50 border-orange-500/20 max-w-md mx-auto mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-orange-300">🌡️ Temperature</span>
          <span className="text-orange-400 font-mono font-bold text-lg">{temperature}°C</span>
        </div>
        <Slider
          value={[temperature]}
          onValueChange={(v) => setTemperature(v[0])}
          min={4}
          max={50}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>4°C (Cold)</span>
          <span>50°C (Hot)</span>
        </div>
        
        <button
          onClick={() => setShowMolecules(!showMolecules)}
          className="mt-4 w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm transition-colors"
        >
          {showMolecules ? "Hide" : "Show"} Molecules
        </button>
      </Card>

      {/* Explanation Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 bg-gradient-to-br from-blue-950/50 to-slate-950/50 border-blue-500/20">
          <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <span>🔬</span> Molecular Movement
          </h4>
          <p className="text-sm text-muted-foreground">
            At <strong className="text-blue-400">low temperatures</strong>, water molecules have 
            less <span className="text-sky-400">kinetic energy</span> and move slowly. 
            They stay close together, making the water denser.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-orange-950/50 to-slate-950/50 border-orange-500/20">
          <h4 className="font-semibold text-orange-300 mb-3 flex items-center gap-2">
            <span>⚡</span> Thermal Expansion
          </h4>
          <p className="text-sm text-muted-foreground">
            When <strong className="text-orange-400">heated</strong>, molecules gain 
            <span className="text-amber-400"> kinetic energy</span>, vibrate faster, 
            and spread apart. Same water = larger volume = 
            <span className="text-red-400"> higher sea level!</span>
          </p>
        </Card>
      </div>

      {/* Formula Card */}
      <Card className="mt-6 p-5 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-indigo-500/20">
        <h4 className="font-semibold text-indigo-300 mb-3">📐 The Math Behind It</h4>
        <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-center mb-3">
          <span className="text-indigo-300">ΔV</span> = <span className="text-sky-300">V₀</span> × <span className="text-purple-300">β</span> × <span className="text-orange-300">ΔT</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <span className="text-indigo-300 font-mono">ΔV</span>
            <p className="text-muted-foreground">Volume Change</p>
          </div>
          <div className="text-center">
            <span className="text-sky-300 font-mono">V₀</span>
            <p className="text-muted-foreground">Original Volume</p>
          </div>
          <div className="text-center">
            <span className="text-purple-300 font-mono">β</span>
            <p className="text-muted-foreground">Expansion Coefficient</p>
          </div>
          <div className="text-center">
            <span className="text-orange-300 font-mono">ΔT</span>
            <p className="text-muted-foreground">Temp Change</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

