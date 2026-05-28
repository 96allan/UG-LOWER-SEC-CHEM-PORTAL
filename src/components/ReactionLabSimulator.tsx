import React, { useState, useEffect } from "react";
import { Flame, Play, RefreshCw, Zap, TrendingDown, CheckCircle, HelpCircle, Activity, Layout, Eye, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReactionLabSimulatorProps {
  classLevel: string;
  topicId: string;
  onActionCompleted: (skill: "experimental" | "structural") => void;
}

export default function ReactionLabSimulator({ classLevel, topicId, onActionCompleted }: ReactionLabSimulatorProps) {
  // Common states
  const [labState, setLabState] = useState<string>("init"); // init, running, success
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // S1 States
  const [sublimeHeatApplied, setSublimeHeatApplied] = useState(false);
  const [sublimeGasPercent, setSublimeGasPercent] = useState(0);
  const [chromatographySpeed, setChromatographySpeed] = useState(0);
  const [chromatographyY, setChromatographyY] = useState(0);

  // S2 States
  const [phosphorusIgnited, setPhosphorusIgnited] = useState(false);
  const [waterRisePercent, setWaterRisePercent] = useState(0);
  const [titrationHclVolume, setTitrationHclVolume] = useState(0); // 0 to 50mL
  const [titrationColorState, setTitrationColorState] = useState("#f43f5e"); // Pink to clear

  // S3 States
  const [conductivityCircuitActive, setConductivityCircuitActive] = useState(false);
  const [conductivityMedium, setConductivityMedium] = useState("solid_salt"); // solid_salt, aqueous_solution
  const [carbonateHeatApplied, setCarbonateHeatApplied] = useState(false);
  const [limewaterClarity, setLimewaterClarity] = useState("clear"); // clear, cloudy, chalky

  // S4 States
  const [kineticsHasCatalyst, setKineticsHasCatalyst] = useState(false);
  const [kineticsReacted, setKineticsReacted] = useState(false);
  const [electroplatingVoltage, setElectroplatingVoltage] = useState(0); // 0 to 12V
  const [platedThickness, setPlatedThickness] = useState(0); // 0 to 100%
  const [blastFurnaceTemp, setBlastFurnaceTemp] = useState(200); // 200°C to 1500°C

  // Safety checklist for S1 T1
  const [hasGoggles, setHasGoggles] = useState(false);
  const [hasGloves, setHasGloves] = useState(false);
  const [cabinetUnlocked, setCabinetUnlocked] = useState(false);

  // Reset lab setups whenever topic or class shifts
  useEffect(() => {
    setLabState("init");
    setErrorMessage(null);
    setSublimeHeatApplied(false);
    setSublimeGasPercent(0);
    setChromatographySpeed(0);
    setChromatographyY(0);
    setPhosphorusIgnited(false);
    setWaterRisePercent(0);
    setTitrationHclVolume(0);
    setTitrationColorState("#f43f5e");
    setConductivityCircuitActive(false);
    setConductivityMedium("solid_salt");
    setCarbonateHeatApplied(false);
    setLimewaterClarity("clear");
    setKineticsHasCatalyst(false);
    setKineticsReacted(false);
    setElectroplatingVoltage(0);
    setPlatedThickness(0);
    setBlastFurnaceTemp(200);
  }, [classLevel, topicId]);

  // S1 Chromatography animation
  useEffect(() => {
    if (chromatographySpeed > 0) {
      const interval = setInterval(() => {
        setChromatographyY((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLabState("success");
            onActionCompleted("experimental");
            return 100;
          }
          return prev + chromatographySpeed;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [chromatographySpeed]);

  // S2 Titration color logic
  useEffect(() => {
    // End point is exactly 25mL
    if (titrationHclVolume >= 24.5 && titrationHclVolume <= 25.5) {
      setTitrationColorState("#fad1d7"); // Light pink (Neutral endpoint!)
      setLabState("success");
      onActionCompleted("experimental");
    } else if (titrationHclVolume > 25.5) {
      setTitrationColorState("#ffffff"); // Completely clear / oversaturated acid
      setLabState("running");
    } else {
      setTitrationColorState("#f43f5e"); // Intense pink (Basic)
      setLabState("running");
    }
  }, [titrationHclVolume]);

  // S4 Electroplating copper plating animation
  useEffect(() => {
    if (electroplatingVoltage > 0) {
      const interval = setInterval(() => {
        setPlatedThickness((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLabState("success");
            onActionCompleted("experimental");
            return 100;
          }
          return prev + (electroplatingVoltage * 1.5);
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [electroplatingVoltage]);

  // Render proper emulator labs
  const renderLabView = () => {
    if (classLevel === "S1") {
      if (topicId === "chemistry_society") {
        const fullyEquipped = hasGoggles && hasGloves;
        return (
          <div className="space-y-4" id="society_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Chemical Safety Gear & Cabinet Log</h5>
            <p className="text-[11px] text-slate-400">
              S1 T1 requirement: Put on appropriate safety guards to safely unlock the acid storage cabinet.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setHasGoggles(!hasGoggles);
                  if (!hasGoggles && hasGloves) {
                    onActionCompleted("experimental");
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  hasGoggles 
                    ? "border-emerald-500 bg-emerald-950/20 text-emerald-400" 
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
                id="goggles_toggle_btn"
              >
                <div className="text-xl">🥽</div>
                <div className="text-xs font-bold mt-1">Chemical Safety Goggles</div>
                <div className="text-[9px] text-slate-500 mt-0.5">{hasGoggles ? "Equipped" : "Unequipped"}</div>
              </button>

              <button
                onClick={() => {
                  setHasGloves(!hasGloves);
                  if (hasGoggles && !hasGloves) {
                    onActionCompleted("experimental");
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  hasGloves 
                    ? "border-emerald-500 bg-emerald-950/20 text-emerald-400" 
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
                id="gloves_toggle_btn"
              >
                <div className="text-xl">🧤</div>
                <div className="text-xs font-bold mt-1">Nitrile Resistant Gloves</div>
                <div className="text-[9px] text-slate-500 mt-0.5">{hasGloves ? "Equipped" : "Unequipped"}</div>
              </button>
            </div>

            <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-300">Acid Cabinet Lockout</span>
                <span className="text-[10px] text-slate-500">
                  {fullyEquipped ? "Ready: Safety conditions compliant." : "LOCKED: Protect eyes and hands first."}
                </span>
              </div>
              <button
                disabled={!fullyEquipped}
                onClick={() => {
                  setCabinetUnlocked(true);
                  setLabState("success");
                  onActionCompleted("experimental");
                }}
                className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                  fullyEquipped 
                    ? "bg-indigo-600 hover:bg-indigo-650 text-white cursor-pointer" 
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
                id="cabinet_unlock_btn"
              >
                {cabinetUnlocked ? "Unlocked ✓" : "Unlock Cabinet"}
              </button>
            </div>

            {cabinetUnlocked && (
              <div className="p-2 bg-emerald-950/20 text-emerald-400 text-xs rounded border border-emerald-900/40 text-center">
                ✓ Safety protocols met! Cabinet opened successfully. Always treat HCl and H₂SO₄ as corrosive risks.
              </div>
            )}
          </div>
        );
      } else if (topicId === "states_of_matter") {
        return (
          <div className="space-y-4" id="states_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Sublimation of Iodine Crystals</h5>
            <p className="text-[11px] text-slate-400">
              Heat the base of the sealed tube containing raw solid iodine. Watch iodine bypass liquids to gaseous directly.
            </p>

            {/* Sublimation Visual Tube */}
            <div className="relative h-44 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex flex-col justify-between p-3">
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>Tube Lid (Cool watchglass)</span>
                <span>Base (Crucible)</span>
              </div>

              {/* Sealing structure with iodine gas vapor overlay */}
              <div className="relative flex-grow flex flex-col justify-end items-center">
                {/* Watchglass condenser top */}
                <div className="w-16 h-1 bg-sky-200 rounded-full mb-1 border border-sky-400" />
                
                {/* Plated sparkly recrystallized needle dots */}
                {sublimeGasPercent > 70 && (
                  <div className="flex gap-1 justify-center mb-8 animate-pulse text-violet-400 text-[10px] font-mono">
                    ✦ shiny solid iodine needles ✦
                  </div>
                )}

                {/* Heavy colorful gas plume */}
                <span 
                  style={{ opacity: sublimeGasPercent / 100 }} 
                  className="w-16 text-center text-xs font-bold text-violet-400 bg-violet-950/85 filter blur-[2px] rounded-lg py-3 transition-all duration-300"
                >
                  Purple Iodine Gas Plumes
                </span>

                {/* Crude Solid crystals at the absolute base */}
                {sublimeGasPercent < 90 && (
                  <div className="w-10 h-3 bg-violet-900 rounded-t-md mt-4 relative">
                    <div className="absolute inset-0 bg-violet-950/60 rounded" />
                  </div>
                )}
              </div>

              {/* Flame overlay */}
              {sublimeHeatApplied && (
                <div className="absolute bottom-1 right-12 animate-bounce text-orange-500 text-2xl">
                  🔥
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSublimeHeatApplied(true);
                  // Animate gas rise
                  let current = 0;
                  const intv = setInterval(() => {
                    current += 10;
                    setSublimeGasPercent(current);
                    if (current >= 100) {
                      clearInterval(intv);
                      setLabState("success");
                      onActionCompleted("experimental");
                    }
                  }, 150);
                }}
                disabled={sublimeHeatApplied}
                className="flex-grow py-2 bg-orange-600 hover:bg-orange-650 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                id="apply_heat_iodine"
              >
                <Flame className="w-4 h-4" />
                Apply Flame Heat
              </button>

              <button
                onClick={() => {
                  setSublimeHeatApplied(false);
                  setSublimeGasPercent(0);
                  setLabState("init");
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
                id="reset_iodine_btn"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            {labState === "success" && (
              <div className="p-2 bg-purple-950/20 text-purple-400 text-xs rounded border border-purple-900/40 text-center">
                ✓ Lab complete: Iodine directly sublimed to purple gas and then condensed straight back to solid on the cold glass. Physical state transition!
              </div>
            )}
          </div>
        );
      } else {
        // Chromatography paper
        return (
          <div className="space-y-4" id="chromatography_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Interactive Paper Chromatography</h5>
            <p className="text-[11px] text-slate-400">
              Run solvent elution to separate custom ink dyes based on physical affinity rules.
            </p>

            {/* Chromatography paper strip layout */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex justify-center items-center relative min-h-[160px]">
              <div className="w-24 h-36 bg-slate-300 border border-slate-400 shadow-inner flex flex-col justify-between items-center relative p-1 text-[8px] text-slate-600 font-mono">
                <span className="border-b border-dashed border-slate-400 w-full text-center">Solvent Front</span>
                
                {/* Moving pigment components bands */}
                {chromatographyY > 0 && (
                  <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center justify-end h-full">
                    {/* Fast solvent line */}
                    <div 
                      style={{ bottom: `${chromatographyY}%` }} 
                      className="absolute left-0 right-0 h-0.5 bg-sky-400/70"
                    />

                    {/* Highly soluble yellow dye */}
                    <motion.div 
                      style={{ bottom: `${chromatographyY * 0.85}%` }} 
                      className="absolute w-4 h-2 rounded bg-yellow-400 text-slate-900 text-[6px] text-center"
                    >
                      Rf 0.85
                    </motion.div>

                    {/* Mid soluble magenta dye */}
                    <motion.div 
                      style={{ bottom: `${chromatographyY * 0.55}%` }} 
                      className="absolute w-4 h-2 rounded bg-pink-500 text-white text-[6px] text-center"
                    >
                      Rf 0.55
                    </motion.div>

                    {/* Low soluble cyan dye */}
                    <motion.div 
                      style={{ bottom: `${chromatographyY * 0.25}%` }} 
                      className="absolute w-4 h-2 rounded bg-cyan-500 text-white text-[6px] text-center"
                    >
                      Rf 0.25
                    </motion.div>
                  </div>
                )}

                {/* Black spot origin base line */}
                <div className="border-t border-slate-500 w-full text-center">
                  Origin spot
                  <div className="w-2 h-2 rounded-full bg-slate-900 mx-auto" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setChromatographySpeed(5);
                  setLabState("running");
                }}
                disabled={chromatographySpeed > 0}
                className="flex-grow py-2 bg-teal-600 hover:bg-teal-650 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                id="run_chromatography_btn"
              >
                <Play className="w-3.5 h-3.5" />
                Start Chromatography Elution
              </button>
              <button
                onClick={() => {
                  setChromatographySpeed(0);
                  setChromatographyY(0);
                  setLabState("init");
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                id="reset_chroma_btn"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }
    } else if (classLevel === "S2") {
      if (topicId === "air_combustion") {
        return (
          <div className="space-y-4" id="air_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Burning Phosphorus over Water</h5>
            <p className="text-[11px] text-slate-400">
              S2 T1 lab: Oxide reactions consume precisely 21% oxygen gas, making base water liquid level rise inside.
            </p>

            <div className="relative h-44 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex flex-col justify-end p-2">
              {/* Glass inverted jar */}
              <div className="w-24 h-36 border-2 border-slate-600 border-b-0 mx-auto rounded-t-xl bg-slate-900/40 relative flex items-end justify-center">
                {/* Thick Phosphorus oxide white fumes */}
                {phosphorusIgnited && waterRisePercent < 80 && (
                  <div className="absolute inset-0 bg-white/70 animate-pulse text-[10px] text-slate-800 flex items-center justify-center font-bold text-center">
                    Thick Clouds of P₂O₅
                  </div>
                )}

                {/* Water Level Rising inside the Jar */}
                <motion.div 
                  initial={{ height: "5%" }}
                  animate={{ height: phosphorusIgnited ? "21%" : "5%" }}
                  transition={{ duration: 4 }}
                  className="w-full bg-blue-500/80 border-t border-blue-400 absolute bottom-0 left-0 right-0 z-10"
                />

                {/* Crucible with burning sample */}
                <div className="mb-4 z-20 text-center">
                  <span className="text-lg">{phosphorusIgnited ? "🔥" : "⚪"}</span>
                  <span className="block text-[8px] text-slate-400">Phosphorus</span>
                </div>
              </div>

              {/* Water trough base */}
              <div className="w-full h-4 bg-blue-600 border border-blue-500 rounded z-0" />
            </div>

            <div className="flex gap-2 animate-pulse">
              <button
                onClick={() => {
                  setPhosphorusIgnited(true);
                  setLabState("running");
                  setTimeout(() => {
                    setWaterRisePercent(21);
                    setLabState("success");
                    onActionCompleted("experimental");
                  }, 4000);
                }}
                disabled={phosphorusIgnited}
                className="w-full py-2 bg-orange-600 hover:bg-orange-650 text-white font-bold rounded text-xs transition-colors cursor-pointer"
                id="ignite_phosphorus_btn"
              >
                Ignite Phosphorus Candle
              </button>
            </div>
            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 text-emerald-400 text-xs rounded border border-emerald-900/40 text-center">
                ✓ Lab complete: Oxygen burned completely, and water rose by exactly 21% to fill the vacated vacuum pressure inside. Atmospheric ratio confirmed!
              </div>
            )}
          </div>
        );
      } else if (topicId === "periodic_trends") {
        return (
          <div className="space-y-4" id="periodic_trends_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Alkali Metal Reactivity Bay</h5>
            <p className="text-[11px] text-slate-400">
              Observe Group 1 Alkali trends. Drop highly explosive metals into dry water to test exothermic rates.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {["Lithium", "Sodium", "Potassium"].map((metal) => (
                <button
                  key={metal}
                  onClick={() => {
                    setLabState("running");
                    if (metal === "Potassium") {
                      // Lilac flame
                      setErrorMessage("⚠️ VIOLENT lilac flame explosion! Highly reactive potassium!");
                      onActionCompleted("experimental");
                      setLabState("success");
                    } else if (metal === "Sodium") {
                      setErrorMessage("⚠️ Fast darting hiss, golden orange flame sparks.");
                      onActionCompleted("experimental");
                      setLabState("success");
                    } else {
                      setErrorMessage("💡 Gentle bubbling effervescence, steady hydrogen release.");
                      onActionCompleted("experimental");
                      setLabState("success");
                    }
                  }}
                  className="bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800 rounded p-2 text-xs font-bold transition-all text-center cursor-pointer"
                  id={`drop_${metal.toLowerCase()}_btn`}
                >
                  🟢 Drop {metal}
                </button>
              ))}
            </div>

            {errorMessage && (
              <div className="p-3 bg-indigo-950/40 rounded-lg text-slate-300 border border-indigo-900/50 text-xs text-center font-semibold">
                {errorMessage}
              </div>
            )}
          </div>
        );
      } else {
        // Acids and Titration
        return (
          <div className="space-y-4" id="titration_lab">
            <h5 className="text-xs font-semibold text-sky-450 uppercase">Acid-Base Burette Titration</h5>
            <p className="text-[11px] text-slate-400">
              Gradually dispense 0.1M HCl into NaOH containing phenolphthalein. Neutralization endpoint is exactly <strong>25.0 mL</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Flask with liquids */}
              <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex flex-col justify-center items-center relative">
                <span className="text-[9px] text-slate-500 font-mono self-start mb-2">Conical Flask (pH indicators):</span>
                
                {/* Simulated conical geometry filled with liquid depending on state */}
                <div className="w-20 h-24 relative overflow-hidden bg-slate-900 border border-slate-700 rounded-b-xl flex items-end">
                  <div 
                    style={{ backgroundColor: titrationColorState, height: "45%" }} 
                    className="w-full transition-colors duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-800 font-semibold text-center select-none font-mono">
                    {titrationHclVolume > 0 ? `${titrationHclVolume.toFixed(1)} mL acid` : "NaOH flask"}
                  </div>
                </div>
              </div>

              {/* Volume sliders */}
              <div className="space-y-3 flex flex-col justify-center">
                <div className="text-xs">
                  <span className="text-slate-400 block mb-1">Drip HCl volume:</span>
                  <span className="text-indigo-400 font-mono font-bold text-lg">{titrationHclVolume.toFixed(1)} mL / 50 mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={titrationHclVolume}
                  onChange={(e) => setTitrationHclVolume(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                  id="titration_volume_slider"
                />

                <div className="text-[10px] text-slate-555 leading-tight">
                  {titrationHclVolume < 24 ? "🔴 Solution remains alkaline (Magenta pink pH > 8.2)." : 
                   titrationHclVolume > 26 ? "⚠️ Solution became highly acidic, indicator turned transparent clear!" :
                   "✓ PERFECTION! Clear light-pink neutrality reached (H⁺ ions fully balance OH⁻)."}
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (classLevel === "S3") {
      if (topicId === "chemical_bonding") {
        return (
          <div className="space-y-4" id="bonding_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Electrical Conductivity Lattice Assay</h5>
            <p className="text-[11px] text-slate-400">
              Verify ionic lattice rules: Does solid salt conduct currents? Flip medium to testing dissolved solution.
            </p>

            <div className="flex gap-2 rounded bg-slate-950 p-2 border border-slate-800">
              <button
                onClick={() => {
                  setConductivityMedium("solid_salt");
                  setConductivityCircuitActive(false);
                }}
                className={`flex-grow py-1 rounded text-xs font-semibold ${
                  conductivityMedium === "solid_salt" ? "bg-slate-800 text-teal-400" : "text-slate-500"
                }`}
              >
                Dry Solid Crystals
              </button>
              <button
                onClick={() => {
                  setConductivityMedium("aqueous_solution");
                }}
                className={`flex-grow py-1 rounded text-xs font-semibold ${
                  conductivityMedium === "aqueous_solution" ? "bg-slate-800 text-teal-400" : "text-slate-500"
                }`}
              >
                Aqueous Solution (NaCl in Water)
              </button>
            </div>

            {/* Test circuit visuals */}
            <div className="relative h-44 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex items-center justify-around p-3">
              {/* Lightbulb glowing or dark */}
              <div className="text-center">
                <span className={`text-4xl block transition-all ${
                  conductivityCircuitActive && conductivityMedium === "aqueous_solution" ? "scale-110 drop-shadow-[0_0_15px_#fbbf24] animate-pulse" : "opacity-30 filter grayscale"
                }`}>
                  💡
                </span>
                <span className="text-[9px] text-slate-500 block mt-1">Light Bulb</span>
              </div>

              {/* Electrodes dipping into beaker */}
              <div className="relative w-28 h-28 bg-slate-900 border border-slate-700 rounded-lg flex justify-around p-1 items-end pt-5">
                {/* Two crude metal rod electrodes */}
                <div className="w-1.5 h-16 bg-slate-400 border border-slate-500" />
                <div className="w-1.5 h-16 bg-slate-400 border border-slate-500" />

                {/* Medium Label inside beaker */}
                <div className="absolute inset-x-0 bottom-0 text-[10px] text-slate-350 bg-slate-950/80 py-1 rounded-b text-center border-t border-slate-800">
                  {conductivityMedium === "solid_salt" ? "Solid Sodium Chloride Lattice" : "Dissolved Ions (Free Swimming!)"}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setConductivityCircuitActive(true);
                if (conductivityMedium === "aqueous_solution") {
                  setLabState("success");
                  onActionCompleted("experimental");
                } else {
                  setLabState("running");
                }
              }}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-650 font-bold rounded text-xs text-white cursor-pointer"
              id="power_on_circuit_btn"
            >
              Power On Electro-circuit
            </button>

            {conductivityCircuitActive && conductivityMedium === "solid_salt" && (
              <div className="p-2 border border-rose-900/40 bg-rose-950/20 text-rose-400 text-xs rounded text-center">
                ⚠️ Bulb remains dark! Ions in solid salts are locked rigid in electrostatic crystals and cannot translate charge.
              </div>
            )}

            {conductivityCircuitActive && conductivityMedium === "aqueous_solution" && (
              <div className="p-2 border border-emerald-900/40 bg-emerald-950/20 text-emerald-400 text-xs rounded text-center">
                ✓ Shines Bright! Ions disassociate in water, moving dynamically to transport electrical charges. Test completed!
              </div>
            )}
          </div>
        );
      } else if (topicId === "carbon_environment") {
        return (
          <div className="space-y-4" id="carbon_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Carbonates Thermal Decomposition</h5>
            <p className="text-[11px] text-slate-450">
              Apply high flame heat to CaCO₃ powder. Gases pass via tube into basic phenolphthalein water of limewater. Watch milkiness!
            </p>

            <div className="relative h-44 bg-slate-950 border border-slate-850 rounded-xl overflow-hidden flex justify-around items-center p-3">
              {/* Solid Carbonate thermal test tube */}
              <div className="relative text-center">
                <span className="text-2xl block">{carbonateHeatApplied ? "🔥" : "💤"}</span>
                <span className="text-[8px] text-slate-500 block">Heating Limestone</span>
              </div>

              {/* Lime water indicator container */}
              <div className="text-center w-24">
                <div className={`w-16 h-20 rounded border mx-auto flex items-center justify-center transition-colors ${
                  limewaterClarity === "chalky" ? "bg-stone-200 text-stone-700 border-stone-400 font-bold" : "bg-sky-950/40 text-sky-400 border-sky-800"
                }`}>
                  <span className="text-[9px] font-mono leading-tight">{limewaterClarity.toUpperCase()} Limewater</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCarbonateHeatApplied(true);
                setLimewaterClarity("chalky");
                setLabState("success");
                onActionCompleted("experimental");
              }}
              className="w-full py-2 bg-orange-600 hover:bg-orange-650 text-white font-bold text-xs rounded flex justify-center items-center gap-1 cursor-pointer"
              id="decompose_carbonate_btn"
            >
              <Flame className="w-3.5 h-3.5" />
              Thermalize Limestone (CaCO₃)
            </button>
          </div>
        );
      } else {
        // Stoichiometry
        return (
          <div className="space-y-4" id="stoichiometry_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Chemical Mass Balancing Tray</h5>
            <p className="text-[11px] text-slate-450">
              Balance stoichiometric particles to satisfy Conservation of Mass rules: Reactant weights must exactly equal Product weights.
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs space-y-2 font-mono text-indigo-400">
              <div>Balance: 2H₂ + O₂ ⇌ ? H₂O</div>
              <button 
                onClick={() => {
                  setLabState("success");
                  onActionCompleted("experimental");
                }}
                className="px-4 py-1.5 bg-indigo-600 font-bold text-white rounded text-xs self-center"
              >
                Input coefficient: 2 Molecules 🟢
              </button>
            </div>
          </div>
        );
      }
    } else {
      // S4
      if (topicId === "rates_of_reactions") {
        return (
          <div className="space-y-4" id="kinetics_lab_simulator">
            <div className="flex justify-between items-center mb-1">
              <h5 className="text-xs font-semibold text-sky-450 uppercase flex items-center gap-1">
                <TrendingDown className="text-rose-400 w-4 h-4" />
                Activation Energy Barrier diagram: Ea Drop
              </h5>
              <div className="text-[10px] bg-slate-800 text-slate-300 font-mono py-0.5 px-2 rounded-full border border-slate-700">
                {kineticsHasCatalyst ? "MnO₂ Catalyst Injected" : "No Catalyst present"}
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              S4 T1: Dropping manganese dioxide catalyst opens a lower-energy alternative, letting many more random particles collide successfully.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Energy Barrier visual */}
              <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl min-h-[140px] flex flex-col justify-between relative">
                <span className="text-[9px] text-slate-500 font-mono">Activation Energy Energy Profile:</span>
                
                {/* SVG Energy Hill Curve */}
                <svg className="w-full h-24" viewBox="0 0 200 100">
                  {/* Energy axis */}
                  <line x1="10" y1="10" x2="10" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  <line x1="10" y1="90" x2="190" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

                  {/* Reactants horizontal line */}
                  <line x1="10" y1="70" x2="50" y2="70" stroke="#3b82f6" strokeWidth="2" />
                  <text x="12" y="65" fill="#3b82f6" fontSize="7" fontWeight="bold">Reactants (H₂O₂)</text>

                  {/* Un-catalyzed curve */}
                  <path 
                    d="M 50,70 Q 100,15 150,85" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth={kineticsHasCatalyst ? "1" : "2.5"} 
                    strokeDasharray={kineticsHasCatalyst ? "3 3" : "0"}
                  />
                  
                  {/* Catalyzed curve */}
                  {kineticsHasCatalyst && (
                    <path 
                      d="M 50,70 Q 100,45 150,85" 
                      fill="none" 
                      stroke="#10b981" 
                      strokeWidth="2.5" 
                      className="animate-pulse"
                    />
                  )}

                  {/* Products line */}
                  <line x1="150" y1="85" x2="190" y2="85" stroke="#10b981" strokeWidth="2" />
                  <text x="155" y="80" fill="#10b981" fontSize="7" fontWeight="bold">Products (O₂ + H₂O)</text>

                  {/* Barrier label heights */}
                  <text 
                    x="100" 
                    y={kineticsHasCatalyst ? "40" : "12"} 
                    fill={kineticsHasCatalyst ? "#10b981" : "#ef4444"} 
                    fontSize="7" 
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {kineticsHasCatalyst ? "Ea = 35 kJ/mol" : "Ea = 80 kJ/mol"}
                  </text>
                </svg>
              </div>

              {/* Interactive controller knobs */}
              <div className="flex flex-col justify-center space-y-3 p-1">
                <button
                  onClick={() => {
                    setKineticsHasCatalyst(true);
                    onActionCompleted("experimental");
                  }}
                  className={`w-full py-2.5 rounded text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    kineticsHasCatalyst 
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-900" 
                      : "bg-indigo-600 hover:bg-indigo-650 text-white"
                  }`}
                  id="add_catalyst_btn"
                >
                  <TrendingDown className="w-4 h-4" />
                  {kineticsHasCatalyst ? "Catalyst Present (Ea dropped) ✓" : "Introduce Manganese Dioxide Catalyst"}
                </button>

                <button
                  onClick={() => {
                    setKineticsReacted(true);
                    setLabState("success");
                    onActionCompleted("experimental");
                  }}
                  disabled={!kineticsHasCatalyst && !kineticsReacted}
                  className={`w-full py-2 font-bold rounded text-xs transition-all cursor-pointer ${
                    kineticsHasCatalyst && !kineticsReacted
                      ? "bg-rose-600 hover:bg-rose-650 text-white animate-bounce" 
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                  id="run_kinetics_beaker"
                >
                  {kineticsReacted ? "Reaction completed!" : "Initiate peroxide decomposition"}
                </button>
              </div>
            </div>

            {kineticsReacted && (
              <div className="p-2.5 bg-emerald-950/25 border border-emerald-900/40 text-emerald-400 rounded text-xs text-center font-semibold">
                ✓ Reaction complete! Lowered energy profile authorized rapid bond cleavage. Massive oxygen bubbles released instantly!
              </div>
            )}
          </div>
        );
      } else if (topicId === "electrochemistry") {
        return (
          <div className="space-y-4" id="electroplating_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">CuSO₄ Copper Electroplating Tank</h5>
            <p className="text-[11px] text-slate-400">
              Apply electrolytic cell voltage to trigger copper reduction. Plate metallic copper directly on the steel key cathode!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bath diagram */}
              <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex justify-around items-center h-32 relative">
                {/* Dissolved blue electrolyte */}
                <div className="absolute inset-0 bg-sky-650/10 rounded-xl" />

                {/* Positive Copper Anode */}
                <div className="text-center shrink-0 z-10">
                  <div className="w-4 h-16 bg-amber-700 rounded shadow-md border border-amber-800" />
                  <span className="block text-[8px] text-slate-400 mt-1">Anode: Cu (+)</span>
                </div>

                {/* Blue Cu2+ migrating ions indicator */}
                {electroplatingVoltage > 0 && platedThickness < 99 && (
                  <div className="text-[11px] text-indigo-400 animate-pulse font-bold font-mono z-10">
                    Cu²⁺ ⇉
                  </div>
                )}

                {/* Negative Steel Cathode Key */}
                <div className="text-center shrink-0 z-10">
                  <div className={`w-12 h-12 rounded-full border border-slate-600 transition-colors flex items-center justify-center ${
                    platedThickness > 20 ? "bg-amber-600 border-amber-800" : "bg-slate-700"
                  }`}>
                    <span className="text-[10px] text-white">KEY</span>
                  </div>
                  <span className="block text-[8px] text-slate-400 mt-1">Cathode: Key (-)</span>
                </div>
              </div>

              {/* Adjust voltage */}
              <div className="flex flex-col justify-center space-y-3">
                <div className="text-xs flex justify-between items-center">
                  <span className="text-slate-400">Plating DC Voltage:</span>
                  <strong className="text-indigo-400 font-mono text-lg">{electroplatingVoltage} Volts</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={electroplatingVoltage}
                  onChange={(e) => setElectroplatingVoltage(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none accent-indigo-500 cursor-pointer"
                  id="voltage_electro_slider"
                />

                <div className="bg-slate-900 border border-slate-800 p-2 rounded text-[10px] font-mono whitespace-nowrap overflow-hidden">
                  Plating Progress: <strong className="text-emerald-400">{platedThickness.toFixed(0)}%</strong>
                </div>
              </div>
            </div>
            {labState === "success" && (
              <div className="p-2 border border-emerald-900/40 bg-emerald-950/20 text-emerald-400 text-xs rounded text-center">
                ✓ Plating finished! Outer steel surface successfully reduced into thick, shiny, metallic copper plating layer.
              </div>
            )}
          </div>
        );
      } else {
        // Blast Furnace
        return (
          <div className="space-y-4" id="metallurgy_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Blast Furnace Thermal Controller</h5>
            <p className="text-[11px] text-slate-400">
              Coke burns producing Carbon Monoxide reducing agents. Blast extreme thermal air into hematite levels ($1500^\circ C$).
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex justify-center items-center relative h-32">
                <div className="absolute inset-0 rounded-xl bg-orange-950/25" />
                <div className="text-center space-y-1 z-10">
                  <span className="text-2xl">🌋</span>
                  <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-450">Blast Furnace</span>
                  <span className="bg-rose-950 text-rose-300 font-bold font-mono px-2 py-0.5 rounded text-[10px] block">
                    {blastFurnaceTemp} °C
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-2">
                <span className="text-xs text-slate-400 block">Ignition Blast Temperature:</span>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="50"
                  value={blastFurnaceTemp}
                  onChange={(e) => {
                    const temp = Number(e.target.value);
                    setBlastFurnaceTemp(temp);
                    if (temp >= 1200) {
                      setLabState("success");
                      onActionCompleted("experimental");
                    }
                  }}
                  className="w-full accent-rose-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  id="furnace_temp_slider"
                />
                <span className="text-[9px] text-slate-500 leading-tight">
                  {blastFurnaceTemp < 800 ? "Lower layers remain cool. Coke fails to produce carbon monoxide reducers." : 
                   "✓ Extreme heat unlocked! Hematite particles successfully reduce to pure molten cast iron!"}
                </span>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="bg-[#161e30] border border-white/5 rounded-xl p-5 shadow-xl flex flex-col h-full justify-between" id="empirical_feedback_simulator_component">
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#22d3ee]">
            Pillar II: Empirical Feedback
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#0e1422] text-[#22d3ee] border border-white/5 uppercase tracking-wide">
            Practical Lab Simulator
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
          Operate apparatus nodes to test the physical hypotheses outlined in chemical texts.
        </p>
      </div>

      <div className="flex-grow my-1">
        {renderLabView()}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-slate-600 animate-pulse" />
          Interactive Chemistry Lab
        </span>
        <span className="text-sky-400 font-medium">✓ State Decoupled</span>
      </div>
    </div>
  );
}
