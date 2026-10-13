/**
 * Assignment 3 — Conditional Logic
 * 
 * Demonstrates:
 * - Numerical score validation with if...else
 * - Letter grade evaluation using a switch statement
 * - Pass/Fail status determination with a ternary operator
 * - Strict boundary checking for scores between 0 and 100
 */

function evaluateScore(rawScore, logger = console.log) {
  // 1. Validation with if...else
  if (rawScore === null || rawScore === undefined || (typeof rawScore === "string" && rawScore.trim() === "")) {
    throw new Error("Invalid Input: Score cannot be empty.");
  }

  const score = Number(rawScore);

  if (Number.isNaN(score)) {
    throw new Error("Invalid Input: Score must be a numerical value.");
  }

  if (score < 0 || score > 100) {
    throw new Error("Invalid Input: Score must be within the range 0 to 100.");
  }

  // 2. Letter grade determination using switch statement
  let grade;
  const scoreBucket = Math.floor(score / 10);

  switch (scoreBucket) {
    case 10:
    case 9:
      grade = "A";
      break;
    case 8:
      grade = "B";
      break;
    case 7:
      grade = "C";
      break;
    case 6:
      grade = "D";
      break;
    default:
      grade = "F";
      break;
  }

  // 3. Pass / Fail status determination using ternary operator
  const status = score >= 60 ? "Passed" : "Failed";

  // 4. Formatted output matching specification
  logger(`Score: ${score}`);
  logger(`Grade: ${grade}`);
  logger(`Status: ${status}`);

  return {
    score,
    grade,
    status
  };
}

function runAssignment3(demoScore = 85, logger = console.log) {
  return evaluateScore(demoScore, logger);
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runAssignment3(85);
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = { evaluateScore, runAssignment3 };
}
if (typeof window !== "undefined") {
  window.evaluateScore = evaluateScore;
  window.runAssignment3 = runAssignment3;
}
