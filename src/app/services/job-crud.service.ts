import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobCrudService {

  constructor(private httpClient :HttpClient) { }

  jobApi:string = 'http://localhost:8000/api/jobs';

  httpHeaders = new HttpHeaders().set('content-Type','application/json');

  getAllJobs(headers:any):Observable<any>{
    
    return this.httpClient.get(this.jobApi);
  }

  addJob(data:any):Observable<any>{
    let APIUrl = this.jobApi;
    return this.httpClient.post(APIUrl,data).pipe(catchError(this.handelError));
  }


  getJob(id:any):Observable<any>{
    let APIUrl = `${this.jobApi}/${id}`;
    return this.httpClient.get(APIUrl,{headers:this.httpHeaders})
    .pipe(map(
      (res:any)=>{
        return res || {};
      } 
      ),
      catchError(this.handelError)
      );
  }

  updateJob(id:any , data:any):Observable<any>{
    let APIUrl = `${this.jobApi}/${id}`;
    return this.httpClient.put(APIUrl,data,{headers:this.httpHeaders})
    .pipe(
      catchError(this.handelError)
      );
  }

  deleteJob(id:any):Observable<any>{
    let APIUrl = `${this.jobApi}/${id}`;
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
