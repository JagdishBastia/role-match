import React, { useState } from 'react';
import { 
  User, GraduationCap, Calendar, BookOpen, Award, Code, 
  Globe, Sparkles, ArrowRight, CheckCircle2,
  RefreshCw, Plus, X, Link2, GitBranch
} from 'lucide-react';
import { ALL_SKILLS, BRANCHES, YEARS } from '../data/rolesData';
import { saveStudent } from '../utils/dbStorage';

export default function StudentForm({ initialStudent, onComplete, onCancel }) {
  const [formData, setFormData] = useState(initialStudent || {
    id: 'STU-101',
    fullName: '',
    collegeName: '',
    year: '4th Year / Final Year',
    branch: 'Computer Science & Engineering',
    cgpa: '8.5',
    skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL'],
    preferredDomain: 'Full Stack',
    githubUrl: 'https://github.com/my-profile',
    linkedinUrl: 'https://linkedin.com/in/my-profile',
    portfolioUrl: '',
    bio: ''
  });

  const [customSkill, setCustomSkill] = useState('');
  const [errors, setErrors] = useState({});

  // Calculate dynamic profile completion strength
  const calculateStrength = () => {
    let score = 0;
    if (formData.fullName.trim()) score += 20;
    if (formData.collegeName.trim()) score += 15;
    if (formData.branch) score += 15;
    if (formData.year) score += 10;
    if (formData.cgpa && parseFloat(formData.cgpa) > 0) score += 15;
    if (formData.skills && formData.skills.length >= 3) score += 15;
    if (formData.githubUrl || formData.linkedinUrl) score += 10;
    return Math.min(100, score);
  };

  const strength = calculateStrength();

  const handleToggleSkill = (skill) => {
    const current = formData.skills || [];
    if (current.includes(skill)) {
      setFormData({ ...formData, skills: current.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...current, skill] });
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!customSkill.trim()) return;
    const trimmed = customSkill.trim();
    if (!formData.skills.includes(trimmed)) {
      setFormData({ ...formData, skills: [...formData.skills, trimmed] });
    }
    setCustomSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleFillDemoData = () => {
    setFormData({
      id: 'STU-101',
      fullName: 'Aarav Sharma',
      collegeName: 'National Institute of Technology (NIT)',
      year: '4th Year / Final Year',
      branch: 'Computer Science & Engineering',
      cgpa: '8.8',
      skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Data Structures', 'Git', 'Docker', 'AWS'],
      preferredDomain: 'Full Stack',
      githubUrl: 'https://github.com/aarav-sharma-dev',
      linkedinUrl: 'https://linkedin.com/in/aarav-sharma',
      portfolioUrl: 'https://aaravsharma.dev',
      bio: 'Full Stack enthusiast and competitive programmer with 3 full-stack MERN & AI projects deployed.'
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'Please enter your college name';
    if (!formData.cgpa || isNaN(formData.cgpa) || parseFloat(formData.cgpa) < 0 || parseFloat(formData.cgpa) > 10) {
      newErrors.cgpa = 'Enter valid CGPA (0.0 to 10.0)';
    }
    if (!formData.skills || formData.skills.length === 0) {
      newErrors.skills = 'Select at least one skill';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to simulated MySQL storage
    const saved = saveStudent(formData);
    onComplete(saved);
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Neon Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1: Student Profile Calibration</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Create Student Profile
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Provide your academic details and technical competencies to train the AI Shortlist Matcher.
            </p>
          </div>

          <button
            type="button"
            onClick={handleFillDemoData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 text-xs font-semibold border border-cyan-500/30 transition shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Autofill Demo Profile</span>
          </button>
        </div>

        {/* Live Profile Strength Card */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              strength >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
              strength >= 50 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
              'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              {strength}%
            </div>
            <div>
              <p className="text-sm font-semibold text-white">AI Profile Readiness Strength</p>
              <p className="text-xs text-slate-400">
                {strength >= 80 ? 'Optimal! High accuracy for Google, Amazon, Uber & Microsoft matching.' :
                 strength >= 50 ? 'Good progress. Add more skills & project links for higher shortlist prediction.' :
                 'Incomplete profile. Fill in required fields to unlock company match scoring.'}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                strength >= 80 ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' :
                strength >= 50 ? 'bg-gradient-to-r from-indigo-500 to-cyan-400' :
                'bg-gradient-to-r from-amber-500 to-rose-400'
              }`}
              style={{ width: `${strength}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Personal & Academic Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name (पूरा नाम) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* College Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  College / University Name (कॉलेज का नाम) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    placeholder="e.g. NIT Trichy / DTU / VIT"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
                {errors.collegeName && <p className="text-xs text-rose-400 mt-1">{errors.collegeName}</p>}
              </div>

              {/* Academic Year */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Academic Year (कौन सा ईयर) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none cursor-pointer"
                  >
                    {YEARS.map(yr => (
                      <option key={yr} value={yr} className="bg-slate-900 text-white">
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch / Stream */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Branch / Specialization (कौन सा ब्रांच) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none cursor-pointer"
                  >
                    {BRANCHES.map(br => (
                      <option key={br} value={br} className="bg-slate-900 text-white">
                        {br}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CGPA */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Cumulative CGPA / 10 (ग्रेजुएशन सीजीपीए) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    placeholder="8.50"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                  />
                </div>
                {errors.cgpa && <p className="text-xs text-rose-400 mt-1">{errors.cgpa}</p>}
              </div>

              {/* Preferred Domain */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Domain Preference
                </label>
                <div className="relative">
                  <Code className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={formData.preferredDomain}
                    onChange={(e) => setFormData({ ...formData, preferredDomain: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition appearance-none cursor-pointer"
                  >
                    <option value="Frontend">Frontend Developer</option>
                    <option value="Backend">Backend Developer</option>
                    <option value="Full Stack">Full Stack Developer</option>
                    <option value="Software Engineering">Software Development Engineer (SDE)</option>
                    <option value="DevOps & Cloud">DevOps & Cloud Engineer</option>
                    <option value="AI & Data Science">AI / Machine Learning & Data Science</option>
                    <option value="Cybersecurity">Cybersecurity Analyst</option>
                    <option value="Mobile Development">Mobile App Developer</option>
                    <option value="Testing & QA">QA Automation / SDET</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills Section */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                <span>Technical Skills & Competencies</span>
              </h2>
              <span className="text-xs text-slate-400">
                Selected: <strong className="text-cyan-300">{formData.skills.length}</strong> skills
              </span>
            </div>

            {/* Currently Selected Skills Tags */}
            <div className="flex flex-wrap gap-2 min-h-12 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              {formData.skills.length === 0 ? (
                <span className="text-xs text-slate-500 italic p-1">No skills selected yet. Click from below or add custom.</span>
              ) : (
                formData.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-cyan-500/40 text-cyan-200 group"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-400 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>
            {errors.skills && <p className="text-xs text-rose-400">{errors.skills}</p>}

            {/* Add Custom Skill Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Add custom skill (e.g. Next.js, FastAPI, Rust)..."
                className="flex-1 px-4 py-2 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomSkill(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Recommended Skills Grid to pick from */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Quick Select Popular Skills:
              </p>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {ALL_SKILLS.map(skill => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social Links & Portfolio */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Globe className="w-5 h-5 text-indigo-400" />
              <span>Profiles & Portfolio Links (Optional for Bonus Match Score)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* GitHub */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  GitHub Profile URL
                </label>
                <div className="relative">
                  <GitBranch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  LinkedIn URL
                </label>
                <div className="relative">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Portfolio / Projects Website
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://mywebsite.dev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Short Bio */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Candidate Bio / Highlights
              </label>
              <textarea
                rows="2"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="e.g. Winner of Smart India Hackathon, built 2 microservices with Docker, 300+ LeetCode problems solved..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-semibold transition cursor-pointer"
              >
                Back to Landing
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-base font-bold shadow-[0_0_35px_rgba(99,102,241,0.5)] transition duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Save Profile & Explore Company Roles</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
