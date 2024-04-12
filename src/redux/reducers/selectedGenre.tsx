import { ACTIONS } from "../../utils/constans";
import type { PayloadAction } from "@reduxjs/toolkit";
import Genre from "../../interfaces/Genre";

export interface SelectedGenreState {
  selectedGenre: Genre | null;
}

const initialSelectedGenreState: SelectedGenreState = {
  selectedGenre: null,
};

const selectedGenreReducer = (
  state = initialSelectedGenreState,
  action: PayloadAction<Genre | null>
): SelectedGenreState => {
  switch (action.type) {
    case ACTIONS.UPDATE_SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: action.payload,
      };
    default:
      return state;
  }
};

export default selectedGenreReducer;
