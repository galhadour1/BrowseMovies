export const API_KEY = "2e708febc049923edecbe0d80613226e";

export const URLS = {
  BASE_URL: "https://api.themoviedb.org/3",
  QUERY_PARAMETERS: `api_key=${API_KEY}&with_origin_country=IN&language=en-US`,
  FETCH_GENRES: "/genre/movie/list",
  FETCH_BY_GENRE: "/discover/movie?with_genres=",
  FETCH_IMG: "https://image.tmdb.org/t/p/w500",
};

export const ACTIONS = {
  UPDATE_GENRES: "UPDATE_GENRES",
  UPDATE_MOVIES: "UPDATE_MOVIES",
  UPDATE_SELECTED_GENRE: "UPDATE_SELECTED_GENRE",
  UPDATE_SEARCHED_MOVIES: "UPDATE_SEARCHED_MOVIES",
};
