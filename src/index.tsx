import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import './index.scss';
import App from './App';
import { About } from './features/About/About';
// import Movies, { MoviesFetch } from './features/Movies/Movies';
import Movies from './features/Movies/Movies';
import store from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}><App/></Provider>,
    children: [
      { path: "/about", element: <About /> },
      { path: "/movies", element: <Movies /> },
      // { path: "/movies", element: <MoviesFetch /> },
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
