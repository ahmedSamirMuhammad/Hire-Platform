import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class ApplyToJobService {

  constructor(private http: HttpClient) {}

  getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}

  applyForJob(jobId: string): Observable<any> {
    const apiUrl = `${environment.API_URL}/job-profile/${jobId}/apply`;
    return this.http.post(apiUrl, null, {headers: this.getHeaders()});
  }
}
