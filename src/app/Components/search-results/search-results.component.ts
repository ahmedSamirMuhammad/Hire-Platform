import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {

  searchResults: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router:Router
  ) {}


  ngOnInit() {
    this.homeService.getArray().subscribe((data: any[]) => {
      this.searchResults = data;
      console.log(this.searchResults);
    });
  }
  navigateToJobProfile(id: number) {
    this.router.navigate([`/job-profile/${id}`]);
  }


}
