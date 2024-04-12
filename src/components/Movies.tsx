import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../redux/store";
import { API_KEY, URLS } from "../utils/constans";
import { updateMovies } from "../redux/actions/moviesActions";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieDisplay from "./MovieDisplay";
import "../styles/Movies.css";

const Movies: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector(
    (state: RootState) => state.selectedGenre.selectedGenre
  );
  const movies = useAppSelector((state: RootState) => state.movies.movies);

  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
  }, [page]);

  useEffect(() => {
    dispatch(updateMovies([]));
    setPage(0);
  }, [selectedGenre]);

  useEffect(() => {
    if (page > 0 && selectedGenre) {
      fetchMoviesByGenre();
    }
  }, [page]);

  const fetchMoviesByGenre = async (): Promise<void> => {
    const fetchMoviesByGenreUrl = `${URLS.BASE_URL}/discover/movie?with_genres=${selectedGenre?.id}&api_key=${API_KEY}&with_origin_country=IN&page=${page}`;
    try {
      const data = await fetch(fetchMoviesByGenreUrl);
      const moviesByGenre = await data.json();
      dispatch(updateMovies(movies.concat(moviesByGenre.results)));
      setTotalPages(moviesByGenre.total_pages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  return (
    <div className="movies-container">
      {isLoading ? (
        <span className="loader"></span>
      ) : movies.length === 0 ? (
        <h2>Movies not found</h2>
      ) : (
        <InfiniteScroll
          className="movies-wrapper"
          dataLength={movies.length}
          next={() => setPage(page + 1)}
          hasMore={page < totalPages}
          loader={<span className="loader"></span>}
          scrollThreshold={0.9}
        >
          {movies.map((movie) => (
            <MovieDisplay key={movie.id} movie={movie} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Movies;
