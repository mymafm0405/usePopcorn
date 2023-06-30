import Movie from "./Movie";

function MoviesList({ movies, setSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} setSelectedId={setSelectedId} />
      ))}
    </ul>
  );
}

export default MoviesList;
