/**
 * Assignment 5 — Functions and Scope
 * 
 * Demonstrates:
 * - Standard function declaration with default parameters
 * - Arrow function syntax with parameters
 * - Function scope vs. Block scope (let/const inside curly braces)
 * - Controlled handling of ReferenceError when accessing block-scoped variables outside their block
 */

// 1. Standard function with default parameter values
function calculateRectangleAreaStandard(width = 5, height = 4) {
  return width * height;
}

// 2. Arrow function for area calculation
const calculateRectangleAreaArrow = (width = 5, height = 4) => {
  return width * height;
};

// 3. Scope demonstration function
function demonstrateScope(logger = console.log) {
  // Function-scoped variable (accessible anywhere within this function)
  var functionScopedVar = "Accessible within function";

  // Block scope demonstration
  {
    const blockConst = "I am locked in this block";
    let blockVar = "I am also block scoped";
    // blockVar is accessible here
    const innerTest = `${blockConst} & ${blockVar}`;
  }

  // Attempting to access blockVar outside its enclosing block
  let errorCaught = null;
  try {
    // This will trigger a ReferenceError because blockVar is block-scoped
    /* eslint-disable no-undef */
    const testAccess = blockVar;
    /* eslint-enable no-undef */
  } catch (err) {
    errorCaught = err;
    logger(`Scope Test Error: ${err.name}: ${err.message}`);
  }

  return {
    functionScopedVar,
    errorCaught
  };
}

function runAssignment5(logger = console.log) {
  // Run Standard Function with defaults (5 x 4)
  const defaultArea = calculateRectangleAreaStandard();
  logger(`Standard Function Area (Default 5 x 4): ${defaultArea}`);

  // Run Arrow Function with custom arguments (10 x 3)
  const customArea = calculateRectangleAreaArrow(10, 3);
  logger(`Arrow Function Area (Custom 10 x 3): ${customArea}`);

  // Demonstrate scope behavior in a safe, controlled manner
  const scopeResult = demonstrateScope(logger);

  return {
    defaultArea,
    customArea,
    scopeResult
  };
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runAssignment5();
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    calculateRectangleAreaStandard,
    calculateRectangleAreaArrow,
    demonstrateScope,
    runAssignment5
  };
}
if (typeof window !== "undefined") {
  window.calculateRectangleAreaStandard = calculateRectangleAreaStandard;
  window.calculateRectangleAreaArrow = calculateRectangleAreaArrow;
  window.demonstrateScope = demonstrateScope;
  window.runAssignment5 = runAssignment5;
}
