import { Theme } from '../../constants';

export interface IThemeState {
  theme: Theme;
}

const theme = (localStorage.getItem('theme') as Theme) || Theme.lightTheme;

export const initialThemeState: IThemeState = {
  theme: theme,
};
