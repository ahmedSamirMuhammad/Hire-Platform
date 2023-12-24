import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-about',
  templateUrl: './company-about.component.html',
  styleUrls: ['./company-about.component.scss']
})
export class CompanyAboutComponent {
  @Input() company_data: any;
}
