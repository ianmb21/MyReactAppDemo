import { ACTION_TYPES_LOGIN } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState = user
    ? { isLoggedIn: true, user, }
    : { isLoggedIn: false, user: null, };
  
  export const userLogin = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case ACTION_TYPES_LOGIN.LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case ACTION_TYPES_LOGIN.LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case ACTION_TYPES_LOGIN.LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  
  }