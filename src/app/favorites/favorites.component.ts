import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CityWeatherForRender } from '../abstractions';
import { CityViewComponent } from '../city-view/city-view.component';
import { fetchFavoriteCitiesWeather } from '../store/favorite-cities/favorite-cities.actions';
import { selectFavoriteCities } from '../store/favorite-cities/favorite-cities.selector';
import { selectFavoriteCitiesWithIndicator } from '../store/store.select';
import { setLoading } from '../store/ui/ui.actions';
import { selectIsLoading } from '../store/ui/ui.selector';

@Component({
  selector: 'app-favorites',
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  imports: [AsyncPipe, CityViewComponent, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteCitiesWeather: Observable<CityWeatherForRender[]>;
  isLoading = signal(false);

  private store = inject(Store);
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.store.select(selectIsLoading).subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    });

    this.store
      .select(selectFavoriteCities)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cities) => {
        this.store.dispatch(setLoading({ isLoading: true }));
        this.store.dispatch(fetchFavoriteCitiesWeather({ cities }));
      });
    this.favoriteCitiesWeather = this.store.select(
      selectFavoriteCitiesWithIndicator
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
