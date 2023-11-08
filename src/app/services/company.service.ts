import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private httpClient: HttpClient) {}

  getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}

  getCompanies(page : number): Observable<any> {
    const apiUrl = `${environment.API_URL}/companies?page=${page}`;
    return this.httpClient.get(apiUrl , {headers: this.getHeaders()});
  }

  getCompanyByID(id: number): Observable<any> {
    const apiUrl = `${environment.API_URL}/companies/${id}`;
    return this.httpClient.get(apiUrl , {headers: this.getHeaders()});
  }

  applyCompanyFilter(page: number,params: HttpParams): Observable<any> {
    const apiUrl = `${environment.API_URL}/companies/apply?page=${page}`;
    return this.httpClient.get(apiUrl, { params });
  }
}
