"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, BarChart3, BookOpen, Link2 } from "lucide-react";

// Sea level rise data (based on IPCC projections)
const seaLevelData = [
  { year: 1900, level: 0, source: "Historical baseline" },
  { year: 1950, level: 2, source: "Tide gauge records" },
  { year: 1990, level: 8, source: "Satellite measurements begin" },
  { year: 2000, level: 12, source: "IPCC TAR" },
  { year: 2010, level: 19, source: "IPCC AR4" },
  { year: 2020, level: 28, source: "IPCC AR6" },
  { year: 2050, level: 45, source: "IPCC projection (moderate)" },
  { year: 2100, level: 85, source: "IPCC projection (moderate)" },
];

const sources = [
  {
    title: "Climate Change 2021: The Physical Science Basis",
    org: "IPCC",
    url: "https://www.ipcc.ch/report/ar6/wg1/",
    description: "Sea level rise projections and thermal expansion data"
  },
  {
    title: "Facts About Glaciers",
    org: "National Snow and Ice Data Center",
    url: "https://nsidc.org/learn/parts-cryosphere/glaciers",
    description: "Information on glaciers and land ice"
  },
  {
    title: "Sea Level Rise",
    org: "NASA Global Climate Change",
    url: "https://climate.nasa.gov/vital-signs/sea-level/",
    description: "Current sea level measurements and trends"
  },
  {
    title: "Ocean Heat Content",
    org: "NOAA",
    url: "https://www.ncei.noaa.gov/access/global-ocean-heat-content/",
    description: "Data on ocean warming and thermal expansion"
  },
  {
    title: "Specific Heat Capacity",
    org: "HyperPhysics - Georgia State University",
    url: "http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/spht.html",
    description: "Scientific explanation of specific heat capacity"
  },
  {
    title: "Caretta Caretta Conservation in Turkey",
    org: "WWF Turkey",
    url: "https://www.wwf.org.tr/",
    description: "Information on sea turtle conservation at Dalyan"
  },
  {
    title: "Muğla Province Tourism Statistics",
    org: "Turkish Ministry of Culture and Tourism",
    url: "https://www.ktb.gov.tr/",
    description: "Tourism data for Muğla region"
  }
];

const vocabulary = [
  { term: "Thermal Expansion", definition: "The increase in volume of water as it is heated, causing molecules to move apart" },
  { term: "Specific Heat Capacity", definition: "The amount of heat energy (in Joules) required to raise 1 kg of a substance by 1°C" },
  { term: "Kinetic Energy", definition: "The energy of motion - molecules with more kinetic energy move faster and vibrate more" },
  { term: "Glacier", definition: "A large, slow-moving mass of ice formed from compacted snow on land" },
  { term: "Iceberg", definition: "A large piece of ice that has broken off from a glacier or ice shelf and floats in the ocean" },
  { term: "Climate Change", definition: "Long-term shifts in global temperatures and weather patterns, primarily caused by human activities" },
  { term: "Sea Level Rise", definition: "The increase in the average level of the ocean, caused by thermal expansion and melting land ice" },
  { term: "Heat", definition: "The transfer of thermal energy from a warmer object to a cooler one" },
  { term: "Temperature", definition: "A measure of the average kinetic energy of particles in a substance - higher temperature means faster molecular movement" },
  { term: "Molecules", definition: "The smallest unit of a substance that retains its chemical properties, made of atoms bonded together" },
];

