import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-explore-companies',
  templateUrl: './explore-companies.component.html',
  styleUrls: ['./explore-companies.component.scss'],
})
export class ExploreCompaniesComponent implements OnInit{
  paginationData: BehaviorSubject<any> = new BehaviorSubject({});
  company_list: Array<any> = [];

  constructor(private companyService: CompanyService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const page = this.activatedRoute.snapshot.params["page"];

    //<!---------- calling the function "getCompanies" from "company" service / Start -------------->
    this.companyService.getCompanies(page).subscribe(
      (response: any) => {
        this.company_list = response.data.data;
        
        this.paginationData.next( {
          current_page:response.data.current_page,
          last_page: response.data.last_page,
      });
      },
      (error: any) => {
        console.error('Error fetching companies', error);
      }
    );
  }
      //<!-------- calling the function "getCompanies" from "company" service  / End ---------------->
}
