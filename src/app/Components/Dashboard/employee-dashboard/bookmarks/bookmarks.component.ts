import { Component } from "@angular/core";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { BehaviorSubject } from "rxjs";
import { TimeService } from "src/app/services/time.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: "app-bookmarks",
	templateUrl: "./bookmarks.component.html",
	styleUrls: ["./bookmarks.component.scss"],
})
export class BookmarksComponent {
	bookmarks;
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});

	constructor(
		private dashboardHttpService: DashboardHttpService,
		private time: TimeService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private spinner:NgxSpinnerService
	) {}
	ngOnInit() {
		this.getBookmarks();
	}
	getBookmarks = () => {
		this.spinner.show();
		const page = this.activatedRoute.snapshot.params["page"];
		this.dashboardHttpService
			.getBookmarks(page)
			.subscribe((response: any) => {
				if (response.status === 200) {
					this.bookmarks = response.data.data.map((bookmark) => {
						bookmark.created_at = this.time.timeAgo(
							bookmark.created_at
						);
						return bookmark;
					});
					this.paginationData.next({
						current_page: response.data.current_page,
						last_page: response.data.last_page,
						onturn: this.getBookmarks,
						url: `/dashboard/bookmarks/1`,
						allowOnTurn: true,
						disable: false,
					});
						this.spinner.hide();
				} else {
					console.error(response.message);
					this.spinner.hide();
				}
			});
	}
	deleteBookmark(jobId) {
		this.dashboardHttpService
			.deleteBookmark(jobId)
			.subscribe((response: any) => {
				console.log(response);
				if (response.status === 200) {
					this.redirectTo(this.router.url);
					this.toastr.success(
						'The bookmark was deleted successfully',
						'200',
						{
							timeOut: 2000,
							progressBar: true,
						}
					);
				} else {
					console.error(response.message);
				}
			});
	}
	redirectTo(uri: string) {
		this.router
			.navigateByUrl("/", { skipLocationChange: true })
			.then(() => {
				this.router.navigate([uri]);
			});
	}
}
