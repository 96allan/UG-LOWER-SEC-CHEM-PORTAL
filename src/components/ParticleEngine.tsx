import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Layers, HelpCircle, Activity, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface ParticleEngineProps {
  classLevel: string;
  topicId: string;
  onActionCompleted: (skill: "structural" | "experimental") => void;
}

// Elements n=1 to 20 for Bohr Ring simulator
const elementsList = [
  { symbol: "H", name: "Hydrogen", num: 1, config: [1], group: "Group 1", mass: 1 },
  { symbol: "He", name: "Helium", num: 2, config: [2], group: "Group 8 (Noble Gases)", mass: 4 },
  { symbol: "Li", name: "Lithium", num: 3, config: [2, 1], group: "Group 1 (Alkali Metals)", mass: 7 },
  { symbol: "Be", name: "Beryllium", num: 4, config: [2, 2], group: "Group 2", mass: 9 },
  { symbol: "B", name: "Boron", num: 5, config: [2, 3], group: "Group 3", mass: 11 },
  { symbol: "C", name: "Carbon", num: 6, config: [2, 4], group: "Group 4 (Carbon Group)", mass: 12 },
  { symbol: "N", name: "Nitrogen", num: 7, config: [2, 5], group: "Group 5", mass: 14 },
  { symbol: "O", name: "Oxygen", num: 8, config: [2, 6], group: "Group 6", mass: 16 },
  { symbol: "F", name: "Fluorine", num: 9, config: [2, 7], group: "Group 7 (Halogens)", mass: 19 },
  { symbol: "Ne", name: "Neon", num: 10, config: [2, 8], group: "Group 8 (Noble Gases)", mass: 20 },
  { symbol: "Na", name: "Sodium", num: 11, config: [2, 8, 1], group: "Group 1 (Alkali Metals)", mass: 23 },
  { symbol: "Mg", name: "Magnesium", num: 12, config: [2, 8, 2], group: "Group 2", mass: 24 },
  { symbol: "Al", name: "Aluminium", num: 13, config: [2, 8, 3], group: "Group 3", mass: 27 },
  { symbol: "Si", name: "Silicon", num: 14, config: [2, 8, 4], group: "Group 4", mass: 28 },
  { symbol: "P", name: "Phosphorus", num: 15, config: [2, 8, 5], group: "Group 5", mass: 31 },
  { symbol: "S", name: "Sulfur", num: 16, config: [2, 8, 6], group: "Group 6", mass: 32 },
  { symbol: "Cl", name: "Chlorine", num: 17, config: [2, 8, 7], group: "Group 7 (Halogens)", mass: 35.5 },
  { symbol: "Ar", name: "Argon", num: 18, config: [2, 8, 8], group: "Group 8 (Noble Gases)", mass: 40 },
  { symbol: "K", name: "Potassium", num: 19, config: [2, 8, 8, 1], group: "Group 1 (Alkali Metals)", mass: 39 },
  { symbol: "Ca", name: "Calcium", num: 20, config: [2, 8, 8, 2], group: "Group 2", mass: 40 }
];

