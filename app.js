document.addEventListener("DOMContentLoaded", function () {
  // Hide panels and text initially
  togglePanel("fridge-panel", false);
  togglePanel("grocery-list-panel", false);

  document.getElementById("fridge-menu").addEventListener("click", function () {
    togglePanel("fridge-panel");
  });

  document
    .getElementById("grocery-list-menu")
    .addEventListener("click", function () {
      togglePanel("grocery-list-panel");
    });

  function togglePanel(panelId, shouldToggle = true) {
    var panel = document.getElementById(panelId);
    var isOpen = panel.style.width === "20%";
    var panelText = document.getElementById(panelId + "-text");

    // Toggle the width to open or close the panel
    if (shouldToggle) {
      panel.style.width = isOpen ? "0" : "20%";
      panelText.style.display = isOpen ? "none" : "block";
    } else {
      panel.style.width = "0";
      panelText.style.display = "none";
    }
  }
});
