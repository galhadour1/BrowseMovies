import { useState } from "react";
import "../styles/ReleaseDate.css";
import { useAppDispatch } from "../hooks";
import { API_KEY, URLS } from "../utils/constans";
import { updateMovies } from "../redux/actions/moviesActions";

interface ReleaseDateProps {
  handleClearFilter: Function;
}

const ReleaseDate: React.FC<ReleaseDateProps> = ({ handleClearFilter }) => {
  const dispatch = useAppDispatch();
  const today = formatDate(new Date());

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const fetchMoviesByReleaseDate = async (): Promise<void> => {
    const fetchMoviesByReleaseDateUrl = `${URLS.BASE_URL}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${fromDate}&primary_release_date.lte=${toDate}&page=1`;
    try {
      const data = await fetch(fetchMoviesByReleaseDateUrl);
      const fetchedMovies = await data.json();
      dispatch(updateMovies(fetchedMovies.results));
    } catch (error) {
      console.error("Error fetching movies by release date:", error);
    }
  };

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <div className="release-date-container">
      <h2>Release Date</h2>
      <div className="from-to-wrapper">
        <h3>From:</h3>
        <input
          onChange={(e) => setFromDate(e.target.value)}
          type="date"
          id="from"
          name="from"
          value={fromDate}
          max={toDate || today}
        />
      </div>
      <div className="from-to-wrapper">
        <h3>To:</h3>
        <input
          onChange={(e) => setToDate(e.target.value)}
          type="date"
          id="to"
          name="to"
          value={toDate}
          min={fromDate}
          max={today}
        />
      </div>

      <div className="btns-wrapper">
        <button onClick={fetchMoviesByReleaseDate} className="navbar-btn">
          Filter
        </button>
        <button onClick={() => handleClearFilter()} className="navbar-btn">
          Clear
        </button>
      </div>
    </div>
  );
};

export default ReleaseDate;
