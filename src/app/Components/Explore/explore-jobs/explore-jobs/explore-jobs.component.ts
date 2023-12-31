import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { CategoryService } from 'src/app/services/category.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { QueryStringService } from 'src/app/services/query-string.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-explore-jobs',
	templateUrl: './explore-jobs.component.html',
	styleUrls: ['./explore-jobs.component.scss'],
})
export class ExploreJobsComponent implements OnInit {
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});
	filterForm: FormGroup;
	categories: Array<any> = [];
	jobs_array: Array<any> = [];
	is_authenticated: any;

	constructor(
		private catService: CategoryService,
		private jobService: JobService,
		private httpClient: HttpClient,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private queryStringService: QueryStringService,
		private router: Router,
		private location: Location,
		private toastr: ToastrService,
		private spinner:NgxSpinnerService
	) {
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
			min_salary: [''],
			max_salary: [''],
			type: [],
		});
	}

	ngAfterViewInit() {
		const page = this.activatedRoute.snapshot.params['page'];
		const params = this.activatedRoute.snapshot.params['params'];

		if (params == '-') {
			this.loadAllJobs();
		} else {

			const filterInputs = this.queryStringService.parse(params);
			this.filterForm.setValue({
				location: filterInputs['location'],
				category_name: filterInputs['category_name'],
				categories: [[]],
				experience: filterInputs['experience'],
				sort: filterInputs['sort'],
				min_salary: filterInputs['min_salary'],
				max_salary: filterInputs['max_salary'],
				type: filterInputs['type'], //! this one is not functioning
				full_time: false,
				part_time: false,
				contract: false,
				temporary: false,
				internship: false,
			});
			this.filter();
		}
	}

	ngOnInit() {
		this.spinner.show();

		//<!---------- calling the function "getCategories" from "category" service / Start -------------->
		this.catService.getCategories().subscribe(
			(response: any) => {
				if (response.status === 202) {
					this.categories = response.data.map(
						(category: any) => category.name
					);
				} else {
					console.error(
						'Error fetching categories: Unexpected response status'
					);
				}
			},
			(error: any) => {
				console.error('Error fetching categories', error);
			}
		);
		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		}, 1000);
		//<!-------- calling the function "getCategories" from "category" service  / End ---------------->
	}

	updateTypeSelection(event: Event, typeName: string) {
		const isChecked = (event.target as HTMLInputElement).checked;
		this.filterForm.get(typeName)?.setValue(isChecked);
	}

	//<!---------- calling the function "getJobs" from "job" service / Start -------------->
	loadAllJobs = () => {
		const page = this.activatedRoute.snapshot.params['page'];
		this.jobService.getJobs(page).subscribe(
			(response: any) => {
				console.log(response);
				this.jobs_array = response.data.data;
				this.paginationData.next({
					current_page: response.data.current_page,
					last_page: response.data.last_page,
					onturn: this.loadAllJobs,
					url: `/explore-jobs/-/1`,
					allowOnTurn: true,
					disable: false,
				});
			this.is_authenticated = response.data.is_authenticated;
			},
			(error: any) => {
				console.error('Error fetching jobs', error);
			}
		);
	};
	//<!-------- calling the function "getJobs" from "job" service  / End ---------------->
	initFilter() {
		const filterData = this.filterForm.value;
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

		return filterData;
	}
	initQueryString() {
		const filterData = this.initFilter();
		// Make the API call to get filtered jobs
		const params = new HttpParams({ fromObject: filterData });

		const params2 = {};
		params2['location'] = params.getAll('location')[0];
		params2['category_name'] = params.getAll('category_name')[0];
		params2['experience'] = params.getAll('experience')[0];
		params2['sort'] = params.getAll('sort')[0];
		params2['min_salary'] = params.getAll('min_salary')[0];
		params2['max_salary'] = params.getAll('max_salary')[0];
		params2['type'] = params.getAll('type');
		console.log(this.queryStringService.stringify(params2));
		return this.queryStringService.stringify(params2);
	}
	goFilter() {
		const stringifiedParams = this.initQueryString();
		this.router.navigate([`/explore-jobs/${stringifiedParams}/1`]);
		this.filter();
	}
	turn = () => {
		this.filter();
	};
	filter() {
		const filterData = this.initFilter();
		// Make the API call to get filtered jobs
		const params = new HttpParams({ fromObject: filterData });
		const page = this.activatedRoute.snapshot.params['page'];
		const stringifiedParams = this.initQueryString();

		if (!this.queryStringService.isFilled(stringifiedParams)) {
			this.loadAllJobs();
			return;
		}
		this.jobService.applyJobFilter(page, params).subscribe(
			(response: any) => {
				if (Array.isArray(response.data.data)) {
					// If it's an array, update jobs_array with the new filtered data
					this.jobs_array = response.data.data;
					console.log(this.jobs_array);
				} else {
					console.error('Received data is not an array.');
				}
				this.paginationData.next({
					current_page: response.data.current_page,
					last_page: response.data.last_page,
					onturn: this.turn,
					url: `/explore-jobs/${stringifiedParams}/`,
					allowOnTurn: true,
					disable: false,
				});
				// Check if the 'data' field in the response is an array
			},
			(error: any) => {
				console.error('Error fetching jobs', error);
				this.paginationData.next({
					disable: true,
				});
			}
		);
	}

	toggleBookmark(jobId: number) {
		// Send a request to toggle the job bookmark
		this.jobService.JobBookmark(jobId).subscribe(
			(response) => {
				// Handle success response here
				if (
					response.msg === 'Job bookmarked successfully' ||
					response.msg === 'Job unbookmarked successfully'
				) {
					// Find the job in open_jobs_list array and update its is_bookmarked property
					const job = this.jobs_array.find((j) => j.job_id === jobId);
					if (job) {
						job.is_bookmarked = !job.is_bookmarked;

						this.toastr.success(response.msg, '200', {
							timeOut: 2000,
							progressBar: true,
						});
					}
				} else {
					console.log('Error getting job selected !');
				}
			},
			(error) => {
				this.toastr.error('Error bookmarking job', '401', {
					timeOut: 2000,
					progressBar: true,
				});
			}
		);
	}

	//<!---------- calling the function "resetFilters" / Start -------------->
	resetFilters() {
		// Set the form controls to their initial values
		this.filterForm.patchValue({
			location: '',
			category_name: '',
			experience: '',
			sort: '',
			min_salary: '',
			max_salary: '',
			type: [],
			full_time: false,
			part_time: false,
			contract: false,
			temporary: false,
			internship: false,
		});
		this.router.navigate([`/explore-jobs/-/1`]);
		this.loadAllJobs();
	}
	//<!-------- calling the function "resetFilters"  / End ---------------->
}
