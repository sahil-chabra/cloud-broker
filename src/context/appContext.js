import React, { useReducer, useContext } from "react";

import {
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  DISPLAY_ALERT,
  CLEAR_ALERT,
} from "./actions";
import reducer from "./reducer";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertType: "",
  alertText: "",
  user: "",
};
const appContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (alertType, alertText) => {
    dispatch({ type: DISPLAY_ALERT, alertType, alertText });
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };

  const loginUser = (user) => {
    console.log("User Logged in!");
    console.log(user);
    dispatch({
      type: SETUP_USER_SUCCESS,
      payload: {
        user,
        alertText: "Log In Successfully",
      },
    });

    clearAlert();
  };
  const registerUser = (user) => {
    console.log("User Registered!");
    console.log(user);
    dispatch({
      type: SETUP_USER_SUCCESS,
      payload: {
        user,
        alertText: "Log In Successfully",
      },
    });

    clearAlert();
  };

  const submitUserRequirements = (userReq) => {
    console.log("User requirements gathered!");
    console.log(userReq);
  };

  return (
    <appContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        displayAlert,
        submitUserRequirements,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};

export { AppProvider };
