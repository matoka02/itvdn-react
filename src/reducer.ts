import { combineReducers } from 'redux';
import moviesReducer from './features/Movies/moviesSlice';

const rootReducers = combineReducers({
  movies: moviesReducer,
});

export default rootReducers;
