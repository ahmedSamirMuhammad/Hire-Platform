import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
	providedIn: "root",
})
export class Crud2Service {
	api = "http://127.0.0.1:8000/api";



	constructor(private http: HttpClient) { }
	getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
		authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	});
	}
	getSummary(): Observable<any> {
		return this.http.get(`${this.api}/dashboard-home`,  { headers: this.getHeaders()});
	}
}
