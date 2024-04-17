import { InjectionToken } from '@angular/core';

export enum ThemeToggleIcon {
  lightTheme = 'nights_stay',
  darkTheme = 'wb_sunny',
}

export enum TemperatureIndicator {
  celsius = '°C',
  fahrenheit = '°F',
}

export enum Theme {
  lightTheme = 'light',
  darkTheme = 'dark',
}

export const DEBOUNCE_TIME = 300;

export const CITY_KYIV = {
  cityId: '324505',
  name: 'Kyiv',
};

export enum FavoriteButtonAnnotation {
  add = 'Add to Favorite',
  remove = 'Remove from Favorite',
}

export enum FavoriteIcon {
  notInFavorite = 'favorite_border',
  inFavorite = 'favorite',
}

export enum FavoriteIconTooltip {
  remove = 'Remove from Favorite',
  add = 'Add to Favorite',
}

export const NAVIGATOR = new InjectionToken<Navigator>('navigator');

export enum ThemeColor {
  darkThemeBackground = '#ffffff',
  darkThemeBorderColor = '#121212',
  lightThemeBackground = '#121212',
  lightThemeBorderColor = '#ffffff',
}
