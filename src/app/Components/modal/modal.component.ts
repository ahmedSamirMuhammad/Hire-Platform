import {
	Component,
	Input,
	ViewChild,
	ElementRef,
} from "@angular/core";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
	@Input() content;
	@Input() contentStyle;
	@ViewChild("modal") modal: ElementRef;
	isOpen = false;
	constructor() {}
	openModal() {
		this.isOpen = true;
		this.modal.nativeElement.classList.toggle('open');
	}
	ngAfterViewInit() {
	}

	closeModal() {
		this.modal.nativeElement.classList.toggle('open');
		this.isOpen = false;
	}
}
