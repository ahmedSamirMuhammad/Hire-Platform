import { Component } from '@angular/core';
import { Router, ActivatedRoute ,} from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent {

  jobForm: FormGroup;
  categories: any[] = []; // Declare the 'categories' property
   id:any;
   job:any;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private jobCrud: JobCrudService,
    private http: HttpClient,
		private toastr: ToastrService,
    private route: ActivatedRoute

  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    this.jobForm = this.formBuilder.group({
      name: ['' , [Validators.required , Validators.minLength(2)]],
      type: ['' , Validators.required],
      category_id: ['' , Validators.required],
      location: ['', Validators.required],
      max_salary: [''],
      min_salary: ['' , Validators.required],
      about: [''],
      logo: [''],
      experience: [''],
    });

    console.log(this.id);


		this.jobCrud.getJob(this.id).subscribe((res) => {
      this.job= res.data;
      const data = res.data;
		  this.jobForm.patchValue({
        name: data['name'],
        type: data['type'],
        category_id: data['category_id'],
        location: data['location'],
        max_salary: data['max_salary'],
        min_salary: data['min_salary'],
        about: data['about'],
        logo: data['logo'],
        experience: data['experience'],
		  });
		});

  }

  onSubmit() {
    this.jobCrud.updateJob(this.id,this.jobForm.value).subscribe((res) => {
      console.log('edited successfully');
      this.router.navigate(["/company/dashboard/jobs"]);
      this.toastr.success(
      JSON.stringify("Edited successfully"),
      JSON.stringify(res.status),
        {
          timeOut: 2000,
          progressBar: true,
        }
      );
    }, (error) => {
      // Handle error here
      this.toastr.error("Invalid Data", "401", {
        timeOut: 5000,
        progressBar: true,
      });
    });
  }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    const apiUrl = `http://localhost:8000/api/Home/categories`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error) => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }


}
