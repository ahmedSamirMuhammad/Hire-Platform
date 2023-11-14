import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReviewsComponent } from "../reviews/reviews.component";
import { SummaryComponent } from "../summary/summary.component";
import { BookmarksComponent } from "../employee-dashboard/bookmarks/bookmarks.component";
import {FollowingsComponent }from "../employee-dashboard/followings/followings.component"
const routes: Routes = [
	{ path: "", redirectTo: "summary", pathMatch: "full" },
	{ path: "summary", component: SummaryComponent },
	{ path: "bookmarks", redirectTo: "bookmarks/1", pathMatch: "full" },
	{ path: "bookmarks/:page", component: BookmarksComponent },
	{ path: "reviews", redirectTo: "reviews/1", pathMatch: "full" },
	{ path: "reviews/:page", component: ReviewsComponent },
	{ path: "followings", redirectTo: "followings/1", pathMatch: "full" },
	{ path: "followings/:page", component: FollowingsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
