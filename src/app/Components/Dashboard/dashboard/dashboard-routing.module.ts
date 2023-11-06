import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReviewsComponent } from "../reviews/reviews.component";
import { SummaryComponent } from "../summary/summary.component";
import { BookmarksComponent } from "../employee-dashboard/bookmarks/bookmarks.component";
const routes: Routes = [
	{ path: "", redirectTo: "summary", pathMatch: "full" },
	{ path: "summary", component: SummaryComponent },
	{ path: "bookmarks", redirectTo: "bookmarks/1", pathMatch: "full" },
	{ path: "bookmarks/:page", component: BookmarksComponent },
	{ path: "reviews", redirectTo: "reviews/1", pathMatch: "full" },
	{ path: "reviews/:page", component: ReviewsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
