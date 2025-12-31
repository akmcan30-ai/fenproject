"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Mountain, Thermometer, Droplets, MapPin, AlertTriangle, Database, Sparkles } from "lucide-react";
import SeaLevelSimulator from "@/components/SeaLevelSimulator";
import ThermalExpansion from "@/components/ThermalExpansion";
import SpecificHeat from "@/components/SpecificHeat";
import ImpactSection from "@/components/ImpactSection";
import DataSection from "@/components/DataSection";

// Dynamic import for Leaflet (client-side only)
const MuglaMap = dynamic(() => import("@/components/MuglaMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-slate-900/50 animate-pulse flex items-center justify-center">
      <span className="text-muted-foreground">Loading map...</span>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 mb-6"
          >
            <Waves className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Sea Level Rise in Muğla
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An interactive exploration of how <span className="text-rose-400">climate change</span> causes rising seas 
            that threaten Turkey&apos;s beautiful Aegean coast
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="outline" className="text-sky-400 border-sky-500/50 px-3 py-1">
              🏔️ Glacier & Land Ice
            </Badge>
            <Badge variant="outline" className="text-orange-400 border-orange-500/50 px-3 py-1">
              🌡️ Thermal Expansion
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-500/50 px-3 py-1">
              ⚡ Specific Heat Capacity
            </Badge>
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/50 px-3 py-1">
              📍 Muğla Impact
            </Badge>
          </div>
        </motion.header>

        {/* Science Story Arc - Connection Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-indigo-950/50 via-purple-950/50 to-pink-950/50 border-indigo-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-bold text-indigo-300">The Science Connection: How It All Fits Together</h2>
            </div>
            <div className="grid md:grid-cols-5 gap-4 items-center">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl mb-1">☀️</div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-amber-400">Climate change</strong> increases global temperatures
                </p>
              </div>
              <div className="hidden md:block text-2xl text-center text-indigo-400">→</div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl mb-1">🔥</div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-orange-400">Heat</strong> transfers to oceans & ice (high <span className="text-purple-400">specific heat</span> = slow but massive warming)
                </p>
              </div>
              <div className="hidden md:block text-2xl text-center text-indigo-400">→</div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-2xl mb-1">💧⬆️</div>
                <p className="text-xs text-muted-foreground">
                  <strong className="text-sky-400">Glaciers</strong> melt + water <strong className="text-orange-400">expands</strong> = <span className="text-rose-400">sea level rise</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              When <strong className="text-amber-400">heat energy</strong> is added to the Earth system, 
              <strong className="text-purple-400"> molecules</strong> gain <strong className="text-orange-400">kinetic energy</strong> and 
              move faster. In water, this causes <strong className="text-sky-400">thermal expansion</strong>. 
              On land, it melts <strong className="text-cyan-400">glaciers</strong> and <strong className="text-blue-400">icebergs</strong>, 
              adding new water to the oceans and causing <strong className="text-rose-400">sea level rise</strong> that threatens 
              coastal cities like those in <strong className="text-emerald-400">Muğla</strong>.
            </p>
          </Card>
        </motion.section>

        {/* Main Navigation Tabs */}
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 h-auto gap-2 bg-transparent mb-8">
            <TabsTrigger 
              value="simulator" 
              className="data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-300 data-[state=active]:border-sky-500/50 border border-transparent rounded-xl py-3 transition-all"
            >
              <Waves className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Simulator</span>
              <span className="sm:hidden">Sim</span>
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 data-[state=active]:border-emerald-500/50 border border-transparent rounded-xl py-3 transition-all"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map
            </TabsTrigger>
            <TabsTrigger 
              value="thermal" 
              className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300 data-[state=active]:border-orange-500/50 border border-transparent rounded-xl py-3 transition-all"
            >
              <Thermometer className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Thermal</span>
              <span className="sm:hidden">Heat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="specific-heat" 
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/50 border border-transparent rounded-xl py-3 transition-all"
            >
              <Droplets className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Specific Heat</span>
              <span className="sm:hidden">S.Heat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="impact" 
              className="data-[state=active]:bg-rose-500/20 data-[state=active]:text-rose-300 data-[state=active]:border-rose-500/50 border border-transparent rounded-xl py-3 transition-all"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Impact
            </TabsTrigger>
            <TabsTrigger 
              value="data" 
              className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 data-[state=active]:border-indigo-500/50 border border-transparent rounded-xl py-3 transition-all"
            >
              <Database className="w-4 h-4 mr-2" />
              Data
            </TabsTrigger>
          </TabsList>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 md:p-8 bg-card/30 backdrop-blur border-sky-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <Mountain className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-sky-300">Interactive Sea Level Simulator</h2>
                    <p className="text-sm text-muted-foreground">
                      See how <span className="text-cyan-400">glacier</span> melt and <span className="text-orange-400">temperature</span> affect sea level
                    </p>
                  </div>
                </div>
                <SeaLevelSimulator />
              </Card>
            </motion.div>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 md:p-8 bg-card/30 backdrop-blur border-emerald-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-emerald-300">Muğla Coastal Risk Map</h2>
                    <p className="text-sm text-muted-foreground">
                      Explore vulnerable coastal areas threatened by <span className="text-rose-400">sea level rise</span>
                    </p>
                  </div>
                </div>
                <MuglaMap />
              </Card>
            </motion.div>
          </TabsContent>

          {/* Thermal Expansion Tab */}
          <TabsContent value="thermal" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 md:p-8 bg-card/30 backdrop-blur border-orange-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Thermometer className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-orange-300">Thermal Expansion</h2>
                    <p className="text-sm text-muted-foreground">
                      How warming gives <span className="text-purple-400">molecules</span> more <span className="text-amber-400">kinetic energy</span>, making water expand
                    </p>
                  </div>
                </div>
                <ThermalExpansion />
              </Card>
            </motion.div>
          </TabsContent>

          {/* Specific Heat Tab */}
          <TabsContent value="specific-heat" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 md:p-8 bg-card/30 backdrop-blur border-purple-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-purple-300">Specific Heat Capacity</h2>
                    <p className="text-sm text-muted-foreground">
                      Why water stores so much <span className="text-orange-400">heat energy</span> compared to land
                    </p>
                  </div>
                </div>
                <SpecificHeat />
              </Card>
            </motion.div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 md:p-8 bg-card/30 backdrop-blur border-rose-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-rose-300">Impact on Muğla</h2>
                    <p className="text-sm text-muted-foreground">Economic and social consequences of <span className="text-rose-400">climate change</span></p>
                  </div>
                </div>
                <ImpactSection />
              </Card>
            </motion.div>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 md:p-8 bg-card/30 backdrop-blur border-indigo-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-indigo-300">Data, Graph & Sources</h2>
                    <p className="text-sm text-muted-foreground">Scientific data, vocabulary, and references</p>
                  </div>
                </div>
                <DataSection />
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="text-center py-8 mt-12 border-t border-white/5">
          <p className="text-muted-foreground text-sm">
            🌍 Understanding <span className="text-rose-400">climate change</span> and <span className="text-sky-400">sea level rise</span> helps us protect our coasts and communities
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            Interactive Educational Resource for Muğla, Turkey
          </p>
        </footer>
      </div>
    </main>
  );
}
