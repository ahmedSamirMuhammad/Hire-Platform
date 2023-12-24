import {
	Component,
	Input,
	ViewChild,
	ElementRef,
} from "@angular/core";
import { EditReviewsModalContentComponent } from '../Dashboard/reviews/edit-reviews-modal-content/edit-reviews-modal-content.component';
@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
	@ViewChild(EditReviewsModalContentComponent, { static: false }) editReviewsModalContentComponent: EditReviewsModalContentComponent;

	@Input() content;
	@Input() contentStyle;
	@Input() params;
	@Input() modalOnInit;
	@ViewChild("modal") modal: ElementRef;
	isOpen = false;
	constructor() {}
	openModal =()=> {
		this.isOpen = true;
		this.modal.nativeElement.classList.toggle('open');
	}
	ngAfterViewInit() {
	}
	initModal=()=> { 
		if (this.content === 'dashboard-reviewEdit-form') {
			this.editReviewsModalContentComponent.getReview();
		}
	}
	closeModal=()=> {
		this.modal.nativeElement.classList.toggle('open');
		this.isOpen = false;
	}
}
