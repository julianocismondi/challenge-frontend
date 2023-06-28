import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLOSE_SESSION,
} from "@/context/types";

export default function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, authenticate: false, loading: true };

    case LOGIN_SUCCESS:
      return { ...state, data: action.payload, authenticate: true, loading: false };

    case LOGIN_ERROR:
      return { ...state, data: action.payload, loading: false, error: true };

    case REGISTER_REQUEST:
      return { ...state, authenticate: false, loading: true };

    case REGISTER_SUCCESS:
      return { ...state, authenticate: true, loading: false };

    case REGISTER_ERROR:
      return { ...state, authenticate: false, loading: false };

    case GET_PROFILE_REQUEST:
      return { ...state, authenticate: false, loading: true };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        authenticate: true,
        loading: false,
      };

    case GET_PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        authenticate: false,
        loading: false,
      };

    case CLOSE_SESSION:
      return action.payload;
  }
}
