import { Component, OnInit } from "@angular/core";
import { CITIES, City } from "../data/cities";
import { SearchService, WeatherRow } from "./search.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {

  cities: City[] = CITIES;
  results: WeatherRow[] = [];
  selected_city :City = this.cities[0];

  displayedColumns :string[] = [ 'date', 'time', 'temp' ]

  dataSource :any;

  constructor(private service: SearchService) {
  }

  public ngOnInit(): void {
  }

  public updateResults(city: City): void {
    console.log('Cica')
    // TODO set results
    // this.results = this.service.getWeatherByCity(city);
    this.dataSource = new MatTableDataSource<WeatherRow>(this.service.getWeatherByCity(city))
  }

  public handlePageEvent(e :any) {

  }
}
