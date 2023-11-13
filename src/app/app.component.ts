import { Component ,OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { RouteService } from "./services/route.service";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	token: string;
	title = "HirePlatform";
	footerShow = true;

	isHomePage: boolean;
	constructor(private spinner: NgxSpinnerService, private router: Router , private route: ActivatedRoute, private routeService: RouteService) {}

	ngOnInit() {
		//using spinner
		this.spinner.show();

		setTimeout(() => {
			/** spinner ends after 1 seconds */
			this.spinner.hide();
		  }, 1000);
		  this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				let url: any = window.location.href;
				url = url.split("/");
				if (url.includes("dashboard")) {
					this.footerShow = false;
				} else {
					this.footerShow = true;
				}
			}
		});

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
			  const route = this.router.url;
			  this.routeService.updateCurrentRoute(route);
			}
		  })

		//to make header transparent in home only
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
			  this.isHomePage = this.router.url === '/';
			}
		  });


	  }
}
