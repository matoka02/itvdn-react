import { client } from '../api/tmdb';
import { ActionWithPayload, createReducer } from '../redux/utils';
import { AppThunk } from '../store';

export interface Movie {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
}

interface MoviesState {
  top: Movie[];
  loading: boolean;
}

const initialState: MoviesState = {
  top: [
    // { id: 1, title: 'Inception', popularity: 98, overview: 'Dreams...' },
    // { id: 2, title: 'The Godfather', popularity: 97, overview: 'Godfather...' },
    // { id: 3, title: 'The Dark Knight', popularity: 96.5, overview: 'Batman...' },
    // { id: 4, title: 'The Godfather Part II', popularity: 96, overview: 'Part II...' },
    // { id: 5, title: 'Angry Men', popularity: 94, overview: 'Men...' },
  ],
  loading: false,
};

const moviesLoaded = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});

const moviesLoading = () => ({
  type: 'movies/loading',
})

export function fetchMovies():AppThunk<Promise<void>>{
return async (dispatch, getState)=>{
  dispatch(moviesLoading());

  const config = await client.getConfiguration();
  const imageUrl = config.images.base_url;
  const results = await client.getNowPlaying();

  const mappedResults: Movie[] = results.map(m => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    popularity: m.popularity,
    image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined,
  }));
  dispatch(moviesLoaded(mappedResults));
}
}

const moviesReducer = createReducer<MoviesState>(initialState, {
  'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    return {
      ...state,
      top: action.payload,
      loading: false,
    };
  },
  'movies/loading': (state, action)=>{
    return {
      ...state,
      loading: true,
    }
  }
});

export default moviesReducer;
