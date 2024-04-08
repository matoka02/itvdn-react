// import { Action, Reducer } from 'redux';
import { ActionWithPayload, createReducer } from '../redux/utils';

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

export const moviesLoaded = (movies: Movie[]) => ({
  type: 'movies/loaded',
  payload: movies,
});

// interface ActionWithPayload<T> extends Action {
//   payload:T
// }

// const moviesReducer: Reducer<MoviesState, ActionWithPayload<Movie[]>> = (state, action) => {
//   // return initialState;
//   const currentState = state ?? initialState;
//   switch (action.type) {
//     case 'movies/loaded':
//       // todo: handle;
//       return {
//         ...currentState,
//         top: action.payload,
//       }

//     default:
//       return currentState;
//   }
// }

export const moviesLoading = () => ({
  type: 'movies/loading',
})

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
