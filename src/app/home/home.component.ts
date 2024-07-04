import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { CityViewComponent } from '../city-view/city-view.component';
import {
  getCurrentCityWeather,
  getCurrentCityWeatherSuccess,
} from '../store/current-city/current-city.actions';
import {
  selectCurrentCityFiveDayDailyWeatherWithIndicator,
  selectCurrentCityWeatherWithIndicator,
} from '../store/store.select';
import { setLoading } from '../store/ui/ui.actions';
import { selectIsLoading } from '../store/ui/ui.selector';
import { BlockViewComponent } from './block-view/block-view.component';
import { ChartComponent } from './chart/chart.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    SearchComponent,
    ChartComponent,
    MatButtonModule,
    MatIconModule,
    CityViewComponent,
    BlockViewComponent,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  fiveDayView = signal('block');
  currentCityWeather = signal(null);
  currentCityFiveDayDailyWeather = signal(null);
  isLoading = signal(true);

  private store = inject(Store);
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.store
      .select(selectIsLoading)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading) => this.isLoading.set(isLoading));

    this.setCurrentCity().pipe(takeUntil(this.unsubscribe$)).subscribe();
    this.store
      .select(selectCurrentCityFiveDayDailyWeatherWithIndicator)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((fiveDayDailyWeather) => {
        this.currentCityFiveDayDailyWeather.set(fiveDayDailyWeather);
      });
  }

  ngOnDestroy() {
    this.removeCurrentCity();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setView(view: string): void {
    this.fiveDayView.set(view);
  }

  private removeCurrentCity(): void {
    this.store.dispatch(
      getCurrentCityWeatherSuccess({ currentCityWeather: null })
    );
  }

  private setCurrentCity(): Observable<any> {
    return this.store.select(selectCurrentCityWeatherWithIndicator).pipe(
      tap((currentCityWeather) => {
        console.log('1', currentCityWeather);

        if (currentCityWeather) return;
        console.log('2', currentCityWeather);

        this.getCurrentCity();
      }),
      tap((currentCityWeather) => {
        console.log(3);

        this.currentCityWeather.set(currentCityWeather);
      })
    );
  }

  private getCurrentCity(): void {
    this.store.dispatch(setLoading({ isLoading: true }));
    this.store.dispatch(getCurrentCityWeather());
  }
}
