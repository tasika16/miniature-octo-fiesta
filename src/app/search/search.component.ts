import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { CITIES, City } from "../data/cities";
import { SearchService } from "./search.service";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {

  cities :City[] = CITIES;
  selected_city :string;

  constructor(private rouuter :Router, private service :SearchService) {}

  public goToWeatherData(): void {
    this.rouuter.navigate(['weather-data', { city: this.selected_city }]);
  }
}
