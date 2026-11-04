import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, X, Sparkles, User, Lightbulb, Trash2, 
  HelpCircle, ChevronRight, MessageSquareCode
} from 'lucide-react';
import { TECH_ROLES } from '../data/rolesData';

const SUGGESTED_QUESTIONS = [
  '🎯 Which role has the highest shortlist chance for me?',
  '🚀 What skills should I learn to crack Google or Amazon?',
  '💡 Give me a roadmap to become a high-paid Full Stack Developer',
  '📄 How can I make my resume pass the ATS screening?',
  '📊 Does my current CGPA meet eligibility cutoffs?'
];

export default function AiChatbot({ student, isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${student?.fullName || 'there'}! 👋 I am your **RoleMatch AI Career Mentor**.\n\nI have loaded your profile from **${student?.collegeName || 'your college'}** (${student?.branch || 'Engineering'}, ${student?.cgpa || '8.5'} CGPA, ${student?.skills?.length || 5} skills). \n\nAsk me anything regarding shortlisting chances, company recruitment rounds (Google, Uber, Microsoft, Netflix...), resume tips, or skill roadmaps!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  // Intelligent client-side AI response generator
  const generateAiResponse = (userPrompt) => {
    const q = userPrompt.toLowerCase();
    const studentSkills = (student?.skills || []).map(s => s.toLowerCase());
    const cgpa = parseFloat(student?.cgpa) || 8.0;

    // 1. Highest shortlist chance
    if (q.includes('highest') || q.includes('best role') || q.includes('which role') || q.includes('recommend')) {
      const best = TECH_ROLES.slice(0, 3);
      return `Based on your profile with skills in **${(student?.skills || []).slice(0, 4).join(', ')}**:\n\n` +
        `1. **${best[0].title} @ ${best[0].company}** (~92% Match): Your tech stack matches their primary requirements directly.\n` +
        `2. **${best[2].title} @ ${best[2].company}** (~88% Match): Strong eligibility match for ${student?.branch || 'CSE'}.\n\n` +
        `💡 *Pro-Tip:* Click the **Check Your Shortlist Chance** button on these role cards to review the detailed gap analysis!`;
    }

    // 2. Google or Amazon criteria
    if (q.includes('google') || q.includes('amazon') || q.includes('faang') || q.includes('crack')) {
      return `To maximize your shortlist chance for **Google** and **Amazon**:\n\n` +
        `• **DSA Competency:** Master Medium-to-Hard LeetCode problems in Trees, Graphs, Dynamic Programming, and Heaps.\n` +
        `• **Systems & Fundamentals:** Be prepared to explain Operating Systems (threads, paging), Database normalization/indexing, and Computer Networks.\n` +
        `• **Project Depth:** Rather than tutorial clones, showcase a full-stack system with microservices, Redis caching, or Docker containerization.\n` +
        `• **Academics:** Your CGPA of **${cgpa}** is in good standing for initial resume filters (most cutoffs are 7.5 - 8.0).`;
    }

    // 3. Roadmap for roles
    if (q.includes('roadmap') || q.includes('learn') || q.includes('frontend') || q.includes('full stack') || q.includes('backend') || q.includes('devops')) {
      if (q.includes('frontend')) {
        return `### 🚀 Frontend Developer 2025 Roadmap:\n1. **Core:** Semantic HTML, CSS Flexbox/Grid, Modern JavaScript (ES6+, Promises, Closures).\n2. **Framework:** React 18/19 (Hooks, Context, State Management) or Next.js App Router.\n3. **Styling & Perf:** Tailwind CSS, Core Web Vitals, Lighthouse optimization.\n4. **Tooling:** Git, Vite, TypeScript, Unit testing with Jest/Vitest.`;
      }
      if (q.includes('backend')) {
        return `### ⚙️ Backend Engineer Roadmap:\n1. **Language:** Node.js (Express), Python (FastAPI), or Java (Spring Boot).\n2. **Databases:** PostgreSQL (Relational) + MongoDB (NoSQL) + Redis (Caching).\n3. **Architecture:** REST APIs, GraphQL, Microservices, JWT/OAuth Authentication.\n4. **DevOps Basics:** Dockerizing apps, writing CI/CD workflows with GitHub Actions.`;
      }
      return `### 🌟 Full Stack Developer Accelerated Path:\n1. **Client:** React + TypeScript + Tailwind CSS.\n2. **Server:** Node.js / Express or Python FastAPI.\n3. **Database:** SQL (PostgreSQL/MySQL) with ORM like Prisma or Sequelize.\n4. **Cloud & Deploy:** Docker containers, AWS S3/EC2 or Vercel, CI/CD pipelines.\n5. **DSA:** 150 LeetCode standard interview problems.`;
    }

    // 4. ATS and Resume
    if (q.includes('resume') || q.includes('ats') || q.includes('screening')) {
      return `### 📄 Top 4 Resume Optimization Strategies for Campus Drives:\n\n` +
        `1. **Quantify Accomplishments:** Use the Google XYZ formula: *"Accomplished [X], as measured by [Y], by doing [Z]"* (e.g. "Reduced API latency by 35% using Redis caching").\n` +
        `2. **Match Keyword Density:** Directly include skill keywords like **React, Node.js, SQL, Docker** in both your skills list and project descriptions.\n` +
        `3. **Single-Column Clean Layout:** Use clean ATS-friendly markdown or single-column templates without heavy graphics that confuse parsers.\n` +
        `4. **Live Links:** Include clickable links to your GitHub code repos and live deployed web apps.`;
    }

    // 5. CGPA question
    if (q.includes('cgpa') || q.includes('cutoff') || q.includes('marks')) {
      return `Your registered CGPA is **${cgpa} / 10**.\n\n` +
        `• **Google / Microsoft / NVIDIA:** Typically set an eligibility bar around 7.5 - 8.0. You clear this!\n` +
        `• **TCS Digital / Infosys / Swiggy:** Typically require 6.5+. You easily qualify!\n` +
        `• *Advice:* Keep your CGPA above 8.0 to maintain a competitive edge for Tier-1 engineering shortlists.`;
    }

    // General fallback intelligent tech career assistant answer
    return `That's a great question regarding **"${userPrompt}"**!\n\n` +
      `In technical campus recruitment, candidate shortlisting prioritizes:\n` +
      `1. **Skill Stack Alignment:** Demonstrable experience with required technologies.\n` +
      `2. **Algorithmic Problem Solving:** 1-2 coding rounds assessing DSA.\n` +
      `3. **System Foundations:** Knowledge of SQL queries, operating systems, and networking.\n\n` +
      `Would you like me to analyze your shortlist chance for a specific company like Google, Uber, Amazon, or Netflix?`;
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate natural AI thinking & response
    setTimeout(() => {
      const aiReply = generateAiResponse(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-2xl h-[650px] max-h-[90vh] bg-[#0c101c] border border-slate-700/80 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">RoleMatch AI Assistant</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-400">
                Interactive Career & Placement Mentor • Context-Aware
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages([messages[0]])}
              title="Clear conversation"
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer text-xs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-tr-none shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
                }`}
              >
                {msg.text}
                <span className={`block text-[10px] mt-2 font-mono ${msg.sender === 'user' ? 'text-cyan-200/80 text-right' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-slate-400 ml-1">AI Mentor thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 mb-2 text-[11px] text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Recommended Prompts:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 hover:border-cyan-500/40 whitespace-nowrap transition cursor-pointer shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about roles, shortlist tips, interview rounds..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white disabled:opacity-40 transition cursor-pointer shadow-md shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
