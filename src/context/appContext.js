import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer.js";
import axios from "axios";
import {
  HIDE_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_ERROR,
  SETUP_USER_SUCCESS,
} from "./actions.js";

const appContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = ({ alertType, alertText }) => {
    dispatch({
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
      const { user } = await response.data.data;
      // console.log(user);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          alertText,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        message: error.reponse.data.message,
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

  return (
    <appContext.Provider
      value={{ ...state, logInUser, registerUser, displayAlert }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
