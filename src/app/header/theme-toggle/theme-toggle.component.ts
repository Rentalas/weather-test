import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ThemeService } from '../../theme.service';
import { MatIconModule } from '@angular/material/icon';
import { Theme, ThemeToggleIcon } from '../../constants';
import { changeTheme } from '../../store/theme/theme.actions';
import { selectTheme } from '../../store/theme/theme.selector';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  toggleIcon = signal(ThemeToggleIcon.darkTheme);

  private theme = Theme.lightTheme;
  private unsubscribe$ = new Subject<void>();
  private store = inject(Store);
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.setTheme();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

  toggleTheme(): void {
    this.theme = this.changeTheme();
    this.store.dispatch(changeTheme({ newValue: this.theme }));
    this.themeService.toggleTheme(this.theme);
  }

  private setTheme(): void {
    this.store
      .select(selectTheme)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.theme = value;
        const icon = this.getIcon();
        this.toggleIcon.set(icon);

        this.themeService.toggleTheme(this.theme);
      });
  }

  private getIcon(): ThemeToggleIcon {
    switch (this.theme) {
      case Theme.lightTheme:
        return ThemeToggleIcon.darkTheme;
      case Theme.darkTheme:
        return ThemeToggleIcon.lightTheme;
      default:
        throw new Error('Unsupported theme');
    }
  }

  private changeTheme(): Theme {
    switch (this.theme) {
      case Theme.lightTheme:
        return Theme.darkTheme;
      case Theme.darkTheme:
        return Theme.lightTheme;
      default:
        throw new Error('Unsupported theme');
    }
  }
}
