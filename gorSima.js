$(document).ready(function() {
  // Set default value for date input to today's date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yyyy = today.getFullYear();

  var formattedDate = yyyy + '-' + mm + '-' + dd;
  $('#date-book').val(formattedDate);

  // Toggle dropdown
  function toggleDropdown(button) {
      var $schedule = $(button).next();
      $('.schedule').not($schedule).css('display', 'none');
      if ($schedule.css('display') === 'none' || $schedule.css('display') === '') {
          $schedule.css('display', 'flex');
      } else {
          $schedule.css('display', 'none');
      }
  }

  $('.dropdown-btn').on('click', function() {
      toggleDropdown(this);
  });

  // Update available count
  $('.container').each(function() {
      var $container = $(this);
      var $availableElements = $container.find('.status');
      var availableCount = 0;

      $availableElements.each(function() {
          if ($(this).text().trim() === 'Available') {
              availableCount++;
          }
      });

      var $button = $container.find('.dropdown-btn');
      $button.text(availableCount + ' Jadwal Tersedia');
  });

  // Update item count
  var $checkboxes = $('.checkbox-input');
  var $itemCountElement = $('#itemCount');

  function updateItemCount() {
      let totalItems = 0;

      $checkboxes.each(function() {
          if ($(this).prop('checked')) {
              totalItems++;
          }
      });

      $itemCountElement.text(totalItems + ' Item Dipilih');
  }

  $checkboxes.on('change', function() {
      var $list = $(this).closest('.form-element').find('.list');
      if ($(this).prop('checked')) {
          $list.text('1');
      } else {
          $list.text('0');
      }
      updateItemCount();
  });

  // Initial update on page load
  updateItemCount();

  // Show/Hide quantity forms
  var $checkboxesWithQuantityForms = $('.checkbox-input');
  var $quantityForms = $('.quantity-form');

  $checkboxesWithQuantityForms.each(function(index) {
      $(this).on('change', function() {
          if ($(this).prop('checked')) {
              $quantityForms.eq(index).css('display', 'block');
          } else {
              $quantityForms.eq(index).css('display', 'none');
          }
      });
  });

  // Disable checkboxes with status other than "Available"
  $('.checkbox-input').each(function() {
    var $status = $(this).closest('.form-element').find('.status');
    if ($status.text().trim() !== 'Available') {
        $(this).prop('disabled', true); // Disable the checkbox input
        $(this).closest('label').css('color', 'var(--darkW-color)'); // Optionally, grey out the label
        // Additional styling for the checkbox itself (if needed)
        $(this).next('label').css({
            'cursor': 'not-allowed', // Change cursor to not-allowed
            'opacity': '0.4' // Reduce opacity to indicate disabled state
        });
    }
});

$('.buttonPesan').on('click', function() {
  // Ambil nama gor
  var gorName = $('#gor-name').text().trim();

  // Ambil nilai tanggal yang dipilih
  var tanggalTerpilih = $('#date-book').val();

  // Validasi apakah tanggal telah dipilih
  if (!tanggalTerpilih) {
      alert('Anda harus memilih tanggal sebelum melakukan pemesanan.');
      return; // Berhenti eksekusi fungsi jika tanggal tidak dipilih
  }

  var selectedItems = [];
  var lapanganDipilih = false; // Flag untuk menandai apakah minimal satu lapangan dipilih

  // Loop untuk setiap checkbox yang dicek
  $('.checkbox-input:checked').each(function() {
      var container = $(this).closest('.form-element');
      var quantity = container.find('.durasi').text().trim(); // Mengambil teks durasi sebagai quantity
      var price = container.find('.harga').text().trim(); // Mengambil teks harga dari elemen .harga yang terkait dengan checkbox

      // Construct the item object hanya untuk checkbox yang dipilih
      var item = {
          checkbox: $(this).val(),
          quantity: quantity,
          price: price,
          tanggal: tanggalTerpilih // Tambahkan nilai tanggal ke dalam objek item
      };

      selectedItems.push(item);
      lapanganDipilih = true; // Set flag menjadi true karena minimal satu lapangan dipilih
  });

  // Validasi apakah minimal satu lapangan dipilih
  if (!lapanganDipilih) {
      alert('Anda harus memilih minimal satu lapangan sebelum melakukan pemesanan.');
      return; // Berhenti eksekusi fungsi jika tidak ada lapangan yang dipilih
  }

  // Construct the URL for orderBook.html with selectedItems as a query parameter
  var baseUrl = '../orderBook.html';
  var queryParams = encodeURIComponent(JSON.stringify(selectedItems));
  var url = baseUrl + '?selectedItems=' + queryParams + '&gorName=' + encodeURIComponent(gorName);

  // Buka orderBook.html di jendela/tab baru
  window.location.href = url;
});



});
