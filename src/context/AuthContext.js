import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import qs from "qs";
import { axiosHelper } from "../helpers/axiosHelper";

export const AuthContext = createContext();

const initialState = {
  id: null,
  token: null,
  username: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);
  const login = async (username, password) => {
    let resp = await axiosHelper({
      url: "login",
      data: { username, password },
      method: "post",
    });
    setAuth({ ...auth, ...resp });
    return resp;
  };

  const verifyToken = async () => {
    let resp = await axiosHelper({
      url: "login/renew-token",
      method: "post",
      showError: false,
    });
    if (!resp.ok) {
      // localStorage.clear();
      setAuth({
        id: null,
        token: null,
        username: null,
      });
      return false;
    }
    debugger;
    localStorage.setItem("token", resp.token);
    setAuth({
      ...auth,
      token: resp.token,
      id: resp.id,
      username: resp.username,
    });
    return true;
  };

  const logout = () => {
    localStorage.clear();
    setAuth({
      id: null,
      token: null,
      username: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        verifyToken,
        logout,
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
