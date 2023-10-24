import { Component } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent {
  //<-- company-open-jobs list / Start-->

  open_jobs_list: Array<any> = [
    {
      title: 'Restaurant General Manager',
      location: 'Cairo',
      type: 'Full-Time',
      post_date: '2023-08-12',
    },
    {
      title: 'Bilingual Event Support Specialist',
      location: 'Alexandria',
      type: 'Part-Time',
      post_date: '2023-07-29',
    },
    {
      title: 'Human Resources Consultant',
      location: 'Luxor',
      type: 'Contract',
      post_date: '2023-09-22',
    },
    {
      title: 'Construction Labourers',
      location: 'El-Fayum',
      type: 'Intership',
      post_date: '2023-08-30',
    },
  ];
  //<-- company-open-jobs list / End-->
  //<-- company-reviews list / Start -->

  company_reviews: Array<any> = [
    {
      title: 'Outstanding Work Environment',
      holder: '7ambola',
      date: 'January 2023',
      description:
        "They do business with integrity and rational thinking. Overall, it's an excellent place to work, with products that are winning in the marketplace.",
      rating: 4.5,
    },
    {
      title: 'Doing things the right way',
      holder: 'Anonymous Employee',
      date: 'August 2022',
      description:
        'Great company and especially ideal for the career-minded individual. The company is large enough to offer a variety of jobs in all kinds of interesting locations. Even if you never change roles, your job changes and evolves as the company grows, keeping things fresh.',
      rating: 5,
    },
    {
      title: 'Good Place',
      holder: 'Anonymous Employee',
      date: 'June 2020',
      description: 'Good place to start with.',
      rating: 3.5,
    },
    {
      title: 'Excellent Workspace',
      holder: '3am zain',
      date: 'December 2015',
      description: 'Agmad company fel donia',
      rating: 4,
    },
  ];
  //<-- company-reviews list / End -->
}
