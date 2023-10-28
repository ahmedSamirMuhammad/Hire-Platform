import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}

  getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}

  addReview(id: string, reviewData: any): Observable<any> {
    const apiUrl = `${environment.API_URL}/companies/${id}/review`;
    return this.http.post(apiUrl, reviewData , {headers: this.getHeaders()});
  }
}
