import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-categories',
  templateUrl: './job-categories.component.html',
  styleUrls: ['./job-categories.component.scss']
})
export class JobCategoriesComponent implements OnInit {
  categories: any[] = []; // Define the property to hold the retrieved categories

  constructor(private http: HttpClient) {} // Inject the HttpClient

  ngOnInit() {
    this.fetchCategories();
  }
  fetchCategories() {
    const apiUrl = `${environment.API_URL}/Home/categories`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.categories = response.data;
      },
      (error) => {
        console.error('Failed to fetch categories:', error);
      }
    );
  }
}
