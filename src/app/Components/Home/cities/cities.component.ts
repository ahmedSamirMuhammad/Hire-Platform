import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit{
cities: any[]=[];

constructor(private http:HttpClient){}

ngOnInit(){
  this.fetchCities();
}

fetchCities(){
  const apiUrl =`${environment.API_URL}/Home/cities`;
  this.http.get(apiUrl).subscribe(
    (response: any) => {
      this.cities = response.data;
    },
    (error) => {
      console.error('Failed to fetch ceties:', error);
    }
  )
}
}
