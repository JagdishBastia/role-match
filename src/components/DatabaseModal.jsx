import React, { useState } from 'react';
import { 
  Database, Table, Terminal, Play, X, RefreshCw, CheckCircle2, 
  Trash2, ShieldCheck, Download, Layers
} from 'lucide-react';
import { getSqlLogs, clearSqlLogs, getApplications, getStudent } from '../utils/dbStorage';
import { TECH_ROLES } from '../data/rolesData';

export default function DatabaseModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('tables'); // 'tables' | 'query_log' | 'schema'
  const [selectedTable, setSelectedTable] = useState('students');
  const [customSql, setCustomSql] = useState('SELECT * FROM students LIMIT 5;');
  const [queryResult, setQueryResult] = useState(null);

  const student = getStudent();
  const applications = getApplications();
  const sqlLogs = getSqlLogs();

  const handleRunQuery = () => {
    const q = customSql.trim().toLowerCase();
    let result = [];
    if (q.includes('student')) {
      result = [student];
    } else if (q.includes('application')) {
      result = applications;
    } else if (q.includes('role')) {
      result = TECH_ROLES.slice(0, 8);
    } else {
      result = [{ message: 'Query executed successfully. 0 rows affected.' }];
    }
    setQueryResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-4xl h-[700px] max-h-[92vh] bg-[#090d16] border border-slate-700 rounded-3xl shadow-[0_0_80px_rgba(59,130,246,0.2)] flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">RoleMatch MySQL Studio (Client Engine)</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CONNECTED • v8.0.35
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Relational schema & transaction simulation for college minor project evaluation.
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

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 pt-3 bg-slate-950/60 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'tables'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Relational Tables</span>
          </button>

          <button
            onClick={() => setActiveTab('query_log')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'query_log'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Live SQL Transaction Log ({sqlLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition cursor-pointer ${
              activeTab === 'schema'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Database Schema (DDL)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'tables' && (
            <div className="space-y-6">
              {/* Table Selector Pills */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Select Table:</span>
                {['students', 'applications', 'roles'].map(tbl => (
                  <button
                    key={tbl}
                    onClick={() => { setSelectedTable(tbl); setQueryResult(null); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                      selectedTable === tbl
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {tbl} ({tbl === 'students' ? 1 : tbl === 'applications' ? applications.length : TECH_ROLES.length})
                  </button>
                ))}
              </div>

              {/* Table View */}
              {selectedTable === 'students' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900/90 text-cyan-300 border-b border-slate-800">
                      <tr>
                        <th className="p-3">id</th>
                        <th className="p-3">full_name</th>
                        <th className="p-3">college_name</th>
                        <th className="p-3">branch</th>
                        <th className="p-3">year</th>
                        <th className="p-3">cgpa</th>
                        <th className="p-3">skills</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="p-3 text-cyan-400 font-bold">{student?.id || 'STU-101'}</td>
                        <td className="p-3 font-sans font-semibold text-white">{student?.fullName}</td>
                        <td className="p-3">{student?.collegeName}</td>
                        <td className="p-3">{student?.branch}</td>
                        <td className="p-3">{student?.year}</td>
                        <td className="p-3 text-emerald-400 font-bold">{student?.cgpa}</td>
                        <td className="p-3 text-slate-400 max-w-xs truncate">{(student?.skills || []).join(', ')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {selectedTable === 'applications' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900/90 text-cyan-300 border-b border-slate-800">
                      <tr>
                        <th className="p-3">id</th>
                        <th className="p-3">student_id</th>
                        <th className="p-3">role_title</th>
                        <th className="p-3">company</th>
                        <th className="p-3">shortlist_chance</th>
                        <th className="p-3">status</th>
                        <th className="p-3">applied_at</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {applications.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-6 text-center text-slate-500 italic">
                            No applications submitted yet. Click "Check Your Shortlist Chance" & submit on any role!
                          </td>
                        </tr>
                      ) : (
                        applications.map(app => (
                          <tr key={app.id}>
                            <td className="p-3 text-cyan-400 font-bold">{app.id}</td>
                            <td className="p-3">{app.studentId}</td>
                            <td className="p-3 font-sans text-white">{app.roleTitle}</td>
                            <td className="p-3 text-indigo-400 font-bold">{app.company}</td>
                            <td className="p-3 text-emerald-400 font-bold">{app.shortlistChance}%</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                {app.status}
                              </span>
                            </td>
                            <td className="p-3 text-slate-400">{app.appliedAt}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedTable === 'roles' && (
                <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70 max-h-96">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900/90 text-cyan-300 border-b border-slate-800 sticky top-0">
                      <tr>
                        <th className="p-3">id</th>
                        <th className="p-3">company</th>
                        <th className="p-3">title</th>
                        <th className="p-3">category</th>
                        <th className="p-3">min_cgpa</th>
                        <th className="p-3">salary</th>
                        <th className="p-3">location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {TECH_ROLES.map(r => (
                        <tr key={r.id}>
                          <td className="p-3 text-cyan-400">{r.id}</td>
                          <td className="p-3 font-bold text-white">{r.company}</td>
                          <td className="p-3 font-sans">{r.title}</td>
                          <td className="p-3">{r.category}</td>
                          <td className="p-3 text-emerald-400">{r.minCgpa}</td>
                          <td className="p-3">{r.salary}</td>
                          <td className="p-3 text-slate-400">{r.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'query_log' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Real-time MySQL queries logged during UI actions:
                </span>
                <button
                  onClick={clearSqlLogs}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-xs text-slate-400 hover:text-white border border-slate-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Logs</span>
                </button>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {sqlLogs.map(log => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.type === 'SELECT' ? 'bg-cyan-500/20 text-cyan-300' :
                          log.type === 'INSERT' ? 'bg-emerald-500/20 text-emerald-300' :
                          log.type === 'UPDATE' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-indigo-500/20 text-indigo-300'
                        }`}>
                          {log.type}
                        </span>
                        <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                        <span className="text-slate-500 text-[11px]">({log.durationMs}ms)</span>
                      </div>
                      <code className="text-slate-200 block text-[11px] break-all">
                        {log.query}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-200 space-y-4">
              <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
{`-- Role Match Relational Database Schema (MySQL 8.0)
CREATE DATABASE IF NOT EXISTS role_match_db;
USE role_match_db;

-- 1. Students Table
CREATE TABLE students (
  id VARCHAR(32) PRIMARY KEY,
  full_name VARCHAR(128) NOT NULL,
  college_name VARCHAR(256) NOT NULL,
  year VARCHAR(64) NOT NULL,
  branch VARCHAR(128) NOT NULL,
  cgpa DECIMAL(4, 2) NOT NULL,
  skills TEXT NOT NULL,
  preferred_domain VARCHAR(64),
  github_url VARCHAR(256),
  linkedin_url VARCHAR(256),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Roles Table
CREATE TABLE roles (
  id VARCHAR(32) PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  company VARCHAR(128) NOT NULL,
  category VARCHAR(64) NOT NULL,
  min_cgpa DECIMAL(4, 2) DEFAULT 7.00,
  salary VARCHAR(64) NOT NULL,
  location VARCHAR(128) NOT NULL,
  required_skills JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Applications Table
CREATE TABLE applications (
  id VARCHAR(32) PRIMARY KEY,
  student_id VARCHAR(32) NOT NULL,
  role_id VARCHAR(32) NOT NULL,
  shortlist_chance INT NOT NULL,
  status VARCHAR(64) DEFAULT 'Under Review',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
