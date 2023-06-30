import { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Main from "./Main";
import Search from "./Search";
import Results from "./Results";
import MoviesList from "./MoviesList";
import WatchedList from "./WatchedList";
import Summary from "./Summary";
import tempWatchedData from "./TempWatchData";
import Box from "./Box";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SelectedMovie from "./SelectedMovie";
import { tempMovieData } from "./MoviesData";

const key = "dcb4ad80";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      setError("");
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong!!");
        }
        const data = await res.json();
        console.log(data.Search);
        if (data.Response === "False") throw Error("No movies found!");
        setMovies(data.Search);
      } catch (err) {
        if (!err.name === "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setError("");
      setMovies([]);
      return;
    }
    fetchMovies();
    setSelectedId(null);

    return () => {
      controller.abort();
    };
  }, [query]);

  function handleAddToWatch(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function checkIfMovieAdded(movieId) {
    if (watched.find((mov) => mov.imdbID === movieId)) {
      return true;
    }
    return false;
  }

  function handleRemoveWatchedMovie(movieId) {
    setWatched((prev) => prev.filter((mov) => mov.imdbID !== movieId));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MoviesList movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {!selectedId && (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onRemove={handleRemoveWatchedMovie}
              />
            </>
          )}
          {selectedId && (
            <SelectedMovie
              onCheckMovieAdded={checkIfMovieAdded}
              onGoBack={() => setSelectedId(null)}
              movieId={selectedId}
              onAddToWatched={handleAddToWatch}
            />
          )}
        </Box>
      </Main>
    </>
  );
}
