import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from 'src/environments';
import { BehaviorSubject, Observable} from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router"; 

@Component({
  selector: 'app-explore-jobs',
  templateUrl: './explore-jobs.component.html',
  styleUrls: ['./explore-jobs.component.scss'],
})
export class ExploreJobsComponent implements OnInit{
  paginationData: BehaviorSubject<any> = new BehaviorSubject({});
  filterForm: FormGroup;
  categories: Observable<string[]>;
  jobs_array: Array<any> = [];


  constructor(private catService: CategoryService, private jobService: JobService, private httpClient: HttpClient,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.filterForm = this.formBuilder.group({
      location: [''],
      category_name: [''],
      categories: [[]],
      experience: [''],
      sort: [''],
      full_time: false,
      part_time: false,
      contract: false,
      temporary: false,
      internship: false,
      min_salary:[''],
      max_salary:[''],
      type: [],
    });
    
    this.categories = this.catService.getCategories().pipe(
      map((response: any) => {
        if (response.status === 202) {
          return response.data.map((category: any) => category.name);
        } else {
          throw new Error('Error fetching categories: Unexpected response status');
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching categories', error);
        throw error;
      })
    );
  
    this.categories.subscribe((categories: string[]) => {
      console.log(categories); // Log categories here
    });
  }

  ngOnInit() {
    const page = this.activatedRoute.snapshot.params["page"];

    //<!---------- calling the function "getCategories" from "category" service / Start -------------->




    // this.catService.getCategories().subscribe(
    //   (response: any) => {
    //     console.log(this.categories);
    //     this.categories = response.data.map((category: any) => category.name);
    //     console.log(this.categories);
    //   },
    //   (error: any) => {
    //     console.error('Error fetching categories', error);
    //   }
    // );
    //<!-------- calling the function "getCategories" from "category" service  / End ---------------->

    this.loadAllJobs(page);
  }

  updateTypeSelection(event: Event, typeName: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.filterForm.get(typeName)?.setValue(isChecked);
  }
  
  //<!---------- calling the function "getJobs" from "job" service / Start -------------->
  loadAllJobs(page: number) {
    this.jobService.getJobs(page).subscribe(
      (response: any) => {
        this.jobs_array = response.data.data;
        this.paginationData.next({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      },
      (error: any) => {
        console.error('Error fetching jobs', error);
      }
    );
  }
  //<!-------- calling the function "getJobs" from "job" service  / End ---------------->


  filter() {
    const filterData = this.filterForm.value;
    console.log('Filter Data:', filterData);
    const selectedTypes = [];
  
    if (filterData.full_time) selectedTypes.push('full_time');
    if (filterData.part_time) selectedTypes.push('part_time');
    if (filterData.contract) selectedTypes.push('contract');
    if (filterData.temporary) selectedTypes.push('temporary');
    if (filterData.internship) selectedTypes.push('internship');
  
    // Assign the selected types as an array to the "type" property
    filterData['type[]'] = selectedTypes;
  
    // Remove individual type properties from the filterData
    delete filterData.full_time;
    delete filterData.part_time;
    delete filterData.contract;
    delete filterData.temporary;
    delete filterData.internship;
  
    filterData.type = selectedTypes;
  
    const params = new HttpParams({ fromObject: filterData });
  
    // Make the API call to get filtered jobs
    this.httpClient.get('http://127.0.0.1:8000/api/jobs/apply', { params })
      .subscribe((response: any) => {
        console.log('Filter Data:', response);
  
        // Check if the 'data' field in the response is an array
        if (Array.isArray(response.data)) {
          // If it's an array, update jobs_array with the new filtered data
          this.jobs_array = response.data;
        } else {
          console.error('Received data is not an array.');
        }
      });
  }
  

  toggleBookmark(jobId: number) {
    // Send a request to toggle the job bookmark
    this.jobService.JobBookmark(jobId).subscribe(
      (response) => {
        // Handle success response here
        if (response.msg === 'Job bookmarked successfully' || response.msg === 'Job unbookmarked successfully') {
          // Find the job in open_jobs_list array and update its is_bookmarked property
          const job = this.jobs_array.find((j) => j.id === jobId);
          if (job) {
            job.is_bookmarked = !job.is_bookmarked;
          }
        } else {
          // Handle other possible responses or show an error message
        }
      },
      (error) => {
        // Handle error response here
        console.error('Error toggling job bookmark', error);
      }
    );
  }


    //<!---------- calling the function "resetFilters" / Start -------------->
  resetFilters() {
    // Reset the form to its initial state
    this.filterForm.reset();

    // Fetch all jobs again with the current page number
    const page = this.activatedRoute.snapshot.params["page"];
    this.loadAllJobs(page);
  }
    //<!-------- calling the function "resetFilters"  / End ---------------->
}