import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { City, CityRs } from '../abstractions';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  private http = inject(HttpClient);

  getCitiesByPrefix(prefix: string): Observable<CityModel[]> {
    return this.http
      .get<CityRs[]>('./locations/v1/cities/autocomplete', {
        params: { q: prefix },
      })
      .pipe(
        map((cities) =>
          cities.map((city) => new CityModel(city.LocalizedName, city.Key))
        )
      );
  }

  getCityByPosition(latitude: number, longitude: number): Observable<City> {
    const positionString = `${latitude},${longitude}`;
    return this.http
      .get<CityRs>('./locations/v1/cities/geoposition/search', {
        params: { q: positionString },
      })
      .pipe(map((city) => new CityModel(city.LocalizedName, city.Key)));
  }
}
