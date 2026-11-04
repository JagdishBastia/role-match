import React, { useState } from 'react';
import { 
  X, Sparkles, CheckCircle2, AlertTriangle, ArrowUpRight, 
  Send, ShieldCheck, GraduationCap, Code2, Award, Zap, Building2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateShortlistChance } from '../utils/aiShortlistEngine';
import { applyForRole } from '../utils/dbStorage';

export default function ShortlistModal({ role, student, onClose, onApplied }) {
  if (!role || !student) return null;

  const analysis = calculateShortlistChance(student, role);
  const [hasApplied, setHasApplied] = useState(false);
  const [applyMessage, setApplyMessage] = useState(null);

  const handleApply = () => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti err', e);
    }

    const res = applyForRole(student, role, analysis.probability);
    if (res.success) {
      setHasApplied(true);
      setApplyMessage('Application recorded in MySQL Relational Store! Shortlist Probability: ' + analysis.probability + '%');
      if (onApplied) onApplied();
    } else {
      setApplyMessage(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-[#0b0f19] border border-slate-700/80 rounded-3xl shadow-[0_0_80px_rgba(99,102,241,0.25)] overflow-hidden my-8">
        {/* Glow Header */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Company & Role Header */}
          <div className="flex items-start gap-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 bg-slate-900 border border-slate-700 shadow-md shrink-0"
              style={{ borderColor: role.companyColor + '40' }}
            >
              {role.logo ? (
                <img 
                  src={role.logo} 
                  alt={role.company} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <Building2 className="w-8 h-8 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/30">
                  {role.category}
                </span>
                <span className="text-xs text-slate-400">• {role.location}</span>
                <span className="text-xs text-slate-400">• {role.salary}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-1 truncate">
                {role.title}
              </h2>
              <p className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mt-0.5">
                <span>Hiring Company:</span>
                <span className="text-cyan-400 font-bold">{role.company}</span>
              </p>
            </div>
          </div>

          {/* AI Score Spotlight Card */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-indigo-950/40 border border-slate-700/80 overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Shortlisting Probability Calculator</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Match Assessment for {student.fullName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluated against {role.company}'s hiring criteria & candidate benchmarks.
                </p>
              </div>

              {/* Score Gauge Circle / Box */}
              <div className="flex items-center gap-3">
                <div className="relative flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-slate-950 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    {analysis.probability}%
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                    Match Score
                  </span>
                </div>
              </div>
            </div>

            {/* Verdict Status */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-400">Predicted AI Status:</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                analysis.probability >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                analysis.probability >= 60 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {analysis.badge} • {analysis.decision}
              </span>
            </div>
          </div>

          {/* Breakdown Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Skills */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tech Skills</span>
                </span>
                <span className="font-bold text-white">{analysis.skillsMatchScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.skillsMatchScore}%` }} 
                />
              </div>
            </div>

            {/* Academics */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                  <span>CGPA ({student.cgpa} vs {role.minCgpa})</span>
                </span>
                <span className="font-bold text-white">{analysis.academicScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.academicScore}%` }} 
                />
              </div>
            </div>

            {/* Branch Eligibility */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-purple-400" />
                  <span>Branch & Year</span>
                </span>
                <span className="font-bold text-white">{analysis.eligibilityScore}%</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${analysis.eligibilityScore}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Matched vs Missing Skills Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matched Skills */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Matched Skills ({analysis.matchedSkills.length})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedSkills.length === 0 ? (
                  <span className="text-xs text-slate-500 italic">None of your skills directly match role requirements.</span>
                ) : (
                  analysis.matchedSkills.map(skill => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    >
                      ✓ {skill}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Missing / Desired Skills ({analysis.missingSkills.length})</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingSkills.length === 0 ? (
                  <span className="text-xs text-emerald-400 font-medium">Full skill requirement satisfied! 🚀</span>
                ) : (
                  analysis.missingSkills.map(skill => (
                    <span 
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30"
                    >
                      + {skill}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* AI Tailored Recommendations */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>AI Placement Mentor Suggestions</span>
            </h4>
            <ul className="space-y-1.5">
              {analysis.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Feedback / Action Bar */}
          {applyMessage && (
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200 text-center font-medium">
              {applyMessage}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold cursor-pointer transition"
            >
              Close
            </button>

            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                hasApplied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20'
              }`}
            >
              {hasApplied ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Applied to {role.company}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>One-Click Submit Application</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
