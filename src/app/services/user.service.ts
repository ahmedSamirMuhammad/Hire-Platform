import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private httpClient: HttpClient) {}

	userApi: string = "http://localhost:8000/api/userSettings";

	httpHeaders = new HttpHeaders().set("content-Type", "application/json");

	getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}

	getUserData(): Observable<any> {
		let APIUrl = `${this.userApi}`;
		return this.httpClient
			.get(APIUrl, {
				headers: this.getHeaders(),
			})
			.pipe(
				map((res: any) => {
					return res || {};
				}),
				catchError(this.handelError)
			);
	}

	updateUserData(data: any): Observable<any> {
		let APIUrl = `${this.userApi}`;
		return this.httpClient
			.put(APIUrl, data, {
				headers: this.getHeaders(),
			})
			.pipe(catchError(this.handelError));
	}

	deleteUser(): Observable<any> {
		let APIUrl = `${this.userApi}`;
		return this.httpClient
			.delete(APIUrl, {
				headers: this.getHeaders(),
			})
			.pipe(catchError(this.handelError));
	}

	handelError(error: HttpErrorResponse) {
		let errMsg = "";
		if (error.error instanceof ErrorEvent) {
			errMsg = error.error.message;
		} else {
			errMsg = `Error Code :  ${error.status}`;
		}
		return throwError(errMsg);
	}
}
