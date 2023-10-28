import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UserService {
	userType: string = "";
	api = "http://127.0.0.1:8000/api";
	constructor(private http: HttpClient) {}
	getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}
	getUserType() {
		const token = localStorage.getItem("token");
		const headers = new HttpHeaders()
			.set("Content-Type", "application/json")
			.set("Authorization", `Bearer ${token}`);
		this.http
			.post(`${this.api}/get-user-type`,'', { headers })
			.subscribe((response: any) => {
				if (response.status === 200) {
					this.userType = response.data.type;
					console.log(response);
				} else {
					console.error(response.message);
				}
			});
		return this.userType;
	}
}
