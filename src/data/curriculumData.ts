import { ClassLevelData } from "../types";

export const CurriculumSyllabus: Record<string, ClassLevelData> = {
  S1: {
    level: "S1",
    label: "Senior 1 (Introductory Matter & Separation)",
    topics: [
      {
        id: "chemistry_society",
        name: "Chemistry & Society (Hazard Symbols & Lab Safety)",
        term: "T1",
        title: "Senior 1. Topic 1: Chemistry and Society",
        objectives: "Identify hazard symbols, understand lab safety procedures, and distinguish core laboratory apparatus.",
        steps: [
          { text: "Every lab chemical carries specific warning symbols (corrosive, toxic, flammable) to prevent accidents.", visualTag: "HAZARD_SYMBOLS" },
          { text: "Safety rules are active protocols: always wear eye shields, never taste chemical reagents, and ventilate gaseous experiments.", visualTag: "LAB_SAFETY" },
          { text: "Standard apparatus has dedicated geometries: conical flasks for titrations, beakers for holding liquids, and pipettes for accurate volumes.", visualTag: "LAB_APPARATUS" }
        ],
        quiz: [
          {
            q: "Which hazard symbol features a skull and crossbones?",
            options: ["Corrosive", "Toxic", "Flammable", "Oxidising"],
            ans: 1,
            explanation: "The skull and crossbones symbol denotes toxic substances that can cause serious health damage or death if inhaled or ingested."
          },
          {
            q: "What is the primary function of a conical flask?",
            options: ["Measuring exact volumes", "Swirling liquids securely during titrations", "Heating solid elements directly", "Condensing steam to water"],
            ans: 1,
            explanation: "The tapered neck of a conical flask allows solutions to be swirled vigorously without spilling, making it ideal for titrations."
          }
        ],
        labPrompt: "Interact with the laboratory apparatus by selecting correct safety gear and identifying hazard warning signs on acid bottles in this simulated cabinet.",
        structuralPrompt: "Sort safety practices and laboratory tools to establish a secure chemical workflow."
      },
      {
        id: "states_of_matter",
        name: "States of Matter & Physical/Chemical Changes",
        term: "T2",
        title: "Senior 1. Topic 2: Kinetic Theory & Particle Changes",
        objectives: "Explain particle layouts in solid, liquid, and gaseous form, and differentiate physical sublimation of iodine from chemical decomposition.",
        steps: [
          { text: "Matter consists of minute particles in perpetual motion. In solids, they vibrate in a tight, fixed lattice.", visualTag: "STATES_SOLID" },
          { text: "Adding heat transfers kinetic energy, moving particles apart into the fluid, fluidly-slipping layout of liquids.", visualTag: "STATES_LIQUID" },
          { text: "Higher energies break all cohesive secondary bonds, causing sublimation (solid to gas directly) seen when physical heating vaporizes iodine into purple fumes.", visualTag: "STATES_GAS" }
        ],
        quiz: [
          {
            q: "What physical phase change occurs when solid iodine transforms directly into a gaseous purple vapor?",
            options: ["Evaporation", "Sublimation", "Condensation", "Deposition"],
            ans: 1,
            explanation: "Sublimation is the direct transition from a solid to a gas phase without passing through the liquid state, highly characteristic of iodine."
          },
          {
            q: "How does particle kinetic energy behave during solid melting?",
            options: ["Remains absolutely zero", "Decreases, locking particles tighter", "Increases, overcoming solid intermolecular holds", "Disappears entirely"],
            ans: 2,
            explanation: "Thermal heating boosts kinetic energy (vibrations and translation), allowing particles to slide past each other and form a liquid state."
          }
        ],
        labPrompt: "Apply thermal heat to the crucible. Watch how purple iodine crystals undergo rapid physical sublimation, rising directly into purple gas plumes, and then re-crystallize on the cool upper watchglass.",
        structuralPrompt: "Configure the particle density and spacing parameters to simulate phase changes under the kinetic theory."
      },
      {
        id: "mixtures_pure",
        name: "Mixtures & Pure Substances (Molecular Separations)",
        term: "T3",
        title: "Senior 1. Topic 3: Sorting & Isolating Substances",
        objectives: "Apply paper chromatography, filtration, and fractional distillation to isolate clean components using physical molecular properties.",
        steps: [
          { text: "Paper chromatography separates pigments: solvent carries different molecules up paper pores at speeds dictated by their solubility.", visualTag: "CHROMATOGRAPHY" },
          { text: "Fractional distillation separates miscible liquids (like ethanol and water) by exploiting the differences in their specific boiling points.", visualTag: "DISTILLATION" },
          { text: "Filtration isolates insoluble precipitates (like barium sulfate) from liquids by locking solid clusters on porous filter meshes.", visualTag: "FILTRATION" }
        ],
        quiz: [
          {
            q: "What dictates how far a pigment travels on a paper chromatography strip?",
            options: ["The physical weight of the beaker", "Relative chemical solubility in the rising solvent", "The atmospheric humidity of the laboratory", "The volume of filter paper applied"],
            ans: 1,
            explanation: "Components with high affinity/solubility in the mobile phase travel faster up the paper column, while those attaching of the paper pores move slower."
          },
          {
            q: "Which property is key to separating ethanol and water via fractional distillation?",
            options: ["Different particle weights", "Discrepancy in boiling points", "Magnetic field polarization", "Ability to undergo color changes"],
            ans: 1,
            explanation: "Fractional distillation relies on separating volatile compounds by their boiling point gradients, trapping low boiling ethanol first."
          }
        ],
        labPrompt: "Conduct a chromatography separation run. Feed ink samples, select water as the solvent, and measure the Retention Factor (Rf values) as separation occurs across colored banding lines.",
        structuralPrompt: "Align isolated molecules into their respective extraction tubes using physical filtration and distillation filters."
      }
    ]
  },
  S2: {
    level: "S2",
    label: "Senior 2 (Periodic Trends & Atmospheric Systems)",
    topics: [
      {
        id: "air_combustion",
        name: "Composition of Air, Combustion & Rusting",
        term: "T1",
        title: "Senior 2. Topic 4: Air Gases and Oxidation",
        objectives: "Quantify the elements of atmospheric air, observe non-metal combustion (phosphorus), and identify rusting conditions.",
        steps: [
          { text: "Air is a mixture of gases: roughly 78% Nitrogen, 21% Oxygen, 0.9% Argon, and 0.04% Carbon Dioxide.", visualTag: "AIR_COMPOSITION" },
          { text: "Oxidation actions burn phosphorus in oxygen, generating thick white clouds of solid phosphorus(V) oxide.", visualTag: "OXIDATION_FIRE" },
          { text: "Iron rusting is a slow hydration oxidation that demands both liquid moisture (water) and diatomic oxygen gas.", visualTag: "RUSTING_LAB" }
        ],
        quiz: [
          {
            q: "What approximate percentage of dry atmospheric air is constituted by Oxygen?",
            options: ["78%", "21%", "0.04%", "1%"],
            ans: 1,
            explanation: "Atmospheric oxygen accounts for roughly 21% of clean air, while nitrogen occupies approximately 78%."
          },
          {
            q: "Which environmental combination is absolutely necessary for iron nails to rust?",
            options: ["Nitrogen gas and oil", "Dry carbon dioxide and salt", "Liquid water/moisture and Oxygen gas", "High vacuum and clean quartz"],
            ans: 2,
            explanation: "Rusting is an electrochemical hydration of iron: iron reacts with gaseous oxygen in the presence of liquid water to form hydrated iron(III) oxide."
          }
        ],
        labPrompt: "Conduct a metal oxidation lab. Place phosphorus in a closed gas jar over water, ignite it, and watch how it consumes exactly 21% of the gas volume, making the liquid water rise inside.",
        structuralPrompt: "Assemble the balanced stoichiometric formula for phosphorus burning in oxygen."
      },
      {
        id: "periodic_trends",
        name: "Atomic Structure & Periodic Group Trends",
        term: "T2",
        title: "Senior 2. Topic 5: Bohr Configurations & Trends",
        objectives: "Map protons, neutrons, and electron rings (n=1 to n=20) and connect outer shell configurations with Periodic Group trends.",
        steps: [
          { text: "Every neutral atom houses positive protons and neutral neutrons in its nucleus, surrounded by negative electrons in energy shells.", visualTag: "BOHR_RINGS" },
          { text: "The inner shell holds a maximum of 2 electrons, while secondary shells accommodate up to 8 electrons (octet rule).", visualTag: "OCTET_CONFIG" },
          { text: "Reactivity trends depend on outermost electrons: Group 1 metals (Alkali) lose 1 single electron, reacting faster as atomic size swells.", visualTag: "GROUP_TRENDS" }
        ],
        quiz: [
          {
            q: "What is the proper electron configuration arrangement of the element Calcium (atomic number 20)?",
            options: ["2, 8, 10", "2, 8, 8, 2", "2, 18", "8, 8, 2, 2"],
            ans: 1,
            explanation: "Calcium occupies four energy levels filled as 2 in the first, 8 in the second, 8 in the third, and 2 in the outermost valence shell."
          },
          {
            q: "Why do Group 1 Alkali metals react more vigorously with water as you move down the group?",
            options: ["Outermost electron is closer to the positive nucleus", "Nucleus loses protons down the group", "Outer electron is further from the positive nucleus, experiencing less holding force and is lost easier", "Atomic density turns into liquid state"],
            ans: 2,
            explanation: "As atomic size increases down Group 1, the valence electron resides further from the positive nucleus. Electrostatic attraction gets weaker, authorizing easier electron loss."
          }
        ],
        labPrompt: "Activate the chemical reactivity bay. Drop alkaline metals (Sodium vs Potassium) into water flasks to measure flame temperatures, gas liberation volumes, and reaction velocities.",
        structuralPrompt: "Build stable electronic Bohr shell layouts step-by-step for elements from Hydrogen (n=1) to Calcium (n=20)."
      },
      {
        id: "acids_alkalis",
        name: "Acids, Alkalis, Salts & Titration Systems",
        term: "T3",
        title: "Senior 2. Topic 6: Neutralization and Salt Isolation",
        objectives: "Perform acid-base colorimetric titrations, measure pH indicators, and isolate soluble/insoluble salts.",
        steps: [
          { text: "Acids produce Hydrogen ions (H+) in water; Alkalis yield Hydroxide ions (OH-). Together they balance into neutral water (H2O).", visualTag: "OH_H_NEUTRAL" },
          { text: "Titration is a volumetric analysis: standard acid is precisely dripped into base to determine the exact neutralization equivalence endpoint.", visualTag: "TITRATION_BURETTE" },
          { text: "Insoluble salts (like Lead Chloride) are produced instantly via precipitation reactions mixing two soluble salts.", visualTag: "SALT_PRECIPITATION" }
        ],
        quiz: [
          {
            q: "What is the net ionic equation representing the neutralization of a strong acid like HCl by a strong base like NaOH?",
            options: ["Na+ + Cl- -> NaCl", "H+ + OH- -> H2O", "HCl + NaOH -> NaCl + H2O", "H+ + HCl -> Cl2"],
            ans: 1,
            explanation: "The true ionic change in aqueous acid-alkali neutralization is the reaction of acid hydrogen ions with basic hydroxide ions to yield water molecules."
          },
          {
            q: "Which pH number corresponds to a highly alkaline solution?",
            options: ["pH 1", "pH 7", "pH 5", "pH 13"],
            ans: 3,
            explanation: "The pH scale spans from 0 to 14. Highly acidic is near 0, neutral is 7, whereas strongly basic or alkaline solutions reside near 13-14."
          }
        ],
        labPrompt: "Run an acid-alkali titration. Carefully drip 0.1M hydrochloric acid from the burette into sodium hydroxide containing phenolphthalein. Note the volume required to change color from intense pink to clear.",
        structuralPrompt: "Assemble insoluble salts out of reagent matrices by combining the correct heavy cation and halide anions."
      }
    ]
  },
  S3: {
    level: "S3",
    label: "Senior 3 (Chemical Bonding & Stoichiometry)",
    topics: [
      {
        id: "chemical_bonding",
        name: "Chemical Bonding (Ionic, Covalent & Lattices)",
        term: "T1",
        title: "Senior 3. Topic 7: Molecular Lattices & Bonding",
        objectives: "Contrast electron sharing in covalent substances with electron transfer in giant ionic crystal lattices.",
        steps: [
          { text: "Ionic bonding occurs when electropositive metals donate valence electrons to electronegative non-metals.", visualTag: "IONIC_TRANSFER" },
          { text: "These electrostatic forces create hard, high-melting giant crystalline arrays that conduct electricity when liquid.", visualTag: "IONIC_LATTICE" },
          { text: "Covalent links arise when atoms share electron orbits to fulfill stable octets, creating molecules with lower relative melting points.", visualTag: "COVALENT_SHARING" }
        ],
        quiz: [
          {
            q: "Why do giant ionic lattices typically fail to conduct electricity in solid form?",
            options: ["They lack free moving electrons", "Ions are locked in rigid crystal lattices and cannot migrate", "They undergo sublimation under electrical stress", "Salt ions convert into diatomic gas molecules"],
            ans: 1,
            explanation: "In solid ionic structures, the ions are secured firmly by strong electrostatic attractions. Only upon melting or dissolving do they gain kinetic mobility to carry charge."
          },
          {
            q: "What type of bonding occurs when carbon atoms share outer orbitals to establish octet arrangements in dry gases?",
            options: ["Metallic bonding", "Ionic Coulombic attraction", "Covalent electron sharing", "Weak hydrogen bonding"],
            ans: 2,
            explanation: "Covalent bonds refer to the mechanical sharing of non-metal outer shell electrons to form mutually stable electron pairs."
          }
        ],
        labPrompt: "Conduct electrical conductivity assays on sodium chloride salt. Compare its conductivity in solid state versus dissolved/molten states to observe ionic ion migration.",
        structuralPrompt: "Drag and transfer valence electrons from Sodium (Na) to Chlorine (Cl) to construct an authentic electrostatic salt crystal."
      },
      {
        id: "carbon_environment",
        name: "Carbon, Allotropes & Carbonates Decomposition",
        term: "T2",
        title: "Senior 3. Topic 8: Carbon Allotropes & Carbonates",
        objectives: "Differentiate carbon allotropes (Diamond vs Graphite) and model the thermal degradation of calcium carbonate.",
        steps: [
          { text: "Allotropes are different physical structural forms of the same element. Diamond behaves as a rigid tetrahedral web.", visualTag: "DIAMOND_WEB" },
          { text: "Graphite maps as layered, hexagonal plates bound by weak forces with delocalized sliding electrons, acting as a lubricant.", visualTag: "GRAPHITE_PLANES" },
          { text: "When heavy calcium carbonate (limestone) is heated, it undergoes decomposition to generate stable calcium oxide and carbon dioxide gas.", visualTag: "CARBONATE_DECOMP" }
        ],
        quiz: [
          {
            q: "Why can graphite conduct electric current as a solid while diamond remains an insulator?",
            options: ["Diamond has porous atomic holes", "Graphite structures possess delocalized, free-moving outer shell electrons within its hexagonal planes", "Graphite converts electricity to carbon dioxide gas", "Diamond ions migrate faster"],
            ans: 1,
            explanation: "In graphite, each carbon atom binds to only three others. The fourth valence electron is delocalized along the slideable hexagonal sheets, carrying electric current."
          },
          {
            q: "What of the following is produced when metallic limestone is heated intensely in the laboratory?",
            options: ["Calcium metal and chlorine gas", "Calcium oxide and carbon dioxide gas", "Pure diamond layers and hydrogen gas", "Calcium hydride and carbon steam"],
            ans: 1,
            explanation: "Thermal decomposition of calcium carbonate (CaCO3) breaks critical lattice groupings to form solid calcium oxide (CaO) and liberate carbon dioxide gas (CO2)."
          }
        ],
        labPrompt: "Assemble the carbonate thermal rig. Apply extreme flame heat to limestone powder in a test tube. Direct the escaped gas into lime water to witness the chalky milkiness of CO2 extraction.",
        structuralPrompt: "Select and pivot carbon allotrope nodes to inspect structural angles in 3D tetrahedral or planar forms."
      },
      {
        id: "stoichiometry_moles",
        name: "Stoichiometry, Balancing & Moles Visualizer",
        term: "T3",
        title: "Senior 3. Topic 9: Formulae, Weights, and Mole Scaling",
        objectives: "Differentiate molar volume of gases, balance equations, and verify the Conservation of Mass.",
        steps: [
          { text: "One mole of any chemical contains exactly 6.022 x 10^23 particles (Avogadro's constant).", visualTag: "MOLE_VISUAL" },
          { text: "Chemical equations must balance: total reactant atoms must perfectly equal product atoms under mass conservation.", visualTag: "BALANCING_SCALE" },
          { text: "In reactions, gas concentrations scale systematically: one mole of any ideal gas occupies 22.4 dm^3 of volume at standard STP conditions.", visualTag: "GAS_VOLUME" }
        ],
        quiz: [
          {
            q: "What constant defines the total quantity of atoms residing within exactly one single mole of physical element?",
            options: ["Planck's Constant", "Avogadro's Number (6.022 x 10^23)", "Boltzmann Molar Constant", "The STP Kelvin threshold"],
            ans: 1,
            explanation: "Avogadro's number determines the amount of particles (atoms, molecules, ions) in a mole of any solid, liquid, or gas substance."
          },
          {
            q: "If you have a combustion balancing test: CH4 + ? O2 -> CO2 + 2 H2O. What is the balancing coefficient for O2?",
            options: ["1", "2", "3", "4"],
            ans: 1,
            explanation: "In reactants: 1 C, 4 H, and 4 O. On product side: 1 C, 4 H, and 4 O total (from CO2 + 2 H2O). Therefore we need 2 molecules of O2 to balance the oxygen count."
          }
        ],
        labPrompt: "Scale reactant molecules precisely on a weigh balance. Manipulate stoichiometric coefficients in the reactive chamber to match mass conservation scales.",
        structuralPrompt: "Build matching atoms layouts by plugging real mole formulas of hydrochloric acid and metal oxides."
      }
    ]
  },
  S4: {
    level: "S4",
    label: "Senior 4 (Kinetics, Energy Profiles & Electrochemistry)",
    topics: [
      {
        id: "rates_of_reactions",
        name: "Kinetics, Activation Energy & Catalyst Slopes",
        term: "T1",
        title: "Senior 4. Topic 10: Kinetics and Collision Theory",
        objectives: "Explain how catalysts, concentrations, and heat affect reaction rates under kinetic collision assumptions.",
        steps: [
          { text: "Reaction rate represents product concentration created per unit time: active collisions require adequate kinetic energy.", visualTag: "COLLISION_FREQS" },
          { text: "The activation energy (Ea) is the energy hurdle that reactant molecules must scale in order to remodel their bonds.", visualTag: "ACTIVATION_ENERGY" },
          { text: "Adding a manganese dioxide catalyst lowers this required energy path, letting many more low-energy particles react instantly.", visualTag: "CATALYST_DROP" }
        ],
        quiz: [
          {
            q: "How does a catalyst accelerate a chemical reactions rate?",
            options: ["It heats up the reactant matrix", "It lowers the necessary activation energy barrier road, creating an easier path for collisions", "It consumes solid atoms to form intermediates", "It increases total reactant volume"],
            ans: 1,
            explanation: "Catalysts accelerate reactions by providing an alternative pathway with a lower activation energy, meaning more random collisions have sufficient energy to react successfully."
          },
          {
            q: "According to Collision Theory, what two metrics are mandatory for a collision to yield products?",
            options: ["Correct geometry alignment and sufficient activation energy", "High solvent density and gravity attraction", "Strong visual light and vacuum chamber rules", "Equal volume of solid and liquid atoms"],
            ans: 0,
            explanation: "To result in reaction, reactant particles must collide with sufficient kinetic energy (exceeding Ea) and have the correct physical orientation/geometry."
          }
        ],
        labPrompt: "Observe catalytic rate reactions. Add Manganese Dioxide catalyst to a beaker of Hydrogen Peroxide. Watch the activation energy line collapse, causing prompt oxygen gas release.",
        structuralPrompt: "Increase temperatures and concentration sliders to escalate the frequency of collision occurrences in the active zone."
      },
      {
        id: "electrochemistry",
        name: "Electrochemistry & Redox (CuSO4 Electrolysis)",
        term: "T2",
        title: "Senior 2. Topic 11: Electric Currents & Redox Processes",
        objectives: "Model positive anode oxidation and negative cathode reduction during electrolysis of copper sulfate.",
        steps: [
          { text: "Electrolysis uses direct current to trigger non-spontaneous redox reactions in an electrolyte bath.", visualTag: "ELECTROLYSIS_CELL" },
          { text: "At the negative cathode, metal ions gain electrons (reduction), forming clean copper metal plates on structural surfaces.", visualTag: "CATHODE_PLATE" },
          { text: "At the positive anode, anions or active anode metals lose electrons (oxidation), liberating gases or dissolving ions.", visualTag: "ANODE_SOLVE" }
        ],
        quiz: [
          {
            q: "During the copper electroplating electrolysis of copper sulfate using copper electrodes, what occurs at the negative cathode?",
            options: ["Pure oxygen gas release", "Copper atoms dissolve into copper ions", "Copper ions gain electrons (reduction) to plate out as metallic copper on the cathode surface", "Sulfuric acid is produced"],
            ans: 2,
            explanation: "The negative cathode attracts positive Cu2+ ions. These ions undergo reduction by gaining two electrons to plate onto the electrode, yielding a polished brown metallic coating."
          },
          {
            q: "What does the positive anode experience during electrolytic process?",
            options: ["Oxidation (loss of valence electrons)", "Reduction (atomic electron gain)", "Chemical sublimation of gas particles", "Absolute freezing of positive ions"],
            ans: 0,
            explanation: "In any galvanic or electrolytic cell, oxidation always takes place at the positive anode terminal where anions release electrons."
          }
        ],
        labPrompt: "Operate a copper plating electro-cell. Turn on the circuit voltage, trace the migration trajectories of blue Cu2+ ions towards the cathode, and plate out thick copper onto the key template.",
        structuralPrompt: "Transfer electronic vectors from negative anode to positive electronic receptors to execute redox equations."
      },
      {
        id: "industrial_extraction",
        name: "Industrial Metal Extraction (Blast Furnace & Reactivity)",
        term: "T3",
        title: "Senior 4. Topic 12: Blast Furnace and Metal Metallurgy",
        objectives: "Examine iron ore reduction in the Blast Furnace, use reactivity trends to balance extractions, and analyze carbon emissions.",
        steps: [
          { text: "Extracted metals follow reactivity lists: low reactivity metals are easily reduced, whereas reactive elements require massive electrolysis.", visualTag: "REACTIVITY_LIST" },
          { text: "In a Blast Furnace, iron ore (Fe2O3) is reduced by carbon monoxide (CO) gas generated by burning coke in high thermal winds.", visualTag: "BLAST_FURNACE" },
          { text: "Molten slag (calcium silicate) is formed to trap sandy lattice impurities, pouring out on top of heavy molten iron pools.", visualTag: "SLAG_DRAIN" }
        ],
        quiz: [
          {
            q: "What represents the primary biochemical agent responsible for reducing iron(III) oxide (hematite) inside the mid-region of the Blast Furnace?",
            options: ["Carbon dioxide gas (CO2)", "Solid slag matrix", "Carbon monoxide gas (CO)", "Diatomic Nitrogen wind"],
            ans: 2,
            explanation: "Inside the blast furnace high temperatures, carbon monoxide gas (CO) acts as the principal reducing agent, grabbing oxygen from Fe2O3 to liberate metallic Iron."
          },
          {
            q: "Why is limestone (CaCO3) introduced alongside iron ore and coke at the top of the Blast Furnace?",
            options: ["To cool down internal layers", "To decompose into CaO which reacts with silica (sand) to form molten slag, isolating impurities", "To provide combustible carbon gas", "To accelerate metal rusting currents"],
            ans: 1,
            explanation: "Limestone decomposes into calcium oxide (CaO), which reacts with acidic impurities (like sand, SiO2) to generate calcium silicate (slag, CaSiO3). Slag is liquid and can be easily tapped."
          }
        ],
        labPrompt: "Interact with the Blast Furnace dashboard. Maintain air flows, control charcoal feed rates, trace the chemical transitions from top hematite down to base molten iron, and skim Sandy Silicate slag.",
        structuralPrompt: "Arrange metals in descending reactivity order to choose whether carbon reduction or electrolysis extraction is optimal."
      }
    ]
  }
};
