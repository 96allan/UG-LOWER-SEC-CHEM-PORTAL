import React from "react";
import { GraduationCap, MapPin, Compass } from "lucide-react";

interface CurriculumSelectorProps {
  selectedClass: string;
  selectedTopicId: string;
  onClassChange: (clas: string) => void;
  onTopicChange: (topicId: string) => void;
}

const topicsMap: Record<string, { id: string; name: string }[]> = {
  S1: [
    { id: "chemistry_society", name: "Topic 1: Chemistry & Society (Hazards & Equipment)" },
    { id: "states_of_matter", name: "Topic 2: States of Matter (Sublimation & Kinetic Spacing)" },
    { id: "mixtures_pure", name: "Topic 3: Mixtures & Pure Substances (Molecular Separations)" }
  ],
  S2: [
    { id: "air_combustion", name: "Topic 4: Air, Water, Combustion & Oxidation" },
    { id: "periodic_trends", name: "Topic 5: Atomic Bohr Structure & Period Trends" },
    { id: "acids_alkalis", name: "Topic 6: Acids, Alkalis & Titration Systems" }
  ],
  S3: [
    { id: "chemical_bonding", name: "Topic 7: Ionic Valency vs Covalent Sharing" },
    { id: "carbon_environment", name: "Topic 8: Carbon Allotropes & Carbonates Pyrolysis" },
    { id: "stoichiometry_moles", name: "Topic 9: Weights, Conversions & Stoichiometry Moles" }
  ],
  S4: [
    { id: "rates_of_reactions", name: "Topic 10: Rate Factors, Activation Energy & Catalyst slopes" },
    { id: "electrochemistry", name: "Topic 11: CuSO₄ Electroplating, Redox & Currents" },
    { id: "industrial_extraction", name: "Topic 12: Blast Furnace Reduction & Reactivity SERIES" }
  ]
};

export default function CurriculumSelector({
  selectedClass,
  selectedTopicId,
  onClassChange,
  onTopicChange
}: CurriculumSelectorProps) {
  const availableTopics = topicsMap[selectedClass] || [];

  return (
    <div 
      className="bg-[#161e30] border border-white/5 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between" 
      id="curriculum_selector_component"
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-10 h-10 bg-cyan-500/15 text-cyan-400 rounded-lg border border-cyan-500/30 flex items-center justify-center shrink-0">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#22d3ee] font-bold block">
            National Syllabus Explorer
          </span>
          <h1 className="text-sm font-bold text-white flex items-center gap-1.5 leading-none mt-1">
            <span>Ugandan Lower Secondary CBC Chemistry (Senior 1 - 4)</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto md:flex-nowrap">
        {/* Class level dropdown selector */}
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block pl-0.5">Active Academic Path:</label>
          <select
            id="classSelector"
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="bg-[#0e1422] border border-white/10 text-xs px-3 py-2 rounded-lg text-white font-semibold outline-none cursor-pointer hover:border-cyan-500/50 transition-colors focus:ring-1 focus:ring-cyan-500 w-full sm:w-64"
          >
            <option value="S1">Senior 1 (Introductory Matter & Separation)</option>
            <option value="S2">Senior 2 (Periodic Trends & Atmospheric)</option>
            <option value="S3">Senior 3 (Bonding & Stoichiometry)</option>
            <option value="S4">Senior 4 (Kinetics, Energy profiles & Redox)</option>
          </select>
        </div>

        {/* Dynamic Topic level selector */}
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-[9px] text-slate-500 font-mono uppercase tracking-widest block pl-0.5">Focus Module Topic:</label>
          <select
            id="topicSelector"
            value={selectedTopicId}
            onChange={(e) => onTopicChange(e.target.value)}
            className="bg-[#0e1422] border border-white/10 text-xs px-3 py-2 rounded-lg text-white font-semibold cursor-pointer outline-none hover:border-cyan-500/50 transition-colors focus:ring-1 focus:ring-cyan-500 w-full sm:w-72"
          >
            {availableTopics.map((topic) => (
              <option key={topic.id} value={topic.id} className="text-white bg-[#0e1422]">
                {topic.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
export { topicsMap };
