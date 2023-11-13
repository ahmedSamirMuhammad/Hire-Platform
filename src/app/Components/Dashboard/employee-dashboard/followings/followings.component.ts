import { Component } from "@angular/core";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { BehaviorSubject } from "rxjs";
import { TimeService } from "src/app/services/time.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-followings',
  templateUrl: './followings.component.html',
  styleUrls: ['./followings.component.scss']
})
export class FollowingsComponent {
	followings;
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});
	constructor(
		private dashboardHttpService: DashboardHttpService,
		private time: TimeService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private toastr: ToastrService,
		private spinner:NgxSpinnerService
	) { }
		ngOnInit() {
		this.getFollowings();
	}
	getFollowings = () => {
		this.spinner.show();
		const page = this.activatedRoute.snapshot.params["page"];
		this.dashboardHttpService
			.getFollowings(page)
			.subscribe((response: any) => {
				if (response.status === 200) {
					this.followings = response.data.data
					this.paginationData.next({
						current_page: response.data.current_page,
						last_page: response.data.last_page,
						onturn: this.getFollowings,
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
	unfollow(id) {
		this.dashboardHttpService
			.unfollow(id)
			.subscribe((response: any) => {
				console.log(response)
				if (response.status === 201) {
					this.redirectTo(this.router.url);
					this.toastr.success(
						'you unfollowed the company successfully',
						'200',
						{
							timeOut: 2000,
							progressBar: true,
						}
					);
				} else {
					this.toastr.error(
						'error happened',
						'200',
						{
							timeOut: 2000,
							progressBar: true,
						}
					);
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
