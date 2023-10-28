import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient
  ) {
    this.jobForm = this.formBuilder.group({
      name: [''],
      type: [''],
      category_id: [''],
      location: [''],
      max_salary: [''],
      min_salary: [''],
      about: [''],
      logo: [''],
    });
  }

  onSubmit() {
    this.jobCrud.addJob(this.jobForm.value).subscribe(() => {
      console.log('added successfully');
      this.router.navigate(['/dashboard/jobs']);
    }, (err) => {
      //   console.log(err);
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
