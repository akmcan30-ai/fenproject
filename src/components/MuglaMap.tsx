"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
const createCustomIcon = (color: string, emoji: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color};
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

// Coastal locations in Muğla
const coastalLocations = [
  {
    name: "Bodrum",
    coords: [37.0344, 27.4305] as [number, number],
    elevation: 2,
    type: "tourism",
    description: "Major tourist hub with marinas and beaches",
    emoji: "🏖️",
  },
  {
    name: "Marmaris",
    coords: [36.8506, 28.2731] as [number, number],
    elevation: 3,
    type: "tourism",
    description: "Famous marina and coastal resort",
    emoji: "⛵",
  },
  {
    name: "Fethiye",
    coords: [36.6220, 29.1153] as [number, number],
    elevation: 1,
    type: "heritage",
    description: "Low-lying coastal town with ancient ruins",
    emoji: "🏛️",
  },
  {
    name: "Dalyan",
    coords: [36.8340, 28.6426] as [number, number],
    elevation: 0.5,
    type: "wildlife",
    description: "Caretta caretta turtle nesting site",
    emoji: "🐢",
  },
  {
    name: "Ölüdeniz",
    coords: [36.5495, 29.1155] as [number, number],
    elevation: 1,
    type: "nature",
    description: "Blue Lagoon - UNESCO candidate",
    emoji: "🏝️",
  },
  {
    name: "Datça",
    coords: [36.7234, 27.6833] as [number, number],
    elevation: 2,
    type: "fishing",
    description: "Traditional fishing community",
    emoji: "🎣",
  },
];

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 12, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function MuglaMap() {
  const [seaLevelRise, setSeaLevelRise] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<typeof coastalLocations[0] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([36.85, 28.25]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate affected zones based on sea level rise
  const affectedLocations = useMemo(() => {
    return coastalLocations.map(loc => ({
      ...loc,
      isAffected: loc.elevation <= seaLevelRise / 100,
      riskLevel: loc.elevation <= seaLevelRise / 200 
        ? "critical" 
        : loc.elevation <= seaLevelRise / 100 
          ? "high" 
          : loc.elevation <= seaLevelRise / 50 
            ? "moderate" 
            : "low"
    }));
  }, [seaLevelRise]);

  const getIcon = (location: typeof affectedLocations[0]) => {
    if (location.riskLevel === "critical") {
      return createCustomIcon("#ef4444", location.emoji);
    } else if (location.riskLevel === "high") {
      return createCustomIcon("#f59e0b", location.emoji);
    } else if (location.riskLevel === "moderate") {
      return createCustomIcon("#eab308", location.emoji);
    }
    return createCustomIcon("#22c55e", location.emoji);
  };

  const handleLocationClick = (location: typeof coastalLocations[0]) => {
    setSelectedLocation(location);
    setMapCenter(location.coords);
  };

  if (!mounted) {
    return (
      <div className="w-full h-[500px] rounded-2xl bg-slate-900/50 animate-pulse flex items-center justify-center">
        <span className="text-muted-foreground">Loading map...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Sea Level Rise Slider */}
      <Card className="p-5 mb-6 bg-card/50 border-sky-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sky-300 flex items-center gap-2">
            <span className="text-xl">🌊</span> Projected Sea Level Rise
          </h3>
          <Badge variant="outline" className={`
            ${seaLevelRise > 75 ? "text-red-400 border-red-400" : 
              seaLevelRise > 50 ? "text-orange-400 border-orange-400" : 
              seaLevelRise > 25 ? "text-amber-400 border-amber-400" : 
              "text-emerald-400 border-emerald-400"}
          `}>
            +{(seaLevelRise / 100).toFixed(1)}m by 2100
          </Badge>
        </div>
        <Slider
          value={[seaLevelRise]}
          onValueChange={(v) => setSeaLevelRise(v[0])}
          max={100}
          step={1}
          className="mb-3"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Current</span>
          <span>+0.5m</span>
          <span>+1m (Worst case 2100)</span>
        </div>
      </Card>

      {/* Map Container */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: "500px" }}>
          <MapContainer
            center={mapCenter}
            zoom={9}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            
            <MapController center={mapCenter} />

            {/* Render markers for each location */}
            {affectedLocations.map((location) => (
              <Marker
                key={location.name}
                position={location.coords}
                icon={getIcon(location)}
                eventHandlers={{
                  click: () => handleLocationClick(location)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[180px]">
                    <h4 className="font-bold text-slate-800 text-base mb-1">
                      {location.emoji} {location.name}
                    </h4>
                    <p className="text-xs text-slate-600 mb-2">{location.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Elevation:</span>
                      <span className="font-mono font-semibold">{location.elevation}m</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-slate-500">Risk Level:</span>
                      <span className={`font-semibold ${
                        location.riskLevel === "critical" ? "text-red-600" :
                        location.riskLevel === "high" ? "text-orange-600" :
                        location.riskLevel === "moderate" ? "text-amber-600" :
                        "text-green-600"
                      }`}>
                        {location.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Danger circles for affected areas */}
            {affectedLocations
              .filter(loc => loc.riskLevel === "critical" || loc.riskLevel === "high")
              .map(location => (
                <Circle
                  key={`circle-${location.name}`}
                  center={location.coords}
                  radius={3000 + (seaLevelRise * 50)}
                  pathOptions={{
                    color: location.riskLevel === "critical" ? "#ef4444" : "#f59e0b",
                    fillColor: location.riskLevel === "critical" ? "#ef4444" : "#f59e0b",
                    fillOpacity: 0.2,
                    weight: 2,
                  }}
                />
              ))
            }
          </MapContainer>
        </div>

        {/* Floating Legend */}
        <div className="absolute top-4 right-4 z-[1000]">
          <Card className="p-3 bg-slate-900/90 backdrop-blur border-white/10">
            <h4 className="text-xs font-semibold text-slate-400 mb-2">Risk Level</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-red-400">Critical</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-orange-400">High</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-amber-400">Moderate</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-emerald-400">Low</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
        {affectedLocations.map((location) => (
          <Card
            key={location.name}
            className={`p-3 cursor-pointer transition-all hover:scale-[1.02] ${
              selectedLocation?.name === location.name 
                ? "ring-2 ring-sky-500 bg-sky-950/30" 
                : "bg-card/50"
            } ${
              location.riskLevel === "critical" ? "border-red-500/30" :
              location.riskLevel === "high" ? "border-orange-500/30" :
              location.riskLevel === "moderate" ? "border-amber-500/30" :
              "border-emerald-500/30"
            }`}
            onClick={() => handleLocationClick(location)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{location.emoji}</span>
              <span className="font-semibold text-sm">{location.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Elev: {location.elevation}m</span>
              <Badge 
                variant="outline" 
                className={`text-[10px] ${
                  location.riskLevel === "critical" ? "text-red-400 border-red-400/50" :
                  location.riskLevel === "high" ? "text-orange-400 border-orange-400/50" :
                  location.riskLevel === "moderate" ? "text-amber-400 border-amber-400/50" :
                  "text-emerald-400 border-emerald-400/50"
                }`}
              >
                {location.riskLevel}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

