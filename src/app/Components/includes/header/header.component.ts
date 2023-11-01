import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string | null = null;
  token: string = '';

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
	//adding
	this.token = localStorage.getItem('token') || '';
  }

  logout() {
    localStorage.removeItem('token') ;
	// this.token = ''; // Update the token property
    this.router.navigate(['/login'])
  }
}
