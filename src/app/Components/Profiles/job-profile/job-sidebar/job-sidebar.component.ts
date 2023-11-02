import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplyToJobService } from 'src/app/services/apply-to-job.service';
import { JobService } from 'src/app/services/job.service';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-job-sidebar',
  templateUrl: './job-sidebar.component.html',
  styleUrls: ['./job-sidebar.component.scss']
})
export class JobSidebarComponent {
  @Input() jobData: any;
  @Output() toggleBookmark = new EventEmitter<void>();

  constructor(private applyToJobService: ApplyToJobService, private jobService: JobService, private toastr: ToastrService) {}

  applyForJob(jobId: string) {
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
      }
    );
  }

  onToggleBookmark() {
    // Emit an event to notify the parent component to toggle the bookmark
    this.toggleBookmark.emit();
  }
  
}
