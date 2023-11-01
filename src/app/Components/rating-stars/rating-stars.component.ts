import { Component,Input } from "@angular/core";

@Component({
	selector: "app-rating-stars",
	templateUrl: "./rating-stars.component.html",
	styleUrls: ["./rating-stars.component.scss"],
})
export class RatingStarsComponent {
	@Input() rating;
	getFilledStars(rating: number): number[] {
		return Array(Math.floor(rating)).fill(0);
	}

	getEmptyStars(rating: number): number[] {
		return Array(5 - Math.floor(rating)).fill(0);
	}
}
