// after  contack submitting i want to display thank





document.addEventListener('DOMContentLoaded', function() {
  // Add a submit event listener to the form
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Hide the form
      document.getElementById('contact-form').style.display = 'none';

      // Hide the header specifically by using a unique class or ID
      var header = document.querySelector('h1');
      if (header) {
          header.style.display = 'none';
      }

      // Show the thank you message
      document.getElementById('thank-you-message').style.display = 'block';
  });
});
