import { combineReducers } from 'redux';
import moviesReducers from './movies';

const rootReducers = combineReducers({
  movies: moviesReducers,
});

export default rootReducers;
