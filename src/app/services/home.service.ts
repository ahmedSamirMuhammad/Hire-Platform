import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   url = `${environment.API_URL}`;

   searchService: any[] = [];
   private searchArray = new BehaviorSubject([])

  constructor(private http: HttpClient ) { }
  getHeaders() {
	const token = localStorage.getItem("token");

	return new HttpHeaders({
		authorization: `Bearer ${token}`,
 	});
}

  search(query: string, location: string):Observable<any>{
    const params = { title: query, location: location }
    return this.http.get(`${this.url}/Home/search` , {params});
  }
  //to use in searchResult component to  get latest updated
  getArray(){
    return this.searchArray.asObservable()
  }

  //to use in indexComponent to update with latest search
  updateArray(value:any){
    return this.searchArray.next(value)
  }

  //number of jobs
  getNumberOfJobs(): Observable<any> {
    return this.http.get(`${this.url}/Home/jobs`);

  }
  headerUser(): Observable<any> {
	return this.http.get(`${this.url}/Home/headerUser`, {
	  headers: this.getHeaders(),
	}).pipe(
	  map((res: any) => {
		return res.data || {}; // Assuming `data` contains the `id` value
	  }),
	  catchError((error: any) => {
		console.error('Error fetching user:', error);
		return throwError('Error fetching user');
	  })
	);
  }
}


