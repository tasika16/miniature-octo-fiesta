import { Injectable } from "@angular/core";
import { DatePipe} from "@angular/common";
import { map } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { City } from "../data/cities";
import { environment } from "../../environments/environment";

export interface WeatherRow {
  date: string;
  time: string;
  temp: number;
}

@Injectable({ providedIn: "root" })
export class SearchService {

  constructor(private http :HttpClient,private datePipe :DatePipe) {
  }

  public getWeatherByCity(city :City) {
    const url =
      `${environment.weather_api_url_base}latitude=${city.latitude}` +
      `&longitude=${city.longitude}&hourly=temperature_2m`
    return this.http.get<WeatherRow[]>(url).pipe(
      map((data :any) => {
        if (!data) {
          console.log('üres adat')
        }
        return data.hourly.time.map((time :string, idx :number) => {
          return {
            date: this.datePipe.transform(time, 'yyyy.MM.dd') || 'Nincs adat!',
            time: this.datePipe.transform(time, 'hh:mm') || 'Nincs adat!',
            temp: data.hourly.temperature_2m[idx]
          }
        });
      })
    )
  }
}
