import { Component, OnInit } from '@angular/core';
interface Review {
  userId: string;
  rating: number;
  comment: string;
  timestamp: string;
}

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  rating = 0;
  comment = '';
  userId: string = 'user123'; // Simulating user login
  routeId: string = 'routeA123'; // Simulating selected route

  ngOnInit() {
    this.loadReviews();
  }

   // Load reviews from Local Storage
   loadReviews() {
    const storedReviews = localStorage.getItem(`reviews_${this.routeId}`);
    this.reviews = storedReviews ? JSON.parse(storedReviews) : [];
  }

  // Save reviews to Local Storage
  saveReviews() {
    localStorage.setItem(`reviews_${this.routeId}`, JSON.stringify(this.reviews));
  }

  // Submit a new review
  submitReview() {
    if (this.rating < 1 || this.rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }

    const newReview: Review = {
      userId: this.userId,
      rating: this.rating,
      comment: this.comment,
      timestamp: new Date().toISOString()
    };

    this.reviews.push(newReview);
    this.saveReviews();

    alert("Review submitted successfully!");
    this.comment = ''; // Clear input
    this.rating = 0;  // Reset rating
  }

  // Delete a review (only the user's own review)
  deleteReview(index: number) {
    this.reviews.splice(index, 1);
    this.saveReviews();
  }


}

