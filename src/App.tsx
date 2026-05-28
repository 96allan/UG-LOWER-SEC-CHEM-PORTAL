import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, AlertCircle, Award, CheckCircle2, FlaskConical, Play, Lightbulb, Compass, Share2 } from "lucide-react";
import { UserProgress } from "./types";
import { CurriculumSyllabus } from "./data/curriculumData";
import CurriculumSelector, { topicsMap } from "./components/CurriculumSelector";
import ParticleEngine from "./components/ParticleEngine";
import ReactionLabSimulator from "./components/ReactionLabSimulator";
import QuizSystem from "./components/QuizSystem";
import ProgressDashboard from "./components/ProgressDashboard";

export default function App() {
  // Sync state
  const [selectedClass, setSelectedClass] = useState<string>("S2"); // Default to S2 as requested
  const [selectedTopicId, setSelectedTopicId] = useState<string>("periodic_trends"); // Default to Bohr configuration

  // Interactive user scores, initialized with fair starter values
  const [userProgress, setUserProgress] = useState<UserProgress>({
    theoretical: 40,
    experimental: 35,
    structural: 50
  });

  // Active notification flash
  const [rewardNotification, setRewardNotification] = useState<string | null>(null);

  // Maintain active topic sync when changing class levels
  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    // Grab first available topic for that class
    const topics = topicsMap[newClass];
    if (topics && topics.length > 0) {
      setSelectedTopicId(topics[0].id);
    }
  };

  const currentTopic = CurriculumSyllabus[selectedClass]?.topics.find(
    (topic) => topic.id === selectedTopicId
  );

  // Increment points function when a milestone is struck in any segment
  const handleActionCompleted = (skill: "theoretical" | "experimental" | "structural") => {
    setUserProgress((prev) => {
      const currentVal = prev[skill];
      if (currentVal >= 100) return prev;
      
      const updated = Math.min(100, currentVal + 15);
      
      // Flash reward
      const label = skill === "theoretical" ? "Theoretical Recall" : skill === "experimental" ? "Lab Observation" : "Assembly Structure";
      setRewardNotification(`+15% Competency Earned in: ${label}!`);
      setTimeout(() => setRewardNotification(null), 3000);

      return {
        ...prev,
        [skill]: updated
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0e1422] text-slate-200 flex flex-col font-sans relative antialiased" id="uganda_chem_cb_platform">
      {/* Absolute floating notifications */}
      {rewardNotification && (
        <div 
          className="fixed top-4 right-4 z-50 bg-[#161e30] border border-cyan-500/30 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2 text-white text-xs font-semibold animate-bounce"
          id="reward_toast"
        >
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>{rewardNotification}</span>
        </div>
      )}

      {/* Decorative ambient lighting overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Primary header navbar - Matches Elegant Dark Orchestrator Bar */}
      <header className="bg-[#161e30] border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-cyan-500/20 border border-cyan-400/50 rounded flex items-center justify-center text-cyan-400 font-bold text-xl">Be</div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                UG-CHEM <span className="text-cyan-400">CBC</span> CORE
              </h1>
              <span className="text-[10px] text-slate-500 font-mono block mt-1">Syllabus-Aligned Lower Secondary Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-slate-500 uppercase font-mono">Student ID</span>
              <span className="text-xs font-mono font-bold text-slate-200">UG-S4-2901-K</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-cyan-600/20">
              BM
            </div>
          </div>
        </div>
      </header>

      {/* Main Container workspace */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 relative z-10">
        
        {/* Step 1: Selector headers */}
        <CurriculumSelector
          selectedClass={selectedClass}
          selectedTopicId={selectedTopicId}
          onClassChange={handleClassChange}
          onTopicChange={setSelectedTopicId}
        />

        {/* Competencies Breakdown Scoreboard Panel */}
        <ProgressDashboard progress={userProgress} />

        {/* Central Lesson Board & Interactive Pillars Workspace splits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SPLIT: S1-S4 Lesson objectives and steps (Theoretical core module) */}
          <div className="lg:col-span-4 bg-[#161e30] border border-white/5 rounded-xl p-5 shadow-xl space-y-5" id="lesson_theoretical_board">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase mb-1">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Competency Target</span>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight" id="lesson_title">
                {currentTopic ? currentTopic.title : "Chemistry Syllabus Module"}
              </h3>
            </div>

            {/* Sub-text goals */}
            {currentTopic && (
              <div className="p-3.5 bg-[#0e1422]/70 rounded-lg border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold">Syllabus Objective:</span>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  {currentTopic.objectives}
                </p>
              </div>
            )}

            {/* Instruction steps */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold">Scaffolded Conceptual Steps:</span>
              <div className="space-y-2.5">
                {currentTopic?.steps.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-[#0e1422]/60 border border-white/5 hover:border-cyan-500/30 transition-all rounded-lg relative flex gap-3 cursor-pointer group"
                    onClick={() => handleActionCompleted("theoretical")}
                    id={`lesson_step_${idx}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-cyan-500 group-hover:text-[#0e1422] transition-all">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.text}
                      </p>
                      <span className="inline-block mt-1 bg-[#161e30] border border-white/5 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                        {step.visualTag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Lab prompts advising */}
            <div className="p-3.5 bg-cyan-950/20 border border-cyan-700/30 rounded-lg text-xs text-cyan-400 flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Lab Guidance:</strong>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  {currentTopic?.labPrompt}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SPLIT: Rendering Engines */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pillar I: Interactive Canvas Structural Frame */}
              <ParticleEngine
                classLevel={selectedClass}
                topicId={selectedTopicId}
                onActionCompleted={handleActionCompleted}
              />

              {/* Pillar II: Immediate Laboratory Simulator Frame */}
              <ReactionLabSimulator
                classLevel={selectedClass}
                topicId={selectedTopicId}
                onActionCompleted={handleActionCompleted}
              />

            </div>

            {/* Pillar III: Active Recall Multiple Choice assessment Quiz */}
            {currentTopic && (
              <QuizSystem
                quizQuestions={currentTopic.quiz}
                onActionCompleted={handleActionCompleted}
              />
            )}
          </div>

        </div>

        {/* System Footer - Matches Elegant Dark CSS & Layout */}
        <footer className="bg-[#161e30] border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5 text-center md:text-left">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <p className="text-slate-300 font-semibold leading-relaxed font-sans text-xs flex items-center gap-2">
                <span>🇺🇬</span> Lower Secondary Curriculum Aligned (S1 - S4)
              </p>
              <p className="text-[10px] text-slate-500 font-mono">DATA CORE CONNECTED: SYLLABUS_V2024.1_CBC</p>
            </div>
          </div>
          <div className="flex gap-4 text-[10px] font-bold text-slate-500 tracking-wider uppercase font-mono">
            <span className="hover:text-white cursor-pointer transition-colors">Master Curriculum Matrix</span>
            <span className="hover:text-white cursor-pointer transition-colors">Academic Support</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
export { App };
