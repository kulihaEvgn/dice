import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';
import theme from '@/shared/theme';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
