import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer.js";
import axios from "axios";
import {
  HIDE_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
  SET_USER_REQUIREMENT,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  SET_ALERT,
  SETUP_PROVIDER_BEGIN,
  SETUP_PROVIDER_SUCCESS,
  SETUP_PROVIDER_ERROR,
} from "./actions.js";

const appContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  userReq: null,
  showSideBar: true,
};

export const AppProvider = ({ children }) => {
  const initUser = () => {
    console.log("running");
    const user = localStorage.getItem("userStr");
    const userReq = localStorage.getItem("userReqStr");

    if (user) {
      const userObj = JSON.parse(user);
      console.log(userObj);
      initialState.user = userObj;
    }
    if (userReq) {
      const userReqObj = JSON.parse(userReq);
      initialState.userReq = userReqObj;
    }
  };
  initUser();
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state :" + state);

  const displayAlert = ({ alertType, alertText }) => {
    dispatch({
      type: SET_ALERT,
      alertType,
      alertText,
    });
    hideAlert();
  };

  const hideAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };
  const setUserReq = (userReq) => {
    console.log("User req");
    console.log(userReq);
    dispatch({
      type: SET_USER_REQUIREMENT,
      payload: {
        userReq,
      },
    });
    localStorage.setItem("userReqStr", JSON.stringify(userReq));
  };
  const toggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const setUpUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({
      type: SETUP_USER_BEGIN,
    });

    try {
      console.log(currentUser);
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/${endpoint}`,
        currentUser
      );

      console.log(response);
      if (!response || response.name === "AxiosError") {
        throw new Error(response.message);
      }
      const { user } = await response.data.data;
      // console.log(user);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          alertText,
        },
      });
      localStorage.setItem("userStr", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        message: error.message,
      });
    }

    hideAlert();
  };

  const setUpProvider = async ({ currentProvider, endpoint, alertText }) => {
    dispatch({
      type: SETUP_PROVIDER_BEGIN,
    });

    try {
      console.log(currentProvider);
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/${endpoint}`,
        currentProvider
      );

      console.log(response);
      if (!response || response.name === "AxiosError") {
        throw new Error(response.message);
      }
      const { provider } = await response.data.data;
      // console.log(user);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          provider,
          alertText,
        },
      });
      localStorage.setItem("providerStr", JSON.stringify(provider));
    } catch (error) {
      console.log(error);
      dispatch({
        type: SETUP_PROVIDER_ERROR,
        message: error.message,
      });
    }

    hideAlert();
  };

  const registerUser = (currentUser) => {
    setUpUser({
      currentUser,
      endpoint: "register",
      alertText: "Registeration Complete! redirecting...",
    });
  };

  const logInUser = (currentUser) => {
    setUpUser({
      currentUser,
      endpoint: "login",
      alertText: "Logged in successfully! redirecting...",
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("userStr");
    localStorage.removeItem("userReqStr");
    dispatch({
      type: LOGOUT_USER,
    });
  };

  const registerProvider = (currentProvider) => {
    setUpProvider({
      currentProvider,
      endpoint: "registerProvider",
      alertText: "Registeration Complete! redirecting...",
    });
  };

  const loginProvider = (currentProvider) => {
    setUpProvider({
      currentProvider,
      endpoint: "loginProvider",
      alertText: "Logged in successfully! redirecting...",
    });
  };

  return (
    <appContext.Provider
      value={{
        ...state,
        logInUser,
        registerUser,
        displayAlert,
        setUserReq,
        toggleSideBar,
        logoutUser,
        registerProvider,
        loginProvider,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
