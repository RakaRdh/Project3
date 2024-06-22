function toggleDropdown() {
    var schedule = document.getElementById("schedule");
    if (schedule.style.display === "none" || schedule.style.display === "") {
        schedule.style.display = "flex";
    } else {
        schedule.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Count elements with status "Available"
    var availableElements = document.querySelectorAll('.status');
    var availableCount = 0;
    
    availableElements.forEach(function(element) {
        if (element.textContent.trim() === "Available") {
            availableCount++;
        }
    });
    
    // Update button text
    var button = document.querySelector('.dropdown-btn');
    button.textContent = availableCount + " Jadwal Tersedia";
});

const checkboxes = document.querySelectorAll('.checkbox');
const quantityForms = document.querySelectorAll('.quantity-form');

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      quantityForms[index].style.display = "block";
    } else {
      quantityForms[index].style.display = "none";
    }
  });
});
