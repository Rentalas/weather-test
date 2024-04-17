import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { CityWeather } from '../abstractions';
import {
  FavoriteIcon,
  FavoriteIconTooltip,
  TemperatureIndicator,
} from '../constants';
import { CityModel } from '../models/city.model';
import {
  getCurrentCityFiveDayDailyWeather,
  getCurrentCityWeatherSuccess,
} from '../store/current-city/current-city.actions';
import {
  addToFavoriteCities,
  removeFromFavoriteCities,
} from '../store/favorite-cities/favorite-cities.actions';
import { selectFavoriteCities } from '../store/favorite-cities/favorite-cities.selector';

@Component({
  selector: 'app-city-view',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './city-view.component.html',
  styleUrl: './city-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityViewComponent implements OnInit {
  cityWeather = input.required<CityWeather>();
  isFavorite = signal(false);
  iconLink = signal('');
  favoriteIcon = signal(FavoriteIcon.notInFavorite);
  favoriteIconTooltip = signal(FavoriteIconTooltip.add);
  isFavoriteRoute = signal(false);

  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(
      () => {
        this.getIsFavorite().subscribe(() => {
          this.setIconLink();
          this.setFavoriteIcon();
        });
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.isFavoriteRoute.set(
      this.route.snapshot.routeConfig.path === 'favorites'
    );
  }

  onFavoriteButtonClick(): void {
    if (this.isFavorite()) {
      this.removeFromFavorite();
      return;
    }
    this.addToFavorite();
  }

  onDetailButtonClick(cityWeather: CityWeather): void {
    this.store.dispatch(
      getCurrentCityWeatherSuccess({ currentCityWeather: cityWeather })
    );
    this.store.dispatch(
      getCurrentCityFiveDayDailyWeather({
        cityId: cityWeather.cityId,
        temperatureIndicator:
          cityWeather.temperatureIndicator as TemperatureIndicator,
      })
    );
    this.router.navigate(['']);
  }

  private setIconLink(): void {
    const weatherIconString = `${this.cityWeather()?.weatherIcon}`;
    const weatherIcon =
      weatherIconString.length === 1
        ? '0' + weatherIconString
        : weatherIconString;
    this.iconLink.set(
      `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`
    );
  }

  private setFavoriteIcon(): void {
    if (!this.isFavorite()) {
      this.favoriteIcon.set(FavoriteIcon.notInFavorite);
      this.favoriteIconTooltip.set(FavoriteIconTooltip.add);
      return;
    }

    this.favoriteIcon.set(FavoriteIcon.inFavorite);
    this.favoriteIconTooltip.set(FavoriteIconTooltip.remove);
  }

  private getIsFavorite() {
    return this.store.select(selectFavoriteCities).pipe(
      tap((cities) => {
        if (!this.cityWeather()) {
          return;
        }

        const isFavorite = cities.some(
          (city) => city.cityId === this.cityWeather().cityId
        );

        this.isFavorite.set(isFavorite);
      }),
      take(1)
    );
  }

  private addToFavorite(): void {
    this.store.dispatch(
      addToFavoriteCities({
        city: new CityModel(this.cityWeather().name, this.cityWeather().cityId),
      })
    );
    this.isFavorite.set(true);
    this.setFavoriteIcon();
  }

  private removeFromFavorite(): void {
    this.store.dispatch(
      removeFromFavoriteCities({ cityId: this.cityWeather().cityId })
    );
    this.isFavorite.set(false);
    this.setFavoriteIcon();
  }
}
