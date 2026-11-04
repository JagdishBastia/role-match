import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Building2, MapPin, DollarSign, Sparkles, 
  CheckCircle, ArrowUpRight, Briefcase, Zap, Star, ExternalLink,
  SlidersHorizontal, Check
} from 'lucide-react';
import { TECH_ROLES } from '../data/rolesData';
import { calculateShortlistChance } from '../utils/aiShortlistEngine';

const CATEGORIES = [
  'All Technical Roles',
  'Frontend',
  'Backend',
  'Full Stack',
  'Software Engineering',
  'DevOps & Cloud',
  'AI & Data Science',
  'Mobile Development',
  'Cybersecurity'
];

export default function RolesDashboard({ 
  student, 
  onSelectRole, 
  onEditProfile,
  applications = []
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Technical Roles');
  const [minMatchOnly, setMinMatchOnly] = useState(false);

  // Pre-calculate shortlisting chances for sorting and quick badges
  const rolesWithScores = useMemo(() => {
    return TECH_ROLES.map(role => {
      const match = calculateShortlistChance(student, role);
      const isApplied = applications.some(a => a.roleId === role.id);
      return {
        ...role,
        score: match.probability,
        badge: match.badge,
        color: match.color,
        isApplied
      };
    });
  }, [student, applications]);

  // Filtered and searched roles
  const filteredRoles = useMemo(() => {
    return rolesWithScores.filter(role => {
      // Category filter
      if (selectedCategory !== 'All Technical Roles') {
        if (role.category !== selectedCategory) return false;
      }

      // High match toggle
      if (minMatchOnly && role.score < 70) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = role.title.toLowerCase().includes(query);
        const matchesCompany = role.company.toLowerCase().includes(query);
        const matchesLocation = role.location.toLowerCase().includes(query);
        const matchesSkill = role.requiredSkills.some(s => s.toLowerCase().includes(query));
        return matchesTitle || matchesCompany || matchesLocation || matchesSkill;
      }

      return true;
    }).sort((a, b) => b.score - a.score); // sort by best AI shortlist chance
  }, [rolesWithScores, selectedCategory, minMatchOnly, searchTerm]);

  const topMatchRole = rolesWithScores.reduce((max, r) => r.score > max.score ? r : max, rolesWithScores[0]);

  return (
    <div className="w-full font-sans">
      {/* Student Welcome & Match Telemetry Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800/80 shadow-2xl mb-8 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Engine Calibrated for {student.fullName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Curated Technical Campus Drives & Openings
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Matching your academic standing at <strong className="text-slate-200">{student.collegeName}</strong> ({student.branch}, {student.cgpa} CGPA) against 20+ top tier tech recruiting pipelines.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 flex-wrap">
            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-28">
              <span className="block text-2xl font-black text-white">{TECH_ROLES.length}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Live Roles</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-28">
              <span className="block text-2xl font-black text-emerald-400">{topMatchRole?.score || 95}%</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Top Match ({topMatchRole?.company})</span>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center min-w-28">
              <span className="block text-2xl font-black text-cyan-400">{applications.length}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider">Applied</span>
            </div>

            <button
              onClick={onEditProfile}
              className="px-4 py-3 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs font-semibold cursor-pointer transition flex items-center gap-2"
            >
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Navigation */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role title, company (Google, Amazon, Uber...), or skill (React, Python)..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* High Match Filter Toggle */}
          <button
            onClick={() => setMinMatchOnly(!minMatchOnly)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold border transition cursor-pointer shrink-0 ${
              minMatchOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>High Shortlist Only (&ge;70%)</span>
          </button>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-transparent shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Role Count Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          Showing <span className="text-cyan-400 font-bold">{filteredRoles.length}</span> Opportunities Sorted by Match Fit
        </p>
      </div>

      {/* Roles Grid */}
      {filteredRoles.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/30 border border-slate-800">
          <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No roles found matching your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try relaxing filters or adjusting your search keyword.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All Technical Roles'); setMinMatchOnly(false); }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs text-cyan-300 hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map(role => {
            const studentSkills = (student.skills || []).map(s => s.toLowerCase());

            return (
              <div
                key={role.id}
                className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] backdrop-blur-xl"
              >
                {/* Top Role Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* Company Logo & Name badge */}
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-2xl p-2 bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-sm"
                        style={{ borderColor: role.companyColor + '30' }}
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
                          <Building2 className="w-6 h-6 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        {/* Company Name Clearly Under Role Context */}
                        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{role.company}</span>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                          {role.title}
                        </h3>
                      </div>
                    </div>

                    {/* AI Shortlist Chance Badge */}
                    <div className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 border flex items-center gap-1 ${
                      role.score >= 80 
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                        : role.score >= 60 
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      <Zap className="w-3 h-3" />
                      <span>{role.score}% Match</span>
                    </div>
                  </div>

                  {/* Metadata Chips (Location, Salary, Min CGPA) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{role.location}</span>
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-semibold">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span>{role.salary}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-400">
                      Min CGPA: {role.minCgpa}
                    </span>
                  </div>

                  {/* Role Description Snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {role.description}
                  </p>

                  {/* Required Tech Skills (highlighting matched) */}
                  <div className="mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-2">
                      Key Technical Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {role.requiredSkills.slice(0, 5).map(skill => {
                        const isMatched = studentSkills.some(s => s === skill.toLowerCase() || skill.toLowerCase().includes(s));
                        return (
                          <span
                            key={skill}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                              isMatched
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                : 'bg-slate-950 text-slate-400 border-slate-800'
                            }`}
                          >
                            {isMatched && '✓ '}{skill}
                          </span>
                        );
                      })}
                      {role.requiredSkills.length > 5 && (
                        <span className="text-[11px] text-slate-500 py-0.5 px-1">
                          +{role.requiredSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button: Check Your Shortlist Chance */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectRole(role)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all duration-200 shadow-md shadow-indigo-500/20 hover:shadow-cyan-500/30 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Check Your Shortlist Chance</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
