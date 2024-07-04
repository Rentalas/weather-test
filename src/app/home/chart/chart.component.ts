import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { DailyWeatherForRender } from '../../abstractions';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('temperatureChart') temperatureChartRef!: ElementRef;
  @Input() currentCityFiveDayDailyWeather!: DailyWeatherForRender[];
  private temperatureChart?: Chart;

  ngAfterViewInit(): void {
    if (this.currentCityFiveDayDailyWeather) {
      this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('currentCityFiveDayDailyWeather' in changes) {
      if (this.currentCityFiveDayDailyWeather) {
        if (this.temperatureChart) {
          this.temperatureChart.destroy();
        }
        this.buildChart();
      }
    }
  }

  private buildChart() {
    const ctx = this.temperatureChartRef?.nativeElement.getContext('2d');

    if (ctx) {
      this.temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.currentCityFiveDayDailyWeather.map((item) => item.date),
          datasets: [
            {
              label:
                'Day Temperature °' +
                this.currentCityFiveDayDailyWeather
                  .at(0)
                  .temperatureMaximum.split('°')
                  .at(1),
              data: this.currentCityFiveDayDailyWeather.map((item) =>
                parseFloat(item.temperatureMaximum.split('°').at(0))
              ),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label:
                'Night Temperature °' +
                this.currentCityFiveDayDailyWeather
                  .at(0)
                  .temperatureMinimum.split('°')
                  .at(1),
              data: this.currentCityFiveDayDailyWeather.map((item) =>
                parseFloat(item.temperatureMinimum.split('°').at(0))
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
