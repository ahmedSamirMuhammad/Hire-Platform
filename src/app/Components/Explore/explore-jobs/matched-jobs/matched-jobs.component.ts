import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-matched-jobs',
  templateUrl: './matched-jobs.component.html',
  styleUrls: ['./matched-jobs.component.scss'],
})
export class MatchedJobsComponent {
  @Input() matched_job: any;
}
