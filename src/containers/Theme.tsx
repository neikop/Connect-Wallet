import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useNotification } from 'hooks';

export const appTheme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        disableElevation: true,
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
    MuiPagination: {
      defaultProps: {
        variant: 'outlined',
        shape: 'rounded',
        size: 'large',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
        InputLabelProps: { shrink: true },
      },
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    button: { fontWeight: 600, textTransform: 'none' },
    subtitle1: { fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    subtitle2: { fontSize: 14, fontWeight: 500, lineHeight: 1.43 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
    caption: { fontSize: 12 },
  },
  palette: {
    primary: {
      light: '#90caf9',
      main: '#2196f3',
      dark: '#1e88e5',
    },
    secondary: {
      light: '#b39ddb',
      main: '#673ab7',
      dark: '#5e35b1',
    },
    mode: 'light',
  },
});

const Theme = ({ children }: any) => {
  useNotification();

  return (
    <ThemeProvider theme={responsiveFontSizes(appTheme)}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
};

export default Theme;
