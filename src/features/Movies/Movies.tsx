import { connect } from "react-redux";
import { useEffect, useState } from 'react';

import { Movie } from "../../reducers/movies";
import { RootState } from "../../store";
import { MovieDetails, client } from '../../api/tmdb';
import { MovieCard } from "./MovieCard";
import styles from './Movies.module.scss';

export function MoviesFetch() {
  // const [movies, setMovies] = useState([]);
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  useEffect(() => {
    async function loadData() {
      // const response = await client.getNowPlaying();
      // setMovies(response.results);
      const config = await client.getConfiguration();
      const imageUrl = config.images.base_url;
      const results = await client.getNowPlaying();
      const mappedResults: Movie[] = results.map(m => ({
        id: m.id,
        title: m.title,
        overview: m.overview,
        popularity: m.popularity,
        image: m.backdrop_path? `${imageUrl}w780${m.backdrop_path}` : undefined,
      }));
      // setMovies(results);
      setMovies(mappedResults);
    };
    loadData();
  }, [])
  return <Movies movies={movies} />
}

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <section>
      <div className={styles.list}>
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            id={m.id}
            title={m.title}
            overview={m.overview}
            popularity={m.popularity} 
            image={m.image}
          />
        ))}
      </div>
    </section>
  );
}

const mapStateProps = (state: RootState) => ({
  movies: state.movies.top,
});

const connector = connect(mapStateProps);

export default connector(Movies);
