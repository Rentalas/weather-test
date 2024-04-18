import { Injectable } from '@angular/core';
import { TemperatureIndicator } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  setTemperatureIndicator(temperatureIndicator: TemperatureIndicator): void {
    localStorage.setItem('temperature indicator', temperatureIndicator);
  }
}
