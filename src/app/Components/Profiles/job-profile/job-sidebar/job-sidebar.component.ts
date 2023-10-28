import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplyToJobService } from 'src/app/services/apply-to-job.service';

@Component({
  selector: 'app-job-sidebar',
  templateUrl: './job-sidebar.component.html',
  styleUrls: ['./job-sidebar.component.scss']
})
export class JobSidebarComponent {
  @Input() jobData: any;
  @Output() toggleBookmark = new EventEmitter<void>();


  constructor(private applyToJobService: ApplyToJobService) {}

  applyForJob(jobId: string) {
    this.applyToJobService.applyForJob(jobId).subscribe(
      (response) => {
        // Handle a successful response, e.g., show a success message.
        console.log('Application sent successfully', response);
      },
      (error) => {
        // Handle any errors, e.g., show an error message.
        console.error('Error applying for the job', error);
      }
    );
  }

  onToggleBookmark() {
    // Emit an event to notify the parent component to toggle the bookmark
    this.toggleBookmark.emit();
  }
}
