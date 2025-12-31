"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Snowflake, Thermometer, AlertTriangle, Waves } from "lucide-react";

export default function SeaLevelSimulator() {
  const [landIceMelt, setLandIceMelt] = useState(0);
  const [seaIceMelt, setSeaIceMelt] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [waterLevel, setWaterLevel] = useState(35);

  useEffect(() => {
    // Land ice contributes to sea level rise
    const landIceRise = landIceMelt * 0.35;
    // Sea ice does NOT contribute (Archimedes' principle)
    const seaIceRise = 0;
    // Thermal expansion
    const thermalRise = temperature * 0.2;
    
    setWaterLevel(35 + landIceRise + thermalRise);
  }, [landIceMelt, seaIceMelt, temperature]);

  const getDangerLevel = () => {
    if (waterLevel > 55) return { level: "CRITICAL", color: "bg-red-500", textColor: "text-red-400" };
    if (waterLevel > 45) return { level: "WARNING", color: "bg-amber-500", textColor: "text-amber-400" };
    return { level: "NORMAL", color: "bg-emerald-500", textColor: "text-emerald-400" };
  };

  const danger = getDangerLevel();

  return (
    <div className="w-full">
      {/* Simulator Visual */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10 mb-6">
        {/* Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-sky-900" />
        
        {/* Stars */}
        <div className="absolute top-4 left-[10%] w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-8 left-[25%] w-1.5 h-1.5 bg-white rounded-full opacity-40" />
        <div className="absolute top-6 left-[40%] w-1 h-1 bg-white rounded-full opacity-70" />
        <div className="absolute top-12 right-[30%] w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute top-4 right-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-60" />

        {/* Moon */}
        <motion.div 
          className="absolute top-8 right-12 w-14 h-14 rounded-full bg-gradient-to-br from-slate-200 to-slate-300"
          style={{ boxShadow: "0 0 40px rgba(226, 232, 240, 0.4)" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Land Ice (Glacier) */}
        <motion.div
          className="absolute right-8 top-20 z-20"
          animate={{ 
            scale: 1 - (landIceMelt / 100) * 0.7,
            opacity: 1 - (landIceMelt / 100) * 0.6
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-28 h-24 bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300 rounded-t-xl"
              style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
            />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-3xl">🏔️</div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-sky-300 whitespace-nowrap">
              Land Ice
            </span>
          </div>
        </motion.div>

        {/* Floating Sea Ice */}
        <motion.div
          className="absolute right-40 z-30"
          animate={{ 
            scale: 1 - (seaIceMelt / 100) * 0.8,
            opacity: 1 - (seaIceMelt / 100) * 0.7,
            y: [0, -3, 0],
            bottom: `${waterLevel - 2}%`
          }}
          transition={{ 
            scale: { duration: 0.5 },
            opacity: { duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            bottom: { duration: 0.8 }
          }}
        >
          <div className="w-16 h-10 bg-gradient-to-b from-white to-sky-100 rounded-lg flex items-center justify-center text-xl shadow-lg">
            🧊
          </div>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-sky-300 whitespace-nowrap">
            Sea Ice
          </span>
        </motion.div>

        {/* Mountain/Land */}
        <div className="absolute bottom-0 left-4 z-10">
          <div 
            className="w-48 h-56 bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950"
            style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
          />
          {/* Buildings on land */}
          <div className="absolute bottom-16 left-12 flex gap-1">
            <div className="w-5 h-12 bg-gradient-to-b from-slate-500 to-slate-700 rounded-t" />
            <div className="w-6 h-8 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t" />
            <div className="w-7 h-16 bg-gradient-to-b from-slate-500 to-slate-700 rounded-t">
              <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 mx-auto" />
              <div className="w-1 h-1 bg-amber-400 rounded-full mt-1 mx-auto" />
            </div>
          </div>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/80 whitespace-nowrap">
            🏖️ Muğla Coast
          </span>
        </div>

        {/* Water */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 ocean-gradient"
          animate={{ height: `${waterLevel}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Wave effect */}
          <div className="absolute top-0 left-0 right-0 h-4">
            <motion.div 
              className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          {/* Water label */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Waves className="w-4 h-4" />
            <span className="font-bold text-white text-shadow">
              {waterLevel > 55 ? "⚠️ " : ""}
              Sea Level: {Math.round(waterLevel * 2.5)}cm
            </span>
          </div>
        </motion.div>

        {/* Danger overlay */}
        {waterLevel > 50 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-red-500/10 pointer-events-none"
          />
        )}
      </div>

      {/* Status Badge */}
      <div className="flex justify-center mb-6">
        <Badge variant="outline" className={`${danger.textColor} border-current px-4 py-2 text-sm`}>
          <AlertTriangle className="w-4 h-4 mr-2" />
          Status: {danger.level}
        </Badge>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Land Ice Control */}
        <Card className="p-5 bg-card/50 border-sky-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Mountain className="w-5 h-5 text-sky-400" />
            <span className="font-semibold text-sky-300">Land Ice Melting</span>
          </div>
          <Slider
            value={[landIceMelt]}
            onValueChange={(v) => setLandIceMelt(v[0])}
            max={100}
            step={1}
            className="mb-3"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Melted</span>
            <span className="text-sky-400 font-mono font-bold">{landIceMelt}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            ⬆️ Raises sea level
          </p>
        </Card>

        {/* Sea Ice Control */}
        <Card className="p-5 bg-card/50 border-slate-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Snowflake className="w-5 h-5 text-slate-400" />
            <span className="font-semibold text-slate-300">Sea Ice Melting</span>
          </div>
          <Slider
            value={[seaIceMelt]}
            onValueChange={(v) => setSeaIceMelt(v[0])}
            max={100}
            step={1}
            className="mb-3"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Melted</span>
            <span className="text-slate-400 font-mono font-bold">{seaIceMelt}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            ↔️ No effect on sea level
          </p>
        </Card>

        {/* Temperature Control */}
        <Card className="p-5 bg-card/50 border-orange-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Thermometer className="w-5 h-5 text-orange-400" />
            <span className="font-semibold text-orange-300">Ocean Temperature</span>
          </div>
          <Slider
            value={[temperature]}
            onValueChange={(v) => setTemperature(v[0])}
            max={100}
            step={1}
            className="mb-3"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Warming</span>
            <span className="text-orange-400 font-mono font-bold">+{(temperature / 25).toFixed(1)}°C</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            ⬆️ Thermal expansion
          </p>
        </Card>
      </div>

      {/* Key Insight Box */}
      <Card className="mt-6 p-4 bg-gradient-to-r from-sky-950/50 to-indigo-950/50 border-sky-500/20">
        <h4 className="font-semibold text-sky-300 mb-2 flex items-center gap-2">
          <span className="text-lg">💡</span> Key Scientific Insight
        </h4>
        <p className="text-sm text-muted-foreground">
          <strong className="text-sky-400">Land ice</strong> (glaciers) adds <em>new</em> water to the ocean when it melts, raising sea levels. 
          <strong className="text-slate-300"> Sea ice</strong> is already floating and displacing water, so melting it doesn&apos;t change sea level 
          (Archimedes&apos; Principle). <strong className="text-orange-400">Thermal expansion</strong> makes the ocean expand as it warms.
        </p>
      </Card>
    </div>
  );
}

