// import { useCallback, useContext, useState } from 'react';
import { useCallback, useState } from 'react';
import { Container, Grid, LinearProgress, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
// import { AuthContext, anonymousUser } from '../../AuthContext';
import { useGetMoviesQuery, useGetConfigurationQuery, MoviesQuery } from '../../services/tmdb';
import MovieCard from './MovieCard';
import { MoviesFilter } from './MoviesFilter';


const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

function Movies() {
  const { isAuthenticated, user } = useAuth0();
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(imagePath?: string | null) {
    return imagePath && configuration ? `${configuration.images.base_url}w780${imagePath}` : undefined;
  }

  // const { user } = useContext(AuthContext);
  // const loggedIn = user !== anonymousUser;

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  // const handleAddToFavorites = useCallback(
  //   (id: number): void => alert(`Not implemented! Action: ${user.name} is adding movie ${id} to favorites.`),
  //   [user.name]
  // );
  const handleAddToFavorites = useCallback(
    (id: number): void => alert(`Not implemented! Action: ${user?.name} is adding movie ${id} to favorites.`),
    [user?.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
      <Grid item xs='auto'>
        <MoviesFilter onApply={(filters) => {
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
                  image={formatImageUrl(m.backdrop_path)}
                  // enableUserActions={loggedIn}
                  enableUserActions={isAuthenticated}
                  onAddToFavorite={handleAddToFavorites}
                />
              </Grid>))}
          </Grid>

          <div ref={targetRef}>
            {isFetching && (<LinearProgress color='secondary' sx={{ mt: 3 }} />)}
          </div>
        </Container>
      </Grid>

    </Grid>

  );
}

export default Movies;
