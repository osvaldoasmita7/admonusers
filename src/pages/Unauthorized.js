import React from "react";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div>
      No estás autorizado para ver está página
      <Link to="/">Ir al inicio</Link>
    </div>
  );
};
