/**
 * Assignment 1 — Variables, Data Types, and Console Operations
 * 
 * Demonstrates:
 * - Variable declarations with var, let, and const
 * - Primitive vs. Reference (Array/Object) data types
 * - typeof operator inspection
 * - Distinguishing arrays from other objects via Array.isArray()
 */

function runAssignment1(logger = console.log) {
  // 1. Variable declarations using var, let, and const
  var userName = "Alice";
  let userAge = 25;
  const isEmployed = true;
  const userSkills = ["HTML", "CSS", "JavaScript"];

  // 2. Data type inspection using typeof
  const nameType = typeof userName;
  const ageType = typeof userAge;
  const employmentType = typeof isEmployed;
  const skillsType = typeof userSkills;

  // 3. Formatted outputs matching exact specification
  logger(`Name: ${userName} (Type: ${nameType})`);
  logger(`Age: ${userAge} (Type: ${ageType})`);
  logger(`IsEmployed: ${isEmployed} (Type: ${employmentType})`);
  logger(`Skills: ${JSON.stringify(userSkills)} (Type: ${skillsType})`);

  // 4. Demonstration of distinction between primitives and arrays
  const isSkillsAnArray = Array.isArray(userSkills);
  const isAgeAnArray = Array.isArray(userAge);

  // Return data object for automated assertions and UI binding
  return {
    userName,
    userAge,
    isEmployed,
    userSkills,
    types: {
      nameType,
      ageType,
      employmentType,
      skillsType
    },
    arrayCheck: {
      isSkillsAnArray,
      isAgeAnArray
    }
  };
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runAssignment1();
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = { runAssignment1 };
}
if (typeof window !== "undefined") {
  window.runAssignment1 = runAssignment1;
}
