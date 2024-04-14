// import { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';

// import { AuthContext, anonymousUser } from './AuthContext';
import { useAuth0 } from '@auth0/auth0-react';

interface AuthHeaderProps {
  onLogin(): void;
  onLogout(): void;
}

export function AppHeader({ onLogin, onLogout }: AuthHeaderProps) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant='h6' color='inherit' noWrap>The Movies DB</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to='/'>Home</HeaderLink>
            <HeaderLink to='/about'>About</HeaderLink>
            <HeaderLink to='/extra'>Extra</HeaderLink>
            <HeaderLink to='/movies'>Movies</HeaderLink>
          </nav>
        </Box>
        {/* <AuthSection onLogin={onLogin} onLogout={onLogout} /> */}
        <AuthSection/>
      </Toolbar>
    </AppBar>
  )
}

// interface AuthSectionProps {
//   onLogin(): void;
//   onLogout(): void;
// }

// function AuthSection({ onLogin, onLogout }: AuthSectionProps) {

//   const auth = useContext(AuthContext);
//   const loggedIn = auth.user !== anonymousUser;

//   if (loggedIn) {
//     return (<>
//       <Typography>Hello, {auth.user.name}</Typography>
//       <Button color='inherit' variant='outlined' onClick={onLogout}>Log out</Button>
//     </>)
//   }
//   return <Button color='inherit' variant='outlined' onClick={onLogin} sx={{ ml: 1.5 }}>Log in</Button>
// }

function AuthSection() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  // const navigate = useNavigate();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    });
  };

  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isAuthenticated) {
    return (<>
      <Typography>Hello, {user?.name}</Typography>
      <Button color='inherit' variant='outlined' onClick={onLogout}>Log out</Button>
    </>)
  }
  return <Button color='inherit' variant='outlined' onClick={onLogin} sx={{ ml: 1.5 }}>Log in</Button>

}

function HeaderLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link component={RouterLink} to={to} variant='button' color='inherit' sx={{ my: 1, mx: 1.5 }}>
      {children}
    </Link>
  );
}