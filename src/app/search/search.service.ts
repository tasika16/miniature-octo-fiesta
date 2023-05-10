import { Injectable } from "@angular/core";
import { City } from "../data/cities";
import { WEATHER_DATA } from "../data/weather";

export interface WeatherRow {
  date: string;
  time: string;
  temp: number;
}

@Injectable({ providedIn: "root" })
export class SearchService {
  public getWeatherByCity(city: City): WeatherRow[] {
    let cityWeather = WEATHER_DATA.find(w => w.city === city.name);
    if (!cityWeather) {
      return [];
    }
    // TODO assemble results based on input city
    // https://www.angularjswiki.com/angular/how-to-use-angular-pipes-in-components-and-services/
    return cityWeather!.hourly!.time!.map((time, idx) => {
      return {
        date: time,
        time: time,
        temp: cityWeather!.hourly.temperature_2m[idx]
      }
    });
  }
}
