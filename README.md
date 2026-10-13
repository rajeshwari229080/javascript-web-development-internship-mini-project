# JavaScript Core Concepts — Practical Assignments & Capstone Inventory Dashboard

A complete, execution-ready JavaScript educational and enterprise mini-project demonstrating core JavaScript concepts (ES6+) through practical assignments and an interactive Product Inventory & Analytics Dashboard.

Repository: [https://github.com/rajeshwari229080/javascript-web-development-internship-mini-project.git](https://github.com/rajeshwari229080/javascript-web-development-internship-mini-project.git)

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Directory Structure](#project-directory-structure)
4. [Execution Guide](#execution-guide)
   - [Running via Node.js CLI](#running-via-nodejs-cli)
   - [Running the Browser Interface](#running-the-browser-interface)
   - [Running Automated Tests](#running-automated-tests)
5. [Assignments Breakdown & Concepts](#assignments-breakdown--concepts)
   - [Assignment 1: Variables, Data Types & Console Operations](#assignment-1-variables-data-types--console-operations)
   - [Assignment 2: Operators, Expressions & Input Handling](#assignment-2-operators-expressions--input-handling)
   - [Assignment 3: Conditional Logic & Grading System](#assignment-3-conditional-logic--grading-system)
   - [Assignment 4: Loop Control Structures](#assignment-4-loop-control-structures)
   - [Assignment 5: Functions, Parameters & Scope](#assignment-5-functions-parameters--scope)
   - [Assignment 6: Arrays, Objects & High-Order Array Methods](#assignment-6-arrays-objects--high-order-array-methods)
   - [Capstone: Interactive Product Inventory & Analytics Dashboard](#capstone-interactive-product-inventory--analytics-dashboard)
6. [Input Validation Rules](#input-validation-rules)
7. [Browser vs. Node.js Environment Handling](#browser-vs-nodejs-environment-handling)
8. [License](#license)

---

## Project Overview

This project was built to demonstrate deep foundational JavaScript mechanics without third-party frameworks. It emphasizes:
- **Clean execution in dual environments**: Direct Node.js command-line support alongside an interactive browser dashboard.
- **Deterministic verification**: Node.js automated test runner verifying 15 mandatory test cases across all modules.
- **Robust error boundaries**: Safe handling of empty inputs, type mismatches, division by zero, and controlled block-scope `ReferenceError`s.

---

## Prerequisites

- **Node.js**: Version 18.x or later (Node 24+ recommended; uses built-in `node:test` and `node:assert`).
- **Web Browser**: Any modern browser (Google Chrome, Firefox, Microsoft Edge, Safari).
- **Git**: Configured with local credentials for repository tracking.

---

## Project Directory Structure

```text
javascript-web-development-internship-mini-project/
├── index.html                  # Interactive learning dashboard & Capstone UI
├── style.css                   # Custom responsive CSS design system (Dark mode)
├── package.json                # Project configuration & npm test scripts
├── .gitignore                  # Git ignore rules for node_modules and OS caches
├── js/
│   ├── assignment1.js          # Variables, Data Types, typeof, Primitives vs. Arrays
│   ├── assignment2.js          # Operators, explicit Number() conversion & Tip calculator
│   ├── assignment3.js          # if...else, switch statement grading & ternary operator
│   ├── assignment4.js          # for, while (with break), do...while (with continue)
│   ├── assignment5.js          # Standard/Arrow functions, defaults & Scope inspection
│   ├── assignment6.js          # Objects array, forEach(), filter(), map()
│   ├── inventory.js            # Capstone Inventory System & Financial Analytics
│   └── main.js                 # UI event handling, virtual console logger & reactivity
├── tests/
│   └── assignments.test.js     # Native Node.js automated unit test suite (15 test cases)
└── README.md                   # Full documentation & execution manual
```

---

## Execution Guide

### Running via Node.js CLI

Each assignment module is standalone and can be executed independently directly from your terminal:

```bash
# Assignment 1
node js/assignment1.js

# Assignment 2
node js/assignment2.js

# Assignment 3
node js/assignment3.js

# Assignment 4
node js/assignment4.js

# Assignment 5
node js/assignment5.js

# Assignment 6
node js/assignment6.js

# Capstone Mini-Project
node js/inventory.js
```

### Running the Browser Interface

To use the interactive dashboard:
1. Open `index.html` directly in any web browser:
   - On Windows: Double-click `index.html` or run `start index.html` in PowerShell.
   - Alternatively, serve via a lightweight HTTP server:
     ```bash
     npx serve .
     ```
2. Navigate between **Capstone Dashboard** and **Assignments 1–6** using the tab bar.
3. Test custom inputs, trigger browser `prompt()` dialogs, and inspect the real-time virtual console outputs.

### Running Automated Tests

Run the native Node.js automated test suite:

```bash
npm test
```

Or run directly:

```bash
node --test tests/assignments.test.js
```

Expected output:
```text
✔ Assignment 1 — Variables, Data Types & Console Operations
✔ Assignment 2 — Operators, Expressions & Input Handling
✔ Assignment 3 — Conditional Logic
✔ Assignment 4 — Loop Control Structures
✔ Assignment 5 — Functions and Scope
✔ Assignment 6 — Arrays, Objects & Array Methods
✔ Capstone — Interactive Inventory & Analytics Dashboard
ℹ tests 15
ℹ suites 7
ℹ pass 15
ℹ fail 0
```

---

## Assignments Breakdown & Concepts

### Assignment 1: Variables, Data Types & Console Operations
- **Concepts**: `var`, `let`, `const`, primitive types (`string`, `number`, `boolean`), reference types (`object`), `typeof` operator, `Array.isArray()`.
- **Expected Console Output**:
  ```text
  Name: Alice (Type: string)
  Age: 25 (Type: number)
  IsEmployed: true (Type: boolean)
  Skills: ["HTML","CSS","JavaScript"] (Type: object)
  ```

### Assignment 2: Operators, Expressions & Input Handling
- **Concepts**: Explicit type conversion with `Number()`, arithmetic operators (`*`, `/`, `+`), compound assignment (`+=`), string template formatting, input validation.
- **Expected Console Output** (Inputs: Bill = $100, Tip = 15%):
  ```text
  Subtotal: $100
  Tip Percentage: 15%
  Calculated Tip: $15
  Total Amount to Pay: $115
  ```

### Assignment 3: Conditional Logic & Grading System
- **Concepts**: `if...else` input bounds validation, `switch` case grading logic, ternary operator (`? :`).
- **Grading Scale**:
  - `A`: 90–100
  - `B`: 80–89
  - `C`: 70–79
  - `D`: 60–69
  - `F`: Below 60
  - Passing status: Score &ge; 60 is `Passed`; below 60 is `Failed`.
- **Expected Console Output** (Score = 85):
  ```text
  Score: 85
  Grade: B
  Status: Passed
  ```
- **Output for Score 40**: `Grade: F`, `Status: Failed`.

### Assignment 4: Loop Control Structures
- **Concepts**: `for` loops, `while` loops with `break`, `do...while` loops with `continue`, loop termination safety.
- **Expected Console Output**:
  ```text
  --- Multiplication Table of 5 ---
  5 x 1 = 5
  5 x 2 = 10
  5 x 3 = 15
  5 x 4 = 20
  5 x 5 = 25

  --- First number > 10 divisible by 6 ---
  Found: 12

  --- do...while Loop (Demonstrating continue) ---
  Number 1: Processed
  Number 2: Processed
  Number 3: Skipped (via continue)
  Number 4: Processed
  Number 5: Processed
  ```

### Assignment 5: Functions, Parameters & Scope
- **Concepts**: Standard function declarations, ES6 arrow functions, default parameter values, function scope (`var`), block scope (`let`, `const`), controlled `try...catch` handling for `ReferenceError`.
- **Expected Console Output**:
  ```text
  Standard Function Area (Default 5 x 4): 20
  Arrow Function Area (Custom 10 x 3): 30
  Scope Test Error: ReferenceError: blockVar is not defined
  ```

### Assignment 6: Arrays, Objects & High-Order Array Methods
- **Concepts**: Complex objects, `forEach()` iteration, `filter()` with predicate functions, `map()` transformations.
- **Expected Console Output**:
  ```text
  --- All Products (forEach) ---
  Item: Laptop - Price: $800
  Item: Mouse - Price: $25
  Item: Keyboard - Price: $45

  --- Filtered Products (Price < $50) ---
  [
    { "name": "Mouse", "price": 25 },
    { "name": "Keyboard", "price": 45 }
  ]

  --- Mapped Product Tags (map) ---
  [
    "LAPTOP costs $800",
    "MOUSE costs $25",
    "KEYBOARD costs $45"
  ]
  ```

### Capstone: Interactive Product Inventory & Analytics Dashboard
- **Initial Inventory**: Laptop ($800), Mouse ($25).
- **Demonstration Input**: Monitor ($150).
- **Category Thresholds**:
  - `Budget`: Price &lt; $50 (e.g., $49.99 &rarr; Budget)
  - `Standard`: $50 &le; Price &le; $199.99 (e.g., $50.00 & $199.99 &rarr; Standard)
  - `Premium`: Price &ge; $200 (e.g., $200.00 &rarr; Premium)
- **Analytics Computed**:
  - Total Products: `3`
  - Total Inventory Value via `reduce()`: **`$975`** (800 + 25 + 150)
  - Affordable Items via `filter()` (&lt; $200): `["Mouse", "Monitor"]`
  - Formatted Report via `map()`: `["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]`
- **Expected Console Output**:
  ```text
  --- Initializing Inventory System ---
  [Prompt executed: User adds "Monitor" at "$150"]

  --- Processing Inventory Roster (forEach) ---
  * Item: Laptop ($800) -> Category: Premium
  * Item: Mouse ($25) -> Category: Budget
  * Item: Monitor ($150) -> Category: Standard

  --- Financial Analytics ---
  Total Inventory Value: $975
  Filtered Affordable Items (Under $200): ["Mouse","Monitor"]
  Formatted Report List: ["LAPTOP: $800","MOUSE: $25","MONITOR: $150"]
  ```

---

## Input Validation Rules

| Field / Operation | Rules & Boundaries | Error Handling |
|---|---|---|
| **Bill Amount (A2)** | Must be a number &ge; 0; cannot be empty/whitespace | Throws `Error("Invalid Input: Bill amount...")` |
| **Tip Percentage (A2)** | Must be a number between 0 and 100 | Throws `Error("Invalid Input: Tip percentage must be between 0 and 100.")` |
| **Score (A3)** | Must be a number between 0 and 100 | Throws `Error("Invalid Input: Score must be within the range 0 to 100.")` |
| **Product Name (Capstone)** | Must be non-empty string | Throws `Error("Validation Error: Product name cannot be blank.")` |
| **Product Price (Capstone)** | Must be a valid number &gt; 0 | Throws `Error("Validation Error: Product price must be greater than zero.")` |
| **Tax / Discount Rates** | Must be between 0 and 100% | Throws `Error("Validation Error: Percentage must be between 0 and 100.")` |

---

## Browser vs. Node.js Environment Handling

Because `prompt()` and DOM APIs only exist in browser runtime environments, this project uses a Universal Module Pattern:
1. **Interactive Browser Mode**: Uses `window.prompt()` or interactive HTML form inputs with live DOM feedback and virtual console rendering.
2. **Automated CLI / Test Mode**: Functions accept deterministic parameters (e.g., `calculateTipAndTotal(100, 15)`) and fall back to default values when running directly via `node`.
3. **Module Exports**: All files export via `module.exports` for Node.js / `node:test` while binding to `window` for client-side browser usage.

---

## License

This project is licensed under the MIT License.
"# javascript-web-development-internship-mini-project" 
