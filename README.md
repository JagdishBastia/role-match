# 🚀 Role Match (रोल मैच) - Next-Gen AI Campus Recruitment & Shortlist Engine

A modern, high-performance recruitment platform designed specifically as an impressive minor project. Built using **HTML5, CSS3, JavaScript, React 19, Three.js, and simulated MySQL (Client Relational Engine)** with **Zero Backend** and **Zero External Paid APIs required** (100% offline and standalone).

---

## ✨ Key Features & Architecture

### 1. 🌌 3D Interactive Moving Landing Page
- Real **Three.js WebGL 3D Canvas** featuring rotating geometric polyhedrons, orbital rings, and dynamic mouse-interactive star constellations.
- **Strictly No Sign In / Sign Up clutter** as requested.
- Centered brand title: **Role Match (रोल मैच)**.
- Single glowing high-tech action button: **"Let's Get Started" (लेट्स गेट स्टार्टेड)**.

### 2. 🎓 Student Profile Calibration & Onboarding
- Comprehensive form collecting:
  - **Full Name (पूरा नाम)**
  - **College Name (कॉलेज का नाम)**
  - **Academic Year (कौन सा ईयर)**: 1st, 2nd, 3rd, 4th/Final Year, Graduate
  - **Branch / Stream (कौन सा ब्रांच)**: CSE, IT, AI & Data Science, ECE, etc.
  - **Cumulative CGPA / 10**
  - **Target Domain Preference**: Frontend, Backend, Full Stack, SDE, DevOps, AI/ML, etc.
  - **Interactive Technical Skill Picker**: Multi-tag selection + custom skill adder
  - **GitHub, LinkedIn & Portfolio URL links**
  - **Live Dynamic Profile Strength Meter (0% to 100%)**
  - **"Autofill Demo Profile" button** for 1-click test evaluations.

### 3. 🏢 Extensive Technical Job Roles with Companies
- 18+ curated technical openings across global tech giants:
  - **Google** - Frontend Developer
  - **Uber** - Backend Engineer
  - **Microsoft** - Full Stack Developer
  - **Amazon** - Software Development Engineer I (SDE-1)
  - **Netflix** - DevOps & Cloud Engineer
  - **NVIDIA** - AI / Machine Learning Engineer
  - **Atlassian** - Software Developer (Core Platform)
  - **Stripe** - Site Reliability Engineer (SRE)
  - **Adobe** - Cloud Infrastructure Developer
  - **Razorpay** - Data Scientist & Analytics Engineer
  - **Cisco** - Cybersecurity Analyst
  - **Zomato** - Mobile App Developer (React Native / Flutter)
  - **Swiggy** - QA Automation & SDET Engineer
  - **Oracle** - Systems Software Developer
  - **TCS Digital** - Digital Specialist Engineer
  - **Infosys** - Specialist Programmer (Power Programmer)
  - **Flipkart** - Platform & Distributed Systems Engineer
  - **Meta** - Frontend UI/UX Systems Engineer
- Each card highlights the **Company Name & Logo**, Location, CTC/Salary package, Minimum CGPA criteria, and required vs matched skills.

### 4. ⚡ "Check Your Shortlist Chance" (AI Match Engine)
- Dedicated option on every job opening card.
- Calculates dynamic **Shortlist Probability Percentage** based on:
  - Skills Match Ratio (Matched vs Missing skills with color indicators)
  - Academic & CGPA Cutoff Clearance
  - Branch & Year Alignment
  - Bonus for active GitHub/Portfolio presence
- Shows **Actionable AI Feedback**: What to improve to push score above 95%+.
- **One-Click Instant Application** with celebratory confetti animation (`canvas-confetti`).

### 5. 🤖 Context-Aware AI Placement Mentor Chatbot
- Sticky interactive chatbot accessible anytime from the top bar.
- Aware of the student's personal details (Name, College, Branch, CGPA, Skills).
- Answers technical recruitment questions, FAANG prep tips, roadmaps (Frontend, Backend, DevOps, AI), resume ATS scoring, and interview advice.
- Built-in quick prompt pills for instant answers.
- Simulated typing latency for ultra-realistic AI assistant experience.

### 6. 🗄️ MySQL Database Studio (Client Relational Layer)
- Solves the requirement for **MySQL in a minor project without needing backend servers**.
- Shows:
  - **Relational Tables**: `students`, `roles`, `applications`.
  - **Live SQL Transaction Log**: Shows real-time executed `SELECT`, `INSERT`, `UPDATE` queries.
  - **DDL Schemas**: Full relational schema with foreign keys and data types.
  - Persistent state in browser `localStorage`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (ES6+), HTML5, CSS3
- **3D Graphics**: Three.js (WebGL Canvas)
- **Styling**: Tailwind CSS v4, Glassmorphism, Dark Cyberpunk Luxury Theme
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Database**: Simulated Client MySQL Relational Engine (`localStorage`)
- **Build Tool**: Vite 8

---

## 🚀 How to Run Locally

1. Navigate to the project folder:
   ```bash
   cd C:\Users\Jagdish\.gemini\antigravity\scratch\role-match
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:5173
   ```
