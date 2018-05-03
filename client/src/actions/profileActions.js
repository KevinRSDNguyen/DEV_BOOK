import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(({ data }) => {
      dispatch({
        type: GET_PROFILE,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(response => {
      history.push("/dashboard");
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

//Add Experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(response => {
      history.push("/dashboard");
    })
    .catch(({ response }) => {
      dispatch({
        type: GET_ERRORS,
        payload: response.data
      });
    });
};

//Delete account and profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone!")) {
    axios
      .delete("/api/profile")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(({ response }) => {
        dispatch({
          type: GET_ERRORS,
          payload: response.data
        });
      });
  }
};

//Profile Loading
export const setProfileLoading = () => {
  return { type: PROFILE_LOADING };
};

//Clear current Profile
export const clearCurrentProfile = () => {
  return { type: CLEAR_CURRENT_PROFILE };
};
