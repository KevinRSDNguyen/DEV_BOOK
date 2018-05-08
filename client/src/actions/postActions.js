import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  LIKE_POST
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
export const getPosts = (limit, start = 0, posts = "") => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors()); //So feed and comments dont share text error
  axios
    .get(`/api/posts?limit=${limit}&skip=${start}`)
    .then(({ data }) => {
      let payload;
      if (posts) {
        payload = [...posts, ...data];
      } else {
        payload = data;
      }
      dispatch({
        type: GET_POSTS,
        payload
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  dispatch(clearErrors()); //So feed and comments dont share text error
  axios
    .get(`/api/posts/${id}`)
    .then(({ data }) => {
      dispatch({
        type: GET_POST,
        payload: data
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(({ data }) => {
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

//Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

//Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(({ data }) => {
      dispatch({
        type: LIKE_POST,
        payload: data //pass in updated post
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(({ data }) => {
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(({ data }) => {
      dispatch({
        type: GET_POST,
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
