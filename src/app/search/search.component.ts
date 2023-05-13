import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CITIES, City } from "../data/cities";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {

  cities :City[] = CITIES;
  selected_city :string;

  constructor(private router :Router) {}

  public goToWeatherData(): void {
    this.router.navigate(['weather-data', { city: this.selected_city }]);
  }
}
