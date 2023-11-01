import { Component, Input, OnInit } from '@angular/core';
declare var Microsoft: any;
@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit{
  @Input() jobData: any;

  mapUrl: string;

  constructor() {}

  ngOnInit() {
    this.loadMicrosoftMaps().then(() => {
      this.getCoordinatesForCity(this.jobData.job_location).then(([latitude, longitude]) => {
        this.initializeMap(latitude, longitude);
      }).catch(error => {
        console.error('Error getting coordinates:', error);
      });
    }).catch(error => {
      console.error('Error loading Microsoft Maps:', error);
    });
  }

  initializeMap(latitude: number, longitude: number) {
    const mapOptions = {
      center: new Microsoft.Maps.Location(latitude, longitude),
      zoom: 15, // Adjust the zoom level as needed
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
