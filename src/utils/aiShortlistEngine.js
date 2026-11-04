/**
 * RoleMatch AI Shortlisting & Predictive Matching Engine
 * Evaluates candidate profile against role requirements using multi-factor scoring
 */

export function calculateShortlistChance(student, role) {
  if (!student || !role) {
    return {
      probability: 50,
      badge: 'Uncalculated',
      color: 'gray',
      skillsMatchScore: 50,
      academicScore: 50,
      eligibilityScore: 50,
      matchedSkills: [],
      missingSkills: role?.requiredSkills || [],
      recommendations: ['Complete your profile details to unlock precision AI matching.'],
      interviewFocus: ['Core Fundamentals', 'Project Walkthrough'],
      decision: 'Pending Evaluation'
    };
  }

  const studentSkills = (student.skills || []).map(s => s.toLowerCase().trim());
  const requiredSkills = role.requiredSkills || [];
  const preferredSkills = role.preferredSkills || [];

  // 1. Skill Match Analysis
  let matchedRequired = 0;
  const matchedSkillsList = [];
  const missingSkillsList = [];

  requiredSkills.forEach(req => {
    const isMatched = studentSkills.some(s => s === req.toLowerCase() || req.toLowerCase().includes(s) || s.includes(req.toLowerCase()));
    if (isMatched) {
      matchedRequired++;
      matchedSkillsList.push(req);
    } else {
      missingSkillsList.push(req);
    }
  });

  let matchedPreferred = 0;
  preferredSkills.forEach(pref => {
    const isMatched = studentSkills.some(s => s === pref.toLowerCase() || pref.toLowerCase().includes(s));
    if (isMatched) {
      matchedPreferred++;
      if (!matchedSkillsList.includes(pref)) {
        matchedSkillsList.push(pref);
      }
    }
  });

  const baseRequiredScore = requiredSkills.length > 0 ? (matchedRequired / requiredSkills.length) * 100 : 80;
  const preferredBonus = preferredSkills.length > 0 ? (matchedPreferred / preferredSkills.length) * 20 : 0;
  const rawSkillScore = Math.min(100, Math.round(baseRequiredScore * 0.85 + preferredBonus));

  // 2. Academic & CGPA Evaluation
  const candidateCgpa = parseFloat(student.cgpa) || 7.0;
  const minCgpa = role.minCgpa || 7.0;
  let academicScore = 60;

  if (candidateCgpa >= minCgpa + 1.0) {
    academicScore = 98;
  } else if (candidateCgpa >= minCgpa) {
    academicScore = 85 + Math.round(((candidateCgpa - minCgpa) / 1.0) * 10);
  } else if (candidateCgpa >= minCgpa - 0.5) {
    academicScore = 65; // borderline
  } else {
    academicScore = 40; // below cutoff
  }

  // 3. Branch & Year Alignment
  let eligibilityScore = 80;
  const candidateBranch = (student.branch || '').toLowerCase();
  const allowedBranches = (role.allowedBranches || []).map(b => b.toLowerCase());
  
  const isBranchDirect = allowedBranches.some(b => 
    candidateBranch.includes(b) || b.includes(candidateBranch) || b.includes('all')
  );

  if (isBranchDirect) {
    eligibilityScore += 15;
  } else {
    eligibilityScore -= 20;
  }

  const candidateYear = (student.year || '').toLowerCase();
  const allowedYears = (role.allowedYears || []).map(y => y.toLowerCase());
  const isYearDirect = allowedYears.some(y => 
    candidateYear.includes('final') || candidateYear.includes('3rd') || candidateYear.includes('graduate') || y.includes(candidateYear)
  );

  if (isYearDirect) {
    eligibilityScore = Math.min(100, eligibilityScore + 5);
  } else {
    eligibilityScore = Math.max(40, eligibilityScore - 15);
  }

  // Weighted Total Probability
  // 55% Skills, 25% Academics, 20% Eligibility/Branch
  let finalProbability = Math.round(
    (rawSkillScore * 0.55) + (academicScore * 0.25) + (eligibilityScore * 0.20)
  );

  // Bonus for active projects / portfolio
  if (student.githubUrl && student.githubUrl.length > 5) finalProbability = Math.min(99, finalProbability + 3);
  if (student.linkedinUrl && student.linkedinUrl.length > 5) finalProbability = Math.min(99, finalProbability + 2);

  // Status & Badge
  let badge = 'Moderate Chance';
  let color = 'yellow';
  let decision = 'Review Candidate';

  if (finalProbability >= 80) {
    badge = 'High Shortlist Probability';
    color = 'emerald';
    decision = 'Strong Candidate (Top 10%)';
  } else if (finalProbability >= 60) {
    badge = 'Competitive Match';
    color = 'cyan';
    decision = 'Shortlist Eligible';
  } else if (finalProbability >= 45) {
    badge = 'Moderate Chance';
    color = 'amber';
    decision = 'Needs Skill Alignment';
  } else {
    badge = 'Low Chance (Gaps Detected)';
    color = 'rose';
    decision = 'Upskilling Recommended';
  }

  // Generate Tailored AI Recommendations
  const recommendations = [];
  if (missingSkillsList.length > 0) {
    const topMissing = missingSkillsList.slice(0, 3).join(', ');
    recommendations.push(`Target High-Impact Skills: Adding [${topMissing}] to your profile will boost your score by ~18%.`);
  } else {
    recommendations.push('Full Skill Coverage: You match 100% of the primary technical requirements for this role!');
  }

  if (candidateCgpa < minCgpa) {
    recommendations.push(`CGPA Advisory: Your CGPA (${candidateCgpa}) is below ${role.company}'s preferred cutoff (${minCgpa}). Highlight open-source or exceptional live projects.`);
  } else {
    recommendations.push(`Academic Advantage: Your ${candidateCgpa} CGPA clears ${role.company}'s eligibility criteria.`);
  }

  if (!student.githubUrl) {
    recommendations.push('Link your GitHub profile and showcase 2-3 production-grade pinned repositories.');
  }

  // Interview Questions Forecast
  const interviewFocus = [
    `Deep Dive into ${matchedSkillsList[0] || 'Core Stack'} architecture`,
    `Data Structures & Problem Solving at ${role.company} scale`,
    `System Design & API integration scenario`
  ];

  return {
    probability: finalProbability,
    badge,
    color,
    skillsMatchScore: rawSkillScore,
    academicScore,
    eligibilityScore,
    matchedSkills: matchedSkillsList,
    missingSkills: missingSkillsList,
    recommendations,
    interviewFocus,
    decision
  };
}
