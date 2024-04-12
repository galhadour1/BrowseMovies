import { useLocation, useNavigate } from "react-router-dom";
import "../styles/MovieDetails.css";
import { API_KEY, URLS } from "../utils/constans";
import { useEffect, useState } from "react";
import Credit from "../interfaces/Credit";
import IMovieDetails from "../interfaces/IMovieDetails";
import Credits from "../interfaces/Credits";

const MovieDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [credits, setCredits] = useState<Credits | null>(null);
  const [actors, setActors] = useState<Credit[] | undefined>([]);
  const [directors, setDirectors] = useState<Credit[] | undefined>([]);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);

  const selectedMovie = location.state.selectedMovie;

  useEffect(() => {
    fetchCreditsMovie();
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    filterActors();
    filterDirectors();
  }, [credits]);

  const filterActors = (): void => {
    const filteredActors = credits?.cast.filter(
      (credit) => credit["known_for_department"] === "Acting"
    );
    setActors(filteredActors);
  };

  const filterDirectors = (): void => {
    const filteredDirectors = credits?.crew.filter(
      (credit) => credit["known_for_department"] === "Directing"
    );
    setDirectors(filteredDirectors);
  };

  const fetchCreditsMovie = async (): Promise<void> => {
    const fetchCreditsUrl = `${URLS.BASE_URL}/movie/${selectedMovie.id}/credits?api_key=${API_KEY}`;
    try {
      const data = await fetch(fetchCreditsUrl);
      const credits = await data.json();
      setCredits(credits);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovieDetails = async () => {
    const fetchMovieDetailsUrl = `${URLS.BASE_URL}/movie/${selectedMovie.id}?api_key=${API_KEY}`;
    try {
      const data = await fetch(fetchMovieDetailsUrl);
      const fetchedMovieDetails = await data.json();
      setMovieDetails(fetchedMovieDetails);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const navigateBackPage = (): void => {
    navigate("/");
  };

  return (
    <div className="movie-details-container">
      <img
        alt={movieDetails?.title}
        src={URLS.FETCH_IMG + movieDetails?.poster_path}
        className="movie-details-img"
      />
      <div className="movie-details-right">
        <div className="movie-details-text-wrapper">
          <h1 className="movie-title">{movieDetails?.title}</h1>
          <div className="overview">
            <h3>Overview:</h3>
            <p className="movie-overview">{movieDetails?.overview}</p>
          </div>
          <div className="release-date">
            <h3>Release Date:</h3> {movieDetails?.release_date}
          </div>
          <div className="runtime">
            <h3>Runtime: </h3>
            {movieDetails?.runtime} minutes
          </div>
          <div className="vote-average">
            <h3>Rating:</h3> {movieDetails?.vote_average}
          </div>
          <div className="popularity">
            <h3>Popularity:</h3> {movieDetails?.popularity}
          </div>
          <div className="actors-wrapper">
            <h3>Actors:</h3>
            {actors?.map((actor) => (
              <label>{actor.name},</label>
            ))}
          </div>
          <div className="director-wrapper">
            <h3>Directors:</h3>
            {directors?.map((director) => (
              <label>{director.name}, </label>
            ))}
          </div>
        </div>
        <button className="back-btn" onClick={navigateBackPage}>
          Back
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;
