import Genre from "../../interfaces/Genre";
import { ACTIONS } from "../../utils/constans";

export interface UpdateSelectedGenreAction {
  type: string;
  payload: Genre | null;
}

export const updateSelectedGenre = (
  selectedGenre: Genre | null
): UpdateSelectedGenreAction => ({
  type: ACTIONS.UPDATE_SELECTED_GENRE,
  payload: selectedGenre,
});
