import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-jobs',
  templateUrl: './explore-jobs.component.html',
  styleUrls: ['./explore-jobs.component.scss'],
})
export class ExploreJobsComponent {
  jobs_array: Array<any> = [
    {
      logo: '/assets/images/company-logo-01.png',
      title: 'Bilingual Event Support Specialist',
      company_name: 'Hexagon',
      location: 'Cairo',
      type: 'Full-Time',
      date: '12 August 2022',
    },
    {
      logo: '/assets/images/company-logo-placeholder.png',
      title: 'Competition Law Officer',
      company_name: 'Laxo',
      location: 'Alexandria',
      type: 'Part-Time',
      date: '20 May 2023',
    },
    {
      logo: '/assets/images/company-logo-02.png',
      title: 'Barista and Cashier',
      company_name: 'Coffee',
      location: 'Giza',
      type: 'Intership',
      date: '02 November 2023',
    },
    {
      logo: '/assets/images/company-logo-03.png',
      title: 'Restaurant General Manager',
      company_name: 'King',
      location: 'Luxor',
      type: 'Contract',
      date: '30 January 2023',
    },
    {
      logo: '/assets/images/company-logo-04.png',
      title: 'Administrative Assistant',
      company_name: 'Mates',
      location: 'New Capital City',
      type: 'Full-Time',
      date: '07 June 2023',
    },
  ];
}
