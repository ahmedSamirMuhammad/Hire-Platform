import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-candidates',
  templateUrl: './manage-candidates.component.html',
  styleUrls: ['./manage-candidates.component.scss']
})
export class ManageCandidatesComponent {
  candidates : any[] = [ 1,2,3];
}
