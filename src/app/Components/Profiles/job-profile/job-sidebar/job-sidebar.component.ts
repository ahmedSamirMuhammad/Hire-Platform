import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplyToJobService } from 'src/app/services/apply-to-job.service';
import { JobService } from 'src/app/services/job.service';
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-job-sidebar',
  templateUrl: './job-sidebar.component.html',
  styleUrls: ['./job-sidebar.component.scss']
})
export class JobSidebarComponent {
  @Input() jobData: any;
  @Output() toggleBookmark = new EventEmitter<void>();
  userType = "cmp";

  constructor(private applyToJobService: ApplyToJobService, private jobService: JobService, private toastr: ToastrService, private spinner:NgxSpinnerService) {}

  ngOnInit(){
    // get the role of the current user
    this.userType = localStorage.getItem('role');
  }

  applyForJob(jobId: string) {
	this.spinner.show();
    this.applyToJobService.applyForJob(jobId).subscribe(
      (response) => {
        this.toastr.success(
          "Application sent successfully",
          '200',
          {
              timeOut: 2000,
              progressBar: true,
          }
      );
	  setTimeout(() => {
		/** spinner ends after 5 seconds */
		this.spinner.hide();
	}, 1000);
      },
      (error) => {
        this.toastr.error(
          "You've applied for this job before",
          '401',
          {
              timeOut: 2000,
              progressBar: true,
          }
      );
	  setTimeout(() => {
		/** spinner ends after 5 seconds */
		this.spinner.hide();
	}, 1000);
      }
    );
  }

  onToggleBookmark() {
    // Emit an event to notify the parent component to toggle the bookmark
    this.toggleBookmark.emit();
  }

}
