import MovieWatched from "./MovieWatched";

function WatchedList({ watched, onRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MovieWatched onRemove={onRemove} key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedList;
