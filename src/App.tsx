import React, { useState } from 'react';
// import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import { AppBar, Link, CssBaseline, Toolbar, ThemeProvider, createTheme, Typography } from '@mui/material';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
// import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { teal } from '@mui/material/colors';

import { AuthContext, AuthInfo, anonymousUser } from './AuthContext';
import { AppHeader } from './AppHeader';


const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#be3455'
    }
  }
});

const fakeAuth = {
  user: {
    name: 'Joe',
  },
};

// function HeaderLink({ to, children }: { to: string, children: React.ReactNode }) {
//   return (
//     <Link component={RouterLink} to={to} variant='button' color='inherit' sx={{ my: 1, mx: 1.5 }}>
//       {children}
//     </Link>
//   );
// }

function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* <AppBar>
        <Toolbar>
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant='h6' color='inherit' noWrap>The Movies DB</Typography>
          <nav>
            <HeaderLink to='/'>Home</HeaderLink>
            <HeaderLink to='/about'>About</HeaderLink>
            <HeaderLink to='/movies'>Movies</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar> */}

      {/* <AuthContext.Provider value={{ user: { name: 'Anastasiia' } }}> */}
      <AuthContext.Provider value={auth}>
        <AppHeader  onLogin={() => setAuth(fakeAuth)} onLogout={() => setAuth({ user: anonymousUser })} />
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
