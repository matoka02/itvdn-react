import { connect } from "react-redux";

import { Movie } from "../../reducers/movies";
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import "./Movies.css";

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  // return (<div>Movies</div>)
  return (
    // <div>
    //   <ul>
    //     {movies.map(m => (
    //       <li key={m.id}>
    //         <div>{m.title}</div>
    //         <div>{m.overview}</div>
    //         <div>{m.popularity}</div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <section>
      <div className='Movies-list'>
        {movies.map((m) => (
          <MovieCard 
            key={m.id} 
            id={m.id}
            title={m.title}
            overview={m.overview}
            popularity={m.popularity}
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
