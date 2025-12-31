"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw } from "lucide-react";

export default function SpecificHeat() {
  const [isHeating, setIsHeating] = useState(false);
  const [waterTemp, setWaterTemp] = useState(20);
  const [landTemp, setLandTemp] = useState(20);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const WATER_SPECIFIC_HEAT = 4186; // J/(kg·°C)
  const LAND_SPECIFIC_HEAT = 800;  // J/(kg·°C)
  const HEAT_RATE = 1000; // J per second (simplified)

  useEffect(() => {
    if (isHeating) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(t => t + 0.1);
        
        // Temperature rise rate inversely proportional to specific heat
        setWaterTemp(t => Math.min(100, t + (HEAT_RATE / WATER_SPECIFIC_HEAT) * 0.1));
        setLandTemp(t => Math.min(100, t + (HEAT_RATE / LAND_SPECIFIC_HEAT) * 0.1));
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHeating]);

  const reset = () => {
    setIsHeating(false);
    setWaterTemp(20);
    setLandTemp(20);
    setTimeElapsed(0);
  };

  const getWaterColor = () => {
    const hue = Math.max(0, 210 - (waterTemp - 20) * 2.5);
    return `hsl(${hue}, 80%, 50%)`;
  };

  const getLandColor = () => {
    const hue = Math.max(0, 30 - (landTemp - 20) * 0.3);
    const lightness = Math.min(60, 35 + (landTemp - 20) * 0.3);
    return `hsl(${hue}, 60%, ${lightness}%)`;
  };

  return (
    <div className="w-full">
      {/* Interactive Demo */}
      <div className="flex flex-wrap justify-center gap-12 mb-8">
        {/* Water Container */}
        <div className="text-center">
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-3 relative"
            animate={{
              background: getWaterColor(),
              boxShadow: isHeating 
                ? `0 0 ${20 + (waterTemp - 20)}px ${getWaterColor()}`
                : "0 0 20px rgba(14, 165, 233, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            💧
            {isHeating && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-orange-400"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
          <h4 className="font-semibold text-sky-300">Water</h4>
          <motion.p 
            className="text-2xl font-mono font-bold"
            animate={{ color: getWaterColor() }}
          >
            {waterTemp.toFixed(1)}°C
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1">
            c = 4,186 J/(kg·°C)
          </p>
        </div>

        {/* VS */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-slate-500">VS</span>
        </div>

        {/* Land Container */}
        <div className="text-center">
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center text-5xl mb-3 relative"
            animate={{
              background: getLandColor(),
              boxShadow: isHeating 
                ? `0 0 ${20 + (landTemp - 20) * 0.5}px ${getLandColor()}`
                : "0 0 20px rgba(139, 69, 19, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            🏜️
            {isHeating && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-orange-400"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
          <h4 className="font-semibold text-amber-600">Land/Rock</h4>
          <motion.p 
            className="text-2xl font-mono font-bold"
            animate={{ color: getLandColor() }}
          >
            {landTemp.toFixed(1)}°C
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1">
            c ≈ 800 J/(kg·°C)
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={() => setIsHeating(!isHeating)}
          variant={isHeating ? "destructive" : "default"}
          className="min-w-32"
        >
          {isHeating ? (
            <>🔥 Heating...</>
          ) : (
            <><Play className="w-4 h-4 mr-2" /> Start Heating</>
          )}
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-4 mb-8">
        <Badge variant="outline" className="text-slate-400 border-slate-600">
          ⏱️ Time: {timeElapsed.toFixed(1)}s
        </Badge>
        <Badge variant="outline" className="text-orange-400 border-orange-600">
          🔥 Same heat applied to both
        </Badge>
      </div>

      {/* Formula */}
      <Card className="p-5 bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border-purple-500/20 max-w-lg mx-auto mb-8">
        <h4 className="font-semibold text-purple-300 mb-3 text-center">📐 Specific Heat Formula</h4>
        <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-center text-lg mb-3">
          <span className="text-pink-300">Q</span> = <span className="text-sky-300">m</span> × <span className="text-purple-300">c</span> × <span className="text-orange-300">ΔT</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs text-center">
          <div>
            <span className="text-pink-300 font-mono">Q</span>
            <p className="text-muted-foreground">Heat (J)</p>
          </div>
          <div>
            <span className="text-sky-300 font-mono">m</span>
            <p className="text-muted-foreground">Mass (kg)</p>
          </div>
          <div>
            <span className="text-purple-300 font-mono">c</span>
            <p className="text-muted-foreground">Specific Heat</p>
          </div>
          <div>
            <span className="text-orange-300 font-mono">ΔT</span>
            <p className="text-muted-foreground">Temp Change</p>
          </div>
        </div>
      </Card>

      {/* Key Points */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 bg-gradient-to-br from-sky-950/50 to-slate-950/50 border-sky-500/20">
          <h4 className="font-semibold text-sky-300 mb-3 flex items-center gap-2">
            <span>🌊</span> Ocean as Heat Sink
          </h4>
          <p className="text-sm text-muted-foreground">
            The ocean absorbs <strong className="text-sky-400">over 90%</strong> of excess 
            heat from greenhouse gases. Water&apos;s high specific heat means it warms slowly 
            but stores <span className="text-emerald-400">enormous amounts of energy</span>.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-orange-950/50 to-slate-950/50 border-orange-500/20">
          <h4 className="font-semibold text-orange-300 mb-3 flex items-center gap-2">
            <span>⏳</span> Delayed Response
          </h4>
          <p className="text-sm text-muted-foreground">
            Because water takes so much energy to warm, sea level rise from thermal expansion 
            is <strong className="text-orange-400">delayed</strong>. Even if we stopped all 
            emissions today, oceans would continue expanding for 
            <span className="text-red-400"> decades</span>.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-purple-950/50 to-slate-950/50 border-purple-500/20">
          <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
            <span>🔒</span> Committed Sea Level Rise
          </h4>
          <p className="text-sm text-muted-foreground">
            Heat already absorbed by oceans means some sea level rise is 
            <strong className="text-purple-400">&quot;locked in&quot;</strong> — it will happen 
            regardless of future emissions. This is called 
            <span className="text-indigo-400"> committed sea level rise</span>.
          </p>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-rose-950/50 to-slate-950/50 border-rose-500/20">
          <h4 className="font-semibold text-rose-300 mb-3 flex items-center gap-2">
            <span>🗺️</span> Regional Variations
          </h4>
          <p className="text-sm text-muted-foreground">
            Different parts of the ocean absorb heat at different rates, causing 
            <strong className="text-rose-400"> regional variations</strong>. 
            The Mediterranean (including <span className="text-amber-400">Muğla&apos;s coast</span>) 
            may experience higher than average rise.
          </p>
        </Card>
      </div>
    </div>
  );
}

