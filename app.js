// SCRIPT TO SLIDE PANELS
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

// SCRIPT FOR ITEMS LIST FILTERING
document.addEventListener("DOMContentLoaded", function () {
  const categoryChips = document.getElementById("category-chips");
  const itemsContainer = document.getElementById("items-container");
  let selectedCategories = [];

  // Replace 'items.json' with the correct path to your JSON file
  fetch("items.json")
    .then((response) => response.json())
    .then((data) => {
      // Initial display of all items
      displayItems(data.produce);

      // Event listener for chip clicks using event delegation
      categoryChips.addEventListener("click", function (event) {
        if (event.target.classList.contains("chip")) {
          const clickedCategory = event.target.dataset.category;

          // Toggle selection for the clicked category
          if (selectedCategories.includes(clickedCategory)) {
            // Deselect the category
            selectedCategories = selectedCategories.filter(
              (category) => category !== clickedCategory
            );
          } else {
            // Select the category
            selectedCategories.push(clickedCategory);
          }

          // Toggle background color for the clicked chip
          event.target.style.backgroundColor = selectedCategories.includes(
            clickedCategory
          )
            ? "burlywood"
            : "";

          // Display items based on the selected categories
          displayItems(data.produce);
        }
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));

  // Function to display items based on the selected categories or show all items
  // Function to display items based on the selected categories or show all items
  function displayItems(produceData) {
    itemsContainer.innerHTML = "";

    if (selectedCategories.length === 0) {
      // If no chip is selected, show all items
      Object.values(produceData).forEach((categoryItems) => {
        categoryItems.forEach((item) => {
          const itemElement = document.createElement("span");
          itemElement.className = "item";
          itemElement.textContent = item.name;
          itemElement.addEventListener("click", function (event) {
            showPopup(item.name, event.target);
          });
          itemsContainer.appendChild(itemElement);
        });
      });
    } else {
      // Show items based on selected categories
      selectedCategories.forEach((selectedCategory) => {
        const items = produceData[selectedCategory];

        items.forEach((item) => {
          const itemElement = document.createElement("span");
          itemElement.className = "item";
          itemElement.textContent = item.name;
          itemElement.addEventListener("click", function (event) {
            showPopup(item.name, event.target);
          });
          itemsContainer.appendChild(itemElement);
        });
      });
    }
  }

  // Function to show the popup for an item
  function showPopup(itemName, clickedItem) {
    // Create the popup container
    const popupContainer = document.querySelector(".popup-container");

    // Remove existing content from the popup container
    popupContainer.innerHTML = "";

    // Create the popup content
    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    popupContent.innerHTML = `
    <p>Add "${itemName}" to:</p>
    <button onclick="addToFridge()">Add to My Fridge</button>
    <button onclick="addToGroceryList()">Add to My Grocery List</button>
    <button onclick="closePopup()">Close</button>
  `;

    // Position the popup relative to the clicked item
    const rect = clickedItem.getBoundingClientRect();
    popupContainer.style.top = `${rect.top + window.scrollY}px`;
    popupContainer.style.left = `${rect.left + window.scrollX}px`;

    // Append the popup content to the container
    popupContainer.appendChild(popupContent);

    // Add the 'active' class to make the popup visible
    popupContainer.classList.add("active");
  }

  // Function to add the item to the fridge
  window.addToFridge = function () {
    alert("Added to My Fridge");
    // Add your logic to handle adding to the fridge
    // You can remove the alert and add your custom logic here
    closePopup();
  };

  // Function to add the item to the grocery list
  window.addToGroceryList = function () {
    alert("Added to My Grocery List");
    // Add your logic to handle adding to the grocery list
    // You can remove the alert and add your custom logic here
    closePopup();
  };

  // Function to close the popup
  function closePopup() {
    const popupContainer = document.querySelector(".popup-container");

    // Remove the 'active' class to hide the popup
    popupContainer.classList.remove("active");
  }
});
