import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {
  isexpired :boolean = false;
  isApproved : boolean = false;
  isPending: boolean = true;

  @Input() job :any;
}
