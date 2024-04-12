import { useState } from "react";
import "../styles/RatingSlider.css";
import { useAppDispatch } from "../hooks";
import { API_KEY, URLS } from "../utils/constans";
import { updateMovies } from "../redux/actions/moviesActions";
import MultiRangeSlider from "multi-range-slider-react";

interface RatingSliderProps {
  handleClearFilter: Function;
}

const RatingSlider: React.FC<RatingSliderProps> = ({ handleClearFilter }) => {
  const dispatch = useAppDispatch();

  const [fromRate, setFromRate] = useState<number>(0);
  const [toRate, setToRate] = useState<number>(10);

  const fetchMoviesByRating = async (): Promise<void> => {
    const fetchMoviesByRatingUrl = `${URLS.BASE_URL}/discover/movie?api_key=${API_KEY}&vote_average.gte=${fromRate}&vote_average.lte=${toRate}&page=1`;
    try {
      const data = await fetch(fetchMoviesByRatingUrl);
      const fetchedMovies = await data.json();
      dispatch(updateMovies(fetchedMovies.results));
    } catch (error) {
      console.error("Error fetching movies by rating:", error);
    }
  };

  return (
    <div className="rating-slider-container">
      <div className="rating-slider-wrapper">
        <h2>Rating</h2>
        <MultiRangeSlider
          min={0}
          max={10}
          step={1}
          canMinMaxValueSame={true}
          minValue={fromRate}
          maxValue={toRate}
          onChange={(e) => {
            setFromRate(e.minValue);
            setToRate(e.maxValue);
          }}
        />
      </div>
      <div className="btns-wrapper">
        <button onClick={fetchMoviesByRating} className="navbar-btn">
          Filter
        </button>
        <button onClick={() => handleClearFilter()} className="navbar-btn">
          Clear
        </button>
      </div>
    </div>
  );
};

export default RatingSlider;
