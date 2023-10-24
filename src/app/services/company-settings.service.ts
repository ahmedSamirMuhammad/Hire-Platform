import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

  constructor(private httpClient :HttpClient) { }

  cmpApi:string = 'http://localhost:8000/api/companySettings';

  httpHeaders = new HttpHeaders().set('content-Type','application/json');

  getCmpData():Observable<any>{
	  let APIUrl = `${this.cmpApi}`;
	  return this.httpClient.get(APIUrl,{headers:this.httpHeaders})
	  .pipe(map(
		(res:any)=>{
		  return res || {};
		} 
		),
		catchError(this.handelError)
		);
	}

  updateCmpData(data:any):Observable<any>{
	  let APIUrl = `${this.cmpApi}`;
	  return this.httpClient.put(APIUrl,data,{headers:this.httpHeaders})
	  .pipe(
		catchError(this.handelError)
		);
	}
  
	deleteCmp():Observable<any>{
	  let APIUrl = `${this.cmpApi}`;
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
