document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviewList');
    const reviewMessage = document.getElementById('reviewMessage');

    // Handle star rating clicks
    document.getElementById('reviewRating').addEventListener('click', function(event) {
        if (event.target.dataset.value) {
            const ratingValue = event.target.dataset.value;
            document.getElementById('reviewRatingValue').value = ratingValue;

            // Update star display
            updateStarDisplay(ratingValue);
        }
    });

    // Function to update star display based on rating value
    function updateStarDisplay(ratingValue) {
        const stars = document.querySelectorAll('#reviewRating span');
        stars.forEach(star => {
            if (star.dataset.value <= ratingValue) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    // Function to reset star display
    function resetStarDisplay() {
        document.querySelectorAll('#reviewRating span').forEach(star => {
            star.classList.remove('selected');
        });
    }

    // Handle review form submission
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const reviewText = document.getElementById('reviewText').value.trim();
        const reviewRating = document.getElementById('reviewRatingValue').value;

        if (reviewText === '' || reviewRating === '0') {
            alert('Please enter a review and select a rating.');
            return;
        }

        // Add review
        addReview(reviewText, reviewRating);

        // Show success message
        reviewMessage.textContent = 'Your review has been submitted successfully!';

        // Reset form
        reviewForm.reset();
        document.getElementById('reviewRatingValue').value = '0'; // Reset rating
        resetStarDisplay(); // Reset star display
    });

    // Function to add reviews
    function addReview(text, rating) {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'card mb-3';
        reviewCard.innerHTML = `
            <div class="card-body">
                <p>${text}</p>
                <div class="stars">
                    ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
                </div>
                <button class="btn btn-danger btn-sm remove-review mt-2">Remove</button>
            </div>
        `;
        reviewList.appendChild(reviewCard);
    }

    // Handle remove review button clicks
    reviewList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-review')) {
            event.target.closest('.card').remove();
        }
    });
});
