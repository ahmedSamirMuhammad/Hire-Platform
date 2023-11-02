import { Component ,OnInit } from "@angular/core";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	token: string;
	title = "HirePlatform";
	ngOnInit() {
		if (!sessionStorage.getItem('isPageRefreshed')) {
			sessionStorage.setItem('isPageRefreshed', 'true');
		   // This will reload page once prevent reloading of page again for that session.
			window.location.reload();

		}
	  }
}
