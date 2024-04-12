// import { UnknownAction, applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { ThunkAction, thunk } from 'redux-thunk';

import { UnknownAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// import rootReducer from './reducer';
import { tmdbApi } from './services/tmdb';

// function configureStore() {
//   const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
//   const store = createStore(rootReducer, composedEnhancer);
//   return store;
// }

// const store = configureStore();

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType> = ThunkAction<ReturnType, RootState, undefined, UnknownAction>;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
