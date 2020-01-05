import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import * as types from "./types";

// Register user
export const registerUser = (userdata, history) => dispatch => {
  axios
    .post("/api/users/register", userdata)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: types.SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for feature requestes
  setAuthToken(false);
  // Set current user to {} witch will set isAtuhenticated to false
  dispatch(setCurrentUser({}));

  history.push("/");
};
