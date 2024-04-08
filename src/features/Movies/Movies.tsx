import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import { Movie, fetchMovies, moviesLoaded, moviesLoading } from '../../reducers/movies';
import { Movie, fetchMovies } from '../../reducers/movies';
import { RootState } from '../../store';
// import { client } from '../../api/tmdb';
import { MovieCard } from './MovieCard';
import styles from './Movies.module.scss';
import { useAppDispatch } from '../../hooks';

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // async function loadData() {
    //   dispatch(moviesLoading());

    //   const config = await client.getConfiguration();
    //   const imageUrl = config.images.base_url;
    //   const results = await client.getNowPlaying();

    //   const mappedResults: Movie[] = results.map(m => ({
    //     id: m.id,
    //     title: m.title,
    //     overview: m.overview,
    //     popularity: m.popularity,
    //     image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined,
    //   }));
    //   dispatch(moviesLoaded(mappedResults));
    // };
    // loadData();

    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <section>
      <div className={styles.list}>
        {loading ? (<h3>Loading...</h3>) :
          (movies.map((m) => (
            <MovieCard
              key={m.id}
              id={m.id}
              title={m.title}
              overview={m.overview}
              popularity={m.popularity}
              image={m.image}
            />))
          )}
      </div>
    </section>
  );
}

const mapStateProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateProps);

export default connector(Movies);
