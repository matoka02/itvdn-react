import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LinearProgress } from '@mui/material';

import reportWebVitals from './reportWebVitals';
import store from './store';
import './index.scss';
import App from './App';
import Home from './features/Home/Home';
import About from './features/About/About';
import { Extra } from './features/Extra/Extra';
import { ErrorBoundary } from './ErrorBoundary';
import { StatefulAuthProvider } from './auth/StatefulAuthProvider';
import { AuthCallback } from './auth/AuthCallback';


const Movies = lazy(() => import('./features/Movies/Movies'));

function AppEntrypoint() {
  return (
    <StatefulAuthProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </StatefulAuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntrypoint />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'extra', element: <Extra /> },
      {
        path: 'movies', element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
            <Movies />
          </Suspense>
        )
      },
      { path: 'callback', element: <AuthCallback/> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
