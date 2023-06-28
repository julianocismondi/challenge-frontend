import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from "@/context/types";

export default function userReducer(state, action) {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true };

    case GET_USERS_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case GET_USERS_ERROR:
      return { ...state, loading: false, error: true };

    case GET_USER_BY_ID_REQUEST:
      return { ...state, loading: true };

    case GET_USER_BY_ID_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case GET_USER_BY_ID_ERROR:
      return { ...state, loading: false, error: true};

    case EDIT_USER_REQUEST:
      return { ...state, loading: true };

    case EDIT_USER_SUCCESS:
      return { ...state, data: {}, loading: false };

    case EDIT_USER_ERROR:
      return { ...state, loading: false };

    case DELETE_USER_REQUEST:
      return { ...state, data: action.payload, loading: true };

    case DELETE_USER_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case DELETE_USER_ERROR:
      return { ...state, loading: false };
  }
}
