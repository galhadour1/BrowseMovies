import { useState } from "react";
import "../styles/NavBar.css";
import Genres from "./Genres";
import ReleaseDate from "./ReleaseDate";
import RatingSlider from "./RatingSlider";
import { useAppDispatch } from "../hooks";
import { updateMovies } from "../redux/actions/moviesActions";

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedFilter, setSelectedFilter] = useState<string>("genres");

  const handleClearFilter = (): void => {
    dispatch(updateMovies([]));
  };

  return (
    <div className="navbar-conatiner">
      <h1 className="navbar-title">Filters</h1>
      <select
        className="filters-dropdown"
        name="filters-dropdown"
        id="filters-dropdown"
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="genres">Genres</option>
        <option value="releaseDate">Release Date</option>
        <option value="ratingSlider">Rating</option>
      </select>
      <div className="filters-wrapper">
        {selectedFilter === "genres" && <Genres />}
        {selectedFilter === "releaseDate" && (
          <ReleaseDate handleClearFilter={handleClearFilter} />
        )}
        {selectedFilter === "ratingSlider" && (
          <RatingSlider handleClearFilter={handleClearFilter} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
