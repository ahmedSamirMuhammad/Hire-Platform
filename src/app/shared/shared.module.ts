import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/Components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../Components/modal/modal.component';
import { EditReviewsModalContentComponent } from '../Components/Dashboard/reviews/edit-reviews-modal-content/edit-reviews-modal-content.component';
import { CompanyReviewsFormComponent } from '../Components/Profiles/company-profile/company-reviews-form/company-reviews-form.component';

@NgModule({
	declarations: [PaginationComponent, ModalComponent, EditReviewsModalContentComponent, CompanyReviewsFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [PaginationComponent, ModalComponent, EditReviewsModalContentComponent, CompanyReviewsFormComponent],
})
export class SharedModule {}
