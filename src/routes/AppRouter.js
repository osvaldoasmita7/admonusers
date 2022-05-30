import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Unauthorized } from "../pages/Unauthorized";

export const AppRouter = () => {
  const { verifyToken, auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let verify = async () => {
    setLoading(true);
    await verifyToken();
    setLoading(false);
  };
  useEffect(() => {
    verify();
  }, []);
  if (loading) return <>Cargando</>;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="*" element={<NotFound />} />
          {!auth.token ? (
            <Route exact path="/" element={<Login />}></Route>
          ) : (
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          )}
          {auth.token && (
            <Route exact path="/dashboard" element={<Dashboard />} />
          )}
          <Route
            exact
            path="/unauthorized"
            element={<Unauthorized></Unauthorized>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
