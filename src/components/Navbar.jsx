import React from 'react';
import { 
  Sparkles, Bot, Database, User, CheckCircle2, Briefcase, 
  ChevronRight, ArrowLeft
} from 'lucide-react';

export default function Navbar({ 
  student, 
  applicationsCount = 0,
  onOpenAiBot, 
  onOpenDb, 
  onEditProfile,
  onBackToLanding,
  onViewApplications
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#070913]/90 backdrop-blur-xl border-b border-slate-800/90 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToLanding}
            title="Back to Landing Page"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070913] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Role<span className="text-cyan-400">Match</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-mono block -mt-1">
                AI RECRUITMENT ENGINE
              </span>
            </div>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Chatbot Button */}
          <button
            onClick={onOpenAiBot}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition shadow-sm shadow-cyan-500/10 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-cyan-400 animate-bounce" />
            <span className="hidden sm:inline">AI Placement Mentor</span>
            <span className="sm:hidden">AI Bot</span>
          </button>

          {/* MySQL DB Button */}
          <button
            onClick={onOpenDb}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition cursor-pointer"
          >
            <Database className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">MySQL Studio</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          {/* Applications Pill */}
          <button
            onClick={onViewApplications}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Applications:</span>
            <span className="px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[11px]">
              {applicationsCount}
            </span>
          </button>

          {/* Student Profile Quick View */}
          {student && (
            <button
              onClick={onEditProfile}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left transition cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {student.fullName ? student.fullName.charAt(0) : 'U'}
              </div>
              <div className="hidden lg:block">
                <span className="text-xs font-semibold text-white block leading-tight truncate max-w-28">
                  {student.fullName || 'Student Profile'}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {student.cgpa} CGPA
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
