import Movie from "../../interfaces/movie";
import { ACTIONS } from "../../utils/constans";

export interface UpdateMoviesAction {
  type: string;
  payload: Movie[];
}

export const updateMovies = (movies: Movie[]): UpdateMoviesAction => ({
  type: ACTIONS.UPDATE_MOVIES,
  payload: movies,
});
