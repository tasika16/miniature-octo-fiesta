import { Injectable } from "@angular/core";
import { DatePipe} from "@angular/common";

import { City } from "../data/cities";
import { WEATHER_DATA } from "../data/weather";

export interface WeatherRow {
  date: string;
  time: string;
  temp: number;
}

@Injectable({ providedIn: "root" })
export class SearchService {

  constructor(private datePipe :DatePipe) {
  }

  public getWeatherByCity(city :string): WeatherRow[] {
    let cityWeather = WEATHER_DATA.find(w => w.city === city);
    if (!cityWeather) {
      return [];
    }
    // TODO assemble results based on input city
    //
    return cityWeather!.hourly!.time!.map((time, idx) => {
      return {
        date: this.datePipe.transform(time, 'yyyy.MM.dd') || 'Nincs adat',
        time: this.datePipe.transform(time, 'hh:mm') || 'Nincs adat',
        temp: cityWeather!.hourly.temperature_2m[idx]
      }
    });
  }
}
