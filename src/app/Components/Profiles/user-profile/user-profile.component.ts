import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userId: number =0;
  API_URL = `${environment.API_URL}/profile`;

  profileData: any;


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.getProfile().subscribe(
        (response) => {
          this.profileData = response.data; // to access the data property
			console.log(this.profileData.history);
        },
        (error) => {
          console.error(error);
        }
      );
    });

  }



  getProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}/${this.userId}`);
  }
}
