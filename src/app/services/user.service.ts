import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class UserService {


// **
// All Apis

	userApi: string = "http://localhost:8000/api/userSettings";

	SkillsApi:string = 'http://localhost:8000/api/getAllSkills';

	userSkills:string = 'http://localhost:8000/api/getUserSkills';

	removeSkillApi:string = 'http://localhost:8000/api/destroySkill';

	userSocials:string = 'http://localhost:8000/api/socials';

	userAppliedJobs:string = 'http://localhost:8000/api/userAppliedJobs';
// **

	constructor(private httpClient: HttpClient) {}
//common methods
// *****
  getHeaders() {
		const token = localStorage.getItem("token");
		return new HttpHeaders({
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		});
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

//end common methods
// *****

//user Data methods
// *****
	getUserData():Observable<any>{
	  let APIUrl = `${this.userApi}`;
	  return this.httpClient.get(APIUrl,{
		headers: this.getHeaders(),
	})
	  .pipe(map(
		(res:any)=>{
		  return res || {};
		}
		),
		catchError(this.handelError)
		);
	}

	updateUserData(data: any): Observable<any> {
		let APIUrl = `${this.userApi}`;
		return this.httpClient
			.put(APIUrl, data, {
				headers: this.getHeaders(),
			})
			.pipe(catchError(this.handelError));
	}

	deleteUser(): Observable<any> {
		let APIUrl = `${this.userApi}`;
		return this.httpClient
			.delete(APIUrl, {
				headers: this.getHeaders(),
			})
			.pipe(catchError(this.handelError));
	}

//end user data methods
// *****


//Skills methods
// *****
	getAllSkills():Observable<any>{
		let APIUrl = `${this.SkillsApi}`;
		return this.httpClient.get(APIUrl,{
		  headers: this.getHeaders(),
	  })
		.pipe(map(
		  (res:any)=>{
			return res || {};
		  }
		  ),
		  catchError(this.handelError)
		  );
	  }

	  getUserSkills():Observable<any>{
		let APIUrl = `${this.userSkills}`;
		return this.httpClient.get(APIUrl,{
		  headers: this.getHeaders(),
	  })
		.pipe(map(
		  (res:any)=>{
			return res || {};
		  }
		  ),
		  catchError(this.handelError)
		  );
	  }


	  removeSkill(id:any):Observable<any>{
		let APIUrl = `${this.removeSkillApi}/${id}`;
		return this.httpClient.delete(APIUrl,{
		  headers: this.getHeaders(),
	  })
		.pipe(map(
		  (res:any)=>{
			return res || {};
		  }
		  ),
		  catchError(this.handelError)
		  );
	  }


	  // end Skills methods
	  // *****

	  //Applied jobs
	  getUserAppliedJobs():Observable<any>{
		let APIUrl = `${this.userAppliedJobs}`;
		return this.httpClient.get(APIUrl,{
		  headers: this.getHeaders(),
	  })
		.pipe(map(
		  (res:any)=>{
			return res || {};
		  }
		  ),
		  catchError(this.handelError)
		  );
	  }






//Socials methods
// *****

	  getUserSocials():Observable<any>{
		let APIUrl = `${this.userSocials}`;
		return this.httpClient.get(APIUrl,{
		  headers: this.getHeaders(),
	  })
		.pipe(map(
		  (res:any)=>{
			return res || {};
		  }
		  ),
		  catchError(this.handelError)
		  );
	  }


}
