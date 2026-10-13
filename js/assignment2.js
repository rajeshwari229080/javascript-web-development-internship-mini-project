/**
 * Assignment 2 — Operators, Expressions, and Input Handling
 * 
 * Demonstrates:
 * - Browser prompt() input capture with deterministic test fallback
 * - Explicit type conversion using Number()
 * - Comprehensive input validation (empty, NaN, negative, percentage limits)
 * - Arithmetic and compound assignment operators
 * - Clean currency and percentage formatting
 */

function formatCurrency(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "$0";
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function calculateTipAndTotal(rawBill, rawTipPercent, logger = console.log) {
  // 1. Validation for empty / null inputs
  if (rawBill === null || rawBill === undefined || (typeof rawBill === "string" && rawBill.trim() === "")) {
    throw new Error("Invalid Input: Bill amount cannot be empty.");
  }
  if (rawTipPercent === null || rawTipPercent === undefined || (typeof rawTipPercent === "string" && rawTipPercent.trim() === "")) {
    throw new Error("Invalid Input: Tip percentage cannot be empty.");
  }

  // 2. Explicit type conversion with Number()
  const billAmount = Number(rawBill);
  const tipPercentage = Number(rawTipPercent);

  // 3. Validation for NaN
  if (Number.isNaN(billAmount)) {
    throw new Error("Invalid Input: Bill amount must be a valid number.");
  }
  if (Number.isNaN(tipPercentage)) {
    throw new Error("Invalid Input: Tip percentage must be a valid number.");
  }

  // 4. Validation for negative and out-of-range inputs
  if (billAmount < 0) {
    throw new Error("Invalid Input: Bill amount cannot be negative.");
  }
  if (tipPercentage < 0 || tipPercentage > 100) {
    throw new Error("Invalid Input: Tip percentage must be between 0 and 100.");
  }

  // 5. Arithmetic calculations using operators
  const calculatedTip = (billAmount * tipPercentage) / 100;
  let totalAmount = billAmount;
  totalAmount += calculatedTip; // Compound assignment operator demonstration

  // 6. Formatted output matching specification
  logger(`Subtotal: ${formatCurrency(billAmount)}`);
  logger(`Tip Percentage: ${tipPercentage}%`);
  logger(`Calculated Tip: ${formatCurrency(calculatedTip)}`);
  logger(`Total Amount to Pay: ${formatCurrency(totalAmount)}`);

  return {
    billAmount,
    tipPercentage,
    calculatedTip,
    totalAmount
  };
}

function runAssignment2(customBill = 100, customTip = 15, logger = console.log) {
  let bill = customBill;
  let tip = customTip;

  // In a browser environment where window.prompt is available and custom values not specified
  if (typeof window !== "undefined" && typeof window.prompt === "function" && arguments.length === 0) {
    try {
      const promptedBill = window.prompt("Enter bill amount:", "100");
      const promptedTip = window.prompt("Enter tip percentage (0-100):", "15");
      bill = promptedBill;
      tip = promptedTip;
    } catch {
      // Fallback to default demo values if prompt fails or is canceled
      bill = 100;
      tip = 15;
    }
  }

  return calculateTipAndTotal(bill, tip, logger);
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runAssignment2();
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = { calculateTipAndTotal, runAssignment2, formatCurrency };
}
if (typeof window !== "undefined") {
  window.calculateTipAndTotal = calculateTipAndTotal;
  window.runAssignment2 = runAssignment2;
  window.formatCurrency = formatCurrency;
}
