import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-reviews',
  templateUrl: './company-reviews.component.html',
  styleUrls: ['./company-reviews.component.scss'],
})
export class CompanyReviewsComponent {
  @Input() review: any;

  getFilledStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
} 
