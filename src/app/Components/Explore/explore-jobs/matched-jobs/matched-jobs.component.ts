import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matched-jobs',
  templateUrl: './matched-jobs.component.html',
  styleUrls: ['./matched-jobs.component.scss'],
})
export class MatchedJobsComponent {
  @Input() matched_job: any;

  // Sending the job id to the (selected-job) profile page
  //initializing the "Router" service
  constructor(private router: Router) {}

  redirectToProfile(id: any) {
    this.router.navigate(['job-profile', id]);
  }
}
