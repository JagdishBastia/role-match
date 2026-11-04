import React from 'react';
import { Briefcase, X, CheckCircle2, Clock, Building2, Sparkles, Send } from 'lucide-react';
import { getApplications } from '../utils/dbStorage';

export default function ApplicationsModal({ isOpen, onClose, onExploreRoles }) {
  if (!isOpen) return null;

  const applications = getApplications();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0c101c] border border-slate-700/80 rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.2)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Your Submitted Job Applications</h3>
              <p className="text-xs text-slate-400">
                Track status and AI shortlist assessment for each applied opening.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-300">No applications submitted yet</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore the open campus roles, click "Check Your Shortlist Chance", and submit your application with one click!
              </p>
              <button
                onClick={() => { onClose(); if (onExploreRoles) onExploreRoles(); }}
                className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold"
              >
                Explore Roles Now
              </button>
            </div>
          ) : (
            applications.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold block">{app.company}</span>
                    <h4 className="text-sm font-bold text-white">{app.roleTitle}</h4>
                    <span className="text-xs text-slate-400">Applied on: {app.appliedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">AI Match Probability</span>
                    <span className="text-sm font-black text-emerald-400">{app.shortlistChance}%</span>
                  </div>

                  <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{app.status}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
