import { Injectable, inject } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap } from 'rxjs';
import { City, CityWeather, Position } from '../abstractions';
import { CITY_KYIV, NAVIGATOR } from '../constants';
import { CityModel } from '../models/city.model';
import { isNullish } from '../utilities/common.utility';
import { CityApiService } from './city-api.service';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cityApiService = inject(CityApiService);
  private navigator = inject(NAVIGATOR);
  private weatherService = inject(WeatherService);

  private defaultCity = CITY_KYIV;

  getCityByStartString(prefix: string): Observable<CityModel[]> {
    return this.cityApiService.getCitiesByPrefix(prefix).pipe(
      catchError(() => {
        console.error('incorrect city data');
        return [];
      })
    );
  }

  getCurrentCityWeather(city?: CityModel): Observable<CityWeather> {
    if (city) {
      return this.weatherService
        .getCitiesWeather([city])
        .pipe(map((cities) => cities.at(0)));
    }

    return this.getCurrentCity().pipe(
      switchMap((city) => this.weatherService.getCitiesWeather([city])),
      map((cities) => cities.at(0))
    );
  }

  private getCurrentCity(): Observable<City> {
    return this.getCurrentCityGeoposition().pipe(
      switchMap(({ latitude, longitude }) => {
        const hasCoords = [latitude, longitude].every((el) => !isNullish(el));

        return hasCoords
          ? this.getCityByPosition(latitude, longitude)
          : of(this.defaultCity);
      })
    );
  }

  private getCityByPosition(
    latitude: number,
    longitude: number
  ): Observable<CityModel> {
    return this.cityApiService.getCityByPosition(latitude, longitude).pipe(
      catchError(() => {
        console.error('could not fetch city by position');
        return of(this.defaultCity);
      })
    );
  }

  private getCurrentCityGeoposition(): Observable<Position> {
    const positionEmitter$ = new Subject<GeolocationPosition>();
    this.navigator.geolocation.getCurrentPosition((position) =>
      positionEmitter$.next(position)
    );

    return positionEmitter$.pipe(
      map((position: GeolocationPosition) => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }))
    );
  }
}
