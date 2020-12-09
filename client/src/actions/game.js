import api from "../utils/api";
import alert from "../components/layout/Alert";
import {
  SCORE_FAILURE,
  SCORE_SUCCESS,
  DATA_SUCCESS,
  DATA_FAILURE,
} from "./types";
import { loadUser } from "./auth";

// Update Score
export const updateScore = (id, score) => async (dispatch) => {
  try {
    const res = await api.put(`users/update/${id}`, score);

    dispatch({
      type: SCORE_SUCCESS,
      payload: { id, score: res.data },
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => alert(error.msg, "danger"));
    }

    dispatch({
      type: SCORE_FAILURE,
    });
  }
};

export const getAlldata = () => async (dispatch) => {
  try {
    const res = await api.get("users");

    dispatch({
      type: DATA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => alert(error.msg, "danger"));
    }
    dispatch({
      type: DATA_FAILURE,
      payload: errors,
    });
  }
};
