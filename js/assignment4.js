/**
 * Assignment 4 — Loop Control Structures
 * 
 * Demonstrates:
 * - for loop: generating multiplication table of 5 from 1 to 5
 * - while loop with break: finding the first integer > 10 divisible by 6
 * - do...while loop with continue: skipping designated numbers while logging progress
 * - guaranteed termination conditions
 */

function runAssignment4(logger = console.log) {
  // 1. for loop: multiplication table of 5 from 1 through 5
  logger("--- Multiplication Table of 5 ---");
  const multiplicationResults = [];
  for (let i = 1; i <= 5; i++) {
    const result = 5 * i;
    multiplicationResults.push({ multiplier: i, result });
    logger(`5 x ${i} = ${result}`);
  }

  // 2. while loop with break: first integer > 10 divisible by 6
  logger("");
  logger("--- First number > 10 divisible by 6 ---");
  let currentNum = 11;
  let foundDivisible = null;

  while (true) {
    if (currentNum % 6 === 0) {
      foundDivisible = currentNum;
      logger(`Found: ${foundDivisible}`);
      break; // Exit loop immediately upon finding match
    }
    currentNum++;
    // Safety guard against infinite loops
    if (currentNum > 100) break;
  }

  // 3. do...while loop with continue: demonstrate skipping selected numbers (e.g., skip 3)
  logger("");
  logger("--- do...while Loop (Demonstrating continue) ---");
  let counter = 1;
  const loopLog = [];

  do {
    if (counter === 3) {
      logger(`Number ${counter}: Skipped (via continue)`);
      loopLog.push({ number: counter, status: "Skipped" });
      counter++;
      continue; // Skip rest of iteration
    }
    logger(`Number ${counter}: Processed`);
    loopLog.push({ number: counter, status: "Processed" });
    counter++;
  } while (counter <= 5);

  return {
    multiplicationResults,
    foundDivisible,
    loopLog
  };
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runAssignment4();
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = { runAssignment4 };
}
if (typeof window !== "undefined") {
  window.runAssignment4 = runAssignment4;
}
