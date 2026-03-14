'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
    allVariants: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

export default theme;
