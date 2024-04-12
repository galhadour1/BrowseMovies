import { useEffect } from "react";
import "../styles/Genres.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateGenres } from "../redux/actions/genresActions";
import { URLS } from "../utils/constans";
import { RootState } from "../redux/store";
import { updateSelectedGenre } from "../redux/actions/selectedGenreActions";
import Genre from "../interfaces/Genre";

const Genres: React.FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state: RootState) => state.genres.genres);
  const selectedGenre = useAppSelector(
    (state: RootState) => state.selectedGenre.selectedGenre
  );

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async (): Promise<void> => {
    const fetchGenreUrl = `${URLS.BASE_URL}${URLS.FETCH_GENRES}?${URLS.QUERY_PARAMETERS}`;
    try {
      const data = await fetch(fetchGenreUrl);
      const fetchedGenres = await data.json();
      dispatch(updateGenres(fetchedGenres.genres));
      dispatch(updateSelectedGenre(fetchedGenres.genres[0]));
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handleSelectedGenre = (genre: Genre): void => {
    dispatch(updateSelectedGenre(genre));
  };

  return (
    <div className="genres-wrapper">
      <h2 className="genres-title">Genres</h2>
      <div className="genres-container">
        {genres?.map((genre) => (
          <button
            className={
              selectedGenre?.id === genre.id
                ? "navbar-btn selected"
                : "navbar-btn"
            }
            key={genre.id}
            onClick={() => handleSelectedGenre(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Genres;
