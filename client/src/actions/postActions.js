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
        data: response.data
      });
    });
};
