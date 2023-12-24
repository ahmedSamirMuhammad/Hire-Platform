import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/payment.service';

@Component({
  selector: 'app-payment-plans',
  templateUrl: './payment-plans.component.html',
  styleUrls: ['./payment-plans.component.scss']
})
export class PaymentPlansComponent {
  firstFeature = 3;
  secondFeature = 5;
  thirdFeature = 10;


  constructor(   private router: Router, private paymentService: PaymentService) {}

  buyNow(selectedFeature: number) {
    this.paymentService.setSelectedFeauture(selectedFeature);
	this.router.navigate(['/checkout']);
  }

}
