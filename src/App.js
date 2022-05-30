import React, { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles.css";
import "antd/dist/antd.css";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./routes/AppRouter";
function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter></AppRouter>
      </AuthProvider>
    </>
  );
}

export default App;
