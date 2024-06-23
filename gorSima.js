function toggleDropdown(button) {
  var schedule = button.nextElementSibling;
  if (schedule.style.display === "none" || schedule.style.display === "") {
    schedule.style.display = "flex";
  } else {
    schedule.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var containers = document.querySelectorAll('.container');

  containers.forEach(function(container) {
    var availableElements = container.querySelectorAll('.status');
    var availableCount = 0;

    availableElements.forEach(function(element) {
      if (element.textContent.trim() === "Available") {
        availableCount++;
      }
    });

    var button = container.querySelector('.dropdown-btn');
    button.textContent = availableCount + " Jadwal Tersedia";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.checkbox-input');
  const lists = document.querySelectorAll('.list');
  const itemCountElement = document.getElementById('itemCount');

  function updateItemCount() {
    let totalItems = 0;

    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        totalItems++;
      }
    });

    lists.forEach(function(list) {
      totalItems += parseInt(list.textContent);
    });

    itemCountElement.textContent = totalItems + ' Item Dipilih';
  }

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', updateItemCount);
  });

  const minusBtns = document.querySelectorAll(".minus-btn");
  const plusBtns = document.querySelectorAll(".plus-btn");

  // Initialize counts array to store count for each list
  let counts = [];

  lists.forEach((list, index) => {
    counts[index] = 0;
    list.innerHTML = `<span>${counts[index]}</span>`;

    minusBtns[index].addEventListener("click", () => {
      counts[index]--;
      if (counts[index] < 0) {
        counts[index] = 0;
      }
      list.innerHTML = `<span>${counts[index]}</span>`;
      updateItemCount(); // Call updateItemCount function after modifying count
    });

    plusBtns[index].addEventListener("click", () => {
      counts[index]++;
      if (counts[index] > 50) {
        counts[index] = 50;
      }
      list.innerHTML = `<span>${counts[index]}</span>`;
      updateItemCount(); // Call updateItemCount function after modifying count
    });
  });

  // Initial update on page load
  updateItemCount();
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

