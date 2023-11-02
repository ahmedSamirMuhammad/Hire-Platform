import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class QueryStringService {
	constructor() {}
	parse(queryString: string) {
		queryString = decodeURIComponent(queryString);

		const json = {};
		const parts = queryString.split("&");

		parts.forEach((part) => {
			const [key, value] = part.split("=");
			let decodedValue = decodeURIComponent(value);

			try {
				// Try to parse as JSON
				decodedValue = JSON.parse(decodedValue);
			} catch (e) {
				// If parsing fails, keep the original string
			}

			json[key] = decodedValue;
		});

		return json;

		// console.log(queryString);
		// const params = {};
		// queryString.split('&').forEach((param) => {
		// 	const [key, value] = param.split('=');
		// 	params[key] = JSON.parse(value);
		// });

		// return params;
	}

	stringify(params: any) {
		let queryString = "";

		Object.keys(params).forEach((key, index) => {
			let paramValue = params[key];

			if (Array.isArray(paramValue)) {
				paramValue = JSON.stringify(paramValue);
			}

			queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
				paramValue
			)}`;

			if (index < Object.keys(params).length - 1) {
				queryString += "&";
			}
		});

		queryString = queryString
			.split("&")
			.filter((x) => x != "")
			.join("&");

		if (!queryString) {
			queryString = "-";
		}
		return queryString;
	}
}
