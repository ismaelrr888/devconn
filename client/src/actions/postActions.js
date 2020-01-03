import axios from "axios";
import * as types from "./types";

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: types.ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: types.GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: types.GET_POSTS,
        payload: {}
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: types.POST_LOADING
  };
};
