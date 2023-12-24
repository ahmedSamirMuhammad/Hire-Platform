import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(private httpClient: HttpClient) {}


  getHeaders() {
    if (!localStorage.getItem("token")) return new HttpHeaders({});
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}

  getJobs(page: number): Observable<any> {
    const apiUrl = `${environment.API_URL}/jobs?page=${page}`;
    return this.httpClient.get(apiUrl, {headers: this.getHeaders()});
  }
  applyJobFilter(page: number,params: HttpParams): Observable<any> {
    const apiUrl = `${environment.API_URL}/jobs/apply?page=${page}`;
    return this.httpClient.get(apiUrl, { params });
  }

  getJobByID(id: number): Observable<any> {
    const apiUrl = `${environment.API_URL}/job-profile/${id}`;
    return this.httpClient.get(apiUrl, {headers: this.getHeaders()});
  }

  toggleJobBookmark(companyId: number, jobId: number): Observable<any> {
    const apiUrl = `${environment.API_URL}/companies/${companyId}/bookmark/${jobId}`;
    return this.httpClient.post(apiUrl, null, {headers: this.getHeaders()});
  }

  JobBookmark(jobId: number): Observable<any> {
    const apiUrl = `${environment.API_URL}/job-profile/${jobId}/bookmark`;
    return this.httpClient.post(apiUrl, null, {headers: this.getHeaders()});
  }
}
