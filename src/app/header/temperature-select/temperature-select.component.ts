import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TemperatureService } from '../../temperature.service';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { TemperatureIndicator } from '../../constants';
import { selectTemperatureIndicator } from '../../store/temperature-indicator/temperature-indicator.selector';
import { changeTemperatureIndicator } from '../../store/temperature-indicator/temperature-indicator.actions';

@Component({
  selector: 'app-temperature-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  templateUrl: './temperature-select.component.html',
  styleUrl: './temperature-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemperatureSelectComponent implements OnInit, OnDestroy {
  temperatureIndicators = Object.values(TemperatureIndicator);
  temperatureIndicator = TemperatureIndicator.celsius;

  private unsubscribe$ = new Subject<void>();
  private store = inject(Store);
  private temperatureService = inject(TemperatureService);

  ngOnInit(): void {
    this.store
      .select(selectTemperatureIndicator)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => (this.temperatureIndicator = value));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  selectTemperatureIndicator(): void {
    this.store.dispatch(
      changeTemperatureIndicator({ newValue: this.temperatureIndicator })
    );

    this.temperatureService.setTemperatureIndicator(this.temperatureIndicator);
  }
}
