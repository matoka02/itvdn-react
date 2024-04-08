import React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, Link, CssBaseline, Toolbar, ThemeProvider, createTheme, Typography } from '@mui/material';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { teal } from '@mui/material/colors';

// import styles from './App.module.scss';

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#be3455'
    }
  }
});

function HeaderLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
      {children}
    </Link>
  );
}

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>The Movies DB</Typography>
          <nav>
            <HeaderLink to='/'>Home</HeaderLink>
            <HeaderLink to='/about'>About</HeaderLink>
            <HeaderLink to='/movies'>Movies</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
