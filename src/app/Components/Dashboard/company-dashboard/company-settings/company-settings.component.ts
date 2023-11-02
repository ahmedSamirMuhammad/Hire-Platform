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
		private ngZone: NgZone,
		private cmpService: CompanySettingsService,
		private toastr: ToastrService
	  ) {
	
		
	
		this.cmpForm = this.formBuilder.group({
		  first_name: [""],
		  last_name: [""],
		  email: [""],
		  company_name:[""],
		  title: [""],
		  location: [""],
		  about: [""],
		  logo: [""],
		  nationality:[""],
		  password: [""],
		  new_password: [""],
		  confirmedPass: [""],
		  twitter_account: [""],
		  linkedin_account: [""],
		  github_account: [""],
		  mobile_number:[""]
		});
	  
		this.cmpService.getCmpData().subscribe((res) => {
		  this.cmpForm.patchValue({
			first_name: res["first_name"],
			last_name: res["last_name"],
			email: res["email"],
			company_name:res["company_name"],
			title: res["title"],
			location :res["location"],
			nationality :res["nationality"],
			about: res["about"],
			logo: res["avatar"],
			mobile_number:res["mobile_number"]
			
			// twitter_account: res["twitter_account"],
			// linkedin_account: res["linkedin_account"],
			// github_account: res["github_account"],
		  });
		});
	
		this.cmpService.getUserSocials().subscribe( (res)=>{
		  const data = res[0];
		  this.cmpForm.patchValue({
			twitter_account: data["twitter_account"],
			linkedin_account: data["linkedin_account"],
			github_account: data["github_account"],
		  
		  })
	  })
	}
	  
	
		ngOnInit(): void {
		
	  }
	
	
		data: any;
	
	  onSubmit() {
			console.log("hi");
	
			this.cmpService.updateCmpData(this.cmpForm.value).subscribe(
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
	
	  removeSkill(){
	
	  }
	  
	
	  
}
