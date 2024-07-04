import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DailyWeather, DailyWeatherForRender } from '../../abstractions';

@Component({
  selector: 'app-block-view',
  standalone: true,
  imports: [],
  templateUrl: './block-view.component.html',
  styleUrl: './block-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockViewComponent {
  currentCityFiveDayDailyWeather = input.required<DailyWeatherForRender[]>();

  setIconLink(icon: number): string {
    const weatherIconString = `${icon}`;
    const weatherIcon =
      weatherIconString.length === 1
        ? '0' + weatherIconString
        : weatherIconString;
    return `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`;
  }
}