export default function DataSection() {
  const maxLevel = Math.max(...seaLevelData.map(d => d.level));
  
  return (
    <div className="w-full">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto gap-2 bg-transparent mb-6">
          <TabsTrigger 
            value="table" 
            className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300 border border-transparent data-[state=active]:border-indigo-500/50 rounded-xl py-2"
          >
            <Table className="w-4 h-4 mr-2" />
            Data Table
          </TabsTrigger>
          <TabsTrigger 
            value="graph" 
            className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300 border border-transparent data-[state=active]:border-emerald-500/50 rounded-xl py-2"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Graph
          </TabsTrigger>
          <TabsTrigger 
            value="vocabulary" 
            className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300 border border-transparent data-[state=active]:border-amber-500/50 rounded-xl py-2"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Vocabulary
          </TabsTrigger>
          <TabsTrigger 
            value="sources" 
            className="data-[state=active]:bg-sky-500/20 data-[state=active]:text-sky-300 border border-transparent data-[state=active]:border-sky-500/50 rounded-xl py-2"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Sources
          </TabsTrigger>
        </TabsList>

        {/* Data Table */}
        <TabsContent value="table">
          <Card className="p-6 bg-card/50 border-indigo-500/20">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-indigo-300 mb-1">
                📊 Global Mean Sea Level Rise (1900-2100)
              </h3>
              <p className="text-sm text-muted-foreground">
                Data from IPCC AR6 Report and historical records. Values show cumulative rise in centimeters from 1900 baseline.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-indigo-500/30">
                    <th className="text-left py-3 px-4 text-indigo-300 font-semibold">Year</th>
                    <th className="text-left py-3 px-4 text-indigo-300 font-semibold">Sea Level Rise (cm)</th>
                    <th className="text-left py-3 px-4 text-indigo-300 font-semibold">Data Source</th>
                    <th className="text-left py-3 px-4 text-indigo-300 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {seaLevelData.map((row, index) => (
                    <motion.tr 
                      key={row.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-3 px-4 font-mono">{row.year}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-400">+{row.level}</span>
                          <div 
                            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded"
                            style={{ width: `${(row.level / maxLevel) * 100}px` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{row.source}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`text-xs ${
                          row.year > 2020 
                            ? "text-amber-400 border-amber-400/50" 
                            : "text-emerald-400 border-emerald-400/50"
                        }`}>
                          {row.year > 2020 ? "Projected" : "Observed"}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p className="mt-4 text-xs text-muted-foreground">
              <strong>Units:</strong> Centimeters (cm) | <strong>Baseline:</strong> 1900 sea level = 0 cm | 
              <strong> Source:</strong> <a href="https://www.ipcc.ch/report/ar6/wg1/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">IPCC AR6 Climate Report</a>
            </p>
          </Card>
        </TabsContent>

        {/* Graph */}
        <TabsContent value="graph">
          <Card className="p-6 bg-card/50 border-emerald-500/20">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-emerald-300 mb-1">
                📈 Global Mean Sea Level Rise Over Time
              </h3>
              <p className="text-sm text-muted-foreground">
                Visual representation of sea level change from 1900 to projected 2100 values
              </p>
            </div>

            {/* Graph Container */}
            <div className="relative h-[350px] bg-slate-900/50 rounded-xl p-6 border border-emerald-500/10">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-6 bottom-12 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                <span>100cm</span>
                <span>75cm</span>
                <span>50cm</span>
                <span>25cm</span>
                <span>0cm</span>
              </div>

              {/* Graph area */}
              <div className="ml-14 h-full pb-8 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="border-t border-white/5 w-full" />
                  ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between gap-2 px-2">
                  {seaLevelData.map((data, index) => (
                    <div key={data.year} className="flex flex-col items-center flex-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.level / 100) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`w-full max-w-12 rounded-t-lg ${
                          data.year > 2020 
                            ? "bg-gradient-to-t from-amber-600 to-amber-400" 
                            : "bg-gradient-to-t from-emerald-600 to-emerald-400"
                        }`}
                        style={{ minHeight: data.level > 0 ? "4px" : "0" }}
                      >
                        <div className="w-full h-full flex items-start justify-center pt-1">
                          <span className="text-[10px] font-bold text-white">
                            {data.level > 10 ? `+${data.level}` : ""}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                  {seaLevelData.map(data => (
                    <span key={data.year} className="text-xs text-muted-foreground flex-1 text-center">
                      {data.year}
                    </span>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="absolute top-4 right-4 flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500" />
                  <span className="text-emerald-400">Observed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-amber-500" />
                  <span className="text-amber-400">Projected</span>
                </div>
              </div>
            </div>

            {/* Graph Explanation */}
            <Card className="mt-6 p-4 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border-emerald-500/20">
              <h4 className="font-semibold text-emerald-300 mb-2">📝 Graph Analysis</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This bar graph shows the <strong className="text-emerald-400">cumulative global mean sea level rise</strong> from 
                1900 to 2100. The data reveals several important trends:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <strong className="text-sky-400">Acceleration:</strong> Sea level rise is accelerating. The rise from 1900-2000 
                  (12cm over 100 years) is much slower than projected 2000-2100 (73cm over 100 years).
                </li>
                <li>
                  <strong className="text-orange-400">Causes:</strong> This acceleration is due to increased 
                  <span className="text-orange-300"> thermal expansion</span> from ocean warming and faster 
                  <span className="text-sky-300"> glacier/ice sheet melting</span> from <span className="text-rose-300">climate change</span>.
                </li>
                <li>
                  <strong className="text-purple-400">Impact on Muğla:</strong> With ~85cm projected rise by 2100, 
                  low-lying areas like Dalyan (0.5m elevation) and Fethiye (1m) face significant flooding risk.
                </li>
              </ul>
            </Card>

            <p className="mt-4 text-xs text-muted-foreground">
              <strong>Graph Title:</strong> Global Mean Sea Level Rise (1900-2100) | 
              <strong> Y-Axis:</strong> Sea Level Change (cm) | 
              <strong> X-Axis:</strong> Year | 
              <strong> Source:</strong> <a href="https://climate.nasa.gov/vital-signs/sea-level/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">NASA Climate</a>
            </p>
          </Card>
        </TabsContent>

        {/* Vocabulary */}
        <TabsContent value="vocabulary">
          <Card className="p-6 bg-card/50 border-amber-500/20">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-amber-300 mb-1">
                📚 Scientific Vocabulary
              </h3>
              <p className="text-sm text-muted-foreground">
                Key terms and definitions for understanding sea level rise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {vocabulary.map((item, index) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 bg-slate-900/50 border-amber-500/10 h-full">
                    <h4 className="font-semibold text-amber-300 mb-1 flex items-center gap-2">
                      <span className="text-amber-500">▸</span>
                      {item.term}
                    </h4>
                    <p className="text-sm text-muted-foreground">{item.definition}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Temperature Definition Highlight */}
            <Card className="mt-6 p-4 bg-gradient-to-r from-orange-950/50 to-red-950/50 border-orange-500/30">
              <h4 className="font-bold text-orange-300 mb-2 flex items-center gap-2">
                🌡️ Key Concept: Temperature at the Particle Level
              </h4>
              <p className="text-sm text-muted-foreground">
                <strong className="text-orange-400">Temperature</strong> is a measure of the 
                <strong className="text-amber-300"> average kinetic energy</strong> of particles (atoms and molecules) 
                in a substance. When we heat something:
              </p>
              <ul className="mt-2 text-sm text-muted-foreground space-y-1">
                <li>• Particles gain <span className="text-amber-400">kinetic energy</span> and move faster</li>
                <li>• Higher temperature = faster molecular vibration and movement</li>
                <li>• This is why heated water <span className="text-orange-400">expands</span> — molecules need more space to move</li>
                <li>• <span className="text-sky-400">Heat</span> is the transfer of this energy between objects</li>
              </ul>
            </Card>
          </Card>
        </TabsContent>

        {/* Sources */}
        <TabsContent value="sources">
          <Card className="p-6 bg-card/50 border-sky-500/20">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-sky-300 mb-1">
                🔗 Sources & References
              </h3>
              <p className="text-sm text-muted-foreground">
                All sources used in this presentation with hyperlinks
              </p>
            </div>

            <div className="space-y-3">
              {sources.map((source, index) => (
                <motion.div
                  key={source.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 bg-slate-900/50 border-sky-500/10 hover:border-sky-500/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <a 
                          href={source.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-semibold text-sky-300 hover:text-sky-200 hover:underline"
                        >
                          {source.title}
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="text-sky-400">{source.org}</span> — {source.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-sky-400 border-sky-400/50 flex-shrink-0">
                        <Link2 className="w-3 h-3 mr-1" />
                        Link
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-900/30 rounded-lg border border-sky-500/10">
              <p className="text-xs text-muted-foreground">
                <strong className="text-sky-400">Citation Format:</strong> All sources are hyperlinked. 
                When referencing data in the presentation, cite as: &quot;According to [Source Title], ...&quot; 
                with the title linked to the original source.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

