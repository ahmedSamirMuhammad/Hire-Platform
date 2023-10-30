import { Component } from "@angular/core";
import { CompanySettingsService } from "src/app/services/company-settings.service";
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { NgZone } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { ActivatedRoute, Router } from "@angular/router";
import { JobCrudService } from "src/app/services/job-crud.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
	selector: "app-company-settings",
	templateUrl: "./company-settings.component.html",
	styleUrls: ["./company-settings.component.scss"],
})
export class CompanySettingsComponent {
	cmpForm: FormGroup;
	constructor(
		public formBuilder: FormBuilder,
		private router: Router,
		// private activateRoute :ActivatedRoute,
		private ngZone: NgZone,
		private jobCrud: JobCrudService,
		private CmpService: CompanySettingsService,
		private toastr: ToastrService
	) {
		this.CmpService.getCmpData().subscribe((res) => {
			this.cmpForm.setValue({
				first_name: res["first_name"],
				last_name: res["last_name"],
				company_name: res["company_name"],
				email: res["email"],
				title: res["title"],
				nationality: res["nationality"],
				location: res["location"],
				about: res["about"],
				logo: res["logo"],
				password: "", // Add Validators.required for password
				new_password: "", // Add Validators.required for password
				confirmedPass: "", // Add Validators.required for password
				// new_password:res ['new_password'],
			});
		});

		this.cmpForm = this.formBuilder.group({
			first_name: [""],
			last_name: [""],
			company_name: [""],
			email: [""],
			title: [""],
			nationality: [""],
			location: [""],
			about: [""],
			logo: [""],
			password: [""], // Add Validators.required for password
			new_password: [""],
			confirmedPass: [""],
		});
	}
	ngOnInit(): void {}

	// Check newPassword is Repeated Correctly

	notMatched!: boolean; // flag to appear and disappear  sentence error
	CheckNewPass(newPass: string, repeatedNewPass: string) {
		if (newPass == repeatedNewPass) {
			this.notMatched = false;
		} else {
			this.notMatched = true;
		}
	}
	data: any;
	onSubmit() {
		console.log("hi");

		this.CmpService.updateCmpData(this.cmpForm.value).subscribe(
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
}
