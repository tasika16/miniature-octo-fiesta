import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService, WeatherRow } from "../search/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { CITIES, City } from "../data/cities";

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {

  results :WeatherRow[] = [];
  selected_city :string;
  cities :City[] = CITIES;

  length :number = 10;
  displayedColumns :string[] = [ 'date', 'time', 'temp' ]
  dataSource = new MatTableDataSource<WeatherRow>([]);

  @ViewChild(MatPaginator) paginator :MatPaginator;

  constructor(private route :ActivatedRoute, private router :Router, private service :SearchService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('city');
    const city = this.cities.find(c => c.name === param);
    if (!city) {
      console.log('Nincs ilyen nevű város!');
    } else {
      this.service.getWeatherByCity(city).subscribe({
        next: (data :any) => {
          this.results = data;
          this.selected_city = city.name;
          this.length = this.results.length;
          this.dataSource.data = this.results;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

  backToSearch() {
    this.router.navigate(['']);
  }
}
