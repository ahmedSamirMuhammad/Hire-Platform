import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
//spinner
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent {
	jobForm: FormGroup;
	categories: any[] = []; // Declare the 'categories' property


	constructor(
	  public formBuilder: FormBuilder,
	  private router: Router,
	  private ngZone: NgZone,
	  private jobCrud: JobCrudService,
	  private http: HttpClient,
	  private toastr: ToastrService,
	  private spinner:NgxSpinnerService

	) {
	  this.jobForm = this.formBuilder.group({
		name: ['', [Validators.required , Validators.minLength(2)]],
		type: ['' , Validators.required],
		category_id: ['' , Validators.required],
		location: ['' ,Validators.required],
		max_salary: ['' , ],
		min_salary: [''],
		about: ['' , Validators.required],
		logo: [''],
		experience: [''],
	  });
	}

	onSubmit() {

	  if(this.jobForm.valid) {

		this.jobCrud.addJob(this.jobForm.value).subscribe((res) => {
		  console.log('added successfully');

			  if (res.status === 200) {
				this.router.navigate(["/dashboard/jobs"]);
				this.toastr.success(
				  JSON.stringify("added successfully"),
				  JSON.stringify(res.status),
				  {
					timeOut: 2000,
					progressBar: true,
				  }
				);
			  }

			(error) => {
			  // Handle error here
			  this.toastr.error("Error with your credentials", "401", {
				timeOut: 5000,
				progressBar: true,
			  });
			}

		}, );
	  }
	  else{
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

	ngOnInit() {
	  this.fetchCategories();
	}

	fetchCategories() {
	  const apiUrl = `http://localhost:8000/api/Home/categories`;
	  this.spinner.show();
	  this.http.get(apiUrl).subscribe(

		(response: any) => {
		  this.categories = response.data;
		  setTimeout(() => {
			  /** spinner ends after 1 seconds */
			  this.spinner.hide();
			}, 1000);
		},
		(error) => {
		  console.error('Failed to fetch categories:', error);
		  setTimeout(() => {
			  /** spinner ends after 1 seconds */
			  this.spinner.hide();
			}, 1000);
		}
	  );

	}
}
