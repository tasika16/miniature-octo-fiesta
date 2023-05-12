import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

import { CITIES, City } from "../data/cities";
import { SearchService, WeatherRow } from "./search.service";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {

  cities: City[] = CITIES;
  results: WeatherRow[] = [];
  selected_city :City = this.cities[0];

  length :number = 10;
  displayedColumns :string[] = [ 'date', 'time', 'temp' ]
  dataSource = new MatTableDataSource<WeatherRow>([]);

  @ViewChild(MatPaginator) paginator :MatPaginator;

  constructor(private service: SearchService) {
  }

  public updateResults(city: City): void {
    // TODO set results
    this.results = this.service.getWeatherByCity(city);
    this.length = this.results.length
    this.dataSource.data = this.results;
    this.dataSource.paginator = this.paginator;

  }
}
