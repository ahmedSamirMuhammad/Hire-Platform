import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
	private selectedFeature: number;

	setSelectedFeauture(feature: number) {
	  this.selectedFeature = feature;
	}

	getSelectedFeauture(): number {
	  return this.selectedFeature;
	}
}
