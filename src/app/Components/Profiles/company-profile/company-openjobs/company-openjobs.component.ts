import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-company-openjobs',
  templateUrl: './company-openjobs.component.html',
  styleUrls: ['./company-openjobs.component.scss'],
})
export class CompanyOpenjobsComponent {
  @Input() open_job: any;
  @Output() toggleBookmark = new EventEmitter<void>();

  onToggleBookmark() {
    // Emit an event to notify the parent component to toggle the bookmark
    this.toggleBookmark.emit();
  }
}
