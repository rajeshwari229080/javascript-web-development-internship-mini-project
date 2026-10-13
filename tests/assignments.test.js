const { describe, it } = require("node:test");
const assert = require("node:assert/strict");

// Import assignment modules
const { runAssignment1 } = require("../js/assignment1.js");
const { calculateTipAndTotal } = require("../js/assignment2.js");
const { evaluateScore } = require("../js/assignment3.js");
const { runAssignment4 } = require("../js/assignment4.js");
const {
  calculateRectangleAreaStandard,
  calculateRectangleAreaArrow,
  demonstrateScope,
  runAssignment5
} = require("../js/assignment5.js");
const { runAssignment6 } = require("../js/assignment6.js");
const {
  getProductCategory,
  validateProductInput,
  InventorySystem,
  runCapstone
} = require("../js/inventory.js");

// Dummy logger to silence output during unit test execution
const silentLogger = () => {};

describe("Assignment 1 — Variables, Data Types & Console Operations", () => {
  it("TC1: Should declare correct demonstration values and verify expected types", () => {
    const result = runAssignment1(silentLogger);

    assert.equal(result.userName, "Alice");
    assert.equal(result.userAge, 25);
    assert.equal(result.isEmployed, true);
    assert.deepEqual(result.userSkills, ["HTML", "CSS", "JavaScript"]);

    assert.equal(result.types.nameType, "string");
    assert.equal(result.types.ageType, "number");
    assert.equal(result.types.employmentType, "boolean");
    assert.equal(result.types.skillsType, "object");

    // Demonstrates distinction between primitive and array/object
    assert.equal(result.arrayCheck.isSkillsAnArray, true);
    assert.equal(result.arrayCheck.isAgeAnArray, false);
  });
});

describe("Assignment 2 — Operators, Expressions & Input Handling", () => {
  it("TC2: Should correctly compute $15 tip and $115 total for $100 bill with 15% tip", () => {
    const result = calculateTipAndTotal(100, 15, silentLogger);

    assert.equal(result.billAmount, 100);
    assert.equal(result.tipPercentage, 15);
    assert.equal(result.calculatedTip, 15);
    assert.equal(result.totalAmount, 115);
  });

  it("TC3: Should reject invalid, non-numeric, negative, and out-of-range inputs", () => {
    // Empty bill
    assert.throws(() => calculateTipAndTotal("", 15, silentLogger), /cannot be empty/);
    // Non-numeric bill
    assert.throws(() => calculateTipAndTotal("abc", 15, silentLogger), /must be a valid number/);
    // Negative bill
    assert.throws(() => calculateTipAndTotal(-50, 15, silentLogger), /cannot be negative/);
    // Negative tip percent
    assert.throws(() => calculateTipAndTotal(100, -5, silentLogger), /between 0 and 100/);
    // Out of range tip percent (> 100)
    assert.throws(() => calculateTipAndTotal(100, 120, silentLogger), /between 0 and 100/);
  });
});

describe("Assignment 3 — Conditional Logic", () => {
  it("TC4: Score of 85 should yield Grade B and Status Passed", () => {
    const result = evaluateScore(85, silentLogger);
    assert.equal(result.score, 85);
    assert.equal(result.grade, "B");
    assert.equal(result.status, "Passed");
  });

  it("TC5: Score of 40 should yield Grade F and Status Failed", () => {
    const result = evaluateScore(40, silentLogger);
    assert.equal(result.score, 40);
    assert.equal(result.grade, "F");
    assert.equal(result.status, "Failed");
  });

  it("TC6: Should reject scores outside the 0–100 range and invalid inputs", () => {
    assert.throws(() => evaluateScore(-1, silentLogger), /range 0 to 100/);
    assert.throws(() => evaluateScore(105, silentLogger), /range 0 to 100/);
    assert.throws(() => evaluateScore("not-a-number", silentLogger), /numerical value/);
    assert.throws(() => evaluateScore("", silentLogger), /cannot be empty/);
  });
});

describe("Assignment 4 — Loop Control Structures", () => {
  it("TC7: Should verify multiplication table of 5 and first integer > 10 divisible by 6 (12)", () => {
    const result = runAssignment4(silentLogger);

    assert.equal(result.multiplicationResults.length, 5);
    assert.deepEqual(
      result.multiplicationResults.map((r) => r.result),
      [5, 10, 15, 20, 25]
    );

    assert.equal(result.foundDivisible, 12);

    // Verify do...while skipped 3
    const skippedEntry = result.loopLog.find((entry) => entry.number === 3);
    assert.equal(skippedEntry.status, "Skipped");

    const processedEntries = result.loopLog.filter((entry) => entry.status === "Processed");
    assert.equal(processedEntries.length, 4);
  });
});

