import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-titlebar',
  templateUrl: './company-titlebar.component.html',
  styleUrls: ['./company-titlebar.component.scss']
})
export class CompanyTitlebarComponent {
  @Input() company_data: any;

  getFilledStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
