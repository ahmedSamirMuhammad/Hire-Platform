import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/payment.service';
;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  selectedFeature: number;

  constructor(private paymentService:PaymentService) {}

  ngOnInit() {
    this.selectedFeature = this.paymentService.getSelectedFeauture();
  }

}
