import { City, CityWeather } from '../../abstractions';

export interface IFavoriteCitiesState {
  favoriteCities: City[];
}

export interface IFavoriteCitiesWeatherState {
  favoriteCitiesWeather: CityWeather[];
}

export const favoriteCitiesWeatherInitialState: IFavoriteCitiesWeatherState = {
  favoriteCitiesWeather: [],
};

const favoriteCities: () => City[] = () => {
  const storedCities = localStorage.getItem('favorite cities');

  let parsedCities: City[];
  try {
    parsedCities = JSON.parse(storedCities as string);
  } catch (e) {
    console.error('cannot parse favorite cities');
    parsedCities = [];
  }

  return storedCities ? parsedCities : [];
};

export const favoriteCitiesInitialState: IFavoriteCitiesState = {
  favoriteCities: favoriteCities(),
};
