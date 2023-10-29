import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  HIDE_ALERT,
  SET_USER_REQUIREMENT,
} from "./actions";

export const reducer = (state, action) => {
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === SET_USER_REQUIREMENT) {
    return {
      ...state,
      userReq: action.payload.userReq,
    };
  } else if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  } else if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.message,
    };
  } else if (action.type === HIDE_ALERT) {
    return {
      ...state,
      showAlert: false,
    };
  }
  return {
    ...state,
  };
};
