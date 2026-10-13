/**
 * Capstone Project — Interactive Product Inventory & Analytics Dashboard
 * 
 * Demonstrates:
 * - Complex state management with plain JavaScript objects and arrays
 * - Input validation & error boundaries
 * - Category assignment using conditional logic and switch statements
 * - Searching and skipping using for loops with break and continue
 * - Financial calculations via reduce, filter, and map
 * - Tax and discount analytics with customizable parameters
 * - Deterministic console reporting matching exact specification
 */

const DEFAULT_INITIAL_INVENTORY = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

/**
 * Categorizes a product based on its price.
 * Uses conditional logic to derive category key and switch statement to return formatted label.
 * Boundaries:
 * - Budget: price < 50
 * - Standard: 50 <= price <= 199.99
 * - Premium: price >= 200
 */
function getProductCategory(price) {
  if (typeof price !== "number" || Number.isNaN(price) || price < 0) {
    throw new Error("Invalid Price: Price must be a non-negative number.");
  }

  let categoryKey;
  if (price < 50) {
    categoryKey = "BUDGET";
  } else if (price <= 199.99) {
    categoryKey = "STANDARD";
  } else {
    categoryKey = "PREMIUM";
  }

  // Switch statement mapping category key to user-facing label
  switch (categoryKey) {
    case "BUDGET":
      return "Budget";
    case "STANDARD":
      return "Standard";
    case "PREMIUM":
      return "Premium";
    default:
      return "Unclassified";
  }
}

/**
 * Validates product creation parameters.
 */
function validateProductInput(name, rawPrice) {
  if (name === null || name === undefined || (typeof name === "string" && name.trim() === "")) {
    throw new Error("Validation Error: Product name cannot be blank.");
  }

  if (rawPrice === null || rawPrice === undefined || (typeof rawPrice === "string" && rawPrice.trim() === "")) {
    throw new Error("Validation Error: Product price cannot be empty.");
  }

  const price = Number(rawPrice);

  if (Number.isNaN(price)) {
    throw new Error("Validation Error: Product price must be a valid number.");
  }

  if (price <= 0) {
    throw new Error("Validation Error: Product price must be greater than zero.");
  }

  return {
    name: name.trim(),
    price
  };
}

/**
 * Inventory Manager Class for state encapsulation
 */
class InventorySystem {
  constructor(initialData = DEFAULT_INITIAL_INVENTORY) {
    this.inventory = [];
    this.reset(initialData);
  }

  /**
   * Resets inventory to clean copy of initial items
   */
  reset(data = DEFAULT_INITIAL_INVENTORY) {
    this.inventory = data.map((item) => ({
      name: item.name,
      price: item.price,
      category: getProductCategory(item.price)
    }));
  }

  /**
   * Adds a product to inventory after validation
   */
  addProduct(name, rawPrice) {
    const validated = validateProductInput(name, rawPrice);
    const category = getProductCategory(validated.price);
    const newProduct = {
      name: validated.name,
      price: validated.price,
      category
    };
    this.inventory.push(newProduct);
    return newProduct;
  }

  /**
   * Loops through inventory to search by name using break
   */
  findProductByName(targetName) {
    if (!targetName || this.inventory.length === 0) return null;
    let found = null;
    for (let i = 0; i < this.inventory.length; i++) {
      if (this.inventory[i].name.toLowerCase() === targetName.trim().toLowerCase()) {
        found = this.inventory[i];
        break; // Exit loop immediately when product is found
      }
    }
    return found;
  }

  /**
   * Filters out items exceeding a given budget using loop + continue demonstration
   */
  filterItemsWithContinue(maxPrice) {
    const result = [];
    for (let i = 0; i < this.inventory.length; i++) {
      const item = this.inventory[i];
      if (item.price > maxPrice) {
        continue; // Skip items over maxPrice
      }
      result.push(item);
    }
    return result;
  }

  /**
   * Calculates total inventory value using reduce()
   */
  calculateTotalValue() {
    return this.inventory.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * Retrieves affordable products (price < 200) using filter()
   */
  getAffordableProducts(maxPrice = 200) {
    return this.inventory.filter((item) => item.price < maxPrice);
  }

  /**
   * Generates formatted report strings using map()
   * Example: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]
   */
  generateFormattedReport() {
    return this.inventory.map((item) => `${item.name.toUpperCase()}: $${item.price}`);
  }

  /**
   * Calculates financial projections with optional tax and discount
   */
  calculateFinancials(taxPercent = 0, discountPercent = 0) {
    if (taxPercent < 0 || taxPercent > 100) {
      throw new Error("Validation Error: Tax percentage must be between 0 and 100.");
    }
    if (discountPercent < 0 || discountPercent > 100) {
      throw new Error("Validation Error: Discount percentage must be between 0 and 100.");
    }

    const subtotal = this.calculateTotalValue();
    const discountAmount = (subtotal * discountPercent) / 100;
    const discountedSubtotal = subtotal - discountAmount;
    const taxAmount = (discountedSubtotal * taxPercent) / 100;
    const grandTotal = discountedSubtotal + taxAmount;

    return {
      subtotal,
      discountPercent,
      discountAmount,
      discountedSubtotal,
      taxPercent,
      taxAmount,
      grandTotal
    };
  }

  /**
   * Executes deterministic capstone console output matching exact prompt specifications
   */
  runDemonstration(demoItem = { name: "Monitor", price: 150 }, logger = console.log) {
    logger("--- Initializing Inventory System ---");
    logger(`[Prompt executed: User adds "${demoItem.name}" at "$${demoItem.price}"]`);

    // Add demo product
    this.addProduct(demoItem.name, demoItem.price);

    // 1. Process inventory roster using forEach()
    logger("");
    logger("--- Processing Inventory Roster (forEach) ---");
    this.inventory.forEach((item) => {
      logger(`* Item: ${item.name} ($${item.price}) -> Category: ${item.category}`);
    });

    // 2. Financial Analytics
    logger("");
    logger("--- Financial Analytics ---");
    const totalValue = this.calculateTotalValue();
    const affordableItems = this.getAffordableProducts(200).map((item) => item.name);
    const formattedReport = this.generateFormattedReport();

    logger(`Total Inventory Value: $${totalValue}`);
    logger(`Filtered Affordable Items (Under $200): ${JSON.stringify(affordableItems)}`);
    logger(`Formatted Report List: ${JSON.stringify(formattedReport)}`);

    return {
      totalProducts: this.inventory.length,
      totalValue,
      affordableItems,
      formattedReport,
      inventory: this.inventory
    };
  }
}

function runCapstone(demoItem = { name: "Monitor", price: 150 }, logger = console.log) {
  const system = new InventorySystem();
  return {
    system,
    demoResults: system.runDemonstration(demoItem, logger)
  };
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runCapstone();
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DEFAULT_INITIAL_INVENTORY,
    getProductCategory,
    validateProductInput,
    InventorySystem,
    runCapstone
  };
}
if (typeof window !== "undefined") {
  window.DEFAULT_INITIAL_INVENTORY = DEFAULT_INITIAL_INVENTORY;
  window.getProductCategory = getProductCategory;
  window.validateProductInput = validateProductInput;
  window.InventorySystem = InventorySystem;
  window.runCapstone = runCapstone;
}
