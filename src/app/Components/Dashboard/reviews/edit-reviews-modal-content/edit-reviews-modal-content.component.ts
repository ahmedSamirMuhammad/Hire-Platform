import { Component ,Input,ViewChild,
	ElementRef,} from "@angular/core";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { FormGroup, FormBuilder,Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
@Component({
	selector: "app-edit-reviews-modal-content",
	templateUrl: "./edit-reviews-modal-content.component.html",
	styleUrls: ["./edit-reviews-modal-content.component.scss"],
})
export class EditReviewsModalContentComponent {
	reviewForm: FormGroup;
	@Input() params:any;
	@Input() modalOnInit: any;
	@Input() closeModal: any;
	@Input() openModal: any;
	company_name;
	@ViewChild("rating1") rating1: ElementRef;
	@ViewChild("rating2") rating2: ElementRef;
	@ViewChild("rating3") rating3: ElementRef;
	@ViewChild("rating4") rating4: ElementRef;
	@ViewChild("rating5") rating5: ElementRef;

	constructor(
		private dashboardHttpService: DashboardHttpService,
		public formBuilder: FormBuilder,
		private toastr: ToastrService,



	) {
		this.reviewForm = this.formBuilder.group({
			id: ["",Validators.required],
			rating: [null,[Validators.required, Validators.min(1), Validators.max(5)]],
			title: [""],
			comment: ["",Validators.required],
		});

	}
	ngOnInit() {
	}
	getReview() {
		this.reviewForm.setValue({
				id:'',
				rating: '',
				title: '',
				comment: '',
			});
		this.dashboardHttpService.getReview(this.params.id).subscribe((res) => {
			console.log(res)
			const data = res.data;
			(this[`rating${data["rating"]}`].nativeElement as HTMLButtonElement).click();
			this.company_name = data['company_name'];
			this.reviewForm.setValue({
				id:data["id"],
				rating: data["rating"],
				title: data["title"],
				comment: data["comment"],
			});
		this.openModal();
		});
	}
	rate(rating) {

		this.reviewForm.patchValue({ rating:rating});
	}
	onSubmit() {
		// Ensure that the company ID is set correctly
		this.dashboardHttpService.editReview(this.params.id,this.reviewForm.value).subscribe(
			(res: any) => {
				const data = res.data;
				this.params.getReviews();
				if (res.status === 200) {
					this.toastr.success(
						JSON.stringify(res.msg),
						JSON.stringify(res.status),
						{
							timeOut: 2000,
							progressBar: true,
						}
					);
				}
				this.closeModal();
			}
		);

	}
}
