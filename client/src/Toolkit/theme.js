/* eslint-disable import/no-mutable-exports */
// Colors from: https://material-ui.com/customization/color/#color-palette
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { esEs } from '@material-ui/core/locale';
import { red, blueGrey } from '@material-ui/core/colors';

import Colors from './colors';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors['little-blue'],
    },
    secondary: {
      main: Colors['pink-landing'],
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: Colors.light,
      default: '#f3f3f3',
    },
    text: {
      primary: blueGrey[50],
      secondary: blueGrey[200],
    },
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: { fontSize: '1.5rem' },
    h2: { fontSize: '1.25rem', fontWeight: 500 },
    subtitle1: { fontSize: '0.75rem' },
    subtitle2: { fontSize: '1.125rem', fontWeight: 500 },
  },
}, esEs);

theme = responsiveFontSizes(theme);

export default theme;
