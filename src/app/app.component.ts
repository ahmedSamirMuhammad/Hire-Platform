import { Component ,OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	token: string;
	title = "HirePlatform";
	constructor(private spinner: NgxSpinnerService) {}

	ngOnInit() {
		this.spinner.show();
		// if (!sessionStorage.getItem('isPageRefreshed')) {
		// 	sessionStorage.setItem('isPageRefreshed', 'true');
		//    // This will reload page once prevent reloading of page again for that session.
		// 	window.location.reload();

		// }
		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		  }, 2000);

	  }
}
