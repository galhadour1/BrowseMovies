import { ACTIONS } from "../../utils/constans";
import type { PayloadAction } from "@reduxjs/toolkit";
import Genre from "../../interfaces/Genre";

export interface GenresState {
  genres: Genre[];
}

const initialState: GenresState = {
  genres: [],
};

const genresReducer = (
  state = initialState,
  action: PayloadAction<Genre[]>
): GenresState => {
  switch (action.type) {
    case ACTIONS.UPDATE_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    default:
      return state;
  }
};

export default genresReducer;
