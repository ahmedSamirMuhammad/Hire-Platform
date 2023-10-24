import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-companies',
  templateUrl: './explore-companies.component.html',
  styleUrls: ['./explore-companies.component.scss'],
})
export class ExploreCompaniesComponent {
  company_list: Array<any> = [
    {
      id: 1,
      name: 'company one',
      logo: '/assets/images/company-logo-placeholder.png',
      rating: 5,
    },
    {
      id: 2,
      name: 'company two',
      logo: '/assets/images/company-logo-placeholder.png',
      rating: 3,
    },
    {
      id: 3,
      name: 'company three',
      logo: '/assets/images/company-logo-placeholder.png',
      rating: 4,
    },
    {
      id: 4,
      name: 'company four',
      logo: '/assets/images/company-logo-placeholder.png',
      rating: 3,
    },
    {
      id: 5,
      name: 'company five',
      logo: '/assets/images/company-logo-placeholder.png',
      rating: 5,
    },
    {
      id: 6,
      name: 'company six',
      logo: '/assets/images/company-logo-placeholder.png',
      rating: 4,
    },
  ];
}
