/**
 * main.js — Application Orchestrator & UI Controller
 * 
 * Manages tab switching, interactive event bindings, virtual terminal logging,
 * and synchronized reactive dashboard updates.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global instance of Capstone Inventory System
  const inventorySys = new InventorySystem();

  // --- Helper: Virtual Terminal Logger ---
  function createVirtualLogger(terminalElementId) {
    const container = document.getElementById(terminalElementId);
    if (!container) return console.log;

    return function (...args) {
      // Also log to browser developer tools console
      console.log(...args);

      const message = args
        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
        .join(" ");

      const line = document.createElement("div");
      line.className = "terminal-line";

      // Classify line styling based on content
      if (message.startsWith("---") || message.startsWith("[")) {
        line.classList.add("line-prompt");
      } else if (message.includes("Error:") || message.includes("Invalid")) {
        line.classList.add("line-error");
      } else if (message.includes("Total Amount") || message.includes("Total Inventory Value") || message.includes("Passed")) {
        line.classList.add("line-success");
      } else if (message.includes("Failed") || message.includes("Skipped")) {
        line.classList.add("line-warn");
      } else {
        line.classList.add("line-info");
      }

      line.textContent = message;
      container.appendChild(line);
      container.scrollTop = container.scrollHeight;
    };
  }

  function clearTerminal(terminalElementId) {
    const container = document.getElementById(terminalElementId);
    if (container) container.innerHTML = "";
  }

  // --- Tab Navigation Controller ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".assignment-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTabId = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const activePanel = document.getElementById(targetTabId);
      if (activePanel) activePanel.classList.add("active");
    });
  });

  // ==========================================
  // CAPSTONE DASHBOARD CONTROLLER
  // ==========================================
  const capstoneLogger = createVirtualLogger("console-capstone");

  function renderCapstoneUI() {
    const inventory = inventorySys.inventory;
    const tableBody = document.getElementById("inventory-table-body");
    const kpiTotalProducts = document.getElementById("kpi-total-products");
    const kpiTotalValue = document.getElementById("kpi-total-value");
    const kpiAffordableCount = document.getElementById("kpi-affordable-count");
    const kpiPremiumCount = document.getElementById("kpi-premium-count");
    const affordableTagsList = document.getElementById("affordable-tags-list");
    const formattedReportTags = document.getElementById("formatted-report-tags");

    // 1. Render Table
    if (tableBody) {
      tableBody.innerHTML = "";
      if (inventory.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Inventory is currently empty.</td></tr>`;
      } else {
        inventory.forEach((item) => {
          const row = document.createElement("tr");

          let badgeClass = "badge-standard";
          if (item.category === "Budget") badgeClass = "badge-budget";
          if (item.category === "Premium") badgeClass = "badge-premium";

          row.innerHTML = `
            <td><strong>${item.name}</strong></td>
            <td>$${item.price.toFixed ? item.price.toFixed(2) : item.price}</td>
            <td><span class="badge ${badgeClass}">${item.category}</span></td>
          `;
          tableBody.appendChild(row);
        });
      }
    }

    // 2. Render KPIs
    const totalVal = inventorySys.calculateTotalValue();
    const affordableItems = inventorySys.getAffordableProducts(200);
    const premiumItems = inventory.filter((item) => item.category === "Premium");

    if (kpiTotalProducts) kpiTotalProducts.textContent = inventory.length;
    if (kpiTotalValue) kpiTotalValue.textContent = `$${totalVal}`;
    if (kpiAffordableCount) kpiAffordableCount.textContent = affordableItems.length;
    if (kpiPremiumCount) kpiPremiumCount.textContent = premiumItems.length;

    // 3. Render Affordable Tag List
    if (affordableTagsList) {
      affordableTagsList.innerHTML = "";
      if (affordableItems.length === 0) {
        affordableTagsList.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">None</span>`;
      } else {
        affordableItems.forEach((item) => {
          const tag = document.createElement("div");
          tag.className = "tag-item";
          tag.textContent = `${item.name} ($${item.price})`;
          affordableTagsList.appendChild(tag);
        });
      }
    }

    // 4. Render Formatted Uppercase Report List
    if (formattedReportTags) {
      formattedReportTags.innerHTML = "";
      const reports = inventorySys.generateFormattedReport();
      reports.forEach((rep) => {
        const tag = document.createElement("div");
        tag.className = "tag-item";
        tag.textContent = rep;
        formattedReportTags.appendChild(tag);
      });
    }

    // 5. Update Financial Projections
    updateFinancialProjections();
  }

  function updateFinancialProjections() {
    const taxInput = document.getElementById("input-calc-tax");
    const discountInput = document.getElementById("input-calc-discount");
    const grandTotalDisplay = document.getElementById("grand-total-display");

    if (!taxInput || !discountInput || !grandTotalDisplay) return;

    const tax = Number(taxInput.value) || 0;
    const discount = Number(discountInput.value) || 0;

    try {
      const fin = inventorySys.calculateFinancials(tax, discount);
      grandTotalDisplay.textContent = `$${fin.grandTotal.toFixed(2)}`;
    } catch {
      grandTotalDisplay.textContent = "Invalid calculation parameters";
    }
  }

  // Capstone Form Submission
  const addProductForm = document.getElementById("form-add-product");
  const formFeedback = document.getElementById("product-form-feedback");

  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("input-product-name");
      const priceInput = document.getElementById("input-product-price");

      try {
        const added = inventorySys.addProduct(nameInput.value, priceInput.value);
        if (formFeedback) {
          formFeedback.textContent = `Success: Added "${added.name}" ($${added.price}) as ${added.category}`;
          formFeedback.className = "feedback-msg show success";
        }
        nameInput.value = "";
        priceInput.value = "";
        renderCapstoneUI();
      } catch (err) {
        if (formFeedback) {
          formFeedback.textContent = err.message;
          formFeedback.className = "feedback-msg show error";
        }
      }
    });
  }

  // Capstone Reset Demo Data
  const resetDemoBtn = document.getElementById("btn-reset-demo");
  if (resetDemoBtn) {
    resetDemoBtn.addEventListener("click", () => {
      const confirmed = window.confirm("Reset inventory back to initial demo data (Laptop $800, Mouse $25)?");
      if (confirmed) {
        inventorySys.reset();
        if (formFeedback) {
          formFeedback.textContent = "Inventory reset to default demonstration catalog.";
          formFeedback.className = "feedback-msg show success";
        }
        renderCapstoneUI();
      }
    });
  }

  // Capstone Prompt Trigger
  const promptCapstoneBtn = document.getElementById("btn-capstone-prompt");
  if (promptCapstoneBtn) {
    promptCapstoneBtn.addEventListener("click", () => {
      const name = window.prompt("Enter product name:", "Monitor");
      if (name === null) return;
      const price = window.prompt("Enter product price:", "150");
      if (price === null) return;

      try {
        const added = inventorySys.addProduct(name, price);
        alert(`Product "${added.name}" ($${added.price}) added successfully! Category: ${added.category}`);
        renderCapstoneUI();
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Capstone Execute Demo Flow (with Monitor $150)
  const runDemoFlowBtn = document.getElementById("btn-capstone-run-demo");
  if (runDemoFlowBtn) {
    runDemoFlowBtn.addEventListener("click", () => {
      clearTerminal("console-capstone");
      // Reset first to ensure deterministic baseline: Laptop + Mouse
      inventorySys.reset();
      inventorySys.runDemonstration({ name: "Monitor", price: 150 }, capstoneLogger);
      renderCapstoneUI();
    });
  }

  // Financial inputs listener
  const taxInput = document.getElementById("input-calc-tax");
  const discountInput = document.getElementById("input-calc-discount");
  if (taxInput) taxInput.addEventListener("input", updateFinancialProjections);
  if (discountInput) discountInput.addEventListener("input", updateFinancialProjections);

  // Initial render of Capstone
  renderCapstoneUI();
  // Auto-run demonstration log initially in terminal
  runDemoFlowBtn?.click();

  // ==========================================
  // ASSIGNMENT 1 CONTROLLER
  // ==========================================
  const a1Logger = createVirtualLogger("console-a1");
  const btnRunA1 = document.getElementById("btn-run-a1");
  if (btnRunA1) {
    btnRunA1.addEventListener("click", () => {
      clearTerminal("console-a1");
      runAssignment1(a1Logger);
    });
    // Auto-run once
    runAssignment1(a1Logger);
  }

  // ==========================================
  // ASSIGNMENT 2 CONTROLLER
  // ==========================================
  const a2Logger = createVirtualLogger("console-a2");
  const btnRunA2 = document.getElementById("btn-run-a2");
  const btnPromptA2 = document.getElementById("btn-prompt-a2");
  const feedbackA2 = document.getElementById("feedback-a2");

  function executeA2(bill, tip) {
    clearTerminal("console-a2");
    try {
      calculateTipAndTotal(bill, tip, a2Logger);
      if (feedbackA2) {
        feedbackA2.textContent = "Calculation completed successfully.";
        feedbackA2.className = "feedback-msg show success";
      }
    } catch (err) {
      a2Logger(err.message);
      if (feedbackA2) {
        feedbackA2.textContent = err.message;
        feedbackA2.className = "feedback-msg show error";
      }
    }
  }

  if (btnRunA2) {
    btnRunA2.addEventListener("click", () => {
      const bill = document.getElementById("input-a2-bill")?.value;
      const tip = document.getElementById("input-a2-tip")?.value;
      executeA2(bill, tip);
    });
  }

  if (btnPromptA2) {
    btnPromptA2.addEventListener("click", () => {
      clearTerminal("console-a2");
      runAssignment2(undefined, undefined, a2Logger);
    });
  }
  // Auto-run demo
  executeA2(100, 15);

  // ==========================================
  // ASSIGNMENT 3 CONTROLLER
  // ==========================================
  const a3Logger = createVirtualLogger("console-a3");
  const btnRunA3 = document.getElementById("btn-run-a3");
  const btnDemo85 = document.getElementById("btn-a3-demo85");
  const btnDemo40 = document.getElementById("btn-a3-demo40");
  const scoreInput = document.getElementById("input-a3-score");
  const feedbackA3 = document.getElementById("feedback-a3");

  function executeA3(score) {
    clearTerminal("console-a3");
    try {
      evaluateScore(score, a3Logger);
      if (feedbackA3) {
        feedbackA3.textContent = "Score evaluated successfully.";
        feedbackA3.className = "feedback-msg show success";
      }
    } catch (err) {
      a3Logger(err.message);
      if (feedbackA3) {
        feedbackA3.textContent = err.message;
        feedbackA3.className = "feedback-msg show error";
      }
    }
  }

  if (btnRunA3) {
    btnRunA3.addEventListener("click", () => {
      executeA3(scoreInput?.value);
    });
  }
  if (btnDemo85) {
    btnDemo85.addEventListener("click", () => {
      if (scoreInput) scoreInput.value = "85";
      executeA3(85);
    });
  }
  if (btnDemo40) {
    btnDemo40.addEventListener("click", () => {
      if (scoreInput) scoreInput.value = "40";
      executeA3(40);
    });
  }
  executeA3(85);

  // ==========================================
  // ASSIGNMENT 4 CONTROLLER
  // ==========================================
  const a4Logger = createVirtualLogger("console-a4");
  const btnRunA4 = document.getElementById("btn-run-a4");
  if (btnRunA4) {
    btnRunA4.addEventListener("click", () => {
      clearTerminal("console-a4");
      runAssignment4(a4Logger);
    });
    runAssignment4(a4Logger);
  }

  // ==========================================
  // ASSIGNMENT 5 CONTROLLER
  // ==========================================
  const a5Logger = createVirtualLogger("console-a5");
  const btnRunA5 = document.getElementById("btn-run-a5");
  if (btnRunA5) {
    btnRunA5.addEventListener("click", () => {
      clearTerminal("console-a5");
      runAssignment5(a5Logger);
    });
    runAssignment5(a5Logger);
  }

  // ==========================================
  // ASSIGNMENT 6 CONTROLLER
  // ==========================================
  const a6Logger = createVirtualLogger("console-a6");
  const btnRunA6 = document.getElementById("btn-run-a6");
  if (btnRunA6) {
    btnRunA6.addEventListener("click", () => {
      clearTerminal("console-a6");
      runAssignment6(undefined, a6Logger);
    });
    runAssignment6(undefined, a6Logger);
  }
});
