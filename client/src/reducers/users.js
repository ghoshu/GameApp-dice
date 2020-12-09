import { DATA_FAILURE, DATA_SUCCESS } from "../actions/types";

const initialState = {
  userdata: [],
  loading: true,
  error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DATA_FAILURE:
      return {
        ...state,

        loading: false,
        error: payload,
      };
    case DATA_SUCCESS:
      return {
        ...state,
        userdata: payload,
        loading: false,
      };
    default:
      return state;
  }
}
