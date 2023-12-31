
import { Component } from "@angular/core";
import { CompanySettingsService } from "src/app/services/company-settings.service";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { NgZone } from "@angular/core";
import { ToastrService } from "ngx-toastr";


import { ActivatedRoute, Router } from "@angular/router";
import { JobCrudService } from "src/app/services/job-crud.service";
import { FormGroup, FormBuilder } from "@angular/forms";
//spinner
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: "app-company-settings",
	templateUrl: "./company-settings.component.html",
	styleUrls: ["./company-settings.component.scss"],
})
export class CompanySettingsComponent {
	cmpForm: FormGroup;
	userFormData: FormData

	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		private ngZone: NgZone,
		private cmpService: CompanySettingsService,
		private toastr: ToastrService,
		// private spinner:NgxSpinnerService
	) {



		this.cmpForm = this.formBuilder.group({
			first_name: ['', [Validators.required, Validators.minLength(2)]],
			last_name: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			company_name: [""],
			title: [""],
			location: [""],
			about: [""],
			logo: [""],
			nationality: [""],
			password: [""],
			new_password: [""],
			confirmedPass: [""],
			//   twitter_account: [""],
			linkedin_account: [""],
			mobile_number:[""]

		});








	}


	ngOnInit(): void {
		this.loadData();
	}


	data: any;

	onSubmit() {
		this.userFormData.append('first_name', this.cmpForm.get('first_name').value)
		this.userFormData.append('last_name', this.cmpForm.get('last_name').value)
		this.userFormData.append('email', this.cmpForm.get('email').value)
		this.userFormData.append('company_name', this.cmpForm.get('company_name').value)
		this.userFormData.append('title', this.cmpForm.get('title').value)
		this.userFormData.append('location', this.cmpForm.get('location').value)
		this.userFormData.append('about', this.cmpForm.get('about').value)
		this.userFormData.append('nationality', this.cmpForm.get('nationality').value)
		this.userFormData.append('password', this.cmpForm.get('password').value)
		this.userFormData.append('new_password', this.cmpForm.get('new_password').value)
		this.userFormData.append('confirmedPass', this.cmpForm.get('confirmedPass').value)
		this.userFormData.append('linkedin_account', this.cmpForm.get('linkedin_account').value)
		this.userFormData.append('mobile_number', this.cmpForm.get('mobile_number').value)
		console.log("hi");

		if (this.cmpForm.valid) {

			this.cmpService.updateCmpData(this.userFormData).subscribe(
				(res) => {
					this.data = res;
					//  console.log('edited successfully');
					//  this.router.navigate(['/dashboard/jobs']);

					if (this.data.status === 200) {
						this.router.navigate(["/dashboard/jobs"]);
						this.toastr.success(
							JSON.stringify(this.data.msg),
							JSON.stringify(this.data.status),
							{
								timeOut: 2000,
								progressBar: true,
							}
						);

					}



				},
				(error) => {
					// Handle error here
					this.toastr.error("Error with your credentials", "401", {
						timeOut: 5000,
						progressBar: true,
					});

				}


			);
		}
		else {
			this.toastr.error(
				JSON.stringify("invalid data"),
				JSON.stringify(403),
				{
					timeOut: 2000,
					progressBar: true,
				}
			);


		}

	}

	removeSkill() {

	}



	loadData() {
		//spinner
		// this.spinner.show();
		this.cmpService.getCmpData().subscribe((res) => {
			console.log(res);
			this.cmpForm.patchValue({
				first_name: res["first_name"],
				last_name: res["last_name"],
				email: res["email"],
				company_name: res["company_name"],
				title: res["title"],
				location: res["location"],
				nationality: res["nationality"],
				about: res["about"],
				logo: res["logo"],
				mobile_number: res["mobile_number"],
				linkedin_account: res["linkedin_account"],


			});
			setTimeout(() => {
				/** spinner ends after 5 seconds */
				// this.spinner.hide();
			}, 1000);

		});

	}

	selected(event: any) {
		const selectedFiles = event.target.files[0];
		console.log(selectedFiles)
		this.userFormData = new FormData
		this.userFormData.append('logo', selectedFiles)


	}


}
