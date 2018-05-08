import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from "./types";

// Add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(({ data }) => {
      dispatch({
        type: ADD_POST,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(({ data }) => {
      dispatch({
        type: GET_POSTS,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

//Set Loading State
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
