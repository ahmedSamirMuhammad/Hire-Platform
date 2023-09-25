import { Component } from '@angular/core';
import {UserService} from '../../../services/user.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	constructor(private userService: UserService) {
		
	}
	userType?:string
	ngOnInit() {
		this.userType = this.userService.userType;
		console.log(this.userService.userType)
	}
}
