import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var Microsoft: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  contactForm: FormGroup;
  officeLocation:string= 'Tahrir Square';

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadMicrosoftMaps().then(() => {
      this.getCoordinatesForCity(this.officeLocation).then(([latitude, longitude]) => {
        this.initializeMap(latitude, longitude);
      }).catch(error => {
        console.error('Error getting coordinates:', error);
      });
    }).catch(error => {
      console.error('Error loading Microsoft Maps:', error);
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const params = new HttpParams({ fromObject: formData });
      const apiUrl = `${environment.API_URL}/contact-us`;

      this.httpClient.post(apiUrl, params).subscribe(
        (response: any) => {
          this.toastr.success('Your request has been sent successfully', '200', {
            timeOut: 2000,
            progressBar: true,
          });
          this.contactForm.reset();
        },
        (error) => {
          this.toastr.error("Make sure you've entered valid data", '401', {
            timeOut: 2000,
            progressBar: true,
          });
        }
      );
    }
  }

  initializeMap(latitude: number, longitude: number) {
    const mapOptions = {
      center: new Microsoft.Maps.Location(latitude, longitude),
      zoom: 15, 
    };

    const map = new Microsoft.Maps.Map(document.getElementById('myMap'), mapOptions);
    const location = new Microsoft.Maps.Location(latitude, longitude);
    const pin = new Microsoft.Maps.Pushpin(location);
    map.entities.push(pin);
  }

  async getCoordinatesForCity(city: string): Promise<[number, number]> {
    try {
      const response = await fetch(
        `https://dev.virtualearth.net/REST/v1/Locations?query=${city}&key=AvLSe1lcedf_w2vjeJMo_XKQyFDQqMEU7QAv2FEMuT7w5WolEI9SnLUMmMht36xt`
      );

      if (response.ok) {
        const data = await response.json();
        const coordinates = data.resourceSets[0].resources[0].point.coordinates;
        return [coordinates[0], coordinates[1]];
      } else {
        throw new Error('Failed to geocode city');
      }
    } catch (error) {
      throw error;
    }
  }

  async loadMicrosoftMaps(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof Microsoft !== 'undefined' && Microsoft.Maps) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.bing.com/api/maps/mapcontrol?callback=initializeMap&key=AvLSe1lcedf_w2vjeJMo_XKQyFDQqMEU7QAv2FEMuT7w5WolEI9SnLUMmMht36xt';
        script.async = true;
        script.defer = true;

        script.onload = () => {
          resolve();
        };

        script.onerror = (error) => {
          reject(error);
        };

        document.body.appendChild(script);
      }
    });
  }
}