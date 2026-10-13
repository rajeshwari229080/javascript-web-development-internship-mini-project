/**
 * Assignment 6 — Arrays, Objects, and Array Methods
 * 
 * Demonstrates:
 * - Complex data modeling with arrays of objects
 * - Array iteration using forEach()
 * - Array filtering with predicate callbacks using filter()
 * - Data transformation using map()
 * - Clean logging and data structuring
 */

const initialProducts = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 45 }
];

function runAssignment6(products = initialProducts, logger = console.log) {
  // 1. forEach() to display every product
  logger("--- All Products (forEach) ---");
  products.forEach((product) => {
    logger(`Item: ${product.name} - Price: $${product.price}`);
  });

  // 2. filter() to select products costing less than $50
  logger("");
  logger("--- Filtered Products (Price < $50) ---");
  const filteredProducts = products.filter((product) => product.price < 50);
  logger(JSON.stringify(filteredProducts, null, 2));

  // 3. map() to create uppercase product tags
  logger("");
  logger("--- Mapped Product Tags (map) ---");
  const mappedProductTags = products.map((product) => {
    return `${product.name.toUpperCase()} costs $${product.price}`;
  });
  logger(JSON.stringify(mappedProductTags, null, 2));

  return {
    allProducts: products,
    filteredProducts,
    mappedProductTags
  };
}

// Auto-run when executed directly via Node.js
if (typeof require !== "undefined" && require.main === module) {
  runAssignment6();
}

// Universal export
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initialProducts,
    runAssignment6
  };
}
if (typeof window !== "undefined") {
  window.initialProducts = initialProducts;
  window.runAssignment6 = runAssignment6;
}
