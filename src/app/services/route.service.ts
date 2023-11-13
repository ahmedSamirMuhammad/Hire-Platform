import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor() { }
  currentRoute: string;

  updateCurrentRoute(route: string) {
    this.currentRoute = route;
  }
}
