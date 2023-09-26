import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-openjobs',
  templateUrl: './company-openjobs.component.html',
  styleUrls: ['./company-openjobs.component.scss'],
})
export class CompanyOpenjobsComponent {
  @Input() open_job: any;
}
