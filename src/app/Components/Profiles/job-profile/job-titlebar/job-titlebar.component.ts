import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-titlebar',
  templateUrl: './job-titlebar.component.html',
  styleUrls: ['./job-titlebar.component.scss']
})
export class JobTitlebarComponent {
  @Input() jobData: any;

  getFilledStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
