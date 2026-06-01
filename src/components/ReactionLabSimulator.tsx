import React, { useState, useEffect } from "react";
import { 
  Flame, Play, RefreshCw, Zap, TrendingDown, CheckCircle, 
  HelpCircle, Activity, Eye, AlertCircle, Sparkles, 
  Thermometer, Battery, Info, Sliders, Scale, Timer, Wind, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReactionLabSimulatorProps {
  classLevel: string;
  topicId: string;
  onActionCompleted: (skill: "experimental" | "structural") => void;
}

export default function ReactionLabSimulator({ classLevel, topicId, onActionCompleted }: ReactionLabSimulatorProps) {
  // Common states
  const [labState, setLabState] = useState<string>("init"); // init, running, success, failed
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- S1 States ---
  // S1 T1: Safety Gear & Reagents Sorting
  const [hasGoggles, setHasGoggles] = useState(false);
  const [hasGloves, setHasGloves] = useState(false);
  const [hasCoat, setHasCoat] = useState(false);
  const [cabinetUnlocked, setCabinetUnlocked] = useState(false);
  const [bottlePlacements, setBottlePlacements] = useState<Record<string, string>>({
    hcl: "",
    naoh: "",
    ethanol: "",
    water: ""
  });
  const [selectedBottle, setSelectedBottle] = useState<string | null>(null);

  // S1 T2: Iodine Sublimation
  const [sublimeGasPercent, setSublimeGasPercent] = useState(0);
  const [sublimeHeatApplied, setSublimeHeatApplied] = useState(false);
  const [burnerAirVent, setBurnerAirVent] = useState(0); // 0 = Yellow, 100 = Blue Roaring
  const [gasFlowRate, setGasFlowRate] = useState(30);
  const [tempC, setTempC] = useState(25);
  const [hasIce, setHasIce] = useState(false);
  const [sublimeCrystals, setSublimeCrystals] = useState(0);

  // S1 T3: Paper Chromatography
  const [selectedSolvent, setSelectedSolvent] = useState<"water" | "ethanol">("water");
  const [selectedInk, setSelectedInk] = useState<"black" | "chlorophyll" | "food_color">("black");
  const [spotPlaced, setSpotPlaced] = useState(false);
  const [chromatographyY, setChromatographyY] = useState(0);
  const [showRuler, setShowRuler] = useState(false);
  const [rulerPos, setRulerPos] = useState(0);
  const [userInputRf, setUserInputRf] = useState("");
  const [rfFeedback, setRfFeedback] = useState<string | null>(null);

  // --- S2 States ---
  // S2 T1: Bell Jar Phosphorus
  const [combustionPhase, setCombustionPhase] = useState<"init" | "sealed" | "burning" | "dissolved">("init");
  const [waterRisePercent, setWaterRisePercent] = useState(5); // start at 5% water level
  const [oxygenLevel, setOxygenLevel] = useState(21);
  const [phOfWater, setPhOfWater] = useState(7.0);

  // S2 T2: Alkali Metals Reactivity
  const [selectedMetal, setSelectedMetal] = useState<"Li" | "Na" | "K" | null>(null);
  const [reactionMedium, setReactionMedium] = useState<"water" | "acid">("water");
  const [liveTemp, setLiveTemp] = useState(25);
  const [gasVolume, setGasVolume] = useState(0);
  const [liveVelocity, setLiveVelocity] = useState(0);
  const [tempHistory, setTempHistory] = useState<number[]>([]);
  const [metalStatusText, setMetalStatusText] = useState("");

  // S2 T3: Titration System
  const [selectedIndicator, setSelectedIndicator] = useState<"phenolphthalein" | "methyl_orange" | "litmus">("phenolphthalein");
  const [titrationHclVolume, setTitrationHclVolume] = useState(0); // 0 to 50 mL
  const [buretteFlowRate, setBuretteFlowRate] = useState<0 | 1 | 2>(0); // 0=off, 1=drip, 2=stream
  const [phValue, setPhValue] = useState(13.0);
  const [titrationColorState, setTitrationColorState] = useState("#f43f5e"); // start base pink

  // --- S3 States ---
  // S3 T1: Conductivity and Melting Rig
  const [selectedBondingSample, setSelectedBondingSample] = useState<"nacl" | "sugar" | "graphite" | "copper">("nacl");
  const [bondingState, setBondingState] = useState<"solid" | "solution" | "molten">("solid");
  const [bondingHeaterActive, setBondingHeaterActive] = useState(false);
  const [bondingTemp, setBondingTemp] = useState(25);
  const [conductivityCircuitActive, setConductivityCircuitActive] = useState(false);
  const [ammeterCurrent, setAmmeterCurrent] = useState(0);
  const [bulbBrightness, setBulbBrightness] = useState(0);

  // S3 T2: Carbonates Pyrolysis
  const [carbonateHeatApplied, setCarbonateHeatApplied] = useState(false);
  const [carbonateTemp, setCarbonateTemp] = useState(25);
  const [carbonateGasRate, setCarbonateGasRate] = useState(0);
  const [limewaterClarity, setLimewaterClarity] = useState("clear"); // clear, milky, cleared_again
  const [limewaterTimer, setLimewaterTimer] = useState(0);

  // S3 T3: Moles weighing crucible
  const [mgoStep, setMgoStep] = useState<number>(0); // 0: Tare, 1: Weigh crucible, 2: Add Mg, 3: Heat/Oxidize, 4: Final weight, 5: Input Moles
  const [lidState, setLidState] = useState<"closed" | "cracked" | "off">("closed");
  const [scaleReading, setScaleReading] = useState(0.00);
  const [mgBurnProgress, setMgBurnProgress] = useState(0);
  const [smokeLostPercent, setSmokeLostPercent] = useState(0);
  const [userMgMoles, setUserMgMoles] = useState("");
  const [userOMoles, setUserOMoles] = useState("");
  const [mgoResultText, setMgoResultText] = useState<string | null>(null);

  // --- S4 States ---
  // S4 T1: Kinetics Gas Collection
  const [kineticsTemp, setKineticsTemp] = useState<number>(20);
  const [kineticsConc, setKineticsConc] = useState<number>(1.0);
  const [kineticsSurface, setKineticsSurface] = useState<"granules" | "powder">("granules");
  const [kineticsHasCatalyst, setKineticsHasCatalyst] = useState(false);
  const [kineticsIsRunning, setKineticsIsRunning] = useState(false);
  const [kineticsVolumeHistory, setKineticsVolumeHistory] = useState<{ t: number; v: number }[]>([]);
  const [kineticsTime, setKineticsTime] = useState(0);
  const [kineticsGasVolume, setKineticsGasVolume] = useState(0);

  // S4 T2: Electroplating Tank
  const [electroplatingVoltage, setElectroplatingVoltage] = useState(0);
  const [electroElectrolyte, setElectroElectrolyte] = useState<"cuso4" | "agno3">("cuso4");
  const [electroAnode, setElectroAnode] = useState<"copper" | "silver" | "platinum">("copper");
  const [electroSwitchOn, setElectroSwitchOn] = useState(false);
  const [platedThickness, setPlatedThickness] = useState(0); // 0 to 100%
  const [platedWeightAdded, setPlatedWeightAdded] = useState(0); // in milligrams
  const [electroTime, setElectroTime] = useState(0);

  // S4 T3: Industrial Blast Furnace Dashboard
  const [feedOre, setFeedOre] = useState(30);
  const [feedCoke, setFeedCoke] = useState(30);
  const [feedLimestone, setFeedLimestone] = useState(15);
  const [blastAir, setBlastAir] = useState(40);
  const [blastFurnaceTemp, setBlastFurnaceTemp] = useState(25);
  const [slagVolume, setSlagVolume] = useState(0);
  const [ironVolume, setIronVolume] = useState(0);
  const [tappedIron, setTappedIron] = useState(0);
  const [tappedSlag, setTappedSlag] = useState(0);

  // --- Reset lab setups whenever topic or class shifts ---
  useEffect(() => {
    setLabState("init");
    setErrorMessage(null);
    setSelectedBottle(null);
    setCabinetUnlocked(false);
    setBottlePlacements({ hcl: "", naoh: "", ethanol: "", water: "" });

    setSublimeHeatApplied(false);
    setSublimeGasPercent(0);
    setBurnerAirVent(0);
    setGasFlowRate(30);
    setTempC(25);
    setHasIce(false);
    setSublimeCrystals(0);

    setSpotPlaced(false);
    setChromatographyY(0);
    setShowRuler(false);
    setRulerPos(0);
    setUserInputRf("");
    setRfFeedback(null);

    setCombustionPhase("init");
    setWaterRisePercent(5);
    setOxygenLevel(21);
    setPhOfWater(7.0);

    setSelectedMetal(null);
    setLiveTemp(25);
    setGasVolume(0);
    setLiveVelocity(0);
    setTempHistory([]);
    setMetalStatusText("");

    setTitrationHclVolume(0);
    setBuretteFlowRate(0);
    setPhValue(13.0);
    setTitrationColorState(selectedIndicator === "phenolphthalein" ? "#f43f5e" : selectedIndicator === "litmus" ? "#3b82f6" : "#eab308");

    setBondingHeaterActive(false);
    setBondingTemp(25);
    setConductivityCircuitActive(false);
    setAmmeterCurrent(0);
    setBulbBrightness(0);

    setCarbonateHeatApplied(false);
    setCarbonateTemp(25);
    setCarbonateGasRate(0);
    setLimewaterClarity("clear");
    setLimewaterTimer(0);

    setMgoStep(0);
    setLidState("closed");
    setScaleReading(0.00);
    setMgBurnProgress(0);
    setSmokeLostPercent(0);
    setUserMgMoles("");
    setUserOMoles("");
    setMgoResultText(null);

    setKineticsIsRunning(false);
    setKineticsVolumeHistory([]);
    setKineticsTime(0);
    setKineticsGasVolume(0);

    setElectroSwitchOn(false);
    setPlatedThickness(0);
    setPlatedWeightAdded(0);
    setElectroTime(0);

    setBlastFurnaceTemp(25);
    setSlagVolume(0);
    setIronVolume(0);
    setTappedIron(0);
    setTappedSlag(0);
  }, [classLevel, topicId]);

  // --- S1 T2 Sublimation Physics Loop ---
  useEffect(() => {
    if (topicId !== "states_of_matter" || classLevel !== "S1") return;
    
    let interval: NodeJS.Timeout;
    if (sublimeHeatApplied) {
      interval = setInterval(() => {
        setTempC((prev) => {
          // Heat rate depends on gas flow and air vent (blue flame is hotter)
          const heatPower = (gasFlowRate / 20) * (1 + burnerAirVent / 100);
          const nextTemp = Math.min(280, Math.round(prev + heatPower * 1.8));

          // Sublimation starts at 180C
          if (nextTemp >= 180) {
            setSublimeGasPercent((prevGas) => {
              const increase = (nextTemp - 180) / 10;
              const nextGas = Math.min(100, prevGas + increase);
              
              if (hasIce) {
                // Crystal needles deposit
                setSublimeCrystals((c) => Math.min(100, c + increase * 0.8));
              }
              return nextGas;
            });
          }
          return nextTemp;
        });
      }, 300);
    } else {
      // Cooling
      interval = setInterval(() => {
        setTempC((prev) => {
          const nextTemp = Math.max(25, prev - 8);
          // Gas slowly condenses/settles if cool
          if (nextTemp < 180) {
            setSublimeGasPercent((prevGas) => Math.max(0, prevGas - 4));
          }
          return nextTemp;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [sublimeHeatApplied, gasFlowRate, burnerAirVent, hasIce, topicId, classLevel]);

  // Iodine success trigger
  useEffect(() => {
    if (sublimeCrystals >= 95) {
      setLabState("success");
      onActionCompleted("experimental");
    } else if (sublimeGasPercent >= 95 && !hasIce && sublimeHeatApplied) {
      setErrorMessage("⚠️ Lab Safety Failure: Iodine vapor escaped! Always place ice on the top watchglass to condense toxic iodine vapors safely.");
      setLabState("failed");
    }
  }, [sublimeCrystals, sublimeGasPercent, hasIce, sublimeHeatApplied]);

  // --- S1 T3 Chromatography Elution Loop ---
  useEffect(() => {
    if (chromatographyY > 0 && labState === "running") {
      const interval = setInterval(() => {
        setChromatographyY((prev) => {
          // Elution speed is faster in water than ethanol
          const speed = selectedSolvent === "water" ? 1.5 : 0.8;
          const nextY = prev + speed;
          if (nextY >= 100) {
            clearInterval(interval);
            setLabState("running"); // wait for math check
            return 100;
          }
          return nextY;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [chromatographyY, labState, selectedSolvent]);

  // --- S2 T1 Bell Jar Phosphorus Burning ---
  useEffect(() => {
    if (combustionPhase === "burning") {
      let duration = 0;
      const interval = setInterval(() => {
        duration += 1;
        setOxygenLevel((o) => {
          const nextO = Math.max(0, o - 1.2);
          // Water rises to fill vacuum. Total available rise is 21%.
          // Initial water level is 5%, meaning it rises by 16% to reach 21%.
          setWaterRisePercent(() => 5 + (21 - nextO));
          return nextO;
        });
        // Acidic P2O5 fumes dissolve, dropping pH of water
        setPhOfWater((ph) => Math.max(3.5, ph - 0.25));

        if (duration >= 20) {
          clearInterval(interval);
          setCombustionPhase("dissolved");
          setLabState("success");
          onActionCompleted("experimental");
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [combustionPhase]);

  // --- S2 T2 Alkali Metals Loop ---
  useEffect(() => {
    if (selectedMetal) {
      setLabState("running");
      let count = 0;
      // Define properties based on metal and medium
      const isAcid = reactionMedium === "acid";
      const metalProps = {
        Li: { maxT: isAcid ? 55 : 42, maxV: 60, speed: 1.5, text: "Lithium bubbles, floats, and generates heat steadily." },
        Na: { maxT: isAcid ? 85 : 62, maxV: 90, speed: 3.5, text: "Sodium melts into a shiny ball, darts around rapidly, fizzing and sparkling." },
        K: { maxT: isAcid ? 115 : 94, maxV: 110, speed: 7.5, text: "Potassium ignites instantly, crackling with a hot lilac flame." }
      }[selectedMetal];

      const interval = setInterval(() => {
        count += 1;
        
        // Heat and gas scale up
        setLiveTemp((t) => {
          const delta = (metalProps.maxT - 25) / 15;
          const nextT = Math.min(metalProps.maxT, t + delta * (Math.random() * 0.4 + 0.8));
          setTempHistory((prev) => [...prev.slice(-15), Math.round(nextT)]);
          return nextT;
        });

        setGasVolume((g) => Math.min(metalProps.maxV, g + metalProps.speed * (Math.random() * 0.5 + 0.8)));
        setLiveVelocity(() => Math.round(metalProps.speed * (15 - count) * (isAcid ? 1.5 : 1.0)));

        if (count >= 15) {
          clearInterval(interval);
          setLabState("success");
          onActionCompleted("experimental");
          setMetalStatusText(`Reaction Completed! ${selectedMetal} is fully consumed. Output volume: ${Math.round(metalProps.maxV)} mL Hydrogen Gas.`);
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [selectedMetal, reactionMedium]);

  // --- S2 T3 Titration Burette Drip Loop ---
  useEffect(() => {
    if (buretteFlowRate > 0) {
      const interval = setInterval(() => {
        setTitrationHclVolume((prev) => {
          const flow = buretteFlowRate === 1 ? 0.1 : 1.0;
          const nextVol = Math.min(50, prev + flow);
          
          // Calculate pH: NaOH initially has pH 13. At 25mL HCl, neutrality is reached (pH 7).
          let nextPh = 13.0;
          if (nextVol < 24.5) {
            // slowly declining base
            nextPh = 13.0 - (nextVol / 24.5) * 2.5; // drops to 10.5
          } else if (nextVol >= 24.5 && nextVol <= 25.5) {
            // sharp vertical equivalence drop
            nextPh = 7.0 - (nextVol - 25.0) * 7.0; // transitions through 7
          } else {
            // excess acid
            nextPh = 2.0 - ((nextVol - 25.5) / 24.5) * 0.8;
          }
          nextPh = Math.max(1.2, Math.min(13.0, nextPh));
          setPhValue(nextPh);

          // Update indicator color
          if (selectedIndicator === "phenolphthalein") {
            if (nextPh > 8.2) setTitrationColorState("#f43f5e"); // Pink
            else if (nextPh >= 6.5 && nextPh <= 8.2) setTitrationColorState("#fad1d7"); // Light pink
            else setTitrationColorState("#ffffff"); // Clear
          } else if (selectedIndicator === "litmus") {
            if (nextPh > 8.0) setTitrationColorState("#3b82f6"); // Blue
            else if (nextPh >= 6.0 && nextPh <= 8.0) setTitrationColorState("#a855f7"); // Purple (Neutral)
            else setTitrationColorState("#ef4444"); // Red
          } else if (selectedIndicator === "methyl_orange") {
            if (nextPh > 4.4) setTitrationColorState("#eab308"); // Yellow
            else if (nextPh >= 3.1 && nextPh <= 4.4) setTitrationColorState("#f97316"); // Orange (Neutral)
            else setTitrationColorState("#ef4444"); // Red
          }

          if (nextVol >= 50) {
            setBuretteFlowRate(0);
          }

          return parseFloat(nextVol.toFixed(1));
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [buretteFlowRate, selectedIndicator]);

  // Titration endpoint check
  const handleCheckTitration = () => {
    if (titrationHclVolume >= 24.5 && titrationHclVolume <= 25.5) {
      setLabState("success");
      onActionCompleted("experimental");
    } else {
      setErrorMessage(`Failed: Titration was not stopped at the endpoint. Volume dripped: ${titrationHclVolume} mL. End-point color transition occurs at 25.0 mL.`);
      setLabState("failed");
    }
  };

  // --- S3 T1 Electrical Bonding Crucible Pyrolysis Loop ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bondingHeaterActive) {
      interval = setInterval(() => {
        setBondingTemp((prev) => {
          const nextT = Math.min(1200, prev + 25);
          
          // Check melting transitions
          if (selectedBondingSample === "sugar" && nextT >= 146 && bondingState === "solid") {
            setBondingState("molten");
          } else if (selectedBondingSample === "nacl" && nextT >= 801 && bondingState === "solid") {
            setBondingState("molten");
          } else if (selectedBondingSample === "copper" && nextT >= 1085 && bondingState === "solid") {
            setBondingState("molten");
          }
          return nextT;
        });
      }, 100);
    } else {
      interval = setInterval(() => {
        setBondingTemp((prev) => Math.max(25, prev - 15));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [bondingHeaterActive, selectedBondingSample, bondingState]);

  // Circuit conductivity ammeter output
  useEffect(() => {
    if (conductivityCircuitActive) {
      let current = 0;
      let bulb = 0;

      if (selectedBondingSample === "copper") {
        current = 4.8; // metallic conductor
        bulb = 100;
      } else if (selectedBondingSample === "graphite") {
        current = 3.2; // giant covalent conductor
        bulb = 80;
      } else if (selectedBondingSample === "nacl") {
        if (bondingState === "solution" || bondingState === "molten") {
          current = 3.8; // mobile ions carry current
          bulb = 90;
        } else {
          current = 0.0; // solid lattice locks ions
          bulb = 0;
        }
      } else if (selectedBondingSample === "sugar") {
        current = 0.0; // covalent molecular has no charge carriers
        bulb = 0;
      }

      setAmmeterCurrent(current);
      setBulbBrightness(bulb);

      if (current > 0 || (selectedBondingSample === "sugar" && bondingState === "solution")) {
        // completing verification assay
        setLabState("success");
        onActionCompleted("experimental");
      }
    } else {
      setAmmeterCurrent(0);
      setBulbBrightness(0);
    }
  }, [conductivityCircuitActive, selectedBondingSample, bondingState]);

  // --- S3 T2 Carbonate Gas Bubbles & Limewater turbidity ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (carbonateHeatApplied) {
      interval = setInterval(() => {
        setCarbonateTemp((t) => {
          const nextT = Math.min(950, t + 12);
          
          if (nextT >= 600) {
            // decomposition starts
            setCarbonateGasRate(Math.min(5, Math.floor((nextT - 550) / 75)));
            setLimewaterTimer((lt) => {
              const nextLt = lt + 1;
              if (nextLt < 15) {
                setLimewaterClarity("clear");
              } else if (nextLt >= 15 && nextLt < 45) {
                setLimewaterClarity("milky");
              } else {
                setLimewaterClarity("cleared_again"); // CO2 excess dissolves CaCO3 into Ca(HCO3)2!
              }
              return nextLt;
            });
          }
          return nextT;
        });
      }, 200);
    } else {
      interval = setInterval(() => {
        setCarbonateTemp((t) => Math.max(25, t - 15));
        setCarbonateGasRate(0);
      }, 200);
    }
    return () => clearInterval(interval);
  }, [carbonateHeatApplied]);

  // Carbonate check
  const handleCheckCarbonate = () => {
    if (limewaterClarity === "milky") {
      setLabState("success");
      onActionCompleted("experimental");
    } else if (limewaterClarity === "cleared_again") {
      setErrorMessage("⚠️ Bubbled too long! The carbon dioxide reacted further with water and calcium carbonate to form soluble Calcium Hydrogencarbonate, making it clear again. Stop heating earlier when milky.");
      setLabState("failed");
    } else {
      setErrorMessage("Limewater remains clear. Heat limestone above 800°C first to liberate carbon dioxide gas.");
      setLabState("failed");
    }
  };

  // --- S3 T3 MgO Stoichiometry scale steps ---
  useEffect(() => {
    // Weighing steps values
    const emptyCrucible = 24.50;
    const mgRibbon = 0.48; // 0.02 moles Mg
    const idealO2 = 0.32; // 0.02 moles O -> MgO

    if (mgoStep === 0) {
      setScaleReading(0.00);
    } else if (mgoStep === 1) {
      setScaleReading(emptyCrucible);
    } else if (mgoStep === 2) {
      setScaleReading(emptyCrucible + mgRibbon);
    } else if (mgoStep === 3) {
      // Burning simulation happens here
    } else if (mgoStep === 4) {
      // Calculate final mass based on lid state
      // If lid is cracked, oxygen burns and no smoke is lost
      // If lid is closed, oxygen doesn't enter (Mg doesn't burn)
      // If lid is off, oxygen enters but smoke (MgO) escapes, losing 30% of product mass!
      let addedWeight = 0;
      if (mgBurnProgress >= 100) {
        if (smokeLostPercent > 0) {
          addedWeight = idealO2 - (mgRibbon + idealO2) * (smokeLostPercent / 100);
        } else {
          addedWeight = idealO2;
        }
      }
      setScaleReading(parseFloat((emptyCrucible + mgRibbon + addedWeight).toFixed(2)));
    }
  }, [mgoStep, mgBurnProgress, smokeLostPercent]);

  // MgO burner physics loop
  useEffect(() => {
    if (mgoStep === 3 && sublimeHeatApplied) {
      const interval = setInterval(() => {
        if (lidState === "closed") {
          // oxygen starved
          setLabState("running");
        } else {
          setMgBurnProgress((p) => {
            const speed = lidState === "off" ? 5 : 3;
            const nextP = Math.min(100, p + speed);
            
            if (lidState === "off") {
              setSmokeLostPercent((s) => Math.min(35, s + 1.5)); // smoke escapes
            }
            if (nextP >= 100) {
              clearInterval(interval);
              setMgoStep(4);
            }
            return nextP;
          });
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [mgoStep, sublimeHeatApplied, lidState]);

  // Check moles calculations
  const handleCheckMgoMoles = () => {
    const mgVal = parseFloat(userMgMoles);
    const oVal = parseFloat(userOMoles);

    if (Math.abs(mgVal - 0.02) < 0.005 && Math.abs(oVal - 0.02) < 0.005) {
      setMgoResultText("✓ Correct! Moles Ratio Mg:O is 0.02 : 0.02 (1:1), yielding empirical formula MgO.");
      setLabState("success");
      onActionCompleted("experimental");
    } else {
      setMgoResultText(`❌ Incorrect. Remember: moles = mass / molar mass. Mg is 0.48g / 24g/mol = 0.02. Oxygen gained is ${parseFloat((scaleReading - 24.98).toFixed(2))}g / 16g/mol.`);
    }
  };

  // --- S4 T1 Kinetics Gas collection ticker ---
  useEffect(() => {
    if (kineticsIsRunning) {
      const interval = setInterval(() => {
        setKineticsTime((t) => {
          const nextT = t + 1;
          
          // Calculate rate based on factors
          // Base speed, influenced by Temp, Conc, Surface Area, Catalyst
          const tempFactor = Math.pow(1.5, (kineticsTemp - 20) / 10);
          const concFactor = kineticsConc;
          const surfaceFactor = kineticsSurface === "powder" ? 2.5 : 1.0;
          const catalystFactor = kineticsHasCatalyst ? 2.0 : 1.0;
          
          const maxCapacity = 100;
          const rateCoeff = 0.08 * tempFactor * concFactor * surfaceFactor * catalystFactor;
          
          // Syringe gas collected: volume = capacity * (1 - e^(-k * t))
          const currentVol = Math.round(maxCapacity * (1 - Math.exp(-rateCoeff * nextT)));
          setKineticsGasVolume(currentVol);
          setKineticsVolumeHistory((h) => [...h, { t: nextT, v: currentVol }]);

          if (currentVol >= 98 || nextT >= 30) {
            clearInterval(interval);
            setKineticsIsRunning(false);
            setLabState("success");
            onActionCompleted("experimental");
          }

          return nextT;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [kineticsIsRunning, kineticsTemp, kineticsConc, kineticsSurface, kineticsHasCatalyst]);

  // --- S4 T2 Electrochemistry Plating Loop ---
  useEffect(() => {
    if (electroSwitchOn && electroplatingVoltage > 0) {
      const interval = setInterval(() => {
        setElectroTime((t) => t + 1);
        
        // Faraday current: I = V / R. Let's assume R = 3 ohms
        const amps = parseFloat((electroplatingVoltage / 3.0).toFixed(2));
        setAmmeterCurrent(amps);
        
        setPlatedThickness((prev) => {
          const increase = (electroplatingVoltage * 0.8);
          const nextP = Math.min(100, prev + increase);
          if (nextP >= 100) {
            setLabState("success");
            onActionCompleted("experimental");
          }
          return nextP;
        });

        setPlatedWeightAdded((prev) => {
          // weight added: m = z * I * t
          const electroFactor = electroElectrolyte === "cuso4" ? 0.329 : 1.118; // Cu2+ vs Ag+ plating rates
          return parseFloat((prev + amps * 0.3 * electroFactor).toFixed(2));
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setAmmeterCurrent(0);
    }
  }, [electroSwitchOn, electroplatingVoltage, electroElectrolyte]);

  // --- S4 T3 Blast Furnace feeds loops ---
  useEffect(() => {
    if (topicId === "industrial_extraction" && classLevel === "S4") {
      // Hot blast air and coke creates massive thermal energy
      const targetTemp = Math.round(25 + (blastAir * 12) + (feedCoke * 6));
      setBlastFurnaceTemp(targetTemp);

      if (targetTemp >= 1400 && feedOre > 20 && feedLimestone > 10) {
        // Molten iron and slag collect slowly
        const oreReductionRate = (feedOre / 15) * (targetTemp / 1500);
        setIronVolume((prev) => Math.min(1500, prev + oreReductionRate * 8));
        
        // Limestone removes silica sand as slag
        const slagRate = (feedLimestone / 10) * (feedOre / 20);
        setSlagVolume((prev) => Math.min(1000, prev + slagRate * 5));
      }
    }
  }, [feedOre, feedCoke, feedLimestone, blastAir, topicId, classLevel]);

  // Tap triggers
  const handleTapIron = () => {
    if (ironVolume > 50) {
      setTappedIron((prev) => prev + Math.round(ironVolume));
      setIronVolume(0);
      if (tappedIron + ironVolume >= 1000) {
        setLabState("success");
        onActionCompleted("experimental");
      }
    }
  };

  const handleTapSlag = () => {
    if (slagVolume > 50) {
      setTappedSlag((prev) => prev + Math.round(slagVolume));
      setSlagVolume(0);
    }
  };

  // --- RENDER DYNAMIC LAB VIEWS ---
  const renderLabView = () => {
    if (classLevel === "S1") {
      // TOPIC 1: Chemistry & Society
      if (topicId === "chemistry_society") {
        const equippedAll = hasGoggles && hasGloves && hasCoat;
        const sortedCount = Object.values(bottlePlacements).filter(val => val !== "").length;
        
        const handleSort = (bottle: string, cabinet: string) => {
          if (!equippedAll) {
            setErrorMessage("⚠️ Lab safety hazard: Equip goggles, gloves, and coat before picking up reagents!");
            return;
          }
          setBottlePlacements(prev => {
            const next = { ...prev, [bottle]: cabinet };
            // Check sorting accuracy
            const allSorted = Object.values(next).every(v => v !== "");
            if (allSorted) {
              const correct = next.hcl === "corrosive" && next.naoh === "corrosive" && next.ethanol === "flammable" && next.water === "shelf";
              if (correct) {
                setLabState("success");
                onActionCompleted("experimental");
                setErrorMessage(null);
              } else {
                setErrorMessage("❌ Sorted incorrectly! Read the hazard warning symbols carefully.");
              }
            }
            return next;
          });
          setSelectedBottle(null);
        };

        return (
          <div className="space-y-4" id="society_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Chemical Safety & Sorting Workbench</h5>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setHasGoggles(!hasGoggles)}
                className={`p-2 rounded-lg border text-left transition-all ${
                  hasGoggles ? "border-emerald-500 bg-emerald-950/20 text-emerald-400" : "border-slate-800 bg-slate-950 text-slate-400"
                }`}
              >
                <div className="text-lg">🥽</div>
                <div className="text-[10px] font-bold">Goggles</div>
              </button>
              <button
                onClick={() => setHasGloves(!hasGloves)}
                className={`p-2 rounded-lg border text-left transition-all ${
                  hasGloves ? "border-emerald-500 bg-emerald-950/20 text-emerald-400" : "border-slate-800 bg-slate-950 text-slate-400"
                }`}
              >
                <div className="text-lg">🧤</div>
                <div className="text-[10px] font-bold">Nitrile Gloves</div>
              </button>
              <button
                onClick={() => setHasCoat(!hasCoat)}
                className={`p-2 rounded-lg border text-left transition-all ${
                  hasCoat ? "border-emerald-500 bg-emerald-950/20 text-emerald-400" : "border-slate-800 bg-slate-950 text-slate-400"
                }`}
              >
                <div className="text-lg">🥼</div>
                <div className="text-[10px] font-bold">Lab Coat</div>
              </button>
            </div>

            {/* Paperdoll avatar status */}
            <div className="bg-[#0e1422] p-2.5 rounded-lg border border-slate-800 text-center text-xs flex justify-center items-center gap-3">
              <div className="text-2xl">
                {equippedAll ? "👷" : "🧑"}
              </div>
              <div className="text-left">
                <span className="font-semibold text-slate-350 block">Safety Gear Status:</span>
                <span className={equippedAll ? "text-emerald-400 text-[10px]" : "text-amber-400 text-[10px]"}>
                  {equippedAll ? "✓ FULLY EQUIPPED. Cabinet safe to sort." : "⚠ INCOMPLETE. Safety hazard."}
                </span>
              </div>
            </div>

            {/* Cabinet & Reagents */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-mono text-slate-500 block font-semibold">Unsorted Bottles</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "hcl", name: "HCl Acid", sign: "💀" },
                    { id: "naoh", name: "NaOH Base", sign: "💀" },
                    { id: "ethanol", name: "Ethanol", sign: "🔥" },
                    { id: "water", name: "Dist. Water", sign: "💧" }
                  ].map(b => (
                    <button
                      key={b.id}
                      disabled={bottlePlacements[b.id] !== ""}
                      onClick={() => setSelectedBottle(b.id)}
                      className={`p-2 rounded border text-center transition-all ${
                        selectedBottle === b.id ? "bg-cyan-950 border-cyan-400 text-white" : 
                        bottlePlacements[b.id] !== "" ? "bg-slate-900 border-slate-900 opacity-30 text-slate-500" : "bg-slate-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="block text-sm">{b.sign}</span>
                      <span className="text-[9px] font-bold">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cabinet destinations */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-mono text-slate-500 block font-semibold">Storage Cabinets</span>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: "corrosive", name: "⚠️ Corrosive Cabinet" },
                    { id: "flammable", name: "🔥 Flammable Locker" },
                    { id: "shelf", name: "📦 General Reagent Shelf" }
                  ].map(cab => (
                    <button
                      key={cab.id}
                      disabled={!selectedBottle}
                      onClick={() => selectedBottle && handleSort(selectedBottle, cab.id)}
                      className={`p-1.5 rounded text-left border text-[10px] transition-all ${
                        selectedBottle ? "border-cyan-500/50 hover:bg-cyan-900/10 cursor-pointer" : "border-slate-850 bg-slate-900/20 text-slate-500"
                      }`}
                    >
                      {cab.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2 bg-rose-950/20 border border-rose-900/40 rounded text-rose-400 text-center text-[10px]">
                {errorMessage}
              </div>
            )}
            
            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-center text-[10px]">
                ✓ Safety competency achieved! All bottles safely quarantined and lab safety rules verified.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 2: States of Matter (Iodine Sublimation)
      if (topicId === "states_of_matter") {
        return (
          <div className="space-y-4" id="states_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Thermodynamic Sublimation of Iodine</h5>

            {/* Test Tube Graphic */}
            <div className="relative h-44 bg-[#080d1a] border border-slate-800 rounded-xl flex flex-col justify-between p-3 overflow-hidden">
              <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <button
                  onClick={() => setHasIce(!hasIce)}
                  className={`px-2 py-0.5 rounded border transition-all ${
                    hasIce ? "border-blue-400 bg-blue-950/30 text-blue-300" : "border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  ❄️ {hasIce ? "Ice Plate Active" : "No Ice on watchglass"}
                </button>
                <div className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  <span className="font-bold text-rose-300">{tempC} °C</span>
                </div>
              </div>

              {/* Subliming Tube Core */}
              <div className="relative flex-grow flex flex-col justify-end items-center mb-1">
                {/* Watchglass Condenser */}
                <div className="w-20 h-2 bg-sky-200/90 rounded-full mb-1 border border-sky-400 flex items-center justify-center">
                  {hasIce && <span className="text-[7px] text-sky-600 font-bold">ICE</span>}
                </div>

                {/* Grow crystal needles */}
                {sublimeCrystals > 10 && (
                  <div 
                    style={{ opacity: sublimeCrystals / 100 }}
                    className="w-18 flex justify-center flex-wrap gap-0.5 text-violet-300 text-[9px] font-mono animate-pulse absolute top-4"
                  >
                    ✦ needle crystals ✦
                  </div>
                )}

                {/* Sublimed violet vapor */}
                <div 
                  style={{ opacity: sublimeGasPercent / 100 }} 
                  className="w-16 h-20 bg-violet-850/80 rounded-lg filter blur-[3px] absolute bottom-4"
                />

                {/* Solid iodine powder */}
                {sublimeGasPercent < 90 && (
                  <div className="w-12 h-3 bg-violet-950 rounded-t-md relative z-10">
                    <div className="absolute inset-0 bg-violet-900/50 rounded-t" />
                  </div>
                )}
              </div>

              {/* Flame visuals */}
              {sublimeHeatApplied && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className={`w-3.5 h-8 bg-gradient-to-t ${burnerAirVent > 50 ? "from-blue-600 to-cyan-400" : "from-orange-600 to-yellow-400"} rounded-full animate-bounce`} />
                  <span className="text-[7px] font-mono text-slate-500 mt-1">Bunsen burner</span>
                </div>
              )}
            </div>

            {/* Burner Controls */}
            <div className="grid grid-cols-2 gap-3 bg-slate-900/50 border border-slate-800 p-2.5 rounded-lg text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px]">Gas Flow (Height)</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={gasFlowRate}
                  onChange={(e) => setGasFlowRate(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-1 bg-slate-800 rounded"
                />
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px]">Burner Air Vent</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={burnerAirVent}
                  onChange={(e) => setBurnerAirVent(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1 bg-slate-800 rounded"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSublimeHeatApplied(!sublimeHeatApplied)}
                className={`flex-grow py-2 rounded text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer ${
                  sublimeHeatApplied ? "bg-red-600 hover:bg-red-650" : "bg-orange-600 hover:bg-orange-650"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                {sublimeHeatApplied ? "Turn Off Burner" : "Ignite Bunsen Burner"}
              </button>
              <button
                onClick={() => {
                  setSublimeHeatApplied(false);
                  setSublimeGasPercent(0);
                  setTempC(25);
                  setSublimeCrystals(0);
                  setHasIce(false);
                  setLabState("init");
                  setErrorMessage(null);
                }}
                className="p-2 bg-slate-850 hover:bg-slate-800 rounded border border-slate-700 text-slate-300"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {errorMessage && (
              <div className="p-2 bg-rose-950/20 border border-rose-900/40 rounded text-rose-400 text-center text-[10px]">
                {errorMessage}
              </div>
            )}

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-center text-[10px]">
                ✓ Successful condensation! Solid iodine crystals sublimed to purple gas and recrystallized safely onto the iced watchglass.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 3: Mixtures & Pure Substances (Chromatography)
      if (topicId === "mixtures_pure") {
        const checkRfValue = () => {
          const rfVal = parseFloat(userInputRf);
          // Ideal Rf values in water: yellow=0.85, magenta=0.55, cyan=0.25
          // We can check if their math is correct.
          if (rfVal === 0.85 || rfVal === 0.55 || rfVal === 0.25 || rfVal === 0.5 || rfVal === 0.8) {
            setRfFeedback("✓ Correct calculation! Retention Factor Rf = spot distance / solvent front.");
            setLabState("success");
            onActionCompleted("experimental");
          } else {
            setRfFeedback("❌ Incorrect. Try measuring with the ruler: Rf = (spot distance / solvent distance).");
          }
        };

        return (
          <div className="space-y-4" id="chromatography_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Paper Chromatography Laboratory</h5>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] block">Elution Solvent</span>
                <select
                  value={selectedSolvent}
                  onChange={(e) => setSelectedSolvent(e.target.value as any)}
                  className="bg-[#0e1422] border border-slate-800 rounded p-1 text-[11px] text-white w-full"
                >
                  <option value="water">Distilled Water (Highly Polar)</option>
                  <option value="ethanol">Ethanol (Moderately Polar)</option>
                </select>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] block">Ink Mix Spot</span>
                <select
                  value={selectedInk}
                  onChange={(e) => setSelectedInk(e.target.value as any)}
                  className="bg-[#0e1422] border border-slate-800 rounded p-1 text-[11px] text-white w-full"
                >
                  <option value="black">Black Marker Ink (Mix)</option>
                  <option value="chlorophyll">Chlorophyll Leaf Extract</option>
                  <option value="food_color">Food Dye Green</option>
                </select>
              </div>
            </div>

            {/* Chromatography Tank */}
            <div className="bg-[#080d1a] border border-slate-800 p-4 rounded-xl flex justify-center items-center relative min-h-[170px]">
              {/* Paper strip */}
              <div className="w-24 h-36 bg-slate-100 border border-slate-350 shadow-inner flex flex-col justify-between items-center relative p-1 text-[8px] text-slate-600 font-mono">
                <span className="border-b border-dashed border-slate-400 w-full text-center">Solvent Front</span>
                
                {/* Ink Spot / Bands */}
                {spotPlaced && (
                  <div className="absolute bottom-2 w-2 h-2 rounded-full bg-slate-900 z-10" />
                )}

                {chromatographyY > 0 && (
                  <div className="absolute inset-0 w-full h-full">
                    {/* Rising solvent line */}
                    <div 
                      style={{ bottom: `${chromatographyY}%` }} 
                      className="absolute left-0 right-0 h-0.5 bg-blue-400/40"
                    />

                    {/* Eluted Spot A (Yellow) */}
                    <div 
                      style={{ bottom: `${chromatographyY * 0.85}%` }} 
                      className="absolute left-1/2 -translate-x-1/2 w-3.5 h-1.5 rounded bg-yellow-400 opacity-90 text-[5px] text-center"
                    />
                    
                    {/* Eluted Spot B (Magenta) */}
                    <div 
                      style={{ bottom: `${chromatographyY * 0.55}%` }} 
                      className="absolute left-1/2 -translate-x-1/2 w-3.5 h-1.5 rounded bg-pink-500 opacity-90"
                    />

                    {/* Eluted Spot C (Cyan) */}
                    <div 
                      style={{ bottom: `${chromatographyY * 0.25}%` }} 
                      className="absolute left-1/2 -translate-x-1/2 w-3.5 h-1.5 rounded bg-cyan-500 opacity-90"
                    />
                  </div>
                )}

                <div className="border-t border-slate-400 w-full text-center text-[7px] text-slate-500">
                  Origin spot
                </div>
              </div>

              {/* Virtual Ruler Overlay */}
              {showRuler && (
                <div 
                  style={{ top: `${rulerPos}px` }}
                  className="absolute left-4 w-40 border-t border-dashed border-red-500 text-[8px] text-red-400 font-mono flex items-center justify-between"
                >
                  <span>📏 ruler: {Math.round((140 - rulerPos) * 0.7)} mm</span>
                  <input
                    type="range"
                    min="10"
                    max="140"
                    value={rulerPos}
                    onChange={(e) => setRulerPos(Number(e.target.value))}
                    className="w-16 h-1 bg-red-950 rounded cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                disabled={spotPlaced}
                onClick={() => setSpotPlaced(true)}
                className="py-1.5 px-3 bg-teal-600 hover:bg-teal-650 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded transition-colors"
              >
                1. Place Ink Spot
              </button>
              <button
                disabled={!spotPlaced || chromatographyY > 0}
                onClick={() => {
                  setChromatographyY(1);
                  setLabState("running");
                }}
                className="flex-grow py-1.5 bg-indigo-600 hover:bg-indigo-650 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1"
              >
                <Play className="w-3.5 h-3.5" />
                2. Run Elution
              </button>
              <button
                onClick={() => setShowRuler(!showRuler)}
                className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700"
              >
                📏 Ruler
              </button>
            </div>

            {chromatographyY >= 100 && (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2">
                <span className="block font-semibold text-slate-300">Measure & Calculate Rf:</span>
                <p className="text-[10px] text-slate-400">
                  Select a spot, measure its distance, and compute Rf (e.g. Yellow is at 68mm, solvent front is 80mm. 68/80 = 0.85).
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter calculated Rf (e.g. 0.85)"
                    value={userInputRf}
                    onChange={(e) => setUserInputRf(e.target.value)}
                    className="bg-[#0e1422] border border-slate-700 rounded px-2 py-1 text-xs text-white flex-grow font-mono"
                  />
                  <button
                    onClick={checkRfValue}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-650 text-white font-bold rounded text-xs"
                  >
                    Check Rf
                  </button>
                </div>
                {rfFeedback && (
                  <p className="text-[10px] font-semibold text-indigo-400 mt-1">{rfFeedback}</p>
                )}
              </div>
            )}
          </div>
        );
      }
    }

    if (classLevel === "S2") {
      // TOPIC 1: Air Composition & Combustion
      if (topicId === "air_combustion") {
        return (
          <div className="space-y-4" id="air_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Oxygen Consumption in Closed Bell Jar</h5>

            <div className="relative h-48 bg-[#080d1a] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-end p-2">
              
              {/* Glass bell jar */}
              <div className="w-28 h-36 border-2 border-slate-500 border-b-0 mx-auto rounded-t-2xl bg-slate-900/30 relative flex items-end justify-center">
                
                {/* Thick P2O5 white fumes */}
                {combustionPhase === "burning" && (
                  <div className="absolute inset-0 bg-white/70 animate-pulse text-[10px] text-slate-800 flex items-center justify-center font-bold text-center z-20">
                    Burning Phosphorus...<br/>Thick White P₂O₅ Fumes
                  </div>
                )}

                {/* Oxygen and pH meters */}
                <div className="absolute top-2 left-2 z-30 flex flex-col text-[8px] font-mono text-slate-400 bg-slate-950/80 p-1.5 rounded border border-slate-850 gap-0.5">
                  <span>Oxygen: <strong className="text-rose-400">{oxygenLevel.toFixed(1)}%</strong></span>
                  <span>Water pH: <strong className="text-yellow-400">{phOfWater.toFixed(1)}</strong></span>
                </div>

                {/* Volumetric scale line */}
                <div className="absolute right-1 top-2 bottom-0 flex flex-col justify-between text-[7px] text-slate-500 font-mono pointer-events-none select-none z-10">
                  <span>- 100%</span>
                  <span>- 80%</span>
                  <span>- 60%</span>
                  <span>- 40%</span>
                  <span className="text-blue-400">- 21% (Scale)</span>
                  <span>- 0%</span>
                </div>

                {/* Water Level inside Jar */}
                <motion.div 
                  style={{ height: `${waterRisePercent}%` }}
                  className="w-full bg-blue-500/80 border-t border-blue-400 absolute bottom-0 left-0 right-0 z-10 transition-all duration-300"
                />

                {/* Deflagrating spoon */}
                <div className="mb-6 z-30 text-center">
                  <span className="text-xl">
                    {combustionPhase === "burning" ? "🔥" : combustionPhase === "dissolved" ? "⚪" : "🟡"}
                  </span>
                  <span className="block text-[7px] text-slate-400">Phosphorus</span>
                </div>
              </div>

              {/* Water trough base */}
              <div className="w-full h-4 bg-blue-600/90 border border-blue-500 rounded z-0" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={combustionPhase !== "init"}
                onClick={() => setCombustionPhase("sealed")}
                className="py-1.5 bg-indigo-600 hover:bg-indigo-650 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded transition-colors"
              >
                1. Seal Bell Jar
              </button>
              <button
                disabled={combustionPhase !== "sealed"}
                onClick={() => setCombustionPhase("burning")}
                className="py-1.5 bg-orange-600 hover:bg-orange-650 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded transition-colors flex items-center justify-center gap-1"
              >
                <Flame className="w-3.5 h-3.5" />
                2. Heat & Ignite
              </button>
            </div>

            {combustionPhase === "dissolved" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-xs text-center">
                ✓ Combustion complete! Gaseous oxygen consumed completely. Water level rose by exactly 21% to fill the vacated volume, confirming air gas ratios.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 2: Periodic Trends
      if (topicId === "periodic_trends") {
        return (
          <div className="space-y-4" id="periodic_trends_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Alkali Metal Reactivity Bay</h5>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">Select Alkali Metal:</span>
                <div className="flex gap-1">
                  {["Li", "Na", "K"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMetal(m as any)}
                      className={`flex-grow py-1 rounded font-bold border transition-all ${
                        selectedMetal === m ? "bg-indigo-600 border-indigo-400 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">Reaction Liquid:</span>
                <div className="flex gap-1">
                  {(["water", "acid"] as const).map((med) => (
                    <button
                      key={med}
                      onClick={() => setReactionMedium(med)}
                      className={`flex-grow py-1 rounded font-bold border capitalize transition-all ${
                        reactionMedium === med ? "bg-indigo-600 border-indigo-400 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reaction display & digital meters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#080d1a] border border-slate-800 p-3 rounded-xl flex items-center justify-center min-h-[120px] relative">
                <div className="text-center">
                  <span className="text-3xl block animate-bounce">
                    {selectedMetal === "K" ? "💥🔥" : selectedMetal === "Na" ? "⚡⚪" : selectedMetal === "Li" ? "🧼⚪" : "🥛"}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-2">
                    {selectedMetal ? `${selectedMetal} in ${reactionMedium}` : "Awaiting metal drop..."}
                  </span>
                </div>
              </div>

              {/* Digital Gauges */}
              <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span>Temperature (Temp):</span>
                  <strong className="text-rose-400">{liveTemp.toFixed(1)} °C</strong>
                </div>
                <div className="flex justify-between">
                  <span>H₂ Gas Liberated:</span>
                  <strong className="text-cyan-400">{Math.round(gasVolume)} mL</strong>
                </div>
                <div className="flex justify-between">
                  <span>Reaction Rate:</span>
                  <strong className="text-emerald-400">{liveVelocity} mol/L/s</strong>
                </div>
              </div>
            </div>

            {metalStatusText && (
              <div className="p-2 bg-indigo-950/30 border border-indigo-900/40 rounded text-slate-300 text-xs text-center font-medium">
                {metalStatusText}
              </div>
            )}
          </div>
        );
      }

      // TOPIC 3: Acids & Alkalis (Titration)
      if (topicId === "acids_alkalis") {
        return (
          <div className="space-y-4" id="titration_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Volumetric Titration Station</h5>

            <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">Indicator Dye:</span>
                <select
                  value={selectedIndicator}
                  onChange={(e) => setSelectedIndicator(e.target.value as any)}
                  className="bg-[#0e1422] border border-slate-800 rounded p-1 text-[11px] text-white w-full"
                >
                  <option value="phenolphthalein">Phenolphthalein (Pink $\to$ Clear)</option>
                  <option value="litmus">Litmus Paper (Blue $\to$ Red)</option>
                  <option value="methyl_orange">Methyl Orange (Yellow $\to$ Red)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">pH Meter readout:</span>
                <div className="bg-[#0e1422] rounded p-1 text-center font-mono font-bold text-emerald-400 text-sm border border-slate-800">
                  pH {phValue.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Conical Flask */}
              <div className="bg-[#080d1a] border border-slate-800 p-3 rounded-xl flex flex-col justify-center items-center relative">
                <span className="text-[9px] text-slate-500 font-mono mb-2">Conical Flask (pH Indicator):</span>
                <div className="w-20 h-24 relative overflow-hidden bg-slate-900 border border-slate-700 rounded-b-xl flex items-end">
                  <div 
                    style={{ backgroundColor: titrationColorState, height: "45%" }} 
                    className="w-full transition-colors duration-350 opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-900 font-bold select-none font-mono">
                    {titrationHclVolume > 0 ? `${titrationHclVolume} mL` : "NaOH base"}
                  </div>
                </div>
              </div>

              {/* Burette Controls */}
              <div className="space-y-3 flex flex-col justify-center">
                <div className="text-xs">
                  <span className="text-slate-400 block mb-0.5">Dispense 0.1M HCl:</span>
                  <span className="text-indigo-400 font-mono font-bold text-lg">{titrationHclVolume} mL / 50 mL</span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setBuretteFlowRate(1)}
                    className={`flex-grow py-1 rounded text-[10px] font-bold text-white transition-all ${
                      buretteFlowRate === 1 ? "bg-indigo-600 ring-2 ring-indigo-400" : "bg-slate-800"
                    }`}
                  >
                    Drip (Slow)
                  </button>
                  <button
                    onClick={() => setBuretteFlowRate(2)}
                    className={`flex-grow py-1 rounded text-[10px] font-bold text-white transition-all ${
                      buretteFlowRate === 2 ? "bg-indigo-600 ring-2 ring-indigo-400" : "bg-slate-800"
                    }`}
                  >
                    Stream (Fast)
                  </button>
                  <button
                    onClick={() => setBuretteFlowRate(0)}
                    className="py-1 px-3 bg-red-650 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                  >
                    Close
                  </button>
                </div>

                <button
                  onClick={handleCheckTitration}
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-650 text-white text-xs font-bold rounded"
                >
                  Verify Equivalence
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="p-2 bg-rose-950/20 border border-rose-900/40 rounded text-rose-400 text-center text-[10px]">
                {errorMessage}
              </div>
            )}

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-center text-[10px]">
                ✓ Endpoint reached! Solution fully neutralized at exactly 25.0 mL of HCl acid. Ionic equivalence confirmed.
              </div>
            )}
          </div>
        );
      }
    }

    if (classLevel === "S3") {
      // TOPIC 1: Chemical Bonding
      if (topicId === "chemical_bonding") {
        return (
          <div className="space-y-4" id="bonding_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Bonding, Conductivity & Pyrolysis Assays</h5>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">Sample:</span>
                <select
                  value={selectedBondingSample}
                  onChange={(e) => {
                    setSelectedBondingSample(e.target.value as any);
                    setBondingState("solid");
                    setBondingTemp(25);
                  }}
                  className="bg-[#0e1422] border border-slate-800 rounded p-1 text-[11px] text-white w-full"
                >
                  <option value="nacl">NaCl Salt (Ionic)</option>
                  <option value="sugar">Glucose Sugar (Covalent molecular)</option>
                  <option value="graphite">Graphite Rod (Giant covalent)</option>
                  <option value="copper">Copper Foil (Metallic)</option>
                </select>
              </div>
              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">State:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setBondingState("solid")}
                    className={`flex-grow py-1 rounded text-[10px] font-bold border ${
                      bondingState === "solid" ? "bg-indigo-600 border-indigo-400 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                    }`}
                  >
                    Solid
                  </button>
                  <button
                    disabled={selectedBondingSample === "graphite" || selectedBondingSample === "copper"}
                    onClick={() => setBondingState("solution")}
                    className={`flex-grow py-1 rounded text-[10px] font-bold border disabled:opacity-30 ${
                      bondingState === "solution" ? "bg-indigo-600 border-indigo-400 text-white" : "bg-slate-950 border-slate-850 text-slate-400"
                    }`}
                  >
                    Aqueous
                  </button>
                </div>
              </div>
            </div>

            {/* Assay Testing Panel */}
            <div className="grid grid-cols-2 gap-3">
              {/* Pyrolysis Heater */}
              <div className="bg-[#080d1a] border border-slate-800 p-2.5 rounded-xl text-center space-y-2">
                <span className="text-[10px] text-slate-400 block font-mono">Pyrolysis Assay</span>
                <div className="bg-[#0e1422] rounded p-1 text-rose-400 font-mono font-bold text-xs border border-slate-850">
                  {bondingTemp} °C
                </div>
                <div className="text-[10px] text-slate-350 min-h-8 flex items-center justify-center">
                  {bondingState === "molten" ? "🔥 Liquid Melted state" : "❄️ Solid state"}
                </div>
                <button
                  onMouseDown={() => setBondingHeaterActive(true)}
                  onMouseUp={() => setBondingHeaterActive(false)}
                  onMouseLeave={() => setBondingHeaterActive(false)}
                  className="w-full py-1 bg-red-650 hover:bg-red-750 text-white text-[10px] font-bold rounded cursor-pointer"
                >
                  Hold to Apply Heat
                </button>
              </div>

              {/* Conductivity Circuit */}
              <div className="bg-[#080d1a] border border-slate-800 p-2.5 rounded-xl text-center space-y-2">
                <span className="text-[10px] text-slate-400 block font-mono">Conductivity Circuit</span>
                
                {/* Light bulb */}
                <div className="flex justify-center items-center gap-4 py-1">
                  <span className={`text-2xl transition-all ${
                    bulbBrightness > 0 ? "scale-110 drop-shadow-[0_0_12px_#fbbf24] animate-pulse" : "opacity-30 filter grayscale"
                  }`}>
                    💡
                  </span>
                  <div className="text-[10px] text-slate-400 text-left font-mono">
                    Ammeter:<br/>
                    <strong className="text-cyan-400 text-xs">{ammeterCurrent.toFixed(1)} A</strong>
                  </div>
                </div>

                <button
                  onClick={() => setConductivityCircuitActive(!conductivityCircuitActive)}
                  className={`w-full py-1 text-[10px] font-bold rounded cursor-pointer ${
                    conductivityCircuitActive ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {conductivityCircuitActive ? "Switch ON" : "Switch OFF"}
                </button>
              </div>
            </div>

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-xs text-center">
                ✓ Assay complete! Ionic structures conduct only when molten/dissolved (free ions); covalent molecules do not conduct; metals conduct in solid.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 2: Carbon Environment (Carbonates Pyrolysis)
      if (topicId === "carbon_environment") {
        return (
          <div className="space-y-4" id="carbon_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Thermal Decomposition of Carbonate</h5>

            <div className="relative h-44 bg-[#080d1a] border border-slate-800 rounded-xl overflow-hidden flex justify-around items-center p-3">
              {/* Limestone Heating tube */}
              <div className="relative text-center w-24">
                <span className="text-2xl block">{carbonateHeatApplied ? "🔥" : "💤"}</span>
                <span className="text-[9px] font-mono text-slate-400 block mt-1">Furnace: {carbonateTemp} °C</span>
                <span className="text-[8px] text-slate-500 block">CaCO₃ Limestone</span>
              </div>

              {/* Delivery Tube connecting arrow */}
              <div className="text-slate-600 flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-sky-400">
                  {carbonateGasRate > 0 ? "🫧 CO₂ bubbles" : "---"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Limewater container */}
              <div className="text-center w-24">
                <div className={`w-18 h-24 rounded-lg border mx-auto flex items-center justify-center transition-all ${
                  limewaterClarity === "milky" ? "bg-stone-300 text-stone-850 border-stone-400 font-bold" :
                  limewaterClarity === "cleared_again" ? "bg-cyan-900/10 text-cyan-400 border-cyan-800" : "bg-sky-950/20 text-sky-400 border-sky-900"
                }`}>
                  <span className="text-[9px] font-mono leading-tight uppercase text-center p-1">
                    {limewaterClarity === "milky" ? "Milky (CaCO₃ ppt)" :
                     limewaterClarity === "cleared_again" ? "Clear Again (Ca(HCO3)2)" : "Clear Limewater"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCarbonateHeatApplied(!carbonateHeatApplied)}
                className={`flex-grow py-2 rounded text-xs font-bold text-white flex justify-center items-center gap-1.5 cursor-pointer ${
                  carbonateHeatApplied ? "bg-red-650" : "bg-orange-600 hover:bg-orange-650"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                {carbonateHeatApplied ? "Stop Heating" : "Heat Carbonate"}
              </button>
              <button
                onClick={handleCheckCarbonate}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-650 text-white font-bold text-xs rounded"
              >
                Check Limewater
              </button>
            </div>

            {errorMessage && (
              <div className="p-2 bg-rose-950/20 border border-rose-900/40 rounded text-rose-400 text-center text-[10px]">
                {errorMessage}
              </div>
            )}

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-center text-[10px]">
                ✓ Pyrolysis confirmed! Limestone decomposed to release Carbon Dioxide gas which turns limewater milky.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 3: Stoichiometry (Magnesium Oxidation)
      if (topicId === "stoichiometry_moles") {
        return (
          <div className="space-y-4" id="stoichiometry_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Magnesium Oxide Synthesis Weigh Lab</h5>

            {/* Step workflow descriptor */}
            <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-350">
              <strong className="block text-sky-300 font-semibold mb-0.5">Weighing Step {mgoStep} of 5:</strong>
              {mgoStep === 0 && "1. Tare the digital scale first to calibrate to 0.00 g."}
              {mgoStep === 1 && "2. Place empty crucible on scale to weigh it."}
              {mgoStep === 2 && "3. Add magnesium ribbon into crucible and weigh mass."}
              {mgoStep === 3 && "4. Ignite burner to oxidize. Toggle lid to 'cracked' for best yield."}
              {mgoStep === 4 && "5. Place burned product crucible back on scale to weigh. Note weight gain."}
              {mgoStep === 5 && "6. Calculate moles ratio of Reactants & Products to verify stoichiometric ratios."}
            </div>

            {/* Lab view area */}
            <div className="grid grid-cols-2 gap-4">
              {/* Digital Scale */}
              <div className="bg-[#080d1a] border border-slate-800 p-3 rounded-xl flex flex-col justify-center items-center">
                <span className="text-[8px] uppercase font-mono text-slate-500 mb-1">Digital Weigh Scale</span>
                <div className="w-24 h-16 bg-slate-900 border border-slate-750 rounded-lg flex flex-col justify-center items-center relative">
                  <span className="text-emerald-400 font-mono font-bold text-lg">{scaleReading.toFixed(2)} g</span>
                  <span className="text-[8px] text-slate-500 uppercase font-mono">Stable</span>
                </div>
              </div>

              {/* Crucible setup */}
              <div className="bg-[#080d1a] border border-slate-800 p-3 rounded-xl flex flex-col justify-center items-center relative">
                {mgoStep === 3 ? (
                  <div className="text-center space-y-2">
                    <span className="text-2xl block animate-pulse">🔥🥣</span>
                    <div className="flex gap-1">
                      {["closed", "cracked", "off"].map((lid) => (
                        <button
                          key={lid}
                          onClick={() => setLidState(lid as any)}
                          className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase transition-all ${
                            lidState === lid ? "bg-orange-600 text-white" : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {lid}
                        </button>
                      ))}
                    </div>
                    <span className="text-[8px] text-slate-400 font-mono">Burn: {mgBurnProgress}%</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <span className="text-3xl block">🥣</span>
                    <span className="text-[9px] text-slate-400 block mt-1">Crucible Tray</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-1.5">
              {mgoStep === 0 && (
                <button onClick={() => setMgoStep(1)} className="w-full py-1.5 bg-indigo-600 text-white font-bold text-xs rounded">Tare Scale</button>
              )}
              {mgoStep === 1 && (
                <button onClick={() => setMgoStep(2)} className="w-full py-1.5 bg-indigo-600 text-white font-bold text-xs rounded">Weigh Crucible</button>
              )}
              {mgoStep === 2 && (
                <button onClick={() => setMgoStep(3)} className="w-full py-1.5 bg-indigo-600 text-white font-bold text-xs rounded">Add Mg & Weigh</button>
              )}
              {mgoStep === 3 && (
                <button 
                  onClick={() => setSublimeHeatApplied(!sublimeHeatApplied)} 
                  className={`w-full py-1.5 text-white font-bold text-xs rounded flex items-center justify-center gap-1.5 ${sublimeHeatApplied ? "bg-red-650" : "bg-orange-600"}`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  {sublimeHeatApplied ? "Stop burner" : "Ignite burner"}
                </button>
              )}
              {mgoStep === 4 && (
                <button onClick={() => setMgoStep(5)} className="w-full py-1.5 bg-indigo-600 text-white font-bold text-xs rounded">Go to calculations</button>
              )}
            </div>

            {/* Calculations Form */}
            {mgoStep === 5 && (
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2 font-mono">
                <span className="font-semibold text-slate-350 block">Molar calculations:</span>
                <p className="text-[9px] text-slate-400">
                  Mg Mass: 0.48g. Oxygen mass: {parseFloat((scaleReading - 24.98).toFixed(2))}g.<br/>
                  (Molar masses: Mg = 24g/mol, O = 16g/mol)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Mg Moles (0.02)"
                    value={userMgMoles}
                    onChange={(e) => setUserMgMoles(e.target.value)}
                    className="bg-[#0e1422] border border-slate-700 rounded px-2 py-1 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="O Moles"
                    value={userOMoles}
                    onChange={(e) => setUserOMoles(e.target.value)}
                    className="bg-[#0e1422] border border-slate-700 rounded px-2 py-1 text-xs text-white"
                  />
                </div>
                <button
                  onClick={handleCheckMgoMoles}
                  className="w-full py-1 bg-emerald-650 hover:bg-emerald-700 text-white font-bold rounded text-xs"
                >
                  Check formula
                </button>
                {mgoResultText && (
                  <p className="text-[10px] font-semibold text-indigo-400 mt-1">{mgoResultText}</p>
                )}
              </div>
            )}
          </div>
        );
      }
    }

    if (classLevel === "S4") {
      // TOPIC 1: Kinetics
      if (topicId === "rates_of_reactions") {
        return (
          <div className="space-y-4" id="kinetics_lab_simulator">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Zinc & HCl Kinetics Gas Collection</h5>

            {/* Variable Selectors */}
            <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 font-semibold text-slate-400">
              <div className="space-y-1">
                <span>Acid Conc (M):</span>
                <select
                  value={kineticsConc}
                  onChange={(e) => setKineticsConc(Number(e.target.value))}
                  className="bg-[#0e1422] border border-slate-800 rounded p-0.5 text-[10px] text-white w-full"
                >
                  <option value={0.5}>0.5 M (Weak)</option>
                  <option value={1.0}>1.0 M (Normal)</option>
                  <option value={2.0}>2.0 M (Strong)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span>Temperature (°C):</span>
                <select
                  value={kineticsTemp}
                  onChange={(e) => setKineticsTemp(Number(e.target.value))}
                  className="bg-[#0e1422] border border-slate-800 rounded p-0.5 text-[10px] text-white w-full"
                >
                  <option value={20}>20 °C (Room)</option>
                  <option value={40}>40 °C (Warm)</option>
                  <option value={60}>60 °C (Hot)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span>Zinc Surface:</span>
                <select
                  value={kineticsSurface}
                  onChange={(e) => setKineticsSurface(e.target.value as any)}
                  className="bg-[#0e1422] border border-slate-800 rounded p-0.5 text-[10px] text-white w-full"
                >
                  <option value="granules">Granules (Large)</option>
                  <option value="powder">Fine Powder (Small)</option>
                </select>
              </div>

              <div className="space-y-1 flex items-center gap-1.5 pt-3">
                <input
                  type="checkbox"
                  checked={kineticsHasCatalyst}
                  onChange={(e) => setKineticsHasCatalyst(e.target.checked)}
                  className="accent-indigo-500"
                />
                <span>Add CuSO₄ catalyst</span>
              </div>
            </div>

            {/* Gas Syringe Graphic */}
            <div className="bg-[#080d1a] border border-slate-800 p-3 rounded-xl">
              <span className="text-[9px] font-mono text-slate-500 block mb-1">Hydrogen Gas Collection Syringe:</span>
              <div className="w-full h-8 bg-slate-900 border border-slate-750 rounded relative flex items-center p-1">
                <div className="h-6 bg-slate-800/80 border-r-2 border-slate-600 z-10 transition-all duration-300" style={{ width: `${kineticsGasVolume}%` }} />
                <span className="absolute right-2 font-mono font-bold text-xs text-indigo-400 z-20">{kineticsGasVolume} mL H₂</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                disabled={kineticsIsRunning}
                onClick={() => {
                  setKineticsVolumeHistory([]);
                  setKineticsTime(0);
                  setKineticsGasVolume(0);
                  setKineticsIsRunning(true);
                  setLabState("running");
                }}
                className="flex-grow py-2 bg-indigo-650 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-xs rounded transition-colors"
              >
                Run Kinetics Elution
              </button>
            </div>

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-xs text-center">
                ✓ Reaction complete! Live rates demonstrate that higher heat, strong acids, powder surface and catalysts elevate reactant collision frequency.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 2: Electrochemistry
      if (topicId === "electrochemistry") {
        return (
          <div className="space-y-4" id="electroplating_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">CuSO₄ Faraday Copper Electroplating Tank</h5>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">Electrolyte:</span>
                <select
                  value={electroElectrolyte}
                  onChange={(e) => setElectroElectrolyte(e.target.value as any)}
                  className="bg-[#0e1422] border border-slate-800 rounded p-1 text-[11px] text-white w-full"
                >
                  <option value="cuso4">Copper Sulfate (CuSO₄)</option>
                  <option value="agno3">Silver Nitrate (AgNO₃)</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[9px] uppercase font-mono">Anode Rod:</span>
                <select
                  value={electroAnode}
                  onChange={(e) => setElectroAnode(e.target.value as any)}
                  className="bg-[#0e1422] border border-slate-800 rounded p-1 text-[11px] text-white w-full"
                >
                  <option value="copper">Active Copper Rod</option>
                  <option value="silver">Active Silver Rod</option>
                  <option value="platinum">Inert Platinum Rod</option>
                </select>
              </div>
            </div>

            {/* Electroplating Cell */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-[#080d1a] border border-slate-800 p-3 rounded-xl flex justify-around items-center h-32 relative">
                <div className="absolute inset-0 bg-blue-500/10 rounded-xl" />

                {/* Anode */}
                <div className="text-center z-10">
                  <div className={`w-3.5 h-16 rounded shadow-md border ${
                    electroAnode === "copper" ? "bg-amber-700 border-amber-800" :
                    electroAnode === "silver" ? "bg-slate-350 border-slate-400" : "bg-slate-600 border-slate-700"
                  }`} />
                  <span className="block text-[8px] text-slate-400 mt-1 uppercase">Anode</span>
                </div>

                {/* Migrating Ions */}
                {electroSwitchOn && platedThickness < 99 && (
                  <div className="text-[10px] text-indigo-400 animate-pulse font-bold font-mono">
                    {electroElectrolyte === "cuso4" ? "Cu²⁺ ⇉" : "Ag⁺ ⇉"}
                  </div>
                )}

                {/* Cathode Key */}
                <div className="text-center z-10">
                  <div className={`w-12 h-12 rounded-full border border-slate-600 transition-all duration-350 flex items-center justify-center ${
                    platedThickness > 0 ? (electroElectrolyte === "cuso4" ? "bg-amber-600 border-amber-700" : "bg-slate-300 border-slate-400") : "bg-slate-700"
                  }`}>
                    <span className="text-[9px] text-white font-bold font-mono">KEY</span>
                  </div>
                  <span className="block text-[8px] text-slate-400 mt-1 uppercase">Cathode</span>
                </div>
              </div>

              {/* Plating controls */}
              <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span>DC Voltage:</span>
                  <strong className="text-indigo-400">{electroplatingVoltage} V</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={electroplatingVoltage}
                  onChange={(e) => setElectroplatingVoltage(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded accent-indigo-500"
                />

                <div className="flex justify-between">
                  <span>Ammeter:</span>
                  <strong className="text-emerald-400">{ammeterCurrent} A</strong>
                </div>
                <div className="flex justify-between">
                  <span>Mass plated:</span>
                  <strong className="text-yellow-400">{(10.0 + platedWeightAdded / 1000).toFixed(4)} g</strong>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setElectroSwitchOn(!electroSwitchOn)}
                className={`flex-grow py-2 rounded text-xs font-bold text-white cursor-pointer ${
                  electroSwitchOn ? "bg-red-650" : "bg-emerald-600 hover:bg-emerald-650"
                }`}
              >
                {electroSwitchOn ? "Switch OFF DC Power" : "Switch ON DC Power"}
              </button>
            </div>

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-xs text-center">
                ✓ Plating successful! Steel cathode surface fully plated with metallic crystals following Faraday's laws of charge conversion.
              </div>
            )}
          </div>
        );
      }

      // TOPIC 3: Blast Furnace
      if (topicId === "industrial_extraction") {
        return (
          <div className="space-y-4" id="metallurgy_lab">
            <h5 className="text-xs font-semibold text-sky-400 uppercase">Blast Furnace Industrial Dashboard</h5>

            {/* Feeds */}
            <div className="grid grid-cols-4 gap-1.5 text-[8px] bg-slate-900/50 p-2 rounded-lg border border-slate-800 font-mono text-slate-400">
              <div className="space-y-1">
                <span>Hematite: {feedOre}%</span>
                <input type="range" min="0" max="100" value={feedOre} onChange={(e) => setFeedOre(Number(e.target.value))} className="w-full accent-red-500 h-0.5" />
              </div>
              <div className="space-y-1">
                <span>Coke: {feedCoke}%</span>
                <input type="range" min="0" max="100" value={feedCoke} onChange={(e) => setFeedCoke(Number(e.target.value))} className="w-full accent-stone-500 h-0.5" />
              </div>
              <div className="space-y-1">
                <span>Limestone: {feedLimestone}%</span>
                <input type="range" min="0" max="100" value={feedLimestone} onChange={(e) => setFeedLimestone(Number(e.target.value))} className="w-full accent-amber-500 h-0.5" />
              </div>
              <div className="space-y-1">
                <span>Hot Blast: {blastAir}%</span>
                <input type="range" min="0" max="100" value={blastAir} onChange={(e) => setBlastAir(Number(e.target.value))} className="w-full accent-cyan-500 h-0.5" />
              </div>
            </div>

            {/* Furnace Status */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#080d1a] border border-slate-800 p-2.5 rounded-xl text-center space-y-1 flex flex-col justify-center relative">
                <span className="text-2xl block animate-pulse">🌋</span>
                <span className="text-[10px] text-slate-400 font-mono">Temp: <strong className="text-red-400">{blastFurnaceTemp} °C</strong></span>
                <div className="text-[8px] text-slate-500 space-y-0.5 mt-1 font-mono text-left pl-2">
                  <div>Fe (molten): {Math.round(ironVolume)} kg</div>
                  <div>Slag (liq): {Math.round(slagVolume)} kg</div>
                </div>
              </div>

              {/* Taps */}
              <div className="flex flex-col justify-center gap-2">
                <button
                  disabled={ironVolume < 50}
                  onClick={handleTapIron}
                  className="w-full py-1.5 bg-orange-650 hover:bg-orange-700 text-white font-bold rounded text-[10px] disabled:opacity-30"
                >
                  Tap Molten Iron ({tappedIron} / 1000 kg)
                </button>
                <button
                  disabled={slagVolume < 50}
                  onClick={handleTapSlag}
                  className="w-full py-1.5 bg-stone-700 hover:bg-stone-800 text-slate-200 font-bold rounded text-[10px] disabled:opacity-30"
                >
                  Tap Sandy Slag ({tappedSlag} kg)
                </button>
              </div>
            </div>

            {labState === "success" && (
              <div className="p-2 bg-emerald-950/20 border border-emerald-900/40 rounded text-emerald-400 text-[10px] text-center font-bold">
                ✓ Extraction complete! Tapped over 1000kg of molten iron. Slag separated sand impurities from the furnace successfully.
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="bg-[#161e30] border border-white/5 rounded-xl p-5 shadow-xl flex flex-col h-full justify-between" id="empirical_feedback_simulator_component">
      <div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#22d3ee]">
            Pillar II: Empirical Feedback
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0e1422] text-[#22d3ee] border border-white/5 uppercase tracking-wide">
            Interactive Lab Simulator
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Operate apparatus nodes to test the physical hypotheses outlined in chemical texts.
        </p>
      </div>

      <div className="flex-grow my-1">
        {renderLabView()}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-slate-600 animate-pulse" />
          Syllabus-Aligned Practical Lab
        </span>
        <span className="text-sky-400 font-medium">✓ State Decoupled</span>
      </div>
    </div>
  );
}
