import React from 'react';
import { ArrowRight, Sparkles, Cpu, Target, Award } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

export default function LandingPage({ onStart }) {
  return (
    <div className="relative min-h-screen w-full bg-[#070913] text-white overflow-hidden flex flex-col justify-center items-center select-none font-sans">
      {/* 3D WebGL Moving Geometric & Particle Canvas */}
      <ThreeCanvas />

      {/* Futuristic Background Atmospheric Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/15 to-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sleek Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Centered Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Subtle Tech Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md mb-8 animate-pulse shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-widest font-semibold text-cyan-300">
            Next-Gen AI Campus Recruitment & Placement Engine
          </span>
        </div>

        {/* Project Name strictly in the center */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Role{' '}
          </span>
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(99,102,241,0.5)]">
            Match
          </span>
        </h1>

        {/* Hindi / Subtitle Label */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl font-light mb-10 leading-relaxed">
          रोल मैच • Automated Shortlist Chance Predictor & Career Intelligence for Engineering Students.
        </p>

        {/* The single central action button: "Let's Get Started" */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:shadow-[0_0_80px_rgba(6,182,212,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 backdrop-blur-xl cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-3 tracking-wide">
            <span>Let's Get Started</span>
            <span className="text-xs font-normal opacity-80">(लेट्स गेट स्टार्टेड)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300 text-cyan-200" />
          </span>
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </button>

        {/* Highlights / Features Row Below the button */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-16 max-w-2xl border-t border-slate-800/80 pt-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-2 text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Real-Time AI Match</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-2 text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Shortlist Probability</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 font-medium">Top Tech Giants</span>
          </div>
        </div>
      </div>

      {/* Clean minimal footer footnote */}
      <div className="absolute bottom-4 text-xs text-slate-600 font-mono tracking-wider">
        ROLE MATCH AI • ZERO BACKEND • ZERO EXTERNAL API • CLIENT ENGINE
      </div>
    </div>
  );
}
