import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class DashboardHttpService {
	api = "http://127.0.0.1:8000/api";

	constructor(private http: HttpClient) {}
	getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}
	getSummary(): Observable<any> {
		return this.http.get(`${this.api}/dashboard-home`, {
			headers: this.getHeaders(),
		});
	}
	getReviews(page): Observable<any> {
		return this.http.get(`${this.api}/dashboard-reviews?page=${page}`, {
			headers: this.getHeaders(),
		});
	}
	getBookmarks(page): Observable<any> {
		return this.http.get(`${this.api}/dashboard-bookmarks?page=${page}`, {
			headers: this.getHeaders(),
		});
	}
	deleteBookmark(jobId) {
		return this.http.delete(`${this.api}/dashboard-bookmarks/${jobId}`, {
			headers: this.getHeaders(),
		});
	}
	getReview(id: string): Observable<any> {
		return this.http.get(`${this.api}/dashboard-reviews/${id}`, {
			headers: this.getHeaders(),
		});
	}
	editReview(id,data: any) {
		return this.http.put(`${this.api}/dashboard-reviews/${id}`, data, {
			headers: this.getHeaders(),
		})
	}
	deleteReview(id) {
		return this.http.delete(`${this.api}/dashboard-reviews/${id}`, {
			headers: this.getHeaders(),
		});
	}

}
