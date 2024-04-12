import Movie from "../../interfaces/movie";
import { UpdateMoviesAction } from "../actions/moviesActions";
import { ACTIONS } from "../../utils/constans";

export interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [],
};

const moviesReducer = (
  state = initialState,
  action: UpdateMoviesAction
): MoviesState => {
  switch (action.type) {
    case ACTIONS.UPDATE_MOVIES:
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

export default moviesReducer;
