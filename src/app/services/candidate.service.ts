import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient :HttpClient) { }
  getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
	}

  candidatesApi:string = 'http://localhost:8000/api/candidates';

  httpHeaders = new HttpHeaders().set('content-Type','application/json');

  getAllCandidates():Observable<any>{
    
    return this.httpClient.get(this.candidatesApi , {
			headers: this.getHeaders(),
		});
  }



  deleteCandidate(id:any):Observable<any>{
    let APIUrl = `${this.candidatesApi}/${id}`;
    return this.httpClient.delete(APIUrl,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handelError)
      );
  }


  handelError(error:HttpErrorResponse){
    let errMsg = '';
    if(error.error instanceof ErrorEvent){
      errMsg = error.error.message;
    }else{
      errMsg = `Error Code :  ${error.status}`;
    }
    return throwError(errMsg); 
  }
}
