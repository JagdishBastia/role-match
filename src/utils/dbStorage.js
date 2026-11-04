/**
 * Simulated MySQL Client-Side Relational Database Layer
 * Stores relational schemas and execution logs in localStorage
 */

import { TECH_ROLES } from '../data/rolesData';

const STORAGE_KEYS = {
  STUDENT: 'rolematch_sql_student',
  APPLICATIONS: 'rolematch_sql_applications',
  SQL_LOGS: 'rolematch_sql_query_logs',
  ROLES: 'rolematch_sql_roles'
};

const DEFAULT_STUDENT = {
  id: 'STU-101',
  fullName: 'Jagdish Sharma',
  collegeName: 'National Institute of Technology (NIT)',
  year: '4th Year / Final Year',
  branch: 'Computer Science & Engineering',
  cgpa: '8.65',
  skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL', 'Data Structures', 'Git', 'REST API', 'Docker'],
  preferredDomain: 'Full Stack',
  githubUrl: 'https://github.com/developer-jagdish',
  linkedinUrl: 'https://linkedin.com/in/jagdish-dev',
  portfolioUrl: 'https://jagdishportfolio.dev',
  bio: 'Passionate developer interested in building distributed scalable web applications and AI integrated tools.',
  createdAt: new Date().toISOString()
};

function logSqlQuery(query, table, type) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.SQL_LOGS) || '[]');
    const newLog = {
      id: 'query_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toLocaleTimeString(),
      query,
      table,
      type, // 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE'
      durationMs: (Math.random() * 4 + 0.5).toFixed(2)
    };
    const updated = [newLog, ...existing].slice(0, 50); // keep last 50 queries
    localStorage.setItem(STORAGE_KEYS.SQL_LOGS, JSON.stringify(updated));
  } catch (err) {
    console.warn('SQL log err:', err);
  }
}

export function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.STUDENT)) {
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(DEFAULT_STUDENT));
    logSqlQuery(
      `INSERT INTO students (id, full_name, college_name, year, branch, cgpa, skills) VALUES ('STU-101', '${DEFAULT_STUDENT.fullName}', '${DEFAULT_STUDENT.collegeName}', '${DEFAULT_STUDENT.year}', '${DEFAULT_STUDENT.branch}', ${DEFAULT_STUDENT.cgpa}, '${DEFAULT_STUDENT.skills.join(',')}');`,
      'students',
      'INSERT'
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.ROLES)) {
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(TECH_ROLES));
    logSqlQuery(
      `SELECT COUNT(*) FROM roles; -- Loaded ${TECH_ROLES.length} relational job tuples`,
      'roles',
      'SELECT'
    );
  }

  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    // Seed initial application
    const seedApps = [
      {
        id: 'APP-901',
        studentId: 'STU-101',
        roleId: 'role-1',
        roleTitle: 'Frontend Developer',
        company: 'Google',
        shortlistChance: 92,
        status: 'Shortlisted for Online Assessment',
        appliedAt: new Date(Date.now() - 86400000 * 2).toLocaleDateString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(seedApps));
    logSqlQuery(
      `INSERT INTO applications (id, student_id, role_id, shortlist_chance, status) VALUES ('APP-901', 'STU-101', 'role-1', 92, 'Shortlisted');`,
      'applications',
      'INSERT'
    );
  }
}

export function getStudent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENT);
    logSqlQuery(
      `SELECT * FROM students WHERE id = 'STU-101' LIMIT 1;`,
      'students',
      'SELECT'
    );
    return raw ? JSON.parse(raw) : DEFAULT_STUDENT;
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function saveStudent(studentData) {
  try {
    const updated = { ...studentData, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(updated));
    logSqlQuery(
      `UPDATE students SET full_name = '${updated.fullName}', college_name = '${updated.collegeName}', year = '${updated.year}', branch = '${updated.branch}', cgpa = ${updated.cgpa}, skills = '${(updated.skills || []).join(',')}' WHERE id = '${updated.id || 'STU-101'}';`,
      'students',
      'UPDATE'
    );
    return updated;
  } catch (err) {
    console.error('Error saving student to simulated MySQL:', err);
    return studentData;
  }
}

export function getApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    logSqlQuery(
      `SELECT a.id, a.role_id, r.title, r.company, a.shortlist_chance, a.status FROM applications a JOIN roles r ON a.role_id = r.id;`,
      'applications',
      'SELECT'
    );
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function applyForRole(student, role, shortlistChance) {
  try {
    const apps = getApplications();
    const existing = apps.find(a => a.roleId === role.id);
    if (existing) {
      return { success: false, message: 'You have already submitted an application for this role!' };
    }

    const newApp = {
      id: 'APP-' + Math.floor(100 + Math.random() * 900),
      studentId: student.id || 'STU-101',
      roleId: role.id,
      roleTitle: role.title,
      company: role.company,
      shortlistChance: shortlistChance || 80,
      status: shortlistChance >= 75 ? 'Shortlisted for Round 1' : 'Application Under Review',
      appliedAt: new Date().toLocaleDateString()
    };

    const updated = [newApp, ...apps];
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    logSqlQuery(
      `INSERT INTO applications (id, student_id, role_id, shortlist_chance, status, applied_at) VALUES ('${newApp.id}', '${newApp.studentId}', '${role.id}', ${newApp.shortlistChance}, '${newApp.status}', NOW());`,
      'applications',
      'INSERT'
    );
    return { success: true, application: newApp };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

export function getSqlLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SQL_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearSqlLogs() {
  localStorage.setItem(STORAGE_KEYS.SQL_LOGS, JSON.stringify([]));
}
