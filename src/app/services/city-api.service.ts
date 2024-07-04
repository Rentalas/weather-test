import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { City, CityRs } from '../abstractions';
import { CityModel } from '../models/city.model';
import { kyivByPosition } from '../temp/kyivbypos';
import { MOCK_DATA } from '../temp/rst2';

@Injectable({
  providedIn: 'root',
})
export class CityApiService {
  private http = inject(HttpClient);

  getCitiesByPrefix(prefix: string): Observable<CityModel[]> {
    return of(MOCK_DATA);
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
    return of(new CityModel(kyivByPosition.LocalizedName, kyivByPosition.Key));
    return this.http
      .get<CityRs>('./locations/v1/cities/geoposition/search', {
        params: { q: positionString },
      })
      .pipe(map((city) => new CityModel(city.LocalizedName, city.Key)));
  }
}
