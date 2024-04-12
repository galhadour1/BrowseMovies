import Genre from "../../interfaces/Genre";
import { ACTIONS } from "../../utils/constans";

export interface UpdateGenresAction {
  type: string;
  payload: Genre[];
}

export const updateGenres = (genres: Genre[]): UpdateGenresAction => ({
  type: ACTIONS.UPDATE_GENRES,
  payload: genres,
});
