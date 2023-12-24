import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, Router } from '@angular/router';

import { TimeService } from 'src/app/services/time.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html'
})
export class SearchResultsComponent implements OnInit {

  searchResults: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private router:Router,
	private timeJob:TimeService,
  ) {}


  ngOnInit() {
    this.homeService.getArray().subscribe((data: any[]) => {
      this.searchResults = data.map((job)=>{
		job.postJob = this.timeJob.timeAgo(job.postJob)
		console.log(job.postJob)
		return job;

	  });
      console.log(this.searchResults);
    });
  }
  navigateToJobProfile(id: number) {
    this.router.navigate([`/job-profile/${id}`]);
  }


}

