import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
  constructor(private homeService: HomeService , private http: HttpClient , private router: Router) { }
  query: string = '';
  location: string = '';
  numberOfJobs!: number;


  ngOnInit() {
    this.getNumberOfJobs();

  }


  search() {
    this.homeService.search(this.query, this.location).subscribe((response: any) => {
      if (response.status === 200) {
        // Update the searchArray in HomeService
        this.homeService.updateArray(response.data);
        console.log(response);

        // Navigate to the searchresults component
        this.router.navigate(['/search-results']);
      } else {
        console.log(response.message);
      }
    });
  }

  getNumberOfJobs(){
    this.homeService.getNumberOfJobs()
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.numberOfJobs = response.data || 0;
        } else {
          console.error(response.message);
        }
      });
  }
}



