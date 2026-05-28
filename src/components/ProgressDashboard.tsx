import React from "react";
import { BookOpen, FlaskConical, Award, Sliders, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { UserProgress } from "../types";

interface ProgressDashboardProps {
  progress: UserProgress;
}

export default function ProgressDashboard({ progress }: ProgressDashboardProps) {
  // Find the weakest skill track
  const { theoretical, experimental, structural } = progress;
  const lowestScore = Math.min(theoretical, experimental, structural);

  let adviceTitle = "Syllabus Balance Achieved!";
  let adviceText = "Amazing coverage! Change classes to explore further chemical reactions and periodic configuration trends.";
  let lowestTrack = "none";

  if (lowestScore < 50) {
    if (theoretical <= experimental && theoretical <= structural) {
      adviceTitle = "Focus Area: Theoretical Mechanics Mastery";
      adviceText = "Recall scores are slightly lower. Increase theoretical comprehension by completing topic-specific quizzes in the lower panel.";
      lowestTrack = "theoretical";
    } else if (experimental <= theoretical && experimental <= structural) {
      adviceTitle = "Focus Area: Experimental Laboratory Insight";
      adviceText = "Practical laboratory insight can be boosted. Operate the reaction simulators on Pillar II, heat beakers, turn on voltages, and watch catalyst slopes drop!";
      lowestTrack = "experimental";
    } else {
      adviceTitle = "Focus Area: Structural Assembly Mastery";
      adviceText = "Structural assembly is active. Play around with Bohr configurations or alter states thermodynamic sliding controllers in Pillar I!";
      lowestTrack = "structural";
    }
  }

  return (
    <div className="bg-[#161e30] border border-white/5 rounded-xl p-5 shadow-xl space-y-5" id="competency_progress_dashboard">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-cyan-400 block">
            Pillar III: Competency-Based Status
          </span>
          <h4 className="text-sm font-bold text-white mt-1">Syllabus Skill Tracks</h4>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>CBC Profile Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Track 1: Theoretical */}
        <div className={`p-4 rounded-xl border transition-all ${
          lowestTrack === "theoretical" ? "border-cyan-500/30 bg-[#0e1422]/70" : "border-white/5 bg-[#0e1422]/40"
        }`} id="track_theoretical_card">
          <div className="flex justify-between items-start mb-2">
            <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-lg font-bold font-mono text-cyan-400">{theoretical}%</span>
          </div>
          <span className="text-xs font-semibold text-white block">Theoretical Mechanics Mastery</span>
          <p className="text-[10px] text-slate-500 mt-1">Acquired from active recall testing datasets.</p>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${theoretical}%` }} className="bg-cyan-450 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] bg-gradient-to-r from-cyan-400 to-cyan-600" />
          </div>
        </div>

        {/* Track 2: Experimental */}
        <div className={`p-4 rounded-xl border transition-all ${
          lowestTrack === "experimental" ? "border-emerald-500/30 bg-[#0e1422]/70" : "border-white/5 bg-[#0e1422]/40"
        }`} id="track_experimental_card">
          <div className="flex justify-between items-start mb-2">
            <span className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FlaskConical className="w-4 h-4" />
            </span>
            <span className="text-lg font-bold font-mono text-emerald-400">{experimental}%</span>
          </div>
          <span className="text-xs font-semibold text-white block">Experimental Lab Insight</span>
          <p className="text-[10px] text-slate-500 mt-1">Earned via reaction apparatus control steps.</p>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${experimental}%` }} className="bg-emerald-450 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] bg-gradient-to-r from-emerald-400 to-emerald-600" />
          </div>
        </div>

        {/* Track 3: Structural */}
        <div className={`p-4 rounded-xl border transition-all ${
          lowestTrack === "structural" ? "border-amber-500/30 bg-[#0e1422]/70" : "border-white/5 bg-[#0e1422]/40"
        }`} id="track_structural_card">
          <div className="flex justify-between items-start mb-2">
            <span className="p-1.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sliders className="w-4 h-4" />
            </span>
            <span className="text-lg font-bold font-mono text-amber-400">{structural}%</span>
          </div>
          <span className="text-xs font-semibold text-white block">Structural Assembly Mastery</span>
          <p className="text-[10px] text-slate-500 mt-1">Gained via atomic configurations.</p>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div style={{ width: `${structural}%` }} className="bg-amber-450 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(251,191,36,0.3)] bg-gradient-to-r from-amber-400 to-amber-600" />
          </div>
        </div>
      </div>

      {/* Advisory feedback panel based on lowest element score */}
      <div className="bg-[#0e1422] border border-white/5 p-4 rounded-xl flex items-start gap-4" id="progress_advisory_panel">
        <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5 border border-cyan-500/20">
          {lowestScore === 100 ? (
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          ) : (
            <AlertCircle className="w-5 h-5 text-cyan-400" />
          )}
        </div>
        <div>
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
            {lowestScore === 100 ? "Ugandan Secondary Champion Profile Unlocked" : adviceTitle}
            {lowestScore === 100 && (
              <span className="text-[9px] bg-cyan-950 text-cyan-400 font-mono py-0.5 px-2 rounded-full border border-cyan-900 font-bold">
                Level Max S4
              </span>
            )}
          </h5>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {adviceText}
          </p>
          <div className="mt-2.5 flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">Generate personalized diagnostic homework based on weak metrics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
