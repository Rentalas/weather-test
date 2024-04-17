import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Observable,
  catchError,
  debounceTime,
  delayWhen,
  map,
  of,
  startWith,
  take,
  tap,
} from 'rxjs';
import { CityService } from '../../services/city.service';
import { City } from '../../abstractions';
import { CityModel } from '../../models/city.model';
import { DEBOUNCE_TIME } from '../../constants';
import { Store } from '@ngrx/store';
import { setCurrentCityWeather } from '../../store/current-city/current-city.actions';
import { setLoading } from '../../store/ui/ui.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  searchControl = new FormControl('');
  currentCityId: any;
  options!: City[];
  filteredOptions!: Observable<any>;

  private store = inject(Store);
  private fetchedNamePrefix = '';
  private cityService = inject(CityService);

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith<any>(''),
      debounceTime(DEBOUNCE_TIME),
      delayWhen<string>((inputValue) => this.setCityOptions(inputValue)),
      tap((inputValue) => {
        this.saveCityPrefix(inputValue);
      }),
      map((value) => this.filterOptions(value || ''))
    );
  }

  ngAfterViewInit() {
    this.trigger.panelClosingActions.subscribe((e) => {
      if (!(e && e.source)) {
        this.searchControl.setValue('');
        this.trigger.closePanel();
      }
    });
  }

  onOptionSelected(cityName: any) {
    const city = this.options.find((city) => city.name === cityName);

    const currentCity = new CityModel(city.name, city.cityId);
    this.store.dispatch(setLoading({ isLoading: true }));
    this.store.dispatch(setCurrentCityWeather({ city: currentCity }));
  }

  private saveCityPrefix(prefix: string): void {
    this.fetchedNamePrefix = prefix;
  }

  private setCityOptions(uncompleteName: string): Observable<CityModel[]> {
    if (!uncompleteName) {
      this.options = [];
      return of(this.options);
    }

    const options$ =
      uncompleteName.startsWith(this.fetchedNamePrefix) && this.options.length
        ? of(this.options)
        : this.cityService.getCityByStartString(uncompleteName);

    return options$.pipe(
      take(1),
      tap((options) => (this.options = options)),
      catchError(() => {
        console.error('cannot get options');
        return of([]);
      })
    );
  }

  private filterOptions(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