export default function ParticleEngine({ classLevel, topicId, onActionCompleted }: ParticleEngineProps) {
  // S1 States state
  const [thermalEnergy, setThermalEnergy] = useState<number>(30); // 10 = Solid, 45 = Liquid, 90 = Gas/Sublime
  const [iodineThermal, setIodineThermal] = useState<number>(20);
  
  // S2 Atomic state
  const [selectedElementIndex, setSelectedElementIndex] = useState<number>(10); // Standard Sodium (Na, index 10)
  const currentElement = elementsList[selectedElementIndex];

  // S3 Bonding state
  const [bondingMode, setBondingMode] = useState<"ionic" | "covalent" | "graphite" | "diamond">("ionic");
  const [ionElectronTransferred, setIonElectronTransferred] = useState(false);
  const [covalentShared, setCovalentShared] = useState(false);

  // S4 Collision state
  const [collisionSpeed, setCollisionSpeed] = useState<number>(40);
  const [particlesCount, setParticlesCount] = useState<number>(25);
  const [collisionStats, setCollisionStats] = useState({ totalCollisions: 0, successfulCollisions: 0 });
  const [collisionAreaParticles, setCollisionAreaParticles] = useState<Particle[]>([]);

  // Simulation updates loop
  useEffect(() => {
    // Populate particles for collision visualizer if on S4 Topic 1 (rates_of_reactions)
    if (classLevel === "S4") {
      const initial: Particle[] = [];
      const colors = ["#ec4899", "#3b82f6"]; // Reactant keys
      for (let i = 0; i < particlesCount; i++) {
        initial.push({
          id: i,
          x: Math.random() * 260 + 20,
          y: Math.random() * 160 + 20,
          vx: (Math.random() - 0.5) * (collisionSpeed / 10),
          vy: (Math.random() - 0.5) * (collisionSpeed / 10),
          color: colors[i % 2]
        });
      }
      setCollisionAreaParticles(initial);
      setCollisionStats({ totalCollisions: 0, successfulCollisions: 0 });
    }
  }, [classLevel, topicId, particlesCount]);

  useEffect(() => {
    if (classLevel !== "S4") return;
    
    let animationId: number;
    const updatePhysics = () => {
      setCollisionAreaParticles((prev) => {
        let hits = 0;
        let success = 0;
        const speedMultiplier = collisionSpeed / 15;
        const currentForceThreshold = 2.5; // threshold speed for 'successful' collision products

        const updated = prev.map((p) => {
          let nx = p.x + p.vx * speedMultiplier;
          let ny = p.y + p.vy * speedMultiplier;
          let nvx = p.vx;
          let nvy = p.vy;

          // Wall bounce
          if (nx < 10 || nx > 290) {
            nvx = -nvx;
            nx = Math.max(10, Math.min(290, nx));
          }
          if (ny < 10 || ny > 190) {
            nvy = -nvy;
            ny = Math.max(10, Math.min(190, ny));
          }

          return { ...p, x: nx, y: ny, vx: nvx, vy: nvy };
        });

        // Simple mutual collision check
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const dx = updated[i].x - updated[j].x;
            const dy = updated[i].y - updated[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 12) {
              // Bounce
              const tempVx = updated[i].vx;
              const tempVy = updated[i].vy;
              updated[i].vx = updated[j].vx;
              updated[i].vy = updated[j].vy;
              updated[j].vx = tempVx;
              updated[j].vy = tempVy;

              hits += 1;
              
              // If it's different color reactants and speeds exceed threshold, turn into product (Green!)
              if (updated[i].color !== updated[j].color && (Math.abs(tempVx) + Math.abs(tempVy)) > currentForceThreshold) {
                if (updated[i].color !== "#10b981" && updated[j].color !== "#10b981") {
                  updated[i].color = "#10b981"; // Success product
                  updated[j].color = "#10b981";
                  success += 1;
                }
              }
            }
          }
        }

        if (hits > 0) {
          setCollisionStats((s) => ({
            totalCollisions: s.totalCollisions + hits,
            successfulCollisions: s.successfulCollisions + success
          }));
          if (success > 0) {
            // Give structural mastering progress reward
            onActionCompleted("structural");
          }
        }

        return updated;
      });

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [classLevel, collisionSpeed]);

  // Determine which sub-view to display based on selected topic
  const renderScaffoldingView = () => {
    switch (classLevel) {
      case "S1":
        if (topicId === "states_of_matter") {
          const isSolid = thermalEnergy < 25;
          const isLiquid = thermalEnergy >= 25 && thermalEnergy < 65;
          const isGas = thermalEnergy >= 65;

          return (
            <div className="space-y-4" id="states_scaffold_view">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Molar Particle Density & Movement Model
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                  {isSolid ? "Solid Crystalline State" : isLiquid ? "Liquid Fluid State" : "Gaseous Sublimed State"}
                </span>
              </div>

              {/* Box of Particles */}
              <div className="relative h-48 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-x-0 bottom-0 top-0 opacity-10 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Visualizing particles depending on thermodynamics */}
                <div className={`grid gap-2 transform transition-all duration-300 p-4 ${
                  isSolid 
                    ? "grid-cols-8 place-content-center scale-90" 
                    : isLiquid 
                    ? "grid-cols-6 place-content-around animate-[pulse_3s_infinite]" 
                    : "flex flex-wrap justify-between items-center w-full h-full max-w-xs"
                }`}>
                  {Array.from({ length: 32 }).map((_, i) => {
                    const vibration = isSolid ? 2 : isLiquid ? 8 : 28;
                    const speedClass = isSolid 
                      ? "animate-[ping_0.4s_infinite_alternate]" 
                      : isLiquid 
                      ? "animate-[spin_4s_linear_infinite]" 
                      : "animate-[bounce_1s_infinite_alternate]";
                    
                    return (
                      <motion.div
                        key={i}
                        animate={{
                          x: (Math.random() - 0.5) * vibration,
                          y: (Math.random() - 0.5) * vibration,
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: isSolid ? 0.1 : isLiquid ? 0.3 : 0.6,
                          ease: "easeInOut"
                        }}
                        className={`w-4 h-4 rounded-full border border-teal-300 shadow-lg ${
                          isSolid 
                            ? "bg-gradient-to-br from-teal-400 to-emerald-600" 
                            : isLiquid 
                            ? "bg-gradient-to-br from-indigo-400 to-indigo-600" 
                            : "bg-gradient-to-br from-amber-400 to-rose-600"
                        }`}
                      />
                    );
                  })}
                </div>

                <div className="absolute top-2 left-2 bg-slate-900/90 text-[10px] text-slate-400 p-2 rounded border border-slate-800 max-w-xs">
                  {isSolid && "Particles bound tightly in structured position, vibrating on spot with minimal kinetics."}
                  {isLiquid && "Particles have sufficient thermal dynamics to slip and roll over each other, filling volumes."}
                  {isGas && "All intermolecular holding bonds shattered. High particle velocity, maximal spacing."}
                </div>
              </div>

              {/* Thermal slide controller */}
              <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-slate-400">Introduce Thermal Energy (Heat)</span>
                  <span className="text-amber-400 font-mono font-medium">{thermalEnergy}°C</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thermalEnergy}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setThermalEnergy(val);
                    onActionCompleted("structural");
                  }}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  id="states_thermal_slider"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>Solid Frame</span>
                  <span>Transition (Liquid)</span>
                  <span>Gas / Sublimation</span>
                </div>
              </div>
            </div>
          );
        } else if (topicId === "chemistry_society") {
          return (
            <div className="space-y-4" id="society_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                Laboratory Protective Equipment & Hazards Assembly
              </div>
              <p className="text-xs text-slate-400">
                Correctly identify the chemical warning hazard sign matching description.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="border border-slate-800 bg-slate-950 p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-yellow-600/50 hover:bg-slate-900/30 transition-all text-slate-300"
                  onClick={() => onActionCompleted("structural")}
                  id="hazard_toxic_click"
                >
                  <span className="text-3xl">💀</span>
                  <span className="text-xs font-bold text-slate-200 mt-2">Corrosive / Toxic</span>
                  <span className="text-[10px] text-slate-500 mt-1">S1 T1 Indicator: Keep away from open skin.</span>
                </div>

                <div 
                  className="border border-slate-800 bg-slate-950 p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-500/50 hover:bg-slate-900/30 transition-all text-slate-300"
                  onClick={() => onActionCompleted("structural")}
                  id="hazard_flam_click"
                >
                  <span className="text-3xl">🔥</span>
                  <span className="text-xs font-bold text-slate-200 mt-2">Highly Flammable</span>
                  <span className="text-[10px] text-slate-500 mt-1">Do not operate neat fires adjacent to solvent.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  The <strong>Competency-Based Curriculum (CBC)</strong> requires students to master safety habits at the outset of S1, safeguarding experimental chemical procedures.
                </span>
              </div>
            </div>
          );
        } else {
          // Mixtures
          return (
            <div className="space-y-4" id="mixtures_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Physical Separation Principle: Molecule Sorting
              </div>
              <p className="text-xs text-slate-400">
                Pure substances possess identical characteristics, while mixtures retain the physical qualities of their component parts. Select a filter separation method:
              </p>

              <div className="space-y-2">
                <button 
                  onClick={() => onActionCompleted("structural")}
                  className="w-full text-left p-2.5 rounded border border-slate-800 hover:border-teal-500 bg-slate-900/50 hover:bg-slate-900 text-xs flex justify-between items-center transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span className="font-semibold text-slate-300">Filter precipitate solids (Filtration)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Separates: Liquid / Solid</span>
                </button>

                <button 
                  onClick={() => onActionCompleted("structural")}
                  className="w-full text-left p-2.5 rounded border border-slate-800 hover:border-indigo-500 bg-slate-900/50 hover:bg-slate-900 text-xs flex justify-between items-center transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span className="font-semibold text-slate-300">Boil distinct fractions (Fractional Distillation)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Separates: Boiling Points difference</span>
                </button>
              </div>
            </div>
          );
        }

      case "S2":
        if (topicId === "periodic_trends") {
          return (
            <div className="space-y-4" id="periodic_scaffold_view">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Bohr Orbital Configuration Engine
                </h4>
                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-900">
                  Hydrogen to Calcium (n=1 to 20)
                </div>
              </div>

              {/* Element Navigation Selector Grid */}
              <div className="grid grid-cols-5 gap-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
                {elementsList.map((el, idx) => (
                  <button
                    key={el.symbol}
                    onClick={() => {
                      setSelectedElementIndex(idx);
                      onActionCompleted("structural");
                    }}
                    className={`p-1.5 rounded text-[11px] font-mono font-bold border transition-all text-center ${
                      selectedElementIndex === idx
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800/80"
                    }`}
                  >
                    {el.symbol}
                    <span className="block text-[8px] font-normal text-slate-500">Z={el.num}</span>
                  </button>
                ))}
              </div>

              {/* Orbital Drawing and Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/50 border border-slate-800/50 p-3 rounded-xl">
                {/* Visual SVG Bohr Model */}
                <div className="flex items-center justify-center p-2 bg-slate-950 rounded-lg min-h-[160px] relative">
                  <svg className="w-40 h-40" viewBox="0 0 200 200">
                    {/* Concentric Shells */}
                    {currentElement.config.map((_, ringIdx) => {
                      const radius = 30 + (ringIdx + 1) * 18;
                      return (
                        <circle
                          key={ringIdx}
                          cx="100"
                          cy="100"
                          r={radius}
                          fill="none"
                          stroke="rgba(99, 102, 241, 0.25)"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                      );
                    })}

                    {/* Central Nucleus */}
                    <circle cx="100" cy="100" r="16" fill="rgba(244, 63, 94, 0.9)" />
                    <text
                      x="100"
                      y="104"
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      {currentElement.symbol}
                    </text>

                    {/* Electrons on each shell */}
                    {currentElement.config.map((electronsCount, ringIdx) => {
                      const radius = 30 + (ringIdx + 1) * 18;
                      return Array.from({ length: electronsCount }).map((_, electIdx) => {
                        const angle = (electIdx * 360) / electronsCount;
                        const radians = (angle * Math.PI) / 180;
                        const ex = 100 + radius * Math.cos(radians);
                        const ey = 100 + radius * Math.sin(radians);
                        return (
                          <circle
                            key={`${ringIdx}-${electIdx}`}
                            cx={ex}
                            cy={ey}
                            r="4.5"
                            fill="#10b981"
                            stroke="#065f46"
                            strokeWidth="1"
                            className="animate-pulse"
                          />
                        );
                      });
                    })}
                  </svg>
                  <div className="absolute bottom-1 right-2 text-[8px] font-mono text-emerald-400">
                    🟢 Electron rings
                  </div>
                </div>

                {/* Properties */}
                <div className="flex flex-col justify-center space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase font-mono tracking-wider text-[9px] block">Chemical Name</span>
                    <strong className="text-slate-200 text-lg">{currentElement.name} (Z = {currentElement.num})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase font-mono tracking-wider text-[9px] block">Electron Configuration</span>
                    <strong className="text-emerald-400 font-mono text-base">{currentElement.config.join(", ")}</strong>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[9px]">Periodic Group</span>
                      <span className="text-slate-350 font-medium">{currentElement.group}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">Relative Mass</span>
                      <span className="text-slate-350 font-mono font-medium">{currentElement.mass} u</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-orange-400 italic bg-amber-950/20 px-2 py-1 rounded border border-amber-900/40">
                    Group Trends: Outer shells dictate bonding traits! {currentElement.config[currentElement.config.length - 1]} valence electrons.
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (topicId === "acids_alkalis") {
          return (
            <div className="space-y-4" id="acids_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-violet-400" />
                Ionic Interactions: H⁺ vs OH⁻ Acid-Base Balance
              </div>
              <p className="text-xs text-slate-400">
                Understand acidity and basicity using pH values. Select solution properties:
              </p>

              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => onActionCompleted("structural")} 
                  className="bg-rose-950/30 border border-rose-800/40 hover:border-rose-500 text-center p-3 rounded-lg text-rose-300 hover:bg-rose-900/10 transition-all cursor-pointer"
                >
                  <div className="text-lg font-bold">pH 1</div>
                  <div className="text-[9px] text-slate-400 mt-1">Strongly Acidic (Excess H⁺)</div>
                </button>
                <button 
                  onClick={() => onActionCompleted("structural")} 
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500 text-center p-3 rounded-lg text-emerald-400 hover:bg-slate-850/10 transition-all cursor-pointer"
                >
                  <div className="text-lg font-bold">pH 7</div>
                  <div className="text-[9px] text-slate-400 mt-1">Neutral Water (Balanced)</div>
                </button>
                <button 
                  onClick={() => onActionCompleted("structural")} 
                  className="bg-indigo-950/30 border border-indigo-800/40 hover:border-indigo-500 text-center p-3 rounded-lg text-indigo-300 hover:bg-indigo-900/10 transition-all cursor-pointer"
                >
                  <div className="text-lg font-bold">pH 13</div>
                  <div className="text-[9px] text-slate-400 mt-1">Strongly Alkaline (OH⁻ ions)</div>
                </button>
              </div>
            </div>
          );
        } else {
          // Air and combustion
          return (
            <div className="space-y-4" id="air_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Atmospheric Air Gas Breakdown
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs items-center">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-indigo-500" /> Nitrogen (N₂)
                  </span>
                  <span className="font-mono text-slate-300 font-bold">78 %</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded bg-rose-500" /> Oxygen (O₂)
                  </span>
                  <span className="font-mono text-slate-300 font-bold">21 %</span>
                </div>
                <div className="flex justify-between text-xs items-center text-slate-500">
                  <span>Carbon Dioxide (CO₂) & Noble Gases</span>
                  <span className="font-mono font-bold">1 %</span>
                </div>
              </div>
              <button 
                onClick={() => onActionCompleted("structural")}
                className="w-full py-2 bg-indigo-600/95 hover:bg-indigo-650 font-bold text-white rounded text-xs transition-colors"
              >
                Assemble Atmospheric Mixture Model
              </button>
            </div>
          );
        }

      case "S3":
        if (topicId === "chemical_bonding") {
          return (
            <div className="space-y-4" id="bonding_scaffold_view">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Valence Orbital Cloud Assembly
                </h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setBondingMode("ionic");
                      setIonElectronTransferred(false);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      bondingMode === "ionic"
                        ? "bg-indigo-950 text-indigo-300 border-indigo-700"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Ionic Bond
                  </button>
                  <button
                    onClick={() => {
                      setBondingMode("covalent");
                      setCovalentShared(false);
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      bondingMode === "covalent"
                        ? "bg-indigo-950 text-indigo-300 border-indigo-700"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Covalent Bond
                  </button>
                </div>
              </div>

              {bondingMode === "ionic" ? (
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl space-y-3">
                  <p className="text-[11px] text-slate-400">
                    <strong>Ionic Transfer Example:</strong> Sodium (2,8,1) donates 1 outer electron to Chlorine (2,8,7), creating oppositely charged particles bound electrostatic forces.
                  </p>

                  <div className="flex justify-around items-center h-28 relative">
                    {/* Sodium Atom */}
                    <div className="text-center">
                      <div className={`w-14 h-14 rounded-full border border-dashed border-indigo-500 flex items-center justify-center relative ${
                        ionElectronTransferred ? "bg-indigo-900/10 text-indigo-400 border-indigo-600 font-bold scale-90" : "bg-slate-900 text-slate-300"
                      }`}>
                        Na{ionElectronTransferred ? "⁺" : ""}
                        {/* Outer single electron */}
                        {!ionElectronTransferred && (
                          <motion.div
                            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute -top-1 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600 cursor-pointer"
                            onClick={() => {
                              setIonElectronTransferred(true);
                              onActionCompleted("structural");
                            }}
                            title="Click electron to donate to Chlorine!"
                          />
                        )}
                      </div>
                      <span className="text-[10px] block mt-1 text-slate-500">{ionElectronTransferred ? "Na⁺ ion (2,8)" : "Na atom (2,8,1)"}</span>
                    </div>

                    <ArrowRight className={`w-5 h-5 text-slate-600 ${ionElectronTransferred ? "text-emerald-400 animate-pulse" : ""}`} />

                    {/* Chlorine Atom */}
                    <div className="text-center">
                      <div className={`w-14 h-14 rounded-full border border-dashed border-rose-500 flex items-center justify-center relative ${
                        ionElectronTransferred ? "bg-rose-900/10 text-rose-400 border-rose-600 font-bold scale-110" : "bg-slate-900 text-slate-300"
                      }`}>
                        Cl{ionElectronTransferred ? "⁻" : ""}
                        {ionElectronTransferred && (
                          <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-600" />
                        )}
                      </div>
                      <span className="text-[10px] block mt-1 text-slate-500">{ionElectronTransferred ? "Cl⁻ ion (2,8,8)" : "Cl atom (2,8,7)"}</span>
                    </div>
                  </div>

                  {!ionElectronTransferred ? (
                    <button
                      onClick={() => {
                        setIonElectronTransferred(true);
                        onActionCompleted("structural");
                      }}
                      className="w-full py-1.5 bg-indigo-600/90 hover:bg-indigo-650 font-bold rounded text-xs text-white"
                    >
                      Trigger Valence Transfer (Donate outer Sodium electron)
                    </button>
                  ) : (
                    <div className="p-2 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 text-xs text-center">
                      ✓ Ionic transfer complete! Opposites attract to build a hard crystalline salt lattice!
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl space-y-3">
                  <p className="text-[11px] text-slate-400">
                    <strong>Covalent Shared Octets:</strong> Two Oxygen atoms share shared pairs of valence electrons to construct a gaseous molecule.
                  </p>

                  <div className="flex justify-center items-center h-28 relative">
                    {/* Intersecting Venn circles for orbit overlap */}
                    <div className="flex -space-x-4">
                      <div className="w-16 h-16 rounded-full border-2 border-indigo-500/80 bg-slate-900/20 flex flex-col justify-center items-center relative">
                        <span className="text-xs font-bold text-slate-300">Oxygen</span>
                        <span className="text-[8px] text-slate-500">Atomic</span>
                      </div>
                      <div className="w-16 h-16 rounded-full border-2 border-rose-500/80 bg-slate-900/20 flex flex-col justify-center items-center relative">
                        <span className="text-xs font-bold text-slate-300">Oxygen</span>
                        <div className="absolute inset-y-0 -left-1 flex flex-col justify-center gap-1">
                          <span className={`w-2 h-2 rounded-full bg-emerald-400 ${covalentShared ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all`} />
                          <span className={`w-2 h-2 rounded-full bg-emerald-400 ${covalentShared ? "scale-100 opacity-100" : "scale-0 opacity-0"} transition-all`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {!covalentShared ? (
                    <button
                      onClick={() => {
                        setCovalentShared(true);
                        onActionCompleted("structural");
                      }}
                      className="w-full py-1.5 bg-indigo-600/90 hover:bg-indigo-650 font-bold rounded text-xs text-white"
                    >
                      Mutually Intersect Valence Spheres
                    </button>
                  ) : (
                    <div className="p-2 rounded bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 text-xs text-center">
                      ✓ Overlapping cloud formed containing shared electronic pairs. Stable Covalent molecule achieved!
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        } else if (topicId === "carbon_environment") {
          return (
            <div className="space-y-4" id="carbon_scaffold_view">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Carbon Allotropy Visual Structures
                </h4>
                <div className="flex gap-1">
                  <button
                    onClick={() => setBondingMode("diamond")}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      bondingMode === "diamond"
                        ? "bg-slate-800 text-teal-300 border-teal-700"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Diamond Web
                  </button>
                  <button
                    onClick={() => setBondingMode("graphite")}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      bondingMode === "graphite"
                        ? "bg-slate-800 text-teal-300 border-teal-700"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Graphite Planes
                  </button>
                </div>
              </div>

              {bondingMode === "diamond" ? (
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-center space-y-3">
                  <span className="text-4xl text-sky-400">💎</span>
                  <div className="text-xs text-slate-300">
                    <strong>Rigid Tetrahedral Lattice:</strong> Each Carbon is covalently locked to 4 adjacent nodes. Zero delocalized electrons. Ultimate organic hardness.
                  </div>
                  <button 
                    onClick={() => onActionCompleted("structural")}
                    className="w-full py-1.5 bg-indigo-600/80 hover:bg-indigo-650 font-bold rounded text-xs text-white"
                  >
                    Analyse Tetrahedral Bonding Bonds
                  </button>
                </div>
              ) : (
                <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl text-center space-y-3">
                  <span className="text-4xl text-slate-400">✏️</span>
                  <div className="text-xs text-slate-300">
                    <strong>Hexagonal Layer Planes:</strong> Carbon bonds to 3 atoms in planes. 4th valence electron drifts freely, carrying electric currents. Slick, lubricating.
                  </div>
                  <button 
                    onClick={() => onActionCompleted("structural")}
                    className="w-full py-1.5 bg-indigo-600/80 hover:bg-indigo-650 font-bold rounded text-xs text-white"
                  >
                    Measure Conductivity of Graphite Layers
                  </button>
                </div>
              )}
            </div>
          );
        } else {
          // Stoichiometry moles
          return (
            <div className="space-y-4" id="stoichiometry_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Avogadro's Mole Conversion Balance
              </div>
              <p className="text-xs text-slate-400">
                A single mole has exactly <strong>6.022 x 10²³ particles</strong> and occupies 22.4 dm³ volume as a normal dry gas standard at STP.
              </p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-3">
                <div className="text-2xl font-bold font-mono text-indigo-400 hover:scale-105 transition-all">
                  1 Mole = 6.022 × 10²³
                </div>
                <button 
                  onClick={() => onActionCompleted("structural")} 
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-650 text-white font-bold rounded text-xs text-center w-full"
                >
                  Confirm Mass Stoichiometry Check
                </button>
              </div>
            </div>
          );
        }

      case "S4":
        if (topicId === "rates_of_reactions") {
          return (
            <div className="space-y-4" id="rates_scaffold_view">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Collision Theory Real-time Physics Arena
                </h4>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 animate-pulse">
                  {collisionStats.successfulCollisions} Reaction Products!
                </span>
              </div>

              {/* Kinetic boundary arena box */}
              <div className="relative h-44 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                {/* Simulated Particles */}
                {collisionAreaParticles.map((p) => (
                  <div
                    key={p.id}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    className={`absolute w-3 h-3 rounded-full border border-slate-950 transition-all duration-75 ${
                      p.color === "#10b981" 
                        ? "bg-gradient-to-r from-emerald-400 to-green-600 shadow-md shadow-emerald-500/20" 
                        : p.color === "#ec4899" 
                        ? "bg-rose-500" 
                        : "bg-sky-500"
                    }`}
                  />
                ))}

                <div className="absolute top-2 right-2 flex flex-col text-[9px] bg-slate-900/90 py-1.5 px-2 rounded border border-slate-800 font-mono text-slate-400 gap-0.5">
                  <span>🔴 Pink: Reactant A</span>
                  <span>🔵 Blue: Reactant B</span>
                  <span>🟢 Green: Yield Product!</span>
                </div>
              </div>

              <div className="bg-slate-905 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Concentration Amount (Molecules Count)</span>
                  <strong className="text-sky-400 font-mono">{particlesCount} Elements</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  value={particlesCount}
                  onChange={(e) => setParticlesCount(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  id="rates_concentration_slider"
                />

                <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
                  <span>Temperature (Collisions Velocity Force)</span>
                  <strong className="text-rose-400 font-mono">{collisionSpeed}°C</strong>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={collisionSpeed}
                  onChange={(e) => setCollisionSpeed(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  id="rates_speed_slider"
                />
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                💡 <strong>Collision Assumption:</strong> Increasing temperature expands collision velocity. Increasing concentrations raises encounter frequency, accelerating yields!
              </div>
            </div>
          );
        } else if (topicId === "electrochemistry") {
          return (
            <div className="space-y-4" id="electro_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                Redox Cathode Charge Transfers
              </div>
              <p className="text-xs text-slate-400">
                During CuSO₄ electroplating, positively charged copperions migrate to the cathode, picking up 2 electrons to plate outer surfaces.
              </p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-center text-xs">
                <span className="block font-mono text-emerald-400 font-bold bg-slate-900 py-1.5 rounded">
                  Cu²⁺ (aq) + 2e⁻ ⇌ Cu (s)  [Reduction]
                </span>
                <button 
                  onClick={() => onActionCompleted("structural")} 
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-650 text-white font-bold rounded text-xs text-center w-full"
                >
                  Confirm Electron Reduction Model
                </button>
              </div>
            </div>
          );
        } else {
          // Industrial Extraction
          return (
            <div className="space-y-4" id="industrial_scaffold_view">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-yellow-400" />
                Reactivity Series Hierarchy Check
              </div>
              <p className="text-xs text-slate-400">
                Lower reactive metals are easily isolated using simple carbon monoxide, while top reactive alkaline elements insist on strong electrical molten electrolysis.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-teal-400">
                  ⚡ <strong>Electrolytic Isolation:</strong><br/>
                  K, Na, Ca, Mg, Al
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-orange-400">
                  🔥 <strong>Carbon CO Reduction:</strong><br/>
                  Zn, Fe, Pb, Cu
                </div>
              </div>
              <button 
                onClick={() => onActionCompleted("structural")} 
                className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-650 text-white text-xs font-bold rounded text-center"
              >
                Sort Reactivity Extractive Order
              </button>
            </div>
          );
        }

      default:
        return (
          <div className="text-center py-6 text-slate-500 text-xs">
            No dynamic scaffolding layout active for this selected topic.
          </div>
        );
    }
  };

  return (
    <div className="bg-[#161e30] border border-white/5 rounded-xl p-5 shadow-xl flex flex-col h-full justify-between" id="conceptual_scaffolding_component">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#22d3ee]">
            Pillar I: Conceptual Scaffolding
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#0e1422] text-[#22d3ee] border border-white/5 uppercase tracking-wide">
            Quantum & Particle Engine
          </span>
        </div>
        
        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
          Visualizing internal microscopic atomic bonds and particle layouts under curriculum scaffolding guidelines.
        </p>
      </div>

      <div className="flex-grow my-1">
        {renderScaffoldingView()}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
          Interactive 3D Simulation
        </span>
        <span className="text-emerald-400 font-medium">✓ Structural Synced</span>
      </div>
    </div>
  );
}
