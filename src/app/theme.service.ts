import { Injectable } from '@angular/core';
import { Theme } from './constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleTheme(theme: Theme): void {
    if (theme === Theme.darkTheme) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');

      localStorage.setItem('theme', 'dark');
      return;
    }

    if (theme === Theme.lightTheme) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');

      localStorage.setItem('theme', 'light');
      return;
    }
  }
}
