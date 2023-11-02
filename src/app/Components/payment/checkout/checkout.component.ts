import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/payment.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  paywithstripegate = true;
  selectedFeature: number;


  constructor(
     public fb: FormBuilder,
    private router:Router ,
    private paymentService:PaymentService ,
    private data: DataService , 
    private toastr: ToastrService,

  ) {}
  ngOnInit(): void {
    this.selectedFeature = this.paymentService.getSelectedFeauture();
   }
   
  paywithstripegateform = this.fb.group({
    number: new FormControl('4242 4242 4242 4242'),
    expired_month: new FormControl('12'),
    expired_year: new FormControl('34'),
    cvc: new FormControl('567'),
    amount: new FormControl('50'),
    description: new FormControl('this is the user one'),
    quantity : this.paymentService.getSelectedFeauture()
  });


  paywithstripe() {
    this.paywithstripegate = true;
  }

  onSubmitStripe(): void {
   
      const strpie: any = new FormData();
      strpie.append(
        'number',
        this.paywithstripegateform.controls['number']?.value
      );
      strpie.append(
        'expired_month',
        this.paywithstripegateform.controls['expired_month']?.value
      );
      strpie.append(
        'expired_year',
        this.paywithstripegateform.controls['expired_year']?.value
      );
      strpie.append(
        'cvc',
        this.paywithstripegateform.controls['cvc']?.value
      );

      strpie.append(
        'description',
        this.paywithstripegateform.controls['description']?.value
      );
     
      strpie.append(
        'amount',
        this.paywithstripegateform.controls['amount']?.value
      );
       const formDataObj: any = Object.fromEntries(strpie.entries());
      console.log('before payment is made')
      this.data.stripe(this.paywithstripegateform.value).subscribe({
        next: (response: any) => {
          this.router.navigate(['/dashboard/jobs']);

          this.toastr.success('your payment processed successfully', '201', {
            timeOut: 5000,
            progressBar: true,
          });

        },
      });
    
  }

}
