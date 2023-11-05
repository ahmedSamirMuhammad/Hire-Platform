import { Component, Input } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router , ActivatedRoute } from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {
	storedRole: string = localStorage.getItem("role");

  isexpired :boolean = false;
  isApproved : boolean = false;
  isPending: boolean = true;

  @Input() job :any;
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private jobCrud:JobCrudService,
    private location: Location
  ){

  }

  deleteJob(id:any){

    this.jobCrud.deleteJob(id).subscribe((res) => {
      console.log('deleted successfully');
      // this.router.navigate(["/dashboard/jobs"]);
      window.location.reload();
      this.toastr.success(
        JSON.stringify("Deleted successfully"),
        JSON.stringify(res.status),
        {
          timeOut: 2000,
          progressBar: true,
        }

        );
        this.location.go(this.location.path());
    }, (error) => {
      // Handle error here
      this.toastr.error("Error with your credentials", "401", {
        timeOut: 5000,
        progressBar: true,
      });
    });

  }
}
