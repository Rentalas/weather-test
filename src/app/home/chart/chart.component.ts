import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { DailyWeather } from '../../abstractions';
import { selectTheme } from '../../store/theme/theme.selector';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('temperatureChart') temperatureChartRef!: ElementRef;
  currentCityFiveDayDailyWeather = input.required<DailyWeather[]>();
  theme: string;

  private store = inject(Store);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.store
      .select(selectTheme)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((theme) => (this.theme = theme));
  }

  ngAfterViewInit(): void {
    this.buildChart();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private buildChart() {
    const ctx = (
      this.temperatureChartRef.nativeElement as HTMLCanvasElement
    ).getContext('2d');

    if (ctx) {
      const temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.currentCityFiveDayDailyWeather().map(
            (item) => item.date
          ),
          datasets: [
            {
              label:
                'Day Temperature ' +
                this.currentCityFiveDayDailyWeather().at(1)
                  .temperatureIndicator,
              data: this.currentCityFiveDayDailyWeather().map(
                (item) => item.temperatureMaximum
              ),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label:
                'Night Temperature ' +
                this.currentCityFiveDayDailyWeather().at(1)
                  .temperatureIndicator,
              data: this.currentCityFiveDayDailyWeather().map(
                (item) => item.temperatureMinimum
              ),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    }
  }
}
