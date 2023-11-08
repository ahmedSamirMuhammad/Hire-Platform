import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QueryStringService } from 'src/app/services/query-string.service';

@Component({
	selector: 'app-explore-companies',
	templateUrl: './explore-companies.component.html',
	styleUrls: ['./explore-companies.component.scss'],
})
export class ExploreCompaniesComponent implements OnInit {
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});
	company_list: Array<any> = [];
	filterForm: FormGroup;

	constructor(
		private companyService: CompanyService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private queryStringService: QueryStringService,
		private router: Router
	) {
		this.filterForm = this.formBuilder.group({
			company_name: [''],
			sort: [''],
		});
	}

	ngAfterViewInit() {
		const page = this.activatedRoute.snapshot.params['page'];
		const params = this.activatedRoute.snapshot.params['params'];

		if (params == '-') {
			this.getAllCompanies();
		} else {
			const filterInputs = this.queryStringService.parse(params);
			this.filterForm.setValue({
				company_name: filterInputs['company_name'],
				sort: filterInputs['sort'],
			});
			this.filter();
		}
	}

	ngOnInit() {
		this.getAllCompanies();
	}

	//<!---------- calling the function "getCompanies" from "company" service / Start -------------->
	getAllCompanies = () => {
		const page = this.activatedRoute.snapshot.params['page'];
		this.companyService.getCompanies(page).subscribe(
			(response: any) => {
				this.company_list = response.data.data;
				this.paginationData.next({
					current_page: response.data.current_page,
					last_page: response.data.last_page,
					onturn: this.getAllCompanies,
					url: `/explore-companies/-/1`,
					allowOnTurn: true,
					disable: false,
				});
			},
			(error: any) => {
				console.error('Error fetching companies', error);
			}
		);
	};
	//<!-------- calling the function "getCompanies" from "company" service  / End ---------------->

	initFilter() {
		const filterData = this.filterForm.value;
		return filterData;
	}

	initQueryString() {
		const filterData = this.initFilter();

		// Make the API call to get filtered jobs
		const params = new HttpParams({ fromObject: filterData });
		const params2 = {};

		params2['company_name'] = params.getAll('company_name')[0];
		params2['sort'] = params.getAll('sort')[0];
		return this.queryStringService.stringify(params2);
	}

	goFilter() {
		const stringifiedParams = this.initQueryString();
		this.router.navigate([`/explore-companies/${stringifiedParams}/1`]);
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
			this.getAllCompanies();
			return;
		}

		this.companyService.applyCompanyFilter(page, params).subscribe(
			(response: any) => {
				if (Array.isArray(response.data.data)) {
					// If it's an array, update jobs_array with the new filtered data
					this.company_list = response.data.data;
				} else {
					console.error('Received data is not an array.');
				}
				this.paginationData.next({
					current_page: response.data.current_page,
					last_page: response.data.last_page,
					onturn: this.turn,
					url: `/explore-companies/${stringifiedParams}/`,
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
}
