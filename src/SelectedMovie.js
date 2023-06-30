import { useEffect, useState } from "react";
import Rating from "./Rating";
import Loader from "./Loader";
const KEY = "dcb4ad80";

function SelectedMovie({
  movieId,
  onGoBack,
  onAddToWatched,
  onCheckMovieAdded,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    function callBack(e) {
      if (e.code === "Escape") {
        onGoBack();
      }
    }
    document.addEventListener("keydown", callBack);
    return () => {
      document.addEventListener("keydown", callBack);
    };
  }, [onGoBack]);

  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
      );
      const data = await res.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    }
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    setIsExist(onCheckMovieAdded(movieId));
  }, [movieId, onCheckMovieAdded]);

  function handleAddWatched() {
    onAddToWatched({ ...movie, userRating: userRating });
    onGoBack();
  }

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie: ${movie.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onGoBack}>
              &larr;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating}
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isExist ? (
                <>
                  <Rating
                    size={25}
                    color="yellow"
                    maxValue={10}
                    onSet={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      Add to watched
                    </button>
                  )}
                </>
              ) : (
                <p>You already watched this movie</p>
              )}
            </div>

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
