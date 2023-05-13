import { Component } from "@angular/core";

import { CITIES, City } from "../data/cities";
import { SearchService } from "./search.service";
import {Router} from "@angular/router";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {

  cities :City[] = CITIES;
  // selected_city :City = this.cities[0];
  selected_city :string;

  constructor(private rouuter :Router, private service :SearchService) {
  }

  public goToWeatherData(city :string): void {
    this.rouuter.navigate(['weather-data', { city: this.selected_city }]);
  }
}
