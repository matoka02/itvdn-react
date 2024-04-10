import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
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

function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymousUser });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

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
