import { Component , OnInit } from "@angular/core";
import { JobCrudService } from "src/app/services/job-crud.service";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
	storedRole: string = localStorage.getItem("role");
	constructor(private jobCrud:JobCrudService,){
		
	}
	jobs:any;
	ngOnInit(){
		
		this.jobCrud.getAllJobs().subscribe( (res)=>{
			this.jobs = res.data;
			console.log(this.jobs);
			})
			
	}
}
