

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
  userFormData : FormData


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

    this.userFormData.append('name',this.jobForm.get('name').value)
    this.userFormData.append('type',this.jobForm.get('type').value)
    this.userFormData.append('category_id',this.jobForm.get('category_id').value)
    this.userFormData.append('location',this.jobForm.get('location').value)
    this.userFormData.append('max_salary',this.jobForm.get('max_salary').value)
    this.userFormData.append('min_salary',this.jobForm.get('min_salary').value)
    this.userFormData.append('about',this.jobForm.get('about').value)
    this.userFormData.append('experience',this.jobForm.get('experience').value)

    if(this.jobForm.valid) {

      this.jobCrud.addJob(this.userFormData).subscribe((res) => {
		console.log(this.jobForm);
        console.log('added successfully');

            if (res.status === 200) {
              this.router.navigate(["/company/dashboard/jobs"]);
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
	selected(event: any) {
		const selectedFiles = event.target.files[0];
		this.userFormData = new FormData
		 this.userFormData.append('logo',selectedFiles)


	  }
}
