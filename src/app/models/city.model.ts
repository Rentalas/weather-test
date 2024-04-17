import { City } from '../abstractions';

export class CityModel implements City {
  name: string;
  cityId: string;

  constructor(name: string, cityId: string) {
    this.name = name || '';
    this.cityId = cityId || '';
  }
}

