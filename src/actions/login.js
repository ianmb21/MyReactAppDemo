import LoginService from "../services/loginService";
import { ACTION_TYPES_LOGIN } from "./types";

export const login = (username, password) => (dispatch) => {
    return LoginService.login(username, password)
      .then(
        (data) => {
          dispatch({
            type: ACTION_TYPES_LOGIN.LOGIN_SUCCESS,
            payload: { user: data },
          });
  
          return Promise.resolve();
        },
        (error) => {
          const message = error.response.data;
  
          dispatch({
            type: ACTION_TYPES_LOGIN.LOGIN_FAIL,
          });
  
          return Promise.reject();
        }
      );
  };
  
  export const logout = () => (dispatch) => {
    return LoginService.logout()
      .then(
        dispatch({
          type: ACTION_TYPES_LOGIN.LOGOUT,
        })
      );
  };