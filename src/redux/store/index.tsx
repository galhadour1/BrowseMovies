import { createStore, combineReducers } from "redux";
import moviesReducer from "../reducers/movies";
import genresReducer from "../reducers/genres";
import selectedGenreReducer from "../reducers/selectedGenre";

const rootReducer = combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  selectedGenre: selectedGenreReducer,
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
