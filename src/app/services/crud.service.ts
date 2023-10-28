import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class CrudService {

	constructor(private http: HttpClient) {

	}
	headers = new HttpHeaders().set("Content-Type", "application/json");
	getSummary() {
		console.log(this)
		let api = "http://127.0.0.1:8000/api";
		return this.http.get(`${api}/dashboard-home`);
		// return {
		// 	status: 200,
		// 	msg: "Data found",
		// 	data: {
		// 		jobs_number: 0,
		// 		reviews_number: 0,
		// 	},
		// };
	}
	getReviews() {
		// console.log(this.api)
		// return this.http.post(
		// 	this.api+'dashboard-home',
		// 	data
		// );
		return {
			status: 200,
			msg: "Data found",
			data:[ {
				title: "adssssssssss",
				comment: "asssssssssssss",
				rating: 3,
				company_id: 1,
				company_name: "company33",
				logo: null,
			}],
		};
	}
	getBookmarks() {
		return {
			status: 200,
			msg: "Data found",
			data: [
				{
					name: "aaaaaaaaaaaaaaaaaaaaaaaaa",
					type: "part_time",
					created_at: "2023-10-22T06:27:06.000000Z",
					logo: null,
					company_name: "company33",
					location: null,
				},
				{
					name: "aaaaaaaaaaaaaaaaaaaaaaaa",
					type: "part_time",
					created_at: "2023-10-22T06:27:06.000000Z",
					logo: null,
					company_name: "company33",
					location: null,
				},
				{
					name: "aaaaaaaaaaaaaaaaaaaaaaa",
					type: "part_time",
					created_at: "2023-10-22T06:27:06.000000Z",
					logo: null,
					company_name: "company33",
					location: null,
				},
			],
		};
	}
}
