import { useCallback, useContext, useEffect, useState } from 'react';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';

// import { useAppDispatch, useAppSelector } from '../../hooks';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { AuthContext, anonymousUser } from '../../AuthContext';
import { useGetMoviesQuery, useGetConfigurationQuery, MoviesQuery } from '../../services/tmdb';
// import { fetchNextPage, resetMovies } from './moviesSlice';
import MovieCard from './MovieCard';
// import { Filters, MoviesFilter } from './MoviesFilter';
import { MoviesFilter } from './MoviesFilter';

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

function Movies() {
  // const dispatch = useAppDispatch();
  // const movies = useAppSelector((state) => state.movies.top);
  // const loading = useAppSelector((state) => state.movies.loading);
  // const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  // const [filters, setFilters] = useState<Filters>();

  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(imagePath?: string | null) {
    return imagePath && configuration ? `${configuration.images.base_url}w780${imagePath}` : undefined;
  }

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  // const [targetRef, entry] = useIntersectionObserver();
  const [targetRef] = useIntersectionObserver({ onIntersect });

  // useEffect(() => {
  //   dispatch(resetMovies());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (entry?.isIntersecting && hasMorePages) {
  //     const moviesFilters = filters
  //       ? {
  //         keywords: filters?.keywords.map((k) => k.id),
  //         genres: filters?.genres,
  //       }
  //       : undefined;

  //     dispatch(fetchNextPage(moviesFilters));
  //   }
  // }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  const handleAddToFavorites = useCallback(
    (id: number): void => alert(`Not implemented! Action: ${user.name} is adding movie ${id} to favorites.`),
    [user.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs='auto'>
        <MoviesFilter onApply={(filters) => {
          // dispatch(resetMovies());
          // setFilters(filters);
          const moviesFilters = {
            keywords: filters?.keywords.map((k) => k.id),
            genres: filters?.genres,
          };

          setQuery({
            page: 1,
            filters: moviesFilters,
          });
        }} />
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth='lg'>
          {/* {!loading && !movies.length && <Typography variant='h6'>No movies were found that match your query.</Typography>} */}
          {!isFetching && !movies.length && <Typography variant='h6'>No movies were found that match your query.</Typography>}
          <Grid container spacing={4}>
            {movies.map((m, i) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  // image={m.image}
                  image={formatImageUrl(m.backdrop_path)}
                  enableUserActions={loggedIn}
                  onAddToFavorite={handleAddToFavorites}
                />
              </Grid>))}
          </Grid>

          <div ref={targetRef}>
            {/* {loading && (<LinearProgress color='secondary' sx={{ mt: 3 }} />)} */}
            {isFetching && (<LinearProgress color='secondary' sx={{ mt: 3 }} />)}
          </div>
        </Container>
      </Grid>

    </Grid>

  );
}

export default Movies;
