import { ChangeEvent, useState } from "react";
import "../styles/SerachBar.css";
import { API_KEY, URLS } from "../utils/constans";
import { useAppDispatch } from "../hooks";
import { updateMovies } from "../redux/actions/moviesActions";
import { useNavigate } from "react-router-dom";

const SerachBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState<string>("");

  const handleSearchMovies = async (): Promise<void> => {
    const fetchFoundMoviesUrl = `${URLS.BASE_URL}/search/movie?api_key=${API_KEY}&with_origin_country=IN&language=en-US&query=${searchWord}&page=1&include_adult=false`;
    try {
      const data = await fetch(fetchFoundMoviesUrl);
      const foundMovies = await data.json();
      dispatch(updateMovies(foundMovies.results));
    } catch (error) {
      console.error("Error search movies:", error);
    }
  };

  const handleSearchOnKeyUp = (e: ChangeEvent<HTMLInputElement>): void => {
    let searchWord = e.target.value;
    if (searchWord !== "") {
      searchWord = searchWord.trim();
      setSearchWord(e.target.value);
      handleSearchMovies();
      navigate("/search");
    } else {
      setSearchWord("");
      navigate("/");
    }
  };

  return (
    <div className="search-container">
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        placeholder="Search Movie"
        className="searchbar-input"
        value={searchWord}
        onChange={(e) => handleSearchOnKeyUp(e)}
      />
      <button className="navbar-btn" onClick={handleSearchMovies}>
        Search
      </button>
    </div>
  );
};

export default SerachBar;
