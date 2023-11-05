import { Component, Input } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Router, NavigationEnd } from "@angular/router";
import {
	FormBuilder,
	FormGroup,
	Validators,
	ValidatorFn,
	AbstractControl,
} from "@angular/forms";
@Component({
	selector: "app-pagination",
	templateUrl: "./pagination.component.html",
	styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
	form: FormGroup;
	last_page;
	current_page;
	next_page;
	previous_page;
	route;
	page;
	onturn;
	allowOnTurn;
	@Input() paginationData: BehaviorSubject<any>;
	paginationData$;
	ngUnsubscribe: any = new Subject();

	constructor(private router: Router,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.form = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});
		this.listenParentDataChanges();
	}
	listenParentDataChanges() {
		if (this.paginationData) {
			this.paginationData.asObservable().subscribe((paginationData) => {
				this.initPagination(paginationData);

				this.paginationData$ = paginationData;
			});
		}
	}
	initPagination(paginationData: any) {
		if (typeof paginationData.url == "undefined") return;
		if (paginationData.disable) return;
		let url: any = paginationData.url;
		url = url.split("/").slice(0, -1);
		url = url.join("/");
		this.route = url;
		this.previous_page = this.clamp(
			paginationData.current_page - 1,
			1,
			paginationData.last_page
		);
		this.next_page = this.clamp(
			paginationData.current_page + 1,
			1,
			paginationData.last_page
		);
		this.last_page = paginationData.last_page;
		this.current_page = paginationData.current_page;
		this.onturn = paginationData.onturn;
		this.allowOnTurn = paginationData.allowOnTurn;
	}

	nextPage() {
		// this.router
		// 	.navigateByUrl("/", { skipLocationChange: true })
		// 	.then(() => {
		// 		this.router.navigate(); // navigate to same route
		// 	});
		if (this.next_page === this.current_page) return;
		const nextPage = `${this.route}/${this.next_page}`;
		this.router.navigate([nextPage]);
		if (this.onturn) this.onturn();

	}
	prevPage() {
		if (this.previous_page === this.current_page) return;
		const prevPage = `${this.route}/${this.previous_page}`;
		this.router.navigate([prevPage]);
		if (this.onturn) this.onturn();
	}
	goTo() {
		let pageNumber = this.clamp(this.page, 1, this.last_page);
		let page = `${this.route}/${pageNumber}`;
		this.router.navigate([page]);
		this.current_page = pageNumber;
		if (this.onturn) this.onturn();
	}
	clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}
}
