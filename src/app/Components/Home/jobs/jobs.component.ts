import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  jobs: any[]=[];
constructor(private http:HttpClient){}

ngOnInit(){
  this.fetchJobs();
}
fetchJobs(){
  const API_URL = `${environment.API_URL}/Home/listJob`;
  this.http.get(API_URL).subscribe(
    (response: any) => {
      this.jobs = response.data;
    },
    (error) => {
      console.error('Failed to fetch jobs:', error);
    }

  )

}
}
