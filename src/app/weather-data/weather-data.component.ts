import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService, WeatherRow } from "../search/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {

  results :WeatherRow[] = [];
  selected_city :string;

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
    if (param == null) {
      console.log('Nincs ilyen nevű város!');
    } else {
      this.results = this.service.getWeatherByCity(param);
      this.selected_city = param;
      this.length = this.results.length;
      this.dataSource.data = this.results;
      this.dataSource.paginator = this.paginator;
    }
  }

  backToSearch() {
    this.router.navigate(['']);
  }
}
