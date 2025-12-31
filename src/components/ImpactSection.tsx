"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingDown, 
  Users, 
  Building2, 
  Ship, 
  Palmtree,
  Heart,
  Home,
  History,
  Anchor,
  Brain
} from "lucide-react";

const economicImpacts = [
  {
    icon: Palmtree,
    title: "Beach Erosion",
    description: "Famous beaches like Ölüdeniz, Iztuzu, and Bodrum will shrink or disappear",
    severity: "critical"
  },
  {
    icon: Building2,
    title: "Infrastructure Damage",
    description: "Coastal hotels, marinas, and restaurants face flooding and structural damage",
    severity: "high"
  },
  {
    icon: Home,
    title: "Property Devaluation",
    description: "Coastal real estate loses value as flood risk increases",
    severity: "high"
  },
  {
    icon: Ship,
    title: "Marina Destruction",
    description: "Bodrum and Marmaris marinas (major yacht tourism hubs) face submersion",
    severity: "critical"
  }
];

const socialImpacts = [
  {
    icon: Users,
    title: "Forced Migration",
    description: "Residents of Dalyan, Köyceğiz, and low-lying Fethiye may need to relocate",
    severity: "critical"
  },
  {
    icon: History,
    title: "Loss of Heritage",
    description: "Ancient sites like Kaunos and traditional fishing villages face submersion",
    severity: "high"
  },
  {
    icon: Anchor,
    title: "Livelihood Loss",
    description: "Fishing families lose access to traditional fishing grounds and harbors",
    severity: "high"
  },
  {
    icon: Brain,
    title: "Mental Health",
    description: "\"Eco-anxiety\" and grief over losing ancestral homes and landscapes",
    severity: "moderate"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ImpactSection() {
  return (
    <div className="w-full">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-sky-950/50 to-slate-950 border-sky-500/20 text-center">
          <p className="text-3xl font-bold text-sky-400 mb-1">1,124</p>
          <p className="text-xs text-muted-foreground">km of coastline</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-950/50 to-slate-950 border-amber-500/20 text-center">
          <p className="text-3xl font-bold text-amber-400 mb-1">4M+</p>
          <p className="text-xs text-muted-foreground">tourists/year</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-rose-950/50 to-slate-950 border-rose-500/20 text-center">
          <p className="text-3xl font-bold text-rose-400 mb-1">30-50%</p>
          <p className="text-xs text-muted-foreground">tourism at risk</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-emerald-950/50 to-slate-950 border-emerald-500/20 text-center">
          <p className="text-3xl font-bold text-emerald-400 mb-1">🐢</p>
          <p className="text-xs text-muted-foreground">endangered species</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Economic Impact */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-amber-300">Economic Impact</h3>
              <p className="text-xs text-muted-foreground">Tourism Industry Collapse</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {economicImpacts.map((impact, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`p-4 bg-card/50 border-amber-500/20 hover:border-amber-500/40 transition-colors`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <impact.icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm text-amber-200">{impact.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${
                            impact.severity === "critical" 
                              ? "text-red-400 border-red-400/50" 
                              : impact.severity === "high"
                                ? "text-orange-400 border-orange-400/50"
                                : "text-amber-400 border-amber-400/50"
                          }`}
                        >
                          {impact.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{impact.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Social Impact */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h3 className="font-bold text-rose-300">Social Impact</h3>
              <p className="text-xs text-muted-foreground">Community Displacement</p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {socialImpacts.map((impact, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className={`p-4 bg-card/50 border-rose-500/20 hover:border-rose-500/40 transition-colors`}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                      <impact.icon className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm text-rose-200">{impact.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${
                            impact.severity === "critical" 
                              ? "text-red-400 border-red-400/50" 
                              : impact.severity === "high"
                                ? "text-orange-400 border-orange-400/50"
                                : "text-amber-400 border-amber-400/50"
                          }`}
                        >
                          {impact.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{impact.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Special Concern */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Card className="mt-8 p-6 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border-emerald-500/30">
          <div className="flex items-start gap-4">
            <div className="text-5xl">🐢</div>
            <div>
              <h4 className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                Special Concern: Iztuzu Beach & Caretta Caretta
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/50">
                  Endangered
                </Badge>
              </h4>
              <p className="text-sm text-muted-foreground">
                Iztuzu Beach (Dalyan) is one of the Mediterranean&apos;s most important nesting sites 
                for endangered <strong className="text-emerald-400">Caretta caretta (loggerhead sea turtles)</strong>. 
                Rising sea levels will flood nesting areas, potentially devastating this protected 
                species that has used this beach for <span className="text-teal-400">millions of years</span>.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

