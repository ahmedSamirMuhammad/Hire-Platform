import { Component, Input } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-pagination",
	templateUrl: "./pagination.component.html",
	styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
	last_page;
	current_page;
	next_page;
	previous_page;
	route;
	page;
	@Input() paginationData: BehaviorSubject<any>;
	paginationData$;
	ngUnsubscribe: any = new Subject();

	constructor(
		private router: Router,
	) {}

	ngOnInit() {
		this.listenParentDataChanges();
		let url: any = this.router.url;
		url = url.split("/").slice(0, -1);
		url = url.join("/");
		this.route = url;
	}
	listenParentDataChanges() {
		if (this.paginationData) {
			this.paginationData.asObservable().subscribe((paginationData) => {
				this.initPagination(paginationData);

				this.paginationData$ = paginationData;
			});
		}
	}
	initPagination(paginationData) {
		if (
			paginationData.current_page > paginationData.last_page &&
			+paginationData.current_page
		) {
			this.router.navigateByUrl(this.route);
		}

		this.previous_page = `${this.route}/${this.clamp(
			paginationData.current_page - 1,
			1,
			paginationData.last_page
		)}`;
		this.next_page = `${this.route}/${this.clamp(
			paginationData.current_page + 1,
			1,
			paginationData.last_page
		)}`;
		this.last_page = paginationData.last_page;
		this.current_page = paginationData.current_page;
	}

	nextPage() {
		this.router
			.navigateByUrl("/", { skipLocationChange: true })
			.then(() => {
				this.router.navigate([this.next_page]); // navigate to same route
			});
			console.log(this.next_page);
	}
	prevPage() {
		this.router
			.navigateByUrl("/", { skipLocationChange: true })
			.then(() => {
				this.router.navigate([this.previous_page]); // navigate to same route
			});
	}
	clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}
	goTo() {
		this.router
			.navigateByUrl("/", { skipLocationChange: true })
			.then(() => {
				this.router.navigate([
					`${this.route}/${this.clamp(this.page, 1, this.last_page)}`,
				]); // navigate to same route
			});
	}
}
