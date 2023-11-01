import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  HIDE_ALERT,
  SET_USER_REQUIREMENT,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  SET_ALERT,
  SETUP_PROVIDER_BEGIN,
  SETUP_PROVIDER_SUCCESS,
  SETUP_PROVIDER_ERROR
} from "./actions";

export const reducer = (state, action) => {
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  } else  if (action.type === SETUP_PROVIDER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  } 
  
  else if (action.type === SET_USER_REQUIREMENT) {
    return {
      ...state,
      userReq: action.payload.userReq,
    };
  } else if (action.type === SET_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.alertType,
      alertText: action.payload.alertText,
    };
  } else if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      userReq: null,
    };
  } else if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar,
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
  } else if (action.type === SETUP_PROVIDER_SUCCESS) {
    return {
      ...state,
      provider: action.payload.provider,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }  
  else if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: false,
      alertText: action.message,
    };
  } else if (action.type === SETUP_PROVIDER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: false,
      alertText: action.message,
    };
  }
  
  else if (action.type === HIDE_ALERT) {
    return {
      ...state,
      showAlert: false,
    };
  }
  return {
    ...state,
  };
};
