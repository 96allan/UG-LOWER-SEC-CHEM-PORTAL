import React, { useState, useEffect } from "react";
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, Award, Lightbulb } from "lucide-react";

import { QuizQuestion } from "../types";

interface QuizSystemProps {
  quizQuestions: QuizQuestion[];
  onActionCompleted: (skill: "theoretical" | "experimental" | "structural") => void;
}

export default function QuizSystem({ quizQuestions, onActionCompleted }: QuizSystemProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Reset states when the quiz set changes
  useEffect(() => {
    setCurrentQuestionIdx(0);
    setSelectedOption(0);
    setSelectedOption(null);
    setAnswerRevealed(false);
    setScore(0);
    setQuizFinished(false);
  }, [quizQuestions]);

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500 text-xs">
        No interactive quiz database available for this selected syllabus path.
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIdx];

  const handleOptionSubmit = (optionIdx: number) => {
    if (answerRevealed) return;
    
    setSelectedOption(optionIdx);
    setAnswerRevealed(true);
    
    if (optionIdx === currentQuestion.ans) {
      setScore((s) => s + 1);
      // Give competency rewards
      onActionCompleted("theoretical");
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((idx) => idx + 1);
      setSelectedOption(null);
      setAnswerRevealed(false);
    } else {
      setQuizFinished(true);
      onActionCompleted("theoretical");
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setAnswerRevealed(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-[#161e30] border border-white/5 rounded-xl p-5 shadow-xl flex flex-col justify-between" id="active_recall_quiz_component">
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#22d3ee]">
            Active Recall Challenge
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#0e1422] text-[#22d3ee] border border-white/5 uppercase tracking-wide">
            Theoretical Mastery Path
          </span>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
          Test secondary conceptual knowledge immediately to isolate conceptual friction points.
        </p>
      </div>

      <div className="flex-grow my-2">
        {!quizFinished ? (
          <div className="space-y-4">
            {/* Question title */}
            <div className="text-xs font-medium text-slate-200">
              <span className="text-indigo-400 mr-2 font-mono">Q{currentQuestionIdx + 1} of {quizQuestions.length}:</span>
              {currentQuestion.q}
            </div>

            {/* Multiple Choice lists */}
            <div className="space-y-2">
              {currentQuestion.options.map((option, optIdx) => {
                let optionStyle = "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300";
                
                if (answerRevealed) {
                  if (optIdx === currentQuestion.ans) {
                    // Correct green style
                    optionStyle = "border-emerald-500 bg-emerald-950/20 text-emerald-300 font-medium";
                  } else if (optIdx === selectedOption) {
                    // User guessed incorrectly
                    optionStyle = "border-rose-500 bg-rose-950/20 text-rose-300";
                  } else {
                    optionStyle = "border-slate-900 bg-slate-950/30 text-slate-600 cursor-not-allowed";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={answerRevealed}
                    onClick={() => handleOptionSubmit(optIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex justify-between items-center ${optionStyle} ${
                      !answerRevealed ? "cursor-pointer" : ""
                    }`}
                    id={`quiz_opt_${optIdx}`}
                  >
                    <span>{option}</span>
                    
                    {answerRevealed && optIdx === currentQuestion.ans && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {answerRevealed && optIdx === selectedOption && optIdx !== currentQuestion.ans && (
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Diagnostic explanation feedback */}
            {answerRevealed && (
              <div className="p-3 bg-[#0e1422] rounded-lg border border-white/5 text-[11px] text-slate-300 space-y-2 animate-[pulse_3s_infinite]" id="quiz_diagnostic_card">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Syllabus Diagnostic Explanation:</span>
                </div>
                <p className="leading-relaxed">
                  {currentQuestion.explanation}
                </p>
                <button
                  onClick={handleNext}
                  className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-lg transition-colors flex justify-center items-center gap-1 mt-2 cursor-pointer shadow-md shadow-cyan-500/10"
                  id="quiz_next_btn"
                >
                  Continue Syllabus Pathway
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6 space-y-4" id="quiz_report_card">
            <span className="text-4xl text-cyan-400 block animate-bounce">🏆</span>
            <h5 className="text-sm font-bold text-white">Competency Stage Checked!</h5>
            <p className="text-xs text-slate-300">
              You correctly aligned <strong className="text-cyan-450">{score}</strong> out of <strong className="text-slate-300">{quizQuestions.length}</strong> active recall challenges.
            </p>
            <div className="text-[10px] text-cyan-400 italic">
              Competency score added to Theoretical Mechanics Mastery track.
            </div>

            <button
              onClick={handleRetake}
              className="py-1.5 px-4 bg-cyan-600/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/30 font-semibold rounded-lg text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              id="quiz_restart_btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Stage
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 font-mono text-cyan-400 font-semibold">
          <Award className="w-4 h-4 text-cyan-400" />
          Competency-Based assessment
        </span>
        <span className="font-semibold text-slate-400">Syllabus Active</span>
      </div>
    </div>
  );
}
