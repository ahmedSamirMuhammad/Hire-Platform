// header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	storedRole: string = localStorage.getItem("role");
  name: string | null = null;
  token: string = '';
  notifications: any[] = [];

  constructor(private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
	//adding
	this.token = localStorage.getItem('token') || '';
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe((data: any) => {
      this.notifications = data.data;
      console.log(this.notifications)

    });
  }

  logout() {
    localStorage.removeItem('token') ;
	// this.token = ''; // Update the token property
    this.router.navigate(['/login'])
  }


}