describe("Assignment 5 — Functions and Scope", () => {
  it("TC8: Standard and arrow area functions should calculate correct values", () => {
    // Default parameters (5 x 4)
    assert.equal(calculateRectangleAreaStandard(), 20);
    // Custom arguments (10 x 3)
    assert.equal(calculateRectangleAreaArrow(10, 3), 30);

    const fullRun = runAssignment5(silentLogger);
    assert.equal(fullRun.defaultArea, 20);
    assert.equal(fullRun.customArea, 30);
  });

  it("TC9: Accessing block-scoped variable outside block fails with controlled ReferenceError", () => {
    const scopeDemo = demonstrateScope(silentLogger);
    assert.ok(scopeDemo.errorCaught instanceof ReferenceError);
    assert.equal(scopeDemo.errorCaught.name, "ReferenceError");
  });
});

describe("Assignment 6 — Arrays, Objects & Array Methods", () => {
  it("TC10: forEach, filter (<$50), and map should process product collections correctly", () => {
    const result = runAssignment6(undefined, silentLogger);

    assert.equal(result.allProducts.length, 3);

    // filter items < $50 (Mouse $25, Keyboard $45)
    assert.equal(result.filteredProducts.length, 2);
    assert.deepEqual(result.filteredProducts, [
      { name: "Mouse", price: 25 },
      { name: "Keyboard", price: 45 }
    ]);

    // map uppercase tags
    assert.deepEqual(result.mappedProductTags, [
      "LAPTOP costs $800",
      "MOUSE costs $25",
      "KEYBOARD costs $45"
    ]);
  });
});

describe("Capstone — Interactive Inventory & Analytics Dashboard", () => {
  it("TC11: Valid Monitor input ($150) creates 3-item inventory with correct categories", () => {
    const system = new InventorySystem();
    const monitor = system.addProduct("Monitor", 150);

    assert.equal(system.inventory.length, 3);
    assert.equal(monitor.name, "Monitor");
    assert.equal(monitor.price, 150);
    assert.equal(monitor.category, "Standard");

    // Laptop = Premium, Mouse = Budget, Monitor = Standard
    assert.equal(system.inventory[0].category, "Premium");
    assert.equal(system.inventory[1].category, "Budget");
    assert.equal(system.inventory[2].category, "Standard");
  });

  it("TC12: Total inventory value must equal exactly $975 with Monitor", () => {
    const capstoneRun = runCapstone({ name: "Monitor", price: 150 }, silentLogger);
    assert.equal(capstoneRun.demoResults.totalProducts, 3);
    assert.equal(capstoneRun.demoResults.totalValue, 975);
    assert.deepEqual(capstoneRun.demoResults.affordableItems, ["Mouse", "Monitor"]);
    assert.deepEqual(capstoneRun.demoResults.formattedReport, [
      "LAPTOP: $800",
      "MOUSE: $25",
      "MONITOR: $150"
    ]);
  });

  it("TC13: Category boundaries (49.99, 50, 199.99, 200) must evaluate accurately", () => {
    assert.equal(getProductCategory(49.99), "Budget");
    assert.equal(getProductCategory(50), "Standard");
    assert.equal(getProductCategory(199.99), "Standard");
    assert.equal(getProductCategory(200), "Premium");
    assert.equal(getProductCategory(10), "Budget");
    assert.equal(getProductCategory(500), "Premium");
  });

  it("TC14: Empty and invalid inputs must be rejected and must not corrupt inventory data", () => {
    const system = new InventorySystem();
    const initialCount = system.inventory.length;

    assert.throws(() => system.addProduct("", 100), /cannot be blank/);
    assert.throws(() => system.addProduct("Headphones", ""), /cannot be empty/);
    assert.throws(() => system.addProduct("Headphones", -20), /greater than zero/);
    assert.throws(() => system.addProduct("Headphones", 0), /greater than zero/);
    assert.throws(() => system.addProduct("Headphones", "invalid-price"), /must be a valid number/);

    // Inventory must remain uncorrupted and intact
    assert.equal(system.inventory.length, initialCount);
  });

  it("TC15: Tax, discount calculations, and search with break/continue must be accurate", () => {
    const system = new InventorySystem();
    system.addProduct("Monitor", 150); // Total $975

    // Financials with 10% tax and 10% discount
    // Subtotal: 975. Discount (10%): 97.5. Discounted Subtotal: 877.5. Tax (10%): 87.75. Grand: 965.25
    const financials = system.calculateFinancials(10, 10);
    assert.equal(financials.subtotal, 975);
    assert.equal(financials.discountAmount, 97.5);
    assert.equal(financials.discountedSubtotal, 877.5);
    assert.equal(financials.taxAmount, 87.75);
    assert.equal(financials.grandTotal, 965.25);

    // Test loop search with break
    const foundLaptop = system.findProductByName("Laptop");
    assert.ok(foundLaptop);
    assert.equal(foundLaptop.price, 800);

    const nonExistent = system.findProductByName("NonExistentItem");
    assert.equal(nonExistent, null);

    // Test continue filter: items under $100
    const under100 = system.filterItemsWithContinue(100);
    assert.equal(under100.length, 1);
    assert.equal(under100[0].name, "Mouse");
  });
});
