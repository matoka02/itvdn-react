import { client } from '../../api/tmdb';
import { ActionWithPayload, createReducer } from '../../redux/utils';
import { AppThunk } from '../../store';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  image?: string;
}

interface MoviesState {
  loading: boolean;
  top: Movie[];
  page: number;
  hasMorePages: boolean;
}

const initialState: MoviesState = {
  loading: false,
  top: [],
  page: 0,
  hasMorePages: true,
}

function loading() {
  return {
    type: 'movies/loading'
  };
}

function loaded(movies: Movie[], page: number, hasMorePages: boolean) {
  return {
    type: 'movies/loaded',
    payload: { movies, page, hasMorePages },
  };
}

// export function fetchMovies(): AppThunk<Promise<void>> {
//   return async (dispatch, getState) => {
//     dispatch(loading());

//     const configuration = await client.getConfiguration(); // todo: single load per app
//     const results = await client.getNowPlaying();
//     const imageSize = 'w780';

//     const movies: Movie[] = results.map((movie) => ({
//       id: movie.id,
//       title: movie.title,
//       overview: movie.overview,
//       popularity: movie.popularity,
//       image: movie.backdrop_path ? `${configuration.images.base_url}${imageSize}${movie.backdrop_path}` : undefined
//     }));

//     dispatch(loaded(movies));
//   }
// }

export function fetchNextPage(): AppThunk<Promise<void>> {
  return async (dispatch, getState) => {
    const nextPage = getState().movies.page + 1;
    dispatch(fetchPage(nextPage));
  }
}

function fetchPage(page: number): AppThunk<Promise<void>> {
  return async (dispatch) => {
    dispatch(loading());

    const configuration = await client.getConfiguration(); // todo: single load per app
    const nowPlaying = await client.getNowPlaying(page);
    const imageSize = 'w780';

    const movies: Movie[] = nowPlaying.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      popularity: movie.popularity,
      image: movie.backdrop_path ? `${configuration.images.base_url}${imageSize}${movie.backdrop_path}` : undefined
    }));

    const hasMorePages = nowPlaying.page < nowPlaying.totalPages;

    dispatch(loaded(movies, page, hasMorePages));
  }
}

const moviesReducer = createReducer<MoviesState>(
  initialState,
  {
    'movies/loading': (state, action: ActionWithPayload<boolean>) => {
      return { ...state, loading: true };
    },
    // 'movies/loaded': (state, action: ActionWithPayload<Movie[]>) => {
    //   return { ...state, top: action.payload, loading: false };
    // },
    'movies/loaded': (state, action: ActionWithPayload<{ movies: Movie[]; page: number; hasMorePages: boolean }>) => {
      return {
        ...state,
        top: [...state.top, ...action.payload.movies],
        page: action.payload.page,
        hasMorePages: action.payload.hasMorePages,
        loading: false,
      };
    },
  });

export default moviesReducer;