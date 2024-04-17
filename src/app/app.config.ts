import {
  ApplicationConfig,
  Provider,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { WeatherApiInterceptor } from './interceptors/weather-api.interceptor';
import { FavoriteCitiesWeatherEffects } from './store/favorite-cities/favorite-cities.effect';
import {
  favoriteCitiesReducer,
  favoriteCitiesWeatherReducer,
} from './store/favorite-cities/favorite-cities.reducer';
import { temperatureIndicatorReducer } from './store/temperature-indicator/temperature-indicator.reducer';
import { themeReducer } from './store/theme/theme.reducer';
import { currentCityWeatherReducer } from './store/current-city/current-city.reducer';
import { CurrentCityWeatherEffects } from './store/current-city/current-city.effect';
import { NAVIGATOR } from './constants';
import { uiReducer } from './store/ui/ui.reducer';

export const HTTPInterceptors: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: WeatherApiInterceptor, multi: true },
];

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NAVIGATOR, useValue: navigator },
    provideRouter(routes),
    ...HTTPInterceptors,
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideStore({
      theme: themeReducer,
      temperatureIndicator: temperatureIndicatorReducer,
      favoriteCitiesWeather: favoriteCitiesWeatherReducer,
      favoriteCities: favoriteCitiesReducer,
      currentCityWeather: currentCityWeatherReducer,
      ui: uiReducer,
    }),
    provideEffects([FavoriteCitiesWeatherEffects, CurrentCityWeatherEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
